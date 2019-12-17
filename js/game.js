const cards = new Deck(gameCards);
const bonus = new Deck(bonusTokens);
const player = new Player();
const machine = new Machine();
const board = new Board();

window.addEventListener('load', () => {
	cards.shuffle();
	for (let key in bonus.elements) {
		bonus.shuffle(bonus.elements[key]);
	}

	document.getElementById('start-btn').addEventListener('click', () => {
		document.getElementById('home-page').style.display = 'none';
		document.getElementById('game-board').classList.replace('game-stopped', 'game-played');

		board.displayCards(board.domElements.playerHand, cards.dealCards());
		board.displayCards(board.domElements.machineHand, cards.dealCards());
		board.displayCards(board.domElements.market, cards.dealCards());
		board.displayCards(board.domElements.deckPile, cards.elements);

		for (let key in goodsTokens) {
			let displayTokens = '';
			goodsTokens[key].forEach(token => {
				displayTokens += `<img src="images/goodsTokens/${token.img}" data-value="${token.points}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayTokens;
			});
		}

		for (let key in bonus.elements) {
			let displayBonus = '';
			bonus.elements[key].forEach(bonus => {
				displayBonus += `<img src="images/${bonus.img}" alt="" data-bonus="${bonus.points}">`;
				document.getElementById(`${key}`).innerHTML = displayBonus;
			});
		}

		player.setBtnListeners();

		document.getElementById('confirm-btn').addEventListener('click', () => {
			if (player.activeSell && board.validateSell()) {
				board.cardSell();
				board.gamePlay();
			}
			if (player.activeTake) {
				if (
					player.pickedCards.length === 1 &&
					player.pickedCards[0].parentElement.parentNode.id !== 'player-hand'
				) {
					board.cardTake();
					board.gamePlay();
				}
				if (player.pickedCards.length >= 2) {
					player.prepareExchange();
					if (player.cardsToSell.length === player.cardsToTake.length && player.cardsToSell.length >= 2) {
						board.cardExchange();
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
