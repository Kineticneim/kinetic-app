const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0B0C10'); tg.setBackgroundColor('#0B0C10'); }

const u = tg?.initDataUnsafe?.user;
const uName = u?.first_name || 'Игрок';
const uAva = u?.photo_url || 'https://dicebear.com';
document.getElementById('uname').textContent = uName;
document.getElementById('ava').src = uAva;

let st = { m: 'k', t: 'mental', rub: 500000, spk: 250, cur: 'RUB', car: 0, low: false, tbl: 0 };
const cars = [
  { hex: '#11131A', name: 'Чёрный матовый' },
  { hex: '#7C3AED', name: 'Неон градиент' },
  { hex: '#D1D5DB', name: 'Зеркальный хром' }
];
const tbls = ['Белый лавовый', 'Чёрный карбон', 'Серый гранит'];

const tabs = {
  k: [{ id: 'mental', i: '🧠', l: 'МЕНТАЛ' }, { id: 'horizon', i: '🔮', l: 'ГОРИЗОНТ' }, { id: 'boost', i: '🎮', l: 'БУСТ' }, { id: 'status', i: '💎', l: 'СТАТУС' }, { id: 'neuro', i: '⚡', l: 'НЕЙРО' }, { id: 'market', i: '🛒', l: 'МАРКЕТ' }],
  l: [{ id: 'pair', i: '❤️', l: 'ПАРА' }, { id: 'home', i: '🏠', l: 'ДОМ' }, { id: 'games', i: '🎲', l: 'ИГРЫ' }, { id: 'chat', i: '💬', l: 'ЧАТ' }, { id: 'lmarket', i: '🛍️', l: 'МАРКЕТ' }]
};

const views = {
  mental: ['МЕНТАЛ', 'ИИ-тесты и карточки', [['🎲', 'ГРАНЬ ВЫБОРА', 'Кости 50/50 ДА или НЕТ', 'openDice()'], ['🧬', 'ЛИЧНОСТЬ', 'Скан отпечатка + ИИ-карта', "toast('Скоро')"], ['🔋', 'ДОФАМИН.EXE', 'Заряд дофамина', "toast('Скоро')"], ['🚀', 'ТОЧКА РОСТА', 'Подбор ниши от ИИ', "toast('Скоро')"]]],
  horizon: ['ГОРИЗОНТ', 'Предсказания будущего', [['🏎️', 'АВТОПАРК', 'Будущая машина', "toast('Скоро')"], ['🌆', 'ЛОКАЦИЯ', 'Город и жильё', "toast('Скоро')"], ['💰', 'ПОТОЛОК', 'Доход и актив', "toast('Скоро')"], ['🐺', 'ТОТЕМ', 'Тотемное животное', "toast('Скоро')"]]],
  boost: ['БУСТ', 'Игры на виртуальные ₽', [['✂️', 'КНБ 1x1', 'Стрик x2/x4/x8', "toast('Скоро')"], ['💣', 'САПЁР', 'Сетка 4x4', "toast('Скоро')"], ['🔫', 'РУЛЕТКА', 'Барабан 6 ячеек', "toast('Скоро')"], ['🚀', 'РАКЕТА', 'Успей забрать X', "toast('Скоро')"]]],
  status: ['СТАТУС', 'Спины и 8 редкостей', [['🚘', 'АВТО И НОМЕРА', '250 машин + номера', "toast('Скоро')"], ['⌚', 'ЧАСЫ', 'От классики до Rolex', "toast('Скоро')"], ['💳', 'БАНК. КАРТЫ', '100 элитных карт', "toast('Скоро')"], ['📱', 'СИМ-КАРТЫ', 'Номера 777-77-77', "toast('Скоро')"]]],
  neuro: ['НЕЙРО', 'ИИ-помощник', [['🤖', 'ИИ-ЧАТ + ФОТО', '3 фото/день бесплатно', "toast('Скоро')"], ['🎙️', 'ГОЛОС В ТЕКСТ', 'Расшифровка ГС', "toast('Скоро')"]]],
  market: ['МАРКЕТ', 'Тюнинг и VIP', [['🎨', 'ТЮНИНГ И СТОЛ', 'Открыть гараж', 'openProfile()'], ['👑', 'VIP-СТАТУС', '149 Stars / 30 дней', "toast('Скоро')"]]],
  pair: ['KINETIC LOVE ❤️', 'Пространство пары', [['💎', 'КРИСТАЛЛ СВЯЗИ', 'Стрик активности', "toast('Активен')"], ['🫙', 'БАНКА ЖЕЛАНИЙ', 'Список хотелок', "toast('Скоро')"], ['⏳', 'КАПСУЛА ВРЕМЕНИ', 'Фото и текст в будущее', "toast('Скоро')"], ['🌸', 'КАЛЕНДАРЬ', 'Цикл и симптомы', "toast('Скоро')"]]],
  home: ['ОБЩИЙ ДОМ', 'Дом и 80 питомцев', [['🏦', 'КОПИЛКА SPARK', 'Общая цель', "toast('Скоро')"], ['🐾', 'ПИТОМЦЫ', 'До 6 слотов', "toast('Скоро')"]]],
  games: ['ИГРЫ ПАРЫ', '4 режима', [['🔥', 'ПРАВДА / ДЕЙСТВИЕ', '3 уровня', "toast('Скоро')"], ['🖼️', 'ПО БЛЮРУ', 'Фото-квиз', "toast('Скоро')"]]],
  chat: ['ПАРНЫЙ ЧАТ', 'Чат двоих', [['💌', 'ОТКРЫТЬ ЧАТ', 'Live-переписка', "toast('Скоро')"]]],
  lmarket: ['МАРКЕТ ПАРЫ', 'Боксы и зоомагазин', [['📦', 'БОКСЫ ПАРЫ', '100+ предметов', "toast('Скоро')"]]]
};

function toast(m) { const e = document.getElementById('toast'); e.textContent = m; e.classList.add('show'); setTimeout(() => e.classList.remove('show'), 2000); }
function openModal(h) { document.getElementById('modal-box').innerHTML = h; document.getElementById('modal-bg').classList.add('open'); }
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
document.getElementById('modal-bg').onclick = e => { if (e.target.id === 'modal-bg') closeModal(); };

function updBal() { document.getElementById('bval').textContent = st.m === 'l' ? st.spk + ' SPARK ⚡' : (st.cur === 'RUB' ? st.rub.toLocaleString('ru-RU') + ' ₽' : '$' + (st.rub / 100)); }

function openDice() {
  openModal(`<div class="mhead"><span class="mtitle">🎲 ГРАНЬ ВЫБОРА</span><button class="mclose" onclick="closeModal()">✕</button></div><div id="dres" style="text-align:center;font-family:'Unbounded';font-size:26px;padding:20px;background:#0B0C10;border-radius:14px;margin-bottom:12px">?</div><button class="mbtn" style="width:100%;padding:12px" onclick="document.getElementById('dres').textContent=Math.random()<0.5?'ДА ✅':'НЕТ ❌'">БРОСИТЬ 50/50</button>`);
}

function openTable() {
  openModal(`<div class="mhead"><span class="mtitle">💎 СТОЛИК (${tbls[st.tbl]})</span><button class="mclose" onclick="closeModal()">✕</button></div><div class="mrow"><b>💳 Black Card 7777</b><span class="epill">Эпик</span></div><div class="mrow"><b>📱 SIM 777-77-77</b><span class="epill">Легенда</span></div><div class="mrow"><b>⌚ Rolex Daytona</b><span class="epill">Золото</span></div>`);
}

function openProfile() {
  const c = cars[st.car];
  document.getElementById('app').innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:12px"><div class="title">ПРОФИЛЬ</div><button class="mclose" onclick="draw()">✕</button></div><div class="card" style="margin-bottom:12px;border-color:#3B82F6"><div class="cdesc" style="margin-bottom:8px">🏠 Чёрный гараж у бассейна • ${st.low ? 'Заниженная' : 'Стандарт'}</div><div style="display:flex;gap:8px;align-items:center"><div style="flex:1;background:${c.hex};padding:14px;border-radius:14px;text-align:center;transform:translateY(${st.low ? '6px' : '0'})"><div style="font-size:24px">🚙</div><div class="ctitle">CRUISER 200</div><div class="cdesc">${c.name}</div><div style="background:#fff;color:#000;font-weight:800;font-size:10px;border-radius:4px;margin-top:6px;padding:2px">А777АА 777</div></div><div onclick="openTable()" style="width:90px;background:#1B1E2E;border:1px solid #F59E0B;border-radius:12px;padding:12px 6px;text-align:center;cursor:pointer"><div>💳📱⌚</div><div class="ctitle" style="color:#F59E0B;margin-top:4px">СТОЛИК</div><div class="cdesc">${tbls[st.tbl]}</div></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:10px"><button class="mbtn" onclick="st.car=(st.car+1)%3;openProfile()">🎨 Цвет</button><button class="mbtn" onclick="st.low=!st.low;openProfile()">⬇️ Посадка</button><button class="mbtn" onclick="st.tbl=(st.tbl+1)%3;openProfile()">🪨 Стол</button></div></div>`;
}

document.getElementById('profile-btn').onclick = openProfile;
document.getElementById('bal-btn').onclick = () => openModal(`<div class="mhead"><span class="mtitle">КОШЕЛЁК</span><button class="mclose" onclick="closeModal()">✕</button></div><div class="mrow" onclick="st.cur=st.cur==='RUB'?'USD':'RUB';updBal();closeModal()"><b>Валюта ₽ / $</b><button class="mbtn">Сменить</button></div><div class="mrow" onclick="st.rub+=150000;updBal();closeModal();toast('+150 000 ₽')"><b>Бонус за рекламу</b><button class="mbtn gold">+150 000 ₽</button></div>`);
document.getElementById('msw').onclick = () => { const b = document.getElementById('msw'), l = document.getElementById('logo'); if (st.m === 'k') { st.m = 'l'; st.t = 'pair'; b.classList.add('act'); b.textContent = 'KINETIC'; l.textContent = 'LOVE ❤️'; } else { st.m = 'k'; st.t = 'mental'; b.classList.remove('act'); b.textContent = 'LOVE ❤️'; l.textContent = 'KINETIC'; } updBal(); draw(); };
function sel(id) { st.t = id; draw(); }
function draw() {
  const nav = document.getElementById('nav'); nav.className = st.m === 'l' ? 'nav lmode' : 'nav';
  nav.innerHTML = tabs[st.m].map(x => `<div class="nitem ${st.t === x.id ? 'act' : ''}" onclick="sel('${x.id}')"><div class="nico">${x.i}</div><div class="nlbl">${x.l}</div></div>`).join('');
  const v = views[st.t];
  document.getElementById('app').innerHTML = `<div class="title">${v[0]}</div><div class="sub">${v[1]}</div><div class="grid">${v[2].map(c => `<div class="card" onclick="${c[3]}"><span class="ico">${c[0]}</span><div class="ctitle">${c[1]}</div><div class="cdesc">${c[2]}</div></div>`).join('')}</div>`;
}
updBal(); draw();
