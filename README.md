# VOLT · Power Bank Sharing — CRM + Client App Prototype

Working prototype of a power bank rental system for Dar es Salaam, Tanzania.
Includes a CRM panel, a clickable client app mockup, and a production architecture document.

Opens with a double-click, no build or install required. Data is synthetic and
generated deterministically — all counters and amounts are consistent across screens.

---

## Structure

| Path | What | How to open |
|---|---|---|
| `crm/` | CRM web panel (demo, vanilla JS) | `crm/index.html` |
| `app-mobile/` | Client app — clickable mockup in iPhone frame | `app-mobile/index.html` |
| `docs/ARCHITECTURE.md` | Production architecture: Firestore, flows, roles, billing (M-Pesa), MVP plan | any Markdown viewer |
| `screenshots/` | Screenshots of all screens | — |

Recommended: serve via local HTTP server (fonts and QR work from disk too, but this is more reliable):

```bash
cd volt-proto-push && python3 -m http.server 8742
# CRM:        http://localhost:8742/crm/
# Client app: http://localhost:8742/app-mobile/
```

---

## What to look at in CRM (5 minutes)

1. **Overview** — KPIs are computed from data, not hardcoded: renting / available /
   utilisation / revenue / fleet health / critical alerts. Below "Available" —
   a +2 hour forecast (expected returns minus new rentals).

2. **Live demo** (button in the header) — simulates station events: rentals, returns,
   charging, alerts. KPIs and the event feed update in real time.

3. **Stations → Mlimani City Mall** — station slot grid: charged / charging / empty,
   event log, maintenance journal, service entry form.

4. **Power Banks** — registry with serial numbers (`PB-YYMM-NNNNN`): status, **who
   rented and when**, charge level, cycles, health score. Click a row — detail card
   with a **real scannable QR**, degradation chart, and full lifecycle history
   (rentals, maintenance, alerts).

5. **Rentals** — who rented / when / charge at pickup and **at return** / amount
   charged at tariff. Active, completed, overdue (> 24 h).

6. **Role switcher** (bottom of sidebar):
   - **Operator** — own station only, no financials, client phones masked;
   - **Manager** — full network access;
   - **Investor** — financials and aggregates, zero PII, plus ad inventory concept.

---

## What to look at in the client app

Map (drawn SVG city — Dar es Salaam) → station with slots → QR scanner (auto-scan) →
confirmation with tariff → active rental with live timer → history and receipt.
Ad slots are shown as dashed placeholders — **ad screens were deliberately not built**:
rental core first, monetisation second (model in architecture, §6).

---

## Demo data canon

| Parameter | Value |
|---|---|
| Stations | 5 (Dar es Salaam) |
| Total slots | 62 |
| Total power banks | 64 |
| Renting | 18 |
| Charged | 28 |
| Charging | 11 (of which 3 at < 20%) |
| In service | 5 |
| Retired | 2 |
| Tariff | TZS 1,500 first hour · TZS 800/hr after · cap TZS 7,000/day |
| Deposit hold | TZS 3,000 (M-Pesa STK Push) |
| Health formula | `health = max(100 − cycles × 0.05, 10)`, replacement threshold 30% |

CRM and client app numbers are synchronised.

Station names used: Mlimani City Mall · Kariakoo Market · JNIA Terminal · Ubungo Terminal · Posta (CBD).

---

## Production stack (details in docs/ARCHITECTURE.md)

React + TypeScript (CRM) · Flutter (client and operator) · Firebase
(Auth + Firestore + Cloud Functions + Storage + FCM) · M-Pesa Vodacom TZ primary,
Airtel Money / Tigo Pesa via Selcom/Azampay aggregator (fallback) · station emulator
for development without hardware.

Languages: EN / SW / RU.  
MVP — 3–4 weeks, pilot on one station.

---

## Prototype limitations (honest)

- Data lives in browser memory, no backend — this is a product demo, not a product.
- Demo is vanilla JS so it opens without a build step; production is React
  (innerHTML rendering is acceptable here only because all data is local).
- Operator app is wave 2 — described in architecture (§7), no screens built.
- Map in the client app is a drawn illustration; production uses OpenStreetMap / Mapbox SDK.
