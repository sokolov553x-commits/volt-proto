/**
 * VOLT · Powerbank Sharing — Tanzania
 * Vanilla JS · clickable prototype · i18n: EN / RU / SW
 */
'use strict';

/* ════════════════════════════════════════════════
   i18n STRINGS
   ════════════════════════════════════════════════ */
const LANGS = {
  en: {
    screens:        ['Station map','Station · slots','Scan · rental','History & wallet','Profile'],
    protoLabel:     'Client Application',
    protoSub:       'Clickable prototype · 5 screens',
    allStations:    'Nearest stations',
    stationCount:   '5 stations',
    filterAll:      'All', filterAvail: 'Available', filterNearby: 'Nearby',
    searchPlh:      'Find a station...',
    available:      'free', closed: 'Closed',
    slotsLabel:     'Charging slots',
    slotsMeta:      '9 charged · 2 charging · 5 empty',
    tariffFirst:    'First hour', tariffNext: 'After', tariffMax: 'Max per day',
    tariffDeposit:  'Hold deposit {d} · returned on return',
    reviewsLabel:   'Reviews', reviewsAll: 'All',
    stationStatus:  'Open · 9:00–21:00',
    scanTitle:      'Scan QR',
    scanHint:       'Point at the QR code on the station body',
    scanHintOut:    'Point camera at the QR code on the station',
    scanManual:     'Enter code manually',
    scanStatus:     'Scanning...',
    capacity:       'Capacity', cables: 'Cables included',
    depositNote:    'Hold deposit: {d} — returned within 10 min after return',
    confirmBtn:     'Confirm & take', cancelBtn: 'Cancel',
    rentalActive:   'Renting', timerLabel: 'Rental time', costHint: 'will be charged',
    serialLabel:    'Serial number', takenFrom: 'Taken from',
    chargeLabel:    'Charge at pickup',
    howReturn:      'How to return', findReturn: 'Find return point',
    returnTitle:    'How to return the powerbank',
    returnStep1t:   'Find any VOLT station',
    returnStep1d:   'You can return at any station in the city — not necessarily where you took it.',
    returnStep2t:   'Insert powerbank into a free slot',
    returnStep2d:   "Any empty slot. You'll hear a click — the powerbank is locked in.",
    returnStep3t:   'Rental ends automatically',
    returnStep3d:   'Billed by actual usage. Deposit {d} returned within 10 minutes.',
    understood:     'Got it',
    histTitle:      'History & wallet',
    histCurrent:    'Current', histHistory: 'History',
    activeRental:   'Active rental', inProgress: 'In progress',
    goToRental:     'Go to rental', paid: 'Paid',
    totalRentals:   'Total rentals', spentJune: 'Spent in June',
    profileTitle:   'Profile',
    walletBalance:  'Wallet balance', topUp: 'Top up',
    paymentSection: 'Payment', settingsSection: 'Settings',
    supportSection: 'Support', aboutSection: 'About',
    notifLabel:     'Notifications', notifEnabled: 'Enabled',
    langLabel:      'Language', langCurrent: 'English',
    privacyLabel:   'Privacy', helpLabel: 'Help & FAQ',
    supportLabel:   'Contact support',
    logoutBtn:      'Sign out',
    addPayment:     'Add payment method',
    scanBtn:        'Scan QR',
    tabMap: 'Map', tabRent: 'Rent', tabHistory: 'History', tabProfile: 'Profile',
    toastGeo:       'Your location found',
    toastSearch:    'Station search — coming soon',
    toastShare:     'Link copied',
    toastReviews:   'All reviews — coming soon',
    toastReturn:    'Showing return points',
    toastRented:    'Powerbank issued! Enjoy charging',
    noActiveRental: 'No active rental',
    noActiveSub:    'Scan a QR code at any station to take a powerbank',
    findStation:    'Find a station',
    toastTopup:     'Wallet top-up — coming soon',
    toastEdit:      'Profile editing — coming soon',
    toastLogout:    'Signed out',
    adSlot50:       'Ad slot · 320×50', adSlot80: 'Ad slot · 320×80',
    slotCharged:    'Slot {n}, {p}%, charged',
    slotCharging:   'Slot {n}, {p}%, charging',
    slotEmpty:      'Slot {n}, empty',
    slotPctFmt:     '{p}% · ~{h}h life · 10,000 mAh',
    histDateFmt:    ['8 Jun 2026','6 Jun 2026','4 Jun 2026','2 Jun 2026','30 May 2026'],
    histDur:        ['2h 15min','48min','24h 00min','1h 40min','42min'],
    verBeta:        'v1.0.0 · Beta',
    allFilters:     'All stations', availFilter: 'Available', nearbyFilter: 'Nearby',
    rentedToast:    'Powerbank issued! Enjoy charging',
    detailsSoon:    'Rental details — coming soon',
    stSlotHint:     '1st hour',
  },
  ru: {
    screens:        ['Карта станций','Станция · слоты','Сканирование · аренда','История и счёт','Профиль'],
    protoLabel:     'Клиентское приложение',
    protoSub:       'Кликабельный прототип · 5 экранов',
    allStations:    'Ближайшие станции',
    stationCount:   '5 станций',
    filterAll:      'Все', filterAvail: 'Доступны', filterNearby: 'Рядом',
    searchPlh:      'Найти станцию...',
    available:      'свободно', closed: 'Закрыто',
    slotsLabel:     'Слоты зарядки',
    slotsMeta:      '9 заряжено · 2 заряжается · 5 пусто',
    tariffFirst:    'Первый час', tariffNext: 'Далее', tariffMax: 'Максимум в сутки',
    tariffDeposit:  'Залог-холд {d} · вернётся при возврате',
    reviewsLabel:   'Отзывы', reviewsAll: 'Все',
    stationStatus:  'Открыто · 9:00–21:00',
    scanTitle:      'Сканирование QR',
    scanHint:       'Наведите на QR-код на корпусе станции',
    scanHintOut:    'Поднесите камеру к QR-коду на станции',
    scanManual:     'Ввести код вручную',
    scanStatus:     'Сканирование...',
    capacity:       'Ёмкость', cables: 'Кабели в комплекте',
    depositNote:    'Залог-холд: {d} — вернётся при возврате в течение 10 мин',
    confirmBtn:     'Подтвердить и взять', cancelBtn: 'Отмена',
    rentalActive:   'В аренде', timerLabel: 'Время аренды', costHint: 'будет списано',
    serialLabel:    'Серийный номер', takenFrom: 'Взято в',
    chargeLabel:    'Заряд при выдаче',
    howReturn:      'Как вернуть', findReturn: 'Найти точку возврата',
    returnTitle:    'Как вернуть повербанк',
    returnStep1t:   'Найдите любую станцию VOLT',
    returnStep1d:   'Вернуть можно в любом месте города — не обязательно там, где брали.',
    returnStep2t:   'Вставьте повербанк в свободный слот',
    returnStep2d:   'Любой пустой слот. Услышите щелчок — повербанк зафиксирован.',
    returnStep3t:   'Аренда завершится автоматически',
    returnStep3d:   'Списание по факту. Залог {d} вернётся в течение 10 минут.',
    understood:     'Понятно',
    histTitle:      'История и счёт',
    histCurrent:    'Текущая', histHistory: 'История',
    activeRental:   'Активная аренда', inProgress: 'В процессе',
    goToRental:     'Перейти к аренде', paid: 'Оплачено',
    totalRentals:   'Всего аренд', spentJune: 'Потрачено в июне',
    profileTitle:   'Профиль',
    walletBalance:  'Баланс кошелька', topUp: 'Пополнить',
    paymentSection: 'Оплата', settingsSection: 'Настройки',
    supportSection: 'Поддержка', aboutSection: 'О приложении',
    notifLabel:     'Уведомления', notifEnabled: 'Включены',
    langLabel:      'Язык', langCurrent: 'Русский',
    privacyLabel:   'Конфиденциальность', helpLabel: 'Справка и FAQ',
    supportLabel:   'Написать в поддержку',
    logoutBtn:      'Выйти из аккаунта',
    addPayment:     'Добавить способ оплаты',
    scanBtn:        'Сканировать QR',
    tabMap: 'Карта', tabRent: 'Аренда', tabHistory: 'История', tabProfile: 'Профиль',
    toastGeo:       'Ваше местоположение определено',
    toastSearch:    'Поиск станций — скоро',
    toastShare:     'Ссылка скопирована',
    toastReviews:   'Все отзывы — скоро',
    toastReturn:    'Показываем точки возврата',
    toastRented:    'Повербанк выдан! Хорошей зарядки',
    noActiveRental: 'Нет активной аренды',
    noActiveSub:    'Отсканируйте QR-код на любой станции, чтобы взять повербанк',
    findStation:    'Найти станцию',
    toastTopup:     'Пополнение кошелька — скоро',
    toastEdit:      'Редактирование профиля — скоро',
    toastLogout:    'Выход из аккаунта',
    adSlot50:       'Рекламный слот · 320×50', adSlot80: 'Рекламный слот · 320×80',
    slotCharged:    'Слот {n}, {p}%, заряжен',
    slotCharging:   'Слот {n}, {p}%, заряжается',
    slotEmpty:      'Слот {n}, пустой',
    slotPctFmt:     '{p}% заряда · ~{h} ч работы · 10 000 мА·ч',
    histDateFmt:    ['8 июня 2026','6 июня 2026','4 июня 2026','2 июня 2026','30 мая 2026'],
    histDur:        ['2 ч 15 мин','48 мин','24 ч 00 мин','1 ч 40 мин','42 мин'],
    verBeta:        'v1.0.0 · Бета',
    allFilters:     'Все станции', availFilter: 'Доступные', nearbyFilter: 'Рядом',
    rentedToast:    'Повербанк выдан! Хорошей зарядки',
    detailsSoon:    'Детали аренды — скоро',
    stSlotHint:     '1-й час',
  },
  sw: {
    screens:        ['Ramani ya vituo','Kituo · nafasi','Skana · kukodisha','Historia & mkoba','Wasifu'],
    protoLabel:     'Programu ya Mteja',
    protoSub:       'Mfano unaobonyezwa · skrini 5',
    allStations:    'Vituo vilivyo karibu',
    stationCount:   'vituo 5',
    filterAll:      'Zote', filterAvail: 'Zinapatikana', filterNearby: 'Karibu',
    searchPlh:      'Tafuta kituo...',
    available:      'huru', closed: 'Imefungwa',
    slotsLabel:     'Nafasi za kuchaji',
    slotsMeta:      '9 zimechajwa · 2 zinachaji · 5 wazi',
    tariffFirst:    'Saa ya kwanza', tariffNext: 'Baadaye', tariffMax: 'Kiwango cha juu kwa siku',
    tariffDeposit:  'Amana ya {d} · itarudishwa unaporejesha',
    reviewsLabel:   'Maoni', reviewsAll: 'Yote',
    stationStatus:  'Wazi · 9:00–21:00',
    scanTitle:      'Skana QR',
    scanHint:       'Elekeza kwenye msimbo wa QR kwenye kituo',
    scanHintOut:    'Elekeza kamera kwenye msimbo wa QR wa kituo',
    scanManual:     'Ingiza nambari kwa mkono',
    scanStatus:     'Inaskanisha...',
    capacity:       'Uwezo', cables: 'Nyaya zilizojumuishwa',
    depositNote:    'Amana: {d} — itarudishwa ndani ya dakika 10 baada ya kurudisha',
    confirmBtn:     'Thibitisha & chukua', cancelBtn: 'Ghairi',
    rentalActive:   'Inakodishwa', timerLabel: 'Muda wa kukodisha', costHint: 'itakatwa',
    serialLabel:    'Nambari ya serial', takenFrom: 'Imechukuliwa kutoka',
    chargeLabel:    'Chaji wakati wa kuchukua',
    howReturn:      'Jinsi ya kurudisha', findReturn: 'Tafuta kituo cha kurudisha',
    returnTitle:    'Jinsi ya kurudisha powerbank',
    returnStep1t:   'Tafuta kituo chochote cha VOLT',
    returnStep1d:   'Unaweza kurudisha katika kituo chochote mjini — si lazima pale ulichochukua.',
    returnStep2t:   'Weka powerbank kwenye nafasi tupu',
    returnStep2d:   'Nafasi yoyote tupu. Utasikia klik — powerbank imefungwa.',
    returnStep3t:   'Kukodisha kutaisha moja kwa moja',
    returnStep3d:   'Malipo kulingana na matumizi halisi. Amana {d} itarudishwa ndani ya dakika 10.',
    understood:     'Nimeelewa',
    histTitle:      'Historia & mkoba',
    histCurrent:    'Ya sasa', histHistory: 'Historia',
    activeRental:   'Kukodisha kwa sasa', inProgress: 'Inaendelea',
    goToRental:     'Nenda kwenye kukodisha', paid: 'Imelipwa',
    totalRentals:   'Jumla ya kukodisha', spentJune: 'Imetumika Juni',
    profileTitle:   'Wasifu',
    walletBalance:  'Salio la mkoba', topUp: 'Ongeza',
    paymentSection: 'Malipo', settingsSection: 'Mipangilio',
    supportSection: 'Msaada', aboutSection: 'Kuhusu',
    notifLabel:     'Arifa', notifEnabled: 'Zimewashwa',
    langLabel:      'Lugha', langCurrent: 'Kiswahili',
    privacyLabel:   'Faragha', helpLabel: 'Msaada na Maswali',
    supportLabel:   'Wasiliana na msaada',
    logoutBtn:      'Toka',
    addPayment:     'Ongeza njia ya malipo',
    scanBtn:        'Skana QR',
    tabMap: 'Ramani', tabRent: 'Kodisha', tabHistory: 'Historia', tabProfile: 'Wasifu',
    toastGeo:       'Mahali pako pamepatikana',
    toastSearch:    'Utafutaji wa vituo — hivi karibuni',
    toastShare:     'Kiungo kimekopiwa',
    toastReviews:   'Maoni yote — hivi karibuni',
    toastReturn:    'Inaonyesha vituo vya kurudisha',
    toastRented:    'Powerbank imetolewa! Chaji njema',
    noActiveRental: 'Hakuna ukodishaji hai',
    noActiveSub:    'Skani msimbo wa QR kwenye kituo chochote kuchukua powerbank',
    findStation:    'Tafuta kituo',
    toastTopup:     'Kuongeza mkoba — hivi karibuni',
    toastEdit:      'Kuhariri wasifu — hivi karibuni',
    toastLogout:    'Umetoka',
    adSlot50:       'Nafasi ya tangazo · 320×50', adSlot80: 'Nafasi ya tangazo · 320×80',
    slotCharged:    'Nafasi {n}, {p}%, imechajwa',
    slotCharging:   'Nafasi {n}, {p}%, inachaji',
    slotEmpty:      'Nafasi {n}, tupu',
    slotPctFmt:     'Chaji {p}% · ~saa {h} · mAh 10,000',
    histDateFmt:    ['8 Juni 2026','6 Juni 2026','4 Juni 2026','2 Juni 2026','30 Mei 2026'],
    histDur:        ['Saa 2 dak 15','Dakika 48','Saa 24 dak 00','Saa 1 dak 40','Dakika 42'],
    verBeta:        'v1.0.0 · Beta',
    allFilters:     'Vituo vyote', availFilter: 'Zinapatikana', nearbyFilter: 'Karibu',
    rentedToast:    'Powerbank imetolewa! Chaji njema',
    detailsSoon:    'Maelezo ya kukodisha — hivi karibuni',
    stSlotHint:     'saa 1',
  },
};

/* ── lang detection & helpers ── */
function detectLang() {
  const s = localStorage.getItem('volt_lang');
  if (s && LANGS[s]) return s;
  const n = (navigator.language || 'en').toLowerCase();
  if (n.startsWith('ru')) return 'ru';
  if (n.startsWith('sw')) return 'sw';
  return 'en';
}

let LANG = detectLang();
let T    = LANGS[LANG];

function t(key, vars) {
  let s = T[key] !== undefined ? T[key] : (LANGS.en[key] || key);
  if (vars) Object.entries(vars).forEach(([k,v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), v); });
  return s;
}

/* ════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════ */
const TARIFF = { firstHour: 1500, perHour: 800, maxDay: 7000, deposit: 3000 };
const fmtTzs = n => n.toLocaleString('en-TZ') + ' TZS';

const STATION_NAMES = {
  en: ['Mlimani City Mall · 1st floor','Kariakoo Market · main entrance','Msasani Mall · lobby','JNIA Airport · arrivals','Ubungo Terminal · bus hub'],
  ru: ['Mlimani City Mall · 1 этаж','Kariakoo Market · главный вход','Msasani Mall · фойе','Аэропорт JNIA · прилёт','Убунго Терминал · автобусы'],
  sw: ['Mlimani City Mall · ghorofa 1','Soko la Kariakoo · mlango mkuu','Msasani Mall · sebule','Uwanja wa JNIA · kuwasili','Kituo cha Ubungo · mabasi'],
};
const STATION_SUBS = {
  en: ['420 m · Mlimani City','850 m · Kariakoo','1.4 km · Msasani Peninsula','18 km · Departure zone','3.8 km · Ubungo'],
  ru: ['420 м · Mlimani City','850 м · Kariakoo','1.4 км · Msasani Peninsula','18 км · Зона вылета','3.8 км · Ubungo'],
  sw: ['m 420 · Mlimani City','m 850 · Kariakoo','km 1.4 · Msasani Peninsula','km 18 · Eneo la kuondoka','km 3.8 · Ubungo'],
};
const REVIEWS = {
  en: [
    { stars:5, text:'"Always works, conveniently located at the mall entrance"', author:'Amani K. · 3 days ago' },
    { stars:4, text:'"Quick pickup, returned at another location no problem"',   author:'Juma R. · 1 week ago' },
  ],
  ru: [
    { stars:5, text:'«Всегда работает, удобно расположена у входа в молл»',    author:'Amani K. · 3 дня назад' },
    { stars:4, text:'«Быстро взял, вернул в другом месте без проблем»',         author:'Juma R. · 1 неделю назад' },
  ],
  sw: [
    { stars:5, text:'"Inafanya kazi kila wakati, karibu na mlango wa duka"',    author:'Amani K. · siku 3 zilizopita' },
    { stars:4, text:'"Nilichukua haraka, nilirudisha mahali pengine bila tatizo"', author:'Juma R. · wiki 1 iliyopita' },
  ],
};
const HIST_ROUTES = {
  en: [['Mlimani City Mall','Kariakoo Market'],['Kariakoo Market','Kariakoo Market'],['Msasani Mall','Mlimani City Mall'],['JNIA Airport','JNIA Airport'],['Kariakoo Market','Kariakoo Market']],
  ru: [['Mlimani City Mall','Kariakoo Market'],['Kariakoo Market','Kariakoo Market'],['Msasani Mall','Mlimani City Mall'],['Аэропорт JNIA','Аэропорт JNIA'],['Kariakoo Market','Kariakoo Market']],
  sw: [['Mlimani City Mall','Soko la Kariakoo'],['Soko la Kariakoo','Soko la Kariakoo'],['Msasani Mall','Mlimani City Mall'],['Uwanja wa JNIA','Uwanja wa JNIA'],['Soko la Kariakoo','Soko la Kariakoo']],
};
const HIST_AMOUNTS  = [3100, 1500, 7000, 2300, 1500]; // по тарифу: 1500 первый час + 800/час
const HIST_TOTAL    = HIST_AMOUNTS.reduce((a,b)=>a+b,0); // 15400

const SLOTS = [
  { id:0,  type:'charged',  pct:100, serial:'VT-2603-00408', hours:14 },
  { id:1,  type:'charged',  pct:95,  serial:'VT-2603-00391', hours:13 },
  { id:2,  type:'charging', pct:61,  serial:'VT-2603-00402', hours:null },
  { id:3,  type:'charged',  pct:88,  serial:'VT-2603-00377', hours:12 },
  { id:4,  type:'empty',    pct:null,serial:null,             hours:null },
  { id:5,  type:'charged',  pct:100, serial:'VT-2603-00417', hours:14 },
  { id:6,  type:'charged',  pct:92,  serial:'VT-2603-00388', hours:12 },
  { id:7,  type:'empty',    pct:null,serial:null,             hours:null },
  { id:8,  type:'charged',  pct:80,  serial:'VT-2603-00365', hours:11 },
  { id:9,  type:'empty',    pct:null,serial:null,             hours:null },
  { id:10, type:'charged',  pct:100, serial:'VT-2603-00421', hours:14 },
  { id:11, type:'charging', pct:34,  serial:'VT-2603-00410', hours:null },
  { id:12, type:'charged',  pct:87,  serial:'VT-2603-00374', hours:12 },
  { id:13, type:'empty',    pct:null,serial:null,             hours:null },
  { id:14, type:'charged',  pct:93,  serial:'VT-2603-00398', hours:13 },
  { id:15, type:'empty',    pct:null,serial:null,             hours:null },
];

/* ════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════ */
const S = {
  screen:         'map',
  prev:           'map',
  selectedSlot:    5,
  scanTimeout:     null,
  scanLockTimeout: null,
  rentalActive:    false,
  rentalStart:     null,
  timerInterval:   null,
  histTab:         'current',
  returnOpen:      false,
  confirmOpen:     false,
  filter:          'all',
  langPickerOpen:  false,
};

/* ════════════════════════════════════════════════
   DOM helpers
   ════════════════════════════════════════════════ */
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ════════════════════════════════════════════════
   i18n APPLY
   ════════════════════════════════════════════════ */
function applyI18n() {
  document.documentElement.lang = LANG;

  // Text nodes
  $$('[data-i18n]').forEach(el => {
    const vars = el.dataset.i18nVars ? JSON.parse(el.dataset.i18nVars) : {};
    el.textContent = t(el.dataset.i18n, vars);
  });

  // Placeholders
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });

  // Sidebar screen names
  $$('[data-i18n-screen]').forEach(el => {
    const i = +el.dataset.i18nScreen;
    if (T.screens[i] !== undefined) el.textContent = T.screens[i];
  });

  // Station names / subs
  const names = STATION_NAMES[LANG] || STATION_NAMES.en;
  const subs  = STATION_SUBS[LANG]  || STATION_SUBS.en;
  $$('[data-station-name]').forEach(el => { const i=+el.dataset.stationName; if(names[i]) el.textContent=names[i]; });
  $$('[data-station-sub]' ).forEach(el => { const i=+el.dataset.stationSub;  if(subs[i])  el.textContent=subs[i];  });

  // Tariff blocks
  const nextSuffix = LANG==='ru' ? '/час' : LANG==='sw' ? '/saa' : '/hr';
  const daySuffix  = LANG==='ru' ? '/сутки' : LANG==='sw' ? '/siku' : '/day';
  $$('[data-tariff]').forEach(el => {
    switch(el.dataset.tariff) {
      case 'first':   el.textContent = fmtTzs(TARIFF.firstHour); break;
      case 'next':    el.textContent = fmtTzs(TARIFF.perHour) + nextSuffix; break;
      case 'max':     el.textContent = fmtTzs(TARIFF.maxDay); break;
      case 'deposit': el.textContent = t('tariffDeposit', {d: fmtTzs(TARIFF.deposit)}); break;
    }
  });

  // Confirm sheet tariff
  const cstPrice = $('cstPrice'); if(cstPrice) cstPrice.textContent = fmtTzs(TARIFF.firstHour);
  const cstSub   = $('cstSub');
  if(cstSub) {
    cstSub.textContent = LANG==='ru'
      ? `Далее ${fmtTzs(TARIFF.perHour)}/час · максимум ${fmtTzs(TARIFF.maxDay)}/сутки`
      : LANG==='sw'
      ? `${fmtTzs(TARIFF.perHour)}/saa · kiwango cha juu ${fmtTzs(TARIFF.maxDay)}/siku`
      : `Then ${fmtTzs(TARIFF.perHour)}/hr · max ${fmtTzs(TARIFF.maxDay)}/day`;
  }

  // Station hero first-hour stat
  const shStat = $('shStatFirst'); if(shStat) shStat.textContent = fmtTzs(TARIFF.firstHour);
  const shStatLbl = $('shStatFirstLbl'); if(shStatLbl) shStatLbl.textContent = t('stSlotHint');

  // Deposit note
  const csD = $('csDeposit');  if(csD)  csD.textContent  = t('depositNote', {d: fmtTzs(TARIFF.deposit)});
  const rs3 = $('rs3desc');    if(rs3)  rs3.textContent   = t('returnStep3d',{d: fmtTzs(TARIFF.deposit)});

  // Cost bar labels
  const cbl = $('costBarLabels');
  if(cbl && cbl.children.length>=3) {
    const h1 = LANG==='ru'?'1 ч':LANG==='sw'?'saa 1':'1h';
    const h2 = LANG==='ru'?'2 ч':LANG==='sw'?'saa 2':'2h';
    const hD = LANG==='ru'?'сутки':LANG==='sw'?'siku':'day';
    cbl.children[0].textContent = `${fmtTzs(TARIFF.firstHour)} · ${h1}`;
    cbl.children[1].textContent = `${fmtTzs(TARIFF.firstHour+TARIFF.perHour)} · ${h2}`;
    cbl.children[2].textContent = `${fmtTzs(TARIFF.maxDay)} · ${hD}`;
  }

  // History amounts & dates & durations & routes
  $$('[data-hist-amount]').forEach(el => { const i=+el.dataset.histAmount; el.textContent=fmtTzs(HIST_AMOUNTS[i]); });
  const hsDates = t('histDateFmt'); const hsDurs = t('histDur');
  $$('[data-hist-date]').forEach(el => { const i=+el.dataset.histDate; if(Array.isArray(hsDates)&&hsDates[i]) el.textContent=hsDates[i]; });
  $$('[data-hist-dur]' ).forEach(el => { const i=+el.dataset.histDur;  if(Array.isArray(hsDurs) &&hsDurs[i])  el.textContent=hsDurs[i];  });
  const routes = HIST_ROUTES[LANG] || HIST_ROUTES.en;
  $$('[data-hist-from]').forEach(el => { const i=+el.dataset.histFrom; if(routes[i]) el.textContent=routes[i][0]; });
  $$('[data-hist-to]'  ).forEach(el => { const i=+el.dataset.histTo;   if(routes[i]) el.textContent=routes[i][1]; });

  // Totals
  const hsTot = $('hsSummaryVal'); if(hsTot) hsTot.textContent = fmtTzs(HIST_TOTAL);
  const psTot = $('psSpentVal');   if(psTot) psTot.textContent = fmtTzs(HIST_TOTAL);
  const bcAmt = $('bcAmount');     if(bcAmt) bcAmt.textContent = fmtTzs(18500);

  // Profile lang sub
  const langSub = $('langSub'); if(langSub) langSub.textContent = t('langCurrent');

  // Lang picker active state
  $$('[data-lang-opt]').forEach(el => {
    const active = el.dataset.langOpt === LANG;
    el.classList.toggle('lang-opt-active', active);
    el.setAttribute('aria-checked', active ? 'true' : 'false');
  });

  // Map lang pill active
  $$('[data-map-lang]').forEach(el => {
    el.classList.toggle('map-lang-active', el.dataset.mapLang === LANG);
  });

  // Filter chip labels
  $$('.chip').forEach(c => {
    if(c.dataset.filter==='all')       c.textContent = t('filterAll');
    if(c.dataset.filter==='available') c.textContent = t('filterAvail');
    if(c.dataset.filter==='nearby')    c.textContent = t('filterNearby');
  });

  // Tab labels
  const tabLabels = { map:'tabMap', rent:'tabRent', history:'tabHistory', profile:'tabProfile' };
  $$('.tab-item').forEach(el => {
    const key = tabLabels[el.dataset.screen];
    const lbl = el.querySelector('.ti-label');
    if(key && lbl) lbl.textContent = t(key);
  });

  // Ad slots
  $$('[data-i18n-ad]').forEach(el => { el.textContent = t(el.dataset.i18nAd); });

  // Slot grid aria labels
  $$('[data-slot-id]').forEach(el => {
    const slot = SLOTS[+el.dataset.slotId];
    if(!slot) return;
    let lbl = slot.type==='charged'  ? t('slotCharged',  {n:slot.id+1,p:slot.pct})
            : slot.type==='charging' ? t('slotCharging', {n:slot.id+1,p:slot.pct})
            : t('slotEmpty', {n:slot.id+1});
    el.setAttribute('aria-label', lbl);
  });

  // Reviews re-render
  renderReviews();

  // Scan button text
  const scanBtnEl = $('stationScanBtn'); if(scanBtnEl) { const sp=scanBtnEl.querySelector('span'); if(sp) sp.textContent=t('scanBtn'); }
}

function renderReviews() {
  const c = $('reviewsRow'); if(!c) return;
  const reviews = REVIEWS[LANG] || REVIEWS.en;
  c.innerHTML = '';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STAR_PATHS = [
    'M5 1l1.2 3.6H9.9L6.8 6.5l1.1 3.5L5 8l-2.9 2 1.1-3.5L0.1 4.6H3.8z',
    'M17 1l1.2 3.6H21.9L18.8 6.5l1.1 3.5L17 8l-2.9 2 1.1-3.5L12.1 4.6H15.8z',
    'M29 1l1.2 3.6H33.9L30.8 6.5l1.1 3.5L29 8l-2.9 2 1.1-3.5L24.1 4.6H27.8z',
    'M41 1l1.2 3.6H45.9L42.8 6.5l1.1 3.5L41 8l-2.9 2 1.1-3.5L36.1 4.6H39.8z',
    'M53 1l1.2 3.6H57.9L54.8 6.5l1.1 3.5L53 8l-2.9 2 1.1-3.5L48.1 4.6H51.8z',
  ];
  reviews.forEach(r => {
    const card = document.createElement('div'); card.className = 'review-card';
    const sd = document.createElement('div'); sd.className='review-stars'; sd.setAttribute('aria-label',`${r.stars} stars`);
    const svg = document.createElementNS(SVG_NS,'svg');
    svg.setAttribute('width','56'); svg.setAttribute('height','10'); svg.setAttribute('viewBox','0 0 56 10'); svg.setAttribute('aria-hidden','true');
    STAR_PATHS.forEach((d,i) => {
      const p = document.createElementNS(SVG_NS,'path');
      p.setAttribute('d',d); p.setAttribute('fill', i<r.stars ? '#7CA3FF' : '#DDE2EC');
      svg.appendChild(p);
    });
    sd.appendChild(svg); card.appendChild(sd);
    const p = document.createElement('p'); p.className='review-text'; p.textContent=r.text; card.appendChild(p);
    const a = document.createElement('span'); a.className='review-author'; a.textContent=r.author; card.appendChild(a);
    c.appendChild(card);
  });
}

/* ════════════════════════════════════════════════
   LANGUAGE SWITCH
   ════════════════════════════════════════════════ */
function switchLang(lang) {
  if(!LANGS[lang] || lang===LANG) return;
  LANG = lang;
  T    = LANGS[lang];
  localStorage.setItem('volt_lang', lang);
  applyI18n();
  showToast(T.langCurrent);
}

/* ════════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════════ */
function go(id) {
  if(id===S.screen) return;
  const out = $('screen-'+S.screen);
  const inn = $('screen-'+id);
  if(!inn) return;
  if(out) { out.classList.remove('active'); out.classList.add('exit'); setTimeout(()=>out.classList.remove('exit'),350); }
  S.prev=S.screen; S.screen=id;
  inn.classList.add('active');
  updateTabs(id);
  updateCanvasMeta(id);
}

/* dark screens where status bar should be white */
const DARK_SCREENS = new Set(['station','rent']);

function updateTabs(screenId) {
  const map = {map:'map',station:'map',rent:'rent',history:'history',profile:'profile'};
  const active = map[screenId]||screenId;
  $$('.tab-item').forEach(el => {
    const is = el.dataset.screen===active;
    el.classList.toggle('active',is);
    el.setAttribute('aria-selected', is?'true':'false');
  });
  // status bar color
  const sb = $('statusBar');
  if(sb) sb.classList.toggle('status-bar-dark', DARK_SCREENS.has(screenId));
}

function updateCanvasMeta(screenId) {
  $$('.cm-screen-item').forEach(el => {
    el.classList.toggle('active', el.dataset.jump===screenId ||
      (el.dataset.jump==='map' && screenId==='station'));
  });
}

/* ════════════════════════════════════════════════
   TAB BAR
   ════════════════════════════════════════════════ */
$$('.tab-item').forEach(el => {
  el.addEventListener('click', () => {
    const sc = el.dataset.screen;
    if(sc==='rent') {
      go('rent');
      // If rental already active, show rental view directly; otherwise start QR flow
      if(S.rentalActive) {
        $('qrView').style.display='none';
        $('confirmSheet').hidden=true;
        $('rentalView').hidden=false;
      } else {
        resetQrFlow();
        startQrScan();
      }
    } else {
      go(sc);
    }
  });
  el.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();} });
});

$$('.cm-screen-item').forEach(el => {
  el.addEventListener('click', () => {
    const target=el.dataset.jump;
    if(target==='rent'){
      go('rent');
      if(S.rentalActive){ $('qrView').style.display='none'; $('rentalView').hidden=false; }
      else resetQrFlow();
    } else go(target);
  });
});

/* ════════════════════════════════════════════════
   MAP SCREEN
   ════════════════════════════════════════════════ */
$$('.station-row').forEach(el => {
  el.addEventListener('click', () => { addRipple(el,'rgba(0,0,0,.06)'); setTimeout(()=>go('station'),80); });
});

$$('.map-pin').forEach(el => {
  el.addEventListener('click', () => go('station'));
  el.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();go('station');} });
});

$('mapGeoBtn').addEventListener('click', ()=>showToast(t('toastGeo')));
$('mapSearchBtn').addEventListener('click', ()=>showToast(t('toastSearch')));

/* Map top-bar: home button is a plain <a> link — no JS needed */
/* Map lang switcher pills */
$$('[data-map-lang]').forEach(el => {
  el.addEventListener('click', () => switchLang(el.dataset.mapLang));
  el.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();} });
});

$$('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('.chip').forEach(c=>c.classList.remove('chip-active'));
    chip.classList.add('chip-active');
    S.filter = chip.dataset.filter;
    const lbl = chip.dataset.filter==='all' ? t('allFilters')
              : chip.dataset.filter==='available' ? t('availFilter') : t('nearbyFilter');
    showToast(lbl);
  });
});

/* ════════════════════════════════════════════════
   STATION SCREEN
   ════════════════════════════════════════════════ */
function buildSlotGrid() {
  const grid = $('slotGrid'); if(!grid) return;
  const NS = 'http://www.w3.org/2000/svg';
  SLOTS.forEach(slot => {
    const el = document.createElement('div');
    el.className = 'slot slot-'+slot.type;
    el.dataset.slotId = slot.id;
    el.setAttribute('role','gridcell');
    el.setAttribute('tabindex', slot.type==='empty'?'-1':'0');

    if(slot.type==='charging') {
      const badge=document.createElement('span'); badge.className='slot-charging-badge'; badge.textContent='AC'; badge.setAttribute('aria-hidden','true');
      el.appendChild(badge);
    }

    const icon=document.createElementNS(NS,'svg');
    icon.setAttribute('width','14'); icon.setAttribute('height','14'); icon.setAttribute('viewBox','0 0 14 14');
    icon.setAttribute('fill','none'); icon.setAttribute('stroke','currentColor'); icon.setAttribute('stroke-width','1.5'); icon.setAttribute('aria-hidden','true');
    const n=(tag,attrs)=>{ const nd=document.createElementNS(NS,tag); Object.entries(attrs).forEach(([k,v])=>nd.setAttribute(k,v)); return nd; };
    if(slot.type==='charged') {
      icon.appendChild(n('rect',{x:'2',y:'4',width:'9',height:'7',rx:'1.5'}));
      icon.appendChild(n('path',{d:'M5 4V3a2 2 0 014 0v1','stroke-linecap':'round'}));
      icon.appendChild(n('path',{d:'M4.5 8h5','stroke-linecap':'round'}));
    } else if(slot.type==='charging') {
      icon.appendChild(n('path',{d:'M8 2L4 7.5h4l-2 4.5','stroke-linecap':'round','stroke-linejoin':'round'}));
    } else {
      icon.appendChild(n('rect',{x:'2',y:'4',width:'9',height:'7',rx:'1.5','stroke-dasharray':'2 1.5'}));
      icon.appendChild(n('path',{d:'M5 4V3a2 2 0 014 0v1','stroke-linecap':'round','stroke-dasharray':'2 1.5'}));
    }
    el.appendChild(icon);

    const pct=document.createElement('span'); pct.className='slot-pct'; pct.textContent=slot.pct!==null?slot.pct+'%':'—'; el.appendChild(pct);

    if(slot.type!=='empty') {
      el.addEventListener('click', ()=>selectSlot(slot.id));
      el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();selectSlot(slot.id);} });
    }
    if(slot.id===S.selectedSlot){ el.classList.add('slot-selected'); el.setAttribute('aria-selected','true'); }
    grid.appendChild(el);
  });
}

function selectSlot(id) {
  const slot=SLOTS[id]; if(!slot||slot.type==='empty') return;
  $$('.slot-selected').forEach(el=>{ el.classList.remove('slot-selected'); el.removeAttribute('aria-selected'); });
  const el=document.querySelector(`[data-slot-id="${id}"]`);
  if(el){ el.classList.add('slot-selected'); el.setAttribute('aria-selected','true'); }
  S.selectedSlot=id;
  const panel=$('slotPanel'); if(!panel) return;
  $('slotSerial').textContent=slot.serial;
  $('slotMeta').textContent = slot.hours ? t('slotPctFmt',{p:slot.pct,h:slot.hours}) : `${slot.pct}%`;
  panel.classList.remove('hidden');
}

$('stationBack').addEventListener('click', ()=>go('map'));
$('shareBtn').addEventListener('click', ()=>showToast(t('toastShare')));
$('shareBtn').addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();$('shareBtn').click();} });
$('slotTakeBtn').addEventListener('click', ()=>{ go('rent'); resetQrFlow(); startQrScan(); });
$('stationScanBtn').addEventListener('click', ()=>{ go('rent'); resetQrFlow(); startQrScan(); });
$$('.section-link').forEach(btn=>{ btn.addEventListener('click',()=>showToast(t('toastReviews'))); });

/* ════════════════════════════════════════════════
   QR SCAN FLOW
   ════════════════════════════════════════════════ */
function resetQrFlow() {
  clearTimeout(S.scanTimeout);
  clearTimeout(S.scanLockTimeout);
  $('qrView').style.display='flex';
  $('confirmSheet').hidden=true;
  $('returnSheet').hidden=true;
  S.confirmOpen=false; S.returnOpen=false;
  if(!S.rentalActive) $('rentalView').hidden=true;
  $('scanStatus').style.opacity='1';
  // reset finder appearance
  const finder=$('qrFinder');
  if(finder){ finder.classList.remove('qr-locked'); }
}
function startQrScan() {
  // step 1: after 1.8s — lock effect on finder
  S.scanTimeout=setTimeout(()=>{
    if(S.screen!=='rent'||S.confirmOpen||S.rentalActive) return;
    const finder=$('qrFinder');
    if(finder){ finder.classList.add('qr-locked'); }
    // step 2: after 400ms more — show confirm sheet
    S.scanLockTimeout=setTimeout(()=>{
      if(S.screen==='rent'&&!S.confirmOpen&&!S.rentalActive) showConfirmSheet();
    },400);
  },1800);
}
function showConfirmSheet() {
  S.confirmOpen=true;
  $('qrView').style.display='none';
  $('confirmSheet').hidden=false;
  $('scanStatus').style.opacity='0';
  const finder=$('qrFinder');
  if(finder){ finder.classList.remove('qr-locked'); }
}

$('rentBack').addEventListener('click', ()=>{
  if(S.returnOpen){ closeReturn(); return; }
  clearTimeout(S.scanTimeout); clearTimeout(S.scanLockTimeout);
  const finder=$('qrFinder'); if(finder) finder.classList.remove('qr-locked');
  go(S.prev==='station'?'station':'map');
});
$('manualBtn').addEventListener('click', ()=>{ clearTimeout(S.scanTimeout); clearTimeout(S.scanLockTimeout); showConfirmSheet(); });
$('confirmBtn').addEventListener('click', ()=>{
  addRipple($('confirmBtn'));
  $('confirmSheet').hidden=true; $('qrView').style.display='none'; $('rentalView').hidden=false;
  S.rentalActive=true; S.rentalStart=Date.now(); S.confirmOpen=false;
  startTimer(); updateCurrentPanel(); showToast(t('toastRented'));
});
$('cancelConfirmBtn').addEventListener('click', ()=>{
  $('confirmSheet').hidden=true; $('qrView').style.display='flex'; S.confirmOpen=false;
});
$('howReturnBtn').addEventListener('click', openReturn);
$('closeReturn').addEventListener('click', closeReturn);
$('findReturnBtn').addEventListener('click', ()=>{ go('map'); showToast(t('toastReturn')); });

function openReturn()  { S.returnOpen=true;  $('returnSheet').hidden=false; }
function closeReturn() { S.returnOpen=false; $('returnSheet').hidden=true;  }

/* ════════════════════════════════════════════════
   RENTAL TIMER
   ════════════════════════════════════════════════ */
function calcCost(ms) {
  const min=ms/60000, days=Math.floor(min/1440), rem=min-days*1440;
  let rest=0;
  if(rem>0){ rest=TARIFF.firstHour; if(rem>60) rest+=Math.ceil((rem-60)/60)*TARIFF.perHour; rest=Math.min(rest,TARIFF.maxDay); }
  return days*TARIFF.maxDay+rest;
}
function fmt(ms) {
  const s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  const p=n=>String(n).padStart(2,'0');
  return h>0?`${p(h)}:${p(m)}:${p(sec)}`:`${p(m)}:${p(sec)}`;
}
function startTimer() {
  if(S.timerInterval) clearInterval(S.timerInterval);
  S.timerInterval=setInterval(()=>{
    if(!S.rentalActive) return;
    const e=Date.now()-S.rentalStart, time=fmt(e), cost=calcCost(e), cs=fmtTzs(cost);
    const rt=$('rentalTimer'); if(rt) rt.textContent=time;
    const rc=$('rentalCost');  if(rc) rc.textContent=cs;
    const bar=$('costBarFill'); if(bar) bar.style.width=Math.min(cost/TARIFF.maxDay*100,100)+'%';
    const ht=$('histTimer'); if(ht) ht.textContent=time;
    const hc=$('histCost');  if(hc) hc.textContent=cs;
  },1000);
}

/* ════════════════════════════════════════════════
   HISTORY
   ════════════════════════════════════════════════ */
function updateCurrentPanel() {
  const card = document.querySelector('#panel-current .current-rental-card');
  let empty = $('currentEmpty');
  if (!empty) {
    empty = document.createElement('div');
    empty.id = 'currentEmpty';
    empty.className = 'current-empty';
    empty.innerHTML = '<div class="ce-title"></div><div class="ce-sub"></div><button class="btn btn-accent ce-btn" type="button"></button>';
    empty.querySelector('.ce-btn').addEventListener('click', () => { go('map'); });
    document.getElementById('panel-current').appendChild(empty);
  }
  empty.querySelector('.ce-title').textContent = t('noActiveRental');
  empty.querySelector('.ce-sub').textContent = t('noActiveSub');
  empty.querySelector('.ce-btn').textContent = t('findStation');
  if (card) card.style.display = S.rentalActive ? '' : 'none';
  empty.style.display = S.rentalActive ? 'none' : 'block';
}

function switchHistTab(tab) {
  S.histTab=tab; const isCurrent=tab==='current';
  $('htabCurrent').classList.toggle('htab-active', isCurrent);
  $('htabHistory').classList.toggle('htab-active', !isCurrent);
  $('htabCurrent').setAttribute('aria-selected', isCurrent?'true':'false');
  $('htabHistory').setAttribute('aria-selected', isCurrent?'false':'true');
  $('panel-current').style.display=isCurrent?'block':'none';
  if (isCurrent) updateCurrentPanel();
  $('panel-history').hidden=isCurrent;
}
$('htabCurrent').addEventListener('click', ()=>switchHistTab('current'));
$('htabHistory').addEventListener('click', ()=>switchHistTab('history'));
[$('htabCurrent'),$('htabHistory')].forEach(el=>{
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
});
$('crcGoBtn').addEventListener('click', ()=>{
  go('rent'); $('qrView').style.display='none'; $('confirmSheet').hidden=true; $('rentalView').hidden=false;
});
$$('.hist-card').forEach(card=>{ card.addEventListener('click',()=>showToast(t('detailsSoon'))); });

/* ════════════════════════════════════════════════
   PROFILE — settings rows (ONLY non-lang rows)
   ════════════════════════════════════════════════ */
$$('.settings-row').forEach(row=>{
  // skip: static rows, lang row (handled separately)
  if(row.classList.contains('settings-row-static')) return;
  if(row.id==='langRow') return;
  row.addEventListener('click',()=>{
    const name=row.getAttribute('aria-label')||'';
    showToast(name||'Soon');
  });
  row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();row.click();}});
});

document.querySelector('.bc-topup')?.addEventListener('click',  ()=>showToast(t('toastTopup')));
document.querySelector('.uc-edit')?.addEventListener('click',   ()=>showToast(t('toastEdit')));
document.querySelector('.logout-btn')?.addEventListener('click',()=>showToast(t('toastLogout')));

/* ── Language row in profile ── */
const langRowEl    = $('langRow');
const langPickerEl = $('langPicker');
const langArrowEl  = $('langArrow');

if(langRowEl && langPickerEl) {
  langRowEl.addEventListener('click', ()=>{
    S.langPickerOpen = !S.langPickerOpen;
    langPickerEl.hidden = !S.langPickerOpen;
    langRowEl.setAttribute('aria-expanded', S.langPickerOpen?'true':'false');
    if(langArrowEl) langArrowEl.style.transform = S.langPickerOpen ? 'rotate(90deg)' : '';
  });
}

/* Profile lang picker options */
$$('[data-lang-opt]').forEach(el=>{
  el.addEventListener('click', ()=>{
    switchLang(el.dataset.langOpt);
    // close picker after selection
    S.langPickerOpen=false;
    if(langPickerEl) langPickerEl.hidden=true;
    if(langRowEl) langRowEl.setAttribute('aria-expanded','false');
    if(langArrowEl) langArrowEl.style.transform='';
  });
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
});

/* ── Map lang switcher click (defined above after map section) ── */

/* ════════════════════════════════════════════════
   KEYBOARD GLOBAL
   ════════════════════════════════════════════════ */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(S.returnOpen){ closeReturn(); return; }
    if(S.confirmOpen){ $('confirmSheet').hidden=true; $('qrView').style.display='flex'; S.confirmOpen=false; }
    if(S.langPickerOpen){ S.langPickerOpen=false; if(langPickerEl) langPickerEl.hidden=true; if(langArrowEl) langArrowEl.style.transform=''; }
  }
});

/* ════════════════════════════════════════════════
   RIPPLE
   ════════════════════════════════════════════════ */
function addRipple(btn, color='rgba(255,255,255,.28)') {
  const r=btn.getBoundingClientRect(), size=Math.max(r.width,r.height);
  const ripple=document.createElement('span'); ripple.className='ripple';
  ripple.style.cssText=`width:${size}px;height:${size}px;left:${(r.width-size)/2}px;top:${(r.height-size)/2}px;background:${color}`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
}
$$('.btn').forEach(btn=>{ btn.addEventListener('click',()=>addRipple(btn)); });
$$('.slot-panel-btn').forEach(btn=>{ btn.addEventListener('click',()=>addRipple(btn)); });

/* ════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const el=$('toast'); if(!el) return;
  el.textContent=msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2200);
}

/* ════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════ */
function init() {
  buildSlotGrid();
  applyI18n();
  $('screen-map').classList.add('active');
  updateTabs('map');
  updateCanvasMeta('map');
  startTimer();
  switchHistTab('current');
  $('rentalView').hidden=false;
  $('qrView').style.display='none';
  if(langPickerEl) langPickerEl.hidden=true;
}

init();
