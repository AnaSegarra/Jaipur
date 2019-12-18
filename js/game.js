const player = new Player();
const machine = new Machine();
const board = new Board();

window.addEventListener('load', () => {
	board.shuffle(board.cards);
	for (let key in board.bonusTokens) {
		board.shuffle(bonusTokens[key]);
	}

	document.getElementById('start-btn').addEventListener('click', () => {
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
				board.gamePlay();
			}
			if (player.activeTake) {
				if (
					player.pickedCards.length === 1 &&
					player.pickedCards[0].parentElement.parentNode.id !== 'player-hand' &&
					board.playerHand.children.length < 7
				) {
					player.cardTake();
					board.gamePlay();
				}
				if (player.pickedCards.length >= 2) {
					player.prepareExchange();
					if (player.cardsToSell.length === player.cardsToTake.length && player.cardsToSell.length >= 2) {
						player.cardExchange();
						board.gamePlay();
					} else {
						player.cardsToSell = [];
						player.cardsToTake = [];
					}
				}
			}
		});
	});
});
