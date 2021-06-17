import {createElement} from "./utils.js";

export const player1 ={
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['sword', 'knife', 'gun'],
  attack,
  changeHP,
  elHP,
  renderHP
}

export const player2 = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'knife', 'gun'],
    attack,
    changeHP,
    elHP,
    renderHP
}

function attack () {
    console.log(this.name + 'fight');
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

export const createPlayer = (playerObj) => {
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