from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, desc, count, col, collect_set, collect_list, struct, broadcast, explode, array_contains

def find_player_with_most_avg_kills_per_game(agg_df):
    return agg_df \
        .withColumn("player_total_kills", explode("player_total_kills")) \
        .groupBy("player_total_kills.player_gamertag") \
        .agg(avg("player_total_kills.player_total_kills").alias("avg_kills")) \
        .orderBy(desc("avg_kills"))

def find_most_played_playlist(agg_df):
    return agg_df \
        .groupBy("playlist_id") \
        .agg(count("*").alias("played_count")) \
        .orderBy(desc("played_count"))

def find_most_played_map(agg_df):
    return agg_df \
        .groupBy("mapid") \
        .agg(count("*").alias("played_count")) \
        .orderBy(desc("played_count"))

def find_map_with_most_killing_spree_medals(agg_df):
    return agg_df \
        .filter(array_contains(col("medal_names"), "Killing Spree")) \
        .groupBy("mapid") \
        .agg(count("*").alias("killing_spree_count")) \
        .orderBy(desc("killing_spree_count"))

def main():
    spark = SparkSession.builder \
      .master("local") \
      .appName("homework3") \
      .config("spark.sql.autoBroadcastJoinThreshold", "-1") \
      .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog") \
      .getOrCreate()
    
    datasets = []
    dataset_names = ['match_details', 'matches', 'medals_matches_players', 'medals']
    for dataset_name in dataset_names:
        dataset = spark.read.csv(f"../../data/{dataset_name}.csv", inferSchema=True, header=True)
        if dataset_name != 'medals':
            dataset.write.mode("overwrite").bucketBy(16, "match_id").sortBy("match_id").saveAsTable(f"demo.bootcamp.{dataset_name}")
            dataset = spark.table(f"demo.bootcamp.{dataset_name}")
        datasets.append(dataset)
    match_details, matches, medals_matches_players, medals = datasets


    match_details_reduced = match_details.select("match_id", "player_gamertag", "player_total_kills") \
        .groupBy("match_id") \
        .agg(collect_list(struct("player_gamertag", "player_total_kills")).alias("player_total_kills"))
    matches_reduced = matches.select("match_id", "mapid", "playlist_id")
    medals_matches_players_reduced = medals_matches_players.select("match_id", "medal_id")
    medals_reduced = medals.select("medal_id", "name")

    medals_matches = medals_matches_players_reduced \
        .join(broadcast(medals_reduced), "medal_id") \
        .drop("medal_id") \
        .groupBy("match_id") \
        .agg(collect_set("name").alias("medal_names"))
    
    agg_df = matches_reduced \
        .join(medals_matches, "match_id") \
        .join(match_details_reduced, "match_id") \

    find_player_with_most_avg_kills_per_game(agg_df).show()
    find_most_played_playlist(agg_df).show()
    find_most_played_map(agg_df).show()
    find_map_with_most_killing_spree_medals(agg_df).show()

    stats_df = None
    for column in ["match_id", "mapid", "playlist_id"]:
        agg_df.sortWithinPartitions(column).writeTo(f"demo.bootcamp.sorted_by_{column}").using("iceberg").createOrReplace()
        stat_df = spark.sql(f"SELECT '{column}' as column, SUM(file_size_in_bytes) as size, COUNT(1) as num_files FROM demo.bootcamp.sorted_by_{column}.files")
        stats_df = stats_df.union(stat_df) if stats_df else stat_df
    stats_df.show()
    """
    +-----------+-------+---------+
    |     column|   size|num_files|
    +-----------+-------+---------+
    |   match_id|1885262|        4|
    |      mapid|1873855|        4|
    |playlist_id|1864199|        4|
    +-----------+-------+---------+
    """
    