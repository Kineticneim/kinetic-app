const rarities = [
  { id: 0, n: 'Обычная', c: '#9CA3AF', glow: 'rgba(156,163,175,0.35)', min: 100000, max: 450000, w: 46 },
  { id: 1, n: 'Редкая', c: '#3B82F6', glow: 'rgba(59,130,246,0.45)', min: 500000, max: 1800000, w: 25 },
  { id: 2, n: 'Эпическая', c: '#A855F7', glow: 'rgba(168,85,247,0.5)', min: 2000000, max: 7500000, w: 14 },
  { id: 3, n: 'Легендарная', c: '#F59E0B', glow: 'rgba(245,158,11,0.55)', min: 8000000, max: 28000000, w: 8 },
  { id: 4, n: 'Золотая', c: '#FACC15', glow: 'rgba(250,204,21,0.6)', min: 30000000, max: 95000000, w: 4.2 },
  { id: 5, n: 'Высшая', c: '#EC4899', glow: 'rgba(236,72,153,0.65)', min: 100000000, max: 320000000, w: 1.8 },
  { id: 6, n: 'Секретная', c: '#EF4444', glow: 'rgba(239,68,68,0.7)', min: 350000000, max: 950000000, w: 0.75 },
  { id: 7, n: 'Божественная', c: '#22D3EE', glow: 'rgba(34,211,238,0.85)', min: 1000000000, max: 3000000000, w: 0.25 }
];

const statusPools = {
  sim: {
    t: 'СИМ-КАРТЫ', ico: '📱', base: 200000, slot: 'sim',
    items: [
      { name: '+7 (999) 142-88-10', r: 0 }, { name: '+7 (926) 301-19-44', r: 0 },
      { name: '+7 (999) 500-20-20', r: 1 }, { name: '+7 (985) 444-11-44', r: 1 },
      { name: '+7 (999) 777-00-77', r: 2 }, { name: '+7 (995) 888-80-80', r: 2 },
      { name: '+7 (999) 777-77-77', r: 3 }, { name: '+7 (999) 000-00-07', r: 4 },
      { name: '+7 (999) 111-11-11', r: 5 }, { name: '+7 (999) 000-00-01', r: 6 },
      { name: '+7 (777) 777-77-77 • SPEC', r: 7 }
    ]
  },
  card: {
    t: 'БАНК. КАРТЫ', ico: '💳', base: 300000, slot: 'card',
    items: [
      { name: 'Visa Classic Dark', r: 0 }, { name: 'Mastercard Graphite', r: 0 },
      { name: 'Tinkoff Black Metal', r: 1 }, { name: 'Alfa Only Matte', r: 1 },
      { name: 'Sber First Emerald', r: 2 }, { name: 'VTB Prime Obsidian', r: 2 },
      { name: 'Black Titanium • 7777', r: 3 }, { name: 'Amex Gold Bullion 24K', r: 4 },
      { name: 'Amex Centurion Black', r: 5 }, { name: 'Dubai Royal Diamond Card', r: 6 },
      { name: 'KINETIC INFINITE • 0001', r: 7 }
    ]
  },
  car: {
    t: 'АВТОПАРК', ico: '🚘', base: 500000, slot: 'car',
    items: [
      { name: 'Toyota Camry 3.5', r: 0 }, { name: 'BMW 320d M-Pack', r: 0 },
      { name: 'BMW M5 F90 Competition', r: 1 }, { name: 'Mercedes E63s AMG', r: 1 },
      { name: 'Land Cruiser 200 Executive', r: 2 }, { name: 'Porsche Cayenne Turbo GT', r: 2 },
      { name: 'Mercedes-AMG G63 Brabus', r: 3 }, { name: 'Porsche 911 Turbo S', r: 4 },
      { name: 'Lamborghini Urus Performante', r: 5 }, { name: 'Rolls-Royce Ghost Black Badge', r: 6 },
      { name: 'Bugatti Chiron Super Sport', r: 7 }
    ]
  },
  plate: {
    t: 'АВТОНОМЕРА', ico: '🔢', base: 350000, slot: 'plate',
    items: [
      { name: 'К412ОТ 77', r: 0 }, { name: 'Н819АВ 99', r: 0 },
      { name: 'О500ОО 77', r: 1 }, { name: 'Е063КХ 97', r: 1 },
      { name: 'М555ММ 77', r: 2 }, { name: 'Х888ХХ 99', r: 2 },
      { name: 'А777АА 777', r: 3 }, { name: 'В001ОР 77', r: 4 },
      { name: 'Е777КХ 77', r: 5 }, { name: 'А001МР 97', r: 6 },
      { name: 'К001КК 777', r: 7 }
    ]
  },
  watch: {
    t: 'ЭЛИТНЫЕ ЧАСЫ', ico: '⌚', base: 800000, slot: 'watch',
    items: [
      { name: 'Casio G-Shock Full Metal', r: 0 }, { name: 'Tissot PRX Powermatic', r: 0 },
      { name: 'Tag Heuer Carrera', r: 1 }, { name: 'Omega Seamaster 300M', r: 1 },
      { name: 'Rolex Datejust 41 Wimbledon', r: 2 }, { name: 'Cartier Santos Skeleton', r: 2 },
      { name: 'Rolex Cosmograph Daytona', r: 3 }, { name: 'Audemars Piguet Royal Oak', r: 4 },
      { name: 'Patek Philippe Nautilus 5711', r: 5 }, { name: 'Richard Mille RM 11-03', r: 6 },
      { name: 'Jacob & Co Billionaire Tourbillon', r: 7 }
    ]
  },
  aura: {
    t: 'АУРЫ ПРОФИЛЯ', ico: '✨', base: 600000, slot: 'aura',
    items: [
      { name: 'Аура: Неоновый импульс', r: 0 }, { name: 'Аура: Графитовый дым', r: 0 },
      { name: 'Аура: Холодный ксенон', r: 1 }, { name: 'Аура: Ультрафиолет', r: 1 },
      { name: 'Аура: Мафиозная тень', r: 2 }, { name: 'Аура: Электрический разряд', r: 2 },
      { name: 'Аура: Золотой пепел', r: 3 }, { name: 'Аура: Платиновый шторм', r: 4 },
      { name: 'Аура: Кровавое затмение', r: 5 }, { name: 'Аура: Чёрная дыра', r: 6 },
      { name: 'Аура: Божественный сингуляр', r: 7 }
    ]
  },
  house: {
    t: 'ДОМА И ГАРАЖИ', ico: '🏛️', base: 1000000, slot: 'house',
    items: [
      { name: 'Подземный паркинг Сити', r: 0 }, { name: 'Студия в центре', r: 0 },
      { name: 'Лофт с панорамными окнами', r: 1 }, { name: 'Закрытый бокс с подсветкой', r: 1 },
      { name: 'Чёрный матовый гараж у бассейна', r: 2 }, { name: 'Загородный хай-тек коттедж', r: 2 },
      { name: 'Пентхаус Башня Федерация', r: 3 }, { name: 'Особняк на Рублёвке', r: 4 },
      { name: 'Вилла на острове Пальма Дубай', r: 5 }, { name: 'Частный остров в океане', r: 6 },
      { name: 'Орбитальная резиденция KINETIC', r: 7 }
    ]
  }
};
let statusState = {
  luck5x: false,
  spinning: false,
  saved: [], // до 1000 слотов
  safe: []   // до 50 слотов
};

function fmtPrice(val) {
  if (st.cur === 'USD') return '$' + Math.round(val / 100).toLocaleString('en-US');
  return Math.round(val).toLocaleString('ru-RU') + ' ₽';
}

function renderRarityScale(activeId = -1) {
  return `
    <div style="display:flex;justify-content:center;gap:5px;margin:8px 0 14px">
      ${rarities.map(r => {
        const on = activeId >= r.id;
        return `<div style="width:22px;height:7px;border-radius:99px;background:${on ? r.c : '#1F2333'};box-shadow:${on ? `0 0 10px ${r.c}` : 'none'};transition:.2s"></div>`;
      }).join('')}
    </div>
  `;
}

function openSpin(catKey) {
  if (statusState.spinning) return;
  vib('medium');
  const p = statusPools[catKey];
  const isVip = st.vip === true;

  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="if(!statusState.spinning)draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">${p.t}</div>
      <button class="mbtn" style="padding:6px 10px;font-size:9px" onclick="if(!statusState.spinning)openStorage('saved')">📦 ${statusState.saved.length}/1000</button>
    </div>

    <div class="mrow" onclick="toggleLuck('${catKey}')" style="margin-bottom:12px">
      <div>
        <b>🍀 Удача ${isVip ? '10X (VIP)' : '+5X (2 рекламы)'}</b>
        <div class="cdesc">${isVip ? 'Постоянно активна 👑' : (statusState.luck5x ? 'Заряжена на следующий спин ⚡' : 'Увеличивает шанс на редкие')}</div>
      </div>
      <button class="mbtn ${statusState.luck5x || isVip ? 'gold' : ''}">${isVip ? '10X' : (statusState.luck5x ? 'ВКЛ ⚡' : '+5X')}</button>
    </div>

    <div id="spin-stage" style="background:radial-gradient(circle at 50% 45%,#181C2E,#0B0C10);border:1.5px solid #262938;border-radius:22px;padding:24px 16px;text-align:center;min-height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:.2s">
      <div id="spin-rname" style="font-family:'Unbounded';font-size:11px;font-weight:800;color:#8E92A4;letter-spacing:1.2px">ГОТОВ К ПРОКРУТУ</div>
      <div id="spin-scale">${renderRarityScale(-1)}</div>
      <div id="spin-gfx" style="width:96px;height:96px;border-radius:24px;background:#161822;border:1px solid #262938;display:flex;align-items:center;justify-content:center;font-size:46px;margin-bottom:14px">${p.ico}</div>
      <div id="spin-iname" class="ctitle" style="font-size:15px">Выбери уровень спина</div>
      <div id="spin-iprice" class="cdesc" style="margin-top:6px">Автосохранение в «Сохранённые» (1000 мест)</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:14px">
      <button class="mbtn" style="padding:11px 4px;line-height:1.3" onclick="startSpin('${catKey}',1,0)">Обычный<br>${fmtPrice(p.base)}</button>
      <button class="mbtn" style="padding:11px 4px;line-height:1.3" onclick="startSpin('${catKey}',5,1)">Редкий x5<br>${fmtPrice(p.base * 5)}</button>
      <button class="mbtn gold" style="padding:11px 4px;line-height:1.3" onclick="startSpin('${catKey}',25,3)">Легенд x25<br>${fmtPrice(p.base * 25)}</button>
    </div>
  `;
}

function toggleLuck(catKey) {
  if (st.vip) return toast('У тебя уже VIP Удача 10X 👑');
  if (statusState.spinning) return;
  vib('medium');
  statusState.luck5x = !statusState.luck5x;
  openSpin(catKey);
  if (statusState.luck5x) toast('Удача +5X заряжена!');
}
function pickDrop(catKey, minIdx) {
  const p = statusPools[catKey];
  const mult = st.vip ? 10 : (statusState.luck5x ? 5 : 1);
  if (!st.vip) statusState.luck5x = false;

  const pool = rarities.slice(minIdx).map((r, i) => ({ ...r, w: i > 0 ? r.w * mult : r.w }));
  const total = pool.reduce((s, r) => s + r.w, 0);
  let rnd = Math.random() * total, chosen = pool;
  for (const r of pool) { if (rnd < r.w) { chosen = r; break; } rnd -= r.w; }

  const exact = p.items.filter(x => x.r === chosen.id);
  const list = exact.length ? exact : p.items;
  const itemObj = list[Math.floor(Math.random() * list.length)];
  const price = Math.round((chosen.min + Math.random() * (chosen.max - chosen.min)) / 10000) * 10000;

  return { id: Date.now() + Math.random(), catKey, slot: p.slot, ico: p.ico, name: itemObj.name, rarity: chosen, price };
}

function startSpin(catKey, mult, minIdx) {
  if (statusState.spinning) return;
  if (statusState.saved.length >= 1000) return toast('Сохранённые переполнены (1000/1000)! Продай лишнее.');
  const p = statusPools[catKey];
  const cost = p.base * mult;
  if (st.rub < cost) return toast('Недостаточно средств на балансе!');

  st.rub -= cost; updBal(); statusState.spinning = true;
  const drop = pickDrop(catKey, minIdx);
  const stage = document.getElementById('spin-stage');
  let ticks = 0;

  const timer = setInterval(() => {
    ticks++; vib('light');
    const rndItem = p.items[Math.floor(Math.random() * p.items.length)];
    const r = rarities[rndItem.r];
    stage.style.borderColor = r.c;
    stage.style.boxShadow = `0 0 22px ${r.glow}`;
    document.getElementById('spin-rname').style.color = r.c;
    document.getElementById('spin-rname').textContent = r.n.toUpperCase();
    document.getElementById('spin-scale').innerHTML = renderRarityScale(r.id);
    document.getElementById('spin-iname').textContent = rndItem.name;

    if (ticks >= 18) {
      clearInterval(timer); statusState.spinning = false; vib('heavy');
      statusState.saved.unshift(drop);
      const fr = drop.rarity, sellVal = Math.round(drop.price * 0.35);

      stage.style.borderColor = fr.c;
      stage.style.boxShadow = `0 0 32px ${fr.glow}`;
      document.getElementById('spin-rname').style.color = fr.c;
      document.getElementById('spin-rname').textContent = `★ ${fr.n.toUpperCase()} ★`;
      document.getElementById('spin-scale').innerHTML = renderRarityScale(fr.id);
      document.getElementById('spin-gfx').style.borderColor = fr.c;
      document.getElementById('spin-iname').textContent = drop.name;
      document.getElementById('spin-iprice').innerHTML = `Цена: <b style="color:#fff">${fmtPrice(drop.price)}</b> • В Сохранённых (${statusState.saved.length}/1000)
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:14px">
          <button class="mbtn" style="padding:8px 4px;font-size:9px" onclick="equipItem('saved',0)">Надеть</button>
          <button class="mbtn" style="padding:8px 4px;font-size:9px;background:#1E293B;border:1px solid #3B82F6" onclick="moveToSafe(0)">🔒 В Сейф</button>
          <button class="mbtn gold" style="padding:8px 4px;font-size:9px" onclick="sellOne('saved',0)">+${fmtPrice(sellVal)}</button>
        </div>`;
    }
  }, 60);
}

function moveToSafe(idx) {
  if (statusState.safe.length >= 50) return toast('Сейф переполнен (50/50)!');
  const [item] = statusState.saved.splice(idx, 1);
  if (!item) return;
  statusState.safe.unshift(item);
  vib('medium');
  toast(`Убрано в Сейф (${statusState.safe.length}/50)`);
}

function equipItem(zone, idx) {
  const item = statusState[zone][idx];
  if (!item) return;
  vib('medium');
  if (item.slot === 'car') st.equippedCar = item.name;
  else if (item.slot === 'plate') st.equippedPlate = item.name;
  else if (item.slot === 'watch') st.equippedWatch = item.name;
  else if (item.slot === 'card') st.equippedCard = item.name;
  else if (item.slot === 'sim') st.equippedSim = item.name;
  else if (item.slot === 'aura') st.equippedAura = item.name;
  else if (item.slot === 'house') st.equippedHouse = item.name;
  toast(`Установлено: ${item.name}`);
}

function sellOne(zone, idx) {
  const [item] = statusState[zone].splice(idx, 1);
  if (!item) return;
  const val = Math.round(item.price * 0.35);
  st.rub += val; updBal(); vib('medium');
  toast(`Продано за +${fmtPrice(val)}`);
}

function sellAllSaved() {
  if (!statusState.saved.length) return toast('В Сохранённых пусто');
  const sum = statusState.saved.reduce((s, x) => s + Math.round(x.price * 0.35), 0);
  statusState.saved = [];
  st.rub += sum; updBal(); vib('heavy');
  openStorage('saved');
  toast(`Продано всё за +${fmtPrice(sum)}!`);
}

function openStorage(zone = 'saved') {
  vib('medium');
  const arr = statusState[zone];
  const isSaved = zone === 'saved';
  const totalSell = isSaved ? arr.reduce((s, x) => s + Math.round(x.price * 0.35), 0) : 0;

  const cardsHtml = arr.length ? arr.map((it, i) => `
    <div class="mrow" style="border-color:${it.rarity.c}66;align-items:center">
      <div style="flex:1;padding-right:8px">
        <div style="font-size:9px;font-weight:800;color:${it.rarity.c}">${it.ico} ${it.rarity.n.toUpperCase()}</div>
        <b style="font-size:12px">${it.name}</b>
        <div class="cdesc">${fmtPrice(it.price)}</div>
      </div>
      <div style="display:flex;gap:4px">
        <button class="mbtn" style="padding:6px 8px;font-size:9px" onclick="equipItem('${zone}',${i})">Надеть</button>
        ${isSaved ? `<button class="mbtn" style="padding:6px 8px;font-size:9px;background:#1E293B" onclick="moveToSafe(${i});openStorage('saved')">🔒</button>` : ''}
        <button class="mbtn gold" style="padding:6px 8px;font-size:9px" onclick="sellOne('${zone}',${i});openStorage('${zone}')">+35%</button>
      </div>
    </div>
  `).join('') : `<div class="cdesc" style="text-align:center;padding:30px 0">${isSaved ? 'В Сохранённых пока пусто' : 'В Сейфе пока пусто (переложи сюда ценное из Сохранённых)'}</div>`;

  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">ХРАНИЛИЩЕ</div>
      <div style="width:50px"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <button class="mbtn ${isSaved ? '' : 'gold'}" style="background:${isSaved ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : '#161822'};color:#fff;padding:10px" onclick="openStorage('saved')">📦 Сохранённые (${statusState.saved.length}/1000)</button>
      <button class="mbtn" style="background:${!isSaved ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : '#161822'};color:#fff;padding:10px" onclick="openStorage('safe')">🔒 Сейф (${statusState.safe.length}/50)</button>
    </div>
    ${isSaved && arr.length ? `<button class="mbtn gold" style="width:100%;padding:11px;margin-bottom:12px" onclick="sellAllSaved()">💰 ПРОДАТЬ ВСЁ ИЗ СОХРАНЁННЫХ (+${fmtPrice(totalSell)})</button>` : ''}
    <div>${cardsHtml}</div>
  `;
}
