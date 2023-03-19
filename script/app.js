const playerChoice = document.getElementById('player');

playerChoice.addEventListener('input', (e) => {
	const isChecked = e.target.checked;
	if (isChecked) {
		console.log('checked');
	} else {
		console.log('unchecked');
	}
});
