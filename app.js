const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0B0C10'); tg.setBackgroundColor('#0B0C10'); }

const u = tg?.initDataUnsafe?.user;
const uName = u?.first_name || 'Игрок';
const uAva = u?.photo_url || 'https://dicebear.com';
document.getElementById('uname').textContent = uName;
document.getElementById('ava').src = uAva;

let st = {
  m: 'k', t: 'mental', rub: 500000, spk: 250, cur: 'RUB', adsLeft: 7,
  carColor: '#11131A', carFinish: 'Матовый', rimColor: '#E5E7EB', ride: 'Стандарт',
  tableTheme: 'Белый лавовый', extraSlots: false, cardsPublic: true, diceHist: []
};

const tabs = {
  k: [
    { id: 'mental', i: '🧠', l: 'МЕНТАЛ' }, { id: 'horizon', i: '🔮', l: 'ГОРИЗОНТ' },
    { id: 'boost', i: '🎮', l: 'БУСТ' }, { id: 'status', i: '💎', l: 'СТАТУС' },
    { id: 'neuro', i: '⚡', l: 'НЕЙРО' }, { id: 'market', i: '🛒', l: 'МАРКЕТ' }
  ],
  l: [
    { id: 'pair', i: '❤️', l: 'ПАРА' }, { id: 'home', i: '🏠', l: 'ДОМ' },
    { id: 'games', i: '🎲', l: 'ИГРЫ' }, { id: 'chat', i: '💬', l: 'ЧАТ' },
    { id: 'lmarket', i: '🛍️', l: 'МАРКЕТ' }
  ]
};

const views = {
  mental: ['МЕНТАЛ', 'ИИ-разборы личности и карточки в Профиль', [
    ['🎲', 'ГРАНЬ ВЫБОРА', 'Кости 50/50 ДА или НЕТ + история', '⚡ Играть', 'openDice()'],
    ['🧬', 'ЛИЧНОСТЬ', 'Вопросы + скан отпечатка 3 сек', 'Скоро', "toast('Подключаем ИИ-ключ...')"],
    ['🔋', 'ДОФАМИН.EXE', 'Заряд дофамина и план восстановления', 'Скоро', "toast('Подключаем ИИ-ключ...')"],
    ['🚀', 'ТОЧКА РОСТА', 'Подбор цифровой ниши от ИИ', 'Скоро', "toast('Подключаем ИИ-ключ...')"]
  ]],
  horizon: ['ГОРИЗОНТ', 'ИИ-предсказания будущего в коллекцию', [
    ['🏎️', 'АВТОПАРК', 'Твоя будущая машина по амбициям', '', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['🌆', 'ЛОКАЦИЯ', 'Город, жильё и идеальный день', '', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['💰', 'ПОТОЛОК', 'Потенциальный доход и главный актив', '', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['🐺', 'ТОТЕМ', 'Тотемное животное и энергетика', '', "toast('Скоро в модуле ГОРИЗОНТ')"]
  ]],
  boost: ['БУСТ', 'Игровой клуб на виртуальные ₽ и $', [
    ['✂️', 'КНБ 1x1', 'Дуэль со стриком x2 / x4 / x8', '', "toast('Следующий модуль: БУСТ')"],
    ['💣', 'САПЁР', 'Сетка 4x4, 1 / 3 / 5 бомб', '', "toast('Следующий модуль: БУСТ')"],
    ['🔫', 'РУЛЕТКА', 'Барабан на 6 ячеек, 1–3 заряда', '', "toast('Следующий модуль: БУСТ')"],
    ['🚀', 'РАКЕТА', 'Успей забрать коэффициент', '', "toast('Следующий модуль: БУСТ')"],
    ['🃏', 'БЛЭКДЖЕК', 'Дуэль на 21 против ИИ-дилера', '', "toast('Следующий модуль: БУСТ')"],
    ['♠️', 'ДУРАК', 'Подкидной и переводной против ИИ', '', "toast('Следующий модуль: БУСТ')"]
  ]],
  status: ['СТАТУС', 'Спины: 8 редкостей до Божественной', [
    ['🚘', 'АВТО И НОМЕРА', '250 тачек и 100 блатных номеров', '', "toast('Следующий модуль: СТАТУС')"],
    ['⌚', 'ЧАСЫ', '250 моделей от классики до Rolex', '', "toast('Следующий модуль: СТАТУС')"],
    ['💳', 'БАНК. КАРТЫ', '100 элитных карт на столик', '', "toast('Следующий модуль: СТАТУС')"],
    ['📱', 'СИМ-КАРТЫ', '100 редких номеров 777-77-77', '', "toast('Следующий модуль: СТАТУС')"]
  ]],
  neuro: ['НЕЙРО', 'Безлимитный ИИ-чат + 3 фото в день', [
    ['🤖', 'ИИ-ЧАТ + ФОТО', 'Текст безлимит • 3 фото/день бесплатно', '', "toast('Подключаем ИИ-API...')"],
    ['🎙️', 'ГОЛОС В ТЕКСТ', 'Расшифровка ГС + главная суть', '', "toast('Подключаем ИИ-API...')"],
    ['✍️', 'МАСТЕР ТЕКСТОВ', 'Ответы и посты в 3 стилях', '', "toast('Подключаем ИИ-API...')"],
    ['📑', 'КОНСПЕКТ', 'Выжимка текста в 5 главных мыслей', '', "toast('Подключаем ИИ-API...')"]
  ]],
  market: ['МАРКЕТ', 'Тюнинг, VIP, задания и Топ игроков', [
    ['🎨', 'ТЮНИНГ И СТОЛ', 'Покраска авто/дисков, клиренс и столы', '⚡ Открыть', 'openProfile()'],
    ['👑', 'VIP-МАГАЗИН', 'Удача 10X, без рекламы и слоты 3/3/2', '', "toast('VIP: 149 Stars / 30 дней')"],
    ['🎁', 'ЗАДАНИЯ', 'Бонусы до 1 000 000 ₽ и рефералка', '', "toast('Календарь 7 дней')"],
    ['🏆', 'ТОП ИГРОКОВ', 'Рейтинг богачей и просмотр гаражей', '', "toast('Таблица лидеров')"]
  ]],
  pair: ['KINETIC LOVE ❤️', 'Кристалл связи, Банка желаний и Капсула', [
    ['💎', 'КРИСТАЛЛ СВЯЗИ', 'Стрик пары: открывает ауры и мебель', '⚡ Активен', "toast('Кристалл заряжен!')"],
    ['🫙', 'БАНКА ЖЕЛАНИЙ', 'Хотелки и подарки (Публично / Скрыто)', '', "toast('Модуль LOVE ❤️')"],
    ['⏳', 'КАПСУЛА ВРЕМЕНИ', 'Фото и текст в будущее — откроется обоим', '', "toast('Модуль LOVE ❤️')"],
    ['🌸', 'КАЛЕНДАРЬ', 'Цикл, настроение и симптомы', '', "toast('Модуль LOVE ❤️')"]
  ]],
  home: ['ОБЩИЙ ДОМ', 'Планировка, Общая копилка и 80 питомцев', [
    ['🏦', 'КОПИЛКА ЦЕЛИ', 'Сейф SPARK на особняк или редкого пета', '', "toast('Общая копилка SPARK')"],
    ['🐾', 'ПИТОМЦЫ (80)', 'Уход, прогулка 30 мин и 9 уровней роста', '', "toast('До 6 слотов питомцев')"]
  ]],
  games: ['ИГРЫ ДЛЯ ДВОИХ', '4 режима с live-синхронизацией', [
    ['🔥', 'ПРАВДА / ДЕЙСТВИЕ', '3 режима + штраф SPARK за отказ', '', "toast('Правда или Действие')"],
    ['🖼️', 'ПО БЛЮРУ', 'Счёт пары вверху + мини-чат внизу', '', "toast('Угадай по блюру')"],
    ['💞', 'КВИЗ + ИИ', '50+ тем и ИИ-Арбитр споров', '', "toast('Квиз пары')"],
    ['🎡', 'СВИДАНИЯ', 'Дома, город, на расстоянии + свои', '', "toast('Колесо свиданий')"]
  ]],
  chat: ['ПАРНЫЙ ЧАТ', 'Мини-чат с вашими темами и пузырями', [
    ['💌', 'ЧАТ ДВОИХ', 'Мгновенная синхронизация и украшения', '', "toast('Парный чат')"]
  ]],
  lmarket: ['МАРКЕТ ПАРЫ', 'Боксы, дома, мебель и одежда для петов', [
    ['📦', 'ПАРНЫЕ БОКСЫ', '100+ рамок, домов и одежды для петов', '', "toast('Парные боксы')"],
    ['🛋️', 'ДОМ И ЗООМАГ', 'Мебель, перекраска, корм и туалеты', '', "toast('Мебель и зоомагазин')"]
  ]]
};

function vib(t = 'light') { tg?.HapticFeedback?.impactOccurred(t); }
function toast(m) {
  const el = document.getElementById('toast');
  el.textContent = m; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
function openModal(html) { document.getElementById('modal-box').innerHTML = html; document.getElementById('modal-bg').classList.add('open'); }
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
document.getElementById('modal-bg').onclick = (e) => { if (e.target.id === 'modal-bg') closeModal(); };

function updBal() {
  document.getElementById('bval').textContent = st.m === 'l'
    ? st.spk + ' SPARK ⚡'
    : (st.cur === 'RUB' ? st.rub.toLocaleString('ru-RU') + ' ₽' : '$' + (st.rub / 100).toLocaleString('en-US'));
}

function openDice() {
  vib('medium');
  const histHtml = st.diceHist.length
    ? st.diceHist.slice(0, 5).map(x => `<div class="cdesc" style="margin-top:4px">• ${x}</div>`).join('')
    : '<div class="cdesc">Бросков пока нет</div>';
  openModal(`
    <div class="mhead"><span class="mtitle">🎲 ГРАНЬ ВЫБОРА</span><button class="mclose" onclick="closeModal()">✕</button></div>
    <div class="cdesc" style="margin-bottom:12px">Загадай вопрос про себя и брось кости (строго 50/50)</div>
    <div id="dice-res" style="text-align:center;font-family:'Unbounded';font-size:28px;font-weight:800;padding:22px;background:#0B0C10;border:1px solid #262938;border-radius:16px;margin-bottom:12px">?</div>
    <button class="mbtn" style="width:100%;padding:12px;font-size:12px" onclick="rollDice()">БРОСИТЬ КОСТИ 50/50</button>
    <div style="margin-top:14px"><b>История бросков:</b>${histHtml}</div>
  `);
}

function rollDice() {
  vib('heavy');
  const el = document.getElementById('dice-res');
  el.textContent = '🎲 ...';
  setTimeout(() => {
    const win = Math.random() < 0.5;
    const ans = win ? 'ДА ✅' : 'НЕТ ❌';
    el.style.color = win ? '#10B981' : '#EF4444';
    el.textContent = ans;
    st.diceHist.unshift(`${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} — ${ans}`);
    vib('medium');
  }, 450);
}

function openTableShowcase() {
  vib('heavy');
  const lim = st.extraSlots ? '3 карты • 3 симки • 2 часов' : '2 карты • 2 симки • 1 часы';
  openModal(`
    <div class="mhead"><span class="mtitle">💎 ВИТРИНА СТОЛИКА</span><button class="mclose" onclick="closeModal()">✕</button></div>
    <div class="cdesc" style="margin-bottom:10px">Стол: <b>${st.tableTheme}</b> • Слоты: <b>${lim}</b></div>
    <div class="mrow"><div><b>💳 Black Titanium Card</b><div class="cdesc">7777 0000 7777 7777</div></div><span class="epill">Эпическая</span></div>
    <div class="mrow"><div><b>📱 Блатная SIM-карта</b><div class="cdesc">+7 (999) 777-77-77</div></div><span class="epill">Легендарная</span></div>
    <div class="mrow"><div><b>⌚ Rolex Daytona</b><div class="cdesc">Хронограф • 7 000 000 ₽</div></div><span class="epill">Золотая</span></div>
    ${!st.extraSlots ? `<button class="mbtn gold" style="width:100%;padding:11px;margin-top:6px" onclick="st.extraSlots=true;openTableShowcase();toast('Открыты доп. слоты 3/3/2!')">+1 СЛОТ КО ВСЕМУ (ЗА 2 РЕКЛАМЫ)</button>` : ''}
  `);
}

function tuneCar(type) {
  if (st.rub < 50000) return toast('Недостаточно ₽ (нужно 50 000 ₽)');
  st.rub -= 50000; updBal(); vib('medium');
  if (type === 'color') {
    const cols = [['#11131A','Чёрный матовый'],['#7C3AED','Фиолетовый градиент'],['#E5E7EB','Зеркальный хром'],['#DC2626','Красный металлик']];
    const next = cols[(cols.findIndex(c => c[0] === st.carColor) + 1) % cols.length];
    st.carColor = next[0]; st.carFinish = next[1];
  } else if (type === 'ride') {
    st.ride = st.ride === 'Стандарт' ? 'Заниженная 🔥' : 'Стандарт';
  } else if (type === 'table') {
    const tbls = ['Белый лавовый', 'Чёрный карбон', 'Серый гранит'];
    st.tableTheme = tbls[(tbls.indexOf(st.tableTheme) + 1) % tbls.length];
  }
  openProfile();
  toast('Тюнинг применён (-50 000 ₽)');
}

function openProfile() {
  vib('medium');
  const app = document.getElementById('app');
  const topOffset = st.ride === 'Стандарт' ? '0px' : '8px';
  app.innerHTML = `
