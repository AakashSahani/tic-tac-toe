const gameGrid = document.getElementById('gameGrid');

const xTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`;
const oTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`;

const resultModal = document.getElementById('result');

const wins = document.getElementById('wins');
const ties = document.getElementById('ties');
const loss = document.getElementById('loss');

const result_card = document.getElementById('result_card');

let turn = 'X';

// Receiving the data:
localStorage.getItem('variableName');

let player1 = localStorage.getItem('player1');

let player2 = localStorage.player2;
let cpu = localStorage.cpu;
let winNum = parseInt(localStorage.wins);
let tiesNum = parseInt(localStorage.ties);
let lossNum = parseInt(localStorage.loss);

const buttonCollections = document.getElementById('gameCol').children;

let currentBoardStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let openPositions = currentBoardStatus;

gameGrid.addEventListener('click', (e) => {
	if (openPositions.length != 0) {
		if (e.target.nodeName === 'BUTTON') {
			handleUserClick(e, player1);
			cpu != '' && handleCpuClick();
			console.log('From click event: ', currentBoardStatus);
		}
	}
	openPositions.length === 0 && console.log("It's a tie");
	console.log('Open positions', openPositions);
});

function handleUserClick(e, player) {
	if (e.target.disabled != true) {
		e.target.innerHTML = player === 'X' ? xTileSVG : oTileSVG;

		currentBoardStatus[parseInt(e.target.value)] = player;

		if (checkWinner(currentBoardStatus, player)) {
			result_card.innerHTML = `Player 1 wins`;
			resultModal.classList.remove('hidden');
			winNum += 1;
			wins.innerHTML = winNum;
			localStorage.setItem('wins', winNum.toString);
		}
		e.target.disabled = true;
	}
	openPositions = currentBoardStatus.filter((tile) => typeof tile === 'number');
}

function handleCpuClick() {
	const randomTile =
		openPositions[Math.floor(Math.random() * openPositions.length)];

	if (buttonCollections[randomTile].firstElementChild.disabled != true) {
		buttonCollections[randomTile].firstElementChild.innerHTML =
			cpu === 'X' ? xTileSVG : oTileSVG;
		currentBoardStatus[buttonCollections[randomTile].firstElementChild.value] =
			cpu;

		if (checkWinner(currentBoardStatus, cpu)) {
			result_card.innerHTML = `CPU wins`;
			resultModal.classList.remove('hidden');
			lossNum += 1;
			wins.innerHTML = lossNum;
			localStorage.setItem('loss', lossNum.toString);
		}

		buttonCollections[randomTile].firstElementChild.disabled = true;
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
