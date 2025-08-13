drop table if exists players;
drop table if exists players_scd_table;
drop type if exists season_stats; 
drop type if exists scoring_class; 
 
CREATE TYPE season_stats AS (
                         season Integer,
                         pts REAL,
                         ast REAL,
                         reb REAL,
                         weight INTEGER
                       );
CREATE TYPE scoring_class AS
     ENUM ('bad', 'average', 'good', 'star');


CREATE TABLE players (
     player_name TEXT,
     height TEXT,
     college TEXT,
     country TEXT,
     draft_year TEXT,
     draft_round TEXT,
     draft_number TEXT,
     seasons season_stats[],
     scoring_class scoring_class,
     -- years_since_last_active INTEGER,
     is_active BOOLEAN,
     current_season INTEGER,
     PRIMARY KEY (player_name, current_season)
);

---------------------------------------------------

truncate table players;

DO $$
DECLARE
    i INTEGER;
    min_year INTEGER;
    max_year INTEGER;
BEGIN
    SELECT MIN(season), MAX(season)
    INTO min_year, max_year
    FROM player_seasons;

    FOR i IN min_year .. max_year LOOP
        WITH 
            last_season AS (SELECT * FROM players WHERE current_season = i - 1), 
            this_season AS (SELECT * FROM player_seasons WHERE season = i)
        INSERT INTO players
        SELECT
            COALESCE(ls.player_name, ts.player_name) as player_name,
            COALESCE(ls.height, ts.height) as height,
            COALESCE(ls.college, ts.college) as college,
            COALESCE(ls.country, ts.country) as country,
            COALESCE(ls.draft_year, ts.draft_year) as draft_year,
            COALESCE(ls.draft_round, ts.draft_round) as draft_round,
            COALESCE(ls.draft_number, ts.draft_number) as draft_number,
            COALESCE(ls.seasons,
                ARRAY[]::season_stats[]
                ) || CASE WHEN ts.season IS NOT NULL THEN
                    ARRAY[ROW(
                    ts.season,
                    ts.pts,
                    ts.ast,
                    ts.reb, ts.weight)::season_stats]
                    ELSE ARRAY[]::season_stats[] END
                as seasons,
            CASE
                WHEN ts.season IS NOT NULL THEN
                    (CASE WHEN ts.pts > 20 THEN 'star'
                        WHEN ts.pts > 15 THEN 'good'
                        WHEN ts.pts > 10 THEN 'average'
                        ELSE 'bad' END)::scoring_class
                ELSE ls.scoring_class
            END as scoring_class,
            ts.season IS NOT NULL as is_active,
            i AS current_season
        FROM last_season ls
        FULL OUTER JOIN this_season ts
        ON ls.player_name = ts.player_name;
    END LOOP;
END $$;
