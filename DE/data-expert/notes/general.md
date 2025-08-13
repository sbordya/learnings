1. bucket join avoids shuffle; number - multiple of 2
2. sortwithingpartition doesn't require shuffle and optimizes disk space (column format optimization for repetative values): lower cardinality -> more saving
3. group by: grouping sets, cube, rollup
4. window: partition by, order by, rows (default: between unbounded preceding and current row)
5. recurcion cte: for hierarhical structures (manager -> reporter)
6. dashboards: low latency storage like Druid
7. dashboard: trend/derivative/total metrics (YoY, MoM, totals)
8. Cloud bills: IO > compute > storage. Try to reduce IO as much as possible (moving data from A to B). More true if there are a lot downstreams (IO \* n_downstreams), a bit different in downstream closer to BI (IO less magnitude overall)
9. experiment testing: statsig (statsig.com)
10. minevra (open source) validaiton

hint:

1. understand goals, queries and bottlenecks/pains of analytics (good job: speed up analysts)
2. make analytics queries simpler
3. storage is cheaper is compute (compute + storage to materialize dasaset < n \* (compute + engineer time for a query))
4. otimise cloud bills: backfill 1 month, validate, than backfill the rest
5. otimise cloud bills: use cumulative design
6. otimise cloud bills: sampling if possible, subpartitioning low-cardinality 5-30 or less (predicate pushdown filter reduces IO)
