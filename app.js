const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0B0C10'); tg.setBackgroundColor('#0B0C10'); }

const u = tg?.initDataUnsafe?.user;
if (u) {
  document.getElementById('uname').textContent = u.first_name || 'Игрок';
  if (u.photo_url) document.getElementById('ava').src = u.photo_url;
}

let st = { m: 'k', t: 'mental', rub: 500000, spk: 250, cur: 'RUB', adsLeft: 7 };

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
    ['🧬', 'ЛИЧНОСТЬ', 'Вопросы + отпечаток 3 сек + ИИ-карта', '⚡ Готово'],
    ['🔋', 'ДОФАМИН.EXE', 'Процент заряда и план восстановления', '⚡ ИИ-анализ'],
    ['🎲', 'ГРАНЬ ВЫБОРА', '3D-кости 50/50 ДА или НЕТ + история', ''],
    ['🚀', 'ТОЧКА РОСТА', 'Подбор цифровой ниши от ИИ', '']
  ]],
  horizon: ['ГОРИЗОНТ', 'ИИ-предсказания будущего в коллекцию', [
    ['🏎️', 'АВТОПАРК', 'Твоя будущая машина по амбициям', ''],
    ['🌆', 'ЛОКАЦИЯ', 'Город, жильё и идеальный день', ''],
    ['💰', 'ПОТОЛОК', 'Потенциальный доход и главный актив', ''],
    ['🐺', 'ТОТЕМ', 'Тотемное животное и энергетика', '']
  ]],
  boost: ['БУСТ', 'Игровой клуб на виртуальные ₽ и $', [
    ['✂️', 'КНБ 1x1', 'Дуэль со стриком x2 / x4 / x8', ''],
    ['💣', 'САПЁР', 'Сетка 4x4, 1 / 3 / 5 бомб', ''],
    ['🔫', 'РУЛЕТКА', 'Барабан на 6 ячеек, 1–3 заряда', ''],
    ['🚀', 'РАКЕТА', 'Успей забрать коэффициент', ''],
    ['🃏', 'БЛЭКДЖЕК', 'Дуэль на 21 против ИИ-дилера', ''],
    ['♠️', 'ДУРАК', 'Подкидной и переводной против ИИ', '']
  ]],
  status: ['СТАТУС', 'Спины: 8 редкостей до Божественной', [
    ['🚘', 'АВТО И НОМЕРА', '250 тачек и 100 блатных номеров', ''],
    ['⌚', 'ЧАСЫ', '250 моделей от классики до Rolex', ''],
    ['💳', 'БАНК. КАРТЫ', '100 элитных карт на столик', ''],
    ['📱', 'СИМ-КАРТЫ', '100 редких номеров 777-77-77', '']
  ]],
  neuro: ['НЕЙРО', 'Безлимитный ИИ-чат + 3 фото в день', [
    ['🤖', 'ИИ-ЧАТ + ФОТО', 'Текст безлимит • 3 фото/день бесплатно', ''],
    ['🎙️', 'ГОЛОС В ТЕКСТ', 'Расшифровка ГС + главная суть', ''],
    ['✍️', 'МАСТЕР ТЕКСТОВ', 'Ответы и посты в 3 стилях', ''],
    ['📑', 'КОНСПЕКТ', 'Выжимка текста в 5 главных мыслей', '']
  ]],
  market: ['МАРКЕТ', 'Тюнинг, VIP, задания и Топ игроков', [
    ['🎨', 'ТЮНИНГ И СТОЛ', 'Покраска авто/дисков, клиренс и столы', ''],
    ['👑', 'VIP-МАГАЗИН', 'Удача 10X, без рекламы и слоты 3/3/2', ''],
    ['🎁', 'ЗАДАНИЯ', 'Бонусы до 1 000 000 ₽ и рефералка', ''],
    ['🏆', 'ТОП ИГРОКОВ', 'Рейтинг богачей и просмотр гаражей', '']
  ]],
  pair: ['KINETIC LOVE ❤️', 'Кристалл связи, Банка желаний и Капсула', [
    ['💎', 'КРИСТАЛЛ СВЯЗИ', 'Стрик пары: открывает ауры и мебель', '⚡ Активен'],
    ['🫙', 'БАНКА ЖЕЛАНИЙ', 'Хотелки и подарки (Публично / Скрыто)', ''],
    ['⏳', 'КАПСУЛА ВРЕМЕНИ', 'Фото и текст в будущее — откроется обоим', ''],
    ['🌸', 'КАЛЕНДАРЬ', 'Цикл, настроение и симптомы', '']
  ]],
  home: ['ОБЩИЙ ДОМ', 'Планировка, Общая копилка и 80 питомцев', [
    ['🏦', 'КОПИЛКА ЦЕЛИ', 'Сейф SPARK на особняк или редкого пета', ''],
    ['🐾', 'ПИТОМЦЫ (80)', 'Уход, прогулка 30 мин и 9 уровней роста', '']
  ]],
  games: ['ИГРЫ ДЛЯ ДВОИХ', '4 режима с live-синхронизацией', [
    ['🔥', 'ПРАВДА / ДЕЙСТВИЕ', '3 режима + штраф SPARK за отказ', ''],
    ['🖼️', 'ПО БЛЮРУ', 'Счёт пары вверху + мини-чат внизу', ''],
    ['💞', 'КВИЗ + ИИ', '50+ тем и ИИ-Арбитр споров', ''],
    ['🎡', 'СВИДАНИЯ', 'Дома, город, на расстоянии + свои', '']
  ]],
  chat: ['ПАРНЫЙ ЧАТ', 'Мини-чат с вашими темами и пузырями', [
    ['💌', 'ЧАТ ДВОИХ', 'Мгновенная синхронизация и украшения', '']
  ]],
  lmarket: ['МАРКЕТ ПАРЫ', 'Боксы, дома, мебель и одежда для петов', [
    ['📦', 'ПАРНЫЕ БОКСЫ', '100+ рамок, домов и одежды для петов', ''],
    ['🛋️', 'ДОМ И ЗООМАГ', 'Мебель, перекраска, корм и туалеты', '']
  ]]
};

function vib(t = 'light') { tg?.HapticFeedback?.impactOccurred(t); }
function toast(m) {
  const el = document.getElementById('toast');
  el.textContent = m; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function openModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-bg').classList.add('open');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
document.getElementById('modal-bg').onclick = (e) => { if (e.target.id === 'modal-bg') closeModal(); };

function updBal() {
  document.getElementById('bval').textContent = st.m === 'l'
    ? st.spk + ' SPARK ⚡'
    : (st.cur === 'RUB' ? st.rub.toLocaleString('ru-RU') + ' ₽' : '$' + (st.rub / 100).toLocaleString('en-US'));
}

function claimAd() {
  if (st.adsLeft <= 0) return toast('Лимит на сегодня исчерпан');
  vib('heavy'); st.adsLeft--; st.rub += 150000; updBal(); closeModal();
  toast('+150 000 ₽ начислено на баланс!');
}

document.getElementById('bal-btn').onclick = () => {
  vib('medium');
  if (st.m === 'k') {
    openModal(`
      <div class="mhead"><span class="mtitle">КОШЕЛЁК KINETIC</span><button class="mclose" onclick="closeModal()">✕</button></div>
      <div class="mrow" onclick="st.cur=st.cur==='RUB'?'USD':'RUB';updBal();closeModal();toast('Валюта переключена')">
        <div><b>Отображение валюты</b><div class="cdesc">Сейчас: ${st.cur === 'RUB' ? 'Рубли (₽)' : 'Доллары ($)'}</div></div>
        <button class="mbtn">₽ / $</button>
      </div>
      <div class="mrow" onclick="claimAd()">
        <div><b>Смотреть 2 рекламы (${st.adsLeft}/7)</b><div class="cdesc">Бесплатный приток валюты каждый день</div></div>
        <button class="mbtn gold">+150 000 ₽</button>
      </div>
      <div class="mrow" onclick="closeModal();toast('VIP-статус: 149 Stars')">
        <div><b>VIP-статус на 30 дней</b><div class="cdesc">Удача 10X, без рекламы, слоты 3/3/2</div></div>
        <button class="mbtn">149 ⭐</button>
      </div>
    `);
  } else {
    openModal(`
      <div class="mhead"><span class="mtitle">КОШЕЛЁК SPARK ⚡</span><button class="mclose" onclick="closeModal()">✕</button></div>
      <div class="mrow" onclick="if(st.spk>=50){st.spk-=50;updBal();closeModal();toast('Перевели 50 SPARK второй половинке ❤️')}">
        <div><b>Перевести партнёру</b><div class="cdesc">Мгновенно и без комиссии</div></div>
        <button class="mbtn gold">-50 ⚡</button>
      </div>
      <div class="mrow" onclick="st.spk+=100;updBal();closeModal();toast('+100 SPARK за активность!')">
        <div><b>Ежедневный бонус пары</b><div class="cdesc">Забирай каждый день</div></div>
        <button class="mbtn">+100 ⚡</button>
      </div>
    `);
  }
};

document.getElementById('profile-btn').onclick = () => { vib('medium'); toast('Открываем 3D-Профиль, Гараж и Столик...'); };

document.getElementById('msw').onclick = () => {
  vib('heavy');
  const b = document.getElementById('msw'), lg = document.getElementById('logo');
  if (st.m === 'k') {
    st.m = 'l'; st.t = 'pair'; b.classList.add('act'); b.textContent = 'KINETIC'; lg.textContent = 'LOVE ❤️';
  } else {
    st.m = 'k'; st.t = 'mental'; b.classList.remove('act'); b.textContent = 'LOVE ❤️'; lg.textContent = 'KINETIC';
  }
  updBal(); draw();
};

function sel(id) { vib('light'); st.t = id; draw(); }
function draw() {
  const nav = document.getElementById('nav');
  nav.className = st.m === 'l' ? 'nav lmode' : 'nav';
  nav.innerHTML = tabs[st.m].map(x => `<div class="nitem ${st.t === x.id ? 'act' : ''}" onclick="sel('${x.id}')"><div class="nico">${x.i}</div><div class="nlbl">${x.l}</div></div>`).join('');
  const v = views[st.t];
  document.getElementById('app').innerHTML = `<div class="title">${v}</div><div class="sub">${v}</div><div class="grid">${v.map(c => `<div class="card" onclick="toast('${c}')"><span class="ico">${c}</span><div class="ctitle">${c}</div><div class="cdesc">${c}</div>${c ? `<div class="epill">${c}</div>` : ''}</div>`).join('')}</div>`;
}

draw(); updBal();
