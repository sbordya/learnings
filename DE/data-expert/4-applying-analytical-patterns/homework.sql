-- 1. A query that does state change tracking for players
with players_with_previous_active as (
	select *, 
		lag(is_active) over (partition by player_name order by current_season) as prev_is_active
	from players
),
players_with_state as (
	select *,
		(case
			when prev_is_active is null then 'New'
			when prev_is_active and not is_active then 'Retired'
			when prev_is_active and is_active then 'Continued Playing'
			when not prev_is_active and is_active then 'Returned from Retirement'
			when not prev_is_active and not is_active then 'Stayed Retired'
		end) as state
	from players_with_previous_active
)
select * from players_with_state

-- 2. 
with games_exploded as (
	select *, unnest(array[home_team_id, visitor_team_id]) as team_id
	from games
),
games_transformed as (
	select 
		game_id,
		team_id,
		season,
		(team_id = home_team_id) = (home_team_wins = 1) as is_winner
	from games_exploded
),
agg as (
    select 
        gd.player_name,
        gd.team_abbreviation,
        g.season,
        coalesce(sum(gd.pts), 0) as pts,
        coalesce(count(distinct (case when g.is_winner then g.game_id end)), 0) as winning_matches
    from games_transformed g
    join game_details gd
    on g.game_id = gd.game_id  and g.team_id = gd.team_id
    group by grouping sets (
        (player_name, team_abbreviation),
        (player_name, season),
        (team_abbreviation)
    )
)
select *
from agg

-- 3. who scored the most points playing for one team?
-- Giannis Antetokounmpo, team MIL, points 15591
select *
from agg
where player_name is not null and team_abbreviation is not null and season is null 
order by pts desc limit 1

-- 4. who scored the most points playing for one team?
-- James Harden, season 2018, points 3247
select *
from agg
where player_name is not null and team_abbreviation is null and season is not null 
order by pts desc limit 1

-- 5. which team has won the most games?
-- GSW, 445 winning matches
select *
from agg
where player_name is null and team_abbreviation is not null and season is null 
order by winning_matches desc limit 1

-- 6. What is the most games a team has won in a 90 game stretch?
with games_exploded as (
	select *, unnest(array[home_team_id, visitor_team_id]) as team_id
	from games
),
games_transformed as (
	select *, (team_id = home_team_id) = (home_team_wins = 1) as is_winner
	from games_exploded
),
games_90_game_stretch as (
	select 
		team_id,
		sum(case when is_winner then 1 end) over (
			partition by team_id 
			order by game_id 
			rows between 90 preceding and current row
		) as stretch_90_games_wins_count
	from games_transformed
)
select team_id, max(stretch_90_games_wins_count) as max_stretch_90_games_wins_count
from games_90_game_stretch
group by team_id 

-- 7. How many games in a row did LeBron James score over 10 points a game?
-- 163 games in a row
with gd_more_10_pts as (
	select player_name, game_id, case when pts > 10 then true else false end as more_10_pts
	from game_details
),
gd_window as (
	select *, sum(case when not more_10_pts then 1 end) over (partition by player_name order by game_id) as window_sum
	from gd_more_10_pts
),
gd_groups as (
	select *, case when more_10_pts then window_sum end as window_group
	from gd_window
)
select window_group, count(1)
from gd_groups
where player_name = 'LeBron James' and window_group is not null
group by window_group
order by count(1) desc
