const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player1.name + 'fight');
  }
}

const player2 = {
  player: 2,
  name: 'Sub Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player2.name + 'fight');
  }
}

const createElement = (tag, className) =>{
  const createdTag = document.createElement(tag);
  if(className){
    createdTag.classList.add(className)
  }
  return createdTag;
}

const createPlayer = (playerObj) => {
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

const changeHP = (player) => {
  const playerLife = document.querySelector(`.player${player.player} .life`);
  playerLife.style.width = randomHpSubtract(player) + '%';
 
  if(player.hp <= 0 && player.player == 1){
    getWinner(player, player2, playerLife);
  } else if(player.hp <= 0 && player.player == 2){
    getWinner(player, player1, playerLife);
  }
}




function getWinner (losePlayer, winPlayer, playerLife = false) {
  arenas.appendChild(playerWins(winPlayer.name));
  losePlayer.hp = 0;
  playerLife.style.width = '0%';
  randomButton.disabled = true;
  const winner = document.querySelector(`.player${winPlayer.player} .character`);
  winner.classList.add('winner');
}

const randomHpSubtract = (player) =>{
  return player.hp -= Math.ceil(Math.random() * 20);
}

const playerWins = (name) => {
  const winTitle = createElement('div', 'winTitle');
  winTitle.innerText = name + ' wins';

  return winTitle;
}

randomButton.addEventListener('click', function(){
  changeHP(player1);
  changeHP(player2);
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

