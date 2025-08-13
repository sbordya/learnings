# Dimensional Data Modeling — Days 1–3

---

## **Day 1 — Foundations**

### 1. What is a Dimension?

- **Definition:** Attributes of an entity.
  - Identifying (e.g., user ID)
  - Non-identifying (e.g., birthday, favorite food)
- **Types:**
  - Slowly-changing
  - Fixed

### 2. Topics Covered

- Knowing your data consumer
- OLTP vs OLAP data modeling
- Cumulative table design
- Compactness vs usability tradeoff
- Temporal cardinality explosion
- Run-length encoding compression pitfalls

### 3. Knowing Your Consumer

| Consumer                 | Design Goal                          |
| ------------------------ | ------------------------------------ |
| Data analysts/scientists | Easy to query, minimal complex types |
| Other data engineers     | Compact, nested types acceptable     |
| ML models                | Depends on training                  |
| Customers                | Clear, easy-to-read charts           |

### 4. OLTP vs Master Data vs OLAP

- **OLTP:** Low-latency, low-volume queries.
- **OLAP:** Large volume, aggregation queries, minimal JOINs.
- **Master Data:** Completeness, deduplication.

**Mismatch between modeling and consumer needs → loss of business value!**

### 5. Cumulative Table Design

- **Process:**
  - Use “yesterday” and “today” dataframes.
  - FULL OUTER JOIN → COALESCE unchanged values.
  - Keep all history.
- **Use cases:** Growth analytics, state transitions.
- **Pros:** Easy historical & transition analysis.
- **Cons:** Sequential backfilling only, PII handling issues.

### 6. Compactness vs Usability

- **Most usable:** No complex types, human-friendly queries.
- **Most compact:** Highly compressed, requires decoding.
- **Middle ground:** Complex types (ARRAY, MAP, STRUCT).

### 7. Temporal Cardinality Explosion

- Adding time to dimensions can increase size ×10.
- Example: Airbnb nightly availability → billions of rows.
- Denormalized + joins → shuffle → compression loss.

### 8. Run-Length Encoding Compression

- Key to Parquet’s success.
- Shuffle (JOIN/GROUP BY) can destroy compression.

---

## **Day 2 — Idempotency & Slowly-Changing Dimensions**

### 1. Idempotent Pipelines

- **Definition:** Same results regardless of run time or frequency.
- **Benefits:** Avoid silent failures, easier troubleshooting, reliable backfills.
- **Causes of non-idempotence:**
  - `INSERT INTO` without `TRUNCATE`
  - Using `start_date >` without `end_date <`
  - Missing partition sensors
  - Using “latest” partition in SCDs

### 2. Troubles with Non-Idempotence

- Inconsistent backfills
- Hard debugging
- Unit tests can’t replicate prod issues

### 3. Slowly-Changing Dimensions (SCD)

- **Reasons for change:** Preferences, location, category shifts.
- **Modeling approaches:**
  - Singular snapshots (non-idempotent)
  - Daily partitioned snapshots
  - SCD Types 0, 1, 2, 3

#### SCD Types:

| Type | Description                       | Idempotent? | Notes                      |
| ---- | --------------------------------- | ----------- | -------------------------- |
| 0    | Fixed value                       | ✅ Yes      | Birthdate, etc.            |
| 1    | Latest only                       | ❌ No       | Destroys history           |
| 2    | Full history with start/end dates | ✅ Yes      | Multiple rows per entity   |
| 3    | Original + current only           | ❌ No       | Loses intermediate history |

### 4. SCD2 Loading

- **Full load:** One query for all history (simple, inefficient).
- **Incremental load:** Depends on past run (efficient, complex).

---

## **Day 3 — Advanced Topics**

### 1. Additive vs Non-Additive Dimensions

- **Additive:** Values don’t double count (e.g., age groups).
- **Non-additive:** Overlaps cause double counting (e.g., active users per platform).
- **Rule:** Additive if grain of data holds only one value in the time window.

### 2. Power of Enums

- Best for low/medium cardinality.
- Benefits: Built-in quality, static fields, documentation.
- Useful for subpartitions with exhaustive lists.

**Examples:**

- Airbnb: Unit economics (fees, taxes, etc.)
- Netflix: Infrastructure graph
- Facebook: Family of apps

### 3. Flexible Schemas

- **Benefits:** No ALTER TABLE, fewer NULL columns, flexibility.
- **Drawbacks:** Worse compression (esp. JSON), lower readability.

### 4. Graph Data Modeling

- Relationship-focused, not entity-focused.
- **Entity model:**
  - Identifier, type, properties (MAP)
- **Relationship model:**
  - Subject/object identifiers & types
  - Edge type
  - Properties (MAP)

**Example:** NBA player-team-opponent relationships.

---

## Labs

- **Day 1:** Cumulative table building.
- **Day 2:** Idempotent SCD pipelines.
- **Day 3:** Graph model for NBA dataset.
