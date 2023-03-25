'use strict';

const playerChoice = document.getElementById('player');
const gameAgainstCPU = document.getElementById('cpu');
const gameAgainstPlayer = document.getElementById('secondPlayer');

//HTML5 local storage
localStorage.setItem('firstPlayer', 'X');
// localStorage.setItem('player2', '');
// localStorage.setItem('cpu', '');
// localStorage.setItem('wins', '');
// localStorage.setItem('ties', '');
// localStorage.setItem('loss', '');

let firstPlayer = localStorage.firstPlayer;

playerChoice.addEventListener('input', (e) => {
	const isChecked = e.target.checked;
	if (isChecked) {
		localStorage.setItem('firstPlayer', 'X');
	} else {
		localStorage.setItem('firstPlayer', 'O');
	}
	firstPlayer = localStorage.firstPlayer;
	console.log('Player1 ', firstPlayer);
});

gameAgainstCPU.addEventListener('click', () => {
	gameAgainstPlayer.disabled = true;
	firstPlayer === 'X'
		? localStorage.setItem('cpu', 'O')
		: localStorage.setItem('cpu', 'X');
});

gameAgainstPlayer.addEventListener('click', () => {
	gameAgainstCPU.disabled = true;
	firstPlayer === 'X'
		? localStorage.setItem('secondPlayer', 'O')
		: localStorage.setItem('secondPlayer', 'X');
});
