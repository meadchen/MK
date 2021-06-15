import { player1, player2, createPlayer } from './players.js';
import generateLogs from "./logs.js";
import {arenas, formFight, enemyAttack, playerAttack, showResult} from "./fight.js";


arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

generateLogs('start', player2, player1);


formFight.addEventListener('submit', function(e){
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();
  player1.attackValue = player.value;
  player2.attackValue = enemy.value;


  if (player.defence != enemy.hit){
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1);
  } else {
    generateLogs('defence', player1, player2);
  }

  if (enemy.defence != player.hit){
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2);
  } else {
    generateLogs('defence', player2, player1);
  }

  showResult();

  console.log(player);
  console.log(enemy);

});

