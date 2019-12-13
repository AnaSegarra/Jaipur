class Machine {
	constructor() {
		this.actions = [ 'sell', 'takeOne', 'exchange' ];
		this.sellingGoods;
		this.cards;
		// this.randomGood;
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
		let discardPile = document.getElementById('discard-pile');
		// console.log(this.cards);

		this.sellingGoods.forEach(card => {
			discardPile.appendChild(card);
		});
		this.tokenExchange();
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
}
