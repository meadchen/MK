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
    arenas.appendChild(playerWins(player2.name));
    player.hp = 0;
    playerLife.style.width = '0%';
    randomButton.disabled = true;
    const winner = document.querySelector('.player2 .character');
    winner.classList.add('winner');
  } else if(player.hp <= 0 && player.player == 2){
    arenas.appendChild(playerWins(player1.name));
    player.hp = 0;
    playerLife.style.width = '0%';
    randomButton.disabled = true;
    const winner = document.querySelector('.player1 .character');
    winner.classList.add('winner');
  }
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

