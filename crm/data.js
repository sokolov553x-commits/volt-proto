/* ════════════════════════════════════════════════════════════
   VOLT CRM · Tanzania · Dar es Salaam · synthetic demo data
   Deterministic seed → identical picture on every page load.
   All KPIs computed FROM data (no hardcoded numbers in UI),
   so totals and counters are consistent by construction.

   Network canon (synced with mobile mockup):
   · 5 stations · 62 slots · 64 powerbanks
   · renting 18 · charged 28 · charging 11 (3 of those < 20%)
   · in service 5 · retired 2
   · Currency: TZS · Tariff: 1,500 TZS first hour · 800/hr · max 7,000 TZS/day
   ════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── seeded PRNG (mulberry32) ── */
  let _s = 20260610;
  function rnd() {
    _s |= 0; _s = (_s + 0x6D2B79F5) | 0;
    let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

  const NOW = Date.now();
  const MIN = 60 * 1000, HOUR = 60 * MIN, DAY = 24 * HOUR;

  /* ── tariff (Tanzania · TZS) ── */
  const TARIFF = {
    firstHourTzs: 1500,
    nextHourTzs:   800,
    dayCapTzs:    7000,
    depositTzs:   3000,
    currency: "TZS",
    label: "1,500 TZS first hour · 800 TZS/hr after · max 7,000 TZS/day",
    // aliases for backwards compat
    get firstHourRub() { return this.firstHourTzs; },
    get nextHourRub()  { return this.nextHourTzs; },
    get dayCapRub()    { return this.dayCapTzs; },
    get depositRub()   { return this.depositTzs; },
  };

  const fmtCurrency = n => n.toLocaleString('en-TZ') + ' TZS';

  function rentalCost(durationMin) {
    const fullDays = Math.floor(durationMin / (24 * 60));
    const restMin = durationMin - fullDays * 24 * 60;
    let rest = 0;
    if (restMin > 0) {
      rest = TARIFF.firstHourTzs;
      if (restMin > 60) rest += Math.ceil((restMin - 60) / 60) * TARIFF.nextHourTzs;
      rest = Math.min(rest, TARIFF.dayCapTzs);
    }
    return fullDays * TARIFF.dayCapTzs + rest;
  }

  /* ── stations · Dar es Salaam ── */
  const stations = [
    { id: "st1", name: "Mlimani City Mall · 1st floor",   addr: "Sam Nujoma Rd, Mlimani",           slots: 16, status: "active",      operator: "Amani Mwanga",  lastPing: NOW - 22 * 1000 },
    { id: "st2", name: "Kariakoo Market · main entrance", addr: "Msimbazi St, Kariakoo",             slots: 12, status: "active",      operator: "Juma Rashidi",  lastPing: NOW - 9 * 1000 },
    { id: "st3", name: "Msasani Mall · lobby",            addr: "Toure Dr, Msasani Peninsula",       slots: 12, status: "active",      operator: "Juma Rashidi",  lastPing: NOW - 31 * 1000 },
    { id: "st4", name: "JNIA Airport · arrivals hall",    addr: "Julius Nyerere International",      slots: 10, status: "maintenance", operator: "Baraka Omari",  lastPing: NOW - 4 * HOUR - 12 * MIN },
    { id: "st5", name: "Ubungo Terminal · bus hub",       addr: "Morogoro Rd, Ubungo",               slots: 12, status: "active",      operator: "Baraka Omari",  lastPing: NOW - 14 * 1000 },
  ];

  /* ── placement plan (canon) ──
     stationId → { charged: n, chargingLevels: [..%] } */
  const PLACEMENT = {
    st1: { charged: 9, chargingLevels: [34, 61] },
    st2: { charged: 6, chargingLevels: [14, 45, 72] },
    st3: { charged: 7, chargingLevels: [9, 52, 66] },
    st4: { charged: 0, chargingLevels: [] },
    st5: { charged: 6, chargingLevels: [18, 38, 70] },
  };
  const N_RENTING = 18, N_SERVICE = 5, N_RETIRED = 2;

  /* ── clients ── */
  const NAMES = [
    "Zawadi Mwangi", "Jabari Ochieng", "Amina Hassan", "Kelvin Ndegwa",
    "Fatuma Salim", "Rashid Omari", "Grace Mbeki", "Ibrahim Kamau",
    "Neema Odhiambo", "David Kiprotich", "Salma Juma", "Patrick Mutua",
    "Zainab Abdi", "Felix Otieno", "Rehema Waweru", "Samuel Mwangi",
    "Aisha Mwamba", "Daniel Njoroge", "Mariam Shafi", "Emmanuel Owuor",
    "Lydia Akinyi", "Hassan Rashidi", "Priscilla Wanjiku", "Moses Kipchoge",
  ];
  const clients = NAMES.map((name, i) => ({
    id: "c" + (i + 1),
    name,
    phone: `+255 7${ri(10, 79)} ${ri(100, 999)} ${String(ri(100, 999))}`,
    registered: NOW - ri(5, 320) * DAY,
    status: "active",
    activeRentalId: null, // set below
  }));

  /* ── powerbanks ── */
  const powerbanks = [];
  let serialSeq = 1;
  function makeSerial() {
    const batches = ["2410", "2412", "2501", "2503", "2603"];
    const batch = batches[Math.min(Math.floor((serialSeq - 1) / 14), batches.length - 1)];
    return `PB-${batch}-${String(serialSeq++ * 7 + ri(0, 5)).padStart(5, "0")}`;
  }
  function makeBank(status, stationId, charge, slotN) {
    // cycle distribution: most of fleet is fresh, tail = replacement candidates
    const r0 = rnd();
    const cycles = r0 < 0.62 ? ri(40, 500) : r0 < 0.92 ? ri(500, 900) : ri(1000, 1300);
    return {
      id: "pb" + (powerbanks.length + 1),
      serial: makeSerial(),
      status,                 // charged | charging | renting | service | retired
      stationId: stationId || null,
      slot: slotN || null,
      charge,                 // 0–100
      cycles,
      health: Math.max(Math.round((100 - cycles * 0.05) * 10) / 10, 10),
      capacityMah: pick([5000, 10000, 10000, 10000, 20000]),
      manufactured: NOW - ri(120, 600) * DAY,
      clientId: null,
      rentedAt: null,
    };
  }

  // at stations: charged and charging, slots in order
  for (const st of stations) {
    const plan = PLACEMENT[st.id];
    let slotN = 1;
    for (let i = 0; i < plan.charged; i++)
      powerbanks.push(makeBank("charged", st.id, ri(80, 100), slotN++));
    for (const lvl of plan.chargingLevels)
      powerbanks.push(makeBank("charging", st.id, lvl, slotN++));
  }
  // renting
  for (let i = 0; i < N_RENTING; i++) powerbanks.push(makeBank("renting", null, ri(15, 95), null));
  // service and retired
  for (let i = 0; i < N_SERVICE; i++) powerbanks.push(makeBank("service", null, ri(0, 60), null));
  for (let i = 0; i < N_RETIRED; i++) {
    const b = makeBank("retired", null, 0, null);
    b.cycles = ri(1400, 1800);
    b.health = Math.max(Math.round((100 - b.cycles * 0.05) * 10) / 10, 10);
    powerbanks.push(b);
  }

  /* ── rentals ──
     Completed over 14 days + 18 active (one per renting bank). */
  const rentals = [];
  let rentalSeq = 4810;

  // demand profile by hour (weight of rental start)
  const HOUR_W = [1,1,1,1,1,2,4,8,12,10,7,6,7,8,7,6,7,10,14,13,9,6,4,2];
  function demandHour() {
    const sum = HOUR_W.reduce((a, b) => a + b, 0);
    let x = rnd() * sum;
    for (let h = 0; h < 24; h++) { x -= HOUR_W[h]; if (x <= 0) return h; }
    return 19;
  }

  const activeStations = stations.filter((s) => s.status === "active");

  for (let d = 13; d >= 0; d--) {
    const dayStart = new Date(NOW - d * DAY); dayStart.setHours(0, 0, 0, 0);
    const dow = dayStart.getDay(); // 0=Sun
    const base = (dow === 0 || dow === 6) ? ri(12, 18) : ri(18, 28);
    const todays = d === 0 ? Math.round(base * 0.7) : base; // today not over yet
    for (let k = 0; k < todays; k++) {
      const startH = demandHour();
      const start = dayStart.getTime() + startH * HOUR + ri(0, 59) * MIN;
      const durMin = ri(25, 1100); // 25 min … ~18 h
      const end = start + durMin * MIN;
      if (end > NOW) continue; // incomplete today not counted as completed
      const chargeStart = ri(80, 100);
      const stFrom = pick(activeStations);
      rentals.push({
        id: "R-" + rentalSeq++,
        clientId: pick(clients).id,
        bankSerial: pick(powerbanks.filter((b) => b.status !== "retired")).serial,
        fromStation: stFrom.id,
        toStation: pick(activeStations).id,
        startedAt: start,
        returnedAt: end,
        durationMin: durMin,
        chargeStart,
        chargeEnd: Math.max(3, chargeStart - ri(15, 70)),
        amount: rentalCost(durMin),
        status: "completed",
      });
    }
  }

  // active rentals: exactly 18, linked to renting banks and unique clients
  const rentingBanks = powerbanks.filter((b) => b.status === "renting");
  const shuffled = clients.slice();
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  rentingBanks.forEach((bank, i) => {
    const client = shuffled[i];
    // one rental is intentionally overdue (> 24 h) — for warning alert
    const ageMin = i === 0 ? 26 * 60 : ri(10, 20 * 60);
    const startedAt = NOW - ageMin * MIN;
    const r = {
      id: "R-" + rentalSeq++,
      clientId: client.id,
      bankSerial: bank.serial,
      fromStation: pick(activeStations).id,
      toStation: null,
      startedAt,
      returnedAt: null,
      durationMin: null,
      chargeStart: ri(82, 100),
      chargeEnd: null,
      amount: null,
      status: ageMin > 24 * 60 ? "overdue" : "active",
    };
    rentals.push(r);
    bank.clientId = client.id;
    bank.rentedAt = startedAt;
    client.activeRentalId = r.id;
    // charge degrades over time while with client
    bank.charge = Math.max(8, r.chargeStart - Math.round(ageMin / 25));
  });

  /* ── alerts ── */
  const alerts = [];
  let alertSeq = 1;
  function addAlert(type, severity, title, msg, ref, ageMin, status) {
    alerts.push({
      id: "al" + alertSeq++,
      type, severity, title, msg, ref,
      createdAt: NOW - ageMin * MIN,
      status: status || "new", // new | in_progress | resolved
    });
  }

  // critical: 3 powerbanks < 20% at stations
  powerbanks
    .filter((b) => b.stationId && b.charge < 20)
    .forEach((b) => {
      const st = stations.find((s) => s.id === b.stationId);
      addAlert("low_charge", "critical", "Charge < 20%",
        `${b.serial} · ${b.charge}% · ${st.name}`, { bank: b.serial, station: st.id }, ri(8, 90));
    });
  // critical: station offline
  addAlert("station_offline", "critical", "Station offline",
    "JNIA Airport · arrivals hall — no ping for 4 h 12 min", { station: "st4" }, 252);
  // warnings
  const overdue = rentals.find((r) => r.status === "overdue");
  const overdueClient = clients.find((c) => c.id === overdue.clientId);
  // client name always masked in alerts: alert is operational, full name not needed
  const overdueShort = overdueClient.name.split(" ")[0] + " " + overdueClient.name.split(" ")[1][0] + ".";
  addAlert("overdue_rental", "warning", "Rental over 24 h",
    `${overdue.bankSerial} · ${overdueShort} · 26 h`, { rental: overdue.id }, 124);
  addAlert("slot_blocked", "warning", "Slot blocked",
    "Ubungo Terminal · bus hub — slot 11 not releasing powerbank", { station: "st5" }, 47, "in_progress");
  // info
  addAlert("maintenance_done", "info", "Maintenance complete",
    "Scheduled service · Kariakoo Market · 4 powerbanks checked", { station: "st2" }, 312, "resolved");
  addAlert("battery_returned_low", "info", "Returned at 4% charge",
    "PB-2501-00310 came back nearly empty — placed on charge", { station: "st3" }, 95, "resolved");

  /* ── maintenance log ── */
  const maintenance = [
    { at: NOW - 2 * DAY - 3 * HOUR,  station: "st2", operator: "Juma Rashidi",   type: "Inspection",   note: "Scheduled station check, slot contacts 1–12 cleaned." },
    { at: NOW - 2 * DAY - 1 * HOUR,  station: "st2", operator: "Juma Rashidi",   type: "Charging",     note: "4 powerbanks with charge < 40% moved to fast-charge slots." },
    { at: NOW - 3 * DAY,             station: "st1", operator: "Amani Mwanga",   type: "Replacement",  note: "PB-2410-00031 removed: swollen casing. Sent to service, photo attached." },
    { at: NOW - 4 * DAY - 5 * HOUR,  station: "st4", operator: "Baraka Omari",   type: "Repair",       note: "Station powered down to replace slot controller. Waiting for part." },
    { at: NOW - 5 * DAY,             station: "st5", operator: "Baraka Omari",   type: "Inventory",    note: "QR audit complete: 12/12 slots match records." },
    { at: NOW - 6 * DAY - 2 * HOUR,  station: "st3", operator: "Juma Rashidi",   type: "Inspection",   note: "Client complaint about slot 7 — unconfirmed, dispensing normal." },
    { at: NOW - 8 * DAY,             station: "st1", operator: "Amani Mwanga",   type: "Inventory",    note: "Shift handover: 14 powerbanks at station, no discrepancies." },
    { at: NOW - 9 * DAY - 4 * HOUR,  station: "st5", operator: "Baraka Omari",   type: "Cleaning",     note: "Terminal and QR sticker cleaning after complaint about unreadable code." },
  ];

  /* ── aggregates (all computed from data) ── */
  function aggregates() {
    const banksOnStations = powerbanks.filter((b) => b.stationId);
    const charged = banksOnStations.filter((b) => b.status === "charged");
    const charging = banksOnStations.filter((b) => b.status === "charging");
    const renting = powerbanks.filter((b) => b.status === "renting");
    const service = powerbanks.filter((b) => b.status === "service");
    const retired = powerbanks.filter((b) => b.status === "retired");
    const lowOnStation = banksOnStations.filter((b) => b.charge < 20);

    const todayStart = new Date(NOW); todayStart.setHours(0, 0, 0, 0);
    // скользящее окно 24 ч — демо не зависит от времени суток
    const completedToday = rentals.filter((r) => r.status === "completed" && r.returnedAt >= NOW - 24 * HOUR);
    const revenueToday = completedToday.reduce((s, r) => s + r.amount, 0);

    // utilisation: renting / working fleet (service and retired not counted)
    const working = charged.length + charging.length + renting.length;
    const utilization = working ? Math.round((renting.length / working) * 100) : 0;

    const alive = powerbanks.filter((b) => b.status !== "retired");
    const fleetHealth = alive.length
      ? Math.round(alive.reduce((s, b) => s + b.health, 0) / alive.length)
      : 0;

    const openAlerts = alerts.filter((a) => a.status !== "resolved");

    return {
      charged: charged.length,
      charging: charging.length,
      renting: renting.length,
      service: service.length,
      retired: retired.length,
      lowOnStation: lowOnStation.length,
      total: powerbanks.length,
      completedToday: completedToday.length,
      revenueToday,
      utilization,
      fleetHealth,
      openAlerts: openAlerts.length,
      criticalAlerts: openAlerts.filter((a) => a.severity === "critical").length,
      activeRentals: rentals.filter((r) => r.status === "active" || r.status === "overdue").length,
    };
  }

  /* ── availability forecast (+2 hours) ──
     returns: active rentals older than 3 h return with 60% probability;
     new rentals: today's average rate × 2 h. */
  function forecast2h() {
    const act = rentals.filter((r) => r.status === "active" || r.status === "overdue");
    const dueReturns = Math.round(act.filter((r) => NOW - r.startedAt > 3 * HOUR).length * 0.6);
    // темп новых аренд — по скользящим 24 ч (не зависит от времени суток)
    const last24h = rentals.filter((r) => r.startedAt >= NOW - 24 * HOUR).length;
    const newRentals = Math.max(1, Math.round((last24h / 24) * 2));
    const a = aggregates();
    return {
      expected: Math.max(0, a.charged + dueReturns - newRentals),
      dueReturns,
      newRentals,
    };
  }

  /* ── chart data rows ── */
  function rentalsByDay(stationId) {
    const out = [];
    for (let d = 13; d >= 0; d--) {
      const ds = new Date(NOW - d * DAY); ds.setHours(0, 0, 0, 0);
      const de = ds.getTime() + DAY;
      const items = rentals.filter((r) => r.startedAt >= ds.getTime() && r.startedAt < de
        && (!stationId || r.fromStation === stationId));
      out.push({
        date: ds,
        count: items.length,
        revenue: items.filter((r) => r.amount).reduce((s, r) => s + r.amount, 0),
      });
    }
    return out;
  }

  function demandHeatmap(stationId) {
    // 7 days × 24 hours, from completed rentals over 14 days
    const m = Array.from({ length: 7 }, () => Array(24).fill(0));
    rentals.filter((r) => !stationId || r.fromStation === stationId).forEach((r) => {
      const d = new Date(r.startedAt);
      m[(d.getDay() + 6) % 7][d.getHours()]++; // 0=Mon
    });
    return m;
  }

  /* ── export ── */
  window.VOLT = {
    NOW, MIN, HOUR, DAY,
    TARIFF, rentalCost,
    stations, powerbanks, clients, rentals, alerts, maintenance,
    aggregates, forecast2h, rentalsByDay, demandHeatmap,
    rnd, ri, pick,
  };
})();
