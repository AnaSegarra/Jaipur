const player = new Player();
const machine = new Machine();
const board = new Board();

window.addEventListener('load', () => {
	let howToMsg = document.getElementById('how-to');

	board.shuffle(board.cards);
	for (let key in board.bonusTokens) {
		board.shuffle(bonusTokens[key]);
	}
	document.getElementById('help').addEventListener('click', () => {
		howToMsg.style.display = 'block';
		document.getElementById('help').style.display = 'none';
	});

	document.getElementById('cross').addEventListener('click', () => {
		document.getElementById('help').style.display = 'block';

		howToMsg.style.display = 'none';
		howToMsg.classList.add('show');
		howToMsg.classList.remove('first-showed');

		document.getElementsByClassName('heading')[0].innerHTML = '';
		document.getElementsByClassName('text')[0].innerHTML = '';
		document.getElementsByClassName('text')[1].innerHTML = '';
	});

	document.getElementById('start-btn').addEventListener('click', () => {
		document.getElementById('how-to').style.display = 'block';
		document.getElementById('home-page').style.display = 'none';
		document.getElementById('game-board').classList.replace('game-stopped', 'game-played');

		board.displayCards(board.playerHand, board.dealCards());
		board.displayCards(board.machineHand, board.dealCards());
		board.displayCards(board.market, board.dealCards());
		board.displayCards(board.deckPile, board.cards);

		board.displayTokens(board.goodsTokens);
		board.displayTokens(board.bonusTokens);

		player.setBtnListeners();

		document.getElementById('confirm-btn').addEventListener('click', () => {
			if (player.activeSell && player.validateSell()) {
				player.cardSell();
				setTimeout(() => {
					board.gamePlay();
				}, 1200);
			}
			if (player.activeTake) {
				if (
					player.pickedCards.length === 1 &&
					player.pickedCards[0].parentElement.parentNode.id !== 'player-hand' &&
					board.playerHand.children.length < 7
				) {
					player.cardTake();
					setTimeout(() => {
						board.gamePlay();
					}, 1200);
				}
				if (player.pickedCards.length >= 2) {
					player.prepareExchange();
					if (player.cardsToSell.length === player.cardsToTake.length && player.cardsToSell.length >= 2) {
						player.cardExchange();
						setTimeout(() => {
							board.gamePlay();
						}, 1200);
					} else {
						player.cardsToSell = [];
						player.cardsToTake = [];
					}
				}
			}
		});
	});
});
