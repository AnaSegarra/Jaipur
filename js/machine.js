class Machine extends Player {
	constructor() {
		super();
		this.actions = [ 'takeCard', 'cardsExchange', 'sell' ];

		this.sellingGoods;

		this.cardsToTake;
		this.cardsToSell;

		this.activePlayer = false;
		this.score;
	}

	checkCards() {
		let cards = [ ...document.getElementById('machine-hand').children ];
		let diamonds = [];
		let gold = [];
		let silver = [];
		cards.forEach(card => {
			if (card.getAttribute('data-card') === 'gold') {
				gold.push(card);
			}
			if (card.getAttribute('data-card') === 'diamonds') {
				diamonds.push(card);
			}
			if (card.getAttribute('data-card') === 'silver') {
				silver.push(card);
			}
		});

		if (diamonds.length >= 2) {
			this.sellingGoods = diamonds;
		} else if (silver.length >= 2 || gold.length >= 2) {
			this.sellingGoods = gold.length >= silver.length ? gold : silver;
		} else {
			let filteredGoods = [ ...document.getElementById('machine-hand').children ].filter(card => {
				return (
					card.getAttribute('data-card') === 'cloth' ||
					card.getAttribute('data-card') === 'spice' ||
					card.getAttribute('data-card') === 'leather'
				);
			});

			let randomGood = filteredGoods[Math.floor(Math.random() * filteredGoods.length)];

			let chosenGood = filteredGoods.filter(card => {
				return card.getAttribute('data-card') === randomGood.getAttribute('data-card');
			});
			this.sellingGoods = chosenGood;
		}
	}

	cardSell(playerTokens) {
		this.sellingGoods.forEach(card => {
			let cardType = card.getAttribute('data-card');

			card.firstElementChild.style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
			card.classList.remove('back');
		});

		super.cardSell(playerTokens);

		this.sellingGoods = undefined;
	}

	takeCard() {
		let marketCards = [ ...board.market.children ];
		let randomGood;

		let bestGoods = marketCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'diamonds' ||
				card.getAttribute('data-card') === 'gold' ||
				card.getAttribute('data-card') === 'silver'
			);
		});
		if (board.machineHand.children.length + 1 <= 7) {
			if (bestGoods.length !== 0) {
				randomGood = bestGoods[Math.floor(Math.random() * bestGoods.length)];

				randomGood.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
				randomGood.classList.add('back');
				this.animateTaking(randomGood);
			} else {
				randomGood = marketCards[Math.floor(Math.random() * bestGoods.length)];

				randomGood.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
				randomGood.classList.add('back');
				this.animateTaking(randomGood);
			}
		}
	}

	animateTaking(card) {
		board.animate(card, board.machineHand);
		board.animateDraw();

		setTimeout(() => {
			board.machineHand.appendChild(card);

			card.style.transform = '';
			board.market.lastElementChild.transform = '';

			board.market.removeChild(board.market.lastElementChild);
			card.classList.remove('animate');

			if (board.deckPile.children.length > 0) {
				let cardType = board.deckPile.lastElementChild.getAttribute('data-card');
				board.deckPile.lastElementChild.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
				board.deckPile.lastElementChild.classList.remove('back');
				board.deckPile.lastElementChild.firstElementChild.setAttribute('data-card', cardType);

				board.deckPile.lastElementChild.style.visibility = 'visible';
				board.market.appendChild(board.deckPile.lastChild);
			}
		}, 1200);
	}

	cardsExchange() {
		if (this.cardsToSell.length === this.cardsToTake.length && this.cardsToSell.length >= 2) {
			let tempArr = this.cardsToSell;
			this.cardsToSell = this.cardsToTake;
			this.cardsToTake = tempArr;

			this.cardsToSell.forEach(card => {
				board.animate(card, board.machineHand);

				setTimeout(() => {
					card.style.transform = '';
					card.classList.remove('animate');

					// card.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
					// card.classList.add('back');

					board.machineHand.appendChild(card);
				}, 1200);
			});

			this.cardsToTake.forEach(card => {
				board.animate(card, board.market);

				setTimeout(() => {
					card.style.transform = '';
					card.classList.remove('animate');

					let cardType = card.getAttribute('data-card');
					card.firstElementChild.style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
					card.classList.remove('back');

					board.market.appendChild(card);
				}, 1200);
			});
		}
		this.cardsToTake = [];
		this.cardsToSell = [];
	}

	prepareExchange() {
		let marketCards = [ ...board.market.children ];
		let machineCards = [ ...board.machineHand.children ];

		this.cardsToTake = marketCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'diamonds' ||
				card.getAttribute('data-card') === 'gold' ||
				card.getAttribute('data-card') === 'silver'
			);
		});

		this.cardsToSell = machineCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'spice' ||
				card.getAttribute('data-card') === 'leather' ||
				card.getAttribute('data-card') === 'cloth'
			);
		});

		if (this.cardsToSell.length >= 2) {
			if (this.cardsToTake.length === 1) {
				marketCards[0] !== this.cardsToTake[0]
					? this.cardsToTake.push(marketCards[0])
					: this.cardsToTake.push(marketCards[1]);
			}

			let num;
			this.cardsToSell.length > this.cardsToTake.length
				? ((num = this.cardsToSell.length - this.cardsToTake.length), this.cardsToSell.splice(0, num))
				: ((num = this.cardsToTake.length - this.cardsToSell.length), this.cardsToTake.splice(0, num));
		}
	}

	chooseAction(choices) {
		let randomAction = choices[Math.floor(Math.random() * choices.length)];
		if (choices.length === 0) {
			return;
		}
		if (randomAction === 'sell') {
			this.checkCards();
			if (this.sellingGoods.length !== 0) {
				this.cardSell(board.machineTokens);
			} else {
				let tempArr = choices.filter(choice => choice !== 'sell');
				this.chooseAction(tempArr);
			}
		} else if (randomAction === 'cardsExchange') {
			this.prepareExchange();
			if (this.cardsToTake.length === this.cardsToSell.length && this.cardsToTake.length >= 2) {
				this.cardsExchange();
			} else {
				let tempArr = choices.filter(choice => choice !== 'cardsExchange');
				this.chooseAction(tempArr);
			}
		} else {
			if (document.getElementById('machine-hand').children.length + 1 <= 7) {
				this.takeCard();
			} else {
				let tempArr = choices.filter(choice => choice !== 'takeCard');
				this.chooseAction(tempArr);
			}
		}
	}
}
