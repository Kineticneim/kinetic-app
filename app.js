const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0B0C10'); tg.setBackgroundColor('#0B0C10'); }

const u = tg?.initDataUnsafe?.user;
const uName = u?.first_name || 'Игрок';
const uAva = u?.photo_url || 'https://dicebear.com';
document.getElementById('uname').textContent = uName;
document.getElementById('ava').src = uAva;

let st = {
  m: 'k', t: 'mental', rub: 500000, spk: 250, cur: 'RUB', adsLeft: 7,
  car: 0, low: false, tbl: 0, extraSlots: false, cardsPub: true, diceHist: []
};

const cars = [
  { hex: '#11131A', name: 'Чёрный матовый' },
  { hex: 'linear-gradient(135deg,#7C3AED,#3B82F6)', name: 'Неон градиент' },
  { hex: 'linear-gradient(135deg,#E5E7EB,#6B7280)', name: 'Зеркальный хром' },
  { hex: '#B91C1C', name: 'Красный металлик' }
];
const tbls = ['Белый лавовый', 'Чёрный карбон', 'Серый гранит'];

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
    ['🎲', 'ГРАНЬ ВЫБОРА', 'Кости 50/50 ДА или НЕТ + история', '⚡ LIVE', 'openDice()'],
    ['🧬', 'ЛИЧНОСТЬ', '4–5 вопросов + скан отпечатка 3 сек', 'ИИ', "toast('Следующий модуль: ИИ-тесты')"],
    ['🔋', 'ДОФАМИН.EXE', 'Процент заряда и план восстановления', 'ИИ', "toast('Следующий модуль: ИИ-тесты')"],
    ['🚀', 'ТОЧКА РОСТА', 'Подбор цифровой ниши от ИИ', 'ИИ', "toast('Следующий модуль: ИИ-тесты')"]
  ]],
  horizon: ['ГОРИЗОНТ', 'ИИ-предсказания будущего в коллекцию', [
    ['🏎️', 'АВТОПАРК', 'Твоя будущая машина по амбициям', 'КАРТА', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['🌆', 'ЛОКАЦИЯ', 'Город, жильё и идеальный день', 'КАРТА', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['💰', 'ПОТОЛОК', 'Потенциальный доход и главный актив', 'КАРТА', "toast('Скоро в модуле ГОРИЗОНТ')"],
    ['🐺', 'ТОТЕМ', 'Тотемное животное и энергетика', 'КАРТА', "toast('Скоро в модуле ГОРИЗОНТ')"]
  ]],
  boost: ['БУСТ', 'Игровой клуб на виртуальные ₽ и $', [
    ['✂️', 'КНБ 1x1', 'Дуэль со стриком x2 / x4 / x8', 'x8', "toast('Следующий модуль: БУСТ')"],
    ['💣', 'САПЁР', 'Сетка 4x4, 1 / 3 / 5 бомб', '4x4', "toast('Следующий модуль: БУСТ')"],
    ['🔫', 'РУЛЕТКА', 'Барабан на 6 ячеек, 1–3 заряда', 'RISK', "toast('Следующий модуль: БУСТ')"],
    ['🚀', 'РАКЕТА', 'Успей забрать коэффициент до взрыва', 'CRASH', "toast('Следующий модуль: БУСТ')"],
    ['🃏', 'БЛЭКДЖЕК', 'Дуэль на 21 против ИИ-дилера', '21', "toast('Следующий модуль: БУСТ')"],
    ['♠️', 'ДУРАК', 'Подкидной и переводной против ИИ', 'КАРТЫ', "toast('Следующий модуль: БУСТ')"]
  ]],
  status: ['СТАТУС', 'Спины: 8 редкостей от Обычной до Божественной', [
    ['🚘', 'АВТО И НОМЕРА', '250 машин и 100 блатных номеров', 'от 500k', "toast('Следующий модуль: СТАТУС')"],
    ['⌚', 'ЭЛИТНЫЕ ЧАСЫ', '250 моделей от классики до Rolex', 'от 800k', "toast('Следующий модуль: СТАТУС')"],
    ['💳', 'БАНК. КАРТЫ', '100 элитных карт на столик', 'от 300k', "toast('Следующий модуль: СТАТУС')"],
    ['📱', 'СИМ-КАРТЫ', '100 редких номеров 777-77-77', 'от 200k', "toast('Следующий модуль: СТАТУС')"],
    ['🌌', 'АУРА И ГАРАЖИ', '50 стилей города, домов и свечений', 'от 1M', "toast('Следующий модуль: СТАТУС')"]
  ]],
  neuro: ['НЕЙРО', 'Безлимитный ИИ-чат + 3 фото в день', [
    ['🤖', 'ИИ-ЧАТ + ФОТО', 'Текст безлимит • 3 фото/день бесплатно', 'FREE', "toast('Подключаем ИИ-API...')"],
    ['🎙️', 'ГОЛОС В ТЕКСТ', 'Расшифровка длинных ГС + суть', 'ИИ', "toast('Подключаем ИИ-API...')"],
    ['✍️', 'МАСТЕР ТЕКСТОВ', 'Ответы и посты в 3 стилях', 'ИИ', "toast('Подключаем ИИ-API...')"],
    ['📑', 'НЕЙРО-КОНСПЕКТ', 'Выжимка текста в 5 главных мыслей', 'ИИ', "toast('Подключаем ИИ-API...')"]
  ]],
  market: ['МАРКЕТ', 'Тюнинг, VIP, ежедневный вход и Топ игроков', [
    ['🎨', 'ТЮНИНГ И СТОЛ', 'Покраска авто/дисков, клиренс и столы', '⚡ LIVE', 'openProfile()'],
    ['👑', 'VIP-МАГАЗИН', 'Удача 10X, без рекламы и слоты 3/3/2', '149 ⭐', "toast('VIP: 149 Stars / 30 дней')"],
    ['🎁', 'ЗАДАНИЯ И ВХОД', 'Календарь 7 дней до 1 000 000 ₽', 'БОНУС', "toast('Календарь и задания')"],
    ['🏆', 'ТАБЛИЦА ЛИДЕРОВ', 'Рейтинг богачей и чужие гаражи', 'ТОП', "toast('Таблица лидеров')"]
  ]],
  pair: ['KINETIC LOVE ❤️', 'Кристалл связи, Банка желаний и Капсула', [
    ['💎', 'КРИСТАЛЛ СВЯЗИ', 'Стрик пары: открывает ауры и мебель', '⚡ АКТИВЕН', "toast('Кристалл заряжен!')"],
    ['🫙', 'БАНКА ЖЕЛАНИЙ', 'Список хотелок (Публично / Скрыто)', 'ПАРА', "toast('Модуль LOVE ❤️')"],
    ['⏳', 'КАПСУЛА ВРЕМЕНИ', 'Фото и текст в будущее — откроется обоим', 'ТАЙМЕР', "toast('Модуль LOVE ❤️')"],
    ['🌸', 'КАЛЕНДАРЬ ЦИКЛА', 'Отсчёт дней, настроение и симптомы', 'LIVE', "toast('Модуль LOVE ❤️')"]
  ]],
  home: ['ОБЩИЙ ДОМ', 'Планировка, Общая копилка и 80 питомцев', [
    ['🏦', 'ОБЩАЯ КОПИЛКА', 'Сейф SPARK на особняк или редкого пета', 'ЦЕЛЬ', "toast('Общая копилка SPARK')"],
    ['🐾', 'ПИТОМЦЫ (80 ВИДОВ)', 'Уход, прогулка 30 мин и 9 уровней роста', '6 МЕСТ', "toast('До 6 слотов питомцев')"]
  ]],
  games: ['ИГРЫ ДЛЯ ДВОИХ', '4 режима с live-синхронизацией', [
    ['🔥', 'ПРАВДА / ДЕЙСТВИЕ', 'Лайт, Романтика и Горячо 🔥', '3 РЕЖИМА', "toast('Правда или Действие')"],
    ['🖼️', 'УГАДАЙ ПО БЛЮРУ', 'Фото-квиз со счётом и мини-чатом', 'ФОТО', "toast('Угадай по блюру')"],
    ['💞', 'КВИЗ + ИИ-АРБИТР', '50+ тем и разбор спорных ситуаций', 'ИИ', "toast('Квиз пары')"],
    ['🎡', 'КОЛЕСО СВИДАНИЙ', 'Дома, город, на расстоянии + свои', 'РУЛЕТКА', "toast('Колесо свиданий')"]
  ]],
  chat: ['ПАРНЫЙ ЧАТ', 'Мини-чат с вашими темами и пузырями', [
    ['💌', 'ОТКРЫТЬ ЧАТ', 'Мгновенная синхронизация и украшения', 'LIVE', "toast('Парный чат')"]
  ]],
  lmarket: ['МАРКЕТ ПАРЫ', 'Боксы, дома, мебель и одежда для петов', [
    ['📦', 'ПАРНЫЕ БОКСЫ', '100+ рамок, домов и одежды для петов', '3/ДЕНЬ', "toast('Парные боксы')"],
    ['🛋️', 'ДОМ И ЗООМАГАЗИН', 'Мебель, перекраска, корм и туалеты', 'SPARK', "toast('Мебель и зоомагазин')"]
  ]]
};

function vib(t = 'light') { tg?.HapticFeedback?.impactOccurred(t); }
function toast(m) {
  const el = document.getElementById('toast');
  el.textContent = m; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}
function openModal(h) { document.getElementById('modal-box').innerHTML = h; document.getElementById('modal-bg').classList.add('open'); }
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
document.getElementById('modal-bg').onclick = e => { if (e.target.id === 'modal-bg') closeModal(); };

function updBal() {
  document.getElementById('bval').textContent = st.m === 'l'
    ? st.spk + ' SPARK ⚡'
    : (st.cur === 'RUB' ? st.rub.toLocaleString('ru-RU') + ' ₽' : '$' + (st.rub / 100).toLocaleString('en-US'));
}

function openDice() {
  vib('medium');
  const hist = st.diceHist.length
    ? st.diceHist.slice(0, 5).map(x => `<div class="cdesc" style="margin-top:4px">• ${x}</div>`).join('')
    : '<div class="cdesc">Бросков пока нет</div>';
  openModal(`<div class="mhead"><span class="mtitle">🎲 ГРАНЬ ВЫБОРА</span><button class="mclose" onclick="closeModal()">✕</button></div><div id="dres" style="text-align:center;font-family:'Unbounded';font-size:26px;font-weight:800;padding:20px;background:#0B0C10;border:1px solid #262938;border-radius:14px;margin-bottom:12px">?</div><button class="mbtn" style="width:100%;padding:12px" onclick="rollDice()">БРОСИТЬ 50/50</button><div style="margin-top:12px"><b>История:</b>${hist}</div>`);
}

function rollDice() {
  vib('heavy');
  const win = Math.random() < 0.5;
  const ans = win ? 'ДА ✅' : 'НЕТ ❌';
  const el = document.getElementById('dres');
  el.style.color = win ? '#10B981' : '#EF4444';
  el.textContent = ans;
  st.diceHist.unshift(`${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} — ${ans}`);
}

function openTable() {
  vib('heavy');
  const lim = st.extraSlots ? '3 карты • 3 симки • 2 часов' : '2 карты • 2 симки • 1 часы';
  openModal(`<div class="mhead"><span class="mtitle">💎 СТОЛИК (${tbls[st.tbl]})</span><button class="mclose" onclick="closeModal()">✕</button></div><div class="cdesc" style="margin-bottom:10px">Слоты: <b>${lim}</b></div><div class="mrow"><div><b>💳 Black Titanium</b><div class="cdesc">7777 0000 7777 7777</div></div><span class="epill">Эпик</span></div><div class="mrow"><div><b>📱 SIM 777-77-77</b><div class="cdesc">Блатной номер</div></div><span class="epill">Легенда</span></div><div class="mrow"><div><b>⌚ Rolex Daytona</b><div class="cdesc">7 000 000 ₽</div></div><span class="epill">Золото</span></div>${!st.extraSlots ? `<button class="mbtn gold" style="width:100%;padding:11px;margin-top:6px" onclick="st.extraSlots=true;openTable();toast('Слоты расширены до 3/3/2!')">+1 СЛОТ КО ВСЕМУ (2 РЕКЛАМЫ)</button>` : ''}`);
}

function openProfile() {
  vib('medium');
  const c = cars[st.car];
  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div class="title" style="margin:0">ПРОФИЛЬ</div>
      <button class="mclose" onclick="draw()">✕</button>
    </div>
    <div class="row-card" style="margin-bottom:12px;cursor:default">
      <div class="ava" style="width:48px;height:48px"><img src="${uAva}"></div>
      <div class="row-body">
        <div class="ctitle" style="font-size:13px">${uName} <span style="color:#F59E0B">👑</span></div>
        <div class="cdesc">Аура: Мафиозная тень • Подарков: 3</div>
      </div>
    </div>
    <div style="background:linear-gradient(180deg,#131626,#0B0C10);border:1px solid #3B82F6;border-radius:18px;padding:14px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#8E92A4;margin-bottom:10px">
        <span>🏠 Чёрный гараж у бассейна</span>
        <span>${st.low ? 'Заниженная 🔥' : 'Стандарт'}</span>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <div style="flex:1;background:${c.hex};padding:14px 8px;border-radius:14px;text-align:center;border:1px solid rgba(255,255,255,.2);transform:translateY(${st.low ? '6px' : '0'});transition:.2s">
          <div style="font-size:24px">🚙</div>
          <div class="ctitle" style="margin-top:4px">CRUISER 200</div>
          <div style="font-size:10px;opacity:.85">${c.name}</div>
          <div style="display:inline-block;background:#fff;color:#000;font-family:'Unbounded';font-weight:800;font-size:10px;border-radius:4px;margin-top:6px;padding:2px 8px;border:1.5px solid #000">А777АА 777</div>
        </div>
        <div onclick="openTable()" style="width:94px;background:#1B1E2E;border:1px solid #F59E0B;border-radius:14px;padding:14px 6px;text-align:center;cursor:pointer;box-shadow:0 0 14px rgba(245,158,11,.2)">
          <div style="font-size:18px">💳📱⌚</div>
          <div class="ctitle" style="color:#F59E0B;font-size:9.5px;margin-top:4px">СТОЛИК</div>
          <div style="font-size:8.5px;color:#8E92A4;margin-top:2px">${tbls[st.tbl]}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:12px">
        <button class="mbtn" onclick="st.car=(st.car+1)%4;openProfile()">🎨 Цвет</button>
        <button class="mbtn" onclick="st.low=!st.low;openProfile()">⬇️ Посадка</button>
        <button class="mbtn" onclick="st.tbl=(st.tbl+1)%3;openProfile()">🪨 Стол</button>
      </div>
    </div>
    <div class="row-card" style="cursor:default">
      <div class="row-body">
        <div class="ctitle">КОЛЛЕКЦИЯ КАРТОЧЕК</div>
        <div class="cdesc">Карточки из МЕНТАЛ и ГОРИЗОНТ</div>
      </div>
      <button class="mbtn" onclick="st.cardsPub=!st.cardsPub;openProfile()">${st.cardsPub ? '👁 Видно' : '🔒 Скрыто'}</button>
    </div>
  `;
}

document.getElementById('profile-btn').onclick = openProfile;
document.getElementById('bal-btn').onclick = () => openModal(`<div class="mhead"><span class="mtitle">КОШЕЛЁК</span><button class="mclose" onclick="closeModal()">✕</button></div><div class="mrow" onclick="st.cur=st.cur==='RUB'?'USD':'RUB';updBal();closeModal()"><b>Отображение валюты (₽ / $)</b><button class="mbtn">Сменить</button></div><div class="mrow" onclick="if(st.adsLeft>0){st.adsLeft--;st.rub+=150000;updBal();closeModal();toast('+150 000 ₽ начислено!')}"><b>2 рекламы (${st.adsLeft}/7)</b><button class="mbtn gold">+150 000 ₽</button></div>`);

document.getElementById('msw').onclick = () => {
  vib('heavy');
  const b = document.getElementById('msw'), l = document.getElementById('logo');
  if (st.m === 'k') { st.m = 'l'; st.t = 'pair'; b.classList.add('act'); b.textContent = 'KINETIC'; l.textContent = 'LOVE ❤️'; }
  else { st.m = 'k'; st.t = 'mental'; b.classList.remove('act'); b.textContent = 'LOVE ❤️'; l.textContent = 'KINETIC'; }
  updBal(); draw();
};

function sel(id) { vib('light'); st.t = id; draw(); }

function draw() {
  const nav = document.getElementById('nav');
  nav.className = st.m === 'l' ? 'nav lmode' : 'nav';
  nav.innerHTML = tabs[st.m].map(x => `<div class="nitem ${st.t === x.id ? 'act' : ''}" onclick="sel('${x.id}')"><div class="nico">${x.i}</div><div class="nlbl">${x.l}</div></div>`).join('');
  const [title, sub, cards] = views[st.t];
  document.getElementById('app').innerHTML = `
    <div class="title">${title}</div>
    <div class="sub">${sub}</div>
    <div class="list">
      ${cards.map(([ico, ct, cd, badge, fn]) => `
        <div class="row-card" onclick="${fn}">
          <div class="row-ico">${ico}</div>
          <div class="row-body">
            <div class="row-top"><span class="ctitle">${ct}</span>${badge ? `<span class="epill">${badge}</span>` : ''}</div>
            <div class="cdesc">${cd}</div>
          </div>
          <div class="row-arr">›</div>
        </div>
      `).join('')}
    </div>
  `;
}

updBal();
draw();
