'use strict';

const playerChoice = document.getElementById('player');
const gameAgainstCPU = document.getElementById('cpu');
const gameAgainstPlayer = document.getElementById('secondPlayer');

localStorage.setItem('cpu', '');
localStorage.setItem('secondPlayer', '');
localStorage.setItem('firstPlayer', 'X');
let firstPlayer = 'X';

playerChoice.addEventListener('input', (e) => {
	const isChecked = e.target.checked;
	if (isChecked) {
		localStorage.setItem('firstPlayer', 'X');
	} else {
		localStorage.setItem('firstPlayer', 'O');
	}
	firstPlayer = localStorage.firstPlayer;
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
