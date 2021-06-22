import {createElement} from "../Game/utils.js";

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.weapon = props.weapon;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    attack = () => {
        console.log(this.name + 'fight');
    }

    changeHP = (num) => {
        this.hp -= num;
        if(this.hp <= 0){
            this.hp = 0;
        }
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {
        const newPlayer = createElement('div', this.selector);
        const progressbar = createElement('div', 'progressbar');
        const character = createElement('div', 'character');
        const life = createElement('div', 'life');
        const plName = createElement('div', 'name');
        const image = createElement('img');

        newPlayer.appendChild(progressbar);
        newPlayer.appendChild(character);
        progressbar.appendChild(life);
        progressbar.appendChild(plName);
        character.appendChild(image);

        life.style.width = this.hp + '%';
        plName.innerText = this.name;
        image.src = this.img;

        const root = document.querySelector(`.${this.rootSelector}`);
        root.appendChild(newPlayer);

        return newPlayer;
    }
}

export default Player;