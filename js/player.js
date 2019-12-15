class Player {
	constructor() {
		this.pickedCards = [];
		// this.tokens = [];

		this.eligibleCards;

		this.activeSell = false;
		this.activeTake = false;

		this.activePlayer = true;

		this.score;
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
		this.eligibleCards.forEach(card => {
			card.addEventListener('mouseenter', this.playerIsChoosing);
			card.addEventListener('mouseleave', this.playerIsChoosing);
			card.addEventListener('click', this.cardChosen);
		});
	}

	removeCardsListeners() {
		this.eligibleCards.forEach(card => {
			card.removeEventListener('mouseenter', this.playerIsChoosing);
			card.removeEventListener('mouseleave', this.playerIsChoosing);
			card.removeEventListener('click', this.cardChosen);
			card.classList.remove('card-chosen');
			this.pickedCards = [];
		});
	}

	playerIsChoosing(e) {
		// console.log(this);
		e.target.classList.contains('card-frame')
			? e.target.parentElement.classList.toggle('card-hover')
			: e.target.classList.toggle('card-hover');
	}

	cardChosen(e) {
		// console.log(e.target.getAttribute('data-card'));
		if (
			!e.target.parentElement.classList.contains('card-chosen') &&
			player.isValidChoice(e.target.getAttribute('data-card'), e.target)
		) {
			e.target.classList.contains('card-frame')
				? e.target.parentElement.classList.add('card-chosen')
				: e.target.classList.add('card-chosen');
			console.log('choosing', player.pickedCards);
		} else {
			if (e.target.classList.contains('card-frame') && e.target.parentElement.classList.contains('card-chosen')) {
				e.target.parentElement.classList.remove('card-chosen');
				e.target.classList.remove('card-chosen');
				player.pickedCards.pop();
			}

			// console.log('unchoosing already', player.pickedCards);
		}
	}

	sellCards() {
		if (this.activeSell) {
			this.eligibleCards = document.querySelectorAll('#player-hand > div');
			this.setCardsListeners();
		} else {
			this.removeCardsListeners();
		}
	}

	takeCards() {
		if (this.activeTake) {
			this.eligibleCards = [
				...document.querySelectorAll('#market > div'),
				...document.querySelectorAll('#player-hand > div')
			];
			// console.log(this.eligibleCards);
			this.setCardsListeners();
		} else {
			// console.log('removing listeners');
			this.removeCardsListeners();
		}
	}

	isValidChoice(cardType, card) {
		if (this.pickedCards.length === 0 || this.activeTake) {
			this.pickedCards.push(card);
			return true;
		} else if (this.activeSell && this.pickedCards.length > 0) {
			// console.log('you need to check the type of good');
			return this.pickedCards.every(card => card.getAttribute('data-card') === cardType)
				? this.pickedCards.push(card)
				: false;
		}
	}
}
