const rarities = [
  { id: 0, n: 'Обычная', c: '#9CA3AF', glow: 'rgba(156,163,175,0.25)', min: 100000, max: 450000, w: 46 },
  { id: 1, n: 'Редкая', c: '#3B82F6', glow: 'rgba(59,130,246,0.35)', min: 500000, max: 1800000, w: 25 },
  { id: 2, n: 'Эпическая', c: '#A855F7', glow: 'rgba(168,85,247,0.4)', min: 2000000, max: 7500000, w: 14 },
  { id: 3, n: 'Легендарная', c: '#F59E0B', glow: 'rgba(245,158,11,0.45)', min: 8000000, max: 28000000, w: 8 },
  { id: 4, n: 'Золотая', c: '#FACC15', glow: 'rgba(250,204,21,0.5)', min: 30000000, max: 95000000, w: 4.2 },
  { id: 5, n: 'Высшая', c: '#EC4899', glow: 'rgba(236,72,153,0.55)', min: 100000000, max: 320000000, w: 1.8 },
  { id: 6, n: 'Секретная', c: '#EF4444', glow: 'rgba(239,68,68,0.6)', min: 350000000, max: 950000000, w: 0.75 },
  { id: 7, n: 'Божественная', c: '#22D3EE', glow: 'rgba(34,211,238,0.75)', min: 1000000000, max: 3000000000, w: 0.25 }
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
      { name: 'Visa Classic Dark', r: 0 }, { name: 'Mastercard Standard Graphite', r: 0 },
      { name: 'Tinkoff Black Metal', r: 1 }, { name: 'Alfa Only Matte', r: 1 },
      { name: 'Sber First Emerald', r: 2 }, { name: 'VTB Prime Obsidian', r: 2 },
      { name: 'Black Titanium • 7777', r: 3 }, { name: 'Amex Gold Bullion 24K', r: 4 },
      { name: 'Amex Centurion Black', r: 5 }, { name: 'Dubai Royal Diamond Card', r: 6 },
      { name: 'KINETIC INFINITE • 0001', r: 7 }
    ]
  },
  car: {
    t: 'АВТО И НОМЕРА', ico: '🚘', base: 500000, slot: 'car',
    items: [
      { name: 'Toyota Camry 3.5 • К412ОТ 77', r: 0 }, { name: 'BMW 320d M-Pack • Н819АВ 99', r: 0 },
      { name: 'BMW M5 F90 • М555ММ 77', r: 1 }, { name: 'Mercedes E63s AMG • Е063КХ 97', r: 1 },
      { name: 'Land Cruiser 200 • А777АА 777', r: 2 }, { name: 'Porsche Cayenne Turbo GT • О900ОО 77', r: 2 },
      { name: 'Mercedes-AMG G63 • В001ОР 77', r: 3 }, { name: 'Porsche 911 Turbo S • О911ОО 99', r: 4 },
      { name: 'Lamborghini Urus Performante • Х777ХХ 77', r: 5 }, { name: 'Rolls-Royce Ghost Black Badge • А001МР 97', r: 6 },
      { name: 'Bugatti Chiron Super Sport • К001КК 777', r: 7 }
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
    t: 'АУРА И ГАРАЖИ', ico: '🌌', base: 1000000, slot: 'aura',
    items: [
      { name: 'Подземный паркинг Сити', r: 0 }, { name: 'Аура: Неоновый импульс', r: 0 },
      { name: 'Лофт с панорамными окнами', r: 1 }, { name: 'Аура: Холодный ксенон', r: 1 },
      { name: 'Чёрный матовый гараж у бассейна', r: 2 }, { name: 'Аура: Мафиозная тень', r: 2 },
      { name: 'Пентхаус Башня Федерация', r: 3 }, { name: 'Аура: Золотой пепел', r: 4 },
      { name: 'Вилла на острове Пальма Дубай', r: 5 }, { name: 'Аура: Кровавое затмение', r: 6 },
      { name: 'Орбитальная резиденция KINETIC', r: 7 }
    ]
  }
};
let statusState = {
  luck5x: false,
  spinning: false,
  inv: []
};

function fmtPrice(val) {
  if (st.cur === 'USD') return '$' + Math.round(val / 100).toLocaleString('en-US');
  return Math.round(val).toLocaleString('ru-RU') + ' ₽';
}

function openSpin(catKey) {
  vib('medium');
  const p = statusPools[catKey];
  const isVip = st.vip === true;
  const luckText = isVip
    ? 'VIP Удача 10X активна постоянно 👑'
    : (statusState.luck5x ? 'Удача +5X заряжена на следующий спин ⚡' : 'Смотри 2 рекламы для шанса +5X');

  openModal(`
    <div class="mhead">
      <span class="mtitle">${p.ico} ${p.t}</span>
      <button class="mclose" onclick="if(!statusState.spinning)closeModal()">✕</button>
    </div>
    <div class="mrow" onclick="toggleLuck('${catKey}')">
      <div>
        <b>🍀 Удача ${isVip ? '10X (VIP)' : '+5X (2 рекламы)'}</b>
        <div class="cdesc">${luckText}</div>
      </div>
      <button class="mbtn ${statusState.luck5x || isVip ? 'gold' : ''}">${isVip ? '10X 👑' : (statusState.luck5x ? 'ВКЛ ⚡' : '+5X')}</button>
    </div>
    <div id="spin-stage" style="background:#0B0C10;border:1px solid #262938;border-radius:16px;padding:16px;text-align:center;margin:10px 0;min-height:118px;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div class="cdesc">Выбери уровень прокрута ниже</div>
      <div style="font-size:10px;color:#8E92A4;margin-top:4px">Редкий x5: без Обычных • Легенд x25: минимум Легендарная</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
      <button class="mbtn" onclick="startSpin('${catKey}',1,0)">Обычный<br>${fmtPrice(p.base)}</button>
      <button class="mbtn" onclick="startSpin('${catKey}',5,1)">Редкий x5<br>${fmtPrice(p.base * 5)}</button>
      <button class="mbtn gold" onclick="startSpin('${catKey}',25,3)">Легенд x25<br>${fmtPrice(p.base * 25)}</button>
    </div>
  `);
}

function toggleLuck(catKey) {
  if (st.vip) return toast('У тебя уже активна VIP Удача 10X 👑');
  if (statusState.spinning) return;
  vib('medium');
  statusState.luck5x = !statusState.luck5x;
  openSpin(catKey);
  if (statusState.luck5x) toast('Удача +5X включена на 1 прокрут!');
}

function pickDrop(catKey, minIdx) {
  const p = statusPools[catKey];
  const mult = st.vip ? 10 : (statusState.luck5x ? 5 : 1);
  if (!st.vip) statusState.luck5x = false;

  const pool = rarities.slice(minIdx).map((r, i) => ({
    ...r,
    w: i > 0 ? r.w * mult : r.w
  }));
  const total = pool.reduce((s, r) => s + r.w, 0);
  let rnd = Math.random() * total;
  let chosen = pool[0];
  for (const r of pool) {
    if (rnd < r.w) { chosen = r; break; }
    rnd -= r.w;
  }

  const exactItems = p.items.filter(x => x.r === chosen.id);
  const candidates = exactItems.length ? exactItems : p.items;
  const itemObj = candidates[Math.floor(Math.random() * candidates.length)];
  const price = Math.round((chosen.min + Math.random() * (chosen.max - chosen.min)) / 10000) * 10000;

  return { catKey, slot: p.slot, ico: p.ico, name: itemObj.name, rarity: chosen, price };
}
function startSpin(catKey, mult, minIdx) {
  if (statusState.spinning) return;
  const p = statusPools[catKey];
  const cost = p.base * mult;
  if (st.rub < cost) return toast('Недостаточно средств на балансе!');

  st.rub -= cost;
  updBal();
  statusState.spinning = true;

  const finalDrop = pickDrop(catKey, minIdx);
  const stage = document.getElementById('spin-stage');
  let ticks = 0;
  const maxTicks = 18;

  const timer = setInterval(() => {
    ticks++;
    vib('light');
    const rndItem = p.items[Math.floor(Math.random() * p.items.length)];
    const rndRar = rarities[rndItem.r];
    stage.style.borderColor = rndRar.c;
    stage.style.boxShadow = `0 0 18px ${rndRar.glow}`;
    stage.innerHTML = `
      <div style="font-size:10px;font-weight:800;color:${rndRar.c};letter-spacing:1px">${rndRar.n.toUpperCase()}</div>
      <div class="ctitle" style="font-size:13px;margin-top:6px">${rndItem.name}</div>
    `;

    if (ticks >= maxTicks) {
      clearInterval(timer);
      statusState.spinning = false;
      vib('heavy');
      const r = finalDrop.rarity;
      const sellVal = Math.round(finalDrop.price * 0.35);
      statusState.inv.unshift(finalDrop);

      stage.style.borderColor = r.c;
      stage.style.boxShadow = `0 0 26px ${r.glow}`;
      stage.innerHTML = `
        <div style="font-size:10px;font-weight:800;color:${r.c};letter-spacing:1px">★ ${r.n.toUpperCase()} ★</div>
        <div class="ctitle" style="font-size:14px;margin:6px 0">${finalDrop.name}</div>
        <div class="cdesc">Рыночная цена: <b>${fmtPrice(finalDrop.price)}</b></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;margin-top:12px">
          <button class="mbtn" onclick="equipDrop(0)">Надеть в Профиль</button>
          <button class="mbtn gold" onclick="sellDrop(0)">Продать (${fmtPrice(sellVal)})</button>
        </div>
      `;
    }
  }, 65);
}

function equipDrop(idx) {
  const item = statusState.inv[idx];
  if (!item) return;
  vib('medium');
  if (item.slot === 'car') st.equippedCar = item.name;
  else if (item.slot === 'watch') st.equippedWatch = item.name;
  else if (item.slot === 'card') st.equippedCard = item.name;
  else if (item.slot === 'sim') st.equippedSim = item.name;
  else if (item.slot === 'aura') st.equippedAura = item.name;
  closeModal();
  toast('Установлено в Публичный Профиль!');
}

function sellDrop(idx) {
  const item = statusState.inv[idx];
  if (!item) return;
  const sellVal = Math.round(item.price * 0.35);
  statusState.inv.splice(idx, 1);
  st.rub += sellVal;
  updBal();
  vib('medium');
  closeModal();
  toast(`Продано за +${fmtPrice(sellVal)}`);
}

function openInventory() {
  vib('medium');
  const listHtml = statusState.inv.length
    ? statusState.inv.map((item, i) => `
        <div class="mrow" style="border-color:${item.rarity.c}66">
          <div style="flex:1;padding-right:8px">
            <div style="font-size:9px;font-weight:800;color:${item.rarity.c}">${item.rarity.n.toUpperCase()}</div>
            <b style="font-size:12px">${item.name}</b>
            <div class="cdesc">Цена: ${fmtPrice(item.price)}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="mbtn" style="padding:5px 8px;font-size:9px" onclick="equipDrop(${i})">Надеть</button>
            <button class="mbtn gold" style="padding:5px 8px;font-size:9px" onclick="sellDrop(${i});openInventory()">+35%</button>
          </div>
        </div>
      `).join('')
    : '<div class="cdesc" style="text-align:center;padding:20px 0">Пока пусто. Крути рулетки во вкладке СТАТУС!</div>';

  openModal(`
    <div class="mhead">
      <span class="mtitle">🎒 МОЙ ИНВЕНТАРЬ (${statusState.inv.length})</span>
      <button class="mclose" onclick="closeModal()">✕</button>
    </div>
    <div style="max-height:55vh;overflow-y:auto">${listHtml}</div>
  `);
}
