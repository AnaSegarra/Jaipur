class Player {
	constructor(hand) {
		this.hand = hand;
		this.pickedCards = [];
		this.tokens = [];

		this.cards;

		this.activeSell = false;
		this.activeTake = false;
	}

	setBtnListeners() {
		let sellBtn = document.getElementById('sell-btn');
		let takeBtn = document.getElementById('take-btn');

		sellBtn.addEventListener('click', () => {
			sellBtn.classList.toggle('btn-clicked');
			sellBtn.classList.contains('btn-clicked')
				? ((takeBtn.style.pointerEvents = 'none'), (this.activeSell = true))
				: ((takeBtn.style.pointerEvents = 'auto'), (this.activeSell = false));
			this.sellCards();
		});

		takeBtn.addEventListener('click', () => {
			takeBtn.classList.toggle('btn-clicked');
			takeBtn.classList.contains('btn-clicked')
				? ((sellBtn.style.pointerEvents = 'none'), (this.activeTake = true))
				: ((sellBtn.style.pointerEvents = 'auto'), (this.activeTake = false));
			this.takeCards();
		});
	}

	setCardsListeners() {
		this.cards.forEach(card => {
			card.addEventListener('mouseenter', this.playerIsChoosing);
			card.addEventListener('mouseleave', this.playerIsChoosing);
			card.addEventListener('click', this.cardChosen);
		});
	}

	removeCardsListeners() {
		this.cards.forEach(card => {
			card.removeEventListener('mouseenter', this.playerIsChoosing);
			card.removeEventListener('mouseleave', this.playerIsChoosing);
			card.removeEventListener('click', this.cardChosen);
			card.classList.remove('card-chosen');
		});
	}

	playerIsChoosing(e) {
		e.target.classList.toggle('card-hover');
		// console.log(this);
	}

	cardChosen(e) {
		e.target.parentElement.classList.toggle('card-chosen');
	}

	sellCards() {
		if (this.activeSell) {
			this.cards = document.querySelectorAll('#player-hand > div');
			this.setCardsListeners();
		} else {
			this.removeCardsListeners();
		}
	}

	takeCards() {
		if (this.activeTake) {
			this.cards = document.querySelectorAll('#market > div');
			console.log(this.cards);
			this.setCardsListeners();
		} else {
			this.removeCardsListeners();
		}
	}
}
