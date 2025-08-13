# Week 5 — Data Pipeline Maintenance

## Owners & Responsibilities

| Pipeline                                   | Primary Owner            | Secondary Owner       |
| ------------------------------------------ | ------------------------ | --------------------- |
| Profit                                     | Finance Team / Risk Team | Data Engineering Team |
| Growth                                     | Accounts Team            | Data Engineering Team |
| Engagement                                 | Software Frontend Team   | Data Engineering Team |
| Aggregated Data for Executives & Investors | Business Analytics Team  | Data Engineering Team |

---

## Fair On-Call Schedule

To ensure fairness, on-call duty rotates weekly among all data engineers, with consideration for holidays and personal leave.

- **Rotation:** 1 week per engineer, cycle repeats every 4 weeks.
- **Holiday Coverage:** Swap shifts in advance to avoid overloading anyone during holidays.
- **Hand-off:** 30-minute meeting on Monday mornings to brief the next on-call engineer.

**Example Rotation for 4 Engineers (A, B, C, D):**

- Week 1: A
- Week 2: B
- Week 3: C
- Week 4: D
- Repeat cycle.

---

## Runbooks for Pipelines Reporting to Investors

### 1. Profit Pipeline

**Data Sources:**

- Revenue from accounts
- Operational expenses and asset costs (from Ops team)
- Aggregated salaries by team

**Common Issues:**

- Discrepancies between pipeline output and official filings → must be accountant-verified.
- Possible delays in cost data from Ops team.

**SLA:**

- Monthly review by accounts team.

**On-Call:**

- Weekly rotation by BI in profit team; fix issues immediately upon detection.

---

### 2. Growth Pipeline

**Data Sources:**

- Account type changes
- Number of licensed users
- Subscription status (renewed, canceled)

**Common Issues:**

- Missing current account status due to incomplete time-series entries.
- Inconsistent change steps (skipped states).

**SLA:**

- Latest account statuses available by week’s end.

**On-Call:**

- No immediate on-call, debug during working hours.

---

### 3. Engagement Pipeline

**Data Sources:**

- User clicks from all teams across platform

**Common Issues:**

- Late Kafka queue arrivals after aggregation is complete.
- Kafka downtime → no click events captured.
- Duplicate events requiring de-duplication.

**SLA:**

- Data arrival within 48 hours.
- Issues resolved within 1 week.

**On-Call:**

- Weekly rotation within DE team.
- SWE team contact available for support.

---

### 4. Aggregated Data for Executives & Investors Pipeline

**Data Sources:**

- Profit, Growth, and Engagement pipeline outputs joined via Spark.

**Common Issues:**

- Spark join failures due to large dataset OOM errors.
- Stale data from upstream pipelines.
- Missing data causing NA/divide-by-zero errors.

**SLA:**

- All issues resolved before end-of-month reporting.

**On-Call:**

- Last week of month — DE monitors pipeline closely to ensure smooth reporting.

---
