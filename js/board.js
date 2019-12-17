class Board {
	constructor() {
		this.domElements = {
			playerHand: document.getElementById('player-hand'),
			playerTokens: document.getElementById('player-tokens'),
			player: document.getElementById('player'),
			machineHand: document.getElementById('machine-hand'),
			machineTokens: document.getElementById('machine-tokens'),
			machine: document.getElementById('machine'),
			market: document.getElementById('market'),
			deckPile: document.getElementById('deck'),
			winMessage: document.getElementById('win-msg'),
			loseMessage: document.getElementById('lose-msg'),
			drawMessage: document.getElementById('draw-msg')
		};
	}
	displayCards(player, cards) {
		let display = '';
		let imgSrc, backClass;
		cards.forEach(card => {
			// console.log(card.name);
			// imgSrc = `goodsCards/${card.img}`; // testing
			// backClass = ''; // testing
			player !== this.domElements.machineHand && player !== this.domElements.deckPile
				? ((imgSrc = `goodsCards/${card.img}`), (backClass = ''))
				: ((imgSrc = `card-back.png`), (backClass = 'back'));
			display += `<div class="card-container ${backClass}" data-card="${card.name}">
										<div class="card-frame" data-card="${card.name}" style="background-image: url('images/${imgSrc}')"></div>
								  </div>`;
		});

		player.innerHTML = display;

		console.log(`displayHand method on board used for ${player.id}`);
	}

	tokenExchange(playerChoice, destination) {
		// console.log(playerChoice, player.pickedCards);
		let tokens = document.getElementById(playerChoice[0].getAttribute('data-card'));

		if (destination === this.domElements.playerTokens) {
			playerChoice = playerChoice.filter(card => !card.classList.contains('card-container'));
		}
		// console.log(playerChoice);
		for (let i = 0; i < playerChoice.length; i++) {
			if (tokens.children.length > 0) {
				tokens.lastElementChild.style.width = '2.5em';
				destination.appendChild(tokens.lastElementChild);
			}
			// else {
			// 	console.log('not enough tokens');
			// }
		}
		// console.log(tokens);
	}

	bonusRetrieval(bonusType, player) {
		let token = document.getElementById(bonusType);
		if (token.children.length > 0) {
			token.lastElementChild.style.width = '2.5em';
			player.appendChild(token.lastElementChild);
		}
	}

	calculateScore(player, tokens) {
		player.score = [ ...tokens.children ]
			.map(token => Number(token.getAttribute('data-value') || token.getAttribute('data-bonus')))
			.reduce((acc, cur) => acc + cur, 0);
	}

	cardSell() {
		let cards = [];

		let discardPile = document.getElementById('discard-pile');

		player.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) cards.push(card);
		});

		this.tokenExchange(player.pickedCards, this.domElements.playerTokens);

		if (cards.length >= 3) {
			cards.length === 3
				? this.bonusRetrieval('threeCards', this.domElements.playerTokens)
				: cards.length === 4
					? this.bonusRetrieval('fourCards', this.domElements.playerTokens)
					: this.bonusRetrieval('fiveCards', this.domElements.playerTokens);
		}

		cards.forEach(card => {
			console.log(card);
			discardPile.appendChild(card);
			card.classList.remove('card-chosen');
			// card.removeEventListener('mouseenter', player.playerIsChoosing);
			// card.removeEventListener('mouseleave', player.playerIsChoosing);
			// card.removeEventListener('click', player.cardChosen);
			player.pickedCards = [];
		});
		player.removeCardsListeners();
	}

	cardExchange() {
		// console.log(player.cardsToSell, player.cardsToTake);
		let tempArr = player.cardsToSell;
		player.cardsToSell = player.cardsToTake;
		player.cardsToTake = tempArr;

		let playerHand = document.getElementById('player-hand');
		let marketCardsDisplay = document.getElementById('market');

		player.cardsToSell.forEach(card => {
			playerHand.appendChild(card);
			card.classList.remove('card-chosen');
			// card.removeEventListener('mouseenter', player.playerIsChoosing);
			// card.removeEventListener('mouseleave', player.playerIsChoosing);
			// card.removeEventListener('click', player.cardChosen);
			player.removeCardsListeners();
		});

		player.cardsToTake.forEach(card => {
			marketCardsDisplay.appendChild(card);
			card.classList.remove('card-chosen');
			// card.removeEventListener('mouseenter', player.playerIsChoosing);
			// card.removeEventListener('mouseleave', player.playerIsChoosing);
			// card.removeEventListener('click', player.cardChosen);
			player.removeCardsListeners();
		});
		player.pickedCards = [];
		player.cardsToSell = [];
		player.cardsToTake = [];
		// }
		// else {
		// 	console.log('you need to choose more cards');
		// }
	}

	cardTake() {
		let chosenCard;
		let playerHand = document.getElementById('player-hand');
		let deckPile = document.getElementById('deck');
		let marketCards = document.getElementById('market');
		player.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen') && card.parentNode.id === 'market') chosenCard = card;
		});
		console.log(chosenCard);
		if (playerHand.children.length + 1 <= 7 && chosenCard) {
			// console.log('you can take cards');
			playerHand.appendChild(chosenCard);
			player.removeCardsListeners();
			chosenCard.classList.remove('card-chosen');
			player.pickedCards = [];

			let cardType = deckPile.lastElementChild.getAttribute('data-card');
			deckPile.lastElementChild.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;
			deckPile.lastElementChild.classList.replace('back', 'card-container');
			deckPile.lastElementChild.firstElementChild.setAttribute('data-card', cardType);
			marketCards.appendChild(deckPile.lastChild);
		}

		// else {
		// 	console.log('you have too many cards');
		// }
	}

	validateSell() {
		player.pickedCards = player.pickedCards.filter(card => !card.classList.contains('card-container'));
		if (player.pickedCards.length === 0) return false;

		if (
			(player.pickedCards[0].getAttribute('data-card') === 'diamonds' ||
				player.pickedCards[0].getAttribute('data-card') === 'gold' ||
				player.pickedCards[0].getAttribute('data-card') === 'silver') &&
			player.pickedCards.length < 2
		) {
			// console.log('you need more cards');
			return false;
		} else {
			// console.log('😄');
			return true;
		}
	}

	checkGameOver() {
		let empty = 0;
		for (let key in goodsTokens) {
			let tokenContainer = document.getElementById(key).children;
			if (tokenContainer.length === 0) {
				empty++;
			}
		}
		let deck = document.getElementById('deck').children.length;
		// console.log(deck, empty);
		return empty === 3 || deck === 0;
	}

	changeActivePlayer() {
		let playerBtns = document.getElementById('player-btns');
		if (player.activePlayer) {
			player.activePlayer = false;
			machine.activePlayer = true;
			playerBtns.style.visibility = 'hidden';

			this.domElements.machine.classList.add('active-player');
			this.domElements.player.classList.remove('active-player');
		} else {
			player.activePlayer = true;
			machine.activePlayer = false;

			playerBtns.style.visibility = 'visible';
			this.domElements.player.classList.add('active-player');
			this.domElements.machine.classList.remove('active-player');
		}
	}

	checkWinner() {
		this.calculateScore(player, this.domElements.playerTokens);
		this.calculateScore(machine, this.domElements.machineTokens);
		player.score > machine.score
			? (console.log('you won! 😸'), (this.domElements.winMessage.style.display = 'block'))
			: player.score < machine.score
				? (console.log('you lost 😿'), (this.domElements.loseMessage.style.display = 'block'))
				: (console.log('you tied 🙀'), (this.domElements.drawMessage.style.display = 'block'));
	}

	gamePlay() {
		[ ...document.getElementById('player-btns').children ].forEach(btn => {
			btn.classList.remove('btn-clicked');
			btn.style.pointerEvents = 'auto';
			player.activeSell = false;
			player.activeTake = false;
		});

		board.changeActivePlayer();

		if (board.checkGameOver()) {
			document.getElementById('game-board').classList.replace('game-played', 'game-stopped');
			document.getElementById('final-msg').style.display = 'flex';

			board.checkWinner();
		} else {
			setTimeout(() => {
				console.log(board.domElements.machineHand.children);
				machine.chooseAction(machine.actions);
				// document.getElementById('player-btns').style.display = 'initial';
				if (board.checkGameOver()) {
					document.getElementById('game-board').classList.replace('game-played', 'game-stopped');
					document.getElementById('final-msg').style.display = 'flex';

					board.checkWinner();
				} else {
					board.changeActivePlayer();
				}
			}, 5000);
			console.log('machine is playing');
		}
	}
}
