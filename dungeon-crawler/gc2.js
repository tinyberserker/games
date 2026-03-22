

// ===================== KLAWIATURA =====================
function getLangBtnAt(mx, my) {
  for (const btn of LANG_BTNS) {
    const bx = W/2 - LANG_BTN_W/2;
    const by = btn.by() - LANG_BTN_H/2;
    if (mx >= bx && mx <= bx+LANG_BTN_W && my >= by && my <= by+LANG_BTN_H) return btn.key;
  }
  return null;
}

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = W / rect.width;
  const scaleY = (H+HUD) / rect.height;
  return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}

canvas.addEventListener('mousemove', e => {
  if (game.state === 'lang') {
    const {x, y} = getCanvasPos(e);
    const hit = getLangBtnAt(x, y);
    langHover = hit;
    canvas.style.cursor = hit ? 'pointer' : 'default';
  } else if (game.state === 'mode') {
    const {x, y} = getCanvasPos(e);
    const hit = getModeBtn(x, y);
    modeHover = hit;
    canvas.style.cursor = hit ? 'pointer' : 'default';
  } else if (game.state === 'difficulty') {
    const {x, y} = getCanvasPos(e);
    const hit = getDiffBtn(x, y);
    diffHover = hit;
    canvas.style.cursor = hit ? 'pointer' : 'default';
  } else {
    canvas.style.cursor = 'default';
  }
});

canvas.addEventListener('click', e => {
  if (game.state === 'lang') {
    const {x, y} = getCanvasPos(e);
    const hit = getLangBtnAt(x, y);
    if (hit) {
      lang = hit;
      langHover = null;
      canvas.style.cursor = 'default';
      applyLang();
      game.state = 'mode';
    }
  } else if (game.state === 'mode') {
    const {x, y} = getCanvasPos(e);
    const hit = getModeBtn(x, y);
    if (hit) {
      inputMode = hit;
      modeHover = null;
      canvas.style.cursor = 'default';
      applyModeLayout();
      game.state = 'difficulty';
    }
  } else if (game.state === 'difficulty') {
    const {x, y} = getCanvasPos(e);
    const hit = getDiffBtn(x, y);
    if (hit) {
      difficulty = hit;
      diffHover = null;
      canvas.style.cursor = 'default';
      game.state = 'title';
    }
  }
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase()==='r') { e.preventDefault(); showTitle(); return; }
  if (game.state === 'lang') {
    if (e.key === 'p' || e.key === 'P') { lang = 'pl'; applyLang(); game.state = 'mode'; return; }
    if (e.key === 'e' || e.key === 'E') { lang = 'en'; applyLang(); game.state = 'mode'; return; }
    return;
  }
  if (game.state === 'mode') {
    if (e.key === 't' || e.key === 'T') { inputMode = 'touch'; applyModeLayout(); game.state = 'difficulty'; return; }
    if (e.key === 'k' || e.key === 'K') { inputMode = 'keyboard'; applyModeLayout(); game.state = 'difficulty'; return; }
    return;
  }
  if (game.state === 'difficulty') {
    if (e.key === '1') { difficulty = 1; game.state = 'title'; return; }
    if (e.key === '2') { difficulty = 2; game.state = 'title'; return; }
    if (e.key === '3') { difficulty = 3; game.state = 'title'; return; }
    if (e.key === '4') { difficulty = 4; game.state = 'title'; return; }
    return;
  }
  if (game.state === 'title') {
    if (e.key === 'Enter') { initGame(); return; }
    if ((e.key === 'c' || e.key === 'C') && canContinue()) { loadSavedGame(); return; }
    if (e.key === 't' || e.key === 'T') { game.state = 'scores'; return; }
    return;
  }
  if (game.state === 'scores') {
    if (e.key === 'Escape' || e.key === 'r' || e.key === 'R') { game.state = 'title'; return; }
    return;
  }
  if (game.state==='dead') { if (e.key==='r'||e.key==='R') initGame(); return; }
  if (game.state==='victory') { if (e.key==='r'||e.key==='R') initGame(); return; }
  if (game.state==='shop') { buyItem(e.key); return; }
  if (game.state==='ability_pick') {
    const idx = parseInt(e.key)-1;
    if (idx>=0 && idx<(game.abilityChoices||[]).length) { applyAbility(game.abilityChoices[idx]); updateTouchUI(); }
    return;
  }
  if (game.state==='playing') {
    if (e.key==='l'||e.key==='L') { game.showScores = !game.showScores; return; }
    if (game.showScores && e.key==='Escape') { game.showScores = false; return; }
    if (game.showScores) return;
    if (e.key==='h'||e.key==='H') {
      const p = game.player;
      if (p.potions > 0) {
        const heal = randInt(30,50);
        p.hp = Math.min(p.maxHp, p.hp + heal);
        p.potions--;
        msg(t('msg_potion_use', heal), '#00ffff');
      } else msg(t('msg_no_potion'), '#ff4444');
      return;
    }
    const moves = {
      'ArrowUp':'u','ArrowDown':'d','ArrowLeft':'l','ArrowRight':'r',
      'w':'u','s':'d','a':'l','d':'r',
      'W':'u','S':'d','A':'l','D':'r',
    };
    const dir = moves[e.key];
    if (dir) {
      e.preventDefault();
      if (dir==='u') move(0,-1);
      if (dir==='d') move(0,1);
      if (dir==='l') move(-1,0);
      if (dir==='r') move(1,0);
    }
  }
});

// ===================== RYSOWANIE =====================
const FONT_SIZE = 14;
const FONT = `${FONT_SIZE}px "Courier New", monospace`;
const FONT_BOLD = `bold ${FONT_SIZE}px "Courier New", monospace`;

const CHAR_COLORS = {
  wall:   '#7a7a8a',
  floor:  '#1e1a2e',
  gold:   '#ffd700',
  potion: '#00eeff',
  stairs: '#c8c8ff',
  enemy:  '#cc3333',
  boss:   '#ff2200',
  player: '#00ff66',
};

function drawChar(x, y, ch, color, bold=false) {
  const px = x * TILE + TILE / 2;
  const py = y * TILE + TILE / 2 + 1;
  ctx.fillStyle = color;
  ctx.font = bold ? FONT_BOLD : FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ch, px, py);
}

function drawTile(x, y) {
  const px = x * TILE, py = y * TILE;
  if (game.grid[y][x] === 1) {
    // Skalna faktura — każdy kafelek ma unikalny odcień
    const hash = (x * 17 + y * 13 + x * y * 3) % 20;
    const dark = hash < 6; // ciemne "szczeliny"
    const bg = dark ? 6 + hash : 10 + hash;
    ctx.fillStyle = `rgb(${bg},${bg},${bg+3})`;
    ctx.fillRect(px, py, TILE, TILE);

    // Kolor znaku — jasniejszy na "wypukłych" kamieniach
    const cr = dark ? 55 + hash*3 : 85 + hash*4;
    const cg = dark ? 52 + hash*3 : 82 + hash*4;
    const cb = dark ? 65 + hash*3 : 95 + hash*4;
    const wallColor = `rgb(${cr},${cg},${cb})`;

    // Różne znaki: '▓' na grubych blokach, '▒' na śr., '░' na krawędziach
    const variant = (x * 7 + y * 11 + hash) % 4;
    const wallCh = variant === 0 ? '░' : variant === 1 ? '▒' : variant === 2 ? '▓' : '▒';
    drawChar(x, y, wallCh, wallColor);

    // Szczeliny między kamieniami (1px linia na niektórych krawędziach)
    if ((x + y * 2) % 3 === 0) {
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py + TILE - 1);
      ctx.lineTo(px + TILE, py + TILE - 1);
      ctx.stroke();
    }
    if ((x * 2 + y) % 3 === 0) {
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px + TILE - 1, py);
      ctx.lineTo(px + TILE - 1, py + TILE);
      ctx.stroke();
    }
  } else {
    // Podłoga kamienna — wyraźnie jaśniejsza i cieplejsza niż ściany
    const fhash = (x * 11 + y * 19 + x * y * 7) % 28;
    const isCrack = fhash < 3;
    const base = 32 + (fhash % 9) * 2;  // zakres 32–48, ściany mają 6–18
    const rb = base + 4;   // lekko ciepły (beżowo-kamienny)
    const gb = base + 1;
    const bb = base - 2;
    ctx.fillStyle = `rgb(${rb},${gb},${bb})`;
    ctx.fillRect(px, py, TILE, TILE);

    // Spoiny między płytami (nieregularny układ)
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 1;
    // Poziome spoiny co 2-3 rzędy (zależnie od x)
    const rowStep = (x % 2 === 0) ? 2 : 3;
    if (y % rowStep === 0) {
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+TILE, py); ctx.stroke();
    }
    // Pionowe spoiny przesunięte o połowę rzędu (cegłowy wzór)
    const colOff = (Math.floor(y / rowStep) % 2) * Math.floor(TILE/2);
    if ((px + colOff) % (TILE * 2) < 1.5) {
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py+TILE); ctx.stroke();
    }

    // Faktura — subtelny znak (ciemniejszy niż tło)
    const cr = base - 10, cg = base - 11, cb = base - 8;
    if (isCrack) {
      drawChar(x, y, '\'', `rgb(${cr-4},${cg-4},${cb-2})`);
    } else if (fhash % 7 === 0) {
      drawChar(x, y, '.', `rgb(${cr},${cg},${cb})`);
    } else {
      drawChar(x, y, ' ', '#000');
    }
  }
}

function drawStairs(cx, cy) {
  const steps = 4;
  const totalW = 10, totalH = 10;
  const sx = cx - totalW/2, sy = cy - totalH/2;
  const stepH = totalH / steps;
  const stepW = totalW / steps;

  // Cień pod schodami
  ctx.globalAlpha = 0.3; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx, cy+1, 5.5, 2, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Stopnie — od najszerszego (góra) do najwęższego (dół/ciemność)
  for (let i = 0; i < steps; i++) {
    const t  = i / steps;           // 0 = górny, 1 = dolny
    const wx = sx + i * stepW/2;
    const wy = sy + i * stepH;
    const ww = totalW - i * stepW;
    const wh = stepH;

    // Wypełnienie stopnia — coraz ciemniejsze w głąb
    const light = Math.floor(110 - i * 22);
    ctx.fillStyle = `rgb(${light},${light-5},${light+8})`;
    ctx.fillRect(wx, wy, ww, wh);

    // Krawędź górna stopnia (jasna — oświetlona)
    ctx.strokeStyle = `rgb(${Math.min(255,light+50)},${Math.min(255,light+45)},${Math.min(255,light+55)})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx+ww, wy); ctx.stroke();

    // Krawędź boczna lewa i prawa (cień)
    ctx.strokeStyle = `rgb(${light-30},${light-35},${light-20})`;
    ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy+wh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wx+ww, wy); ctx.lineTo(wx+ww, wy+wh); ctx.stroke();
  }

  // Otchłań na dole (czarna dziura)
  const lastX = sx + steps * stepW/2;
  const lastW = totalW - steps * stepW;
  ctx.fillStyle = '#000';
  ctx.fillRect(lastX, sy + totalH, lastW, 2);

  // Delikatna poświata (zachęca gracza)
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, TILE*0.8);
  glow.addColorStop(0,   'rgba(200,200,255,0.12)');
  glow.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(cx-TILE, cy-TILE, TILE*2, TILE*2);
}

function drawPotion(cx, cy) {
  ctx.save();
  // Poświata zielona
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, TILE*0.8);
  glow.addColorStop(0,   'rgba(0,255,80,0.28)');
  glow.addColorStop(0.5, 'rgba(0,180,40,0.12)');
  glow.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(cx-TILE, cy-TILE, TILE*2, TILE*2);

  // Cień
  ctx.globalAlpha = 0.28; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx, cy+5.5, 3.5, 1.1, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Korpus butelki — okrągły kształt (baniaste dno)
  ctx.fillStyle = '#081a10'; ctx.strokeStyle = '#00aa44'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx-1.4, cy-1.5);
  ctx.bezierCurveTo(cx-4.5, cy-1, cx-4.5, cy+5.5, cx, cy+6);
  ctx.bezierCurveTo(cx+4.5, cy+5.5, cx+4.5, cy-1, cx+1.4, cy-1.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // Ciecz (zielona, z gradientem głębi)
  const liqGrd = ctx.createRadialGradient(cx-1, cy+2, 0.5, cx, cy+3, 4);
  liqGrd.addColorStop(0, '#60ff90');
  liqGrd.addColorStop(0.4, '#00cc44');
  liqGrd.addColorStop(1, '#003a14');
  ctx.fillStyle = liqGrd;
  ctx.beginPath();
  ctx.moveTo(cx-1.3, cy-1);
  ctx.bezierCurveTo(cx-4, cy-0.5, cx-4, cy+5, cx, cy+5.5);
  ctx.bezierCurveTo(cx+4, cy+5, ctx+4, cy-0.5, cx+1.3, cy-1);
  ctx.closePath(); ctx.fill();

  // Pęcherzyki powietrza w cieczy
  ctx.strokeStyle = 'rgba(150,255,180,0.7)'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.arc(cx-1.2, cy+2.5, 0.7, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1, cy+3.8, 0.5, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx-0.3, cy+4.5, 0.4, 0, Math.PI*2); ctx.stroke();

  // Szkło — odblask lewy
  ctx.fillStyle = 'rgba(200,255,220,0.3)';
  ctx.beginPath(); ctx.ellipse(cx-2, cy+1.5, 0.9, 2.2, -0.3, 0, Math.PI*2); ctx.fill();
  // Szkło — mały błysk prawy
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath(); ctx.ellipse(cx+2, cy+3, 0.5, 1, 0.3, 0, Math.PI*2); ctx.fill();

  // Szyjka
  const neckGrd = ctx.createLinearGradient(cx-1.5, cy-1.5, cx+1.5, cy-1.5);
  neckGrd.addColorStop(0, '#003010'); neckGrd.addColorStop(0.5, '#006622'); neckGrd.addColorStop(1, '#002a0e');
  ctx.fillStyle = neckGrd; ctx.strokeStyle = '#00aa44'; ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx-1.4, cy-1.5); ctx.lineTo(cx-1.1, cy-4); ctx.lineTo(cx+1.1, cy-4); ctx.lineTo(cx+1.4, cy-1.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // Obręcz na szyjce (złota)
  ctx.strokeStyle = '#c8a000'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(cx-1.3, cy-2.8); ctx.lineTo(cx+1.3, cy-2.8); ctx.stroke();

  // Korek (drewniany, karbowany)
  const corkGrd = ctx.createLinearGradient(cx-1.3, cy-5.5, cx+1.3, cy-3.8);
  corkGrd.addColorStop(0, '#c8903a'); corkGrd.addColorStop(0.5, '#a06820'); corkGrd.addColorStop(1, '#7a4808');
  ctx.fillStyle = corkGrd; ctx.strokeStyle = '#5a3000'; ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx-1.1, cy-4); ctx.lineTo(cx-1.3, cy-5.2); ctx.lineTo(cx+1.3, cy-5.2); ctx.lineTo(cx+1.1, cy-4);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Karby korka
  ctx.strokeStyle = '#7a4808'; ctx.lineWidth = 0.4;
  ctx.beginPath(); ctx.moveTo(cx-1.2, cy-4.4); ctx.lineTo(cx+1.2, cy-4.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-1.25, cy-4.8); ctx.lineTo(cx+1.25, cy-4.8); ctx.stroke();

  // Zielony blask u dołu (ciecz świeci)
  ctx.strokeStyle = 'rgba(0,255,80,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx-1.3, cy-1);
  ctx.bezierCurveTo(cx-4, cy-0.5, cx-4, cy+5, cx, cy+5.5);
  ctx.bezierCurveTo(cx+4, cy+5, cx+4, cy-0.5, cx+1.3, cy-1);
  ctx.closePath(); ctx.stroke();

  ctx.restore();
}

function drawTrapRevealed(cx, cy) {
  ctx.save();
  ctx.strokeStyle = '#ff4400'; ctx.lineWidth = 1.5;
  ctx.fillStyle = '#3a0000';
  ctx.fillRect(cx-7, cy-7, 14, 14);
  ctx.strokeRect(cx-7, cy-7, 14, 14);
  ctx.fillStyle = '#ff4400';
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('✕', cx, cy+4);
  ctx.restore();
}

function drawChest(cx, cy) {
  ctx.save();
  const pulse = 0.7 + 0.3*Math.sin(Date.now()/400);
  // Skrzynia
  ctx.fillStyle = '#6b3a00';
  ctx.fillRect(cx-7, cy-4, 14, 9);
  ctx.fillStyle = '#8b5a00';
  ctx.fillRect(cx-7, cy-6, 14, 4);
  // Obramowanie
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1;
  ctx.strokeRect(cx-7, cy-6, 14, 13);
  // Zapięcie
  ctx.fillStyle = `rgba(255,215,0,${pulse})`;
  ctx.fillRect(cx-2, cy-2, 4, 4);
  ctx.restore();
}

function drawGoldBag(cx, cy) {
  ctx.save();
  // Poświata złota
  const glow = ctx.createRadialGradient(cx, cy+1, 0, cx, cy+1, TILE*0.75);
  glow.addColorStop(0,   'rgba(255,200,0,0.22)');
  glow.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(cx-TILE, cy-TILE, TILE*2, TILE*2);

  // Cień
  ctx.globalAlpha = 0.32; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx, cy+6.5, 4.5, 1.3, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // ===== MONETY WYSYPUJĄCE SIĘ PO PRAWEJ =====
  const coinColors = ['#ffd700','#f0c000','#e8b800'];
  const coins = [[cx+4.5,cy+2,1.1,0.5,0.1],[cx+4,cy+3.8,1,0.45,0],[cx+5,cy+4.5,0.9,0.4,-0.1],[cx+3.2,cy+5,1,0.42,0.15]];
  for (const [ex,ey,rx,ry,rot] of coins) {
    ctx.fillStyle = coinColors[Math.floor(ex)%3]; ctx.strokeStyle = '#a07800'; ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, rot, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,150,0.4)';
    ctx.beginPath(); ctx.ellipse(ex-rx*0.3, ey-ry*0.2, rx*0.4, ry*0.35, rot, 0, Math.PI*2); ctx.fill();
  }

  // ===== WOREK =====
  // Podkład (ciemna skóra)
  ctx.fillStyle = '#6a3e00';
  ctx.beginPath();
  ctx.moveTo(cx-1.8, cy-2.8);
  ctx.bezierCurveTo(cx-6, cy-1.5, cx-6, cy+6, cx-0.5, cy+7);
  ctx.bezierCurveTo(cx+5, cy+6.5, cx+5, cy-1, cx+1.8, cy-2.8);
  ctx.closePath(); ctx.fill();

  // Gradient skóry
  const bagGrd = ctx.createRadialGradient(cx-1.5, cy+0.5, 1, cx+0.5, cy+2.5, 6.5);
  bagGrd.addColorStop(0,   '#f0b030');
  bagGrd.addColorStop(0.35,'#d08818');
  bagGrd.addColorStop(0.7, '#a06010');
  bagGrd.addColorStop(1,   '#5a3200');
  ctx.fillStyle = bagGrd;
  ctx.beginPath();
  ctx.moveTo(cx-1.8, cy-2.8);
  ctx.bezierCurveTo(cx-6, cy-1.5, cx-6, cy+6, cx-0.5, cy+7);
  ctx.bezierCurveTo(cx+5, cy+6.5, cx+5, cy-1, cx+1.8, cy-2.8);
  ctx.closePath(); ctx.fill();

  // Szew pionowy (środek worka)
  ctx.strokeStyle = 'rgba(90,50,0,0.5)'; ctx.lineWidth = 0.6; ctx.lineCap = 'round';
  ctx.setLineDash([1.2, 1.5]);
  ctx.beginPath(); ctx.moveTo(cx-0.2, cy-1.5); ctx.bezierCurveTo(cx-0.5, cy+2, cx-0.3, cy+5.5, cx-0.5, cy+7); ctx.stroke();
  ctx.setLineDash([]);

  // Fałdy tkaniny
  ctx.strokeStyle = 'rgba(80,45,0,0.55)'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(cx-1.2, cy-2.2); ctx.bezierCurveTo(cx-4, cy+0.5, cx-4.5, cy+4, cx-3, cy+6.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1, cy-2.2); ctx.bezierCurveTo(cx+3, cy+0.5, cx+3, cy+4, cx+2, cy+6.5); ctx.stroke();

  // Poziome marszczenia (tkanina pełna złota)
  ctx.strokeStyle = 'rgba(80,45,0,0.35)'; ctx.lineWidth = 0.5;
  for (let i=0; i<3; i++) {
    const oy = cy + 1 + i*2;
    ctx.beginPath(); ctx.moveTo(cx-4.5+i*0.3, oy); ctx.bezierCurveTo(cx-2, oy-0.4, cx+2, oy-0.4, cx+3.5-i*0.3, oy); ctx.stroke();
  }

  // Błysk wypukłości
  ctx.fillStyle = 'rgba(255,235,130,0.32)';
  ctx.beginPath(); ctx.ellipse(cx-1.8, cy+1.5, 1.3, 2.8, -0.35, 0, Math.PI*2); ctx.fill();

  // Kontur worka
  ctx.strokeStyle = '#4a2800'; ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(cx-1.8, cy-2.8);
  ctx.bezierCurveTo(cx-6, cy-1.5, cx-6, cy+6, cx-0.5, cy+7);
  ctx.bezierCurveTo(cx+5, cy+6.5, cx+5, cy-1, cx+1.8, cy-2.8);
  ctx.closePath(); ctx.stroke();

  // ===== SZYJKA =====
  const neckGrd = ctx.createLinearGradient(cx-2, cy-3, cx+2, cy-3);
  neckGrd.addColorStop(0, '#4a2800'); neckGrd.addColorStop(0.5, '#8a5510'); neckGrd.addColorStop(1, '#4a2800');
  ctx.fillStyle = neckGrd; ctx.strokeStyle = '#3a1e00'; ctx.lineWidth = 0.9;
  ctx.beginPath(); ctx.ellipse(cx, cy-2.8, 2.2, 1.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // ===== SZNUREK =====
  ctx.strokeStyle = '#c89040'; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.ellipse(cx, cy-3.8, 2, 0.65, 0, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = '#a07020'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.ellipse(cx, cy-3.8, 2, 0.65, 0, 0, Math.PI*2); ctx.stroke();

  // ===== KOKARDA =====
  ctx.fillStyle = '#c89040'; ctx.strokeStyle = '#7a4808'; ctx.lineWidth = 0.7;
  // lewa pętla
  ctx.beginPath(); ctx.ellipse(cx-2.4, cy-5.4, 1.4, 0.85, 0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // prawa pętla
  ctx.beginPath(); ctx.ellipse(cx+2.4, cy-5.4, 1.4, 0.85, -0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // lewy koniec sznurka
  ctx.strokeStyle = '#c89040'; ctx.lineWidth = 1.1;
  ctx.beginPath(); ctx.moveTo(cx-1, cy-4.8); ctx.bezierCurveTo(cx-1.5, cy-3.2, cx-3, cy-2.5, cx-3.5, cy-1.5); ctx.stroke();
  // prawy koniec sznurka
  ctx.beginPath(); ctx.moveTo(cx+1, cy-4.8); ctx.bezierCurveTo(cx+1.5, cy-3.2, cx+2.8, cy-2.8, cx+3, cy-1.8); ctx.stroke();
  // węzeł środkowy
  const knotGrd = ctx.createRadialGradient(cx, cy-4.9, 0.2, cx, cy-4.9, 1.2);
  knotGrd.addColorStop(0, '#f0c050'); knotGrd.addColorStop(1, '#7a4808');
  ctx.fillStyle = knotGrd; ctx.strokeStyle = '#5a3000'; ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.ellipse(cx, cy-4.9, 1.1, 0.9, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // ===== MONETY W USTACH WORKA =====
  ctx.fillStyle = '#ffd700'; ctx.strokeStyle = '#a07800'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.ellipse(cx-0.9, cy-3.4, 1.2, 0.55, -0.1, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+0.8, cy-3.1, 1, 0.45, 0.15, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // blask monet
  ctx.fillStyle = 'rgba(255,255,180,0.5)';
  ctx.beginPath(); ctx.ellipse(cx-1.1, cy-3.55, 0.45, 0.2, -0.1, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+0.6, cy-3.25, 0.4, 0.18, 0.15, 0, Math.PI*2); ctx.fill();

  ctx.restore();
}

function drawGoblin(cx, cy) {
  // Cień
  ctx.globalAlpha = 0.28; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx+0.5, cy+5.5, 4, 1.3, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Nogi (chude, zgięte)
  ctx.strokeStyle = '#2a5008'; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx-1.2, cy+2.5); ctx.lineTo(cx-2.5, cy+5); ctx.lineTo(cx-1.5, cy+6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.2, cy+2.5); ctx.lineTo(cx+2.5, cy+5); ctx.lineTo(cx+1.8, cy+6); ctx.stroke();

  // Sztylet (lewy bok, za plecami)
  ctx.strokeStyle = '#888'; ctx.lineWidth = 1; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx-3.5, cy-0.5); ctx.lineTo(cx-5.5, cy+3); ctx.stroke();
  ctx.strokeStyle = '#5a3a00'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx-4.5, cy+1.8); ctx.lineTo(cx-3.2, cy+0.8); ctx.stroke(); // jelec

  // Ciało — gradient skóry
  const bodyGrad = ctx.createRadialGradient(cx-0.8, cy, 0.5, cx, cy+1.5, 4);
  bodyGrad.addColorStop(0,   '#6aaa1a');
  bodyGrad.addColorStop(0.6, '#3a7a08');
  bodyGrad.addColorStop(1,   '#1e4a00');
  ctx.fillStyle = bodyGrad; ctx.strokeStyle = '#1a3a00'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.ellipse(cx, cy+1.5, 2.8, 3.2, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // Łaty na ubraniu (szmaty)
  ctx.fillStyle = 'rgba(90,50,0,0.45)';
  ctx.beginPath(); ctx.ellipse(cx-0.8, cy+2, 1.2, 0.8, 0.4, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+0.9, cy+3.5, 1, 0.7, -0.3, 0, Math.PI*2); ctx.fill();

  // Prawa ręka (wyciągnięta z wrzaskiem)
  ctx.strokeStyle = '#3a7008'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx+2.5, cy+0.5); ctx.quadraticCurveTo(cx+5, cy-1, cx+5.5, cy+1.5); ctx.stroke();
  // Szpony
  ctx.strokeStyle = '#1a3a00'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(cx+5.5, cy+1.5); ctx.lineTo(cx+6.5, cy+0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+5.5, cy+1.5); ctx.lineTo(cx+6.8, cy+2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+5.5, cy+1.5); ctx.lineTo(cx+6.2, cy+3); ctx.stroke();

  // Uszy (szpiczaste, z żyłką wewnętrzną)
  ctx.fillStyle = '#3a7008'; ctx.strokeStyle = '#1a3a00'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(cx-2.5, cy-4); ctx.lineTo(cx-5.5, cy-7.5); ctx.lineTo(cx-1.8, cy-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2.5, cy-4); ctx.lineTo(cx+5.5, cy-7.5); ctx.lineTo(cx+1.8, cy-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Żyłka w uchu
  ctx.strokeStyle = '#5aaa10'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(cx-2.8, cy-4.5); ctx.lineTo(cx-4.5, cy-6.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2.8, cy-4.5); ctx.lineTo(cx+4.5, cy-6.5); ctx.stroke();

  // Głowa — gradient
  const headGrad = ctx.createRadialGradient(cx-0.8, cy-4.5, 0.5, cx, cy-3.5, 3.5);
  headGrad.addColorStop(0,   '#7acc22');
  headGrad.addColorStop(0.7, '#4a9010');
  headGrad.addColorStop(1,   '#2a5a00');
  ctx.fillStyle = headGrad; ctx.strokeStyle = '#1a3a00'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy-3.5, 3.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // Nos — guzowaty
  ctx.fillStyle = '#2a5a00'; ctx.strokeStyle = '#1a3a00'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.ellipse(cx, cy-3.2, 1.1, 0.7, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Nozdrza
  ctx.fillStyle = '#1a3a00';
  ctx.beginPath(); ctx.arc(cx-0.5, cy-3.2, 0.3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.5, cy-3.2, 0.3, 0, Math.PI*2); ctx.fill();

  // Oczy — intensywnie żółte ze szczeliną
  ctx.fillStyle = '#ffe000';
  ctx.beginPath(); ctx.ellipse(cx-1.2, cy-4.5, 1, 0.8, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.2, cy-4.5, 1, 0.8, 0, 0, Math.PI*2); ctx.fill();
  // Źrenica pionowa (jak gad)
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx-1.2, cy-4.5, 0.3, 0.7, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.2, cy-4.5, 0.3, 0.7, 0, 0, Math.PI*2); ctx.fill();
  // Blask w oku
  ctx.fillStyle = 'rgba(255,255,200,0.7)';
  ctx.beginPath(); ctx.arc(cx-1.5, cy-4.8, 0.25, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.9, cy-4.8, 0.25, 0, Math.PI*2); ctx.fill();

  // Zęby — sterczące
  ctx.fillStyle = '#f0e8c0'; ctx.strokeStyle = '#aaa'; ctx.lineWidth = 0.4;
  ctx.beginPath(); ctx.moveTo(cx-1.8, cy-2.5); ctx.lineTo(cx-1.4, cy-1.2); ctx.lineTo(cx-0.9, cy-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+0.9, cy-2.5); ctx.lineTo(cx+1.3, cy-1.2); ctx.lineTo(cx+1.8, cy-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
}

function drawSzkielet(cx, cy) {
  // Cień
  ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx, cy+5, 3, 1.2, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;
  // Kości nóg
  ctx.strokeStyle = '#c8c0b0'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx-1.2, cy+2); ctx.lineTo(cx-1.8, cy+5.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.2, cy+2); ctx.lineTo(cx+1.8, cy+5.5); ctx.stroke();
  // Żebra
  ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 0.8;
  for (let i=0; i<3; i++) {
    const ry = cy - 0.5 + i*1.4;
    ctx.beginPath(); ctx.moveTo(cx-1.8, ry); ctx.lineTo(cx+1.8, ry); ctx.stroke();
  }
  // Kręgosłup
  ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy-1.5); ctx.lineTo(cx, cy+2); ctx.stroke();
  // Ręce (kości)
  ctx.strokeStyle = '#c8c0b0'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(cx-1.8, cy-1); ctx.lineTo(cx-4.5, cy+1.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.8, cy-1); ctx.lineTo(cx+4.5, cy+1.5); ctx.stroke();
  // Miecz w kościanej dłoni
  ctx.strokeStyle = '#b8b8cc'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(cx+4, cy-0.5); ctx.lineTo(cx+6, cy+4); ctx.stroke();
  ctx.strokeStyle = '#888'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx+3.2, cy+1.5); ctx.lineTo(cx+5.2, cy+1.5); ctx.stroke();
  // Czaszka
  ctx.fillStyle = '#e8e0d0'; ctx.strokeStyle = '#888'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy-4, 3.2, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Szczęka
  ctx.fillStyle = '#d8d0c0'; ctx.strokeStyle = '#888';
  ctx.beginPath(); ctx.ellipse(cx, cy-2.2, 2.2, 1, 0, 0, Math.PI); ctx.fill(); ctx.stroke();
  // Oczodoły (puste, czarne)
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.ellipse(cx-1.2, cy-4.2, 1, 0.9, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.2, cy-4.2, 1, 0.9, 0, 0, Math.PI*2); ctx.fill();
  // Nos (trójkąt)
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.moveTo(cx, cy-2.8); ctx.lineTo(cx-0.5, cy-2); ctx.lineTo(cx+0.5, cy-2); ctx.closePath(); ctx.fill();
}

function drawTroll(cx, cy) {
  ctx.save();
  // Cień
  ctx.globalAlpha = 0.35; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.ellipse(cx, cy+6, 5.5, 1.8, 0, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Nogi — grube, przysiadnięte
  const legGrd = ctx.createLinearGradient(cx-5, cy+1, cx+5, cy+1);
  legGrd.addColorStop(0, '#2e4a1e'); legGrd.addColorStop(0.5, '#3f6128'); legGrd.addColorStop(1, '#1e3010');
  ctx.fillStyle = legGrd; ctx.strokeStyle = '#111'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.ellipse(cx-2.2, cy+5, 2, 2.5, 0.15, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+2.2, cy+5, 2, 2.5, -0.15, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Stopy
  ctx.fillStyle = '#1e3010'; ctx.strokeStyle = '#000'; ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.ellipse(cx-2.5, cy+7, 2.2, 1, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+2.5, cy+7, 2.2, 1, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // MACZUGA — za ramieniem (lewa ręka)
  // Trzonek
  ctx.strokeStyle = '#7a5520'; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx-5.5, cy+3); ctx.lineTo(cx-7.5, cy-5); ctx.stroke();
  ctx.strokeStyle = '#5a3a10'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.moveTo(cx-5.5, cy+3); ctx.lineTo(cx-7.5, cy-5); ctx.stroke();
  // Głowica maczugi
  const clubGrd = ctx.createRadialGradient(cx-7.8, cy-6.5, 0.5, cx-7.5, cy-6.5, 3);
  clubGrd.addColorStop(0, '#8a7060'); clubGrd.addColorStop(0.5, '#5a4030'); clubGrd.addColorStop(1, '#2a1808');
  ctx.fillStyle = clubGrd; ctx.strokeStyle = '#1a0800'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.arc(cx-7.5, cy-6.5, 2.8, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Kolce maczugi
  ctx.fillStyle = '#c0b090'; ctx.strokeStyle = '#444'; ctx.lineWidth = 0.5;
  const spikeAngles = [0, 0.9, 1.7, 2.6, 3.5, 4.4, 5.2];
  for (const a of spikeAngles) {
    const sx = cx-7.5 + Math.cos(a)*2.8, sy = cy-6.5 + Math.sin(a)*2.8;
    const ex = cx-7.5 + Math.cos(a)*4.2, ey = cy-6.5 + Math.sin(a)*4.2;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.beginPath(); ctx.arc(ex, ey, 0.55, 0, Math.PI*2); ctx.fillStyle='#c0b090'; ctx.fill();
  }
  // Łańcuch na maczudze
  ctx.strokeStyle = '#888'; ctx.lineWidth = 0.8;
  for (let i=0; i<3; i++) {
    const t = i/3, nx = cx-5.5 + (cx-7.5 - (cx-5.5))*t, ny = cy+3 + (cy-5 - (cy+3))*t;
    ctx.beginPath(); ctx.arc(nx, ny, 0.7, 0, Math.PI*2); ctx.stroke();
  }

  // CIAŁO — masywne, garbate
  const bodyGrd = ctx.createRadialGradient(cx-1, cy, 1.5, cx, cy+1, 5.5);
  bodyGrd.addColorStop(0, '#4a7030'); bodyGrd.addColorStop(0.5, '#355220'); bodyGrd.addColorStop(1, '#1a2e0c');
  ctx.fillStyle = bodyGrd; ctx.strokeStyle = '#111'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(cx, cy+1, 5, 4.5, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Garb / wypukłości ciała
  ctx.fillStyle = 'rgba(255,255,200,0.04)';
  ctx.beginPath(); ctx.ellipse(cx-1.5, cy-0.5, 2, 1.5, -0.4, 0, Math.PI*2); ctx.fill();
  // Brodawki na ciele
  ctx.strokeStyle = '#1a2e0c'; ctx.lineWidth = 0.5;
  for (const [bx,by] of [[cx-2,cy+1],[cx+1.5,cy],[cx-0.5,cy+2.5],[cx+3,cy+2]]) {
    ctx.beginPath(); ctx.arc(bx, by, 0.6, 0, Math.PI*2); ctx.fillStyle='#2e4820'; ctx.fill(); ctx.stroke();
  }

  // RAMIONA — ogromne
  const armGrd = ctx.createLinearGradient(cx-7, cy-1, cx+7, cy-1);
  armGrd.addColorStop(0, '#1e3010'); armGrd.addColorStop(0.35, '#3f6128'); armGrd.addColorStop(0.65, '#3f6128'); armGrd.addColorStop(1, '#1e3010');
  ctx.fillStyle = armGrd; ctx.strokeStyle = '#111'; ctx.lineWidth = 0.8;
  // Lewe ramię (trzyma maczugę)
  ctx.beginPath(); ctx.ellipse(cx-5.5, cy-0.5, 2.5, 1.8, -0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Prawe ramię (wyciągnięte)
  ctx.beginPath(); ctx.ellipse(cx+5, cy-0.5, 2.5, 1.8, 0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Pięść prawa (pazury)
  ctx.fillStyle = '#2e4820'; ctx.strokeStyle = '#111'; ctx.lineWidth = 0.7;
  ctx.beginPath(); ctx.arc(cx+6.8, cy-1, 1.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#c8b060'; ctx.lineWidth = 0.9; ctx.lineCap = 'round';
  for (let i=0; i<4; i++) {
    const a = -0.4 + i*0.28;
    ctx.beginPath(); ctx.moveTo(cx+6.8+Math.cos(a)*1.4, cy-1+Math.sin(a)*1.4);
    ctx.lineTo(cx+6.8+Math.cos(a)*2.6, cy-1+Math.sin(a)*2.6); ctx.stroke();
  }

  // GŁOWA — szeroka, kanciasta
  const headGrd = ctx.createRadialGradient(cx-1, cy-5.5, 0.5, cx, cy-4.5, 5);
  headGrd.addColorStop(0, '#50783a'); headGrd.addColorStop(0.6, '#35521e'); headGrd.addColorStop(1, '#1a2e0c');
  ctx.fillStyle = headGrd; ctx.strokeStyle = '#0d1a06'; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx-4.5, cy-2);
  ctx.bezierCurveTo(cx-5, cy-5, cx-4, cy-9, cx, cy-9.5);
  ctx.bezierCurveTo(cx+4, cy-9, cx+5, cy-5, cx+4.5, cy-2);
  ctx.bezierCurveTo(cx+2, cy-1.5, cx-2, cy-1.5, cx-4.5, cy-2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Brodawki na głowie
  ctx.strokeStyle = '#1a2e0c'; ctx.lineWidth = 0.4;
  for (const [bx,by] of [[cx-3,cy-4],[cx+2.5,cy-5],[cx-1,cy-8],[cx+3.5,cy-3]]) {
    ctx.beginPath(); ctx.arc(bx, by, 0.5, 0, Math.PI*2); ctx.fillStyle='#2a4418'; ctx.fill(); ctx.stroke();
  }
  // Nos — szeroki, bulwiasty
  const noseGrd = ctx.createRadialGradient(cx, cy-5, 0.3, cx, cy-5, 1.8);
  noseGrd.addColorStop(0, '#4a6830'); noseGrd.addColorStop(1, '#2a3e18');
  ctx.fillStyle = noseGrd; ctx.strokeStyle = '#111'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.ellipse(cx, cy-5, 1.8, 1.3, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#0d1206';
  ctx.beginPath(); ctx.ellipse(cx-0.7, cy-5.1, 0.55, 0.45, 0.3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+0.7, cy-5.1, 0.55, 0.45, -0.3, 0, Math.PI*2); ctx.fill();
  // Brwi — grube, zmarszczone
  ctx.fillStyle = '#1a2e0c'; ctx.strokeStyle = '#0d1206'; ctx.lineWidth = 0.4;
  ctx.beginPath(); ctx.ellipse(cx-1.8, cy-7, 1.8, 0.9, -0.4, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+1.8, cy-7, 1.8, 0.9, 0.4, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Oczy — żółte, świecące
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath(); ctx.arc(cx-1.8, cy-6, 1.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.8, cy-6, 1.2, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#ff8800';
  ctx.beginPath(); ctx.arc(cx-1.8, cy-6, 0.8, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.8, cy-6, 0.8, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#1a0a00';
  ctx.beginPath(); ctx.arc(cx-1.7, cy-6, 0.45, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.7, cy-6, 0.45, 0, Math.PI*2); ctx.fill();
  // Blask oczu
  ctx.strokeStyle = 'rgba(255,180,0,0.5)'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.arc(cx-1.8, cy-6, 1.5, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1.8, cy-6, 1.5, 0, Math.PI*2); ctx.stroke();
  // Usta — otwarte, kły
  ctx.fillStyle = '#0d0808'; ctx.strokeStyle = '#0d0808'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.ellipse(cx, cy-3.2, 2.2, 1, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  // Kły — dwa duże w górę
  ctx.fillStyle = '#e8dfc0'; ctx.strokeStyle = '#aaa'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(cx-1.5, cy-3.2); ctx.lineTo(cx-1.1, cy-1.2); ctx.lineTo(cx-0.5, cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+0.5, cy-3.2); ctx.lineTo(cx+1.1, cy-1.2); ctx.lineTo(cx+1.5, cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Małe zęby
  ctx.fillStyle = '#d0c8a8'; ctx.strokeStyle = '#999'; ctx.lineWidth = 0.3;
  for (let i=-1; i<=1; i+=1) {
    ctx.beginPath(); ctx.moveTo(cx+i*0.9-0.4, cy-3.2); ctx.lineTo(cx+i*0.9, cy-2.4); ctx.lineTo(cx+i*0.9+0.4, cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  // Blizna na twarzy
  ctx.strokeStyle = '#1a2e0c'; ctx.lineWidth = 0.8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx+3, cy-7.5); ctx.lineTo(cx+2.2, cy-4.5); ctx.stroke();

  ctx.restore();
}

function drawBoss(cx, cy, bossName) {
  switch(bossName) {
    case 'Smok':        drawBossSmok(cx, cy);       break;
    case 'Demon':       drawBossDemon(cx, cy);      break;
    case 'Lich':        drawBossLich(cx, cy);       break;
    case 'Wampir':      drawBossWampir(cx, cy);     break;
    case 'Golem':       drawBossGolem(cx, cy);      break;
    case 'Mroczny Bóg': drawBossMrocznyBog(cx, cy); break;
    default:            drawBossDemon(cx, cy);      break;
  }
}