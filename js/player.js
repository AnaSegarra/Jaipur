class Player {
	constructor(hand) {
		this.hand = hand;
		this.pickedCards = [];
		this.tokens = [];
		this.sellBtn;
		this.takeBtn;
		this.activeSell = false;
	}

	setListeners() {
		this.sellBtn = document.getElementById('sell-btn');
		this.takeBtn = document.getElementById('take-btn');
		this.sellBtn.addEventListener('click', () => {
			this.sellBtn.classList.toggle('btn-clicked');
			this.sellBtn.classList.contains('btn-clicked')
				? ((this.takeBtn.style.pointerEvents = 'none'), (this.activeSell = true))
				: ((this.takeBtn.style.pointerEvents = 'auto'), (this.activeSell = false));
			this.sellCards();
		});
		this.takeBtn.addEventListener('click', () => {
			this.takeBtn.classList.toggle('btn-clicked');
			this.takeBtn.classList.contains('btn-clicked')
				? (this.sellBtn.style.pointerEvents = 'none')
				: (this.sellBtn.style.pointerEvents = 'auto');
		});
	}

	playerIsChoosing(e) {
		e.target.classList.toggle('card-hover');
	}
	cardChosen(e) {
		e.target.parentElement.classList.toggle('card-chosen');
	}

	sellCards() {
		let cards = document.querySelectorAll('#player-hand > div');
		if (this.activeSell) {
			console.log('okay, you can sell');
			cards.forEach(card => {
				card.addEventListener('mouseenter', this.playerIsChoosing);
				card.addEventListener('mouseleave', this.playerIsChoosing);
				card.addEventListener('click', this.cardChosen);
			});
		} else {
			console.log('you cannot sell');
			cards.forEach(card => {
				card.removeEventListener('mouseenter', this.playerIsChoosing);
				card.removeEventListener('mouseleave', this.playerIsChoosing);
				card.removeEventListener('click', this.cardChosen);
				card.classList.remove('card-chosen');
			});
		}
	}
}
