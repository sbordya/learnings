-- 1. A query to deduplicate game_details from Day 1 so there's no duplicates
select distinct *
from game_details;

-- 2. A DDL for an user_devices_cumulated
drop table if exists user_devices_cumulated;

create table user_devices_cumulated(
	user_id numeric,
	browser_type text,
	device_activity_datelist date[],
	curr_date date,
	primary key (user_id, browser_type, curr_date)
);

-- 3. A cumulative query to generate device_activity_datelist from events
truncate user_devices_cumulated;

do $$
declare
	today_date date;
	min_date date;
	max_date date;
begin
	select min(event_time)::date, max(event_time)::date
	into min_date, max_date
	from events;
	
	for today_date in (select generate_series(min_date, max_date, interval '1 day')) loop
		with today as (
			select distinct e.user_id, coalesce(d.browser_type, 'unknown') as browser_type, today_date as curr_date
			from events e
			left join devices d
			on e.device_id  = d.device_id
			where e.user_id is not null
			and date(e.event_time) = today_date
		),
		yesterday as (
			select * 
			from user_devices_cumulated
			where curr_date = today_date - interval '1 day'
		),
		increment as (
			select
				coalesce(t.user_id, y.user_id) as user_id,
				coalesce(t.browser_type, y.browser_type) as browser_type,
				case
					when t.curr_date is null then y.device_activity_datelist
					when y.device_activity_datelist is null then array[t.curr_date]
					else t.curr_date || y.device_activity_datelist
				end as device_activity_datelist,
				today_date as curr_date
			from today t
			full outer join yesterday y
			on t.user_id = y.user_id and t.browser_type = y.browser_type
		)
		insert into user_devices_cumulated
		select * from increment;
	end loop;
	
end $$;

-- 4. A datelist_int generation query. Convert the device_activity_datelist column into a datelist_int column
-- A datelist_int generation query. Convert the device_activity_datelist column into a datelist_int column
with user_devices_cumulated_unnested as (
	select user_id, browser_type, curr_date - unnest(device_activity_datelist) as days_since_active, curr_date
	from user_devices_cumulated
)
select user_id, browser_type, sum(pow(2, 30 - days_since_active))::bigint::bit(31) as datelist_int, curr_date
from user_devices_cumulated_unnested
group by user_id, browser_type, curr_date;

-- 5. A DDL for hosts_cumulated table
-- a host_activity_datelist which logs to see which dates each host is experiencing any activity
drop table if exists hosts_cumulated;

create table hosts_cumulated(
	host text,
	host_activity_datelist date[],
	curr_date date,
	primary key (host, curr_date)
);

-- 6. The incremental query to generate host_activity_datelist
truncate hosts_cumulated;

do $$
declare
	today_date date;
	min_date date;
	max_date date;
begin
	select min(event_time)::date, max(event_time)::date
	into min_date, max_date
	from events;
	
	for today_date in (select generate_series(min_date, max_date, interval '1 day')) loop
		with today as (
			select distinct url as host, today_date as curr_date
			from events e
			where date(event_time) = today_date
		),
		yesterday as (
			select * 
			from hosts_cumulated
			where curr_date = today_date - interval '1 day'
		),
		increment as (
			select
				coalesce(t.host, y.host) as host,
				case
					when t.curr_date is null then y.host_activity_datelist
					when y.host_activity_datelist is null then array[t.curr_date]
					else t.curr_date || y.host_activity_datelist
				end as host_activity_datelist,
				today_date as curr_date
			from today t
			full outer join yesterday y
			on t.host = y.host
		)
		insert into hosts_cumulated
		select * from increment;
        
	end loop;
end $$;

-- 7. A monthly, reduced fact table DDL host_activity_reduced
drop table if exists host_activity_reduced;

create table host_activity_reduced(
	month text,
	host text,
	hit_list int[],
	unique_visitors_list int[],
	primary key (month, host)
);

-- 8. An incremental query that loads host_activity_reduced day by day
truncate host_activity_reduced;

do $$
declare
	min_date date;
	max_date date;
	curr_date date;
	curr_day int;
	curr_month text;
begin
	select min(event_time)::date, max(event_time)::date
	into min_date, max_date
	from events;
	
	for curr_date in (select generate_series(min_date, max_date, interval '1 day')) loop
		select date_part('day', curr_date)::int, to_char(curr_date, 'YYYY-MM')
		into curr_day, curr_month;

		with today as (
			select url as host, count(1) as hit_amount, count(distinct user_id) as unique_visitors_amount
			from events
			where date(event_time) = curr_date
			group by url
		),
		yesterday as (
			select * 
			from host_activity_reduced
			where month = curr_month
		),
		increment as (
			select
				curr_month as month,
				coalesce(t.host, y.host) as host,
				coalesce(t.hit_amount, 0) || coalesce(y.hit_list, array_fill(0, array[curr_day - 1])) as hit_list,
				coalesce(t.unique_visitors_amount, 0) || coalesce(y.unique_visitors_list, array_fill(0, array[curr_day - 1])) as unique_visitors_list
			from today t
			full outer join yesterday y
			on t.host = y.host
		)
		insert into host_activity_reduced
		select * from increment
		on conflict(month, host) do update 
		set hit_list = excluded.hit_list, unique_visitors_list = excluded.unique_visitors_list;

	end loop;	
end $$;
