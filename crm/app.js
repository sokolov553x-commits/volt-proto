/* ════════════════════════════════════════════════════════════
   VOLT CRM · UI logic
   Roles · 6 screens · live simulation · QR · timelines
   No dependencies, vanilla JS. Data: data.js (window.VOLT)
   ════════════════════════════════════════════════════════════ */

(function () {
  "use strict";
  const V = window.VOLT;
  const $ = (sel, root) => (root || document).querySelector(sel);

  /* ─────────── i18n ─────────── */
  const STRINGS = {
    en: {
      overview:"Overview", stations:"Stations", powerbanks:"Powerbanks",
      rentals:"Rentals", clients:"Clients", alerts:"Alerts", advertising:"Advertising",
      soon:"soon", liveOn:"Live on", liveDemo:"Live demo",
      alertsTitle:"Alerts", alertsSub:(n)=>`${n} open · rules: charge < 20%, station offline, rental > 24 h, slot blocked`,
      open:"Open", critical:"Critical", warnings:"Warnings", all:"All",
      allClear:"All clear. No open alerts",
      inProgress:"In progress", resolved:"Resolved", takeAction:"Take action", resolve:"Resolve",
      rentalsTitle:"Rentals", rentalsSub:(n,rev)=>`who took · when · charge at return${n?` · today's revenue ${rev} · ${n} rentals`:""}`,
      active:"Active", completed:"Completed", tariff:"Tariff",
      nothingFound:"Nothing found", showMore:(n)=>`Show ${n} more`,
      clientCol:"Client", powerbankCol:"Powerbank", fromCol:"From", startedCol:"Started",
      durationCol:"Duration", chargeIssuedCol:"Charge issued", dueNowCol:"Due now", statusCol:"Status",
      routeCol:"Route", returnedCol:"Returned", durCol:"Dur.", chargeCol:"Charge", amountCol:"Amount", paymentCol:"Payment",
      overdueStatus:"Overdue · 24 h+", activeStatus:"Active", paidStatus:"Paid",
      clientsTitle:"Clients", clientsSub:(total,active)=>`${total} registered · ${active} with active rental`,
      phoneCol:"Phone", registeredCol:"Registered", rentalsCol:"Rentals", spentCol:"Spent", nowCol:"Now",
      renting:(serial)=>`Renting · ${serial}`,
      stationsTitle:"Stations", stationsSub:(n)=>`${n} in network · click a station for slot monitoring`,
      stationReady:"Ready", stationCharging:"Charging", stationEmpty:"Empty",
      stationStatus:"Status", stationReadyCol:"Ready", stationChargingCol:"Charging",
      stationEmptyCol:"Empty", stationOccupancy:"Occupancy", stationAlerts:"Alerts", stationPing:"Ping",
      online:"Online", offline:"Offline",
      slotEmpty:"empty",
      stationBack:"← All stations", stationOnlineLabel:"Online", stationOfflineLabel:(h)=>`Offline · no ping ${h}`,
      stationSub:(addr,op,ping)=>`${addr} · operator: ${op} · ping ${ping}`,
      readyToIssue:"Ready to issue", chargeAbove:"charge ≥ 80%", toFull:"~40–90 min to full",
      critical_n:(n)=>`including ${n} critical`,
      freeSlots:"Free slots", forReturns:"for returns",
      alertsCount:"Alerts", stationEvents:"Station events", noEvents:"No events",
      maintLog:"Maintenance log", noRecords:"No records", logMaint:"Log maintenance",
      slotsLabel:"Station slots", occupied:(n,total)=>`${n} / ${total} occupied`,
      stationOfflineMsg:"Station offline — last state 4h ago.<br>Slot controller under repair, powerbanks moved to warehouse.",
      chargedLegend:"charged (≥80%)", chargingLegend:"charging",
      lowLegend:"charge < 20%", emptyLegend:"empty slot",
      banksTitle:"Powerbanks", banksSub:(n)=>`${n} in registry · serial + QR + live status · click row for card & timeline`,
      serialCol:"Serial number", locationCol:"Location / client", cyclesCol:"Cycles", healthCol:"Health",
      allFilter:"All", chargedFilter:"Charged", chargingFilter:"Charging",
      rentingFilter:"Renting", serviceFilter:"Service", retiredFilter:"Retired",
      withClient:"With client", rentingSince:"renting since",
      serviceCenter:"Service centre", warehouse:"Warehouse · decommissioned",
      location:"Location", slot:(n)=>`slot ${n}`,
      chargeCycles:"Charge cycles", health:"Health", degradation:"Degradation",
      manufactured:"Manufactured", showQr:"Show QR", timeline:"Timeline",
      replaceThreshold:(n)=>`replace threshold 30% · ~${n} cycles remaining`,
      maintTitle:"Maintenance log", workType:"Work type", comment:"Comment",
      defectPhoto:"Defect photo", attachPhoto:"Attach photo (demo)", saveLog:"Save log entry",
      inspection:"Inspection", inventory:"Inventory", cleaning:"Cleaning",
      repair:"Repair", replacement:"Replacement",
      noComment:"No comment", maintSaved:"Maintenance log saved",
      rentals14:"Rentals · 14 days", yourStation:"· your station",
      demandHour:"Demand by hour · 14 days", demandPeaks:"peaks: weekdays 8–10 and 18–21",
      stationsSection:"Stations", alertsSection:"Alerts", allAlerts:(n)=>`All`,
      eventFeed:"Event feed", startLive:"start Live demo", allQuiet:"All quiet",
      adTitle:"Ad inventory · concept", adNotMVP:"not in MVP screens",
      adMau:"MAU (pilot forecast)", adSessions:"Sessions/month (~4 per user)",
      adImpressions:"Impressions/month (1 splash + ~2 banners/session)", adCpm:"CPM model",
      adRevenue:"Revenue potential at launch", adNote:"Ad screens are intentionally out of MVP scope: rental core first, then traffic monetisation. Data model and placement points — in ARCHITECTURE.md, §6.",
      activeRentals:"Active rentals", returnsToday:(n)=>`${n} returns · 24h`,
      availableNow:"Available now", in2h:(n,r,nr)=>`in 2h: ~${n} <span class="muted">(+${r} returns · −${nr} rentals)</span>`,
      utilization:"Utilization", rentingFleet:"renting / working fleet",
      revenueToday:"Revenue · 24h", fleetHealth:"Fleet health",
      criticalAlerts:"Critical alerts", lowCharge:(n)=>`${n} powerbanks < 20%`,
      networkAvg:"network average", stationsOnline:"Stations online", inMaintenance:"1 in maintenance",
      atStation:"At station", readyToIssue2:"Ready to issue", stationAlerts2:"Station alerts",
      requireAction:"require action", allClear2:"all clear",
      revenue7:"Revenue · 7 days", fleetUtil:"Fleet utilization",
      rentalsToday:"Rentals · 24h", activeNow:(n)=>`${n} active now`,
      demoProto:"demo prototype", syntheticData:"synthetic data",
      langLabel:"Language",
      roleOperatorLabel:"Operator", roleManagerLabel:"Manager", roleInvestorLabel:"Investor",
      roleOperatorDesc:"Shift: Mlimani City Mall", roleManagerDesc:"Full network · admin access",
      roleInvestorDesc:"Finance & aggregates · no PII",
      roleUpdated:(label)=>`Role: ${label} — interface updated`,
      alertAssigned:(who)=>`Alert assigned to: ${who}`,
      alertResolved:"Alert resolved", alertUnavailable:"Operational alerts are not available for the Investor role",
      liveStarted:"Simulation started: events every ~3 sec", liveToast:"Live demo: stations are sending events",
      adSoon:"Advertising: model and display points — in ARCHITECTURE.md §6. Screens — next iteration.",
      navSoonTitle:"Concept described in architecture, screens — next iteration",
      taken:(serial,station,name)=>`${serial} taken · ${station} · ${name}`,
      returned:(serial,station,amount,charge)=>`${serial} returned · ${station}${amount} · charge ${charge}%`,
      charged_to:(serial,pct)=>`${serial} charged to ${pct}% · ready to rent`,
      alertFeed:(serial,pct,station)=>`Alert: ${serial} charge ${pct}% · ${station}`,
      dows:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      chargeAlert:"Charge < 20%", stationOfflineAlert:"Station offline",
      rentalOverdue:"Rental over 24 h", slotBlocked:"Slot blocked",
      maintComplete:"Maintenance complete", returnedLow:"Returned at 4% charge",
      stationOfflineMsg2:(station)=>`${station} — no ping for 4 h 12 min`,
      slotBlockedMsg:(station)=>`${station} — slot 11 not releasing powerbank`,
      maintCompleteMsg:(station)=>`Scheduled service · ${station} · 4 powerbanks checked`,
      returnedLowMsg:(serial,station)=>`${serial} came back nearly empty — placed on charge`,
      maintIssued:(serial,name)=>`${serial} issued${name}`,
      maintReturned:(serial,charge)=>`${serial} returned · charge ${charge}%`,
      stationsBreadcrumb:(name)=>`Stations · ${name}`,
      justNow:"just now", minAgo:(n)=>`${n} min ago`, hAgo:(n)=>`${n} h ago`, yesterday:"yesterday",
      minUnit:"min", hUnit:"h",
      needReplacement:(n)=>`${n} need replacement`,
      rentalsAvg:(n,avg)=>`${n} rentals · avg ${avg}`,
      tlManufactured:"Manufactured & registered", tlBatch:"Batch",
      drawerLabel:"Powerbank card", qrLabel:"Powerbank QR code",
      tlRental:(name)=>`Rental · ${name}`, tlReturnedCharge:(pct)=>`Returned · charge ${pct}%`,
      tlStationCharge:(station,pct)=>`${station} · charge ${pct}%`,
      chartAriaLabel:"Rentals over 14 days",
      chartDotTitle:(date,count,rev)=>`${date} · ${count} rentals · ${rev}`,
      rentalsHeatTip:(dow,h,count)=>`${dow} ${h}:00 · ${count} rentals`,
    },
    ru: {
      overview:"Обзор", stations:"Станции", powerbanks:"Повербанки",
      rentals:"Аренды", clients:"Клиенты", alerts:"Алерты", advertising:"Реклама",
      soon:"скоро", liveOn:"Live идёт", liveDemo:"Live-демо",
      alertsTitle:"Алерты", alertsSub:(n)=>`${n} открыто · правило: заряд < 20%, офлайн станции, аренда > 24 ч, блок слота`,
      open:"Открытые", critical:"Критические", warnings:"Предупреждения", all:"Все",
      allClear:"Чисто. Открытых алертов нет",
      inProgress:"В работе", resolved:"Закрыт", takeAction:"В работу", resolve:"Закрыть",
      rentalsTitle:"Аренды", rentalsSub:(n,rev)=>`кто взял · когда · заряд при возврате${n?` · выручка ${rev} · ${n} аренд`:""}`,
      active:"Активные", completed:"Завершённые", tariff:"Тариф",
      nothingFound:"Ничего не найдено", showMore:(n)=>`Показать ещё ${n}`,
      clientCol:"Клиент", powerbankCol:"Повербанк", fromCol:"Откуда", startedCol:"Начало",
      durationCol:"Длится", chargeIssuedCol:"Заряд выдан", dueNowCol:"К оплате", statusCol:"Статус",
      routeCol:"Маршрут", returnedCol:"Возврат", durCol:"Длит.", chargeCol:"Заряд", amountCol:"Сумма", paymentCol:"Оплата",
      overdueStatus:"Просрочена · 24 ч+", activeStatus:"Активна", paidStatus:"Оплачено",
      clientsTitle:"Клиенты", clientsSub:(total,active)=>`${total} зарегистрировано · ${active} с активной арендой`,
      phoneCol:"Телефон", registeredCol:"Регистрация", rentalsCol:"Аренд", spentCol:"Потрачено", nowCol:"Сейчас",
      renting:(serial)=>`В аренде · ${serial}`,
      stationsTitle:"Станции", stationsSub:(n)=>`${n} в сети · нажмите на станцию для мониторинга слотов`,
      stationReady:"Готово", stationCharging:"Заряжается", stationEmpty:"Пусто",
      stationStatus:"Статус", stationReadyCol:"Готово", stationChargingCol:"Заряжается",
      stationEmptyCol:"Пусто", stationOccupancy:"Загрузка", stationAlerts:"Алерты", stationPing:"Пинг",
      online:"Онлайн", offline:"Офлайн",
      slotEmpty:"пусто",
      stationBack:"← Все станции", stationOnlineLabel:"Онлайн", stationOfflineLabel:(h)=>`Офлайн · нет пинга ${h}`,
      stationSub:(addr,op,ping)=>`${addr} · оператор: ${op} · пинг ${ping}`,
      readyToIssue:"Готово к выдаче", chargeAbove:"заряд ≥ 80%", toFull:"~40–90 мин до полного",
      critical_n:(n)=>`включая ${n} критических`,
      freeSlots:"Свободные слоты", forReturns:"для возврата",
      alertsCount:"Алерты", stationEvents:"События станции", noEvents:"Нет событий",
      maintLog:"Журнал ТО", noRecords:"Нет записей", logMaint:"Запись ТО",
      slotsLabel:"Слоты станции", occupied:(n,total)=>`${n} / ${total} занято`,
      stationOfflineMsg:"Станция офлайн — последнее состояние 4ч назад.<br>Контроллер слотов на ремонте, повербанки вывезены.",
      chargedLegend:"заряжено (≥80%)", chargingLegend:"заряжается",
      lowLegend:"заряд < 20%", emptyLegend:"пустой слот",
      banksTitle:"Повербанки", banksSub:(n)=>`${n} в реестре · серийник + QR + статус · нажмите строку для карточки`,
      serialCol:"Серийный номер", locationCol:"Локация / клиент", cyclesCol:"Циклы", healthCol:"Здоровье",
      allFilter:"Все", chargedFilter:"Заряжены", chargingFilter:"Заряжаются",
      rentingFilter:"В аренде", serviceFilter:"Сервис", retiredFilter:"Списаны",
      withClient:"У клиента", rentingSince:"аренда с",
      serviceCenter:"Сервисный центр", warehouse:"Склад · выведен из оборота",
      location:"Локация", slot:(n)=>`слот ${n}`,
      chargeCycles:"Циклов зарядки", health:"Здоровье", degradation:"Деградация",
      manufactured:"Выпуск", showQr:"Показать QR", timeline:"История",
      replaceThreshold:(n)=>`порог замены 30% · ~${n} циклов осталось`,
      maintTitle:"Запись обслуживания", workType:"Тип работ", comment:"Комментарий",
      defectPhoto:"Фото дефекта", attachPhoto:"Прикрепить фото (демо)", saveLog:"Сохранить запись",
      inspection:"Инспекция", inventory:"Инвентаризация", cleaning:"Чистка",
      repair:"Ремонт", replacement:"Замена",
      noComment:"Без комментария", maintSaved:"Запись обслуживания сохранена",
      rentals14:"Аренды · 14 дней", yourStation:"· ваша станция",
      demandHour:"Спрос по часам · 14 дней", demandPeaks:"пики: будни 8–10 и 18–21",
      stationsSection:"Станции", alertsSection:"Алерты", allAlerts:(n)=>`Все`,
      eventFeed:"Лента событий", startLive:"запустить Live-демо", allQuiet:"Тихо",
      adTitle:"Рекламный инвентарь · концепт", adNotMVP:"без экранов в MVP",
      adMau:"MAU (прогноз пилота)", adSessions:"Сессий в месяц (~4 на юзера)",
      adImpressions:"Показов в месяц (1 splash + ~2 баннера на сессию)", adCpm:"Модель CPM",
      adRevenue:"Потенциал выручки на старте", adNote:"Экраны рекламы сознательно не входят в MVP: сначала ядро аренды, затем монетизация трафика. Модель данных и точки показа — в ARCHITECTURE.md, §6.",
      activeRentals:"Активные аренды", returnsToday:(n)=>`${n} возвратов · 24 ч`,
      availableNow:"Доступно сейчас", in2h:(n,r,nr)=>`через 2ч: ~${n} <span class="muted">(+${r} возвратов · −${nr} аренд)</span>`,
      utilization:"Утилизация", rentingFleet:"в аренде / рабочий флот",
      revenueToday:"Выручка · 24 ч", fleetHealth:"Здоровье флота",
      criticalAlerts:"Критические алерты", lowCharge:(n)=>`${n} повербанков < 20%`,
      networkAvg:"среднее по сети", stationsOnline:"Станций онлайн", inMaintenance:"1 на обслуживании",
      atStation:"На станции", readyToIssue2:"Готово к выдаче", stationAlerts2:"Алерты станции",
      requireAction:"требуют действий", allClear2:"всё чисто",
      revenue7:"Выручка · 7 дней", fleetUtil:"Утилизация флота",
      rentalsToday:"Аренды · 24 ч", activeNow:(n)=>`${n} активных сейчас`,
      demoProto:"демо-прототип", syntheticData:"данные синтетические",
      langLabel:"Язык",
      roleOperatorLabel:"Оператор", roleManagerLabel:"Менеджер", roleInvestorLabel:"Инвестор",
      roleOperatorDesc:"Смена: Mlimani City Mall", roleManagerDesc:"Вся сеть · права администратора",
      roleInvestorDesc:"Финансы и агрегаты · без PII",
      roleUpdated:(label)=>`Роль: ${label} — интерфейс перестроен`,
      alertAssigned:(who)=>`Алерт взят в работу · назначен: ${who}`,
      alertResolved:"Алерт закрыт", alertUnavailable:"Алерты операционного уровня недоступны роли «Инвестор»",
      liveStarted:"Симуляция запущена: события каждые ~3 сек", liveToast:"Live-демо: станции начали присылать события",
      adSoon:"Реклама: модель и точки показа — в ARCHITECTURE.md §6. Экраны — следующая итерация.",
      navSoonTitle:"Концепт описан в архитектуре, экраны — следующая итерация",
      taken:(serial,station,name)=>`${serial} взят · ${station} · ${name}`,
      returned:(serial,station,amount,charge)=>`${serial} возвращён · ${station}${amount} · заряд ${charge}%`,
      charged_to:(serial,pct)=>`${serial} зарядился до ${pct}% · готов к выдаче`,
      alertFeed:(serial,pct,station)=>`Алерт: ${serial} заряд ${pct}% · ${station}`,
      dows:["пн","вт","ср","чт","пт","сб","вс"],
      chargeAlert:"Заряд < 20%", stationOfflineAlert:"Станция офлайн",
      rentalOverdue:"Аренда дольше 24 ч", slotBlocked:"Слот заблокирован",
      maintComplete:"ТО завершено", returnedLow:"Возврат с зарядом 4%",
      stationOfflineMsg2:(station)=>`${station} — нет пинга 4 ч 12 мин`,
      slotBlockedMsg:(station)=>`${station} — слот 11 не отдаёт повербанк`,
      maintCompleteMsg:(station)=>`Плановое обслуживание · ${station} · 4 повербанка проверены`,
      returnedLowMsg:(serial,station)=>`${serial} вернулся почти пустым — поставлен на зарядку`,
      maintIssued:(serial,name)=>`${serial} выдан${name}`,
      maintReturned:(serial,charge)=>`${serial} возвращён · заряд ${charge}%`,
      stationsBreadcrumb:(name)=>`Станции · ${name}`,
      justNow:"только что", minAgo:(n)=>`${n} мин назад`, hAgo:(n)=>`${n} ч назад`, yesterday:"вчера",
      minUnit:"мин", hUnit:"ч",
      needReplacement:(n)=>`${n} требуют замены`,
      rentalsAvg:(n,avg)=>`${n} аренд · среднее ${avg}`,
      tlManufactured:"Выпуск и регистрация", tlBatch:"Партия",
      drawerLabel:"Карточка повербанка", qrLabel:"QR повербанка",
      tlRental:(name)=>`Аренда · ${name}`, tlReturnedCharge:(pct)=>`Возврат · заряд ${pct}%`,
      tlStationCharge:(station,pct)=>`${station} · заряд ${pct}%`,
      chartAriaLabel:"Аренды за 14 дней",
      chartDotTitle:(date,count,rev)=>`${date} · ${count} аренд · ${rev}`,
      rentalsHeatTip:(dow,h,count)=>`${dow} ${h}:00 · ${count} аренд`,
    },
    sw: {
      overview:"Muhtasari", stations:"Vituo", powerbanks:"Betri",
      rentals:"Ukodishaji", clients:"Wateja", alerts:"Tahadhari", advertising:"Matangazo",
      soon:"hivi karibuni", liveOn:"Live inaendelea", liveDemo:"Onyesho la Live",
      alertsTitle:"Tahadhari", alertsSub:(n)=>`${n} wazi · sheria: chaji < 20%, kituo nje ya mtandao, ukodishaji > masaa 24`,
      open:"Wazi", critical:"Muhimu", warnings:"Maonyo", all:"Zote",
      allClear:"Safi. Hakuna tahadhari wazi",
      inProgress:"Inafanywa", resolved:"Imefungwa", takeAction:"Chukua hatua", resolve:"Funga",
      rentalsTitle:"Ukodishaji", rentalsSub:(n,rev)=>`aliyechukua · lini · chaji wakati wa kurudisha${n?` · mapato leo ${rev} · ukodishaji ${n}`:""}`,
      active:"Zinazoendelea", completed:"Zilizokamilika", tariff:"Bei",
      nothingFound:"Hakuna kilichopatikana", showMore:(n)=>`Onyesha ${n} zaidi`,
      clientCol:"Mteja", powerbankCol:"Betri", fromCol:"Kutoka", startedCol:"Ilianza",
      durationCol:"Muda", chargeIssuedCol:"Chaji ilitolewa", dueNowCol:"Inastahili sasa", statusCol:"Hali",
      routeCol:"Njia", returnedCol:"Ilirudishwa", durCol:"Muda", chargeCol:"Chaji", amountCol:"Kiasi", paymentCol:"Malipo",
      overdueStatus:"Imechelewa · masaa 24+", activeStatus:"Inafanya kazi", paidStatus:"Imelipwa",
      clientsTitle:"Wateja", clientsSub:(total,active)=>`${total} wamesajiliwa · ${active} na ukodishaji unaoendelea`,
      phoneCol:"Simu", registeredCol:"Usajili", rentalsCol:"Ukodishaji", spentCol:"Imetumika", nowCol:"Sasa",
      renting:(serial)=>`Anakodisha · ${serial}`,
      stationsTitle:"Vituo", stationsSub:(n)=>`${n} kwenye mtandao · bonyeza kituo kwa ufuatiliaji`,
      stationReady:"Tayari", stationCharging:"Inachaji", stationEmpty:"Tupu",
      stationStatus:"Hali", stationReadyCol:"Tayari", stationChargingCol:"Inachaji",
      stationEmptyCol:"Tupu", stationOccupancy:"Matumizi", stationAlerts:"Tahadhari", stationPing:"Ping",
      online:"Mtandaoni", offline:"Nje ya mtandao",
      slotEmpty:"tupu",
      stationBack:"← Vituo vyote", stationOnlineLabel:"Mtandaoni", stationOfflineLabel:(h)=>`Nje ya mtandao · ${h}`,
      stationSub:(addr,op,ping)=>`${addr} · opereta: ${op} · ping ${ping}`,
      readyToIssue:"Tayari kutoa", chargeAbove:"chaji ≥ 80%", toFull:"~dakika 40–90 hadi kamili",
      critical_n:(n)=>`ikiwemo ${n} muhimu`,
      freeSlots:"Nafasi huru", forReturns:"kwa kurudisha",
      alertsCount:"Tahadhari", stationEvents:"Matukio ya kituo", noEvents:"Hakuna matukio",
      maintLog:"Kumbukumbu ya matengenezo", noRecords:"Hakuna kumbukumbu", logMaint:"Rekodi matengenezo",
      slotsLabel:"Nafasi za kituo", occupied:(n,total)=>`${n} / ${total} imechukuliwa`,
      stationOfflineMsg:"Kituo kiko nje ya mtandao — hali ya mwisho masaa 4 iliyopita.",
      chargedLegend:"imechajwa (≥80%)", chargingLegend:"inachaji",
      lowLegend:"chaji < 20%", emptyLegend:"nafasi tupu",
      banksTitle:"Betri", banksSub:(n)=>`${n} kwenye rejista · serial + QR + hali`,
      serialCol:"Nambari ya serial", locationCol:"Mahali / mteja", cyclesCol:"Mizunguko", healthCol:"Afya",
      allFilter:"Zote", chargedFilter:"Zimechajwa", chargingFilter:"Zinachaji",
      rentingFilter:"Zinakodishwa", serviceFilter:"Huduma", retiredFilter:"Zimestaafu",
      withClient:"Kwa mteja", rentingSince:"ukodishaji tangu",
      serviceCenter:"Kituo cha huduma", warehouse:"Ghala · imetolewa hudumani",
      location:"Mahali", slot:(n)=>`nafasi ${n}`,
      chargeCycles:"Mizunguko ya chaji", health:"Afya", degradation:"Kushuka kwa ubora",
      manufactured:"Ilizalishwa", showQr:"Onyesha QR", timeline:"Historia",
      replaceThreshold:(n)=>`kizingiti cha kubadilisha 30% · ~${n} mizunguko iliyobaki`,
      maintTitle:"Kumbukumbu ya matengenezo", workType:"Aina ya kazi", comment:"Maoni",
      defectPhoto:"Picha ya kasoro", attachPhoto:"Ambatisha picha (onyesho)", saveLog:"Hifadhi kumbukumbu",
      inspection:"Ukaguzi", inventory:"Hesabu ya mali", cleaning:"Usafi",
      repair:"Ukarabati", replacement:"Ubadilishaji",
      noComment:"Hakuna maoni", maintSaved:"Kumbukumbu ya matengenezo imehifadhiwa",
      rentals14:"Ukodishaji · siku 14", yourStation:"· kituo chako",
      demandHour:"Mahitaji kwa saa · siku 14", demandPeaks:"kilele: siku za kazi 8–10 na 18–21",
      stationsSection:"Vituo", alertsSection:"Tahadhari", allAlerts:(n)=>`Zote`,
      eventFeed:"Mtiririko wa matukio", startLive:"anza onyesho la Live", allQuiet:"Kimya",
      adTitle:"Hesabu ya matangazo · dhana", adNotMVP:"si katika skrini za MVP",
      adMau:"MAU (utabiri wa majaribio)", adSessions:"Vikao/mwezi (~4 kwa mtumiaji)",
      adImpressions:"Maonyesho/mwezi", adCpm:"Mfano wa CPM",
      adRevenue:"Mapato yanayowezekana mwanzoni", adNote:"Skrini za matangazo ziko nje ya upeo wa MVP kwa makusudi.",
      activeRentals:"Ukodishaji hai", returnsToday:(n)=>`zilizorudishwa ${n} · saa 24`,
      availableNow:"Zinazopatikana sasa", in2h:(n,r,nr)=>`baada ya masaa 2: ~${n} <span class="muted">(+${r} · −${nr})</span>`,
      utilization:"Matumizi", rentingFleet:"zinakodishwa / zinafanya kazi",
      revenueToday:"Mapato · saa 24", fleetHealth:"Afya ya meli",
      criticalAlerts:"Tahadhari muhimu", lowCharge:(n)=>`${n} betri < 20%`,
      networkAvg:"wastani wa mtandao", stationsOnline:"Vituo mtandaoni", inMaintenance:"1 katika matengenezo",
      atStation:"Kwenye kituo", readyToIssue2:"Tayari kutoa", stationAlerts2:"Tahadhari za kituo",
      requireAction:"zinahitaji hatua", allClear2:"safi",
      revenue7:"Mapato · siku 7", fleetUtil:"Matumizi ya meli",
      rentalsToday:"Ukodishaji · saa 24", activeNow:(n)=>`${n} unaoendelea sasa`,
      demoProto:"mfano wa onyesho", syntheticData:"data ya syntetiki",
      langLabel:"Lugha",
      roleOperatorLabel:"Opereta", roleManagerLabel:"Meneja", roleInvestorLabel:"Mwekezaji",
      roleOperatorDesc:"Zamu: Mlimani City Mall", roleManagerDesc:"Mtandao wote · ruhusa za msimamizi",
      roleInvestorDesc:"Fedha na muhtasari · bila PII",
      roleUpdated:(label)=>`Jukumu: ${label} — kiolesura kimesasishwa`,
      alertAssigned:(who)=>`Tahadhari imepewa: ${who}`,
      alertResolved:"Tahadhari imefungwa", alertUnavailable:"Tahadhari za uendeshaji hazipatikani kwa jukumu la Mwekezaji",
      liveStarted:"Uigaji umeanza: matukio kila ~sekunde 3", liveToast:"Onyesho la Live: vituo vinatuma matukio",
      adSoon:"Matangazo: mfano na maeneo ya onyesho — katika ARCHITECTURE.md §6.",
      navSoonTitle:"Dhana imeelezwa katika usanifu, skrini — toleo linalofuata",
      taken:(serial,station,name)=>`${serial} imechukuliwa · ${station} · ${name}`,
      returned:(serial,station,amount,charge)=>`${serial} imerudishwa · ${station}${amount} · chaji ${charge}%`,
      charged_to:(serial,pct)=>`${serial} imechajwa hadi ${pct}% · tayari kukodisha`,
      alertFeed:(serial,pct,station)=>`Tahadhari: ${serial} chaji ${pct}% · ${station}`,
      dows:["Jtt","Jnn","Jtn","Alh","Ijm","Jms","Jpl"],
      chargeAlert:"Chaji < 20%", stationOfflineAlert:"Kituo nje ya mtandao",
      rentalOverdue:"Ukodishaji zaidi ya masaa 24", slotBlocked:"Nafasi imezuiwa",
      maintComplete:"Matengenezo yamekamilika", returnedLow:"Imerudishwa na chaji 4%",
      stationOfflineMsg2:(station)=>`${station} — hakuna ping kwa masaa 4 dakika 12`,
      slotBlockedMsg:(station)=>`${station} — nafasi 11 haifungui betri`,
      maintCompleteMsg:(station)=>`Huduma ya kawaida · ${station} · betri 4 zimekaguliwa`,
      returnedLowMsg:(serial)=>`${serial} ilirudi karibu tupu — imewekwa kuchaji`,
      maintIssued:(serial,name)=>`${serial} imetolewa${name}`,
      maintReturned:(serial,charge)=>`${serial} imerudishwa · chaji ${charge}%`,
      stationsBreadcrumb:(name)=>`Vituo · ${name}`,
      justNow:"sasa hivi", minAgo:(n)=>`dakika ${n} zilizopita`, hAgo:(n)=>`masaa ${n} yaliyopita`, yesterday:"jana",
      minUnit:"dak", hUnit:"saa",
      needReplacement:(n)=>`${n} zinahitaji kubadilishwa`,
      rentalsAvg:(n,avg)=>`ukodishaji ${n} · wastani ${avg}`,
      tlManufactured:"Ilizalishwa na kusajiliwa", tlBatch:"Kundi",
      drawerLabel:"Kadi ya betri", qrLabel:"QR ya betri",
      tlRental:(name)=>`Ukodishaji · ${name}`, tlReturnedCharge:(pct)=>`Ilirudishwa · chaji ${pct}%`,
      tlStationCharge:(station,pct)=>`${station} · chaji ${pct}%`,
      chartAriaLabel:"Ukodishaji kwa siku 14",
      chartDotTitle:(date,count,rev)=>`${date} · ukodishaji ${count} · ${rev}`,
      rentalsHeatTip:(dow,h,count)=>`${dow} ${h}:00 · ukodishaji ${count}`,
    },
  };
  let LANG = localStorage.getItem("volt_crm_lang") || "en";
  const t = (key, ...args) => {
    const s = (STRINGS[LANG] || STRINGS.en)[key];
    if (!s) return (STRINGS.en[key] || key);
    return typeof s === "function" ? s(...args) : s;
  };
  function updateStaticChrome() {
    const sv = $("#sidebarVersion");
    if (sv) sv.textContent = `${t("demoProto")} · v0.1 · ${t("syntheticData")}`;
    const lb = $("#liveBtn");
    if (lb) lb.innerHTML = state.live
      ? `${ico("pause", 14)}<span>${t("liveOn")}</span>`
      : `${ico("play", 14)}<span>${t("liveDemo")}</span>`;
  }
  function setLang(lang) {
    if (!STRINGS[lang]) return;
    LANG = lang;
    localStorage.setItem("volt_crm_lang", lang);
    document.documentElement.lang = lang;
    const cur = $("#langCurrent");
    if (cur) cur.textContent = lang.toUpperCase();
    render();
    renderRoleMenu();
    updateBell();
    renderLangPicker();
    updateStaticChrome();
  }
  function renderLangPicker() {
    const el = $("#langPicker");
    if (!el) return;
    const langs = [["en","EN","English"],["ru","RU","Русский"],["sw","SW","Kiswahili"]];
    el.innerHTML = langs.map(([code, code3, name]) =>
      `<button class="lang-opt ${code === LANG ? "lang-opt-active" : ""}" data-lang="${code}">
        <b class="lang-opt-code">${code3}</b><span class="lang-opt-name">${name}</span>
        ${code === LANG ? `<svg class="lang-opt-check ico-14" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>` : ""}
      </button>`).join("");
  }

  /* ─────────── icons (inline SVG, stroke 1.7) ─────────── */
  const I = {
    dash: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    station: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h3"/><circle cx="16" cy="17" r="1.4"/>',
    battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 10v4M10 10v4"/>',
    batterySlot: '<rect x="3" y="6" width="15" height="12" rx="2"/><path d="M21 10v4"/>',
    receipt: '<path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z"/><path d="M9 8h6M9 12h6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><circle cx="17.5" cy="9.5" r="2.5"/><path d="M16 14.7c2.6.3 4.6 2 5.3 4.8"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    alert: '<path d="m10.3 3.8-8.2 14a2 2 0 0 0 1.7 3h16.4a2 2 0 0 0 1.7-3l-8.2-14a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    zap: '<polygon points="13 2 4 14 10 14 9 22 18 10 12 10 13 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14h1M14 20h1M20 20h1v1M17 20v1"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="5" y="4" width="4.5" height="16" rx="1"/><rect x="14.5" y="4" width="4.5" height="16" rx="1"/>',
    wrench: '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    up: '<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    down: '<path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    megaphone: '<path d="m3 11 18-7-4 16-5.5-4.5L8 19l-1-5L3 11z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    in: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17-5-5 5-5M5 12h11"/>',
  };
  const ico = (name, size) => `<svg class="ico-${size || 16}" viewBox="0 0 24 24">${I[name]}</svg>`;

  /* ─────────── formatters ─────────── */
  const NBSP = " ";
  const fmtMoney = (n) => n.toLocaleString("en-TZ").replace(/\s/g, NBSP) + NBSP + "TZS";
  const fmtNum = (n) => n.toLocaleString("en-TZ").replace(/\s/g, NBSP);
  const pad = (n) => String(n).padStart(2, "0");
  const fmtTime = (ts) => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const fmtDate = (ts) => { const d = new Date(ts); return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`; };
  function fmtAgo(ts) {
    const diff = Date.now() - ts;
    if (diff < V.MIN) return t("justNow");
    if (diff < V.HOUR) return t("minAgo", Math.floor(diff / V.MIN));
    if (diff < V.DAY) return t("hAgo", Math.floor(diff / V.HOUR));
    if (diff < 2 * V.DAY) return t("yesterday") + " " + fmtTime(ts);
    return fmtDate(ts) + " " + fmtTime(ts);
  }
  function fmtDur(min) {
    if (min < 60) return min + " " + t("minUnit");
    const h = Math.floor(min / 60), m = Math.round(min % 60);
    return m ? `${h} ${t("hUnit")} ${m} ${t("minUnit")}` : `${h} ${t("hUnit")}`;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const stName = (id) => { const s = V.stations.find((x) => x.id === id); return s ? s.name : "—"; };
  const client = (id) => V.clients.find((c) => c.id === id);
  const initials = (name) => name.split(" ").map((w) => w[0] || "").join("").slice(0, 2).toUpperCase();

  /* ─────────── roles ─────────── */
  const ROLES_DEF = {
    operator: {
      labelKey: "roleOperatorLabel", who: "Amani Mwanga", avatar: "AM",
      descKey: "roleOperatorDesc",
      finance: false, pii: false, station: "st1",
      nav: ["dashboard", "stations", "banks", "rentals", "alerts"],
    },
    manager: {
      labelKey: "roleManagerLabel", who: "Aleksandr S.", avatar: "AS",
      descKey: "roleManagerDesc",
      finance: true, pii: true, station: null,
      nav: ["dashboard", "stations", "banks", "rentals", "clients", "alerts", "ads"],
    },
    investor: {
      labelKey: "roleInvestorLabel", who: "Network Partner", avatar: "NP",
      descKey: "roleInvestorDesc",
      finance: true, pii: false, station: null,
      nav: ["dashboard", "stations", "ads"],
    },
  };
  // Proxy: role().label and role().desc use current language
  const ROLES = new Proxy(ROLES_DEF, {
    get(target, key) {
      const r = target[key];
      if (!r) return r;
      return Object.assign(Object.create(r), {
        get label() { return t(r.labelKey); },
        get desc() { return t(r.descKey); },
      });
    },
  });
  function navDef() {
    return {
      dashboard: { t: t("overview"), i: "dash" },
      stations:  { t: t("stations"), i: "station" },
      banks:     { t: t("powerbanks"), i: "battery" },
      rentals:   { t: t("rentals"), i: "receipt" },
      clients:   { t: t("clients"), i: "users" },
      alerts:    { t: t("alerts"), i: "alert" },
      ads:       { t: t("advertising"), i: "megaphone", soon: true },
    };
  }

  const state = {
    role: "manager",
    view: "dashboard",
    stationId: null,        // station detail
    bankFilter: "all",
    bankSearch: "",
    bankSort: { key: "serial", dir: 1 },
    rentalTab: "active",
    rentalSearch: "",
    alertFilter: "open",
    completedLimit: 50,
    live: false,
    feed: [],
  };
  const role = () => ROLES[state.role];

  /* data visibility by role */
  function maskName(name) {
    if (role().pii) return name;
    const [first, last] = name.split(" ");
    return `${first} ${last ? last[0] + "." : ""}`;
  }
  function maskPhone(phone) {
    return role().pii ? phone : phone.slice(0, 5) + "•• •••-••-••";
  }
  function visibleStations() {
    return role().station ? V.stations.filter((s) => s.id === role().station) : V.stations;
  }
  function visibleBanks() {
    if (!role().station) return V.powerbanks;
    return V.powerbanks.filter((b) => b.stationId === role().station);
  }
  function visibleRentals() {
    if (!role().station) return V.rentals;
    return V.rentals.filter((r) => r.fromStation === role().station || r.toStation === role().station);
  }
  function openAlerts() {
    let list = V.alerts.filter((a) => a.status !== "resolved");
    if (role().station) list = list.filter((a) => !a.ref.station || a.ref.station === role().station);
    return list;
  }

  /* ─────────── statuses ─────────── */
  const BANK_STATUS = {
    charged: { key: "chargedFilter", cls: "charged" },
    charging: { key: "chargingFilter", cls: "charging" },
    renting: { key: "rentingFilter", cls: "renting" },
    service: { key: "serviceFilter", cls: "service" },
    retired: { key: "retiredFilter", cls: "retired" },
  };
  function bankBadge(b) {
    if (b.stationId && b.charge < 20 && b.status === "charging")
      return `<span class="badge low"><span class="dot"></span>${t("chargingFilter")} · ${b.charge}%</span>`;
    const s = BANK_STATUS[b.status];
    return `<span class="badge ${s.cls}"><span class="dot"></span>${t(s.key)}</span>`;
  }
  function chargeColor(p) { return p >= 50 ? "#3DDC97" : p >= 20 ? "#FFB454" : "#FF6678"; }
  function chargeCell(p) {
    return `<div class="charge-cell">
      <div class="charge-bar"><div class="charge-fill" style="width:${p}%;background:${chargeColor(p)}"></div></div>
      <span class="charge-pct">${p}%</span></div>`;
  }
  function healthBadge(h) {
    if (h > 80) return `<span class="badge ok"><span class="dot"></span>${h}%</span>`;
    if (h >= 50) return `<span class="badge renting"><span class="dot"></span>${h}%</span>`;
    return `<span class="badge low"><span class="dot"></span>${h}% · ${t("replacement")}</span>`;
  }

  /* ─────────── KPI ─────────── */
  function kpiCard(label, value, sub, bar, hero) {
    const plain = String(value).replace(/<[^>]*>/g, "");
    const sizeCls = plain.length > 9 ? " long" : "";
    return `<div class="kpi${hero ? " hero" : ""}" style="--kpi-bar:${bar || "var(--accent)"}">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value tnum${sizeCls}">${value}</div>
      ${sub ? `<div class="kpi-sub">${sub}</div>` : ""}
    </div>`;
  }

  function dashboardKpis() {
    const a = V.aggregates();
    const fc = V.forecast2h();
    const days = V.rentalsByDay();
    const today = days[13];
    const avgCheck = a.completedToday ? Math.round(a.revenueToday / a.completedToday) : 0;
    const revSub = t("rentalsAvg", a.completedToday, fmtMoney(avgCheck));

    if (state.role === "operator") {
      const st = V.stations.find((s) => s.id === role().station);
      if (!st) return "";
      const onSt = V.powerbanks.filter((b) => b.stationId === st.id);
      const charged = onSt.filter((b) => b.status === "charged").length;
      const charging = onSt.filter((b) => b.status === "charging").length;
      const free = st.slots - onSt.length;
      const myAlerts = openAlerts().length;
      return kpiCard(t("atStation"), onSt.length + `<small> / ${st.slots}</small>`, "", null, true)
        + kpiCard(t("readyToIssue2"), charged, t("chargeAbove"))
        + kpiCard(t("stationChargingCol"), charging, charging ? t("toFull") : "", "var(--cyan)")
        + kpiCard(t("freeSlots"), free, t("forReturns"), "var(--text-muted)")
        + kpiCard(t("stationAlerts2"), myAlerts, myAlerts ? t("requireAction") : t("allClear2"), myAlerts ? "var(--danger)" : "var(--success)");
    }

    if (state.role === "investor") {
      const rev7 = days.slice(7).reduce((s, d) => s + d.revenue, 0);
      return kpiCard(t("revenueToday"), fmtMoney(a.revenueToday), revSub, null, true)
        + kpiCard(t("revenue7"), fmtMoney(rev7), `${fmtNum(days.slice(7).reduce((s, d) => s + d.count, 0))} ${t("rentals")}`)
        + kpiCard(t("fleetUtil"), a.utilization + "<small>%</small>", t("rentingFleet"), "var(--cyan)")
        + kpiCard(t("rentalsToday"), a.completedToday + a.activeRentals, t("activeNow", a.activeRentals))
        + kpiCard(t("fleetHealth"), a.fleetHealth + "<small>%</small>", t("networkAvg"), "var(--success)")
        + kpiCard(t("stationsOnline"), `${V.stations.filter((s) => s.status === "active").length}<small> / ${V.stations.length}</small>`, t("inMaintenance"), "var(--warning)");
    }

    // manager
    return kpiCard(t("activeRentals"), a.activeRentals, t("returnsToday", a.completedToday), "var(--warning)", true)
      + kpiCard(t("availableNow"), a.charged, t("in2h", fc.expected, fc.dueReturns, fc.newRentals))
      + kpiCard(t("utilization"), a.utilization + "<small>%</small>", t("rentingFleet"), "var(--cyan)")
      + kpiCard(t("revenueToday"), fmtMoney(a.revenueToday), revSub)
      + kpiCard(t("fleetHealth"), a.fleetHealth + "<small>%</small>", t("needReplacement", V.powerbanks.filter((b) => b.health < 50 && b.status !== "retired").length), "var(--success)")
      + kpiCard(t("criticalAlerts"), a.criticalAlerts, t("lowCharge", a.lowOnStation), "var(--danger)");
  }

  /* ─────────── rental chart (SVG area) ─────────── */
  function areaChart() {
    const days = V.rentalsByDay(role().station);
    const W = 720, H = 180, P = { l: 30, r: 8, t: 14, b: 22 };
    const max = Math.max(...days.map((d) => d.count)) * 1.2;
    const x = (i) => P.l + (i / 13) * (W - P.l - P.r);
    const y = (v) => H - P.b - (v / max) * (H - P.t - P.b);
    let line = "", area = `M ${x(0)} ${H - P.b} `;
    days.forEach((d, i) => {
      line += (i ? "L" : "M") + ` ${x(i).toFixed(1)} ${y(d.count).toFixed(1)} `;
      area += `L ${x(i).toFixed(1)} ${y(d.count).toFixed(1)} `;
    });
    area += `L ${x(13)} ${H - P.b} Z`;
    const grid = [0.25, 0.5, 0.75, 1].map((f) => {
      const v = Math.round(max * f);
      return `<line x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}" stroke="var(--border-subtle)" stroke-width="1"/>
        <text x="${P.l - 6}" y="${y(v) + 3}" text-anchor="end" font-size="9" fill="var(--text-disabled)">${v}</text>`;
    }).join("");
    const labels = days.map((d, i) => i % 2 === 1 ? "" :
      `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="9" fill="var(--text-disabled)">${fmtDate(d.date.getTime())}</text>`).join("");
    const dots = days.map((d, i) =>
      `<circle cx="${x(i).toFixed(1)}" cy="${y(d.count).toFixed(1)}" r="2.6" fill="#07080E" stroke="#5B8CFF" stroke-width="1.6">
        <title>${t("chartDotTitle", fmtDate(d.date.getTime()), d.count, fmtMoney(d.revenue))}</title></circle>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${t("chartAriaLabel")}">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#5B8CFF"/><stop offset="100%" stop-color="#A06BFF"/></linearGradient><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(91,140,255,.25)"/><stop offset="100%" stop-color="rgba(160,107,255,0)"/>
      </linearGradient></defs>
      ${grid}
      <path d="${area}" class="chart-area" fill="url(#ag)"/>
      <path d="${line}" pathLength="1" class="chart-line" fill="none" stroke="url(#lg)" stroke-width="2" stroke-linejoin="round"/>
      ${dots}${labels}
    </svg>`;
  }

  /* ─────────── demand heatmap ─────────── */
  function heatmapHtml() {
    const m = V.demandHeatmap(role().station);
    const max = Math.max(...m.flat(), 1);
    const dows = t("dows");
    let html = '<div class="heatmap"><div></div>';
    for (let h = 0; h < 24; h++) html += `<div class="hm-col-lab">${h % 6 === 0 ? h : ""}</div>`;
    m.forEach((row, d) => {
      html += `<div class="hm-lab">${dows[d]}</div>`;
      row.forEach((v, h) => {
        const op = v ? 0.15 + 0.85 * (v / max) : 0;
        html += `<div class="hm-cell" data-tip="${t("rentalsHeatTip", dows[d], h, v)}" style="${v ? `background:rgba(91,140,255,${op.toFixed(2)})` : ""}"></div>`;
      });
    });
    return html + "</div>";
  }

  /* ─────────── dashboard ─────────── */
  function renderDashboard() {
    const a = V.aggregates();
    const alertsHtml = openAlerts().slice(0, 4).map(alertItem).join("")
      || `<div class="empty-state">${ico("check", 20)}${t("allClear")}</div>`;

    const myStation = role().station;
    const feedSeed = (state.feed.length ? state.feed.filter((f) => !myStation || !f.st || f.st === myStation) : V.rentals
      .filter((r) => r.status === "completed" && (!myStation || r.toStation === myStation || r.fromStation === myStation))
      .slice(-5).reverse()
      .map((r) => ({ type: "return", t: r.returnedAt, txt: t("returned", r.bankSerial, stName(r.toStation), role().finance ? ` · ${fmtMoney(r.amount)}` : "", r.chargeEnd) })));

    const stationsRows = visibleStations().map((s) => {
      const onSt = V.powerbanks.filter((b) => b.stationId === s.id);
      const charged = onSt.filter((b) => b.status === "charged").length;
      const charging = onSt.filter((b) => b.status === "charging").length;
      const free = s.slots - onSt.length;
      const stAlerts = V.alerts.filter((x) => x.status !== "resolved" && x.ref.station === s.id).length;
      const offline = s.status !== "active";
      return `<tr class="clickable" data-go-station="${s.id}">
        <td><div style="font-weight:600">${s.name}</div><div class="small muted">${s.addr}</div></td>
        <td>${offline
          ? `<span class="badge low"><span class="dot"></span>${t("offline")}</span>`
          : `<span class="badge ok"><span class="dot"></span>${t("online")}</span>`}</td>
        <td class="num-cell hide-sm">${charged}</td>
        <td class="num-cell hide-sm">${charging}</td>
        <td class="num-cell hide-sm">${free}</td>
        <td class="hide-sm"><div class="st-occ-bar" style="width:120px" title="charged ${charged} · charging ${charging} · empty ${free}">
          <i style="width:${(charged / s.slots) * 100}%;background:var(--accent)"></i>
          <i style="width:${(charging / s.slots) * 100}%;background:var(--cyan)"></i>
        </div></td>
        <td class="num-cell">${stAlerts ? `<span class="badge low"><span class="dot"></span>${stAlerts}</span>` : '<span class="muted">—</span>'}</td>
        <td class="num-cell muted small">${fmtAgo(s.lastPing)}</td>
      </tr>`;
    }).join("");

    const investorAds = state.role === "investor" ? `
      <div class="card">
        <div class="card-head"><div class="card-title">${ico("megaphone")}${t("adTitle")}</div>
          <span class="badge neutral">${t("adNotMVP")}</span></div>
        <div class="card-body">
          <div class="ad-concept">
            <div class="row"><span class="muted">${t("adMau")}</span><b>1${NBSP}000</b></div>
            <div class="row"><span class="muted">${t("adSessions")}</span><b>4${NBSP}000</b></div>
            <div class="row"><span class="muted">${t("adImpressions")}</span><b>~12${NBSP}000</b></div>
            <div class="row"><span class="muted">${t("adCpm")}</span><b>TZS 350–1${NBSP}400</b></div>
            <div class="row"><span class="muted">${t("adRevenue")}</span><b>TZS 4–17${NBSP}k/mo</b></div>
          </div>
          <p class="small muted mt8">${t("adNote")}</p>
        </div>
      </div>` : "";

    return `
      <div class="kpi-row" id="kpiRow">${dashboardKpis()}</div>
      <div class="grid" style="grid-template-columns: minmax(0,2fr) minmax(280px,1fr)">
        <div class="grid" style="align-content:start">
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("activity")}${t("rentals14")}${role().station ? " " + t("yourStation") : ""}</div>
              <span class="small muted">total ${fmtNum(V.rentalsByDay(role().station).reduce((s, d) => s + d.count, 0))}</span></div>
            <div class="chart-wrap">${areaChart()}</div>
          </div>
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("clock")}${t("demandHour")}</div>
              <span class="small muted">${t("demandPeaks")}</span></div>
            <div class="card-body">${heatmapHtml()}</div>
          </div>
          ${investorAds}
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("station")}${t("stationsSection")}</div></div>
            <div class="tbl-wrap"><table class="tbl">
              <thead><tr><th>${t("stations")}</th><th>${t("stationStatus")}</th><th class="num-cell hide-sm">${t("stationReadyCol")}</th><th class="num-cell hide-sm">${t("stationChargingCol")}</th><th class="num-cell hide-sm">${t("stationEmptyCol")}</th><th class="hide-sm">${t("stationOccupancy")}</th><th class="num-cell">${t("alertsCount")}</th><th class="num-cell">${t("stationPing")}</th></tr></thead>
              <tbody>${stationsRows}</tbody>
            </table></div>
          </div>
        </div>
        <div class="grid" style="align-content:start">
          ${state.role !== "investor" ? `
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("alert")}${t("alertsSection")}</div>
              <button class="btn ghost sm" data-go="alerts">${t("allAlerts", openAlerts().length)} ${ico("chevR", 14)}</button></div>
            <div class="card-body flush">${alertsHtml}</div>
          </div>` : ""}
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("zap")}${t("eventFeed")}</div>
              ${state.live ? `<span class="badge charging"><span class="dot"></span>live</span>` : `<span class="small muted">${t("startLive")}</span>`}</div>
            <div class="card-body flush" id="feedBox">
              ${feedSeed.map(feedItem).join("") || `<div class="empty-state">${t("allQuiet")}</div>`}
            </div>
          </div>
        </div>
      </div>`;
  }

  function feedItem(f) {
    const icon = f.type === "rent" ? "out" : f.type === "return" ? "in" : f.type === "alert" ? "alert" : "zap";
    return `<div class="feed-item ev-${f.type}">${ico(icon, 14)}<span>${f.txt}</span><span class="feed-time">${fmtTime(f.t)}</span></div>`;
  }

  const ALERT_TITLE_KEY = {
    low_charge: "chargeAlert", station_offline: "stationOfflineAlert",
    overdue_rental: "rentalOverdue", slot_blocked: "slotBlocked",
    maintenance_done: "maintComplete", battery_returned_low: "returnedLow",
  };
  const alertTitle = (a) => ALERT_TITLE_KEY[a.type] ? t(ALERT_TITLE_KEY[a.type]) : a.title;

  function alertItem(a) {
    const icon = a.type === "station_offline" ? "station" : a.type === "low_charge" ? "battery" : a.type === "overdue_rental" ? "clock" : a.type === "slot_blocked" ? "alert" : "info";
    return `<div class="alert-item ${a.severity}">
      ${ico(icon)}
      <div style="flex:1;min-width:0">
        <div class="alert-tt">${alertTitle(a)}</div>
        <div class="alert-msg">${a.msg}</div>
        ${a.status === "in_progress" ? `<div class="mt8"><span class="badge charging"><span class="dot"></span>${t("inProgress")}</span></div>` : ""}
      </div>
      <span class="alert-time">${fmtAgo(a.createdAt)}</span>
    </div>`;
  }

  /* ─────────── stations ─────────── */
  function renderStations() {
    if (state.stationId) return renderStationDetail(state.stationId);
    const cards = visibleStations().map((s) => {
      const onSt = V.powerbanks.filter((b) => b.stationId === s.id);
      const charged = onSt.filter((b) => b.status === "charged").length;
      const charging = onSt.filter((b) => b.status === "charging").length;
      const free = s.slots - onSt.length;
      const offline = s.status !== "active";
      return `<div class="card station-card" data-go-station="${s.id}">
        <div class="st-head">
          <div><div class="st-name">${s.name}</div><div class="st-addr">${s.addr}</div></div>
          ${offline ? `<span class="badge low"><span class="dot"></span>${t("offline")}</span>` : `<span class="badge ok"><span class="dot"></span>${t("online")}</span>`}
        </div>
        <div class="st-occ-bar"><i style="width:${(charged / s.slots) * 100}%;background:var(--accent)"></i><i style="width:${(charging / s.slots) * 100}%;background:var(--cyan)"></i></div>
        <div class="st-meta">
          <span>${t("stationReady")} <b>${charged}</b></span><span>${t("stationCharging")} <b>${charging}</b></span>
          <span>${t("stationEmpty")} <b>${free}</b></span><span class="muted">ping ${fmtAgo(s.lastPing)}</span>
        </div>
      </div>`;
    }).join("");
    return `<div class="page-head"><div><div class="page-title">${t("stationsTitle")}</div>
        <div class="page-sub">${t("stationsSub", visibleStations().length)}</div></div></div>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">${cards}</div>`;
  }

  function renderStationDetail(id) {
    const s = V.stations.find((x) => x.id === id);
    if (!s) { state.stationId = null; return renderStations(); }
    const onSt = V.powerbanks.filter((b) => b.stationId === id).sort((a, b) => a.slot - b.slot);
    const bySlot = {}; onSt.forEach((b) => { bySlot[b.slot] = b; });
    const charged = onSt.filter((b) => b.status === "charged").length;
    const charging = onSt.filter((b) => b.status === "charging").length;
    const offline = s.status !== "active";

    let slots = "";
    for (let n = 1; n <= s.slots; n++) {
      const b = bySlot[n];
      if (!b) {
        slots += `<div class="slot s-empty"><span class="slot-n">${n}</span>
          <svg class="slot-icon" viewBox="0 0 24 24">${I.batterySlot}</svg><span class="slot-tag">${t("slotEmpty")}</span></div>`;
      } else {
        const cls = b.charge < 20 ? "s-low" : b.status === "charging" ? "s-charging" : "s-charged";
        slots += `<div class="slot ${cls}" data-bank="${b.id}" title="${b.serial}" style="--lvl:${b.charge}">
          <span class="slot-n">${n}</span>
          <svg class="slot-icon" viewBox="0 0 24 24">${I.batterySlot}</svg>
          <span class="slot-pct">${b.charge}%</span>
        </div>`;
      }
    }

    const events = [];
    V.rentals.filter((r) => r.fromStation === id).slice(-4).forEach((r) =>
      events.push({ t: r.startedAt, txt: t("maintIssued", r.bankSerial, role().pii ? " · " + maskName(client(r.clientId).name) : ""), type: "rent" }));
    V.rentals.filter((r) => r.toStation === id && r.returnedAt).slice(-4).forEach((r) =>
      events.push({ t: r.returnedAt, txt: t("maintReturned", r.bankSerial, r.chargeEnd), type: "return" }));
    V.alerts.filter((a) => a.ref.station === id).forEach((a) =>
      events.push({ t: a.createdAt, txt: a.title + " — " + a.msg, type: "alert" }));
    V.maintenance.filter((m) => m.station === id).slice(0, 2).forEach((m) =>
      events.push({ t: m.at, txt: `${m.type} · ${m.operator}`, type: "service" }));
    events.sort((a, b) => b.t - a.t);

    const maint = V.maintenance.filter((m) => m.station === id);

    return `
      <div class="page-head">
        <div>
          <button class="btn ghost sm" data-go="stations" style="margin-left:-8px">${t("stationBack")}</button>
          <div class="page-title mt8">${s.name}
            ${offline ? `<span class="badge low" style="vertical-align:3px;margin-left:8px"><span class="dot"></span>${t("stationOfflineLabel", "4h")}</span>`
              : `<span class="badge ok" style="vertical-align:3px;margin-left:8px"><span class="dot"></span>${t("stationOnlineLabel")}</span>`}</div>
          <div class="page-sub">${t("stationSub", s.addr, s.operator, fmtAgo(s.lastPing))}</div>
        </div>
        ${state.role !== "investor" ? `<button class="btn" id="maintBtn">${ico("wrench", 14)}${t("logMaint")}</button>` : ""}
      </div>
      <div class="kpi-row">
        ${kpiCard(t("readyToIssue"), charged, t("chargeAbove"))}
        ${kpiCard(t("stationChargingCol"), charging, (() => { const low = onSt.filter((b) => b.charge < 20).length; return low ? t("critical_n", low) : (charging ? t("toFull") : ""); })(), "var(--cyan)")}
        ${kpiCard(t("freeSlots"), s.slots - onSt.length, t("forReturns"), "var(--text-muted)")}
        ${kpiCard(t("alertsCount"), V.alerts.filter((a) => a.status !== "resolved" && a.ref.station === id).length, "", "var(--danger)")}
      </div>
      <div class="grid" style="grid-template-columns:minmax(0,3fr) minmax(280px,2fr)">
        <div class="card">
          <div class="card-head"><div class="card-title">${ico("battery")}${t("slotsLabel")}</div>
            <span class="small muted">${t("occupied", onSt.length, s.slots)}</span></div>
          <div class="card-body">
            ${offline ? `<div class="empty-state">${ico("alert", 20)}${t("stationOfflineMsg")}</div>`
              : `<div class="slot-grid">${slots}</div>
                 <div class="legend mt16">
                   <span><i style="background:var(--accent)"></i>${t("chargedLegend")}</span>
                   <span><i style="background:var(--cyan)"></i>${t("chargingLegend")}</span>
                   <span><i style="background:var(--danger)"></i>${t("lowLegend")}</span>
                   <span><i style="background:var(--surface-3);border:1px dashed var(--border)"></i>${t("emptyLegend")}</span>
                 </div>`}
          </div>
        </div>
        <div class="grid" style="align-content:start">
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("activity")}${t("stationEvents")}</div></div>
            <div class="card-body flush">${events.slice(0, 8).map(feedItem).join("") || `<div class="empty-state">${t("noEvents")}</div>`}</div>
          </div>
          <div class="card">
            <div class="card-head"><div class="card-title">${ico("wrench")}${t("maintLog")}</div></div>
            <div class="card-body flush">
              ${maint.map((m) => `<div class="alert-item info">${ico("wrench")}
                <div style="flex:1"><div class="alert-tt">${m.type} · ${m.operator}</div>
                <div class="alert-msg">${m.note}</div></div>
                <span class="alert-time">${fmtAgo(m.at)}</span></div>`).join("")
                || `<div class="empty-state">${t("noRecords")}</div>`}
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ─────────── powerbanks ─────────── */
  function renderBanks() {
    let list = visibleBanks();
    const counts = {
      all: list.length,
      charged: list.filter((b) => b.status === "charged").length,
      charging: list.filter((b) => b.status === "charging").length,
      renting: list.filter((b) => b.status === "renting").length,
      service: list.filter((b) => b.status === "service").length,
      retired: list.filter((b) => b.status === "retired").length,
    };
    if (state.bankFilter !== "all") list = list.filter((b) => b.status === state.bankFilter);
    if (state.bankSearch) {
      const q = state.bankSearch.toLowerCase();
      list = list.filter((b) => b.serial.toLowerCase().includes(q)
        || (b.clientId && client(b.clientId).name.toLowerCase().includes(q)));
    }
    const { key, dir } = state.bankSort;
    list = list.slice().sort((a, b) => {
      const va = a[key], vb = b[key];
      return (typeof va === "string" ? va.localeCompare(vb) : va - vb) * dir;
    });

    const sortIco = (k) => key === k ? `<span class="sort-ico">${dir > 0 ? "↑" : "↓"}</span>` : "";
    const chips = [
      ["all", t("allFilter")], ["charged", t("chargedFilter")], ["charging", t("chargingFilter")],
      ["renting", t("rentingFilter")], ["service", t("serviceFilter")], ["retired", t("retiredFilter")],
    ].map(([k, lbl]) => `<button class="chip ${state.bankFilter === k ? "on" : ""}" data-bank-filter="${k}">${lbl}<span class="chip-n">${counts[k]}</span></button>`).join("");

    const rows = list.map((b) => {
      let place;
      if (b.stationId) {
        place = `<div style="font-weight:500">${stName(b.stationId)}</div><div class="small muted">${t("slot", b.slot)}</div>`;
      } else if (b.status === "renting") {
        const c = client(b.clientId);
        place = `<div class="cell-user"><span class="avatar">${initials(c.name)}</span>
          <div><div style="font-weight:500">${maskName(c.name)}</div>
          <div class="small muted">${t("rentingFilter")}: ${fmtAgo(b.rentedAt)}</div></div></div>`;
      } else if (b.status === "service") {
        place = `<span class="muted">${t("serviceCenter")}</span>`;
      } else {
        place = `<span class="muted">${t("warehouse")}</span>`;
      }
      return `<tr class="clickable" data-drawer-bank="${b.id}">
        <td><span class="serial">${b.serial}</span></td>
        <td>${bankBadge(b)}</td>
        <td>${place}</td>
        <td class="num-cell">${b.status === "retired" ? '<span class="muted">—</span>' : chargeCell(b.charge)}</td>
        <td class="num-cell hide-sm tnum">${fmtNum(b.cycles)}</td>
        <td class="hide-sm">${healthBadge(b.health)}</td>
        <td class="row-actions-cell"><div class="row-actions">
          <button class="row-act" data-qr="${b.id}" title="${t("showQr")}">${ico("qr", 16)}</button>
          <button class="row-act" data-drawer-bank="${b.id}" title="Details">${ico("eye", 16)}</button>
        </div></td>
      </tr>`;
    }).join("");

    return `
      <div class="page-head">
        <div><div class="page-title">${t("banksTitle")}</div>
          <div class="page-sub">${t("banksSub", counts.all)}</div></div>
        <div class="filters">
          <div class="search-box">${ico("search", 14)}<input id="bankSearch" placeholder="Serial or client…" value="${esc(state.bankSearch)}"></div>
        </div>
      </div>
      <div class="filters mb16">${chips}</div>
      <div class="card"><div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th class="sortable" data-sort="serial">${t("serialCol")}${sortIco("serial")}</th>
            <th>${t("statusCol")}</th><th>${t("locationCol")}</th>
            <th class="num-cell sortable" data-sort="charge">${t("chargeCol")}${sortIco("charge")}</th>
            <th class="num-cell hide-sm sortable" data-sort="cycles">${t("cyclesCol")}${sortIco("cycles")}</th>
            <th class="hide-sm sortable" data-sort="health">${t("healthCol")}${sortIco("health")}</th>
            <th></th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="7"><div class="empty-state">${ico("search", 20)}${t("nothingFound")}</div></td></tr>`}</tbody>
        </table>
      </div></div>`;
  }

  /* ─────────── drawer: powerbank card ─────────── */
  function bankTimeline(b) {
    const items = [];
    items.push({ t: b.manufactured, type: "born", tt: t("tlManufactured"), d: t("tlBatch") + " " + b.serial.split("-")[1] });
    V.rentals.filter((r) => r.bankSerial === b.serial).slice(-5).forEach((r) => {
      const c = client(r.clientId);
      items.push({ t: r.startedAt, type: "rent", tt: t("tlRental", maskName(c.name)), d: t("tlStationCharge", stName(r.fromStation), r.chargeStart) });
      if (r.returnedAt) items.push({
        t: r.returnedAt, type: "return",
        tt: t("tlReturnedCharge", r.chargeEnd),
        d: `${stName(r.toStation)} · ${fmtDur(r.durationMin)}${role().finance ? " · " + fmtMoney(r.amount) : ""}`,
      });
    });
    V.alerts.filter((a) => a.ref.bank === b.serial).forEach((a) =>
      items.push({ t: a.createdAt, type: "alert", tt: a.title, d: a.msg }));
    items.sort((x, y) => y.t - x.t);
    return items.slice(0, 9).map((i) =>
      `<div class="tl-item ${i.type}"><div class="tl-t">${i.tt}</div>
       <div class="tl-d">${i.d} · ${fmtAgo(i.t)}</div></div>`).join("");
  }

  function healthSpark(b) {
    // degradation: from 100% (0 cycles) to current health
    const W = 180, H = 44;
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const cyc = (b.cycles / 10) * i;
      const h = Math.max(100 - cyc * 0.05, 10);
      pts.push(`${(i / 10) * W},${H - ((h - 10) / 90) * (H - 6) - 3}`);
    }
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <polyline points="${pts.join(" ")}" fill="none" stroke="${b.health > 80 ? "var(--success)" : b.health >= 50 ? "var(--warning)" : "var(--danger)"}" stroke-width="2"/>
      <line x1="0" x2="${W}" y1="${H - ((30 - 10) / 90) * (H - 6) - 3}" y2="${H - ((30 - 10) / 90) * (H - 6) - 3}" stroke="var(--border)" stroke-dasharray="3 3"/>
    </svg>`;
  }

  function openBankDrawer(id) {
    const b = V.powerbanks.find((x) => x.id === id);
    if (!b) return;
    const root = $("#drawerRoot");
    const cyclesToReplace = Math.max(0, Math.round((b.health - 30) / 0.05));
    let placeRow = "";
    if (b.stationId) placeRow = `<dt>${t("location")}</dt><dd>${stName(b.stationId)} · ${t("slot", b.slot)}</dd>`;
    else if (b.status === "renting") {
      const c = client(b.clientId);
      placeRow = `<dt>${t("withClient")}</dt><dd>${maskName(c.name)} · ${maskPhone(c.phone)}<br><span class="muted small">${t("rentingSince")}: ${fmtAgo(b.rentedAt)}</span></dd>`;
    } else placeRow = `<dt>${t("location")}</dt><dd>${b.status === "service" ? t("serviceCenter") : t("warehouse")}</dd>`;

    root.innerHTML = `
      <div class="drawer-back" data-close-drawer></div>
      <div class="drawer" role="dialog" aria-modal="true" aria-label="${t("drawerLabel")}">
        <div class="drawer-head">
          <div><span class="serial" style="font-size:15px">${b.serial}</span>
            <span style="margin-left:8px">${bankBadge(b)}</span></div>
          <button class="icon-btn" data-close-drawer>${ico("x", 18)}</button>
        </div>
        <div class="drawer-body">
          <div class="bat-visual">
            <div class="bat-shape"><div class="bat-fill" style="height:${b.charge}%;background:${chargeColor(b.charge)}"></div></div>
            <div>
              <div class="bat-big">${b.charge}<small>%</small></div>
              <div class="bat-cap">${fmtNum(b.capacityMah)} mAh · ~${Math.round(b.capacityMah / 700)}h phone battery life</div>
            </div>
          </div>
          <dl class="kv">
            ${placeRow}
            <dt>${t("chargeCycles")}</dt><dd class="tnum">${fmtNum(b.cycles)}</dd>
            <dt>${t("health")}</dt><dd><div class="health-row">${healthBadge(b.health)}</div></dd>
            <dt>${t("degradation")}</dt><dd>${healthSpark(b)}<div class="small muted">${t("replaceThreshold", fmtNum(cyclesToReplace))}</div></dd>
            <dt>${t("manufactured")}</dt><dd>${new Date(b.manufactured).toLocaleDateString("en-TZ")}</dd>
          </dl>
          ${state.role !== "investor" ? `<button class="btn" data-qr="${b.id}" style="align-self:flex-start">${ico("qr", 14)}${t("showQr")}</button>` : ""}
          <div>
            <div class="section-label">${t("timeline")}</div>
            <div class="timeline">${bankTimeline(b)}</div>
          </div>
        </div>
      </div>`;
    root.hidden = false;
  }
  function closeDrawer() { $("#drawerRoot").hidden = true; $("#drawerRoot").innerHTML = ""; }

  /* ─────────── QR modal ─────────── */
  function openQr(id) {
    const b = V.powerbanks.find((x) => x.id === id);
    if (!b || typeof qrcode !== "function") return;
    const qr = qrcode(0, "M");
    qr.addData(`VOLT:${b.serial}`);
    qr.make();
    const root = $("#modalRoot");
    root.innerHTML = `
      <div class="modal-back" data-close-modal></div>
      <div class="modal" role="dialog" aria-modal="true" aria-label="${t("qrLabel")}">
        <button class="icon-btn modal-close" data-close-modal>${ico("x", 18)}</button>
        <div class="section-label">QR on device body</div>
        <div class="qr-box">${qr.createSvgTag({ cellSize: 5, margin: 0 })}</div>
        <div class="qr-serial">${b.serial}</div>
        <div class="qr-hint">Scanned by client app and operator app.<br>Payload: VOLT:${b.serial}</div>
      </div>`;
    root.hidden = false;
  }
  function closeModal() { $("#modalRoot").hidden = true; $("#modalRoot").innerHTML = ""; }

  /* ─────────── rentals ─────────── */
  function renderRentals() {
    const all = visibleRentals();
    const active = all.filter((r) => r.status === "active" || r.status === "overdue")
      .sort((a, b) => a.startedAt - b.startedAt);
    const completed = all.filter((r) => r.status === "completed")
      .sort((a, b) => b.returnedAt - a.returnedAt);
    const isActive = state.rentalTab === "active";

    let list = isActive ? active : completed;
    if (state.rentalSearch) {
      const q = state.rentalSearch.toLowerCase();
      list = list.filter((r) => r.bankSerial.toLowerCase().includes(q)
        || client(r.clientId).name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    const shown = isActive ? list : list.slice(0, state.completedLimit);

    const a = V.aggregates();
    const fin = role().finance;

    const head = isActive
      ? `<tr><th>ID</th><th>${t("clientCol")}</th><th>${t("powerbankCol")}</th><th>${t("fromCol")}</th><th>${t("startedCol")}</th><th class="num-cell">${t("durationCol")}</th><th class="num-cell hide-sm">${t("chargeIssuedCol")}</th>${fin ? `<th class="num-cell">${t("dueNowCol")}</th>` : ""}<th>${t("statusCol")}</th></tr>`
      : `<tr><th>ID</th><th>${t("clientCol")}</th><th>${t("powerbankCol")}</th><th class="hide-sm">${t("routeCol")}</th><th>${t("returnedCol")}</th><th class="num-cell">${t("durCol")}</th><th class="num-cell hide-sm">${t("chargeCol")}</th>${fin ? `<th class="num-cell">${t("amountCol")}</th>` : ""}<th>${t("paymentCol")}</th></tr>`;

    const rows = shown.map((r) => {
      const c = client(r.clientId);
      const userCell = `<div class="cell-user"><span class="avatar">${initials(c.name)}</span><span>${maskName(c.name)}</span></div>`;
      if (isActive) {
        const mins = Math.floor((Date.now() - r.startedAt) / V.MIN);
        const cost = V.rentalCost(mins);
        return `<tr>
          <td class="mono small muted">${r.id}</td>
          <td>${userCell}</td>
          <td><span class="serial">${r.bankSerial}</span></td>
          <td class="small">${stName(r.fromStation)}</td>
          <td class="small muted">${fmtAgo(r.startedAt)}</td>
          <td class="num-cell tnum">${fmtDur(mins)}</td>
          <td class="num-cell hide-sm tnum">${r.chargeStart}%</td>
          ${fin ? `<td class="num-cell tnum" style="font-weight:600">${fmtMoney(cost)}</td>` : ""}
          <td>${r.status === "overdue"
            ? `<span class="badge low"><span class="dot"></span>${t("overdueStatus")}</span>`
            : `<span class="badge charging"><span class="dot"></span>${t("activeStatus")}</span>`}</td>
        </tr>`;
      }
      return `<tr>
        <td class="mono small muted">${r.id}</td>
        <td>${userCell}</td>
        <td><span class="serial">${r.bankSerial}</span></td>
        <td class="small hide-sm">${stName(r.fromStation)} → ${stName(r.toStation)}</td>
        <td class="small muted">${fmtAgo(r.returnedAt)}</td>
        <td class="num-cell tnum">${fmtDur(r.durationMin)}</td>
        <td class="num-cell hide-sm tnum">${r.chargeStart}% → ${r.chargeEnd}%</td>
        ${fin ? `<td class="num-cell tnum" style="font-weight:600">${fmtMoney(r.amount)}</td>` : ""}
        <td><span class="badge ok"><span class="dot"></span>${t("paidStatus")}</span></td>
      </tr>`;
    }).join("");

    return `
      <div class="page-head">
        <div><div class="page-title">${t("rentalsTitle")}</div>
          <div class="page-sub">${t("rentalsSub", fin ? a.completedToday : 0, fin ? fmtMoney(a.revenueToday) : "")}</div></div>
        <div class="filters">
          <div class="search-box">${ico("search", 14)}<input id="rentalSearch" placeholder="Client, serial, ID…" value="${esc(state.rentalSearch)}"></div>
        </div>
      </div>
      <div class="filters mb16">
        <button class="chip ${isActive ? "on" : ""}" data-rental-tab="active">${t("active")}<span class="chip-n">${active.length}</span></button>
        <button class="chip ${!isActive ? "on" : ""}" data-rental-tab="completed">${t("completed")}<span class="chip-n">${completed.length}</span></button>
        <span class="small muted" style="margin-left:auto">${t("tariff")}: ${V.TARIFF.label}</span>
      </div>
      <div class="card"><div class="tbl-wrap">
        <table class="tbl"><thead>${head}</thead>
        <tbody>${rows || `<tr><td colspan="9"><div class="empty-state">${ico("search", 20)}${t("nothingFound")}</div></td></tr>`}</tbody></table>
      </div></div>
      ${!isActive && list.length > state.completedLimit
        ? `<div style="text-align:center;margin-top:14px"><button class="btn" id="moreRentals">${t("showMore", Math.min(50, list.length - state.completedLimit))}</button></div>` : ""}`;
  }

  /* ─────────── clients ─────────── */
  function renderClients() {
    const stats = V.clients.map((c) => {
      const rs = V.rentals.filter((r) => r.clientId === c.id);
      return {
        c,
        total: rs.length,
        spent: rs.filter((r) => r.amount).reduce((s, r) => s + r.amount, 0),
        active: rs.find((r) => r.status === "active" || r.status === "overdue"),
      };
    }).sort((a, b) => b.spent - a.spent);

    const rows = stats.map(({ c, total, spent, active }) => `<tr>
      <td><div class="cell-user"><span class="avatar">${initials(c.name)}</span><span style="font-weight:500">${maskName(c.name)}</span></div></td>
      <td class="mono small">${maskPhone(c.phone)}</td>
      <td class="small muted hide-sm">${new Date(c.registered).toLocaleDateString("en-TZ")}</td>
      <td class="num-cell tnum">${total}</td>
      <td class="num-cell tnum" style="font-weight:600">${fmtMoney(spent)}</td>
      <td>${active
        ? `<span class="badge renting"><span class="dot"></span>${t("renting", active.bankSerial)}</span>`
        : '<span class="muted small">—</span>'}</td>
    </tr>`).join("");

    return `
      <div class="page-head"><div><div class="page-title">${t("clientsTitle")}</div>
        <div class="page-sub">${t("clientsSub", V.clients.length, stats.filter((s) => s.active).length)}</div></div></div>
      <div class="card"><div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>${t("clientCol")}</th><th>${t("phoneCol")}</th><th class="hide-sm">${t("registeredCol")}</th><th class="num-cell">${t("rentalsCol")}</th><th class="num-cell">${t("spentCol")}</th><th>${t("nowCol")}</th></tr></thead>
        <tbody>${rows}</tbody></table></div></div>`;
  }

  /* ─────────── alerts ─────────── */
  function renderAlerts() {
    let list = V.alerts.slice().sort((a, b) => {
      const sev = { critical: 0, warning: 1, info: 2 };
      return (sev[a.severity] - sev[b.severity]) || (b.createdAt - a.createdAt);
    });
    if (role().station) list = list.filter((a) => !a.ref.station || a.ref.station === role().station);
    const open = list.filter((a) => a.status !== "resolved");
    if (state.alertFilter === "open") list = open;
    else if (state.alertFilter !== "all") list = list.filter((a) => a.severity === state.alertFilter);

    const items = list.map((a) => `
      <div class="alert-item ${a.severity}">
        ${ico(a.type === "station_offline" ? "station" : a.type === "low_charge" ? "battery" : a.type === "overdue_rental" ? "clock" : a.type === "slot_blocked" ? "alert" : "info")}
        <div style="flex:1;min-width:0">
          <div class="alert-tt">${alertTitle(a)}
            ${a.severity === "critical" ? `<span class="badge low" style="margin-left:6px"><span class="dot"></span>${t("critical")}</span>` : ""}
            ${a.status === "in_progress" ? `<span class="badge charging" style="margin-left:6px"><span class="dot"></span>${t("inProgress")}</span>` : ""}
            ${a.status === "resolved" ? `<span class="badge neutral" style="margin-left:6px">${t("resolved")}</span>` : ""}
          </div>
          <div class="alert-msg">${a.msg}</div>
          ${a.status !== "resolved" ? `<div class="alert-actions">
            ${a.status === "new" ? `<button class="btn sm" data-alert-work="${a.id}">${t("takeAction")}</button>` : ""}
            <button class="btn sm ghost" data-alert-close="${a.id}">${t("resolve")}</button>
          </div>` : ""}
        </div>
        <span class="alert-time">${fmtAgo(a.createdAt)}</span>
      </div>`).join("");

    return `
      <div class="page-head"><div><div class="page-title">${t("alertsTitle")}</div>
        <div class="page-sub">${t("alertsSub", open.length)}</div></div></div>
      <div class="filters mb16">
        <button class="chip ${state.alertFilter === "open" ? "on" : ""}" data-alert-filter="open">${t("open")}<span class="chip-n">${open.length}</span></button>
        <button class="chip ${state.alertFilter === "critical" ? "on" : ""}" data-alert-filter="critical">${t("critical")}</button>
        <button class="chip ${state.alertFilter === "warning" ? "on" : ""}" data-alert-filter="warning">${t("warnings")}</button>
        <button class="chip ${state.alertFilter === "all" ? "on" : ""}" data-alert-filter="all">${t("all")}</button>
      </div>
      <div class="card"><div class="card-body flush">${items || `<div class="empty-state">${ico("check", 20)}${t("allClear")}</div>`}</div></div>`;
  }

  /* ─────────── maintenance modal ─────────── */
  function openMaintModal(stationId) {
    const root = $("#modalRoot");
    root.innerHTML = `
      <div class="modal-back" data-close-modal></div>
      <div class="modal" style="width:380px" role="dialog" aria-modal="true" aria-label="${t("maintTitle")}">
        <button class="icon-btn modal-close" data-close-modal>${ico("x", 18)}</button>
        <div class="section-label">${t("maintTitle")}</div>
        <div class="form-row mt16"><label>${t("workType")}</label>
          <select id="mType"><option>${t("inspection")}</option><option>${t("inventory")}</option><option>${t("cleaning")}</option><option>${t("repair")}</option><option>${t("replacement")}</option></select></div>
        <div class="form-row"><label>${t("comment")}</label>
          <textarea id="mNote" rows="3" placeholder="What was done, what was noticed…"></textarea></div>
        <div class="form-row"><label>${t("defectPhoto")}</label>
          <button class="btn" style="justify-content:center">${ico("plus", 14)}${t("attachPhoto")}</button></div>
        <button class="btn primary" id="mSave" style="width:100%;justify-content:center">${t("saveLog")}</button>
      </div>`;
    root.hidden = false;
    $("#mSave").addEventListener("click", () => {
      V.maintenance.unshift({
        at: Date.now(), station: stationId, operator: role().who,
        type: $("#mType").value, note: $("#mNote").value || t("noComment"),
      });
      closeModal(); render();
      toast(t("maintSaved"));
    });
  }

  /* ─────────── live simulation ─────────── */
  let liveTimer = null;
  function pushFeed(type, txt, st) {
    state.feed.unshift({ type, t: Date.now(), txt, st: st || null });
    state.feed = state.feed.slice(0, 12);
  }
  function liveStep() {
    const roll = V.rnd();
    if (roll < 0.34) {
      // new rental: charged bank from station → client
      const candidates = V.powerbanks.filter((b) => b.status === "charged" && b.stationId);
      const freeClients = V.clients.filter((c) => !c.activeRentalId);
      if (candidates.length > 2 && freeClients.length) {
        const b = V.pick(candidates), c = V.pick(freeClients);
        const st = b.stationId;
        b.status = "renting"; b.stationId = null; b.slot = null;
        b.clientId = c.id; b.rentedAt = Date.now();
        const r = {
          id: "R-" + (5200 + Math.floor(V.rnd() * 700)), clientId: c.id, bankSerial: b.serial,
          fromStation: st, toStation: null, startedAt: Date.now(), returnedAt: null,
          durationMin: null, chargeStart: b.charge, chargeEnd: null, amount: null, status: "active",
        };
        V.rentals.push(r); c.activeRentalId = r.id;
        pushFeed("rent", t("taken", b.serial, stName(st), maskName(c.name)), st);
      }
    } else if (roll < 0.62) {
      // return: active rental (from live) completes
      const act = V.rentals.filter((r) => r.status === "active");
      const stationsFree = V.stations.filter((s) => {
        if (s.status !== "active") return false;
        return V.powerbanks.filter((b) => b.stationId === s.id).length < s.slots;
      });
      if (act.length > 4 && stationsFree.length) {
        const r = V.pick(act);
        const b = V.powerbanks.find((x) => x.serial === r.bankSerial);
        const st = V.pick(stationsFree);
        const mins = Math.max(5, Math.floor((Date.now() - r.startedAt) / V.MIN));
        r.status = "completed"; r.returnedAt = Date.now(); r.durationMin = mins;
        r.toStation = st.id; r.chargeEnd = Math.max(3, r.chargeStart - V.ri(10, 60));
        r.amount = V.rentalCost(mins);
        const c = client(r.clientId); if (c) c.activeRentalId = null;
        if (b) {
          const used = V.powerbanks.filter((x) => x.stationId === st.id).map((x) => x.slot);
          // stationsFree guarantees free slot; limiter is insurance against infinite loop
          let slot = 1; while (used.includes(slot) && slot <= st.slots) slot++;
          if (slot > st.slots) slot = st.slots;
          b.status = "charging"; b.stationId = st.id; b.slot = slot;
          b.charge = r.chargeEnd; b.clientId = null; b.cycles++;
          b.health = Math.max(Math.round((100 - b.cycles * 0.05) * 10) / 10, 10);
          if (b.charge < 20) {
            V.alerts.unshift({
              id: "al" + Date.now(), type: "low_charge", severity: "critical",
              title: t("chargeAlert"), msg: `${b.serial} · ${b.charge}% · ${st.name}`,
              ref: { bank: b.serial, station: st.id }, createdAt: Date.now(), status: "new",
            });
            pushFeed("alert", t("alertFeed", b.serial, b.charge, st.name), st.id);
          }
        }
        pushFeed("return", t("returned", r.bankSerial, st.name, role().finance ? " · " + fmtMoney(r.amount) : "", r.chargeEnd), st.id);
      }
    } else {
      // charging tick
      let promoted = null;
      V.powerbanks.filter((b) => b.status === "charging" && b.stationId).forEach((b) => {
        b.charge = Math.min(100, b.charge + V.ri(2, 4));
        if (b.charge >= 80) { b.status = "charged"; promoted = b; }
      });
      if (promoted) pushFeed("zap", t("charged_to", promoted.serial, promoted.charge), promoted.stationId);
    }
    // refresh screen
    updateBell();
    if (["dashboard", "stations"].includes(state.view)) render(true);
  }
  function toggleLive() {
    state.live = !state.live;
    const btn = $("#liveBtn");
    btn.classList.toggle("on", state.live);
    btn.innerHTML = state.live
      ? `${ico("pause", 14)}<span>${t("liveOn")}</span>`
      : `${ico("play", 14)}<span>${t("liveDemo")}</span>`;
    if (state.live) {
      pushFeed("zap", t("liveStarted"));
      liveTimer = setInterval(liveStep, 2800);
      toast(t("liveToast"));
      if (state.view === "dashboard") render(true);
    } else {
      clearInterval(liveTimer);
      render(true);
    }
  }

  /* ─────────── toast ─────────── */
  function toast(txt) {
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `${ico("zap")}<span>${txt}</span>`;
    $("#toastRoot").appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .4s"; }, 2600);
    setTimeout(() => t.remove(), 3100);
  }

  /* ─────────── navigation and layout ─────────── */
  function viewTitles() {
    return {
      dashboard: t("overview"), stations: t("stations"), banks: t("powerbanks"),
      rentals: t("rentals"), clients: t("clients"), alerts: t("alerts"),
    };
  }

  function positionNavIndicator() {
    const ind = $("#navIndicator");
    const wrap = $("#navWrap");
    const active = $("#nav .nav-item.active");
    if (!ind || !wrap) return;
    if (!active) { ind.style.height = "0px"; return; }
    const r = active.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    ind.style.transform = `translateY(${r.top - w.top}px)`;
    ind.style.height = r.height + "px";
  }

  function renderNav() {
    const r = role();
    const nd = navDef();
    $("#nav").innerHTML = r.nav.map((key) => {
      const d = nd[key];
      if (d.soon) return `<button class="nav-item disabled" data-soon title="${t("navSoonTitle")}">
        ${ico(d.i)}<span class="nav-text">${d.t}</span><span class="nav-soon">${t("soon")}</span></button>`;
      const badge = key === "alerts" && openAlerts().length
        ? `<span class="nav-badge">${openAlerts().length}</span>` : "";
      return `<button class="nav-item ${state.view === key ? "active" : ""}" data-go="${key}">
        ${ico(d.i)}<span class="nav-text">${d.t}</span>${badge}</button>`;
    }).join("");
    requestAnimationFrame(positionNavIndicator);
  }

  function renderRoleMenu() {
    $("#roleCurrent").textContent = role().label;
    $("#userName").textContent = role().who;
    $("#userAvatar").textContent = role().avatar;
    $("#roleMenu").innerHTML = Object.entries(ROLES_DEF).map(([k, r]) =>
      `<button class="role-option ${k === state.role ? "current" : ""}" data-role="${k}">
        <b>${t(r.labelKey)}</b><span>${t(r.descKey)}</span></button>`).join("");
  }

  function updateBell() {
    const n = openAlerts().length;
    const el = $("#bellCount");
    el.textContent = n;
    el.classList.toggle("zero", !n);
    renderNav();
  }


  /* count-up чисел KPI (только при смене вида/роли, не при live-тиках) */
  function runCountUps(root) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    (root || document).querySelectorAll(".kpi-value").forEach((el) => {
      const first = el.firstChild;
      if (!first || first.nodeType !== 3) return;
      const m = first.textContent.match(/^([\d\s,\u00A0\u202F.]+)/);
      if (!m) return;
      const raw = m[1];
      const target = parseFloat(raw.replace(/[^\d.]/g, ""));
      if (!isFinite(target) || target === 0) return;
      const suffix = first.textContent.slice(raw.length);
      const grp = raw.includes(",") ? "," : (/[\s\u00A0\u202F]/.test(raw.trim().slice(0, -1)) ? "\u202F" : "");
      const t0 = performance.now(), dur = 650;
      const fmt = (n) => {
        let out = String(Math.round(n));
        if (grp) out = out.replace(/\B(?=(\d{3})+(?!\d))/g, grp);
        return out;
      };
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
        first.textContent = fmt(target * e) + suffix;
        if (k < 1) requestAnimationFrame(tick);
        else first.textContent = raw + suffix;
      };
      requestAnimationFrame(tick);
    });
  }

  function render(soft) {
    const views = {
      dashboard: renderDashboard, stations: renderStations, banks: renderBanks,
      rentals: renderRentals, clients: renderClients, alerts: renderAlerts,
    };
    if (!views[state.view]) state.view = "dashboard";
    const viewEl = $("#view");
    if (!soft) { viewEl.classList.remove("view-in"); void viewEl.offsetWidth; }
    viewEl.innerHTML = views[state.view]();
    if (!soft) viewEl.classList.add("view-in");
    $("#crumb").textContent = state.view === "stations" && state.stationId
      ? t("stationsBreadcrumb", stName(state.stationId))
      : viewTitles()[state.view];
    renderNav();
    if (!soft) { $("#view").scrollTop = 0; runCountUps(viewEl); }

    // view-specific event handlers
    const bs = $("#bankSearch");
    if (bs) bs.addEventListener("input", (e) => {
      state.bankSearch = e.target.value;
      const pos = e.target.selectionStart;
      render(true);
      const el2 = $("#bankSearch"); el2.focus(); el2.setSelectionRange(pos, pos);
    });
    const rs2 = $("#rentalSearch");
    if (rs2) rs2.addEventListener("input", (e) => {
      state.rentalSearch = e.target.value;
      const pos = e.target.selectionStart;
      render(true);
      const el2 = $("#rentalSearch"); el2.focus(); el2.setSelectionRange(pos, pos);
    });
    const more = $("#moreRentals");
    if (more) more.addEventListener("click", () => { state.completedLimit += 50; render(true); });
    const mb = $("#maintBtn");
    if (mb) mb.addEventListener("click", () => openMaintModal(state.stationId));
  }

  /* ─────────── global click handlers ─────────── */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go],[data-go-station],[data-bank-filter],[data-sort],[data-rental-tab],[data-alert-filter],[data-alert-work],[data-alert-close],[data-drawer-bank],[data-qr],[data-close-drawer],[data-close-modal],[data-role],[data-soon],[data-bank],[data-lang]");
    if (!el) return;

    if (el.dataset.go) { state.view = el.dataset.go; state.stationId = null; render(); }
    else if (el.dataset.goStation) { state.view = "stations"; state.stationId = el.dataset.goStation; render(); }
    else if (el.dataset.bankFilter) { state.bankFilter = el.dataset.bankFilter; render(true); }
    else if (el.dataset.sort) {
      const k = el.dataset.sort;
      if (state.bankSort.key === k) state.bankSort.dir *= -1;
      else state.bankSort = { key: k, dir: 1 };
      render(true);
    }
    else if (el.dataset.rentalTab) { state.rentalTab = el.dataset.rentalTab; state.completedLimit = 50; render(true); }
    else if (el.dataset.alertFilter) { state.alertFilter = el.dataset.alertFilter; render(true); }
    else if (el.dataset.alertWork) {
      const a = V.alerts.find((x) => x.id === el.dataset.alertWork);
      if (a) { a.status = "in_progress"; toast(t("alertAssigned", role().who)); render(true); updateBell(); }
    }
    else if (el.dataset.alertClose) {
      const a = V.alerts.find((x) => x.id === el.dataset.alertClose);
      if (a) { a.status = "resolved"; toast(t("alertResolved")); render(true); updateBell(); }
    }
    else if (el.dataset.qr) { e.stopPropagation(); openQr(el.dataset.qr); }
    else if (el.dataset.drawerBank) { openBankDrawer(el.dataset.drawerBank); }
    else if (el.dataset.bank) { openBankDrawer(el.dataset.bank); }
    else if (el.hasAttribute("data-close-drawer")) closeDrawer();
    else if (el.hasAttribute("data-close-modal")) closeModal();
    else if (el.dataset.lang) {
      setLang(el.dataset.lang);
      const picker = $("#langPicker");
      if (picker) { picker.hidden = true; }
      const btn = $("#langBtn");
      if (btn) { btn.setAttribute("aria-expanded", "false"); }
      const cur = $("#langCurrent");
      if (cur) cur.textContent = LANG.toUpperCase();
    }
    else if (el.dataset.role) {
      state.role = el.dataset.role;
      state.view = "dashboard"; state.stationId = null;
      state.bankFilter = "all"; state.bankSearch = ""; state.rentalSearch = "";
      $("#roleMenu").hidden = true;
      $("#roleBtn").setAttribute("aria-expanded", "false");
      renderRoleMenu(); render(); updateBell();
      toast(t("roleUpdated", role().label));
    }
    else if (el.hasAttribute("data-soon")) toast(t("adSoon"));
  });

  $("#roleBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const m = $("#roleMenu");
    m.hidden = !m.hidden;
    $("#roleBtn").setAttribute("aria-expanded", String(!m.hidden));
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".role-switch")) { $("#roleMenu").hidden = true; }
    if (!e.target.closest(".lang-switch")) {
      const picker = $("#langPicker");
      if (picker) picker.hidden = true;
      const btn = $("#langBtn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
  const langBtnEl = $("#langBtn");
  if (langBtnEl) {
    langBtnEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const picker = $("#langPicker");
      picker.hidden = !picker.hidden;
      langBtnEl.setAttribute("aria-expanded", String(!picker.hidden));
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeDrawer(); closeModal(); }
  });
  // блик за курсором на карточках/панелях (делегировано)
  document.addEventListener("mousemove", (e) => {
    const t = e.target.closest(".card, .kpi-row");
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mx", (e.clientX - r.left) + "px");
    t.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  $("#liveBtn").addEventListener("click", toggleLive);
  $("#bellBtn").addEventListener("click", () => {
    if (role().nav.includes("alerts")) { state.view = "alerts"; state.stationId = null; render(); }
    else toast(t("alertUnavailable"));
  });

  /* ─────────── init ─────────── */
  document.documentElement.lang = LANG;
  const initLangCur = $("#langCurrent");
  if (initLangCur) initLangCur.textContent = LANG.toUpperCase();
  renderLangPicker();
  renderRoleMenu();
  updateBell();
  render();
  updateStaticChrome();
})();
