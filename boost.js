let boostState = {
  bet: 100000,
  knbStreak: 0,
  knbBank: 0,
  minesGrid: [],
  minesBombs: 3,
  minesOpen: 0,
  minesActive: false,
  minesSavedOnce: false,
  crashTimer: null,
  crashMult: 1.0,
  crashActive: false
};

function renderBetBar(onChangeFn) {
  const presets =;
  return `
    <div style="background:#161822;border:1px solid #262938;border-radius:14px;padding:10px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:8px">
        <span style="color:#8E92A4">Ставка раунда:</span>
        <b style="color:#F59E0B;font-family:'Unbounded'">${fmtPrice(boostState.bet)}</b>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px">
        ${presets.map(v => `<button class="mbtn" style="padding:6px 2px;font-size:9px;background:${boostState.bet === v ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : '#0B0C10'}" onclick="boostState.bet=${v};${onChangeFn}">${v >= 1000000 ? (v / 1000000) + 'M' : (v / 1000) + 'k'}</button>`).join('')}
        <button class="mbtn gold" style="padding:6px 2px;font-size:9px" onclick="boostState.bet=Math.max(10000,st.rub);${onChangeFn}">ALL</button>
      </div>
    </div>
  `;
}

// 1. КНБ 1x1 СО СТРИКОМ x2 / x4 / x8
function openKNB() {
  vib('medium');
  const mults =;
  const curMult = mults[Math.min(boostState.knbStreak, 3)];
  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">✂️ КНБ 1×1</div>
      <span class="epill">Стрик: ${boostState.knbStreak}</span>
    </div>
    ${boostState.knbBank === 0 ? renderBetBar('openKNB()') : ''}
    <div id="knb-arena" style="background:radial-gradient(circle at 50% 40%,#1A1E32,#0B0C10);border:1.5px solid #262938;border-radius:20px;padding:20px 14px;text-align:center;margin-bottom:12px">
      <div style="font-size:11px;color:#8E92A4">Текущий банк серии</div>
      <div style="font-family:'Unbounded';font-size:22px;font-weight:800;color:#F59E0B;margin:6px 0">${fmtPrice(boostState.knbBank)}</div>
      <div class="epill">Множитель следующей победы: x${curMult * 2}</div>
      <div id="knb-vs" style="font-size:32px;margin:18px 0">🤜 ⚡ 🤛</div>
      <div id="knb-msg" class="cdesc">Выбери ход, чтобы начать или продолжить серию</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      <button class="mbtn" style="padding:14px 4px;font-size:12px" onclick="playKNB(0)">🪨 Камень</button>
      <button class="mbtn" style="padding:14px 4px;font-size:12px" onclick="playKNB(1)">✂️ Ножницы</button>
      <button class="mbtn" style="padding:14px 4px;font-size:12px" onclick="playKNB(2)">📄 Бумага</button>
    </div>
    ${boostState.knbBank > 0 ? `<button class="mbtn gold" style="width:100%;padding:12px;margin-top:10px" onclick="st.rub+=boostState.knbBank;updBal();toast('Забрали +'+fmtPrice(boostState.knbBank));boostState.knbBank=0;boostState.knbStreak=0;openKNB()">💰 ЗАБРАТЬ БАНК (${fmtPrice(boostState.knbBank)})</button>` : ''}
  `;
}

function playKNB(userMove) {
  if (boostState.knbBank === 0) {
    if (st.rub < boostState.bet) return toast('Недостаточно ₽ для ставки!');
    st.rub -= boostState.bet; updBal();
    boostState.knbBank = boostState.bet;
  }
  const icons = ['🪨', '✂️', '📄'];
  const botMove = Math.floor(Math.random() * 3);
  vib('medium');

  if (userMove === botMove) {
    document.getElementById('knb-vs').textContent = `${icons[userMove]} = ${icons[botMove]}`;
    document.getElementById('knb-msg').textContent = 'Ничья! Банк и стрик сохранены.';
    return;
  }
  const win = (userMove === 0 && botMove === 1) || (userMove === 1 && botMove === 2) || (userMove === 2 && botMove === 0);
  if (win) {
    vib('heavy');
    boostState.knbStreak++;
    boostState.knbBank *= 2;
    openKNB();
    document.getElementById('knb-vs').textContent = `${icons[userMove]} 🆚 ${icons[botMove]}`;
    document.getElementById('knb-msg').innerHTML = `<b style="color:#10B981">ПОБЕДА! Банк удвоен!</b>`;
  } else {
    const lostBank = boostState.knbBank;
    boostState.knbBank = 0; boostState.knbStreak = 0;
    openKNB();
    document.getElementById('knb-vs').textContent = `${icons[userMove]} 💥 ${icons[botMove]}`;
    document.getElementById('knb-msg').innerHTML = `<b style="color:#EF4444">ПРОИГРЫШ!</b><br><button class="mbtn gold" style="margin-top:8px;padding:7px 12px;font-size:10px" onclick="boostState.knbBank=${lostBank};openKNB();toast('Стрик спасён за просмотр рекламы!')">🎬 Спасти банк за 2 рекламы</button>`;
  }
}
// 2. САПЁР 4x4 (1 / 3 / 5 БОМБ + РАЗМИНИРОВАНИЕ)
function openMines() {
  vib('medium');
  const multPerStep = boostState.minesBombs === 1 ? 1.15 : (boostState.minesBombs === 3 ? 1.32 : 1.65);
  const curWin = boostState.minesOpen > 0 ? Math.round(boostState.bet * Math.pow(multPerStep, boostState.minesOpen)) : 0;

  let cells = '';
  for (let i = 0; i < 16; i++) {
    const cell = boostState.minesGrid[i];
    let txt = '?', bg = '#161822', brd = '#262938';
    if (cell && cell.open) {
      if (cell.bomb) { txt = '💣'; bg = 'rgba(239,68,68,.25)'; brd = '#EF4444'; }
      else { txt = '💎'; bg = 'rgba(16,185,129,.22)'; brd = '#10B981'; }
    }
    cells += `<div onclick="clickMine(${i})" style="height:56px;background:${bg};border:1.5px solid ${brd};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer">${txt}</div>`;
  }

  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">💣 САПЁР 4×4</div>
      <span class="epill">Бомб: ${boostState.minesBombs}</span>
    </div>
    ${!boostState.minesActive ? `
      ${renderBetBar('openMines()')}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px">
        ${[1, 3, 5].map(b => `<button class="mbtn" style="background:${boostState.minesBombs === b ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : '#161822'}" onclick="boostState.minesBombs=${b};openMines()">${b} бомб</button>`).join('')}
      </div>
      <button class="mbtn gold" style="width:100%;padding:12px;margin-bottom:12px" onclick="startMines()">НАЧАТЬ ИГРУ</button>
    ` : `
      <div style="display:flex;justify-content:space-between;align-items:center;background:#161822;padding:10px 14px;border-radius:14px;margin-bottom:10px">
        <span>Открыто: <b>${boostState.minesOpen}</b></span>
        <b style="color:#10B981;font-family:'Unbounded'">${fmtPrice(curWin)}</b>
      </div>
      ${curWin > 0 ? `<button class="mbtn gold" style="width:100%;padding:11px;margin-bottom:10px" onclick="st.rub+=${curWin};updBal();boostState.minesActive=false;toast('Забрали +${fmtPrice(curWin)}!');openMines()">💰 ЗАБРАТЬ ${fmtPrice(curWin)}</button>` : ''}
    `}
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${cells}</div>
    <div id="mines-rescue" style="margin-top:10px"></div>
  `;
}

function startMines() {
  if (st.rub < boostState.bet) return toast('Недостаточно ₽ для ставки!');
  st.rub -= boostState.bet; updBal(); vib('heavy');
  boostState.minesActive = true; boostState.minesOpen = 0; boostState.minesSavedOnce = false;
  boostState.minesGrid = Array.from({ length: 16 }, () => ({ bomb: false, open: false }));
  let placed = 0;
  while (placed < boostState.minesBombs) {
    const idx = Math.floor(Math.random() * 16);
    if (!boostState.minesGrid[idx].bomb) { boostState.minesGrid[idx].bomb = true; placed++; }
  }
  openMines();
}

function clickMine(idx) {
  if (!boostState.minesActive || boostState.minesGrid[idx].open) return;
  const cell = boostState.minesGrid[idx];
  cell.open = true;
  if (cell.bomb) {
    vib('heavy');
    boostState.minesActive = false;
    openMines();
    if (!boostState.minesSavedOnce) {
      document.getElementById('mines-rescue').innerHTML = `<button class="mbtn gold" style="width:100%;padding:11px" onclick="rescueMine(${idx})">🎬 Разминировать бомбу (2 рекламы)</button>`;
    }
    toast('БАХ! Попал на мину!');
  } else {
    vib('light');
    boostState.minesOpen++;
    openMines();
  }
}

function rescueMine(idx) {
  boostState.minesGrid[idx].bomb = false;
  boostState.minesActive = true;
  boostState.minesSavedOnce = true;
  openMines();
  toast('Бомба обезврежена! Продолжаем игру.');
}

// 3. РУЛЕТКА / РЕВОЛЬВЕР (БАРАБАН 6 ЯЧЕЕК, 1-3 ЗАРЯДА)
let revState = { bullets: 1, step: 0, active: false };

function openRevolver() {
  vib('medium');
  const mult = revState.step === 0 ? 1 : (1 + (revState.bullets * 0.25 * revState.step)).toFixed(2);
  const winVal = Math.round(boostState.bet * mult);
  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">🔫 РЕВОЛЬВЕР</div>
      <span class="epill">Выстрел: ${revState.step}/5</span>
    </div>
    ${!revState.active ? `
      ${renderBetBar('openRevolver()')}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px">
        ${[1, 2, 3].map(b => `<button class="mbtn" style="background:${revState.bullets === b ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : '#161822'}" onclick="revState.bullets=${b};openRevolver()">${b} патрон</button>`).join('')}
      </div>
      <button class="mbtn gold" style="width:100%;padding:12px" onclick="startRevolver()">КРУТИТЬ БАРАБАН</button>
    ` : `
      <div style="background:#161822;border:1.5px solid #262938;border-radius:20px;padding:24px;text-align:center;margin-bottom:12px">
        <div style="font-size:48px;margin-bottom:10px">🔫</div>
        <div class="cdesc">Текущий выигрыш (x${mult})</div>
        <div style="font-family:'Unbounded';font-size:22px;font-weight:800;color:#F59E0B;margin:6px 0">${fmtPrice(winVal)}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button class="mbtn" style="padding:13px" onclick="pullTrigger()">💥 НАЖАТЬ КУРОК</button>
        <button class="mbtn gold" style="padding:13px" onclick="st.rub+=${winVal};updBal();revState.active=false;toast('Забрали +${fmtPrice(winVal)}!');openRevolver()">💰 ЗАБРАТЬ</button>
      </div>
    `}
  `;
}

function startRevolver() {
  if (st.rub < boostState.bet) return toast('Недостаточно ₽!');
  st.rub -= boostState.bet; updBal(); vib('heavy');
  revState.active = true; revState.step = 0; openRevolver();
}

function pullTrigger() {
  const chambersLeft = 6 - revState.step;
  const hit = Math.random() < (revState.bullets / chambersLeft);
  if (hit) {
    vib('heavy'); revState.active = false; openRevolver();
    toast('💥 ВЫСТРЕЛ! Ставка сгорела.');
  } else {
    vib('medium'); revState.step++;
    if (revState.step >= 6 - revState.bullets) {
      const mult = (1 + (revState.bullets * 0.25 * revState.step)).toFixed(2);
      const win = Math.round(boostState.bet * mult);
      st.rub += win; updBal(); revState.active = false;
      toast(`🔥 ВЫЖИЛ ВСЕ РАУНДЫ! +${fmtPrice(win)}`);
    }
    openRevolver();
  }
}
// 4. РАКЕТА (CRASH)
function openCrash() {
  if (boostState.crashTimer) clearInterval(boostState.crashTimer);
  boostState.crashActive = false;
  boostState.crashMult = 1.0;
  vib('medium');
  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="if(boostState.crashTimer)clearInterval(boostState.crashTimer);draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">🚀 РАКЕТА (CRASH)</div>
      <span class="epill">LIVE</span>
    </div>
    ${renderBetBar('openCrash()')}
    <div id="crash-box" style="background:radial-gradient(circle at 50% 45%,#1C1F38,#0B0C10);border:1.5px solid #262938;border-radius:20px;padding:28px 16px;text-align:center;margin-bottom:12px">
      <div id="crash-ico" style="font-size:44px;margin-bottom:8px">🚀</div>
      <div id="crash-val" style="font-family:'Unbounded';font-size:32px;font-weight:800;color:#fff">1.00x</div>
      <div id="crash-sub" class="cdesc" style="margin-top:6px">Нажми Старт и успей забрать до взрыва</div>
    </div>
    <button id="crash-btn" class="mbtn gold" style="width:100%;padding:13px;font-size:12px" onclick="startCrash()">ЗАПУСТИТЬ РАКЕТУ</button>
  `;
}

function startCrash() {
  if (boostState.crashActive) return cashoutCrash();
  if (st.rub < boostState.bet) return toast('Недостаточно ₽!');
  st.rub -= boostState.bet; updBal(); vib('heavy');

  boostState.crashActive = true;
  boostState.crashMult = 1.0;
  const crashPoint = Math.random() < 0.12 ? 1.0 : +(1.05 + Math.pow(Math.random(), 2.2) * 14).toFixed(2);
  const btn = document.getElementById('crash-btn');
  btn.textContent = `💰 ЗАБРАТЬ ${fmtPrice(boostState.bet)}`;

  boostState.crashTimer = setInterval(() => {
    boostState.crashMult = +(boostState.crashMult + 0.04 * boostState.crashMult).toFixed(2);
    const valEl = document.getElementById('crash-val');
    if (!valEl) return clearInterval(boostState.crashTimer);

    if (boostState.crashMult >= crashPoint) {
      clearInterval(boostState.crashTimer);
      boostState.crashActive = false;
      vib('heavy');
      document.getElementById('crash-ico').textContent = '💥';
      valEl.style.color = '#EF4444';
      valEl.textContent = `${crashPoint.toFixed(2)}x`;
      document.getElementById('crash-sub').textContent = 'Ракета взорвалась!';
      btn.textContent = 'ИГРАТЬ СНОВА';
    } else {
      valEl.style.color = '#10B981';
      valEl.textContent = `${boostState.crashMult.toFixed(2)}x`;
      btn.textContent = `💰 ЗАБРАТЬ ${fmtPrice(Math.round(boostState.bet * boostState.crashMult))}`;
    }
  }, 90);
}

function cashoutCrash() {
  clearInterval(boostState.crashTimer);
  boostState.crashActive = false;
  const win = Math.round(boostState.bet * boostState.crashMult);
  st.rub += win; updBal(); vib('heavy');
  document.getElementById('crash-sub').innerHTML = `<b style="color:#10B981">Успел забрать +${fmtPrice(win)}!</b>`;
  document.getElementById('crash-btn').textContent = 'ЗАПУСТИТЬ СНОВА';
  toast(`Забрали ${boostState.crashMult.toFixed(2)}x (+${fmtPrice(win)})!`);
}

// 5. БЛЭКДЖЕК 21
let bj = { active: false, p: [], d: [] };
const bjScore = arr => {
  let s = arr.reduce((a, b) => a + b, 0), aces = arr.filter(x => x === 11).length;
  while (s > 21 && aces--) s -= 10;
  return s;
};
const drawCard21 = () => [, 10, 10, 10, 11][Math.floor(Math.random() * 13)];

function openBlackjack() {
  vib('medium');
  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
      <div class="ctitle" style="font-size:13px">🃏 БЛЭКДЖЕК 21</div>
      <span class="epill">x2</span>
    </div>
    ${!bj.active ? `
      ${renderBetBar('openBlackjack()')}
      <button class="mbtn gold" style="width:100%;padding:13px" onclick="startBJ()">РАЗДАТЬ КАРТЫ</button>
    ` : `
      <div style="background:#161822;border:1px solid #262938;border-radius:16px;padding:14px;margin-bottom:10px">
        <div class="cdesc">Дилер: <b>${bj.d} + ?</b></div>
        <div style="font-size:24px;margin:6px 0">🂠 🂠</div>
      </div>
      <div style="background:#161822;border:1.5px solid #7C3AED;border-radius:16px;padding:14px;margin-bottom:12px">
        <div class="cdesc">Твои очки: <b style="color:#fff;font-size:15px">${bjScore(bj.p)}</b></div>
        <div style="font-size:18px;font-weight:800;margin-top:6px">[ ${bj.p.join(' ]  [ ')} ]</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button class="mbtn" style="padding:12px" onclick="hitBJ()">➕ ЕЩЁ КАРТУ</button>
        <button class="mbtn gold" style="padding:12px" onclick="standBJ()">✋ ХВАТИТ</button>
      </div>
    `}
    <div id="bj-res" style="margin-top:10px"></div>
  `;
}

function startBJ() {
  if (st.rub < boostState.bet) return toast('Недостаточно ₽!');
  st.rub -= boostState.bet; updBal(); vib('heavy');
  bj = { active: true, p: [drawCard21(), drawCard21()], d: [drawCard21(), drawCard21()] };
  openBlackjack();
  if (bjScore(bj.p) === 21) standBJ();
}

function hitBJ() {
  vib('light'); bj.p.push(drawCard21());
  if (bjScore(bj.p) > 21) {
    bj.active = false; openBlackjack();
    document.getElementById('bj-res').innerHTML = `<div class="mrow"><b style="color:#EF4444">Перебор (${bjScore(bj.p)})! Вы проиграли.</b></div>`;
  } else openBlackjack();
}

function standBJ() {
  while (bjScore(bj.d) < 17) bj.d.push(drawCard21());
  const ps = bjScore(bj.p), ds = bjScore(bj.d);
  bj.active = false; openBlackjack();
  let msg = '';
  if (ds > 21 || ps > ds) {
    const win = boostState.bet * 2; st.rub += win; updBal(); vib('heavy');
    msg = `<b style="color:#10B981">ПОБЕДА! (${ps} против ${ds}) +${fmtPrice(win)}</b>`;
  } else if (ps === ds) {
    st.rub += boostState.bet; updBal();
    msg = `<b style="color:#F59E0B">Ничья (${ps}:${ds}) — ставка возвращена</b>`;
  } else {
    msg = `<b style="color:#EF4444">Дилер выиграл (${ds} против ${ps})</b>`;
  }
  document.getElementById('bj-res').innerHTML = `<div class="mrow">${msg}</div>`;
}

// 6. ДУРАК (БЫСТРАЯ ДУЭЛЬ ПРОТИВ ИИ)
let durak = { active: false, pHand: [], bHand: [], trump: '♠️' };
function openDurak() {
  vib('medium');
  const suits = ['♠️', '♣️', '♥️', '♦️'], ranks = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];
  const mkCard = () => ({ r: ranks[Math.floor(Math.random() * 9)], s: suits[Math.floor(Math.random() * 4)], v: Math.floor(Math.random() * 9) });

  if (!durak.active) {
    document.getElementById('app').innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="draw()">‹ Назад</button>
        <div class="ctitle" style="font-size:13px">♠️ ДУРАК 1×1</div>
        <span class="epill">x2</span>
      </div>
      ${renderBetBar('openDurak()')}
      <button class="mbtn gold" style="width:100%;padding:13px" onclick="if(st.rub<boostState.bet)return toast('Недостаточно ₽');st.rub-=boostState.bet;updBal();durak={active:true,trump:suits[Math.floor(Math.random()*4)],pHand:Array.from({length:6},mkCard),bHand:Array.from({length:6},mkCard)};openDurak()">НАЧАТЬ ПАРТИЮ</button>
    `;
    return;
  }

  document.getElementById('app').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <button class="mclose" style="width:auto;padding:0 12px;border-radius:10px;font-size:12px" onclick="durak.active=false;draw()">‹ Сдаться</button>
      <div class="ctitle" style="font-size:13px">Козырь: ${durak.trump}</div>
      <span class="epill">У ИИ: ${durak.bHand.length} карт</span>
    </div>
    <div style="background:#161822;border:1px solid #262938;border-radius:16px;padding:16px;text-align:center;margin-bottom:12px">
      <div class="cdesc">Нажми на карту, чтобы походить (козырь ${durak.trump} бьёт всё)</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      ${durak.pHand.map((c, i) => `<button class="mbtn" style="padding:14px 4px;font-size:14px;background:#161822;border:1px solid ${c.s === durak.trump ? '#F59E0B' : '#3B82F6'}" onclick="playDurakCard(${i})">${c.r} ${c.s}</button>`).join('')}
    </div>
  `;
}

function playDurakCard(idx) {
  vib('medium');
  const pCard = durak.pHand.splice(idx, 1);
  const bIdx = durak.bHand.findIndex(c => (c.s === pCard.s && c.v > pCard.v) || (c.s === durak.trump && pCard.s !== durak.trump));
  if (bIdx !== -1) {
    durak.bHand.splice(bIdx, 1);
    toast(`ИИ отбился от ${pCard.r}${pCard.s}!`);
  } else {
    durak.bHand.push(pCard);
    toast(`ИИ забрал ${pCard.r}${pCard.s}!`);
  }
  if (durak.pHand.length === 0) {
    const win = boostState.bet * 2; st.rub += win; updBal(); durak.active = false; vib('heavy');
    toast(`🏆 ПОБЕДА В ДУРАКА! +${fmtPrice(win)}`);
    openDurak();
  } else if (durak.bHand.length === 0) {
    durak.active = false; toast('ИИ вышел первым — ты остался в дураках!'); openDurak();
  } else openDurak();
}
