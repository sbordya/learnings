# Streaming Pipelines — Day 1

---

## 1. Streaming, Near Real-Time, and Real-Time

### 1.1 Definitions

- **Streaming (Continuous Processing)**
  - Data is processed as it is generated.
  - Example: **Flink**.
- **Near Real-Time**
  - Data is processed in small batches every few minutes.
  - Example: **Spark Structured Streaming**.
- **Real-Time**
  - Often used interchangeably with streaming, but not always.
  - Stakeholders usually mean:
    - Low latency
    - Predictable refresh rate
  - Rarely true continuous streaming.

### 1.2 Misconceptions

- Some non-technical stakeholders think _real-time_ and _batch_ are the same.
- Real-time always has inherent latency (seconds from event to final sink).

---

## 2. Deciding Whether to Use Streaming

### 2.1 Considerations

- Skills of the team.
- Incremental benefit of lower latency.
- Homogeneity of your pipelines.
- Trade-off between:
  - Daily batch
  - Hourly batch
  - Micro-batch
  - Streaming
- Data quality insertion:
  - Batch pipelines make data quality checks easier.

### 2.2 Streaming-Only Use Cases

> **Key:** Low latency is essential for the use case to succeed.

- Fraud detection, prevention of bad behavior.
- High-frequency trading.
- Live event processing.

### 2.3 Gray-Area Use Cases

- Micro-batch may also work.
- Examples:
  - Serving data to customers.
  - Reducing latency of master data.
  - Example: Notifications dataset latency reduced from 9h to 1h with micro-batch.

### 2.4 No-Go Streaming Use Cases (Batch Preferred)

- Ask: _What is the incremental benefit of reduced latency?_
- Example:
  - Analysts complaining about slightly outdated data.
  - Yesterday’s data by 9 AM is sufficient for most analytical needs.

---

## 3. How Streaming Pipelines Differ from Batch Pipelines

- **Execution Time**
  - Streaming: Runs 24/7.
  - Batch: Runs during a small part of the day.
- **Nature**
  - Streaming pipelines behave like servers.
  - Batch pipelines behave like DAGs.
- **Engineering Approach**
  - Streaming requires more unit and integration tests.
  - Treated as ongoing services, not one-off jobs.

---

## 4. The Streaming → Batch Continuum

### 4.1 Categories

1. **Daily Batch**
2. **Hourly Batch** (near real-time)
3. **Micro-Batch** (near real-time)
4. **Continuous Processing** (real-time)

### 4.2 Reality Check

- True "real-time" is a myth.
- Latency exists: Event Generation → Kafka → Flink → Sink.

---

## 5. Structure of a Streaming Pipeline

### 5.1 Sources

- Kafka
- RabbitMQ
- Enriched dimensional sources (side inputs).

### 5.2 Compute Engine

- Flink
- Spark Structured Streaming
- Function: Interpret and process incoming streams.

### 5.3 Destinations (Sinks)

- Another Kafka topic.
- Iceberg.
- Postgres.

---

## 6. Common Streaming Challenges

### 6.1 Out-of-Order Events

- Handled in Flink via **watermarking**.

### 6.2 Late-Arriving Data

- Define "how late is too late?"
- Batch systems often wait to handle late data but can also have midnight UTC issues.

### 6.3 Recovering from Failures

- Flink recovery methods:
  - **Offsets**
    - Earliest offset
    - Latest offset
    - Specific timestamp (e.g., failure time)
  - **Checkpoints**
  - **Savepoints**

---

## 7. Lab Exercise

- Write a job that connects to Kafka.
- Filter out irrelevant events.
- Write processed events to Postgres.

---
