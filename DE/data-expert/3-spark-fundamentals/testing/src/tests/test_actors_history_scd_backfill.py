from chispa.dataframe_comparer import *

from ..jobs.actors_history_scd_backfill_job import do_actors_history_scd_backfill
from collections import namedtuple

Actor = namedtuple("Actor",  "actorid actor is_active quality_class year")
ActorPeriod = namedtuple("ActorPeriod",  "actorid actor is_active quality_class start_date end_date")


def test_actors_history_scd_backfill(spark):
    input_data = [
        Actor(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = True,
            quality_class = "star",
            year = 1994
        ),
        Actor(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = True,
            quality_class = "star",
            year = 1995
        ),
        Actor(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = True,
            quality_class = "good",
            year = 1996
        ),
        Actor(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = False,
            quality_class = "good",
            year = 1997
        ),
        Actor(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = False,
            quality_class = "good",
            year = 1998
        )
    ]
    source_df = spark.createDataFrame(input_data)
    actual_df = do_actors_history_scd_backfill(source_df)

    expected_values = [
        ActorPeriod(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = True,
            quality_class = "star",
            start_date = 1994,
            end_date = 1995
        ),
        ActorPeriod(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = True,
            quality_class = "good",
            start_date = 1996,
            end_date = 1996
        ),
        ActorPeriod(
            actorid = 1,
            actor = "Brad Pitt",
            is_active = False,
            quality_class = "good",
            start_date = 1997,
            end_date = 1998
        )
    ]
    expected_df = spark.createDataFrame(expected_values)
    assert_df_equality(actual_df, expected_df)
