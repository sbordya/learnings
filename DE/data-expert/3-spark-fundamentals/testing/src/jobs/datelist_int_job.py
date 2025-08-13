from pyspark.sql import SparkSession

def do_datelist_int_transformation(dataframe):
    query = f"""
    with user_devices_cumulated_unnested as (
        select user_id, browser_type, datediff(curr_date, activity_date) as days_since_active, curr_date
        from user_devices_cumulated
        lateral view explode(device_activity_datelist) AS activity_date
    )
    select user_id, browser_type, bigint(sum(pow(2, 30 - days_since_active))) as datelist_int, curr_date
    from user_devices_cumulated_unnested
    group by user_id, browser_type, curr_date
    """
    dataframe.createOrReplaceTempView("user_devices_cumulated")
    return dataframe.sparkSession.sql(query)


def main():
    spark = SparkSession.builder \
      .master("local") \
      .appName("datelist_int") \
      .getOrCreate()
    output_df = do_datelist_int_transformation(spark.table("user_devices_cumulated"))
    output_df.write.mode("overwrite").insertInto("user_devices_cumulated_datelist_int")