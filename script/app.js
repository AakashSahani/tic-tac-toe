'use strict';

import { player1, player2, ai } from './variables.js';

const playerChoice = document.getElementById('player');
const gameAgainstCPU = document.getElementById('cpu');
const gameAgainstPlayer = document.getElementById('player');

const tileChoice = ['X', 'O'];

playerChoice.addEventListener('input', (e) => {
	const isChecked = e.target.checked;
	if (isChecked) {
		player1 = tileChoice[0];
	} else {
		player1 = tileChoice[1];
	}
});

gameAgainstCPU.addEventListener('click', () => {
	gameAgainstPlayer.disabled = true;
	player1 === 'X' ? (ai = tileChoice[1]) : (ai = tileChoice[0]);
});
gameAgainstPlayer.addEventListener('click', () => {
	gameAgainstCPU.disabled = true;
	player1 === 'X' ? (player2 = tileChoice[1]) : (player2 = tileChoice[0]);
});
