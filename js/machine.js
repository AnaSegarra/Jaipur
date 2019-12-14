class Machine {
	constructor() {
		this.actions = [ 'sell', 'takeCard', 'cardsExchange' ];

		this.sellingGoods;
		this.cards;
		// this.randomGood;

		this.activePlayer = false;
		this.score;
	}

	checkCards() {
		this.cards = [ ...document.getElementById('machine-hand').children ];
		// console.log(this.cards);
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
		// console.log({ diamonds, gold, silver });
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
			// console.log(filteredGoods);
			let randomGood = filteredGoods[Math.floor(Math.random() * filteredGoods.length)];
			// console.log('randomGood:', randomGood);
			let chosenGood = filteredGoods.filter(card => {
				return card.getAttribute('data-card') === randomGood.getAttribute('data-card');
			});
			this.sellingGoods = chosenGood;
			// console.log(this.sellingGoods, 'chosen:', chosenGood);
		}
	}

	sell() {
		this.checkCards();
		let discardPile = document.getElementById('discard-pile');
		// console.log(this.cards);

		this.sellingGoods.forEach(card => {
			discardPile.appendChild(card);
		});
		this.tokenExchange();
		this.sellingGoods = undefined;
	}

	tokenExchange() {
		let tokensMachine = document.getElementById('machine-tokens');
		// console.log(this.sellingGoods);
		let tokens = document.getElementById(this.sellingGoods[0].getAttribute('data-card'));
		// console.log(tokens.lastChild);
		for (let i = 0; i < this.sellingGoods.length; i++) {
			tokensMachine.appendChild(tokens.lastChild);
		}
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
				// console.log('taking one of the best');
				randomGood = bestGoods[Math.floor(Math.random() * bestGoods.length)];
				machineDisplay.appendChild(randomGood);
			} else {
				// console.log('choosing a random good');
				randomGood = marketCards[Math.floor(Math.random() * bestGoods.length)];
				// console.log(randomGood);
				machineDisplay.appendChild(randomGood);
			}
			let cardType = deckPile.lastElementChild.getAttribute('data-card');

			deckPile.lastElementChild.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
			deckPile.lastElementChild.classList.replace('back', 'card-container');
			deckPile.lastElementChild.firstElementChild.setAttribute('data-card', cardType);
			marketDisplay.appendChild(deckPile.lastChild);
		}
		// else {
		// 	console.log('too many cards');
		// }
	}

	cardsExchange() {
		let marketDisplay = document.getElementById('market');
		let machineDisplay = document.getElementById('machine-hand');
		let marketCards = [ ...marketDisplay.children ];
		let machineCards = [ ...machineDisplay.children ];

		let cardsToTake = marketCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'diamonds' ||
				card.getAttribute('data-card') === 'gold' ||
				card.getAttribute('data-card') === 'silver'
			);
		});

		let cardsToSell = machineCards.filter(card => {
			return (
				card.getAttribute('data-card') === 'spice' ||
				card.getAttribute('data-card') === 'leather' ||
				card.getAttribute('data-card') === 'cloth'
			);
		});
		// console.log({ cardsToSell, cardsToTake });
		if (cardsToSell.length >= 2) {
			if (cardsToSell.length > cardsToTake.length) {
				let num = cardsToSell.length - cardsToTake.length;
				cardsToSell.splice(0, num);
				// console.log(num);
			} else if (cardsToTake.length > cardsToSell.length) {
				let num = cardsToTake.length - cardsToSell.length;
				cardsToTake.splice(0, num);
				// console.log(num);
			}
		} //else {
		// 	console.log('not enough cards');
		// }
		// console.log('after splicing', cardsToSell, cardsToTake);

		if (cardsToSell.length === cardsToTake.length && cardsToSell.length >= 2) {
			let tempArr = cardsToSell;
			cardsToSell = cardsToTake;
			cardsToTake = tempArr;

			cardsToSell.forEach(card => {
				machineDisplay.appendChild(card);
			});

			cardsToTake.forEach(card => {
				marketDisplay.appendChild(card);
			});

			// console.log('exchanging cards');
		}
		// else {
		// 	console.log('change not possible');
		// }
	}

	chooseAction() {
		let randomAction = this.actions[Math.floor(Math.random() * this.actions.length)];
		console.log(randomAction);

		randomAction === 'sell'
			? this.sell()
			: randomAction === 'cardsExchange' ? this.cardsExchange() : this.takeCard();
	}

	calculateScore() {
		let tokens = [ ...document.getElementById('machine-tokens').children ];

		this.score = tokens.map(token => Number(token.getAttribute('data-value'))).reduce((acc, cur) => acc + cur, 0);
		// console.log(tokens);
	}
}
