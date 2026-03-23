

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

// ===== W2 BOSS 1: CERBER =====
function drawBossCerber(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/300)*0.5+0.5;
  const glowR = TILE*1.1+p*3;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(200,20,0,${0.35+p*0.2})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  ctx.globalAlpha=0.35; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,6,1.8,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  const bodyG=ctx.createRadialGradient(cx,cy+2,1,cx,cy+2,5.5);
  bodyG.addColorStop(0,'#5a3020'); bodyG.addColorStop(0.6,'#2a1010'); bodyG.addColorStop(1,'#0a0505');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#0a0505'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+2,5,4.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle='#2a1010'; ctx.lineWidth=2.5; ctx.lineCap='round';
  for(const[ox,oy,dx,dy] of [[-3.5,3,-1,3],[3.5,3,1,3],[-2.5,5,-3,8],[2.5,5,3,8]]) {
    ctx.beginPath(); ctx.moveTo(cx+ox,cy+oy); ctx.lineTo(cx+dx,cy+dy); ctx.stroke();
  }
  ctx.strokeStyle='#4a2010'; ctx.lineWidth=2; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx+4.5,cy+1); ctx.bezierCurveTo(cx+8,cy-1,cx+9,cy-4,cx+7,cy-5.5); ctx.stroke();
  ctx.fillStyle='#c03010'; ctx.strokeStyle='#0a0505'; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx+7,cy-5.5); ctx.lineTo(cx+9,cy-6.5); ctx.lineTo(cx+8,cy-4.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#3a1818'; ctx.strokeStyle='#0a0505'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx-3.5,cy-2.5,1.5,2.5,-0.4,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx+3.5,cy-2.5,1.5,2.5,0.4,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx,cy-1.5,1.8,3,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  function cerberHead(hx,hy,ang) {
    ctx.save(); ctx.translate(hx,hy); ctx.rotate(ang);
    const hG=ctx.createRadialGradient(-0.5,-1,0.3,0,-1,3);
    hG.addColorStop(0,'#5a2010'); hG.addColorStop(1,'#180808');
    ctx.fillStyle=hG; ctx.strokeStyle='#0a0505'; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.ellipse(0,-1,3,2.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#3a1010'; ctx.beginPath(); ctx.ellipse(0,0.8,2,1.2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#e8dfc0'; ctx.strokeStyle='#888'; ctx.lineWidth=0.4;
    ctx.beginPath(); ctx.moveTo(-1.5,0.2); ctx.lineTo(-1.1,1.5); ctx.lineTo(-0.5,0.2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0.5,0.2); ctx.lineTo(0.9,1.5); ctx.lineTo(1.5,0.2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle=`rgba(255,${Math.floor(80+p*120)},0,1)`;
    ctx.beginPath(); ctx.arc(-1.3,-1.8,0.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(1.3,-1.8,0.8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#0a0000';
    ctx.beginPath(); ctx.arc(-1.3,-1.8,0.4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(1.3,-1.8,0.4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#2a0e0e'; ctx.strokeStyle='#0a0505'; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(-2.5,-1); ctx.lineTo(-4,-3.5); ctx.lineTo(-1.5,-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2.5,-1); ctx.lineTo(4,-3.5); ctx.lineTo(1.5,-2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  cerberHead(cx-4, cy-5, -0.3);
  cerberHead(cx,   cy-5.5, 0);
  cerberHead(cx+4, cy-5, 0.3);
  ctx.restore();
}

// ===== W2 BOSS 2: HYDRA =====
function drawBossHydra(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/320)*0.5+0.5;
  const p2 = Math.sin(Date.now()/200+2)*0.5+0.5;
  const glowR = TILE*1.2+p*4;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(40,180,20,${0.3+p*0.2})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  ctx.globalAlpha=0.35; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,6,1.6,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  const bodyG=ctx.createRadialGradient(cx,cy+2,1,cx,cy+2,5.5);
  bodyG.addColorStop(0,'#286030'); bodyG.addColorStop(0.55,'#143818'); bodyG.addColorStop(1,'#061008');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#061008'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+3,5.5,4,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle='rgba(40,140,40,0.4)'; ctx.lineWidth=0.55;
  for(let r=0;r<3;r++) for(let c=0;c<4;c++) {
    const sx=cx-4+c*2.5+(r%2)*1.2, sy=cy+0.5+r*2;
    ctx.beginPath(); ctx.arc(sx,sy,1,Math.PI,Math.PI*2); ctx.stroke();
  }
  const bellyG=ctx.createLinearGradient(cx,cy,cx,cy+6);
  bellyG.addColorStop(0,'rgba(160,220,80,0.3)'); bellyG.addColorStop(1,'rgba(60,120,20,0.05)');
  ctx.fillStyle=bellyG; ctx.beginPath(); ctx.ellipse(cx,cy+3.5,2.5,3.2,0,0,Math.PI*2); ctx.fill();
  function hydraHead(nx, ny, angle, phaseOff) {
    const ph = Math.sin(Date.now()/250+phaseOff)*0.5+0.5;
    ctx.strokeStyle='#1a5020'; ctx.lineWidth=3; ctx.lineCap='round';
    const mx = nx + Math.cos(angle-0.5)*3, my = ny + Math.sin(angle-0.5)*3;
    const ex = nx + Math.cos(angle)*7, ey = ny + Math.sin(angle)*7;
    ctx.beginPath(); ctx.moveTo(nx,ny); ctx.quadraticCurveTo(mx,my,ex,ey); ctx.stroke();
    ctx.strokeStyle='#2a8030'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(nx,ny); ctx.quadraticCurveTo(mx,my,ex,ey); ctx.stroke();
    ctx.save(); ctx.translate(ex,ey); ctx.rotate(angle);
    const hG=ctx.createRadialGradient(0,-1,0.3,0,0,3.5);
    hG.addColorStop(0,'#3a9040'); hG.addColorStop(1,'#0e2810');
    ctx.fillStyle=hG; ctx.strokeStyle='#061008'; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.ellipse(0,0,3,2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#1e5020'; ctx.beginPath(); ctx.ellipse(2,0.3,1.5,1,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#e0f0d0'; ctx.strokeStyle='#4a8040'; ctx.lineWidth=0.4;
    ctx.beginPath(); ctx.moveTo(1,-0.5); ctx.lineTo(2.5,0.5); ctx.lineTo(2,-0.8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(1,0.5); ctx.lineTo(2.5,0.8); ctx.lineTo(2,1.2); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle='#cc1828'; ctx.lineWidth=0.7; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(3,0); ctx.lineTo(4+ph*0.5,0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4+ph*0.5,0); ctx.lineTo(5.2,-0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4+ph*0.5,0); ctx.lineTo(5.2,0.6); ctx.stroke();
    ctx.fillStyle=`rgba(220,255,0,${0.8+ph*0.2})`;
    ctx.beginPath(); ctx.arc(-1,-0.8,0.85,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#0a1000'; ctx.beginPath(); ctx.ellipse(-1,-0.8,0.2,0.7,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  hydraHead(cx-2.5, cy-1, -Math.PI/2-0.5, 0);
  hydraHead(cx,     cy-1.5, -Math.PI/2, 1.5);
  hydraHead(cx+2.5, cy-1, -Math.PI/2+0.5, 3);
  ctx.fillStyle=`rgba(100,255,60,${0.5+p2*0.3})`;
  for(let i=0;i<3;i++) { const dx=cx-3+i*3, dy=cy+7+p2*1.5; ctx.beginPath(); ctx.arc(dx,dy,0.5,0,Math.PI*2); ctx.fill(); }
  ctx.restore();
}

// ===== W2 BOSS 3: GORGONA =====
function drawBossGorgona(cx, cy) {
  ctx.save();
  const p = Math.sin(Date.now()/280)*0.5+0.5;
  const p2 = Math.sin(Date.now()/150+1)*0.5+0.5;
  const glowR = TILE*1.2+p*3;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(140,20,200,${0.35+p*0.2})`); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  ctx.globalAlpha=0.3; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,5,1.5,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  ctx.strokeStyle='#4a1a6a'; ctx.lineWidth=5; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx,cy+4); ctx.bezierCurveTo(cx+3,cy+7,cx+5,cy+8,cx+4,cy+6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,cy+4); ctx.bezierCurveTo(cx-3,cy+7,cx-5,cy+8,cx-4,cy+6); ctx.stroke();
  const torsoG=ctx.createRadialGradient(cx,cy+1,0.5,cx,cy+1,4.5);
  torsoG.addColorStop(0,'#7a2aaa'); torsoG.addColorStop(0.6,'#3a0e60'); torsoG.addColorStop(1,'#100618');
  ctx.fillStyle=torsoG; ctx.strokeStyle='#0a0310'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+1,3.5,4.5,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle='rgba(180,80,220,0.35)'; ctx.lineWidth=0.55;
  for(let r=0;r<4;r++) for(let c=0;c<3;c++) {
    const sx=cx-2.5+c*2.5+(r%2), sy=cy-1+r*1.8;
    ctx.beginPath(); ctx.arc(sx,sy,0.9,Math.PI,Math.PI*2); ctx.stroke();
  }
  ctx.strokeStyle='#4a1a6a'; ctx.lineWidth=2.2; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx-3,cy-1); ctx.quadraticCurveTo(cx-7,cy-1,cx-7,cy+2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+3,cy-1); ctx.quadraticCurveTo(cx+7,cy-1,cx+7,cy+2); ctx.stroke();
  ctx.strokeStyle='#8a3aaa'; ctx.lineWidth=0.9; ctx.lineCap='round';
  for(const[bx,by,sa] of [[-7,2,-0.4],[7,2,0.4]]) {
    for(let i=0;i<4;i++) { const a=sa+i*0.3; ctx.beginPath(); ctx.moveTo(cx+bx,cy+by); ctx.lineTo(cx+bx+Math.cos(a)*2.2,cy+by+Math.sin(a)*2.2); ctx.stroke(); }
  }
  const neckG=ctx.createLinearGradient(cx-1.5,cy-3,cx+1.5,cy-3);
  neckG.addColorStop(0,'#2a0e40'); neckG.addColorStop(0.5,'#6a1a9a'); neckG.addColorStop(1,'#2a0e40');
  ctx.fillStyle=neckG; ctx.strokeStyle='#0a0310'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.ellipse(cx,cy-3,1.8,2.2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  const headG=ctx.createRadialGradient(cx-0.5,cy-7,0.5,cx,cy-6,4.5);
  headG.addColorStop(0,'#8a2ab8'); headG.addColorStop(0.6,'#4a0e78'); headG.addColorStop(1,'#120518');
  ctx.fillStyle=headG; ctx.strokeStyle='#0a0310'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.arc(cx,cy-6,3.8,0,Math.PI*2); ctx.fill(); ctx.stroke();
  const snakeAngles=[-1.2,-0.7,-0.2,0.3,0.8,1.3];
  for(const sa of snakeAngles) {
    const ph=Math.sin(Date.now()/200+sa*3)*0.5+0.5;
    const sx=cx+Math.cos(sa-Math.PI/2)*3.2, sy=cy-6+Math.sin(sa-Math.PI/2)*3.2;
    const ex=cx+Math.cos(sa-Math.PI/2)*7+Math.sin(Date.now()/300+sa)*1.5;
    const ey=cy-6+Math.sin(sa-Math.PI/2)*7+Math.cos(Date.now()/300+sa)*1.5;
    ctx.strokeStyle=`rgba(60,${Math.floor(160+ph*90)},0,0.9)`; ctx.lineWidth=1.2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(sx,sy); ctx.quadraticCurveTo((sx+ex)/2+(ey-sy)*0.2,(sy+ey)/2+(sx-ex)*0.2,ex,ey); ctx.stroke();
    ctx.fillStyle=`rgb(80,${Math.floor(160+ph*90)},20)`;
    ctx.beginPath(); ctx.arc(ex,ey,0.8,0,Math.PI*2); ctx.fill();
  }
  ctx.fillStyle=`rgba(255,255,150,${0.7+p2*0.3})`;
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-6.5,1.2,0.9,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-6.5,1.2,0.9,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a0808';
  ctx.beginPath(); ctx.arc(cx-1.5,cy-6.5,0.45,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-6.5,0.45,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(255,255,100,${0.25+p2*0.3})`; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-1.5,cy-6.5); ctx.lineTo(cx-4,cy-3); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.5,cy-6.5); ctx.lineTo(cx+4,cy-3); ctx.stroke();
  ctx.fillStyle='#2a0e40'; ctx.beginPath(); ctx.ellipse(cx,cy-5.5,0.8,0.55,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#9a3ab8'; ctx.lineWidth=0.8; ctx.lineCap='round';
  ctx.beginPath(); ctx.arc(cx,cy-4.8,1.5,0.2,Math.PI-0.2); ctx.stroke();
  ctx.restore();
}

// ===== W2 BOSS 4: FENIKS =====
function drawBossFeniks(cx, cy) {
  ctx.save();
  const p  = Math.sin(Date.now()/240)*0.5+0.5;
  const p2 = Math.sin(Date.now()/160+1)*0.5+0.5;
  const p3 = Math.sin(Date.now()/360+2)*0.5+0.5;
  const glowR = TILE*1.4+p3*5;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(255,${Math.floor(120+p*100)},0,${0.45+p*0.2})`);
  glow.addColorStop(0.5,'rgba(200,40,0,0.1)'); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  ctx.globalAlpha=0.3; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,5,1.4,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  const flames=[
    {ox:-5,oy:4,cp1x:-8,cp1y:10,cp2x:-6,cp2y:14,ex:-3,ey:12,c:'#cc2000'},
    {ox:-2,oy:5,cp1x:-3,cp1y:12,cp2x:-1,cp2y:15,ex:0,ey:13,c:'#ee4400'},
    {ox:2,oy:5,cp1x:3,cp1y:12,cp2x:1,cp2y:15,ex:0,ey:13,c:'#ff6600'},
    {ox:5,oy:4,cp1x:8,cp1y:10,cp2x:6,cp2y:14,ex:3,ey:12,c:'#cc2000'},
  ];
  for(const f of flames) {
    ctx.fillStyle=f.c; ctx.strokeStyle='rgba(255,100,0,0.4)'; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(cx+f.ox,cy+f.oy);
    ctx.bezierCurveTo(cx+f.cp1x,cy+f.cp1y+p*1.5, cx+f.cp2x,cy+f.cp2y, cx+f.ex,cy+f.ey+p2*2);
    ctx.bezierCurveTo(cx+f.ex+1,cy+f.ey+p2*2, cx+f.ox+1,cy+f.oy,cx+f.ox,cy+f.oy);
    ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  for(const [side] of [[1],[-1]]) {
    const wingG=ctx.createLinearGradient(cx,cy,cx+side*9,cy-7);
    wingG.addColorStop(0,`rgba(255,${Math.floor(100+p*120)},0,0.9)`);
    wingG.addColorStop(0.5,'rgba(200,50,0,0.7)'); wingG.addColorStop(1,'rgba(100,10,0,0.3)');
    ctx.fillStyle=wingG; ctx.strokeStyle='rgba(255,120,0,0.5)'; ctx.lineWidth=0.7;
    ctx.beginPath();
    ctx.moveTo(cx+side*2,cy);
    ctx.bezierCurveTo(cx+side*4,cy-3, cx+side*8,cy-6, cx+side*9,cy-4);
    ctx.bezierCurveTo(cx+side*9,cy-2, cx+side*7,cy+1, cx+side*5,cy+2);
    ctx.bezierCurveTo(cx+side*4,cy+2, cx+side*2,cy+1, cx+side*2,cy);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle=`rgba(255,${Math.floor(180+p*75)},0,0.6)`; ctx.lineWidth=0.6;
    ctx.beginPath(); ctx.moveTo(cx+side*2,cy); ctx.lineTo(cx+side*9,cy-6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+side*2,cy); ctx.lineTo(cx+side*8,cy-2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+side*2,cy); ctx.lineTo(cx+side*6,cy+1.5); ctx.stroke();
  }
  const bodyG=ctx.createRadialGradient(cx,cy,0.5,cx,cy+1,4.5);
  bodyG.addColorStop(0,`rgb(255,${Math.floor(160+p2*90)},20)`);
  bodyG.addColorStop(0.5,'#cc3000'); bodyG.addColorStop(1,'#500800');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#300400'; ctx.lineWidth=0.9;
  ctx.beginPath(); ctx.ellipse(cx,cy+1,3.5,4,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle=`rgba(255,${Math.floor(200+p*55)},80,0.5)`; ctx.lineWidth=0.55;
  for(let r=0;r<3;r++) for(let c=0;c<3;c++) {
    const fx=cx-2+c*2+(r%2), fy=cy-1+r*1.8;
    ctx.beginPath(); ctx.arc(fx,fy,0.8,Math.PI,Math.PI*2); ctx.stroke();
  }
  const headG=ctx.createRadialGradient(cx,cy-7,0.4,cx,cy-6.5,3.5);
  headG.addColorStop(0,`rgb(255,${Math.floor(200+p*55)},50)`); headG.addColorStop(1,'#780c00');
  ctx.fillStyle=headG; ctx.strokeStyle='#300400'; ctx.lineWidth=0.9;
  ctx.beginPath(); ctx.arc(cx,cy-6.5,3,0,Math.PI*2); ctx.fill(); ctx.stroke();
  for(let i=-2;i<=2;i++) {
    const px2=cx+i*1.2, py2=cy-9+p2*0.5;
    const cr=ctx.createLinearGradient(px2,cy-9.5,px2,py2+3);
    cr.addColorStop(0,`rgba(255,${Math.floor(200+p*55)},0,${0.8-Math.abs(i)*0.1})`);
    cr.addColorStop(1,'rgba(200,40,0,0)');
    ctx.fillStyle=cr;
    ctx.beginPath(); ctx.moveTo(px2-0.8,cy-8); ctx.lineTo(px2,py2-2-Math.abs(i)*0.5); ctx.lineTo(px2+0.8,cy-8); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle='#ffaa00'; ctx.strokeStyle='#aa5500'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx,cy-5); ctx.lineTo(cx+2,cy-5.5); ctx.lineTo(cx,cy-6); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle='rgba(255,255,200,1)';
  ctx.beginPath(); ctx.arc(cx-1.5,cy-7,0.85,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.5,cy-7,0.85,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a0500';
  ctx.beginPath(); ctx.arc(cx-1.5,cy-7,0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+0.5,cy-7,0.4,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(255,220,0,${0.4+p*0.4})`; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-7,1.2,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+0.5,cy-7,1.2,0,Math.PI*2); ctx.stroke();
  ctx.restore();
}

// ===== W2 BOSS 5: LEWIATAN =====
function drawBossLewiatan(cx, cy) {
  ctx.save();
  const p  = Math.sin(Date.now()/300)*0.5+0.5;
  const p2 = Math.sin(Date.now()/180+2)*0.5+0.5;
  const glowR = TILE*1.3+p*4;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(0,${Math.floor(120+p*100)},180,${0.38+p*0.18})`);
  glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  ctx.globalAlpha=0.35; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx,cy+7,6,1.8,0,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
  const bodyG=ctx.createRadialGradient(cx,cy+2,1,cx,cy+2,6);
  bodyG.addColorStop(0,'#1a6090'); bodyG.addColorStop(0.55,'#0a2a50'); bodyG.addColorStop(1,'#020810');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#020810'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(cx,cy+3,5.5,4.2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle='rgba(0,80,140,0.4)'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.ellipse(cx+1,cy+3.5,3.5,2.5,0.4,0,Math.PI*2); ctx.stroke();
  ctx.strokeStyle='rgba(30,150,200,0.35)'; ctx.lineWidth=0.55;
  for(let r=0;r<3;r++) for(let c=0;c<4;c++) {
    const sx=cx-4+c*2.5+(r%2)*1.2, sy=cy+0.5+r*2;
    ctx.beginPath(); ctx.arc(sx,sy,1,Math.PI,Math.PI*2); ctx.stroke();
  }
  const bellyG=ctx.createLinearGradient(cx,cy,cx,cy+6);
  bellyG.addColorStop(0,'rgba(150,220,255,0.25)'); bellyG.addColorStop(1,'rgba(20,80,120,0.05)');
  ctx.fillStyle=bellyG; ctx.beginPath(); ctx.ellipse(cx,cy+3.5,2.5,3.2,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a3060'; ctx.strokeStyle='#020810'; ctx.lineWidth=0.7;
  for(let i=0;i<3;i++) {
    const fx=cx-2.5+i*2.5, fy=cy-0.5;
    ctx.beginPath(); ctx.moveTo(fx-1,fy); ctx.lineTo(fx,fy-3-i*0.5); ctx.lineTo(fx+1,fy); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  const neckG=ctx.createLinearGradient(cx-2,cy-2,cx+2,cy-2);
  neckG.addColorStop(0,'#082040'); neckG.addColorStop(0.5,'#1a5070'); neckG.addColorStop(1,'#082040');
  ctx.fillStyle=neckG; ctx.strokeStyle='#020810'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx-2,cy-1); ctx.bezierCurveTo(cx-3,cy-3,cx-2,cy-6,cx,cy-7); ctx.bezierCurveTo(cx+2,cy-6,cx+3,cy-3,cx+2,cy-1); ctx.closePath(); ctx.fill(); ctx.stroke();
  const headG=ctx.createRadialGradient(cx,cy-9,0.5,cx,cy-8,4.5);
  headG.addColorStop(0,'#2278b0'); headG.addColorStop(0.6,'#0c3a60'); headG.addColorStop(1,'#020810');
  ctx.fillStyle=headG; ctx.strokeStyle='#020810'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(cx-3.5,cy-7.5); ctx.bezierCurveTo(cx-4,cy-10,cx-2,cy-12,cx,cy-12.5); ctx.bezierCurveTo(cx+2,cy-12,cx+4,cy-10,cx+3.5,cy-7.5); ctx.bezierCurveTo(cx+2,cy-7,cx-2,cy-7,cx-3.5,cy-7.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#0a2a50'; ctx.strokeStyle='#020810'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx-3,cy-7.5); ctx.bezierCurveTo(cx-3.5,cy-6,cx-2.5,cy-4.5,cx,cy-4.5); ctx.bezierCurveTo(cx+2.5,cy-4.5,cx+3.5,cy-6,cx+3,cy-7.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#e0f0ff'; ctx.strokeStyle='#6090b0'; ctx.lineWidth=0.4;
  for(let i=0;i<4;i++){const tx=cx-2.5+i*1.6; ctx.beginPath(); ctx.moveTo(tx,cy-7.5); ctx.lineTo(tx+0.4,cy-6.2); ctx.lineTo(tx+0.8,cy-7.5); ctx.closePath(); ctx.fill(); ctx.stroke();}
  ctx.fillStyle=`rgba(0,200,255,${0.5+p2*0.4})`;
  for(let i=0;i<4;i++) { const dx=cx-3+i*2, dy=cy+6+p2*2; ctx.beginPath(); ctx.arc(dx,dy,0.55,0,Math.PI*2); ctx.fill(); }
  ctx.fillStyle=`rgba(0,${Math.floor(180+p*75)},255,1)`;
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-10,1.2,1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-10,1.2,1,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#000810';
  ctx.beginPath(); ctx.ellipse(cx-1.5,cy-10,0.4,0.8,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.5,cy-10,0.4,0.8,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(0,180,255,${0.35+p*0.4})`; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.arc(cx-1.5,cy-10,1.6,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1.5,cy-10,1.6,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle='#0a2850'; ctx.strokeStyle='#020810'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.moveTo(cx-1.5,cy-11.8); ctx.bezierCurveTo(cx-2.5,cy-13.5,cx-4,cy-13,cx-3.5,cy-11.5); ctx.bezierCurveTo(cx-3,cy-11,cx-1.8,cy-12,cx-1.5,cy-11.8); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+1.5,cy-11.8); ctx.bezierCurveTo(cx+2.5,cy-13.5,cx+4,cy-13,cx+3.5,cy-11.5); ctx.bezierCurveTo(cx+3,cy-11,cx+1.8,cy-12,cx+1.5,cy-11.8); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ===== W2 BOSS 6: ŚMIERĆ =====
function drawBossSmierc(cx, cy) {
  ctx.save();
  const p  = Math.sin(Date.now()/260)*0.5+0.5;
  const p2 = Math.sin(Date.now()/140+1)*0.5+0.5;
  const glowR = TILE*1.4+p*4;
  const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,glowR);
  glow.addColorStop(0,`rgba(${Math.floor(60+p*40)},0,${Math.floor(80+p*40)},${0.5+p*0.2})`);
  glow.addColorStop(0.4,'rgba(20,0,30,0.25)'); glow.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=glow; ctx.fillRect(cx-glowR,cy-glowR,glowR*2,glowR*2);
  const cloakG=ctx.createRadialGradient(cx,cy,1,cx,cy+3,9);
  cloakG.addColorStop(0,'#1a0820'); cloakG.addColorStop(0.5,'#0a0412'); cloakG.addColorStop(1,'#000004');
  ctx.fillStyle=cloakG; ctx.strokeStyle='#08020e'; ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(cx-6,cy+8+p*1.5);
  ctx.bezierCurveTo(cx-8,cy+6+p, cx-5,cy-4, cx-2,cy-6);
  ctx.bezierCurveTo(cx-1,cy-7, cx+1,cy-7, cx+2,cy-6);
  ctx.bezierCurveTo(cx+5,cy-4, cx+8,cy+6+p, cx+6,cy+8+p*1.5);
  ctx.bezierCurveTo(cx+3,cy+10, cx-3,cy+10, cx-6,cy+8+p*1.5);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle=`rgba(${Math.floor(60+p*40)},0,${Math.floor(80+p*40)},0.4)`; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx-6,cy+8); ctx.bezierCurveTo(cx-8,cy+5, cx-5.5,cy-3.5, cx-2.2,cy-5.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+6,cy+8); ctx.bezierCurveTo(cx+8,cy+5, cx+5.5,cy-3.5, cx+2.2,cy-5.5); ctx.stroke();
  ctx.strokeStyle='#b8c0b0'; ctx.lineWidth=1.3; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx-4.5,cy+1); ctx.lineTo(cx-6.5,cy+3); ctx.stroke();
  for(let i=0;i<4;i++) {
    const a=-0.7+i*0.35;
    ctx.beginPath(); ctx.moveTo(cx-6.5,cy+3); ctx.lineTo(cx-6.5+Math.cos(a)*2,cy+3+Math.sin(a)*2); ctx.stroke();
  }
  ctx.strokeStyle='#808890'; ctx.lineWidth=2; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx+3,cy+5); ctx.lineTo(cx+5.5,cy-8); ctx.stroke();
  ctx.strokeStyle='#505860'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.moveTo(cx+3,cy+5); ctx.lineTo(cx+5.5,cy-8); ctx.stroke();
  const bladeG=ctx.createLinearGradient(cx+5.5,cy-8,cx+10,cy-4);
  bladeG.addColorStop(0,'#c8d0cc'); bladeG.addColorStop(0.4,'#808a88'); bladeG.addColorStop(1,'rgba(60,70,65,0)');
  ctx.fillStyle=bladeG; ctx.strokeStyle='#303830'; ctx.lineWidth=0.7;
  ctx.beginPath(); ctx.moveTo(cx+5.5,cy-8); ctx.bezierCurveTo(cx+10,cy-10,cx+12,cy-6,cx+10,cy-4); ctx.bezierCurveTo(cx+9,cy-3,cx+7,cy-5,cx+5.5,cy-8); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle=`rgba(230,240,235,${0.3+p2*0.4})`; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(cx+6,cy-8); ctx.bezierCurveTo(cx+9,cy-9.5,cx+11,cy-7,cx+9.5,cy-5); ctx.stroke();
  ctx.fillStyle='#020008';
  ctx.beginPath(); ctx.ellipse(cx,cy-6.5,3.2,3.5,0,0,Math.PI*2); ctx.fill();
  const skullG=ctx.createRadialGradient(cx-0.5,cy-7,0.4,cx,cy-6.5,3);
  skullG.addColorStop(0,'#d0d8d0'); skullG.addColorStop(0.7,'#909890'); skullG.addColorStop(1,'#404840');
  ctx.fillStyle=skullG; ctx.strokeStyle='#202820'; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.arc(cx,cy-7.5,2.5,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#000004';
  ctx.beginPath(); ctx.ellipse(cx-1.1,cy-7.8,0.9,0.8,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+1.1,cy-7.8,0.9,0.8,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=`rgba(${Math.floor(60+p2*40)},0,${Math.floor(140+p2*115)},${0.7+p2*0.3})`;
  ctx.beginPath(); ctx.arc(cx-1.1,cy-7.8,0.55,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+1.1,cy-7.8,0.55,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle=`rgba(80,0,180,${0.4+p2*0.4})`; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.arc(cx-1.1,cy-7.8,1,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+1.1,cy-7.8,1,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle='#080808';
  ctx.beginPath(); ctx.moveTo(cx,cy-6.8); ctx.lineTo(cx-0.4,cy-6); ctx.lineTo(cx+0.4,cy-6); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#808880'; ctx.strokeStyle='#202820'; ctx.lineWidth=0.6;
  ctx.beginPath(); ctx.ellipse(cx,cy-5.5,2,1.2,0,0,Math.PI); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#d8dcd8'; ctx.strokeStyle='#505850'; ctx.lineWidth=0.4;
  for(let i=-2;i<=2;i++) {
    ctx.beginPath(); ctx.moveTo(cx+i*0.75-0.35,cy-5.5); ctx.lineTo(cx+i*0.75,cy-4.5); ctx.lineTo(cx+i*0.75+0.35,cy-5.5); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  for(let i=0;i<4;i++) {
    const wt=Date.now()/600+i*1.57;
    const wx=cx-5+i*3.3+Math.cos(wt)*1.5, wy=cy+4+Math.sin(wt*1.3)*2;
    ctx.globalAlpha=0.25+Math.sin(wt)*0.15;
    ctx.fillStyle=`rgba(${Math.floor(40+p*30)},0,${Math.floor(120+p*80)},1)`;
    ctx.beginPath(); ctx.arc(wx,wy,1.1,0,Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha=1;
  ctx.restore();
}