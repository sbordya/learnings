-- What is the average number of web events of a session from a user on Tech Creator?
-- result: 4.3333333333333333
select avg(num_hits) as techcreator_session_avg_hit
from processed_events_aggregated_ip_host
where host like '%techcreator%'

-- Compare results between different hosts (zachwilson.techcreator.io, zachwilson.tech, lulu.techcreator.io)
-- result:
-- host                     |techcreator_session_avg_hit|
-- -------------------------+---------------------------+
-- zachwilson.techcreator.io|         5.5000000000000000|
-- zachwilson.tech          |         2.9777777777777778|
-- lulu.techcreator.io      |         2.9473684210526316|
select host, avg(num_hits) as techcreator_session_avg_hit
from processed_events_aggregated_ip_host
where host in ('zachwilson.techcreator.io', 'zachwilson.tech', 'lulu.techcreator.io')
group by host
order by avg(num_hits) desc
