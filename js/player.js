class Player {
	constructor(activePlayer = false) {
		this.cardsToTake = [];
		this.cardsToSell = [];

		this.sellingGoods;

		this.activePlayer = activePlayer;

		this.score;
	}

	cardSell(playerTokens) {
		board.tokenExchange(this.sellingGoods, playerTokens);

		if (this.sellingGoods.length >= 3) {
			this.sellingGoods.length === 3
				? board.bonusRetrieval('threeCards', playerTokens)
				: sellingGoods.length === 4
					? board.bonusRetrieval('fourCards', playerTokens)
					: board.bonusRetrieval('fiveCards', playerTokens);
		}

		this.sellingGoods.forEach(card => {
			board.animate(card, board.discardPile);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				board.discardPile.appendChild(card);
			}, 1200);
		});
	}
}
