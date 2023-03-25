'use strict';

const playerChoice = document.getElementById('player') || undefined;
const gameAgainstCPU = document.getElementById('cpu') || undefined;
const gameAgainstPlayer = document.getElementById('player') || undefined;

//HTML5 local storage
localStorage.setItem('player1', 'X');
localStorage.setItem('player2', '');
localStorage.setItem('cpu', '');

let player1 = localStorage.getItem('player1');

if (playerChoice != null && playerChoice != undefined) {
	playerChoice.addEventListener('input', (e) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			player1 = 'X';
			localStorage.setItem('player1', 'X');
		} else {
			player1 = 'O';
			localStorage.setItem('player1', 'O');
		}
		console.log(player1);
	});
}
if (gameAgainstCPU != null && gameAgainstCPU != undefined) {
	gameAgainstCPU.addEventListener('click', () => {
		gameAgainstPlayer.disabled = true;
		player1 === 'X'
			? localStorage.setItem('cpu', 'O')
			: localStorage.setItem('cpu', 'X');
	});
}
if (gameAgainstPlayer != null && gameAgainstPlayer != undefined) {
	gameAgainstPlayer.addEventListener('click', () => {
		gameAgainstCPU.disabled = true;
		player1 === 'X'
			? localStorage.setItem('player2', 'O')
			: localStorage.setItem('player2', 'X');
	});
}
