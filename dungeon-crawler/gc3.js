

// ===== BOSS 1: SMOK =====
function drawBossSmok(cx, cy) {
  ctx.save();
  // przesuń całość lekko w górę żeby ogon się zmieścił
  cy = cy - 1;
  const p  = Math.sin(Date.now()/280)*0.5+0.5;
  const p2 = Math.sin(Date.now()/180+1)*0.5+0.5;

  // Poświata czerwono-pomarańczowa
  const glowR = TILE*1.2+p*4;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(220,80,0,${0.4+p*0.2})`);
  glow.addColorStop(0.5,'rgba(120,20,0,0.12)');
  glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);

  // Cień
  ctx.globalAlpha=0.35; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,5.5,1.6,0,0,Math.PI*2); ctx.fill();
  ctx.globalAlpha=1;

  // ===== OGON (w dół, zakrzywiony w prawo) =====
  ctx.strokeStyle='#5a0c08'; ctx.lineWidth=4; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx+1,cy+5); ctx.bezierCurveTo(cx+3,cy+8,cx+6,cy+9,cx+7,cy+7); ctx.stroke();
  ctx.strokeStyle='#901810'; ctx.lineWidth=2.2;
  ctx.beginPath(); ctx.moveTo(cx+1,cy+5); ctx.bezierCurveTo(cx+3,cy+8,cx+6,cy+9,cx+7,cy+7); ctx.stroke();
  // kolce ogona
  ctx.fillStyle='#6a1010'; ctx.strokeStyle='#1a0404'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx+4,cy+8.5); ctx.lineTo(cx+2.5,cy+9.5); ctx.lineTo(cx+3.5,cy+7.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // grot końca ogona
  ctx.fillStyle='#cc2820';
  ctx.beginPath(); ctx.moveTo(cx+7,cy+7); ctx.lineTo(cx+8.5,cy+6.5); ctx.lineTo(cx+7.5,cy+8.5); ctx.closePath(); ctx.fill(); ctx.stroke();

  // ===== TYLNE ŁAPY =====
  ctx.fillStyle='#6a1010'; ctx.strokeStyle='#1a0404'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.ellipse(cx-3,cy+5.5,1.8,1.2,0.4,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+2,cy+5.5,1.8,1.2,-0.3,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // pazury tylnych łap
  ctx.strokeStyle='#d0b090'; ctx.lineWidth=0.8; ctx.lineCap='round';
  for(let s=-1;s<=1;s+=2){
    const bx=cx+(s===-1?-3:2), by=cy+5.5;
    for(let i=0;i<3;i++){const a=Math.PI*0.5+s*(i-1)*0.35; ctx.beginPath(); ctx.moveTo(bx+Math.cos(a)*1.6,by+Math.sin(a)*1.2); ctx.lineTo(bx+Math.cos(a)*2.8,by+Math.sin(a)*2); ctx.stroke();}
  }

  // ===== SKRZYDŁA — złożone/uniesione do GÓRY i DO TYŁU =====
  // lewe skrzydło (idzie do góry-lewo od barku)
  ctx.fillStyle='#200608'; ctx.strokeStyle='#4a0c10'; ctx.lineWidth=0.9;
  ctx.beginPath();
  ctx.moveTo(cx-2, cy-1);           // bark
  ctx.bezierCurveTo(cx-4, cy-4,  cx-8, cy-9,  cx-9, cy-7);   // wierzchołek
  ctx.bezierCurveTo(cx-9, cy-4,  cx-7, cy-1,  cx-5, cy+1);   // dolna krawędź
  ctx.bezierCurveTo(cx-4, cy+1,  cx-2, cy+0,  cx-2, cy-1);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // prawe skrzydło
  ctx.beginPath();
  ctx.moveTo(cx+2, cy-1);
  ctx.bezierCurveTo(cx+4, cy-4,  cx+8, cy-9,  cx+9, cy-7);
  ctx.bezierCurveTo(cx+9, cy-4,  cx+7, cy-1,  cx+5, cy+1);
  ctx.bezierCurveTo(cx+4, cy+1,  cx+2, cy+0,  cx+2, cy-1);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // membrana (przeźroczysta, rdzawa)
  ctx.fillStyle='rgba(140,30,10,0.35)';
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1); ctx.bezierCurveTo(cx-4,cy-4,cx-8,cy-8,cx-8.5,cy-6); ctx.bezierCurveTo(cx-8,cy-3,cx-6,cy-1,cx-4.5,cy+0.5); ctx.bezierCurveTo(cx-3.5,cy,cx-2.5,cy-0.5,cx-2,cy-1); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-1); ctx.bezierCurveTo(cx+4,cy-4,cx+8,cy-8,cx+8.5,cy-6); ctx.bezierCurveTo(cx+8,cy-3,cx+6,cy-1,cx+4.5,cy+0.5); ctx.bezierCurveTo(cx+3.5,cy,cx+2.5,cy-0.5,cx+2,cy-1); ctx.closePath(); ctx.fill();
  // żebra/palce skrzydeł
  ctx.strokeStyle='#3a0c0c'; ctx.lineWidth=0.65; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1); ctx.lineTo(cx-8.5,cy-8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1); ctx.lineTo(cx-9,cy-5.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1); ctx.lineTo(cx-7,cy-0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-1); ctx.lineTo(cx+8.5,cy-8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-1); ctx.lineTo(cx+9,cy-5.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-1); ctx.lineTo(cx+7,cy-0.5); ctx.stroke();

  // ===== CIAŁO (wydłużone pionowo) =====
  const bodyG=ctx.createRadialGradient(cx-0.5,cy+1,0.5,cx,cy+2,5.5);
  bodyG.addColorStop(0,'#c03820'); bodyG.addColorStop(0.45,'#781408'); bodyG.addColorStop(1,'#180404');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#120404'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+2,3.8,4.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // brzuch (płytki łuskowaty)
  const bellyG=ctx.createLinearGradient(cx,cy-1,cx,cy+5);
  bellyG.addColorStop(0,'rgba(255,140,50,0.5)'); bellyG.addColorStop(1,'rgba(160,40,0,0.1)');
  ctx.fillStyle=bellyG;
  ctx.beginPath(); ctx.ellipse(cx,cy+2.5,1.8,3.5,0,0,Math.PI*2); ctx.fill();
  // łuski (półkola)
  ctx.strokeStyle='rgba(200,55,15,0.45)'; ctx.lineWidth=0.55;
  for(let r=0;r<4;r++) for(let c=0;c<3;c++){
    const sx=cx-2+c*2+(r%2), sy=cy-0.5+r*1.8;
    ctx.beginPath(); ctx.arc(sx,sy,0.85,Math.PI,Math.PI*2); ctx.stroke();
  }
  // kolce grzbietowe (pionowe, środek ciała)
  ctx.fillStyle='#6a1010'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.5;
  for(let i=0;i<4;i++){
    const sx=cx-0.6+i*0.4, sy=cy-1+i*1.5;
    ctx.beginPath(); ctx.moveTo(sx-0.7,sy+1); ctx.lineTo(sx,sy-1.5); ctx.lineTo(sx+0.7,sy+1); ctx.closePath(); ctx.fill(); ctx.stroke();
  }

  // ===== PRZEDNIE ŁAPY =====
  ctx.fillStyle='#8a1818'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx-4,cy+0.5,1.8,1.2,-0.5,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+4,cy+0.5,1.8,1.2,0.5,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle='#d0b090'; ctx.lineWidth=0.85; ctx.lineCap='round';
  for(let i=0;i<3;i++){const a=-0.4+i*0.4; ctx.beginPath(); ctx.moveTo(cx-4+Math.cos(a+Math.PI)*1.5,cy+0.5+Math.sin(a+Math.PI)*1.1); ctx.lineTo(cx-4+Math.cos(a+Math.PI)*2.8,cy+0.5+Math.sin(a+Math.PI)*1.9); ctx.stroke();}
  for(let i=0;i<3;i++){const a=-0.4+i*0.4; ctx.beginPath(); ctx.moveTo(cx+4+Math.cos(a)*1.5,cy+0.5+Math.sin(a)*1.1); ctx.lineTo(cx+4+Math.cos(a)*2.8,cy+0.5+Math.sin(a)*1.9); ctx.stroke();}

  // ===== SZYJA =====
  const neckG=ctx.createLinearGradient(cx-2,cy-4,cx+2,cy-4);
  neckG.addColorStop(0,'#380a08'); neckG.addColorStop(0.5,'#882010'); neckG.addColorStop(1,'#380a08');
  ctx.fillStyle=neckG; ctx.strokeStyle='#120404'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx,cy-3.5,2,2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // kolce szyi
  ctx.fillStyle='#5a1010'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.4;
  ctx.beginPath(); ctx.moveTo(cx-2.2,cy-3); ctx.lineTo(cx-3.2,cy-4.5); ctx.lineTo(cx-1.5,cy-3.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2.2,cy-3); ctx.lineTo(cx+3.2,cy-4.5); ctx.lineTo(cx+1.5,cy-3.5); ctx.closePath(); ctx.fill(); ctx.stroke();

  // ===== GŁOWA — wydłużony pysk smoczy =====
  // tył czaszki
  const headG=ctx.createRadialGradient(cx,cy-7,0.8,cx,cy-7,4.5);
  headG.addColorStop(0,'#c83820'); headG.addColorStop(0.55,'#8a1408'); headG.addColorStop(1,'#200606');
  ctx.fillStyle=headG; ctx.strokeStyle='#120404'; ctx.lineWidth=0.9;
  ctx.beginPath();
  ctx.moveTo(cx-3,cy-5.5);
  ctx.bezierCurveTo(cx-3.5,cy-8, cx-2,cy-10.5, cx,cy-11);
  ctx.bezierCurveTo(cx+2,cy-10.5, cx+3.5,cy-8, cx+3,cy-5.5);
  ctx.bezierCurveTo(cx+2,cy-5, cx-2,cy-5, cx-3,cy-5.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // szczęka górna (pysk — wydłużona)
  ctx.fillStyle='#7a1208'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.8;
  ctx.beginPath();
  ctx.moveTo(cx-2.5,cy-5.5);
  ctx.bezierCurveTo(cx-3,cy-4, cx-2.5,cy-2.8, cx,cy-2.5);
  ctx.bezierCurveTo(cx+2.5,cy-2.8, cx+3,cy-4, cx+2.5,cy-5.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // szczęka dolna (otwarta)
  ctx.fillStyle='#4a0c06'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.7;
  ctx.beginPath();
  ctx.moveTo(cx-2.2,cy-5.5);
  ctx.bezierCurveTo(cx-2.8,cy-4, cx-2,cy-1.5, cx,cy-1.5);
  ctx.bezierCurveTo(cx+2,cy-1.5, cx+2.8,cy-4, cx+2.2,cy-5.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // wnętrze gardła (ciemne)
  ctx.fillStyle='#0d0404';
  ctx.beginPath(); ctx.ellipse(cx,cy-3.8,1.5,1.2,0,0,Math.PI*2); ctx.fill();
  // zęby górne
  ctx.fillStyle='#ede0c0'; ctx.strokeStyle='#a09070'; ctx.lineWidth=0.4;
  for(let i=0;i<5;i++){const tx=cx-2+i; ctx.beginPath(); ctx.moveTo(tx,cy-5.2); ctx.lineTo(tx+0.35,cy-3.8); ctx.lineTo(tx+0.7,cy-5.2); ctx.closePath(); ctx.fill(); ctx.stroke();}
  // zęby dolne
  for(let i=0;i<4;i++){const tx=cx-1.5+i; ctx.beginPath(); ctx.moveTo(tx,cy-1.8); ctx.lineTo(tx+0.35,cy-3.2); ctx.lineTo(tx+0.7,cy-1.8); ctx.closePath(); ctx.fill(); ctx.stroke();}
  // język rozwidlony
  ctx.strokeStyle='#cc1828'; ctx.lineWidth=1; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx,cy-2.5); ctx.lineTo(cx-0.8,cy-0.8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,cy-2.5); ctx.lineTo(cx+0.8,cy-0.8); ctx.stroke();
  // nozdrza
  ctx.fillStyle='#120404';
  ctx.beginPath(); ctx.ellipse(cx-1,cy-5.5,0.5,0.38,0.2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1,cy-5.5,0.5,0.38,-0.2,0,Math.PI*2); ctx.fill();
  // rogi — 2 główne zakrzywione do tyłu
  ctx.fillStyle='#3a0c08'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-1.8,cy-9.5); ctx.bezierCurveTo(cx-3,cy-11,cx-4.5,cy-10,cx-4,cy-8.5); ctx.bezierCurveTo(cx-3.5,cy-8,cx-2,cy-9,cx-1.8,cy-9.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.8,cy-9.5); ctx.bezierCurveTo(cx+3,cy-11,cx+4.5,cy-10,cx+4,cy-8.5); ctx.bezierCurveTo(cx+3.5,cy-8,cx+2,cy-9,cx+1.8,cy-9.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // małe kolce na głowie
  ctx.fillStyle='#5a1010'; ctx.strokeStyle='#120404'; ctx.lineWidth=0.4;
  ctx.beginPath(); ctx.moveTo(cx-3,cy-7.5); ctx.lineTo(cx-4,cy-9); ctx.lineTo(cx-2.2,cy-8); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+3,cy-7.5); ctx.lineTo(cx+4,cy-9); ctx.lineTo(cx+2.2,cy-8); ctx.closePath(); ctx.fill(); ctx.stroke();
  // oczy
  ctx.fillStyle='#ffaa00';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-7.5,1.2,1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-7.5,1.2,1,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#ee5500';
  ctx.beginPath(); ctx.arc(cx-1.5,cy-7.5,0.75,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-7.5,0.75,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a0500';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-7.5,0.2,0.7,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-7.5,0.2,0.7,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(255,140,0,${0.35+p*0.4})`; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-7.5,1.5,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-7.5,1.5,0,Math.PI*2); ctx.stroke();

  ctx.restore();
}

// ===== BOSS 2: DEMON =====
function drawBossDemon(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/260)*0.5+0.5;
  // Poświata czerwona
  const glowR=TILE*1.1+p*3;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(220,30,0,${0.38+p*0.2})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  // Cień
  ctx.globalAlpha=0.32; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+6,5,1.5,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  // Skrzydła (bliżej ciała, membranowe)
  const wingC='#2a0008';
  ctx.fillStyle=wingC; ctx.strokeStyle='#5a0015'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1);
  ctx.bezierCurveTo(cx-7,cy-7,cx-9,cy-1,cx-7,cy+3);
  ctx.bezierCurveTo(cx-5,cy+4,cx-3,cy+2,cx-2,cy+1); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-1);
  ctx.bezierCurveTo(cx+7,cy-7,cx+9,cy-1,cx+7,cy+3);
  ctx.bezierCurveTo(cx+5,cy+4,cx+3,cy+2,cx+2,cy+1); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Żyłki skrzydeł
  ctx.strokeStyle='#7a0020'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx-2,cy); ctx.lineTo(cx-7,cy-4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-2,cy+0.5); ctx.lineTo(cx-6.5,cy+2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy); ctx.lineTo(cx+7,cy-4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy+0.5); ctx.lineTo(cx+6.5,cy+2); ctx.stroke();
  // Ogon
  ctx.strokeStyle='#4a0010'; ctx.lineWidth=2; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx+2.5,cy+5); ctx.bezierCurveTo(cx+5,cy+6,cx+7,cy+4,cx+6.5,cy+1); ctx.stroke();
  ctx.fillStyle='#6a0018'; ctx.strokeStyle='#3a000c'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx+6.5,cy+1); ctx.lineTo(cx+8,cy+0.5); ctx.lineTo(cx+7,cy+2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Nogi
  ctx.fillStyle='#4a0012'; ctx.strokeStyle='#200008'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx-2,cy+5,1.8,2.5,0.1,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+2,cy+5,1.8,2.5,-0.1,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Kopyta
  ctx.fillStyle='#1a0006';
  ctx.beginPath(); ctx.ellipse(cx-2.2,cy+7.2,1.5,0.8,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+2.2,cy+7.2,1.5,0.8,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Ciało (muskularne)
  const bodyG=ctx.createRadialGradient(cx-1,cy+1,1,cx,cy+2,5.5);
  bodyG.addColorStop(0,'#8a1020'); bodyG.addColorStop(0.5,'#5a0810'); bodyG.addColorStop(1,'#2a0006');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#1a0004'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+1.5,4.5,4.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Mięśnie (żebra)
  ctx.strokeStyle='rgba(180,40,50,0.4)'; ctx.lineWidth=0.6;
  for(let i=0;i<3;i++){const oy=cy+i*1.5-0.5; ctx.beginPath(); ctx.moveTo(cx-3.5,oy); ctx.bezierCurveTo(cx-1,oy-0.5,cx+1,oy-0.5,cx+3.5,oy); ctx.stroke();}
  // Ramiona z pazurami
  ctx.fillStyle='#6a0e1c'; ctx.strokeStyle='#1a0004'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx-5,cy-0.5,2.5,1.8,-0.4,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+5,cy-0.5,2.5,1.8,0.4,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Pazury lewe
  ctx.strokeStyle='#d0a0a0'; ctx.lineWidth=0.9; ctx.lineCap='round';
  for(let i=0;i<4;i++){const a=-0.5+i*0.3; ctx.beginPath(); ctx.moveTo(cx-6.8+Math.cos(a+Math.PI)*1.3,cy-0.5+Math.sin(a+Math.PI)*1.3); ctx.lineTo(cx-6.8+Math.cos(a+Math.PI)*2.5,cy-0.5+Math.sin(a+Math.PI)*2.5); ctx.stroke();}
  // Głowa
  const headG=ctx.createRadialGradient(cx,cy-5,0.5,cx,cy-4.5,4.5);
  headG.addColorStop(0,'#8a1020'); headG.addColorStop(0.6,'#5a0810'); headG.addColorStop(1,'#2a0006');
  ctx.fillStyle=headG; ctx.strokeStyle='#1a0004'; ctx.lineWidth=0.9;
  ctx.beginPath();
  ctx.moveTo(cx-4,cy-2.5); ctx.bezierCurveTo(cx-5,cy-5.5,cx-3.5,cy-9,cx,cy-9.5);
  ctx.bezierCurveTo(cx+3.5,cy-9,cx+5,cy-5.5,cx+4,cy-2.5);
  ctx.bezierCurveTo(cx+2,cy-1.8,cx-2,cy-1.8,cx-4,cy-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Rogi (zawinięte jak u barana)
  ctx.strokeStyle='#3a0010'; ctx.lineWidth=2.2; ctx.lineCap='round';
  ctx.beginPath(); ctx.arc(cx-3.8,cy-7.5,2.2,Math.PI*0.1,Math.PI*0.9,false); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+3.8,cy-7.5,2.2,Math.PI*0.1,Math.PI*0.9,true); ctx.stroke();
  ctx.strokeStyle='#6a0020'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.arc(cx-3.8,cy-7.5,2.2,Math.PI*0.1,Math.PI*0.9,false); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+3.8,cy-7.5,2.2,Math.PI*0.1,Math.PI*0.9,true); ctx.stroke();
  // Oczy — żółte pulsujące
  const er=Math.floor(220+p*35), eg=Math.floor(120+p*80);
  ctx.fillStyle=`rgb(${er},${eg},0)`;
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-5.5,1.3,1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-5.5,1.3,1,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#ff3300';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-5.5,0.8,0.65,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-5.5,0.8,0.65,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#100000';
  ctx.beginPath(); ctx.arc(cx-1.5,cy-5.5,0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-5.5,0.4,0,Math.PI*2); ctx.fill();
  // Usta z kłami
  ctx.fillStyle='#0a0000';
  ctx.beginPath(); ctx.ellipse(cx,cy-3.2,2,0.9,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#e8d8d8'; ctx.strokeStyle='#888'; ctx.lineWidth=0.4;
  ctx.beginPath(); ctx.moveTo(cx-1.3,cy-3.2); ctx.lineTo(cx-0.9,cy-1.5); ctx.lineTo(cx-0.3,cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+0.3,cy-3.2); ctx.lineTo(cx+0.9,cy-1.5); ctx.lineTo(cx+1.3,cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ===== BOSS 3: LICH =====
function drawBossLich(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/220)*0.5+0.5;
  // Poświata fioletowa
  const glowR=TILE*1.1+p*3;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(120,0,200,${0.38+p*0.2})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  // Cień
  ctx.globalAlpha=0.25; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+6,4,1.2,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  // Szata (postrzępiona)
  ctx.fillStyle='#0a0015'; ctx.strokeStyle='#2a0050'; ctx.lineWidth=0.9;
  ctx.beginPath();
  ctx.moveTo(cx-4,cy-1);
  ctx.bezierCurveTo(cx-5.5,cy+2,cx-5,cy+6,cx-3.5,cy+8);
  // strzępki na dole
  ctx.lineTo(cx-2.5,cy+7); ctx.lineTo(cx-1.5,cy+8.5); ctx.lineTo(cx-0.5,cy+7); ctx.lineTo(cx+0.5,cy+8.5);
  ctx.lineTo(cx+1.5,cy+7); ctx.lineTo(cx+2.5,cy+8.5); ctx.lineTo(cx+3.5,cy+7);
  ctx.bezierCurveTo(cx+5,cy+6,cx+5.5,cy+2,cx+4,cy-1); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Wzór na szacie (runy)
  ctx.strokeStyle='rgba(120,0,200,0.5)'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx-1,cy+1); ctx.lineTo(cx,cy+3); ctx.lineTo(cx+1,cy+1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-2,cy+3); ctx.lineTo(cx+2,cy+3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,cy+3); ctx.lineTo(cx,cy+5); ctx.stroke();
  // Berło (lewa ręka uniesiona)
  ctx.strokeStyle='#5a4080'; ctx.lineWidth=1.5; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx-4.5,cy+1); ctx.lineTo(cx-6.5,cy-5); ctx.stroke();
  // Orb na berle (pulsujący fiolet)
  const orbG=ctx.createRadialGradient(cx-6.5,cy-6,0.3,cx-6.5,cy-6,2.2);
  const ob=Math.floor(150+p*105), og=Math.floor(p*30);
  orbG.addColorStop(0,`rgba(255,${og},255,0.9)`);
  orbG.addColorStop(0.4,`rgba(${ob},0,${ob},0.8)`);
  orbG.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=orbG; ctx.beginPath(); ctx.arc(cx-6.5,cy-6,2.2+p*0.5,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(200,50,255,${0.6+p*0.4})`; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.arc(cx-6.5,cy-6,1.5,0,Math.PI*2); ctx.stroke();
  // Kościste ręce
  ctx.strokeStyle='#d0c8b8'; ctx.lineWidth=1; ctx.lineCap='round';
  // lewa ręka
  ctx.beginPath(); ctx.moveTo(cx-3.5,cy); ctx.lineTo(cx-5.5,cy+0.5); ctx.stroke();
  ctx.fillStyle='#c8c0a8'; ctx.strokeStyle='#888'; ctx.lineWidth=0.5;
  for(let i=0;i<3;i++){const a=-0.3+i*0.3; ctx.beginPath(); ctx.moveTo(cx-5.5+Math.cos(a)*1.2,cy+0.5+Math.sin(a)*1.2); ctx.lineTo(cx-5.5+Math.cos(a)*2.2,cy+0.5+Math.sin(a)*2.2); ctx.stroke();}
  // prawa ręka (z fioletową aurą)
  ctx.strokeStyle='#d0c8b8'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(cx+3.5,cy); ctx.lineTo(cx+5.5,cy-0.5); ctx.stroke();
  const handG=ctx.createRadialGradient(cx+5.5,cy-0.5,0,cx+5.5,cy-0.5,2.5);
  handG.addColorStop(0,`rgba(180,0,255,${0.4+p*0.3})`); handG.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=handG; ctx.beginPath(); ctx.arc(cx+5.5,cy-0.5,2.5,0,Math.PI*2); ctx.fill();
  for(let i=0;i<3;i++){const a=-0.3+i*0.3; ctx.strokeStyle='#c8c0a8'; ctx.lineWidth=0.5; ctx.beginPath(); ctx.moveTo(cx+5.5+Math.cos(a)*1.1,cy-0.5+Math.sin(a)*1.1); ctx.lineTo(cx+5.5+Math.cos(a)*2.1,cy-0.5+Math.sin(a)*2.1); ctx.stroke();}
  // Czaszka — twarz
  ctx.fillStyle='#d8d0b8'; ctx.strokeStyle='#888'; ctx.lineWidth=0.8;
  ctx.beginPath();
  ctx.moveTo(cx-3,cy-3); ctx.bezierCurveTo(cx-3.5,cy-6,cx-2.5,cy-9.5,cx,cy-10);
  ctx.bezierCurveTo(cx+2.5,cy-9.5,cx+3.5,cy-6,cx+3,cy-3);
  ctx.bezierCurveTo(cx+2,cy-2.5,cx-2,cy-2.5,cx-3,cy-3); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Zgnilizna (plamy)
  ctx.fillStyle='rgba(80,100,60,0.3)';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-4.5,1,1.5,0.2,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.8,cy-5,0.8,1.2,-0.2,0,Math.PI*2); ctx.fill();
  // Oczodoły — puste, pulsujące fiolet
  ctx.fillStyle='#0a0012';
  ctx.beginPath(); ctx.ellipse(cx-1.4,cy-6,1.4,1.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.4,cy-6,1.4,1.1,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=`rgba(160,0,255,${0.5+p*0.5})`;
  ctx.beginPath(); ctx.arc(cx-1.4,cy-6,0.7,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.4,cy-6,0.7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=`rgba(230,180,255,${0.6+p*0.4})`;
  ctx.beginPath(); ctx.arc(cx-1.4,cy-6,0.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.4,cy-6,0.3,0,Math.PI*2); ctx.fill();
  // Nos (trójkąt kości)
  ctx.fillStyle='#0a0a12';
  ctx.beginPath(); ctx.moveTo(cx-0.4,cy-4.8); ctx.lineTo(cx+0.4,cy-4.8); ctx.lineTo(cx,cy-3.8); ctx.closePath(); ctx.fill();
  // Szczęka (szeroko otwarta)
  ctx.fillStyle='#c8c0a8'; ctx.strokeStyle='#888'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-2.5,cy-3); ctx.bezierCurveTo(cx-2.8,cy-1.5,cx-1.5,cy-1,cx,cy-1); ctx.bezierCurveTo(cx+1.5,cy-1,cx+2.8,cy-1.5,cx+2.5,cy-3); ctx.fill(); ctx.stroke();
  // Zęby
  ctx.fillStyle='#e8e0c8'; ctx.strokeStyle='#aaa'; ctx.lineWidth=0.4;
  for(let i=-2;i<=2;i++){ctx.beginPath(); ctx.rect(cx+i*0.9-0.35,cy-3,0.7,0.8); ctx.fill(); ctx.stroke();}
  // Kaptur czaszki
  ctx.fillStyle='#08000f'; ctx.strokeStyle='#2a0040'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx-3.5,cy-5); ctx.bezierCurveTo(cx-4,cy-8,cx-2,cy-11,cx,cy-11.5); ctx.bezierCurveTo(cx+2,cy-11,cx+4,cy-8,cx+3.5,cy-5); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ===== BOSS 4: WAMPIR =====
function drawBossWampir(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/350)*0.5+0.5;
  // Poświata niebiesko-fioletowa
  const glowR=TILE*1.1+p*3;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(40,0,120,${0.4+p*0.18})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  // Cień
  ctx.globalAlpha=0.28; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+6,4.5,1.3,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  // Peleryna — rozpostarta jak skrzydła
  ctx.fillStyle='#08001a'; ctx.strokeStyle='#1a0038'; ctx.lineWidth=0.9;
  ctx.beginPath();
  ctx.moveTo(cx,cy-3);
  ctx.bezierCurveTo(cx-3,cy-1,cx-8,cy-2,cx-9,cy+2);
  ctx.bezierCurveTo(cx-8,cy+5,cx-5,cy+7,cx-3.5,cy+8);
  ctx.lineTo(cx-2.5,cy+7.5); ctx.lineTo(cx-1.5,cy+8.5); ctx.lineTo(cx,cy+7);
  ctx.lineTo(cx+1.5,cy+8.5); ctx.lineTo(cx+2.5,cy+7.5); ctx.lineTo(cx+3.5,cy+8);
  ctx.bezierCurveTo(cx+5,cy+7,cx+8,cy+5,cx+9,cy+2);
  ctx.bezierCurveTo(cx+8,cy-2,cx+3,cy-1,cx,cy-3);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Wewnętrzna strona peleryny (czerwona)
  ctx.fillStyle='#2a0008';
  ctx.beginPath();
  ctx.moveTo(cx,cy-2.5);
  ctx.bezierCurveTo(cx-2,cy,cx-5,cy+1,cx-6,cy+4);
  ctx.bezierCurveTo(cx-4,cy+6,cx-2,cy+7,cx,cy+6.5);
  ctx.bezierCurveTo(cx+2,cy+7,cx+4,cy+6,cx+6,cy+4);
  ctx.bezierCurveTo(cx+5,cy+1,cx+2,cy,cx,cy-2.5); ctx.closePath(); ctx.fill();
  // Ciało (elegancki strój)
  const bodyG=ctx.createLinearGradient(cx-3.5,cy-1,cx+3.5,cy+3);
  bodyG.addColorStop(0,'#1a1a2a'); bodyG.addColorStop(0.5,'#0f0f1e'); bodyG.addColorStop(1,'#050510');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#2a2a3a'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx,cy+1.5,3.5,4,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Krawat (czerwony)
  ctx.fillStyle='#8a0018';
  ctx.beginPath(); ctx.moveTo(cx-0.7,cy-2.5); ctx.lineTo(cx+0.7,cy-2.5); ctx.lineTo(cx+0.5,cy+1); ctx.lineTo(cx,cy+2.5); ctx.lineTo(cx-0.5,cy+1); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#cc0025';
  ctx.beginPath(); ctx.moveTo(cx-0.6,cy-2.5); ctx.lineTo(cx+0.6,cy-2.5); ctx.lineTo(cx,cy-1.5); ctx.closePath(); ctx.fill();
  // Ręce (w rękawiczkach)
  ctx.fillStyle='#100010'; ctx.strokeStyle='#201820'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.ellipse(cx-5,cy,2.2,1.6,-0.3,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+5,cy,2.2,1.6,0.3,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Pazury rękawiczek
  ctx.strokeStyle='#c0c0d0'; ctx.lineWidth=0.8; ctx.lineCap='round';
  for(let i=0;i<4;i++){const a=-0.5+i*0.32; ctx.beginPath(); ctx.moveTo(cx-6.5+Math.cos(a+Math.PI)*1.1,cy+Math.sin(a+Math.PI)*1.1); ctx.lineTo(cx-6.5+Math.cos(a+Math.PI)*2.2,cy+Math.sin(a+Math.PI)*2.2); ctx.stroke();}
  // Szyja (blada)
  ctx.fillStyle='#d8d0e0'; ctx.strokeStyle='#a098b0'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.ellipse(cx,cy-2.5,1.5,1.2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  // Głowa (blada, arystokratyczna)
  const headG=ctx.createRadialGradient(cx,cy-5.5,0.5,cx,cy-5,4);
  headG.addColorStop(0,'#e0d8ee'); headG.addColorStop(0.6,'#b0a8c8'); headG.addColorStop(1,'#6860a0');
  ctx.fillStyle=headG; ctx.strokeStyle='#4a4068'; ctx.lineWidth=0.8;
  ctx.beginPath();
  ctx.moveTo(cx-3.2,cy-3.2); ctx.bezierCurveTo(cx-3.8,cy-5.5,cx-2.5,cy-9,cx,cy-9.5);
  ctx.bezierCurveTo(cx+2.5,cy-9,ctx+3.8,cy-5.5,cx+3.2,cy-3.2);
  ctx.bezierCurveTo(cx+2,cy-2.5,cx-2,cy-2.5,cx-3.2,cy-3.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Włosy (czarne, zaczesane)
  ctx.fillStyle='#0a0010'; ctx.strokeStyle='#1a0020'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx-3.2,cy-5); ctx.bezierCurveTo(cx-3,cy-8,cx-1.5,cy-9.5,cx,cy-9.5); ctx.bezierCurveTo(cx+1.5,cy-9.5,cx+3,cy-8,cx+3.2,cy-5); ctx.bezierCurveTo(cx+2.5,cy-4.5,cx-2.5,cy-4.5,cx-3.2,cy-5); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Pik wdowy
  ctx.fillStyle='#0a0010';
  ctx.beginPath(); ctx.moveTo(cx-0.5,cy-4.5); ctx.lineTo(cx,cy-5.5); ctx.lineTo(cx+0.5,cy-4.5); ctx.closePath(); ctx.fill();
  // Brwi (uniesione, arystokratyczne)
  ctx.strokeStyle='#1a0028'; ctx.lineWidth=0.9; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx-2.8,cy-7); ctx.lineTo(cx-1,cy-7.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2.8,cy-7); ctx.lineTo(cx+1,cy-7.5); ctx.stroke();
  // Oczy — czerwone, hipnotyzujące
  ctx.fillStyle='#0a0008';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-6.2,1.3,1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-6.2,1.3,1,0,0,Math.PI*2); ctx.fill();
  const er2=Math.floor(180+p*75);
  ctx.fillStyle=`rgb(${er2},0,0)`;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-6.2,0.8,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-6.2,0.8,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=`rgba(255,80,80,${0.4+p*0.5})`;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-6.2,0.35,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-6.2,0.35,0,Math.PI*2); ctx.fill();
  // Blask oczu
  ctx.strokeStyle=`rgba(220,0,0,${0.3+p*0.4})`; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-6.2,1.4,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-6.2,1.4,0,Math.PI*2); ctx.stroke();
  // Nos (delikatny, arystokratyczny)
  ctx.fillStyle='#c0b8d0'; ctx.strokeStyle='#a098b0'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.ellipse(cx,cy-4.8,0.7,0.9,0,0,Math.PI*2); ctx.fill();
  // Usta z kłami
  ctx.fillStyle='#6a0010';
  ctx.beginPath(); ctx.ellipse(cx,cy-3.5,1.8,0.7,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#e8d8d8'; ctx.strokeStyle='#888'; ctx.lineWidth=0.4;
  ctx.beginPath(); ctx.moveTo(cx-0.9,cy-3.7); ctx.lineTo(cx-0.5,cy-2.3); ctx.lineTo(cx-0.1,cy-3.7); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+0.1,cy-3.7); ctx.lineTo(cx+0.5,cy-2.3); ctx.lineTo(cx+0.9,cy-3.7); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Krople krwi
  ctx.fillStyle='#cc0020';
  ctx.beginPath(); ctx.arc(cx-0.5,cy-2.2,0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.5,cy-2.4,0.35,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// ===== BOSS 5: GOLEM =====
function drawBossGolem(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/200)*0.5+0.5;
  // Poświata lawa/pomarańczowa
  const glowR=TILE*1.2+p*4;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(255,120,0,${0.4+p*0.2})`); glow.addColorStop(0.5,`rgba(180,40,0,0.15)`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  // Cień
  ctx.globalAlpha=0.4; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,6.5,2,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  // Nogi — masywne kamienne bloki
  ctx.fillStyle='#4a4848'; ctx.strokeStyle='#1a1818'; ctx.lineWidth=0.9;
  ctx.beginPath(); ctx.rect(cx-5,cy+3,3.5,5); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.rect(cx+1.5,cy+3,3.5,5); ctx.fill(); ctx.stroke();
  // Szczeliny lawy w nogach
  ctx.strokeStyle=`rgba(255,${Math.floor(100+p*100)},0,${0.7+p*0.3})`; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx-4.5,cy+4); ctx.lineTo(cx-2,cy+5.5); ctx.lineTo(cx-3.5,cy+7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy+4); ctx.lineTo(cx+4.5,cy+5.5); ctx.lineTo(cx+3,cy+7); ctx.stroke();
  // Tors — ogromny prostokątny blok
  const torsoG=ctx.createLinearGradient(cx-6,cy-2,cx+6,cy+3);
  torsoG.addColorStop(0,'#5a5858'); torsoG.addColorStop(0.3,'#484644'); torsoG.addColorStop(0.7,'#3a3836'); torsoG.addColorStop(1,'#252220');
  ctx.fillStyle=torsoG; ctx.strokeStyle='#181614'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.rect(cx-6,cy-2.5,12,6); ctx.fill(); ctx.stroke();
  // Szczeliny lawy na torsie
  const lavaC=`rgba(255,${Math.floor(120+p*100)},0,${0.8+p*0.2})`;
  ctx.strokeStyle=lavaC; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(cx-4,cy-1); ctx.lineTo(cx-1,cy+1.5); ctx.lineTo(cx-3,cy+3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1,cy-1.5); ctx.lineTo(cx+4,cy+0.5); ctx.lineTo(cx+2,cy+3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx-1,cy-2); ctx.lineTo(cx+0.5,cy+0.5); ctx.stroke();
  // Świecące pęknięcia (wypełnione lawą)
  ctx.strokeStyle=`rgba(255,220,100,${0.6+p*0.4})`; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx-4,cy-1); ctx.lineTo(cx-1,cy+1.5); ctx.lineTo(cx-3,cy+3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1,cy-1.5); ctx.lineTo(ctx+4,cy+0.5); ctx.lineTo(cx+2,cy+3); ctx.stroke();
  // Pięści — kamienne, ogromne
  const fistG1=ctx.createRadialGradient(cx-8,cy-1,0.5,cx-8,cy-1,3.5);
  fistG1.addColorStop(0,'#606060'); fistG1.addColorStop(1,'#1a1818');
  ctx.fillStyle=fistG1; ctx.strokeStyle='#0a0808'; ctx.lineWidth=0.9;
  ctx.beginPath(); ctx.rect(cx-10.5,cy-3,5,4.5); ctx.fill(); ctx.stroke();
  const fistG2=ctx.createRadialGradient(cx+8,cy-1,0.5,cx+8,cy-1,3.5);
  fistG2.addColorStop(0,'#606060'); fistG2.addColorStop(1,'#1a1818');
  ctx.fillStyle=fistG2; ctx.strokeStyle='#0a0808'; ctx.lineWidth=0.9;
  ctx.beginPath(); ctx.rect(cx+5.5,cy-3,5,4.5); ctx.fill(); ctx.stroke();
  // Knykcie
  ctx.fillStyle='#707070'; ctx.strokeStyle='#404040'; ctx.lineWidth=0.5;
  for(let i=0;i<3;i++){ctx.beginPath(); ctx.arc(cx-8+i*1.2,cy-3,0.7,0,Math.PI*2); ctx.fill(); ctx.stroke();}
  for(let i=0;i<3;i++){ctx.beginPath(); ctx.arc(cx+7+i*1.2,cy-3,0.7,0,Math.PI*2); ctx.fill(); ctx.stroke();}
  // Szczeliny lawy na pięściach
  ctx.strokeStyle=lavaC; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx-9.5,cy-2); ctx.lineTo(cx-7,cy-1); ctx.lineTo(cx-8.5,cy+1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+7,cy-2); ctx.lineTo(cx+9,cy-1); ctx.lineTo(cx+8,cy+1); ctx.stroke();
  // Ramiona — połączenie z torsem
  ctx.fillStyle='#484644'; ctx.strokeStyle='#181614'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.rect(cx-10.5,cy-1.5,4.5,3); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.rect(cx+6,cy-1.5,4.5,3); ctx.fill(); ctx.stroke();
  // Głowa — sześcienna kamienna
  const headG=ctx.createLinearGradient(cx-5,cy-10,cx+5,cy-3);
  headG.addColorStop(0,'#606060'); headG.addColorStop(0.4,'#484644'); headG.addColorStop(1,'#252220');
  ctx.fillStyle=headG; ctx.strokeStyle='#101010'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.rect(cx-4.5,cy-10,9,7.5); ctx.fill(); ctx.stroke();
  // Szczeliny na twarzy
  ctx.strokeStyle=lavaC; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx-3,cy-9); ctx.lineTo(cx-1,cy-7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+2,cy-9); ctx.lineTo(cx+1,cy-7.5); ctx.stroke();
  // Oczy — rozżarzone bloki lawy
  const eyeG1=ctx.createRadialGradient(cx-1.8,cy-7.5,0.2,cx-1.8,cy-7.5,2);
  eyeG1.addColorStop(0,'rgba(255,255,200,1)'); eyeG1.addColorStop(0.3,`rgba(255,${Math.floor(150+p*105)},0,1)`); eyeG1.addColorStop(1,'rgba(180,40,0,0.2)');
  ctx.fillStyle=eyeG1; ctx.beginPath(); ctx.rect(cx-3,cy-8.5,2.5,2); ctx.fill();
  const eyeG2=ctx.createRadialGradient(cx+1.8,cy-7.5,0.2,cx+1.8,cy-7.5,2);
  eyeG2.addColorStop(0,'rgba(255,255,200,1)'); eyeG2.addColorStop(0.3,`rgba(255,${Math.floor(150+p*105)},0,1)`); eyeG2.addColorStop(1,'rgba(180,40,0,0.2)');
  ctx.fillStyle=eyeG2; ctx.beginPath(); ctx.rect(cx+0.5,cy-8.5,2.5,2); ctx.fill();
  // Brwi kamienne (nachylone)
  ctx.fillStyle='#303030'; ctx.strokeStyle='#101010'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx-4,cy-9.5); ctx.lineTo(cx-0.5,cy-9); ctx.lineTo(cx-0.5,cy-9.8); ctx.lineTo(cx-4,cy-10.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+4,cy-9.5); ctx.lineTo(cx+0.5,cy-9); ctx.lineTo(cx+0.5,cy-9.8); ctx.lineTo(cx+4,cy-10.2); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Usta — szczelina lawy
  ctx.fillStyle='#0a0808';
  ctx.beginPath(); ctx.rect(cx-3,cy-5.5,6,1.2); ctx.fill();
  ctx.strokeStyle=`rgba(255,${Math.floor(100+p*100)},0,0.9)`; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-2.5,cy-5.2); ctx.lineTo(cx-0.5,cy-5); ctx.lineTo(cx+1,cy-5.2); ctx.lineTo(cx+2.5,cy-5); ctx.stroke();
  ctx.restore();
}