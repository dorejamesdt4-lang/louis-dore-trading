const navButtons = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.tab-panel');
const targetButtons = document.querySelectorAll('[data-tab-target]');
const mansionState = document.getElementById('mansionState');

function openTab(name){
  panels.forEach(panel => panel.classList.toggle('active', panel.id === name));
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
  window.scrollTo({top:0, behavior:'smooth'});
}

navButtons.forEach(button => {
  button.addEventListener('click', () => openTab(button.dataset.tab));
});

targetButtons.forEach(button => {
  button.addEventListener('click', () => openTab(button.dataset.tabTarget));
});

document.querySelectorAll('.small-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.variant');
    document.querySelectorAll('.variant').forEach(v => v.style.borderColor = '');
    card.style.borderColor = '#a94a4e';
    button.textContent = 'ACTIVE ✓';
    mansionState.textContent = 'SHIFT READY';
  });
});

document.querySelectorAll('.audio-play').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '▶' ? '■' : '▶';
  });
});

document.querySelectorAll('.folder').forEach(folder => {
  folder.addEventListener('click', () => {
    folder.style.borderColor = '#687571';
  });
});

const testButton = document.getElementById('testButton');
if(testButton){
  testButton.addEventListener('click', () => {
    mansionState.textContent = 'TESTING';
    testButton.textContent = 'ATMOSPHERE TEST RUNNING...';
    setTimeout(() => {
      mansionState.textContent = 'WATCHING';
      testButton.textContent = 'TEST COMPLETE ✓';
      setTimeout(() => testButton.textContent = 'RUN ATMOSPHERE TEST →', 1800);
    }, 1800);
  });
}

// Subtle environmental state changes keep the dashboard alive.
const states = ['WATCHING', 'LISTENING', 'SHIFT READY', 'UNSTABLE'];
let stateIndex = 0;
setInterval(() => {
  stateIndex = (stateIndex + 1) % states.length;
  if(mansionState && !mansionState.textContent.includes('TEST')) {
    mansionState.textContent = states[stateIndex];
  }
}, 5200);

// Playable touch prototype — deliberately lightweight so it runs on Android browsers.
const rooms = [
  'GRAND HALL','WEST LIBRARY','RED DRAWING ROOM','CONSERVATORY','DINING ROOM',
  'ATTIC','WEST BEDROOM','BASEMENT ARCHIVE','BOTANICAL GARDEN'
];
const game = { x:50, y:55, room:0, entity:false, running:true };
const gamePlayer = document.getElementById('gamePlayer');
const gameRoomLabel = document.getElementById('gameRoomLabel');
const gameEntity = document.getElementById('gameEntity');
const gameMessage = document.getElementById('gameMessage');
const androidStatus = document.getElementById('androidStatus');

function renderGame(){
  if(!gamePlayer) return;
  gamePlayer.style.left = game.x + '%'; gamePlayer.style.top = game.y + '%';
  gameRoomLabel.textContent = rooms[game.room];
  gameEntity.classList.toggle('visible', game.entity);
}
function move(dx,dy){
  game.x=Math.max(7,Math.min(93,game.x+dx)); game.y=Math.max(12,Math.min(86,game.y+dy));
  if(Math.random()<0.12){game.entity=true;gameMessage.textContent='Something moved when you looked away.';}
  renderGame();
}
function shiftRoom(){
  game.room=(game.room+1+Math.floor(Math.random()*(rooms.length-1)))%rooms.length;
  game.entity=Math.random()<0.35;
  game.x=50;game.y=55;
  gameMessage.textContent=game.entity?'The room changed. Something came with it.':'The architecture has shifted.';
  renderGame();
}
document.querySelectorAll('[data-move]').forEach(btn=>btn.addEventListener('pointerdown',e=>{
  e.preventDefault(); const d=btn.dataset.move; move(d==='left'?-5:d==='right'?5:0,d==='up'?-5:d==='down'?5:0);
}));
const shiftRoomButton=document.getElementById('shiftRoom');
if(shiftRoomButton) shiftRoomButton.addEventListener('click',shiftRoom);
const newGame=document.getElementById('newGame');
if(newGame) newGame.addEventListener('click',()=>{game.x=50;game.y=55;game.room=0;game.entity=false;gameMessage.textContent='Find the exit. The house may move before you do.';renderGame();});
document.querySelector('[data-action="interact"]')?.addEventListener('pointerdown',()=>{
  if(game.entity){game.entity=false;gameMessage.textContent='The figure is gone. You did not see where it went.';}
  else if(game.x<25||game.x>75){gameMessage.textContent='The door is locked. Try another room.';}
  else {gameMessage.textContent='You hear a door close somewhere upstairs.';}
  renderGame();
});
if(gamePlayer){renderGame();androidStatus.textContent = /Android/i.test(navigator.userAgent) ? 'ANDROID TOUCH READY' : 'TOUCH READY';}
