class Machine {
	constructor() {
		this.actions = [ 'takeCard', 'cardsExchange', 'sell' ];

		this.sellingGoods;
		this.cards;

		this.cardsToTake;
		this.cardsToSell;

		this.activePlayer = false;
		this.score;
	}

	checkCards() {
		this.cards = [ ...document.getElementById('machine-hand').children ];
		let diamonds = [];
		let gold = [];
		let silver = [];
		this.cards.forEach(card => {
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

		if (diamonds.length >= 2 || gold.length >= 2 || silver.length >= 2) {
			if (silver.length > gold.length && silver.length > diamonds.length) {
				this.sellingGoods = silver;
			} else if (gold.length > silver.length && gold.length > diamonds.length) {
				this.sellingGoods = gold;
			} else {
				this.sellingGoods = diamonds;
			}
		} else {
			let filteredGoods = this.cards.filter(card => {
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

	sell() {
		let discardPile = document.getElementById('discard-pile');

		this.sellingGoods.forEach(card => {
			let cardType = card.getAttribute('data-card');

			card.firstElementChild.style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
			card.classList.remove('back');

			discardPile.appendChild(card);
		});

		board.tokenExchange(this.sellingGoods, board.machineTokens);

		if (this.sellingGoods.length >= 3) {
			this.sellingGoods.length === 3
				? board.bonusRetrieval('threeCards', board.machineTokens)
				: this.sellingGoods.length === 4
					? board.bonusRetrieval('fourCards', board.machineTokens)
					: board.bonusRetrieval('fiveCards', board.machineTokens);
		}

		this.sellingGoods = undefined;
	}

	takeCard() {
		let machineDisplay = document.getElementById('machine-hand');
		let marketDisplay = document.getElementById('market');
		let deckPile = document.getElementById('deck');

		let marketCards = [ ...marketDisplay.children ];
		let randomGood;

		let bestGoods = marketCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'diamonds' ||
				card.getAttribute('data-card') === 'gold' ||
				card.getAttribute('data-card') === 'silver'
			);
		});
		if (machineDisplay.children.length + 1 <= 7) {
			if (bestGoods.length !== 0) {
				randomGood = bestGoods[Math.floor(Math.random() * bestGoods.length)];

				randomGood.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
				randomGood.classList.add('back');
				machineDisplay.appendChild(randomGood);
			} else {
				randomGood = marketCards[Math.floor(Math.random() * bestGoods.length)];

				randomGood.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
				randomGood.classList.add('back');
				machineDisplay.appendChild(randomGood);
			}

			let cardType = deckPile.lastElementChild.getAttribute('data-card');

			deckPile.lastElementChild.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
			deckPile.lastElementChild.classList.remove('back');
			deckPile.lastElementChild.firstElementChild.setAttribute('data-card', cardType);
			marketDisplay.appendChild(deckPile.lastChild);
		}
	}

	cardsExchange() {
		let marketDisplay = document.getElementById('market');
		let machineDisplay = document.getElementById('machine-hand');

		if (this.cardsToSell.length === this.cardsToTake.length && this.cardsToSell.length >= 2) {
			let tempArr = this.cardsToSell;
			this.cardsToSell = this.cardsToTake;
			this.cardsToTake = tempArr;

			this.cardsToSell.forEach(card => {
				card.firstElementChild.style.backgroundImage = 'url(images/card-back.png)';
				card.classList.add('back');

				machineDisplay.appendChild(card);
			});

			this.cardsToTake.forEach(card => {
				let cardType = card.getAttribute('data-card');
				card.firstElementChild.style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
				card.classList.remove('back');

				marketDisplay.appendChild(card);
			});
		}

		this.cardsToTake = [];
		this.cardsToSell = [];
	}

	prepareExchange() {
		let marketDisplay = document.getElementById('market');
		let machineDisplay = document.getElementById('machine-hand');
		let marketCards = [ ...marketDisplay.children ];
		let machineCards = [ ...machineDisplay.children ];

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
				if (marketCards[0] !== this.cardsToTake[0]) {
					this.cardsToTake.push(marketCards[0]);
				} else {
					this.cardsToTake.push(marketCards[1]);
				}
			}
			if (this.cardsToSell.length > this.cardsToTake.length) {
				let num = this.cardsToSell.length - this.cardsToTake.length;
				this.cardsToSell.splice(0, num);
			} else {
				let num = this.cardsToTake.length - this.cardsToSell.length;
				this.cardsToTake.splice(0, num);
			}
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
				this.sell();
			} else {
				let tempArr = choices.filter(choice => choice !== 'sell');
				this.chooseAction(tempArr);
			}
		} else if (randomAction === 'cardsExchange') {
			this.prepareExchange();
			if (this.cardsToTake.length === this.cardsToSell.length && this.cardsToTake.length !== 0) {
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
