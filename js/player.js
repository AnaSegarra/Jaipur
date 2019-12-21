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
				: this.sellingGoods.length === 4
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

	cardExchange(playerCards) {
		let tempArr = this.cardsToSell;
		this.cardsToSell = this.cardsToTake;
		this.cardsToTake = tempArr;

		this.cardsToSell.forEach(card => {
			board.animate(card, playerCards);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				if (playerCards === board.machineHand) {
					card.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
					card.classList.add('back');
				}

				playerCards.appendChild(card);
			}, 1200);
		});

		this.cardsToTake.forEach(card => {
			board.animate(card, board.market);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				if (playerCards === board.machineHand) {
					let cardType = card.getAttribute('data-card');
					card.firstElementChild.style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
					card.classList.remove('back');
				}

				board.market.appendChild(card);
			}, 1200);
		});

		this.cardsToSell = [];
		this.cardsToTake = [];
	}
}
