// Getting Game Grid Element
const gameGrid = document.getElementById('gameGrid');

// Tile Options
const xTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`;
const oTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`;

// Result Modal
const resultModal = document.getElementById('result');
const result_card = document.getElementById('result_card');

// Result State
const wins = document.getElementById('wins');
const ties = document.getElementById('ties');
const loss = document.getElementById('loss');

wins.innerHTML = localStorage.wins;
ties.innerHTML = localStorage.ties;
loss.innerHTML = localStorage.loss;

// Variables to store score
// let winNum = parseInt(localStorage.wins);
// let tiesNum = parseInt(localStorage.ties);
// let lossNum = parseInt(localStorage.loss);

let winNum = parseInt(localStorage.wins);
let tiesNum = parseInt(localStorage.ties);
let lossNum = parseInt(localStorage.loss);

// Get player choices
let player1 = localStorage.getItem('firstPlayer');

// Reset player2 if cpu is chosen
localStorage.cpu != '' && localStorage.setItem('secondPlayer', '');
let player2 = localStorage.secondPlayer;

// Reset cpu if player2 is chosen
player2 != '' && localStorage.setItem('cpu', '');
let cpu = localStorage.cpu;

// Tile collections for cpu
const buttonCollections = document.getElementById('gameCol').children;

// Array to store current status of the grid
let currentBoardStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Open positions that cpu can choose from
let openPositions = currentBoardStatus;

// If player choose 'O' than cpu goes first
if (player1 === 'O' && cpu === 'X') {
	handleCpuClick();
}

// handle tile choices
gameGrid.addEventListener('click', (e) => {
	gameGrid.style.pointerEvents = 'none';
	handleGame(e);
});

// Variable to track player turns
let turn = 0;

function handleGame(e) {
	if (openPositions.length != 0) {
		if (e.target.nodeName === 'BUTTON') {
			if (player2 != '' && cpu === '') {
				turn === 0 ? handleUserClick(e, player1) : handleUserClick(e, player2);
				if (turn === 0) {
					turn = 1;
				} else {
					turn = 0;
				}
			} else {
				handleUserClick(e, player1);
			}
			setTimeout(() => {
				cpu != '' && handleCpuClick();
				gameGrid.style.pointerEvents = 'all';
			}, 1000);
		}
		if (openPositions.length === 0) {
			setTimeout(() => {
				resultModal.classList.remove('hidden');
			}, 1000);
			tiesNum += 1;
			localStorage.ties = tiesNum.toString();
			ties.innerHTML = tiesNum;
			result_card.innerHTML = `It's a Tie`;
		}
	}
}

function handleUserClick(e, player) {
	if (e.target.disabled != true) {
		e.target.innerHTML = player === 'X' ? xTileSVG : oTileSVG;

		currentBoardStatus[parseInt(e.target.value)] = player;

		if (checkWinner(currentBoardStatus, player)) {
			result_card.innerHTML = `Player 1 wins`;
			setTimeout(() => {
				resultModal.classList.remove('hidden');
			}, 1000);
			winNum += 1;
			localStorage.wins = winNum.toString();
			wins.innerHTML = winNum;
		}
		e.target.disabled = true;
	}
	openPositions = currentBoardStatus.filter((tile) => typeof tile === 'number');
}

function handleCpuClick() {
	if (openPositions.length != 0) {
		const randomTile =
			openPositions[Math.floor(Math.random() * openPositions.length)];

		if (buttonCollections[randomTile].firstElementChild.disabled != true) {
			buttonCollections[randomTile].firstElementChild.innerHTML =
				cpu === 'X' ? xTileSVG : oTileSVG;
			currentBoardStatus[
				buttonCollections[randomTile].firstElementChild.value
			] = cpu;

			if (checkWinner(currentBoardStatus, cpu)) {
				result_card.innerHTML = `CPU wins`;
				setTimeout(() => {
					resultModal.classList.remove('hidden');
				}, 1000);
				lossNum += 1;
				localStorage.setItem('loss', lossNum.toString());
				loss.innerHTML = lossNum;
			}

			buttonCollections[randomTile].firstElementChild.disabled = true;
		}
	}
	openPositions = currentBoardStatus.filter((tile) => typeof tile === 'number');
}

function checkWinner(currentBoardStatus, turn) {
	if (
		(turn === currentBoardStatus[0] &&
			currentBoardStatus[0] === currentBoardStatus[1] &&
			currentBoardStatus[1] === currentBoardStatus[2]) ||
		(turn === currentBoardStatus[3] &&
			currentBoardStatus[3] === currentBoardStatus[4] &&
			currentBoardStatus[4] === currentBoardStatus[5]) ||
		(turn === currentBoardStatus[6] &&
			currentBoardStatus[6] === currentBoardStatus[7] &&
			currentBoardStatus[7] === currentBoardStatus[8]) ||
		(turn === currentBoardStatus[0] &&
			currentBoardStatus[0] === currentBoardStatus[3] &&
			currentBoardStatus[3] === currentBoardStatus[6]) ||
		(turn === currentBoardStatus[1] &&
			currentBoardStatus[1] === currentBoardStatus[4] &&
			currentBoardStatus[4] === currentBoardStatus[7]) ||
		(turn === currentBoardStatus[2] &&
			currentBoardStatus[2] === currentBoardStatus[5] &&
			currentBoardStatus[5] === currentBoardStatus[8]) ||
		(turn === currentBoardStatus[0] &&
			currentBoardStatus[0] === currentBoardStatus[4] &&
			currentBoardStatus[4] === currentBoardStatus[8]) ||
		(turn === currentBoardStatus[2] &&
			currentBoardStatus[2] === currentBoardStatus[4] &&
			currentBoardStatus[4] === currentBoardStatus[6])
	) {
		return true;
	} else {
		return false;
	}
}
