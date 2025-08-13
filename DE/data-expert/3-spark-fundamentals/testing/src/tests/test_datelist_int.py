from chispa.dataframe_comparer import *
from datetime import date

from ..jobs.datelist_int_job import do_datelist_int_transformation
from collections import namedtuple

DeviceActivityDatelist = namedtuple("DeviceActivityDatelist",  "user_id browser_type device_activity_datelist curr_date")
DeviceActivityDatelistInt = namedtuple("DeviceActivityDatelistInt",  "user_id browser_type datelist_int curr_date")


def test_datelist_int(spark):
    input_data = [
        DeviceActivityDatelist(
            user_id = 1,
            browser_type = "Chrome",
            device_activity_datelist = [date(2025, 7, 25), date(2025, 7, 20), date(2025, 7, 15)],
            curr_date = date(2025, 7, 30)
        )
    ]

    source_df = spark.createDataFrame(input_data)
    actual_df = do_datelist_int_transformation(source_df)

    expected_values = [
        DeviceActivityDatelistInt(
            user_id = 1,
            browser_type = "Chrome",
            datelist_int = 34635776,
            curr_date = date(2025, 7, 30)
        )
    ]
    expected_df = spark.createDataFrame(expected_values)
    assert_df_equality(actual_df, expected_df)
