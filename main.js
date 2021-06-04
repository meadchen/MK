const player1 = {
  name: 'Scorpion',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player1.name + 'fight');
  }
}

const player2 = {
  name: 'Sub Zero',
  hp: 70,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack: function () {
    console.log(player2.name + 'fight');
  }
}

let createPlayer = (playerName, playerObj) => {
  let player = document.createElement('div');
  let progressbar = document.createElement('div');
  let character = document.createElement('div');
  let life = document.createElement('div');
  let name = document.createElement('div');
  let img = document.createElement('img');
  let arenas = document.querySelector('.arenas')


  player.classList.add(playerName);
  progressbar.classList.add('progressbar');
  character.classList.add('character');
  life.classList.add('life');
  name.classList.add('name');

  player.appendChild(progressbar);
  player.appendChild(character);
  progressbar.appendChild(life);
  progressbar.appendChild(name);
  character.appendChild(img);

  life.style.width = playerObj.hp;
  name.innerText = playerObj.name;
  img.src = playerObj.img;

  arenas.appendChild(player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);