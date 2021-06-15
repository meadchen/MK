const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const buttonFight = document.querySelector('.buttonWrap .button');
const HIT = {
  head: 30,
  body: 25,
  foot: 20
}
const ATTACK = ['head', 'body', 'foot']


const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player1.name + 'fight');
  },
  changeHP,
  elHP,
  renderHP
}

const player2 = {
  player: 2,
  name: 'Sub Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player2.name + 'fight');
  },
  changeHP,
  elHP,
  renderHP
}

function createElement (tag, className){
  const createdTag = document.createElement(tag);
  if(className){
    createdTag.classList.add(className)
  }
  return createdTag;
}

function createPlayer (playerObj){
  const player = createElement('div', 'player' + playerObj.player);
  const progressbar = createElement('div', 'progressbar');
  const character = createElement('div', 'character');
  const life = createElement('div', 'life');
  const name = createElement('div', 'name');
  const img = createElement('img');

  player.appendChild(progressbar);
  player.appendChild(character);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  character.appendChild(img);

  life.style.width = playerObj.hp + '%';
  name.innerText = playerObj.name;
  img.src = playerObj.img;

  return player;
}

function changeHP (num) {
  this.hp -= num;
  if(this.hp <= 0){
    this.hp = 0;
  }
}

function elHP (){
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP (){
  this.elHP().style.width = this.hp + '%';
}


function getWinner (winPlayer) {
  const winner = document.querySelector(`.player${winPlayer.player} .character`);
  winner.classList.add('winner');
}

function getRandom (num){
  return Math.ceil(Math.random() * num);
}

function playerWins (name){
  const winTitle = createElement('div', 'winTitle');
  if (name){
    winTitle.innerText = name + ' wins';
  } else{
    winTitle.innerText = 'draw';
  }

  return winTitle;
}


function createReloadButton (){
  const reloadWrap = createElement('div', 'reloadWrap');
  const button = createElement('button', 'button');
  reloadWrap.appendChild(button);
  button.innerText = 'Restart';
  arenas.appendChild(reloadWrap);

  button.addEventListener('click', function(){
    window.location.reload();
  })
}


arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function enemyAttack(){
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}


formFight.addEventListener('submit', function(e){
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = {};

  for(let item of formFight){
    if (item.checked && item.name === 'hit'){
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence'){
      attack.defence = item.value;
    }

    item.checked = false;
  }

  if (attack.defence != enemy.hit){
    player1.changeHP(enemy.value);
    player1.renderHP();
  } 

  if (enemy.defence != attack.hit){
    player2.changeHP(attack.value);
    player2.renderHP();
  } 
  
  if (player1.hp === 0 || player2.hp === 0){
    createReloadButton();
    buttonFight.disabled = true;
  }

  if (player1.hp === 0 && player1.hp < player2.hp){
    arenas.appendChild(playerWins(player2.name));
    getWinner(player2);
  } else if(player2.hp === 0 && player2.hp < player1.hp){
    arenas.appendChild(playerWins(player1.name));
    getWinner(player1);
  } else if(player2.hp === 0 && player2.hp === player1.hp){
    arenas.appendChild(playerWins());
  }

  //console.log(attack);
  //console.log(enemy);

});