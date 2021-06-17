import {createElement, createReloadButton, getRandom, getTime} from "../utils.js";
import Player from "../Players";

export const arenas = document.querySelector('.arenas');

const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword', 'knife', 'gun'],
    rootSelector: 'arenas'
});

const player2 = new Player({
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword', 'knife', 'gun'],
    rootSelector: 'arenas'
});


class Game {
    constructor(props) {

    }
    formFight = document.querySelector('.control');
    buttonFight = document.querySelector('.buttonWrap .button');
    HIT = {
        head: 30,
        body: 25,
        foot: 20
    }
    ATTACK = ['head', 'body', 'foot']

    logs = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            'Результат удара [playerWins]: [playerLose] - труп',
            '[playerLose] погиб от удара бойца [playerWins]',
            'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        ],
        hit: [
            '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
            '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
            '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
            '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
            '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
            '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
            '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
            '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
            '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
            '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
            '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
            '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
            '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
            '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
            '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
            '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
            '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
            '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        ],
        defence: [
            '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
            '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
            '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
            '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
            '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
            '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        ],
        draw: 'Ничья - это тоже победа!'
    };


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


    enemyAttack = () =>{
        const hit = this.ATTACK[getRandom(3) - 1];
        const defence = this.ATTACK[getRandom(3) - 1];
        return {
            value: getRandom(this.HIT[hit]),
            hit,
            defence,
        }
    }


    playerAttack = () =>{
        const attack = {};

        for(let item of this.formFight){
            if (item.checked && item.name === 'hit'){
                attack.value = getRandom(this.HIT[item.value]);
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
        if (player1.hp === 0 || player2.hp === 0){
            createReloadButton();
            this.buttonFight.disabled = true;
        }

        if (player1.hp === 0 && player1.hp < player2.hp){
            arenas.appendChild(this.playerWins(player2.name));
            this.getWinner(player2);
            this.generateLogs('end', player1, player2);
        } else if(player2.hp === 0 && player2.hp < player1.hp){
            arenas.appendChild(this.playerWins(player1.name));
            this.getWinner(player1);
            this.generateLogs('end', player2, player1);
        } else if(player2.hp === 0 && player2.hp === player1.hp){
            arenas.appendChild(this.playerWins());
            this.generateLogs('draw', player2, player1);
        }
    }


    generateLogs = (type, player1, player2) => {
        let chat = document.querySelector('.chat');
        let text;
        let el;
        switch (type) {
            case 'start':
                const start = this.logs[type].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
                const begin = `<p>${start}</p>`;
                chat.insertAdjacentHTML('afterbegin', begin);
                break;
            case 'hit':
                text = this.logs[type][getRandom(this.logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
                el = `<p>${getTime()} - ${text} - ${player1.attackValue} [${player2.hp}/100]</p>`;
                break;
            case 'defence':
                text = this.logs[type][getRandom(this.logs[type].length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
                el = `<p> ${getTime()} - ${text}</p>`;
                break;
            case 'end':
                text = this.logs[type][getRandom(this.logs[type].length) - 1].replace('[playerWins]', player2.name).replace('[playerLose]', player1.name);
                el = `<p> ${text} </p>`;
                break;
            case 'draw':
                text = this.logs[type];
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
    start = () =>{

        player1.createPlayer();
        player2.createPlayer();

        this.generateLogs('start', player2, player1);

        this.formFight.addEventListener('submit', (e) =>{
            e.preventDefault();
            const enemy = this.enemyAttack();
            const player = this.playerAttack();
            player1.attackValue = player.value;
            player2.attackValue = enemy.value;


            if (player.defence != enemy.hit){
                player1.changeHP(enemy.value);
                player1.renderHP();
                this.generateLogs('hit', player2, player1);
            } else {
                this.generateLogs('defence', player1, player2);
            }

            if (enemy.defence != player.hit){
                player2.changeHP(player.value);
                player2.renderHP();
                this.generateLogs('hit', player1, player2);
            } else {
                this.generateLogs('defence', player2, player1);
            }

            this.showResult();

            console.log(player);
            console.log(enemy);

        });
    }
}

export default Game;