from pyspark.sql import SparkSession

def do_actors_history_scd_backfill(dataframe):
    query = f"""
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
    select * from increment
    """
    dataframe.createOrReplaceTempView("actors")
    return dataframe.sparkSession.sql(query)


def main():
    spark = SparkSession.builder \
      .master("local") \
      .appName("actors_history_scd_backfill") \
      .getOrCreate()
    output_df = do_actors_history_scd_backfill(spark.table("actors"))
    output_df.write.mode("overwrite").insertInto("actors_history_scd")