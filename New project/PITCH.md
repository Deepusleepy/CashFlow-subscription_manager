# CashFlow — Hackathon pitch

## Problem

Young professionals accumulate forgotten subscriptions, silent autopays, and unusual expenses inside cluttered statements. Keyword matching breaks as merchants rename themselves, dates drift, and prices change—while basic anomaly systems wrongly flag genuine commitments.

## Solution

CashFlow turns raw transactions into a clear, explainable action list. It finds recurring commitments despite messy descriptors, detects anomalies separately, identifies low-value or overlapping subscriptions, and explains every decision in plain language.

## Key differentiator

CashFlow combines semantic merchant similarity with cadence and amount signals. `NETFLIX.COM`, `Netflix Mumbai`, and `Nflx*Streaming` become one understandable relationship—not three unrelated bank entries. Every recommendation opens a “Why was this flagged?” drawer with the evidence behind it.

## Avoiding false positives

New repeat payments are not treated as waste. If a charge repeats 2–3 times with a stable amount, predictable timing, and similar payee semantics, CashFlow labels it **New recurring commitment — learning**. It is excluded from savings until low engagement, duplicate coverage, or user confirmation creates a stronger case. The user can mark it Essential, Shared expense, Subscription, or Review later.

## Business value

- A clearer reason to open a banking or personal-finance app every month.
- Actionable savings opportunities instead of generic spend charts.
- Trust through transparent evidence and explicit user controls.
- A scalable financial-wellness layer for neobanks, payroll platforms, and card issuers.

## Future roadmap

1. Consent-based Plaid/Open Banking ingestion and statement parsing.
2. Real transaction embeddings plus merchant enrichment and vector search.
3. Optional calendar/receipt confirmation and subscription cancellation handoff.
4. Personalized cash-flow forecasts and shared-household expense workflows.
5. Privacy-preserving learning from correction feedback.

## 60-second pitch

“Most people don’t have a spending problem—they have a visibility problem. Their statements hide forgotten subscriptions behind changing merchant names and bury unusual purchases among hundreds of transactions. CashFlow reads the pattern, not just the keyword. It semantically links messy charges like NETFLIX.COM and Nflx Streaming, checks whether timing and amounts repeat, then separates real recurring commitments from one-off anomalies. Crucially, it doesn’t shame a new roommate rent split as waste: it marks it as learning and asks the user for context. The result is an explainable, privacy-minded financial co-pilot that finds money to save without making people distrust their bank.”
