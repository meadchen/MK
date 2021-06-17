import {createElement, createReloadButton, getRandom} from "./utils.js";
import {player1, player2} from "./players.js";
import generateLogs from "./logs.js";

export const arenas = document.querySelector('.arenas');
export const formFight = document.querySelector('.control');
const buttonFight = document.querySelector('.buttonWrap .button');
const HIT = {
    head: 30,
    body: 25,
    foot: 20
}
const ATTACK = ['head', 'body', 'foot']


const getWinner = (winPlayer) => {
    const winner = document.querySelector(`.player${winPlayer.player} .character`);
    winner.classList.add('winner');
}

const playerWins = (name) =>{
    const winTitle = createElement('div', 'winTitle');
    if (name){
        winTitle.innerText = name + ' wins';
    } else{
        winTitle.innerText = 'draw';
    }

    return winTitle;
}


export const enemyAttack = () =>{
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}


export const playerAttack = () =>{
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

export function showResult(){
    if (player1.hp === 0 || player2.hp === 0){
        createReloadButton();
        buttonFight.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp){
        arenas.appendChild(playerWins(player2.name));
        getWinner(player2);
        generateLogs('end', player1, player2);
    } else if(player2.hp === 0 && player2.hp < player1.hp){
        arenas.appendChild(playerWins(player1.name));
        getWinner(player1);
        generateLogs('end', player2, player1);
    } else if(player2.hp === 0 && player2.hp === player1.hp){
        arenas.appendChild(playerWins());
        generateLogs('draw', player2, player1);
    }
}


