const gameGrid = document.getElementById('gameGrid');

const xTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`;
const oTileSVG = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`;

const resultModal = document.getElementById('result');

const wins = document.getElementById('wins ');
const ties = document.getElementById('ties ');
const loss = document.getElementById('loss ');

const result_card = document.getElementById('result_card');

let turn = 'X';

// Receiving the data:
localStorage.getItem('variableName');

let player1 = localStorage.getItem('player1');

let player2 =
	localStorage.getItem('player2') === ''
		? player1 === 'X'
			? 'O'
			: 'X'
		: localStorage.getItem('player2');

let cpu =
	localStorage.getItem('cpu') === ''
		? player1 === 'X'
			? 'O'
			: 'X'
		: localStorage.getItem('cpu');

let currentBoardStatus = [1, 2, 3, 4, 5, 6, 7, 8, 9];

gameGrid.addEventListener('click', (e) => {
	console.log('Player 1 ', player1, 'Player 2 ', player2, 'Cpu ', cpu);
	handleUserClick(e);
});

function handleUserClick(e) {
	if (e.target.nodeName === 'BUTTON') {
		if (turn === 'X') {
			e.target.innerHTML = xTileSVG;
			currentBoardStatus[parseInt(e.target.value) - 1] = turn;
			if (checkWinner(currentBoardStatus, turn)) {
				result_card.innerHTML = `Player 1 wins`;
				resultModal.classList.remove('hidden');
			}
			turn = 'O';
		} else {
			e.target.innerHTML = oTileSVG;
			currentBoardStatus[parseInt(e.target.value) - 1] = turn;
			if (checkWinner(currentBoardStatus, turn)) {
				result_card.innerHTML = `Player 2 wins`;
				resultModal.classList.remove('hidden');
			}
			turn = 'X';
		}
		e.target.disabled = true;
	}
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
