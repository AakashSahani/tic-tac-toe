'use strict';
import { player1 } from './variables.js';
// console.log(player1, player2, ai);
console.log(player1);

const gameGrid = document.getElementById('gameGrid');

// Get All Tile Choices
const buttonOne = document.getElementById('gridElOne');
const buttonTwo = document.getElementById('gridElTwo');
const buttonThree = document.getElementById('gridElThree');
const buttonFour = document.getElementById('gridElFour');
const buttonFive = document.getElementById('gridElFive');
const buttonSix = document.getElementById('gridElSix');
const buttonSeven = document.getElementById('gridElSeven');
const buttonEight = document.getElementById('gridElEight');
const buttonNine = document.getElementById('gridElNine');

const xTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`;
const oTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`;

function twoPlayerMode() {
	let turn = tileChoice[0];
	gameGrid.addEventListener('click', (e) => {
		console.log(e.currentTarget);
		turn === 'X'
			? (e.currentTarget.innerHTML = xTileSVG)
			: (e.currentTarget.innerHTML = oTileSVG);
		e.currentTarget.disabled = true;
	});
}