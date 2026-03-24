

// ===== BOSS 6: MROCZNY BÓG =====
function drawBossMrocznyBog(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/180)*0.5+0.5;
  const p2 = Math.sin(Date.now()/250+1)*0.5+0.5;
  // Poświata kosmiczna (fiolet+czerń)
  const glowR=TILE*1.3+p*5;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(80,0,180,${0.5+p*0.2})`);
  glow.addColorStop(0.4,`rgba(20,0,60,0.3)`);
  glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  // Gwiazdy w aura
  ctx.fillStyle=`rgba(255,255,255,${0.2+p*0.3})`;
  const stars=[[cx-5,cy-3],[cx+6,cy-5],[cx-7,cy+1],[cx+4,cy+5],[cx-3,cy+6],[cx+7,cy+3],[cx-6,cy-7]];
  for(const [sx,sy] of stars){ ctx.beginPath(); ctx.arc(sx,sy,0.4,0,Math.PI*2); ctx.fill(); }
  // Cień
  ctx.globalAlpha=0.35; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,6,2,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  // MACKI (za ciałem)
  const tentacleColor='#180030';
  const tentacles=[
    [cx-3,cy+2, cx-9,cy-2, cx-10,cy+6],
    [cx-2,cy+3, cx-5,cy+9, cx-9,cy+7],
    [cx+3,cy+2, cx+9,cy-2, cx+10,cy+6],
    [cx+2,cy+3, cx+5,cy+9, cx+9,cy+7],
    [cx,cy+4,   cx-3,cy+10, cx+1,cy+12],
  ];
  for(const [x1,y1,x2,y2,x3,y3] of tentacles){
    ctx.strokeStyle='#2a0055'; ctx.lineWidth=2.2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.bezierCurveTo(x2,y2,x2,y2,x3,y3); ctx.stroke();
    ctx.strokeStyle='#4a0090'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.bezierCurveTo(x2,y2,x2,y2,x3,y3); ctx.stroke();
    // Przyssawki
    ctx.fillStyle=`rgba(100,0,180,0.6)`; ctx.strokeStyle='#3a0070'; ctx.lineWidth=0.4;
    const mid=[x1+(x3-x1)*0.4, y1+(y3-y1)*0.4];
    ctx.beginPath(); ctx.arc(mid[0],mid[1],0.8,0,Math.PI*2); ctx.fill(); ctx.stroke();
    const mid2=[x1+(x3-x1)*0.7, y1+(y3-y1)*0.7];
    ctx.beginPath(); ctx.arc(mid2[0],mid2[1],0.6,0,Math.PI*2); ctx.fill(); ctx.stroke();
  }
  // Ciało — bezkształtna mgła
  const bodyG=ctx.createRadialGradient(cx,cy,0,cx,cy,7);
  bodyG.addColorStop(0,`rgba(80,0,160,${0.9+p*0.1})`);
  bodyG.addColorStop(0.4,`rgba(40,0,100,0.85)`);
  bodyG.addColorStop(0.8,`rgba(10,0,40,0.7)`);
  bodyG.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=bodyG;
  ctx.beginPath(); ctx.ellipse(cx,cy,6.5+p*0.5,7+p2*0.5,p*0.15,0,Math.PI*2); ctx.fill();
  // Kontur ciała (falujący)
  ctx.strokeStyle=`rgba(140,0,255,${0.4+p*0.3})`; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy,6.5+p*0.5,7+p2*0.5,p*0.15,0,Math.PI*2); ctx.stroke();
  // Wewnętrzny blask
  const innerG=ctx.createRadialGradient(cx,cy-1,0.5,cx,cy,4);
  innerG.addColorStop(0,`rgba(200,100,255,${0.3+p*0.2})`); innerG.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=innerG; ctx.beginPath(); ctx.ellipse(cx,cy-1,3.5,4,0,0,Math.PI*2); ctx.fill();
  // WIELE OCZU — rozmieszczone w chaosie
  const eyes=[
    [cx-2,cy-4,1.4, true ],  // główne lewe
    [cx+2,cy-4,1.4, true ],  // główne prawe
    [cx-3.5,cy-1,0.9,false],
    [cx+3.5,cy-1,0.9,false],
    [cx,cy-6,0.8,false],
    [cx-1,cy+1.5,0.7,false],
    [cx+3,cy-2.5,0.6,false],
  ];
  for(const [ex,ey,er,isMain] of eyes){
    // Twardówka
    ctx.fillStyle='#0a0008';
    ctx.beginPath(); ctx.ellipse(ex,ey,er*1.2,er,0,0,Math.PI*2); ctx.fill();
    // Tęczówka (pulsujące fiolet/białe)
    const ic=Math.floor(150+p*105);
    ctx.fillStyle=isMain ? `rgb(${ic},0,255)` : `rgba(${ic},0,255,0.85)`;
    ctx.beginPath(); ctx.arc(ex,ey,er*0.75,0,Math.PI*2); ctx.fill();
    // Źrenica (pionowa szpara)
    ctx.fillStyle='#000005';
    ctx.beginPath(); ctx.ellipse(ex,ey,er*0.22,er*0.65,0,0,Math.PI*2); ctx.fill();
    // Blask
    ctx.fillStyle=`rgba(255,200,255,${0.5+p*0.4})`;
    ctx.beginPath(); ctx.arc(ex-er*0.3,ey-er*0.3,er*0.2,0,Math.PI*2); ctx.fill();
    if(isMain){
      ctx.strokeStyle=`rgba(180,0,255,${0.3+p*0.4})`; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.arc(ex,ey,er*1.6,0,Math.PI*2); ctx.stroke();
    }
  }
  // Usta — ogromne, pełne zębów
  ctx.fillStyle='#05000f';
  ctx.beginPath();
  ctx.moveTo(cx-4,cy+2.5); ctx.bezierCurveTo(cx-3,cy+1.5,cx+3,cy+1.5,cx+4,cy+2.5);
  ctx.bezierCurveTo(cx+3,cy+4.5,cx-3,cy+4.5,cx-4,cy+2.5); ctx.closePath(); ctx.fill();
  // Zęby górne
  ctx.fillStyle='#e0d8e8'; ctx.strokeStyle='#a090b0'; ctx.lineWidth=0.4;
  for(let i=0;i<5;i++){const tx=cx-3+i*1.5; ctx.beginPath(); ctx.moveTo(tx,cy+2); ctx.lineTo(tx+0.5,cy+3.2); ctx.lineTo(tx+1,cy+2); ctx.closePath(); ctx.fill(); ctx.stroke();}
  // Zęby dolne
  for(let i=0;i<4;i++){const tx=cx-2.5+i*1.4; ctx.beginPath(); ctx.moveTo(tx,cy+4.5); ctx.lineTo(tx+0.5,cy+3.3); ctx.lineTo(tx+1,cy+4.5); ctx.closePath(); ctx.fill(); ctx.stroke();}
  // Język (fioletowy)
  ctx.fillStyle='#5a0090';
  ctx.beginPath(); ctx.moveTo(cx-1,cy+4); ctx.bezierCurveTo(cx,cy+5.5,cx+1,cy+5.5,cx+1,cy+4); ctx.closePath(); ctx.fill();
  // Aura zniszczenia (zewnętrzny pierścień)
  ctx.strokeStyle=`rgba(100,0,200,${0.2+p*0.2})`; ctx.lineWidth=1.5;
  ctx.setLineDash([2,3]);
  ctx.beginPath(); ctx.arc(cx,cy,TILE*0.75+p*1.5,0,Math.PI*2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawEntity(e) {
  const cx = e.x * TILE + TILE/2;
  const cy = e.y * TILE + TILE/2;

  if (e.dying) {
    const alpha = e.dyingTimer / 10;
    ctx.save(); ctx.globalAlpha = alpha;
    const t2 = 1 - alpha;
    ctx.translate(cx, cy); ctx.scale(1 + t2*0.5, 1 + t2*0.5); ctx.translate(-cx, -cy);
    ctx.fillStyle = `rgba(255,80,0,${alpha})`;
    ctx.beginPath(); ctx.arc(cx, cy, TILE*0.6, 0, Math.PI*2); ctx.fill();
    ctx.restore();
    return;
  }
  if (e.type === 'enemy') {
    if      (e.name === 'Szkielet')   drawSzkielet(cx, cy);
    else if (e.name === 'Troll')      drawTroll(cx, cy);
    else if (e.name === 'Upiór')      drawUpior(cx, cy);
    else if (e.name === 'Bazyliszek') drawBazyliszek(cx, cy);
    else if (e.name === 'Rycerz')     drawRycerz(cx, cy);
    else                              drawGoblin(cx, cy);
    return;
  }
  if (e.type === 'boss') {
    drawBoss(cx, cy, e.name);
    return;
  }
  if (e.type === 'potion') { drawPotion(cx, cy); return; }
  if (e.type === 'gold')   { drawGoldBag(cx, cy); return; }
  if (e.type === 'stairs') { drawStairs(cx, cy); return; }
  if (e.type === 'trap')   { if (e.revealed) drawTrapRevealed(cx, cy); return; }
  if (e.type === 'chest')  { drawChest(cx, cy); return; }
  drawChar(e.x, e.y, '?', '#fff');
}

function isTorch(x, y) {
  if (!game.grid || game.grid[y]?.[x] !== 1) return false;
  const adj = [[0,1],[0,-1],[1,0],[-1,0]];
  const hasFloor = adj.some(([dx,dy]) => {
    const nx=x+dx, ny=y+dy;
    return nx>=0 && nx<COLS && ny>=0 && ny<ROWS && game.grid[ny][nx] === 0;
  });
  if (!hasFloor) return false;
  return (x * 17 + y * 13) % 9 === 0;
}

function getTorchEdge(x, y) {
  // Zwraca pozycję na krawędzi ściany zwróconej ku podłodze
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  for (const [dx, dy] of dirs) {
    const nx=x+dx, ny=y+dy;
    if (nx>=0 && nx<COLS && ny>=0 && ny<ROWS && game.grid[ny][nx] === 0) {
      const cx = x * TILE + TILE/2 + dx * (TILE/2 - 2);
      const cy = y * TILE + TILE/2 + dy * (TILE/2 - 2);
      return { cx, cy };
    }
  }
  return { cx: x * TILE + TILE/2, cy: y * TILE + TILE/2 };
}

function drawTorchSprite(cx, cy, flicker, t, phase) {
  const w = Math.sin(t/80  + phase) * 1.2;  // chybotanie poziome
  const w2= Math.cos(t/120 + phase) * 0.8;
  const fh = 6 * flicker;                    // wysokość płomienia

  // Uchwyt (drewno)
  ctx.fillStyle = '#5a2d0c';
  ctx.fillRect(cx-1, cy+1, 2, 5);
  // Knot
  ctx.fillStyle = '#aaa';
  ctx.fillRect(cx-0.5, cy-1, 1, 3);

  // Zewnętrzny płomień (ciemnopomarańczowy)
  ctx.beginPath();
  ctx.moveTo(cx + w*0.3, cy - fh);
  ctx.bezierCurveTo(cx+3+w, cy-2, cx+2+w2, cy+1, cx, cy+1);
  ctx.bezierCurveTo(cx-2-w2, cy+1, cx-3-w, cy-2, cx+w*0.3, cy-fh);
  ctx.fillStyle = `rgba(210,65,5,${0.88*flicker})`;
  ctx.fill();

  // Środkowy płomień (pomarańczowy)
  ctx.beginPath();
  ctx.moveTo(cx + w*0.25, cy - fh*0.82);
  ctx.bezierCurveTo(cx+2+w*0.5, cy-1, cx+1.5, cy+0.8, cx, cy+0.8);
  ctx.bezierCurveTo(cx-1.5, cy+0.8, cx-2-w*0.5, cy-1, cx+w*0.25, cy-fh*0.82);
  ctx.fillStyle = `rgba(255,130,15,${0.95*flicker})`;
  ctx.fill();

  // Wewnętrzny płomień (żółty)
  ctx.beginPath();
  ctx.moveTo(cx + w*0.15, cy - fh*0.58);
  ctx.bezierCurveTo(cx+1.4+w*0.2, cy-0.5, cx+1, cy+0.8, cx, cy+0.8);
  ctx.bezierCurveTo(cx-1, cy+0.8, cx-1.4-w*0.2, cy-0.5, cx+w*0.15, cy-fh*0.58);
  ctx.fillStyle = `rgba(255,210,50,${0.92*flicker})`;
  ctx.fill();

  // Rdzeń (biało-żółty)
  ctx.beginPath();
  ctx.arc(cx + w*0.08, cy - 1, 0.9*flicker, 0, Math.PI*2);
  ctx.fillStyle = `rgba(255,255,200,${0.85*flicker})`;
  ctx.fill();

  // Iskry
  const spark1 = Math.sin(t/45 + phase*3);
  const spark2 = Math.sin(t/65 + phase*2 + 1.5);
  if (spark1 > 0.75) {
    ctx.fillStyle = `rgba(255,200,50,${(spark1-0.75)*3})`;
    ctx.fillRect(cx + w*0.4 + 1.5, cy - fh - 1, 1, 1);
  }
  if (spark2 > 0.78) {
    ctx.fillStyle = `rgba(255,150,20,${(spark2-0.78)*3})`;
    ctx.fillRect(cx - w*0.3 - 1.5, cy - fh, 1, 1);
  }
}

function drawTorchGlows() {
  const t = Date.now();
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (!isTorch(x, y)) continue;
      const phase = x*2.7 + y*1.9;
      const flicker = 0.75 + Math.sin(t/130 + phase) * 0.25;
      const { cx, cy } = getTorchEdge(x, y);

      // Poświata na podłodze
      const radius = TILE * 3.4 * flicker;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0,    `rgba(255,150,20,${0.42*flicker})`);
      glow.addColorStop(0.4,  `rgba(180,70,5,${0.18*flicker})`);
      glow.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(Math.max(0,cx-radius), Math.max(0,cy-radius), radius*2, radius*2);

      // Sprite pochodni na krawędzi ściany
      drawTorchSprite(cx, cy, flicker, t, phase);
    }
  }
}

function drawPlayerSprite(cx, cy) {
  // Cień pod postacią
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(cx, cy+5, 4, 1.5, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Płaszcz/peleryna (spód)
  ctx.fillStyle = '#1a2e1a';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy+2.5, 4, 3.5, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Ramiona (naramienniki)
  ctx.fillStyle = '#3a5c3a';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.ellipse(cx-3.2, cy+0.5, 1.8, 1.2, -0.3, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+3.2, cy+0.5, 1.8, 1.2,  0.3, 0, Math.PI*2); ctx.fill(); ctx.stroke();

  // Tułów (zbroja/koszula)
  ctx.fillStyle = '#2e4a2e';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.ellipse(cx, cy+1.5, 2.2, 2.5, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Miecz (prawa strona)
  ctx.strokeStyle = '#aaaacc';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx+3, cy-2); ctx.lineTo(cx+5.5, cy+4); ctx.stroke();
  ctx.strokeStyle = '#8B6914';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx+2.2, cy+1.5); ctx.lineTo(cx+4.2, cy+1.5); ctx.stroke(); // jelec
  ctx.strokeStyle = '#6b4a0a';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx+3.8, cy+3); ctx.lineTo(cx+5, cy+5); ctx.stroke(); // rękojeść

  // Szyja
  ctx.fillStyle = '#c8956c';
  ctx.beginPath();
  ctx.ellipse(cx, cy-1.5, 1.2, 1, 0, 0, Math.PI*2);
  ctx.fill();

  // Głowa — kontur
  ctx.fillStyle = '#c8956c';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy-4.5, 3.2, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Hełm
  ctx.fillStyle = '#888a7a';
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy-5.2, 3.2, Math.PI, 0);
  ctx.fill(); ctx.stroke();
  // Daszek hełmu
  ctx.fillStyle = '#707268';
  ctx.beginPath();
  ctx.ellipse(cx, cy-3.8, 3.8, 0.9, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();

  // Oczy
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(cx-1.1, cy-4.3, 0.8, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.1, cy-4.3, 0.8, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#222';
  ctx.beginPath(); ctx.arc(cx-1.0, cy-4.3, 0.45, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.0, cy-4.3, 0.45, 0, Math.PI*2); ctx.fill();
}

function drawPlayer() {
  const p = game.player;
  const cx = p.x * TILE + TILE/2;
  const cy = p.y * TILE + TILE/2;

  // Poświata
  const pulse = Math.sin(Date.now() / 500) * 0.5 + 0.5;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, TILE*0.9);
  glow.addColorStop(0,   `rgba(0,255,100,${0.18 + pulse*0.08})`);
  glow.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(cx-TILE, cy-TILE, TILE*2, TILE*2);

  drawPlayerSprite(cx, cy);
}

function drawHUD() {
  const p = game.player;
  const hy = H;
  // Skalowanie fontów proporcjonalne do szerokości canvas (W2=360 vs W1=280)
  // Pozycje Y zostają bez zmian żeby zmieścić się w 130px HUD
  const hf = Math.max(1, W / 280);
  const fs  = n => `${Math.round(n * hf)}px Courier New`;
  const fsB = n => `bold ${Math.round(n * hf)}px Courier New`;

  ctx.fillStyle = '#0d0820';
  ctx.fillRect(0, hy, W, HUD);
  ctx.strokeStyle = '#8B0000';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(W, hy); ctx.stroke();

  // Tytuł
  ctx.fillStyle = '#ffd700';
  ctx.font = fsB(12);
  ctx.textAlign = 'center';
  ctx.fillText(t('hud_title'), W/2, hy+13);

  // Przycisk wyników [L]
  ctx.textAlign = 'right';
  ctx.font = fs(8);
  ctx.fillStyle = '#444';
  ctx.fillText(lang==='pl' ? '[L] wyniki' : '[L] scores', W-4, hy+13);
  ctx.textAlign = 'left';

  // Serca
  ctx.font = `${Math.round(13*hf)}px Arial`;
  let hearts = '';
  for (let i=0; i<game.lives; i++) hearts += '♥ ';
  ctx.fillStyle = '#ff4444';
  ctx.fillText(hearts, 4, hy+27);

  // HP bar
  const barW = W-8, barH = 8;
  const hpW = Math.floor(barW * p.hp / p.maxHp);
  const hpCol = p.hp > p.maxHp*0.5 ? '#00cc44' : p.hp > p.maxHp*0.25 ? '#ffaa00' : '#ff2222';
  ctx.fillStyle = '#222'; ctx.fillRect(4, hy+31, barW, barH);
  ctx.fillStyle = hpCol;  ctx.fillRect(4, hy+31, hpW, barH);
  ctx.fillStyle = '#fff';
  ctx.font = fs(9);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`HP ${p.hp}/${p.maxHp}`, W/2, hy+35);
  ctx.textBaseline = 'alphabetic';

  // Statystyki
  ctx.textAlign = 'left';
  ctx.font = fs(11);
  ctx.fillStyle = '#ffd700';
  ctx.fillText(t('hud_gold', p.gold), 4, hy+52);
  ctx.fillStyle = '#00ffff';
  ctx.fillText(`XP:${p.xp} Lv:${p.level} ATK:${p.atk}${p.shield ? t('hud_shield',p.shield) : ''}`, 4, hy+65);
  ctx.fillStyle = '#ff8844';
  ctx.fillText(t('hud_kills', game.killCount), 4, hy+78);
  ctx.fillStyle = '#00ffff';
  ctx.fillText(t('hud_potions', p.potions), 90, hy+78);

  // Licznik wrogów
  const enemiesLeft = game.entities.filter(e => (e.type==='enemy'||e.type==='boss') && !e.dying).length;
  ctx.textAlign = 'right';
  ctx.font = fs(10);
  ctx.fillStyle = enemiesLeft === 0 ? '#00ff88' : '#ff4444';
  ctx.fillText(
    enemiesLeft === 0
      ? (lang==='pl' ? '✓ brak wrogów' : '✓ no enemies')
      : (lang==='pl' ? `wrogów: ${enemiesLeft}` : `enemies: ${enemiesLeft}`),
    W-4, hy+78
  );
  ctx.textAlign = 'left';

  // Wiadomości
  for (let i=0; i<Math.min(game.messages.length,3); i++) {
    const m = game.messages[i];
    ctx.globalAlpha = i===0?1:i===1?0.5:0.22;
    ctx.fillStyle = m.color;
    ctx.font = i===0 ? fsB(9) : fs(9);
    ctx.fillText(m.text, 4, hy+93+i*12);
  }
  ctx.globalAlpha = 1;
}

function drawShop() {
  const p = game.player;
  const pr = game.shopPrices;

  // Półprzezroczyste tło
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, 0, W, H+HUD);

  // Okno sklepu
  const sw=W-10, sh=H-20, sx=5, sy=10;
  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(sx, sy, sw, sh);
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.strokeRect(sx, sy, sw, sh);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 13px Courier New';
  ctx.fillText(t('shop_title'), W/2, sy+18);
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(sx+8, sy+24); ctx.lineTo(sx+sw-8, sy+24); ctx.stroke();
  ctx.fillStyle = '#aaa';
  ctx.font = '11px Courier New';
  ctx.fillText(t('shop_gold', p.gold), W/2, sy+38);

  const items = [
    {label:t('shop_heal'), price: pr.heal, col:'#00ff88'},
    {label:t('shop_sword'), price: pr.sword, col:'#ff8800'},
    {label:t('shop_shield'), price: pr.shield, col:'#00aaff'},
  ];
  items.forEach((item, i) => {
    const iy = sy + 62 + i*32;
    const canAfford = p.gold >= item.price;
    ctx.fillStyle = canAfford ? item.col : '#444';
    ctx.font = 'bold 11px Courier New';
    ctx.fillText(item.label, W/2, iy);
    ctx.fillStyle = canAfford ? '#fff' : '#333';
    ctx.font = '10px Courier New';
    ctx.fillText(t('shop_price', item.price), W/2, iy+14);
  });

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(sx+8, sy+sh-46); ctx.lineTo(sx+sw-8, sy+sh-46); ctx.stroke();
  ctx.fillStyle = '#555';
  ctx.font = '11px Courier New';
  ctx.fillText(t('shop_exit'), W/2, sy+sh-30);
  if (game.messages.length > 0) {
    ctx.fillStyle = game.messages[0].color;
    ctx.font = 'bold 10px Courier New';
    ctx.fillText(game.messages[0].text, W/2, sy+sh-14);
  }
}

function drawScoreTable(startY) {
  const scores = getScores();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText(t('score_title'), W/2, startY);
  if (scores.length === 0) {
    ctx.fillStyle = '#555'; ctx.font = '9px Courier New';
    ctx.fillText(t('score_empty'), W/2, startY+14);
    return;
  }
  const diffNames = {1:'E',2:'N',3:'H',4:'☠'};
  scores.slice(0,5).forEach((s,i) => {
    const y = startY + 14 + i*16;
    ctx.fillStyle = i===0 ? '#ffd700' : '#888';
    ctx.font = (i===0?'bold ':'')+'9px Courier New';
    ctx.fillText(`#${i+1}  ${s.score}pts  p${s.floor} lv${s.level} ${s.gold}g [${diffNames[s.diff]||'?'}]`, W/2, y);
  });
}

function drawDead() {
  ctx.fillStyle = 'rgba(0,0,0,0.88)';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff2222';
  ctx.font = 'bold 16px Courier New';
  ctx.fillText(t('dead_title'), W/2, H/2-50);
  ctx.fillStyle = '#aaa';
  ctx.font = '11px Courier New';
  ctx.fillText(t('dead_stats', game.floor, game.player.gold), W/2, H/2-30);
  drawScoreTable(H/2-12);
  ctx.fillStyle = '#ffd700';
  ctx.font = '11px Courier New';
  ctx.fillText(t('dead_restart'), W/2, H/2+90);
}

function drawVictory() {
  ctx.fillStyle = '#0a0010';
  ctx.fillRect(0, 0, W, H+HUD);

  // Wielki VICTORY
  ctx.textAlign = 'center';
  const gradient = ctx.createLinearGradient(0, H/2-80, 0, H/2-20);
  gradient.addColorStop(0, '#ffd700');
  gradient.addColorStop(0.5, '#ffaa00');
  gradient.addColorStop(1, '#ff6600');
  ctx.fillStyle = gradient;
  ctx.font = 'bold 16px Courier New';
  ctx.fillText(t('victory_title'), W/2, H/2-40);

  const p = game.player;
  ctx.fillStyle = '#aaa';
  ctx.font = '11px Courier New';
  ctx.fillText(t('victory_stats', p.level, p.gold, p.hp, p.maxHp), W/2, H/2-20);

  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 12px Courier New';
  ctx.fillText(t('victory_credits'), W/2, H/2-4);
  ctx.fillStyle = '#fff';
  ctx.font = '12px Courier New';
  ctx.fillText('Jan Bogusz', W/2, H/2+12);
  ctx.fillText('Franek Bogusz', W/2, H/2+28);
  ctx.fillStyle = '#ff4444';
  ctx.font = 'bold 12px Courier New';
  ctx.fillText('Mystery Dungeon', W/2, H/2+44);
  ctx.fillStyle = '#555';
  ctx.font = '11px Courier New';
  ctx.fillText(t('victory_restart'), W/2, H/2+62);
}

// obszary przycisków języka (globalne, żeby click/hover mogły je używać)
const LANG_BTNS = [
  { key:'pl', label:'lang_pl', flag:'🇵🇱', by: () => H/2 + 10 },
  { key:'en', label:'lang_en', flag:'🇬🇧', by: () => H/2 + 58 },
];
const LANG_BTN_W = 200, LANG_BTN_H = 40;
let langHover = null; // 'pl' | 'en' | null

let inputMode = 'keyboard'; // 'touch' | 'keyboard'
const MODE_BTNS = [
  { key:'touch',    icon:'👆', label:'mode_touch',    sub:'mode_touch_sub',    by: () => H/2 + 10 },
  { key:'keyboard', icon:'⌨', label:'mode_keyboard', sub:'mode_keyboard_sub', by: () => H/2 + 68 },
];
const MODE_BTN_W = 200, MODE_BTN_H = 44;
let modeHover = null;

function getModeBtn(mx, my) {
  for (const btn of MODE_BTNS) {
    const bx = W/2 - MODE_BTN_W/2;
    const by = btn.by() - MODE_BTN_H/2;
    if (mx >= bx && mx <= bx+MODE_BTN_W && my >= by && my <= by+MODE_BTN_H) return btn.key;
  }
  return null;
}

function drawModeSelect() {
  ctx.fillStyle = '#08000f';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';

  // Tytuł
  const gr = ctx.createLinearGradient(0, H/2-100, 0, H/2-44);
  gr.addColorStop(0, '#ffd700'); gr.addColorStop(1, '#ff6600');
  ctx.fillStyle = gr;
  ctx.font = 'bold 15px Courier New';
  ctx.fillText('╔══════════════╗', W/2, H/2-88);
  ctx.fillText(' DUNGEON CRAWLER', W/2, H/2-70);
  ctx.fillText('╚══════════════╝', W/2, H/2-52);

  // Podtytuł
  ctx.fillStyle = '#666';
  ctx.font = '11px Courier New';
  ctx.fillText(t('mode_choose'), W/2, H/2-32);

  // Separator
  ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W*0.08, H/2-20); ctx.lineTo(W*0.92, H/2-20); ctx.stroke();

  // Przyciski
  for (const btn of MODE_BTNS) {
    const bx = W/2 - MODE_BTN_W/2;
    const by = btn.by() - MODE_BTN_H/2;
    const hov = modeHover === btn.key;

    // Cień
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bx+3, by+3, MODE_BTN_W, MODE_BTN_H);

    // Tło
    if (hov) {
      const bg = ctx.createLinearGradient(bx, by, bx, by+MODE_BTN_H);
      bg.addColorStop(0, '#3a2060'); bg.addColorStop(1, '#1a0835');
      ctx.fillStyle = bg;
    } else {
      ctx.fillStyle = '#12081e';
    }
    ctx.fillRect(bx, by, MODE_BTN_W, MODE_BTN_H);

    // Obramowanie
    ctx.strokeStyle = hov ? '#ffd700' : '#3a2a5a';
    ctx.lineWidth = hov ? 1.5 : 1;
    ctx.strokeRect(bx, by, MODE_BTN_W, MODE_BTN_H);

    // Ikona
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = hov ? '#ffd700' : '#aaaaaa';
    ctx.fillText(btn.icon, bx + 12, by + MODE_BTN_H/2 + 7);

    // Tekst główny
    ctx.textAlign = 'center';
    ctx.fillStyle = hov ? '#ffd700' : '#cccccc';
    ctx.font = (hov ? 'bold ' : '') + '13px Courier New';
    ctx.fillText(t(btn.label), W/2 + 10, by + MODE_BTN_H/2 - 2);

    // Podtytuł przycisku
    ctx.font = '10px Courier New';
    const subText = t(btn.sub);
    const demoIdx = subText.indexOf('(demo)');
    if (demoIdx !== -1) {
      const before = subText.slice(0, demoIdx);
      const demo   = subText.slice(demoIdx, demoIdx + 6);
      const after  = subText.slice(demoIdx + 6);
      const subY   = by + MODE_BTN_H/2 + 10;
      const totalW = ctx.measureText(subText).width;
      let cx = W/2 + 10 - totalW/2;
      ctx.textAlign = 'left';
      ctx.fillStyle = hov ? '#ffaa00' : '#555';
      ctx.fillText(before, cx, subY);
      cx += ctx.measureText(before).width;
      ctx.fillStyle = '#ff4488';
      ctx.fillText(demo, cx, subY);
      cx += ctx.measureText(demo).width;
      ctx.fillStyle = hov ? '#ffaa00' : '#555';
      ctx.fillText(after, cx, subY);
      ctx.textAlign = 'center';
    } else {
      ctx.fillStyle = hov ? '#ffaa00' : '#555';
      ctx.fillText(subText, W/2 + 10, by + MODE_BTN_H/2 + 10);
    }
  }

  // Stopka
  ctx.textAlign = 'center';
  ctx.fillStyle = '#222';
  ctx.font = '8px Courier New';
  ctx.fillText('Mystery Dungeon', W/2, H/2 + 118);
}

// ===================== DIFFICULTY SELECT =====================
let difficulty = 2;
const DIFF_BTNS = [
  { key:1, icon:'⭐', label:'diff_1', sub:'diff_1_sub', color:'#44cc44', by: () => H/2 - 52 },
  { key:2, icon:'⭐⭐', label:'diff_2', sub:'diff_2_sub', color:'#ffd700', by: () => H/2 - 2  },
  { key:3, icon:'⭐⭐⭐', label:'diff_3', sub:'diff_3_sub', color:'#ff8800', by: () => H/2 + 48 },
  { key:4, icon:'💀', label:'diff_4', sub:'diff_4_sub', color:'#ff2222', by: () => H/2 + 98 },
];
const DIFF_BTN_W = 200, DIFF_BTN_H = 40;
let diffHover = null;

function getDiffBtn(mx, my) {
  for (const btn of DIFF_BTNS) {
    const bx = W/2 - DIFF_BTN_W/2;
    const by = btn.by() - DIFF_BTN_H/2;
    if (mx >= bx && mx <= bx+DIFF_BTN_W && my >= by && my <= by+DIFF_BTN_H) return btn.key;
  }
  return null;
}

function drawAbilityPick() {
  ctx.fillStyle = 'rgba(0,0,0,0.88)';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';
  const gr = ctx.createLinearGradient(0, H/2-80, 0, H/2-50);
  gr.addColorStop(0,'#ffd700'); gr.addColorStop(1,'#ff6600');
  ctx.fillStyle = gr;
  ctx.font = 'bold 13px Courier New';
  ctx.fillText('⬆ LEVEL UP! ⬆', W/2, H/2-62);
  ctx.fillStyle = '#aaa'; ctx.font = '9px Courier New';
  ctx.fillText(t('ability_choose'), W/2, H/2-46);
  ctx.strokeStyle = '#333'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(W*0.1,H/2-38); ctx.lineTo(W*0.9,H/2-38); ctx.stroke();
  const choices = game.abilityChoices || [];
  const BW=160, BH=36;
  choices.forEach((key, i) => {
    const bx=W/2-BW/2, by=H/2-28+i*44;
    ctx.fillStyle='#12081e'; ctx.fillRect(bx,by,BW,BH);
    ctx.strokeStyle='#5a2a8a'; ctx.lineWidth=1; ctx.strokeRect(bx,by,BW,BH);
    ctx.fillStyle='#ffd700'; ctx.font='bold 10px Courier New';
    ctx.textAlign='left';
    ctx.fillText(`[${i+1}]`, bx+6, by+14);
    ctx.fillStyle='#fff'; ctx.font='bold 10px Courier New';
    ctx.fillText(t(`ab_${key}`), bx+28, by+14);
    ctx.fillStyle='#888'; ctx.font='8px Courier New';
    ctx.fillText(t(`ab_${key}_d`), bx+28, by+27);
  });
  ctx.textAlign='center';
}

function drawDifficultySelect() {
  ctx.fillStyle = '#08000f';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';

  // Tytuł
  const gr = ctx.createLinearGradient(0, H/2-136, 0, H/2-88);
  gr.addColorStop(0, '#ffd700'); gr.addColorStop(1, '#ff6600');
  ctx.fillStyle = gr;
  ctx.font = 'bold 15px Courier New';
  ctx.fillText('╔══════════════╗', W/2, H/2-126);
  ctx.fillText(' DUNGEON CRAWLER', W/2, H/2-108);
  ctx.fillText('╚══════════════╝', W/2, H/2-90);

  ctx.fillStyle = '#666';
  ctx.font = '11px Courier New';
  ctx.fillText(t('diff_choose'), W/2, H/2-74);

  ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W*0.08, H/2-62); ctx.lineTo(W*0.92, H/2-62); ctx.stroke();

  for (const btn of DIFF_BTNS) {
    const bx = W/2 - DIFF_BTN_W/2;
    const by = btn.by() - DIFF_BTN_H/2;
    const hov = diffHover === btn.key;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bx+3, by+3, DIFF_BTN_W, DIFF_BTN_H);

    if (hov) {
      const bg = ctx.createLinearGradient(bx, by, bx, by+DIFF_BTN_H);
      bg.addColorStop(0, '#3a2060'); bg.addColorStop(1, '#1a0835');
      ctx.fillStyle = bg;
    } else {
      ctx.fillStyle = '#12081e';
    }
    ctx.fillRect(bx, by, DIFF_BTN_W, DIFF_BTN_H);

    ctx.strokeStyle = hov ? btn.color : '#3a2a5a';
    ctx.lineWidth = hov ? 1.5 : 1;
    ctx.strokeRect(bx, by, DIFF_BTN_W, DIFF_BTN_H);

    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = btn.color;
    ctx.fillText(btn.icon, bx + 8, by + DIFF_BTN_H/2 + 5);

    ctx.textAlign = 'center';
    ctx.fillStyle = hov ? btn.color : '#cccccc';
    ctx.font = (hov ? 'bold ' : '') + '13px Courier New';
    ctx.fillText(t(btn.label), W/2 + 10, by + DIFF_BTN_H/2 - 3);

    ctx.fillStyle = hov ? '#aaaaaa' : '#444';
    ctx.font = '10px Courier New';
    ctx.fillText(t(btn.sub), W/2 + 10, by + DIFF_BTN_H/2 + 11);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#222';
  ctx.font = '8px Courier New';
  ctx.fillText('Mystery Dungeon', W/2, H/2 + 128);
}

function drawLangSelect() {
  ctx.fillStyle = '#08000f';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';

  // Tytuł
  const gr = ctx.createLinearGradient(0, H/2-100, 0, H/2-44);
  gr.addColorStop(0, '#ffd700'); gr.addColorStop(1, '#ff6600');
  ctx.fillStyle = gr;
  ctx.font = 'bold 15px Courier New';
  ctx.fillText('╔══════════════╗', W/2, H/2-88);
  ctx.fillText(' DUNGEON CRAWLER', W/2, H/2-70);
  ctx.fillText('╚══════════════╝', W/2, H/2-52);

  // Podtytuł
  ctx.fillStyle = '#666';
  ctx.font = '11px Courier New';
  ctx.fillText(t('lang_choose'), W/2, H/2-32);

  // Separator
  ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W*0.08, H/2-20); ctx.lineTo(W*0.92, H/2-20); ctx.stroke();

  // Przyciski
  for (const btn of LANG_BTNS) {
    const bx = W/2 - LANG_BTN_W/2;
    const by = btn.by() - LANG_BTN_H/2;
    const hov = langHover === btn.key;

    // Cień przycisku
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(bx+3, by+3, LANG_BTN_W, LANG_BTN_H);

    // Tło przycisku
    if (hov) {
      const bg = ctx.createLinearGradient(bx, by, bx, by+LANG_BTN_H);
      bg.addColorStop(0, '#3a2060'); bg.addColorStop(1, '#1a0835');
      ctx.fillStyle = bg;
    } else {
      ctx.fillStyle = '#12081e';
    }
    ctx.fillRect(bx, by, LANG_BTN_W, LANG_BTN_H);

    // Obramowanie
    ctx.strokeStyle = hov ? '#ffd700' : '#3a2a5a';
    ctx.lineWidth = hov ? 1.5 : 1;
    ctx.strokeRect(bx, by, LANG_BTN_W, LANG_BTN_H);

    // Flaga
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(btn.flag, bx + 12, by + LANG_BTN_H/2 + 7);

    // Tekst
    ctx.textAlign = 'center';
    ctx.fillStyle = hov ? '#ffd700' : '#cccccc';
    ctx.font = (hov ? 'bold ' : '') + '13px Courier New';
    ctx.fillText(t(btn.label), W/2 + 10, by + LANG_BTN_H/2 + 5);
  }

  // Stopka
  ctx.textAlign = 'center';
  ctx.fillStyle = '#222';
  ctx.font = '8px Courier New';
  ctx.fillText('Mystery Dungeon', W/2, H/2 + 110);
}

// ===================== WYBÓR ŚWIATA =====================
function drawWorldSelect() {
  ctx.fillStyle = '#050010';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';

  // Tytuł
  const gr = ctx.createLinearGradient(0, H/2-90, 0, H/2-60);
  gr.addColorStop(0,'#ffd700'); gr.addColorStop(1,'#ff8800');
  ctx.fillStyle = gr;
  ctx.font = 'bold 13px Courier New';
  ctx.fillText('╔════════════════╗', W/2, H/2-78);
  ctx.fillText('  ' + t('world_select_title') + '  ', W/2, H/2-62);
  ctx.fillText('╚════════════════╝', W/2, H/2-46);

  const bw = 200, bh = 48;

  // Świat I
  const w1x = W/2 - bw/2, w1y = H/2 - 34;
  ctx.fillStyle = '#0e0825';
  ctx.fillRect(w1x, w1y, bw, bh);
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5;
  ctx.strokeRect(w1x, w1y, bw, bh);
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 11px Courier New';
  ctx.fillText(t('world1_name'), W/2, w1y + 18);
  ctx.fillStyle = '#888'; ctx.font = '9px Courier New';
  ctx.fillText(t('world1_sub'), W/2, w1y + 34);

  // Świat II
  const w2unlocked = isWorld2Unlocked();
  const w2x = W/2 - bw/2, w2y = H/2 + 26;
  ctx.fillStyle = '#100510';
  ctx.fillRect(w2x, w2y, bw, bh);
  ctx.strokeStyle = w2unlocked ? '#ff2222' : '#333'; ctx.lineWidth = 1.5;
  ctx.strokeRect(w2x, w2y, bw, bh);

  if (w2unlocked) {
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 11px Courier New';
    ctx.fillText(t('world2_name'), W/2, w2y + 18);
    ctx.fillStyle = '#888'; ctx.font = '9px Courier New';
    ctx.fillText(t('world2_sub'), W/2, w2y + 34);
  } else {
    ctx.fillStyle = '#444';
    ctx.font = 'bold 11px Courier New';
    ctx.fillText(t('world2_locked'), W/2, w2y + 18);
    ctx.fillStyle = '#333'; ctx.font = '9px Courier New';
    ctx.fillText(t('world2_locked_sub'), W/2, w2y + 34);
  }
}

// ===================== ŚWIAT 1 UKOŃCZONY =====================
function drawWorldComplete() {
  ctx.fillStyle = '#050010';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';

  // Gwiazdy w tle
  const now = Date.now() / 1000;
  for (let i = 0; i < 30; i++) {
    const sx = (i * 47 + 23) % W;
    const sy = (i * 67 + 11) % (H + HUD);
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(now + i));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;

  // Tytuł
  const gr = ctx.createLinearGradient(0, H/2-80, 0, H/2-50);
  gr.addColorStop(0,'#ffd700'); gr.addColorStop(1,'#ffaa00');
  ctx.fillStyle = gr;
  ctx.font = 'bold 12px Courier New';
  ctx.fillText(t('world1_complete_title'), W/2, H/2-58);

  ctx.fillStyle = '#00ff88';
  ctx.font = '9px Courier New';
  ctx.fillText(t('world1_complete_sub'), W/2, H/2-38);

  // Statystyki gracza
  if (game.player) {
    const p = game.player;
    ctx.fillStyle = '#aaa';
    ctx.font = '9px Courier New';
    ctx.fillText(`Lv${p.level}  ${p.gold} zł  ${game.killCount} kills`, W/2, H/2-22);
  }

  // Pytanie
  const p2 = Math.sin(now * 2) * 0.5 + 0.5;
  ctx.fillStyle = `rgba(255,${Math.floor(180+p2*75)},0,1)`;
  ctx.font = 'bold 11px Courier New';
  ctx.fillText(t('world2_ask'), W/2, H/2+4);

  // Przycisk TAK
  const bw = 200, bh = 30;
  const yesY = H/2 + 22;
  ctx.fillStyle = '#0a1a0a';
  ctx.fillRect(W/2 - bw/2, yesY, bw, bh);
  ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 1.5;
  ctx.strokeRect(W/2 - bw/2, yesY, bw, bh);
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText(t('world2_yes'), W/2, yesY + 19);

  // Przycisk NIE
  const noY = H/2 + 62;
  ctx.fillStyle = '#1a0a0a';
  ctx.fillRect(W/2 - bw/2, noY, bw, bh);
  ctx.strokeStyle = '#ff4444'; ctx.lineWidth = 1.5;
  ctx.strokeRect(W/2 - bw/2, noY, bw, bh);
  ctx.fillStyle = '#ff4444';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText(t('world2_no'), W/2, noY + 19);
}

function drawTitle() {
  ctx.fillStyle = '#0a0010';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';
  const gr = ctx.createLinearGradient(0, H/2-60, 0, H/2-10);
  gr.addColorStop(0, '#ffd700');
  gr.addColorStop(1, '#ff6600');
  ctx.fillStyle = gr;
  ctx.font = 'bold 12px Courier New';
  ctx.fillText('╔══════════════╗', W/2, H/2-48);
  ctx.fillText(' DUNGEON CRAWLER', W/2, H/2-32);
  ctx.fillText('╚══════════════╝', W/2, H/2-16);
  ctx.fillStyle = '#666';
  ctx.font = '9px Courier New';
  ctx.fillText(t('title_sub'), W/2, H/2-2);
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 10px Courier New';
  ctx.fillText(t('title_new'), W/2, H/2+16);
  const hasSave = canContinue();
  if (hasSave) {
    ctx.fillStyle = '#00ccff';
    ctx.font = 'bold 10px Courier New';
    ctx.fillText(t('title_continue'), W/2, H/2+30);
  }
  ctx.fillStyle = '#ffd700';
  ctx.font = '10px Courier New';
  ctx.fillText(t('title_scores'), W/2, H/2+(hasSave?44:30));
  ctx.fillStyle = '#333';
  ctx.font = '8px Courier New';
  ctx.fillText('Mystery Dungeon', W/2, H/2+62);
}

function drawScoresOverlay() {
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = '#0a0010';
  ctx.fillRect(W*0.05, H*0.05, W*0.9, H*0.9 + HUD*0.6);
  ctx.globalAlpha = 1;

  ctx.textAlign = 'center';
  const gr = ctx.createLinearGradient(0, H*0.1, 0, H*0.1+20);
  gr.addColorStop(0,'#ffd700'); gr.addColorStop(1,'#ff8800');
  ctx.fillStyle = gr;
  ctx.font = 'bold 13px Courier New';
  ctx.fillText(t('score_title'), W/2, H*0.1+18);

  ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W*0.1, H*0.1+26); ctx.lineTo(W*0.9, H*0.1+26); ctx.stroke();

  const scores = getScores();
  const diffNames = {1:'Łatwy',2:'Zwykły',3:'Trudny',4:'Niemożliwy'};
  const diffNamesEn = {1:'Easy',2:'Normal',3:'Hard',4:'Impossible'};
  const dn = lang==='pl' ? diffNames : diffNamesEn;

  if (scores.length === 0) {
    ctx.fillStyle = '#555';
    ctx.font = '11px Courier New';
    ctx.fillText(t('score_empty'), W/2, H/2);
  } else {
    scores.slice(0,5).forEach((s,i) => {
      const y = H*0.1 + 50 + i * 44;
      const medal = ['🥇','🥈','🥉','4.','5.'][i];
      ctx.fillStyle = i===0 ? '#ffd700' : i===1 ? '#cccccc' : i===2 ? '#cd7f32' : '#666';
      ctx.font = (i<3?'bold ':'')+'12px Courier New';
      ctx.fillText(`${medal}  ${s.score} pts`, W/2, y);
      ctx.fillStyle = '#888';
      ctx.font = '9px Courier New';
      ctx.fillText(`Piętro ${s.floor}  Lv${s.level}  ${s.gold}g  ${s.kills||0} kills`, W/2, y+13);
      ctx.fillStyle = '#555';
      ctx.font = '8px Courier New';
      ctx.fillText(`[${dn[s.diff]||'?'}]`, W/2, y+24);
    });
  }

  ctx.fillStyle = '#444';
  ctx.font = '9px Courier New';
  ctx.fillText(lang==='pl' ? '[L] lub [ESC] zamknij' : '[L] or [ESC] close', W/2, H*0.1 + H*0.9 - 10);
}

function drawScoresScreen() {
  ctx.fillStyle = '#0a0010';
  ctx.fillRect(0, 0, W, H+HUD);
  ctx.textAlign = 'center';
  const gr = ctx.createLinearGradient(0, 60, 0, 90);
  gr.addColorStop(0,'#ffd700'); gr.addColorStop(1,'#ff8800');
  ctx.fillStyle = gr;
  ctx.font = 'bold 14px Courier New';
  ctx.fillText(t('score_title'), W/2, 80);
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W*0.1, 92); ctx.lineTo(W*0.9, 92); ctx.stroke();

  const scores = getScores();
  const diffNames = {1:'Łatwy',2:'Zwykły',3:'Trudny',4:'Niemożliwy'};
  const diffNamesEn = {1:'Easy',2:'Normal',3:'Hard',4:'Impossible'};
  const dn = lang==='pl' ? diffNames : diffNamesEn;

  if (scores.length === 0) {
    ctx.fillStyle = '#555';
    ctx.font = '11px Courier New';
    ctx.fillText(t('score_empty'), W/2, H/2);
  } else {
    scores.slice(0,5).forEach((s,i) => {
      const y = 116 + i * 46;
      const medal = ['🥇','🥈','🥉','4.','5.'][i];
      ctx.fillStyle = i===0 ? '#ffd700' : i===1 ? '#cccccc' : i===2 ? '#cd7f32' : '#666';
      ctx.font = (i<3?'bold ':'')+'12px Courier New';
      ctx.fillText(`${medal}  ${s.score} pts`, W/2, y);
      ctx.fillStyle = '#888';
      ctx.font = '9px Courier New';
      ctx.fillText(`Piętro ${s.floor}  Lv${s.level}  ${s.gold}g  ${s.kills||0} kills`, W/2, y+14);
      ctx.fillStyle = '#555';
      ctx.font = '8px Courier New';
      ctx.fillText(`[${dn[s.diff]||'?'}]`, W/2, y+26);
    });
  }

  ctx.fillStyle = '#444';
  ctx.font = '10px Courier New';
  ctx.fillText(t('scores_back'), W/2, H+HUD-20);
}

// ===================== PĘTLA GRY =====================
function draw() {
  if (game.state === 'lang') {
    drawLangSelect();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'mode') {
    drawModeSelect();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'difficulty') {
    drawDifficultySelect();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'ability_pick') {
    drawAbilityPick();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'world_complete') {
    drawWorldComplete();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'title') {
    drawTitle();
    requestAnimationFrame(draw);
    return;
  }
  if (game.state === 'scores') {
    drawScoresScreen();
    requestAnimationFrame(draw);
    return;
  }

  // Kolor numeru piętra
  const floorEl = document.getElementById('floor-num');
  floorEl.textContent = game.floor;
  const floorDisplay = document.getElementById('floor-display');
  floorDisplay.style.color = game.floor >= 5 ? '#ff4444' : game.floor >= 3 ? '#ff8800' : '#ffd700';

  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(0, 0, W, H+HUD);

  // Mapa
  for (let y=0; y<ROWS; y++)
    for (let x=0; x<COLS; x++)
      drawTile(x, y);

  // Pochodnie
  drawTorchGlows();

  // Animacje śmierci + usuwanie
  game.entities.forEach(e => { if (e.dying) { e.dyingTimer--; } });
  game.entities = game.entities.filter(e => !e.dying || e.dyingTimer > 0);
  // Encje (tylko widoczne, schody zawsze)
  game.entities.forEach(e => { if (e.type === 'stairs' || isVisible(e.x, e.y)) drawEntity(e); });

  // Gracz
  drawPlayer();

  // Mgła wojny
  if (game.visited) drawFog();

  // Winieta
  const vignette = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // HUD
  drawHUD();

  // Overlaye
  if (game.state==='shop')    drawShop();
  if (game.state==='dead')    drawDead();
  if (game.state==='victory') drawVictory();
  if (game.showScores)        drawScoresOverlay();

  // Hit flash
  if (game.hitFlashTimer > 0) {
    ctx.globalAlpha = (game.hitFlashTimer / 10) * 0.45;
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    game.hitFlashTimer--;
  }

  // Boss announce
  if (game.bossAnnounceTimer > 0 && game.state === 'playing') {
    const alpha = Math.min(1, game.bossAnnounceTimer / 20);
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, H/2-22, W, 40);
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff2222';
    ctx.font = 'bold 9px Courier New';
    ctx.fillText(t('boss_announce'), W/2, H/2-8);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 11px Courier New';
    ctx.fillText(tname(game.bossAnnounceName), W/2, H/2+6);
    ctx.globalAlpha = 1;
    game.bossAnnounceTimer--;
  }

  // Fade overlay
  if (game.fadeTimer > 0) {
    ctx.globalAlpha = game.fadeTimer / 18;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H+HUD);
    ctx.globalAlpha = 1;
    game.fadeTimer--;
  }

  requestAnimationFrame(draw);
}

// ===================== LEGENDA SPRITE'Y =====================
function drawLegendSprites() {
  const S = 20;
  const items = [
    { id:'leg-wall', fn:(cx,cy) => {
      ctx.fillStyle = '#121216'; ctx.fillRect(0,0,S,S);
      const h = (cx*3+cy*7)%5; const c = 85+h*8;
      ctx.fillStyle = `rgb(${c},${c},${c+10})`;
      ctx.fillRect(1,1,S-2,S-2);
      ctx.strokeStyle='rgba(0,0,0,0.6)'; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.moveTo(0,S/2); ctx.lineTo(S,S/2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(S/2,0); ctx.lineTo(S/2,S); ctx.stroke();
      ctx.fillStyle=`rgb(${c-10},${c-12},${c-5})`;
      ctx.font=`${FONT_SIZE}px "Courier New"`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('▒', cx, cy+1);
    }},
    { id:'leg-player',   fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); drawPlayerSprite(cx,cy); }},
    { id:'leg-goblin',   fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); if(currentWorld===2) drawUpior(cx,cy); else drawGoblin(cx,cy); }},
    { id:'leg-szkielet', fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); if(currentWorld===2) drawBazyliszek(cx,cy); else drawSzkielet(cx,cy); }},
    { id:'leg-troll',    fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); if(currentWorld===2) drawRycerz(cx,cy); else drawTroll(cx,cy); }},
    { id:'leg-boss',     fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); if(currentWorld===2) drawBoss(cx,cy,'Cerber'); else drawBoss(cx,cy,'Demon'); }},
    { id:'leg-stairs',   fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); drawStairs(cx,cy); }},
    { id:'leg-gold',     fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); drawGoldBag(cx,cy); }},
    { id:'leg-potion',   fn:(cx,cy) => { ctx.fillStyle='#08080f'; ctx.fillRect(0,0,S,S); drawPotion(cx,cy); }},
  ];
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    el.width = S; el.height = S;
    ctx = el.getContext('2d');
    ctx.save();
    ctx.beginPath(); ctx.rect(0,0,S,S); ctx.clip();
    item.fn(S/2, S/2);
    ctx.restore();
  }
  ctx = gameCtx;
}

// ===================== TOUCH =====================
function applyModeLayout() {
  document.body.classList.toggle('mode-keyboard', inputMode === 'keyboard');
  document.body.classList.toggle('mode-touch', inputMode === 'touch');
}

function updateTouchUI() {
  const tc = document.getElementById('touch-controls');
  const ts = document.getElementById('touch-shop-btns');
  if (!tc || !ts) return;
  const touch = inputMode === 'touch';
  const playing = game.state === 'playing';
  const shopping = game.state === 'shop';
  tc.style.display = (touch && playing) ? 'flex' : 'none';
  ts.style.display = (touch && shopping) ? 'flex' : 'none';
}

// D-pad buttons
const dpadMap = [
  ['btn-up',    () => move(0,-1)],
  ['btn-down',  () => move(0,1)],
  ['btn-left',  () => move(-1,0)],
  ['btn-right', () => move(1,0)],
  ['btn-potion',() => {
    const p = game.player;
    if (p && p.potions > 0) {
      const heal = randInt(30,50); p.hp = Math.min(p.maxHp, p.hp+heal); p.potions--;
      msg(t('msg_potion_use', heal), '#00ffff');
    } else msg(t('msg_no_potion'), '#ff4444');
  }],
  ['btn-scores', () => { if (game.state==='playing') game.showScores = !game.showScores; }],
];
for (const [id, action] of dpadMap) {
  const el = document.getElementById(id);
  if (!el) continue;
  el.addEventListener('touchstart', e => { e.preventDefault(); el.classList.add('pressed'); action(); }, {passive:false});
  el.addEventListener('touchend',   e => { e.preventDefault(); el.classList.remove('pressed'); }, {passive:false});
  el.addEventListener('mousedown',  e => { action(); });
}

// Shop buttons
const shopMap = [
  ['btn-shop-1', '1'],
  ['btn-shop-2', '2'],
  ['btn-shop-3', '3'],
  ['btn-shop-q', 'q'],
];
for (const [id, key] of shopMap) {
  const el = document.getElementById(id);
  if (!el) continue;
  el.addEventListener('touchstart', e => { e.preventDefault(); el.classList.add('pressed'); buyItem(key); }, {passive:false});
  el.addEventListener('touchend',   e => { e.preventDefault(); el.classList.remove('pressed'); updateTouchUI(); }, {passive:false});
  el.addEventListener('mousedown',  () => { buyItem(key); updateTouchUI(); });
}

// Swipe na canvasie
let swipeStart = null;
canvas.addEventListener('touchstart', e => {
  if (game.state === 'playing') {
    swipeStart = {x: e.touches[0].clientX, y: e.touches[0].clientY};
  }
}, {passive:true});
canvas.addEventListener('touchend', e => {
  // Zamknij overlay wyników
  if (game.showScores) { e.preventDefault(); game.showScores = false; return; }
  // Wybór języka — tap na przycisk
  if (game.state === 'lang') {
    e.preventDefault();
    const t0 = e.changedTouches[0];
    const {x, y} = getCanvasPos(t0);
    const hit = getLangBtnAt(x, y);
    if (hit) { lang = hit; applyLang(); game.state = 'mode'; }
    return;
  }
  // Wybór trybu — tap na przycisk
  if (game.state === 'mode') {
    e.preventDefault();
    const t0 = e.changedTouches[0];
    const {x, y} = getCanvasPos(t0);
    const hit = getModeBtn(x, y);
    if (hit) { inputMode = hit; applyModeLayout(); game.state = 'difficulty'; }
    return;
  }
  // Wybór trudności — tap na przycisk
  if (game.state === 'difficulty') {
    e.preventDefault();
    const t0 = e.changedTouches[0];
    const {x, y} = getCanvasPos(t0);
    const hit = getDiffBtn(x, y);
    if (hit) { difficulty = hit; game.state = 'title'; }
    return;
  }
  // Wybór zdolności — tap
  if (game.state === 'ability_pick') {
    e.preventDefault();
    const t0 = e.changedTouches[0];
    const {x, y} = getCanvasPos(t0);
    const BW=160, BH=36;
    const choices = game.abilityChoices||[];
    choices.forEach((key,i)=>{
      const bx=W/2-BW/2, by=H/2-28+i*44;
      if (x>=bx&&x<=bx+BW&&y>=by&&y<=by+BH) applyAbility(key);
    });
    return;
  }
  // Ekran tytułowy — tap = Enter
  if (game.state === 'title') {
    const {x, y} = getCanvasPos(e.changedTouches[0]);
    const hasSave = canContinue();
    const scoresY = H/2 + (hasSave ? 44 : 30);
    if (y >= scoresY-10 && y <= scoresY+10) { game.state = 'scores'; return; }
    if (hasSave && y >= H/2+20 && y <= H/2+40) { loadSavedGame(); return; }
    initGame(); return;
  }
  if (game.state === 'scores') { game.state = 'title'; return; }
  // Ekran śmierci/zwycięstwa — tap = restart
  if (game.state === 'dead') { initGame(); return; }
  if (game.state === 'victory') { currentWorld=1; initGame(); return; }
  if (game.state === 'world_complete') {
    const {x, y} = getCanvasPos(e.changedTouches[0]);
    const bw = 200, bh = 30;
    const yesY = H/2 + 22, noY = H/2 + 62;
    if (y >= yesY && y <= yesY+bh) { currentWorld=2; applyWorldSettings(2); game.state='title'; return; }
    if (y >= noY  && y <= noY+bh)  { currentWorld=1; applyWorldSettings(1); showTitle(); return; }
    return;
  }
  // Swipe do ruchu
  if (game.state === 'playing' && swipeStart) {
    const dx = e.changedTouches[0].clientX - swipeStart.x;
    const dy = e.changedTouches[0].clientY - swipeStart.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 20) {
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1, 0);
      else move(0, dy > 0 ? 1 : -1);
    }
    swipeStart = null;
  }
}, {passive:false});

// Wrap istniejący buyItem i initGame żeby odświeżały UI
const _origBuyItem = buyItem;
buyItem = function(key) { _origBuyItem(key); updateTouchUI(); };

// Odświeżanie UI przy zmianie stanu — hook na draw
const _origDraw = draw;
draw = function() {
  _origDraw();
  // odśwież raz po zmianie stanu (tylko gdy nie animujemy)
};
// Zamiast hackować draw, wywołaj updateTouchUI przy każdej zmianie stanu
const _origInitGame = initGame;
initGame = function() { _origInitGame(); updateTouchUI(); };

// ===================== START =====================
setTimeout(drawLegendSprites, 50);
applyModeLayout();
showTitle();
draw();
