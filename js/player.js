class Player {
	constructor() {
		this.pickedCards = [];
		this.eligibleCards;

		this.activeSell = false;
		this.activeTake = false;

		this.cardsToTake = [];
		this.cardsToSell = [];

		this.activePlayer = true;

		this.score;
	}
	prepareExchange() {
		this.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) {
				if (card.parentNode.id === 'player-hand') {
					this.cardsToSell.push(card);
				} else {
					this.cardsToTake.push(card);
				}
			}
		});
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
		e.target.classList.contains('card-frame')
			? e.target.parentElement.classList.toggle('card-hover')
			: e.target.classList.toggle('card-hover');
	}

	cardChosen(e) {
		if (
			!e.target.parentElement.classList.contains('card-chosen') &&
			!e.target.classList.contains('card-chosen') &&
			player.isValidChoice(e.target.getAttribute('data-card'), e.target)
		) {
			e.target.classList.contains('card-frame')
				? e.target.parentElement.classList.add('card-chosen')
				: e.target.classList.add('card-chosen');
		} else {
			if (
				(e.target.classList.contains('card-frame') &&
					e.target.parentElement.classList.contains('card-chosen')) ||
				e.target.classList.contains('card-chosen')
			) {
				e.target.parentElement.classList.remove('card-chosen');
				e.target.classList.remove('card-chosen');
				player.pickedCards.pop();
			}
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
			this.setCardsListeners();
		} else {
			this.removeCardsListeners();
		}
	}

	isValidChoice(cardType, card) {
		if (this.pickedCards.length === 0 || this.activeTake) {
			card.classList.contains('card-container')
				? this.pickedCards.push(card.children[0])
				: this.pickedCards.push(card);
			return true;
		}

		if (this.activeSell && this.pickedCards.length > 0) {
			let chosenGood = this.pickedCards[0].getAttribute('data-card');
			if (cardType === chosenGood) {
				card.classList.contains('card-container')
					? this.pickedCards.push(card.children[0])
					: this.pickedCards.push(card);
				return true;
			} else {
				return false;
			}
		}
	}

	cardSell() {
		let cards = [];

		this.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) cards.push(card);
		});

		board.tokenExchange(this.pickedCards, board.playerTokens);

		if (cards.length >= 3) {
			cards.length === 3
				? board.bonusRetrieval('threeCards', board.playerTokens)
				: cards.length === 4
					? board.bonusRetrieval('fourCards', board.playerTokens)
					: board.bonusRetrieval('fiveCards', board.playerTokens);
		}

		cards.forEach(card => {
			board.animate(card, board.discardPile);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				board.discardPile.appendChild(card);
				card.classList.remove('card-chosen');
			}, 1500);

			this.pickedCards = [];
		});

		this.removeCardsListeners();
	}

	cardExchange() {
		let tempArr = this.cardsToSell;
		this.cardsToSell = this.cardsToTake;
		this.cardsToTake = tempArr;

		this.cardsToSell.forEach(card => {
			board.animate(card, board.playerHand);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				board.playerHand.appendChild(card);
				card.classList.remove('card-chosen');
			}, 1500);

			this.removeCardsListeners();
		});

		this.cardsToTake.forEach(card => {
			board.animate(card, board.market);

			setTimeout(() => {
				card.style.transform = '';
				card.classList.remove('animate');

				board.market.appendChild(card);
				card.classList.remove('card-chosen');
			}, 1500);

			this.removeCardsListeners();
		});

		this.pickedCards = [];
		this.cardsToSell = [];
		this.cardsToTake = [];
	}

	cardTake() {
		let chosenCard;
		this.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen') && card.parentNode.id === 'market') chosenCard = card;
		});

		if (board.playerHand.children.length + 1 <= 7 && chosenCard) {
			board.animate(chosenCard, board.playerHand);
			board.animateDraw();
			chosenCard.classList.remove('card-chosen');

			setTimeout(() => {
				board.playerHand.appendChild(chosenCard);

				chosenCard.style.transform = '';
				board.market.lastElementChild.transform = '';

				chosenCard.classList.remove('animate');
				board.market.removeChild(board.market.lastElementChild);

				let cardType = board.deckPile.lastElementChild.getAttribute('data-card');
				board.deckPile.lastElementChild.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
				board.deckPile.lastElementChild.classList.replace('back', 'card-container');
				board.deckPile.lastElementChild.firstElementChild.setAttribute('data-card', cardType);

				board.market.appendChild(board.deckPile.lastChild);
			}, 1500);
			this.removeCardsListeners();
			this.pickedCards = [];
		}
	}

	validateSell() {
		this.pickedCards = this.pickedCards.filter(card => !card.classList.contains('card-container'));
		if (this.pickedCards.length === 0) return false;

		if (
			(this.pickedCards[0].getAttribute('data-card') === 'diamonds' ||
				this.pickedCards[0].getAttribute('data-card') === 'gold' ||
				this.pickedCards[0].getAttribute('data-card') === 'silver') &&
			this.pickedCards.length < 2
		) {
			return false;
		} else {
			return true;
		}
	}
}
