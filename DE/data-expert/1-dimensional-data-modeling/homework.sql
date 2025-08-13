-- 1. DDL for actors table
drop table if exists actors;
drop type if exists quality_class;
drop type if exists films;

create type quality_class as enum ('star', 'good', 'average', 'bad');
create type films as (
	film text,
	votes int4,
	rating float4,
	filmid text
);

create table actors (
	actorid text,
	actor text,
	year int4,
	is_active boolean,
	quality_class quality_class,
	films films[],
	primary key (actorid, year)
);

-- 2. Cumulative table generation query: Write a query that populates the actors table one year at a time.

truncate actors;

DO $$
DECLARE
    i INTEGER;
    min_year INTEGER;
    max_year INTEGER;
BEGIN
    SELECT MIN(year), MAX(year)
    INTO min_year, max_year
    FROM actor_films;

    FOR i IN min_year .. max_year LOOP
        WITH current_year AS (
            SELECT 
                actorid, 
                MIN(actor) AS actor, 
                TRUE AS is_active, 
                (CASE
                    WHEN AVG(rating) > 8 THEN 'star'
                    WHEN AVG(rating) > 7 THEN 'good'
                    WHEN AVG(rating) > 6 THEN 'average'
                    ELSE 'bad'
                END)::quality_class AS quality_class, 
                ARRAY_AGG(ROW(film, votes, rating, filmid)::films) AS films
            FROM actor_films
            WHERE year = i
            GROUP BY actorid, year
        ),
        previous_year AS (
            SELECT actorid, actor, quality_class
            FROM actors
            WHERE year = i - 1
        ),
        increment AS (
            SELECT
                COALESCE(cy.actorid, py.actorid) AS actorid,
                COALESCE(cy.actor, py.actor) AS actor,
                i AS year,
                COALESCE(cy.is_active, FALSE) AS is_active,
                COALESCE(cy.quality_class, py.quality_class) AS quality_class,
                cy.films
            FROM current_year cy
            FULL OUTER JOIN previous_year py 
            ON cy.actorid = py.actorid
        )
        INSERT INTO actors
        SELECT * FROM increment;
    END LOOP;
END $$;

-- 3. DDL for actors_history_scd table
drop table if exists actors_history_scd;

create table actors_history_scd (
	actorid text,
	actor text,
	is_active boolean,
	quality_class quality_class,
	start_date int4,
	end_date int4,
	primary key (actorid, start_date)
);

-- 4. Backfill query for actors_history_scd: Write a "backfill" query that can populate the entire actors_history_scd table in a single query.
truncate actors_history_scd;

with actors_with_prev_dim as (
	select 
		actorid, 
		actor, 
		is_active, 
		quality_class, 
		year,
		lag(is_active) over (partition by actorid order by year) as is_active_prev,
		lag(quality_class) over (partition by actorid order by year) as quality_class_prev
	from actors
),
actors_with_change_status as (
	select 
		*,
		(case when is_active <> is_active_prev or quality_class <> quality_class_prev then 1 else 0 end) as is_change
	from actors_with_prev_dim
),
actors_with_change_order as (
	select 
		*,
		sum(is_change) over (partition by actorid order by year) as change_nr
	from actors_with_change_status
),
increment as (
	select actorid, actor, is_active, quality_class, min(year) as start_date, max(year) as end_date
	from actors_with_change_order
	group by actorid, change_nr, actor, is_active, quality_class
)
insert into actors_history_scd
select * from increment;

-- 5. Incremental query for actors_history_scd: Write an "incremental" query that combines the previous year's SCD data with new incoming data from the actors table.
do $$ 
declare 
	prev_year int4;
begin 
	select coalesce(max(end_date), 0) into prev_year from actors_history_scd;

	with actors_with_prev_dim as (
		select 
			actorid, 
			actor, 
			is_active, 
			quality_class, 
			year,
			lag(is_active) over (partition by actorid order by year) as is_active_prev,
			lag(quality_class) over (partition by actorid order by year) as quality_class_prev
		from actors
		where year > prev_year
	),
	actors_with_change_status as (
		select 
			*,
			(case when is_active <> is_active_prev or quality_class <> quality_class_prev then 1 else 0 end) as is_change
		from actors_with_prev_dim
	),
	actors_with_change_order as (
		select 
			*,
			sum(is_change) over (partition by actorid order by year) as change_nr
		from actors_with_change_status
	),
	increment as (
		select actorid, actor, is_active, quality_class, min(year) as start_date, max(year) as end_date
		from actors_with_change_order
		group by actorid, change_nr, actor, is_active, quality_class
	),
	latest_from_snapshot as (
		select *
		from actors_history_scd
		where end_date = prev_year
	),
	increment_dedup as (
		select
			incr.actorid,
			incr.actor,
			incr.is_active,
			incr.quality_class,
			coalesce(hist.start_date, incr.start_date) as start_date,
			incr.end_date
		from increment incr
		left join latest_from_snapshot hist
		on incr.actorid = hist.actorid and incr.start_date = prev_year + 1 
		and incr.is_active = hist.is_active and incr.quality_class = hist.quality_class
	)
	insert into actors_history_scd
	select * from increment_dedup
	on conflict (actorid, start_date) do update
	set end_date = excluded.end_date;
end $$;
