1. Follow these instructions first: https://github.com/DataExpert-io/data-engineer-handbook/blob/main/bootcamp/materials/4-apache-flink-training/README.md
2. Run `prereq.sql` script to create required tables in Postgres
3. Put `homework_job.py` file in the directory `bootcamp/materials/4-apache-flink-training`
4. Run flink job: `docker compose exec jobmanager ./bin/flink run -py /opt/src/job/homework_job.py --pyFiles /opt/src -d`
5. Wait 15 - 30 minutes so there are enough records in postgres table `processed_events_aggregated_ip_host`
6. Run sql queires from `homework.sql` (your results will be most probably different)

Sample from `processed_events_aggregated_ip_host`:

```
event_hour             |ip                             |host                  |num_hits|
-----------------------+-------------------------------+----------------------+--------+
2025-08-05 15:34:56.112|185.225.28.201                 |www.dataexpert.io     |       3|
2025-08-05 15:35:14.655|74.12.107.215                  |www.dataexpert.io     |       4|
2025-08-05 15:35:49.290|103.39.244.197                 |learn.dataexpert.io   |       2|
2025-08-05 15:36:04.501|49.207.209.206                 |learn.dataexpert.io   |       1|
2025-08-05 15:36:38.923|172.59.217.30                  |learn.dataexpert.io   |       1|
2025-08-05 15:35:26.473|31.165.241.253                 |learn.dataexpert.io   |       2|
```
