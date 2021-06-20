import {createElement, createReloadButton, getRandom, getTime} from "./utils.js";
import {ATTACK, formFight, buttonFight, HIT, logs} from './variables.js';
import Player from "../Players/index.js";
import Enemy from "./enemy.js";



export const arenas = document.querySelector('.arenas');

class Game {
    constructor(props) {

    }

    getWinner = (winPlayer) => {
        const winner = document.querySelector(`.player${winPlayer.player} .character`);
        winner.classList.add('winner');
    }

    playerWins = (name) =>{
        const winTitle = createElement('div', 'winTitle');
        if (name){
            winTitle.innerText = name + ' wins';
        } else{
            winTitle.innerText = 'draw';
        }

        return winTitle;
    }


    enemyAttack = async() => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        const data = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit: hit,
                    defence: defence,
                })
            }).then(response => response.json());
        console.log(data.player2)
        return data.player2;
    }



    playerAttack = () =>{
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

        return attack;
    }

    showResult = () => {
        if (this.player1.hp === 0 || this.player2.hp === 0){
            createReloadButton();
            buttonFight.disabled = true;
        }

        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp){
            arenas.appendChild(this.playerWins(this.player2.name));
            this.getWinner(this.player2);
            this.generateLogs('end', this.player1, this.player2);
        } else if(this.player2.hp === 0 && this.player2.hp < this.player1.hp){
            arenas.appendChild(this.playerWins(this.player1.name));
            this.getWinner(this.player1);
            this.generateLogs('end', this.player2, this.player1);
        } else if(this.player2.hp === 0 && this.player2.hp === this.player1.hp){
            arenas.appendChild(this.playerWins());
            this.generateLogs('draw', this.player2, this.player1);
        }
    }


    generateLogs = (type, player1, player2) => {
        let chat = document.querySelector('.chat');
        let text;
        let el;
        switch (type) {
            case 'start':
                const start = logs[type].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
                const begin = `<p>${start}</p>`;
                chat.insertAdjacentHTML('afterbegin', begin);
                break;
            case 'hit':
                text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
                el = `<p>${getTime()} - ${text} - ${player1.attackValue} [${player2.hp}/100]</p>`;
                break;
            case 'defence':
                text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
                el = `<p> ${getTime()} - ${text}</p>`;
                break;
            case 'end':
                text = logs[type][getRandom(logs[type].length) - 1].replace('[playerWins]', player2.name).replace('[playerLose]', player1.name);
                el = `<p> ${text} </p>`;
                break;
            case 'draw':
                text = logs[type];
                el = `<p> ${text} </p>`;
                break;
            default:
                el = `<p>Что-то пошло не так, перезагрузите страницу</p>`;
                break;
        }
        if (typeof el !== 'undefined') {
            chat.insertAdjacentHTML('afterbegin', el);
        }
    }

    getPlayers = async() =>{
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
            .then (res => res.json());
        return body;
    }

    start = async() =>{
        const players = await this.getPlayers();
        const p1 = JSON.parse(localStorage.getItem('player1'));
        let enemy = new Enemy();
        const p2 = await enemy.start();
        this.player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        })
        this.player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        })
        this.player1.createPlayer();
        this. player2.createPlayer();
        this.generateLogs('start', this.player1, this.player2);

        formFight.addEventListener('submit',  async(e) =>{
            e.preventDefault();
            const enemy = await this.enemyAttack();
            const player = this.playerAttack();
            this.player1.attackValue = player.value;
            this.player2.attackValue = enemy.value;


            if (player.defence != enemy.hit){
                this.player1.changeHP(enemy.value);
                this.player1.renderHP();
                this.generateLogs('hit', this.player2, this.player1);
            } else {
                this.generateLogs('defence', this.player1, this.player2);
            }

            if (enemy.defence != player.hit){
                this.player2.changeHP(player.value);
                this.player2.renderHP();
                this.generateLogs('hit', this.player1, this.player2);
            } else {
                this.generateLogs('defence', this.player2, this.player1);
            }

            this.showResult();

            console.log(player);
            console.log(enemy);

        });
    }
}


export default Game;