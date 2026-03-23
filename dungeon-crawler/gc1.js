// ===================== JĘZYK =====================
let lang = 'pl';
const LANG = {
  pl: {
    names: {Goblin:'Goblin',Szkielet:'Szkielet',Troll:'Troll',Smok:'Smok',Demon:'Demon',Lich:'Lich',Wampir:'Wampir',Golem:'Golem','Mroczny Bóg':'Mroczny Bóg'},
    h_enemies:'⚔ WROGOWIE', h_bosses:'👑 BOSSOWIE', h_controls:'🎮 STEROWANIE', h_legend:'📖 LEGENDA',
    floor_label:'Piętro', floor_of:'/ 6',
    info:'AWSD / strzałki — ruch &nbsp;|&nbsp; H — mikstura &nbsp;|&nbsp; Ctrl+R — restart',
    ctrl_move:'ruch', ctrl_potion:'mikstura leczenia', ctrl_restart:'restart gry',
    ctrl_shop:'wybór w sklepie', ctrl_exit:'wyjście ze sklepu', ctrl_scores:'tablica wyników',
    leg_wall:'ściana', leg_player:'gracz', leg_goblin:'Goblin', leg_szkielet:'Szkielet',
    leg_troll:'Troll', leg_boss:'Boss', leg_stairs:'schody w dół', leg_gold:'worek ze złotem', leg_potion:'mikstura',
    enemy_goblin:'g Goblin', enemy_szkielet:'s Szkielet', enemy_troll:'t Troll',
    boss_smok:'B Smok', boss_demon:'B Demon', boss_lich:'B Lich',
    boss_wampir:'B Wampir', boss_golem:'B Golem', boss_mroczny:'B Mroczny Bóg',
    ep_floor: f=>`(p.${f})`,
    msg_enter_floor: f=>`Wchodzisz na piętro ${f}...`,
    msg_defeated: (n,xp,g)=>`Pokonałeś ${n}! +${xp}XP +${g}zł`,
    msg_combat: (n,d,r)=>`${n}: zadajesz ${d}, otrzymujesz ${r}`,
    msg_died: l=>`Zginąłeś! Pozostało żyć: ${l}`,
    msg_levelup: lv=>`POZIOM ${lv}! HP+20, ATK+3`,
    msg_gold: g=>`Znalazłeś ${g} złota!`,
    msg_potion_ground: h=>`Wypiłeś miksturę! +${h} HP`,
    msg_potion_stored: '🧪 Pełne HP! Mikstura schowana do ekwipunku [H]',
    msg_potion_full: '🧪 Ekwipunek pełny! (max 3 mikstury)',
    msg_floor_potion: '🧪 Dostajeś miksturę na nowe piętro!',
    msg_boss_block:'Pokonaj bossa zanim zejdziesz niżej!',
    msg_enemies_block:'Pokonaj wszystkich wrogów!',
    msg_heal_buy: (_,p)=>`Uleczono +50 HP! Następna cena: ${p}zł`,
    msg_no_gold:'Za mało złota!',
    msg_sword_buy: (_,p)=>`Kupiłeś miecz! +5 ATK. Nast: ${p}zł`,
    msg_shield_buy: (_,p)=>`Kupiłeś tarczę! -3 dmg. Nast: ${p}zł`,
    msg_new_floor: f=>`Piętro ${f}! HP odnowione.`,
    msg_potion_use: h=>`Użyłeś mikstury! +${h} HP`,
    msg_no_potion:'Nie masz mikstur!',
    hud_title:'═══ DUNGEON CRAWLER ═══',
    hud_gold: g=>`Złoto: ${g} zł`,
    hud_shield: s=>` Tarcza:-${s}`,
    hud_kills: k=>`Zabici: ${k}`,
    hud_potions: n=>`Mikstury: ${n}/3 [H]`,
    shop_title:'=== SKLEP ===',
    shop_gold: g=>`Złoto: ${g} zł`,
    shop_heal:'[1] Leczenie  +50 HP',
    shop_sword:'[2] Miecz     +5 ATK',
    shop_shield:'[3] Tarcza    -3 DMG',
    shop_price: p=>`cena: ${p} zł`,
    shop_exit:'[Q] wyjdź ze sklepu',
    dead_title:'*** KONIEC GRY ***',
    dead_stats: (f,g)=>`Piętro:${f} Złoto:${g}`,
    dead_restart:'[R] Zagraj ponownie',
    victory_title:'*** VICTORY ***',
    victory_stats: (lv,g,hp,mhp)=>`Lv:${lv} Zl:${g} HP:${hp}/${mhp}`,
    victory_credits:'TWÓRCY',
    victory_restart:'[R] Zagraj ponownie',
    title_sub:'mroczne lochy czekaja...',
    title_new:'[ENTER]  Nowa gra',
    title_continue:'[C]  Kontynuuj',
    title_scores:'[T]  Tablica wyników',
    scores_back:'[ESC]  Powrót',
    boss_announce:'BOSS PIĘTRA:',
    lang_choose:'Wybierz język / Choose language',
    lang_pl:'[ P ]  Polski',
    lang_en:'[ E ]  English',
    mode_choose:'Wybierz tryb sterowania',
    mode_touch:'[ T ]  Tryb dotykowy',
    mode_touch_sub:'D-pad na ekranie (demo)',
    mode_keyboard:'[ K ]  Tryb klawiatury',
    mode_keyboard_sub:'AWSD / strzałki',
    diff_choose:'Wybierz poziom trudności',
    diff_1:'[ 1 ]  Łatwy',       diff_1_sub:'więcej HP, słabsi wrogowie',
    diff_2:'[ 2 ]  Zwykły',      diff_2_sub:'standardowe statystyki',
    diff_3:'[ 3 ]  Trudny',      diff_3_sub:'mniej HP, silniejsi wrogowie',
    diff_4:'[ 4 ]  Niemożliwy',  diff_4_sub:'ekstremalnie silni wrogowie',
    msg_crit: (d)=>`KRYTYK! +${d} obrażeń!`,
    msg_trap: (d)=>`Pułapka! -${d} HP!`,
    msg_chest_gold: (g)=>`Skrzynia! +${g} złota!`,
    msg_chest_trap: (d)=>`Pułapka w skrzyni! -${d} HP!`,
    msg_chest_item: s=>`Skrzynia! Znalazłeś: ${s}!`,
    msg_secret: 'Tajne pomieszczenie!',
    score_title:'🏆 TABLICA WYNIKÓW',
    score_empty:'Brak wyników',
    score_yours:'Twój wynik:',
    ability_choose:'Wybierz zdolność pasywną:',
    ab_vampirism:'Wampiryzm', ab_vampirism_d:'+3 HP za każde zabójstwo',
    ab_luck:'Szczęście',      ab_luck_d:'+10% szans na krytyk',
    ab_tough:'Twardziel',     ab_tough_d:'+20 max HP',
    ab_berserker:'Berserker', ab_berserker_d:'+4 ATK na stałe',
    ab_armor:'Zbroja',        ab_armor_d:'+2 tarcza (redukcja obrażeń)',
    ab_thief:'Złodziej',      ab_thief_d:'+40% złota z wrogów',
    ab_vision:'Jasnowidzenie',ab_vision_d:'+2 promień widzenia',
  },
  en: {
    names: {Goblin:'Goblin',Szkielet:'Skeleton',Troll:'Troll',Smok:'Dragon',Demon:'Demon',Lich:'Lich',Wampir:'Vampire',Golem:'Golem','Mroczny Bóg':'Dark God'},
    h_enemies:'⚔ ENEMIES', h_bosses:'👑 BOSSES', h_controls:'🎮 CONTROLS', h_legend:'📖 LEGEND',
    floor_label:'Floor', floor_of:'/ 6',
    info:'AWSD / arrows — move &nbsp;|&nbsp; H — potion &nbsp;|&nbsp; Ctrl+R — restart',
    ctrl_move:'move', ctrl_potion:'healing potion', ctrl_restart:'restart game',
    ctrl_shop:'shop selection', ctrl_exit:'leave shop', ctrl_scores:'leaderboard',
    leg_wall:'wall', leg_player:'player', leg_goblin:'Goblin', leg_szkielet:'Skeleton',
    leg_troll:'Troll', leg_boss:'Boss', leg_stairs:'stairs down', leg_gold:'gold bag', leg_potion:'potion',
    enemy_goblin:'g Goblin', enemy_szkielet:'s Skeleton', enemy_troll:'t Troll',
    boss_smok:'B Dragon', boss_demon:'B Demon', boss_lich:'B Lich',
    boss_wampir:'B Vampire', boss_golem:'B Golem', boss_mroczny:'B Dark God',
    ep_floor: f=>`(fl.${f})`,
    msg_enter_floor: f=>`Entering floor ${f}...`,
    msg_defeated: (n,xp,g)=>`Defeated ${n}! +${xp}XP +${g}g`,
    msg_combat: (n,d,r)=>`${n}: deal ${d}, receive ${r}`,
    msg_died: l=>`You died! Lives left: ${l}`,
    msg_levelup: lv=>`LEVEL ${lv}! HP+20, ATK+3`,
    msg_gold: g=>`Found ${g} gold!`,
    msg_potion_ground: h=>`Drank potion! +${h} HP`,
    msg_potion_stored: '🧪 Full HP! Potion stored in inventory [H]',
    msg_potion_full: '🧪 Inventory full! (max 3 potions)',
    msg_floor_potion: '🧪 You receive a potion for the new floor!',
    msg_boss_block:'Defeat the boss before going down!',
    msg_enemies_block:'Defeat all enemies first!',
    msg_heal_buy: (_,p)=>`Healed +50 HP! Next price: ${p}g`,
    msg_no_gold:'Not enough gold!',
    msg_sword_buy: (_,p)=>`Bought sword! +5 ATK. Next: ${p}g`,
    msg_shield_buy: (_,p)=>`Bought shield! -3 dmg. Next: ${p}g`,
    msg_new_floor: f=>`Floor ${f}! HP restored.`,
    msg_potion_use: h=>`Used potion! +${h} HP`,
    msg_no_potion:'No potions left!',
    hud_title:'═══ DUNGEON CRAWLER ═══',
    hud_gold: g=>`Gold: ${g}`,
    hud_shield: s=>` Shield:-${s}`,
    hud_kills: k=>`Kills: ${k}`,
    hud_potions: n=>`Potions: ${n}/3 [H]`,
    shop_title:'=== SHOP ===',
    shop_gold: g=>`Gold: ${g}`,
    shop_heal:'[1] Healing  +50 HP',
    shop_sword:'[2] Sword    +5 ATK',
    shop_shield:'[3] Shield   -3 DMG',
    shop_price: p=>`price: ${p}g`,
    shop_exit:'[Q] leave shop',
    dead_title:'*** GAME OVER ***',
    dead_stats: (f,g)=>`Floor:${f} Gold:${g}`,
    dead_restart:'[R] Play again',
    victory_title:'*** VICTORY ***',
    victory_stats: (lv,g,hp,mhp)=>`Lv:${lv} Gold:${g} HP:${hp}/${mhp}`,
    victory_credits:'CREATORS',
    victory_restart:'[R] Play again',
    title_sub:'dark dungeons await...',
    title_new:'[ENTER]  New game',
    title_continue:'[C]  Continue',
    title_scores:'[T]  Leaderboard',
    scores_back:'[ESC]  Back',
    boss_announce:'FLOOR BOSS:',
    lang_choose:'Wybierz język / Choose language',
    lang_pl:'[ P ]  Polski',
    lang_en:'[ E ]  English',
    mode_choose:'Choose control mode',
    mode_touch:'[ T ]  Touch mode',
    mode_touch_sub:'D-pad on screen (demo)',
    mode_keyboard:'[ K ]  Keyboard mode',
    mode_keyboard_sub:'AWSD / arrows',
    diff_choose:'Choose difficulty',
    diff_1:'[ 1 ]  Easy',        diff_1_sub:'more HP, weaker enemies',
    diff_2:'[ 2 ]  Normal',      diff_2_sub:'standard stats',
    diff_3:'[ 3 ]  Hard',        diff_3_sub:'less HP, stronger enemies',
    diff_4:'[ 4 ]  Impossible',  diff_4_sub:'extremely strong enemies',
    msg_crit: (d)=>`CRIT! +${d} damage!`,
    msg_trap: (d)=>`Trap! -${d} HP!`,
    msg_chest_gold: (g)=>`Chest! +${g} gold!`,
    msg_chest_trap: (d)=>`Trap chest! -${d} HP!`,
    msg_chest_item: s=>`Chest! Found: ${s}!`,
    msg_secret: 'Secret room!',
    score_title:'🏆 LEADERBOARD',
    score_empty:'No scores yet',
    score_yours:'Your score:',
    ability_choose:'Choose a passive ability:',
    ab_vampirism:'Vampirism',  ab_vampirism_d:'+3 HP per kill',
    ab_luck:'Lucky',           ab_luck_d:'+10% crit chance',
    ab_tough:'Tough',          ab_tough_d:'+20 max HP',
    ab_berserker:'Berserker',  ab_berserker_d:'+4 ATK permanently',
    ab_armor:'Armor',          ab_armor_d:'+2 shield (dmg reduction)',
    ab_thief:'Thief',          ab_thief_d:'+40% gold from enemies',
    ab_vision:'Clairvoyance',  ab_vision_d:'+2 vision radius',
  }
};
const POTION_MAX = 3;
function t(key, ...args) {
  const val = LANG[lang][key];
  return typeof val === 'function' ? val(...args) : (val ?? key);
}
function tname(name) { return LANG[lang].names[name] || name; }
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-floor]').forEach(el => {
    el.textContent = t('ep_floor', el.dataset.i18nFloor);
  });
}

// ===================== STAŁE =====================
const TILE  = 20;
const COLS  = 14;
const ROWS  = 20;
const FLOORS = 6;
const FOG_RADIUS = 4;
const W = COLS * TILE;   // 252px
const H = ROWS * TILE;   // 360px
const HUD = 130;

const canvas = document.getElementById('game');
canvas.width  = W;
canvas.height = H + HUD;
let ctx = canvas.getContext('2d');
const gameCtx = ctx;

const ENEMIES = [
  {name:'Goblin',   hp:15,  atk:4,  xp:10, gold:5},
  {name:'Szkielet', hp:20,  atk:6,  xp:15, gold:8},
  {name:'Troll',    hp:35,  atk:10, xp:25, gold:15},
];
const BOSSES = [
  {name:'Smok',        hp:60,  atk:15, xp:50,  gold:40},
  {name:'Demon',       hp:80,  atk:20, xp:75,  gold:60},
  {name:'Lich',        hp:120, atk:25, xp:100, gold:100},
  {name:'Wampir',      hp:160, atk:30, xp:130, gold:130},
  {name:'Golem',       hp:200, atk:35, xp:160, gold:160},
  {name:'Mroczny Bóg', hp:260, atk:45, xp:200, gold:200},
];

// ===================== STAN GRY =====================
let game = {};

const DIFF_SETTINGS = {
  1: { enemyHp:0.6, enemyAtk:0.6, hp:130, atk:10, potions:3 },
  2: { enemyHp:1.0, enemyAtk:1.0, hp:100, atk:8,  potions:3 },
  3: { enemyHp:1.6, enemyAtk:1.5, hp:75,  atk:7,  potions:2 },
  4: { enemyHp:2.8, enemyAtk:2.5, hp:50,  atk:6,  potions:1 },
};

function newPlayer() {
  const d = DIFF_SETTINGS[difficulty] || DIFF_SETTINGS[2];
  return { x:1, y:1, hp:d.hp, maxHp:d.hp, atk:d.atk, xp:0, level:1, gold:0, potions:d.potions, shield:0, passives:[] };
}

function initGame() {
  game = {
    floor: 1,
    lives: 2,
    player: newPlayer(),
    grid: [], entities: [],
    messages: [],
    state: 'playing',
    shopPrices: {heal:20, sword:30, shield:25},
    flashTimer: 0,
    flashMsg: '',
    flashColor: '#fff',
    hitFlashTimer: 0,
    killCount: 0,
    defeatedBosses: [],
    bossAnnounceTimer: 0,
    bossAnnounceName: '',
    fadeTimer: 0,
    visionBonus: 0,
    abilityChoices: [],
    showScores: false,
    difficulty: difficulty,
  };
  for (let i=1; i<=6; i++) {
    const el = document.getElementById(`boss-panel-${i}`);
    if (el) el.classList.remove('boss-defeated');
  }
  loadFloor();
}

// ===================== MAPA =====================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateMap(floorNum) {
  const grid = Array.from({length: ROWS}, () => Array(COLS).fill(1));
  grid[1][1] = 0;
  const stack = [[1,1]];
  while (stack.length) {
    const [cx, cy] = stack[stack.length-1];
    const dirs = shuffle([[0,2],[0,-2],[2,0],[-2,0]]);
    let moved = false;
    for (const [dx, dy] of dirs) {
      const nx = cx+dx, ny = cy+dy;
      if (nx>=1 && nx<=COLS-2 && ny>=1 && ny<=ROWS-2 && grid[ny][nx]===1) {
        grid[cy+dy/2][cx+dx/2] = 0;
        grid[ny][nx] = 0;
        stack.push([nx, ny]);
        moved = true; break;
      }
    }
    if (!moved) stack.pop();
  }

  const entities = [];
  const used = new Set(['1,1']);
  const free = [];
  for (let y=1; y<ROWS-1; y++)
    for (let x=1; x<COLS-1; x++)
      if (grid[y][x]===0) free.push([x,y]);
  shuffle(free);

  function place(count, type, extra={}) {
    let placed = 0;
    for (let i = free.length-1; i >= 0 && placed < count; i--) {
      const [x,y] = free[i];
      if (!used.has(`${x},${y}`)) {
        entities.push({type, x, y, ...extra});
        used.add(`${x},${y}`);
        placed++;
      }
    }
  }

  place(4 + floorNum, 'gold');
  place(2, 'potion');

  const enemyCount = 3 + floorNum * 2;
  for (let i = 0; i < enemyCount; i++) {
    for (let j = free.length-1; j >= 0; j--) {
      const [x,y] = free[j];
      if (!used.has(`${x},${y}`)) {
        const tmpl = ENEMIES[Math.floor(Math.random()*ENEMIES.length)];
        const ds = DIFF_SETTINGS[difficulty] || DIFF_SETTINGS[2];
        const e2 = clone(tmpl);
        e2.hp = Math.round(e2.hp * ds.enemyHp);
        e2.atk = Math.round(e2.atk * ds.enemyAtk);
        entities.push({type:'enemy', x, y, spawnX:x, spawnY:y, ...e2});
        used.add(`${x},${y}`); break;
      }
    }
  }
  for (let j = free.length-1; j >= 0; j--) {
    const [x,y] = free[j];
    if (!used.has(`${x},${y}`)) {
      const bds = DIFF_SETTINGS[difficulty] || DIFF_SETTINGS[2];
      const b2 = clone(BOSSES[floorNum-1]);
      b2.hp = Math.round(b2.hp * bds.enemyHp);
      b2.atk = Math.round(b2.atk * bds.enemyAtk);
      entities.push({type:'boss', x, y, spawnX:x, spawnY:y, ...b2});
      used.add(`${x},${y}`); break;
    }
  }
  for (let j = 0; j < free.length; j++) {
    const [x,y] = free[j];
    if (!used.has(`${x},${y}`)) {
      entities.push({type:'stairs', x, y});
      used.add(`${x},${y}`); break;
    }
  }
  const trapCount = 2 + Math.floor(floorNum/2);
  for (let i=0; i<trapCount; i++) {
    for (let j=free.length-1; j>=0; j--) {
      const [x,y] = free[j];
      if (!used.has(`${x},${y}`) && !(x===1&&y===1)) {
        entities.push({type:'trap', x, y, revealed:false});
        used.add(`${x},${y}`); break;
      }
    }
  }
  const chestCount = 1 + Math.floor(floorNum/3);
  for (let i=0; i<chestCount; i++) {
    for (let j=free.length-1; j>=0; j--) {
      const [x,y] = free[j];
      if (!used.has(`${x},${y}`)) {
        entities.push({type:'chest', x, y});
        used.add(`${x},${y}`); break;
      }
    }
  }
  if (Math.random() < 0.4) {
    const wallCandidates = [];
    for (let y=2; y<ROWS-3; y++) for (let x=2; x<COLS-3; x++) {
      if (grid[y][x]===1 && grid[y+1][x]===1 && grid[y][x+1]===1 && grid[y+1][x+1]===1 &&
          (grid[y-1][x]===0 || grid[y][x-1]===0)) wallCandidates.push([x,y]);
    }
    if (wallCandidates.length > 0) {
      const [sx,sy] = wallCandidates[Math.floor(Math.random()*wallCandidates.length)];
      grid[sy][sx]=0; grid[sy+1][sx]=0; grid[sy][sx+1]=0; grid[sy+1][sx+1]=0;
      [[sx,sy],[sx+1,sy],[sx,sy+1],[sx+1,sy+1]].forEach(([tx,ty])=>{
        if (!used.has(`${tx},${ty}`)) {
          const roll=Math.random();
          if (roll<0.5) entities.push({type:'gold',x:tx,y:ty});
          else if (roll<0.8) entities.push({type:'potion',x:tx,y:ty});
          else entities.push({type:'chest',x:tx,y:ty});
          used.add(`${tx},${ty}`);
        }
      });
    }
  }
  return {grid, entities};
}

function clone(o) { return JSON.parse(JSON.stringify(o)); }

// ===================== SAVE/LOAD =====================
function saveScore() {
  const p = game.player;
  const score = game.floor * 200 + p.gold + p.level * 100 + game.killCount * 10;
  const entry = { score, floor: game.floor, level: p.level, gold: p.gold, kills: game.killCount, diff: difficulty };
  try {
    const scores = JSON.parse(localStorage.getItem('dc_scores')||'[]');
    scores.push(entry);
    scores.sort((a,b)=>b.score-a.score);
    scores.splice(5);
    localStorage.setItem('dc_scores', JSON.stringify(scores));
  } catch(e) {}
}

function getScores() {
  try { return JSON.parse(localStorage.getItem('dc_scores')||'[]'); } catch(e) { return []; }
}

function saveGame() {
  if (!game.floor) return;
  if (game.state === 'ability_pick') return;
  try { localStorage.setItem('dc_save', JSON.stringify(game)); } catch(e) {}
}

function getSavedDifficulty() {
  try {
    const s = localStorage.getItem('dc_save');
    if (!s) return null;
    const saved = JSON.parse(s);
    return saved && saved.difficulty ? saved.difficulty : 2;
  } catch(e) { return null; }
}

function canContinue() {
  const sd = getSavedDifficulty();
  return sd !== null && sd === difficulty;
}

function loadSavedGame() {
  try {
    const s = localStorage.getItem('dc_save');
    if (!s) return false;
    const saved = JSON.parse(s);
    if (saved && saved.floor && saved.player && saved.grid) {
      game = saved;
      game.state = 'playing';
      difficulty = game.difficulty || 2;
      updateBossPanel();
      return true;
    }
  } catch(e) {}
  return false;
}

function updateBossPanel() {
  if (!game.defeatedBosses) return;
  game.defeatedBosses.forEach(floor => {
    const el = document.getElementById(`boss-panel-${floor}`);
    if (el) el.classList.add('boss-defeated');
  });
}

function showTitle() {
  game = { state: 'lang' };
}

function updateFog() {
  const px = game.player.x, py = game.player.y;
  const r = FOG_RADIUS + (game.visionBonus||0);
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      if (dx*dx + dy*dy <= r*r) {
        const nx = px+dx, ny = py+dy;
        if (nx>=0 && nx<COLS && ny>=0 && ny<ROWS)
          game.visited[ny][nx] = true;
      }
    }
  }
}

function isVisible(x, y) {
  const r = FOG_RADIUS + (game.visionBonus||0);
  const dx = x - game.player.x, dy = y - game.player.y;
  return dx*dx + dy*dy <= r*r;
}

function drawFog() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (!game.visited[y][x]) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(x*TILE, y*TILE, TILE, TILE);
      } else if (!isVisible(x, y)) {
        ctx.fillStyle = 'rgba(0,0,0,0.62)';
        ctx.fillRect(x*TILE, y*TILE, TILE, TILE);
      }
    }
  }
}

function loadFloor() {
  const {grid, entities} = generateMap(game.floor);
  game.grid = grid;
  game.entities = entities;
  game.player.x = 1;
  game.player.y = 1;
  game.visited = Array.from({length: ROWS}, () => new Array(COLS).fill(false));
  updateFog();
  const boss = BOSSES[game.floor-1];
  game.bossAnnounceName = boss.name;
  game.bossAnnounceTimer = 100;
  game.fadeTimer = 18;
  msg(t('msg_enter_floor', game.floor), '#aaa');
}

function entityAt(x, y) {
  return game.entities.find(e => e.x===x && e.y===y && !e.dying) || null;
}

function isWall(x, y) {
  if (x<0||x>=COLS||y<0||y>=ROWS) return true;
  return game.grid[y][x] === 1;
}

// ===================== KOMUNIKATY =====================
function msg(text, color='#fff') {
  game.messages.unshift({text, color});
  if (game.messages.length > 4) game.messages.pop();
  game.flashMsg = text;
  game.flashColor = color;
  game.flashTimer = 100;
}

// ===================== WALKA =====================
function fight(enemy) {
  const p = game.player;
  const critChance = 0.15 + (p.passives.includes('luck') ? 0.10 : 0);
  const isCrit = Math.random() < critChance;
  const baseDmg = Math.max(1, p.atk + randInt(-2,2));
  const critBonus = isCrit ? Math.floor(p.atk * 0.8) : 0;
  const dmgToEnemy = baseDmg + critBonus;
  const raw = Math.max(1, enemy.atk + randInt(-2,2));
  const dmgToPlayer = Math.max(1, raw - p.shield);

  enemy.hp -= dmgToEnemy;
  p.hp -= dmgToPlayer;

  if (dmgToPlayer > 0) game.hitFlashTimer = 10;

  if (enemy.hp <= 0) {
    enemy.dying = true; enemy.dyingTimer = 10;
    const goldMult = p.passives.includes('thief') ? 1.4 : 1;
    const goldEarned = Math.round(enemy.gold * goldMult);
    p.gold += goldEarned;
    p.xp   += enemy.xp;
    if (p.passives.includes('vampirism')) { p.hp = Math.min(p.maxHp, p.hp+3); }
    game.killCount++;
    if (enemy.type === 'boss') {
      game.defeatedBosses.push(game.floor);
      updateBossPanel();
    }
    msg(t('msg_defeated', tname(enemy.name), enemy.xp, goldEarned), '#44ff44');
    if (isCrit) msg(t('msg_crit', critBonus), '#ffdd00');
    levelUp();
  } else {
    const combatMsg = t('msg_combat', tname(enemy.name), dmgToEnemy, dmgToPlayer);
    msg(isCrit ? '⚡ '+combatMsg : combatMsg, isCrit ? '#ffdd00' : '#ff4444');
  }

  if (p.hp <= 0) die();
  saveGame();
}

function die() {
  game.lives--;
  if (game.lives > 0) {
    game.player.hp = game.player.maxHp;
    game.player.x = 1;
    game.player.y = 1;
    msg(t('msg_died', game.lives), '#ff4444');
  } else {
    game.state = 'dead'; saveScore();
  }
}

const ALL_ABILITIES = ['vampirism','luck','tough','berserker','armor','thief','vision'];

function pickAbilities(p) {
  const available = ALL_ABILITIES.filter(a => !p.passives.includes(a));
  const result = [];
  const pool = [...available];
  while (result.length < 3 && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(i, 1)[0]);
  }
  return result;
}

function applyAbility(key) {
  const p = game.player;
  p.passives.push(key);
  if (key==='tough')     { p.maxHp+=20; p.hp=Math.min(p.hp+20,p.maxHp); }
  if (key==='berserker') { p.atk+=4; }
  if (key==='armor')     { p.shield+=2; }
  if (key==='vision')    { game.visionBonus=(game.visionBonus||0)+2; }
  game.state='playing';
}

function levelUp() {
  const p = game.player;
  const needed = p.level * 30;
  if (p.xp >= needed) {
    p.level++;
    p.xp -= needed;
    p.maxHp += 10;
    p.hp = Math.min(p.hp + 10, p.maxHp);
    p.atk += 2;
    msg(t('msg_levelup', p.level), '#ffd700');
    const choices = pickAbilities(p);
    if (choices.length > 0) {
      game.abilityChoices = choices;
      game.state = 'ability_pick';
    }
  }
}

function randInt(a, b) { return a + Math.floor(Math.random()*(b-a+1)); }

// ===================== RUCH WROGÓW =====================
const ENEMY_PATROL = 2;
const ENEMY_DETECT = 5;

function hasLineOfSight(x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let cx = x0, cy = y0;
  while (!(cx === x1 && cy === y1)) {
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; cx += sx; }
    if (e2 <  dx) { err += dx; cy += sy; }
    if (cx === x1 && cy === y1) break;
    if (isWall(cx, cy)) return false;
  }
  return true;
}

function moveEnemies() {
  const p = game.player;
  for (const e of game.entities) {
    if ((e.type !== 'enemy' && e.type !== 'boss') || e.dying) continue;

    const adjToPlayer = Math.abs(e.x - p.x) <= 1 && Math.abs(e.y - p.y) <= 1
                     && !(e.x === p.x && e.y === p.y);
    if (adjToPlayer) continue;

    const dist = Math.abs(e.x - p.x) + Math.abs(e.y - p.y);
    const canSee = dist <= ENEMY_DETECT && hasLineOfSight(e.x, e.y, p.x, p.y);
    let dirs;

    if (canSee) {
      const dx = Math.sign(p.x - e.x), dy = Math.sign(p.y - e.y);
      if (dx !== 0 && dy !== 0) dirs = [[dx,0],[0,dy],[-dx,0],[0,-dy]];
      else if (dx !== 0)        dirs = [[dx,0],[0,1],[0,-1],[-dx,0]];
      else                      dirs = [[0,dy],[1,0],[-1,0],[0,-dy]];
    } else {
      dirs = [[1,0],[-1,0],[0,1],[0,-1]].sort(() => Math.random()-0.5);
    }

    for (const [ddx, ddy] of dirs) {
      const nx = e.x + ddx, ny = e.y + ddy;
      if (isWall(nx, ny)) continue;
      if (nx === p.x && ny === p.y) continue;
      if (entityAt(nx, ny)) continue;
      const fromSpawn = Math.abs(nx - (e.spawnX||e.x)) + Math.abs(ny - (e.spawnY||e.y));
      if (fromSpawn > ENEMY_PATROL) continue;
      e.x = nx; e.y = ny;
      break;
    }
  }
}

// ===================== RUCH =====================
function move(dx, dy) {
  if (game.state !== 'playing') return;
  const p = game.player;
  const nx = p.x + dx, ny = p.y + dy;
  if (isWall(nx, ny)) return;

  const e = entityAt(nx, ny);
  if (e) {
    if (e.type==='enemy' || e.type==='boss') {
      fight(e); return;
    }
    if (e.type==='gold') {
      const g = randInt(5,15);
      p.gold += g;
      msg(t('msg_gold', g), '#ffd700');
      game.entities = game.entities.filter(x => x!==e);
    }
    if (e.type==='potion') {
      if (p.hp >= p.maxHp) {
        // Pełne HP — schowaj do ekwipunku (jeśli miejsce)
        if (p.potions < POTION_MAX) {
          p.potions++;
          msg(t('msg_potion_stored'), '#00ffff');
        } else {
          msg(t('msg_potion_full'), '#ff8800');
        }
      } else {
        // Niepełne HP — wypij od razu
        const heal = randInt(20,40);
        p.hp = Math.min(p.maxHp, p.hp + heal);
        msg(t('msg_potion_ground', heal), '#00ffff');
      }
      game.entities = game.entities.filter(x => x!==e);
    }
    if (e.type==='trap') {
      e.revealed = true;
      const dmg = randInt(8,18);
      p.hp -= dmg;
      game.hitFlashTimer = 10;
      msg(t('msg_trap', dmg), '#ff6600');
      game.entities = game.entities.filter(x => x!==e);
      if (p.hp <= 0) { die(); return; }
    }
    if (e.type==='chest') {
      game.entities = game.entities.filter(x => x!==e);
      const roll = Math.random();
      if (roll < 0.55) {
        const g = randInt(20,50);
        p.gold += g;
        msg(t('msg_chest_gold', g), '#ffd700');
      } else if (roll < 0.80) {
        const items = ['potion','atk','shield'];
        const item = items[Math.floor(Math.random()*items.length)];
        if (item==='potion') {
          if (p.potions < POTION_MAX) {
            p.potions++;
            msg(t('msg_chest_item', '🧪 mikstura'), '#00ffff');
          } else {
            msg(t('msg_potion_full'), '#ff8800');
          }
        } else if (item==='atk') {
          p.atk+=3; msg(t('msg_chest_item', '⚔ +3 ATK'), '#ff8800');
        } else {
          p.shield+=1; msg(t('msg_chest_item', '🛡 +1 tarcza'), '#88aaff');
        }
      } else {
        const dmg = randInt(15,30);
        p.hp -= dmg;
        game.hitFlashTimer = 10;
        msg(t('msg_chest_trap', dmg), '#ff4444');
        if (p.hp <= 0) { die(); return; }
      }
    }
    if (e.type==='stairs') {
      const bossAlive = game.entities.some(x => x.type==='boss');
      if (bossAlive) {
        msg(t('msg_boss_block'), '#ff4444');
        p.x = nx; p.y = ny; return;
      }
      if (game.floor === FLOORS) {
        const anyLeft = game.entities.some(x => x.type==='enemy'||x.type==='boss');
        if (anyLeft) { msg(t('msg_enemies_block'), '#ff4444'); p.x=nx; p.y=ny; return; }
        game.state = 'victory'; saveScore(); updateTouchUI(); return;
      }
      game.state = 'shop'; updateTouchUI(); return;
    }
  }
  p.x = nx; p.y = ny;
  updateFog();
  moveEnemies();
  saveGame();
}

// ===================== SKLEP =====================
function buyItem(key) {
  if (game.state !== 'shop') return;
  const p = game.player;
  const pr = game.shopPrices;
  if (key==='1') {
    if (p.gold >= pr.heal) {
      p.gold -= pr.heal;
      pr.heal += 5;
      p.hp = Math.min(p.maxHp, p.hp + 50);
      msg(t('msg_heal_buy', null, pr.heal), '#00ff88');
    } else msg(t('msg_no_gold'), '#ff4444');
  } else if (key==='2') {
    if (p.gold >= pr.sword) {
      p.gold -= pr.sword;
      pr.sword = Math.floor(pr.sword * 1.5);
      p.atk += 5;
      msg(t('msg_sword_buy', null, pr.sword), '#ff8800');
    } else msg(t('msg_no_gold'), '#ff4444');
  } else if (key==='3') {
    if (p.gold >= pr.shield) {
      p.gold -= pr.shield;
      pr.shield = Math.floor(pr.shield * 1.5);
      p.shield = (p.shield||0) + 3;
      msg(t('msg_shield_buy', null, pr.shield), '#00aaff');
    } else msg(t('msg_no_gold'), '#ff4444');
  } else if (key==='q'||key==='Q'||key==='Escape') {
    game.floor++;
    game.player.hp = game.player.maxHp;
    // +1 mikstura za nowe piętro (do limitu)
    if (p.potions < POTION_MAX) {
      p.potions++;
      msg(t('msg_floor_potion'), '#00ffff');
    }
    msg(t('msg_new_floor', game.floor), '#00ff88');
    loadFloor();
    game.state = 'playing';
    updateTouchUI();
  }
  saveGame();
}
