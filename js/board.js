class Board {
	constructor() {
		this.domElements = {
			playerHand: document.getElementById('player-hand'),
			playerTokens: document.getElementById('player-tokens'),
			machineHand: document.getElementById('machine-hand'),
			machineTokens: document.getElementById('machine-tokens'),
			market: document.getElementById('market'),
			deckPile: document.getElementById('deck')
		};
	}
	displayCards(player, cards) {
		let display = '';
		let imgSrc, backClass;
		cards.forEach(card => {
			// console.log(card.name);
			imgSrc = `goodsCards/${card.img}`; // testing
			backClass = ''; // testing
			// player !== this.domElements.machineHand && player !== this.domElements.deckPile
			// 	? ((imgSrc = `goodsCards/${card.img}`), (backClass = ''))
			// 	: ((imgSrc = `card-back.png`), (backClass = 'back'));
			display += `<div class="card-container ${backClass}" data-card="${card.name}">
										<div class="card-frame" data-card="${card.name}" style="background-image: url('images/${imgSrc}')"></div>
								  </div>`;
		});

		player.innerHTML = display;

		console.log(`displayHand method on board used for ${player.id}`);
	}
	calculateScore(player, tokens) {
		player.score = [ ...tokens.children ]
			.map(token => Number(token.getAttribute('data-value')))
			.reduce((acc, cur) => acc + cur, 0);
	}

	cardSell() {
		let cards = [];

		let discardPile = document.getElementById('discard-pile');

		player.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) cards.push(card);
		});
		cards.forEach(card => {
			discardPile.appendChild(card);
			card.classList.remove('card-chosen');
			card.removeEventListener('mouseenter', player.playerIsChoosing);
			card.removeEventListener('mouseleave', player.playerIsChoosing);
			card.removeEventListener('click', player.cardChosen);
			player.pickedCards = [];
		});
	}

	cardExchange() {
		let playerCards = [];
		let marketCards = [];
		player.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) {
				if (card.parentNode.id === 'player-hand') {
					playerCards.push(card);
				} else {
					marketCards.push(card);
				}
			}
		});
		if (playerCards.length === marketCards.length && playerCards.length >= 2) {
			let tempArr = [ ...playerCards ];
			playerCards = [ ...marketCards ];
			marketCards = [ ...tempArr ];

			let playerHand = document.getElementById('player-hand');
			let marketCardsDisplay = document.getElementById('market');

			playerCards.forEach(card => {
				playerHand.appendChild(card);
				card.classList.remove('card-chosen');
				// card.removeEventListener('mouseenter', player.playerIsChoosing);
				// card.removeEventListener('mouseleave', player.playerIsChoosing);
				// card.removeEventListener('click', player.cardChosen);
				player.removeCardsListeners();
				player.pickedCards = [];
			});

			marketCards.forEach(card => {
				marketCardsDisplay.appendChild(card);
				card.classList.remove('card-chosen');
				// card.removeEventListener('mouseenter', player.playerIsChoosing);
				// card.removeEventListener('mouseleave', player.playerIsChoosing);
				// card.removeEventListener('click', player.cardChosen);
				player.removeCardsListeners();
				player.pickedCards = [];
			});
		}
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
		if (playerHand.children.length + 1 <= 7) {
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
		if (
			(player.pickedCards[0] === 'diamonds' ||
				player.pickedCards[0] === 'gold' ||
				player.pickedCards[0] === 'silver') &&
			player.pickedCards.length < 2
		) {
			// console.log('you need more cards');
			return false;
		} else {
			// console.log('😄');
			return true;
		}
	}

	tokenExchange() {
		let tokensPlayer = document.getElementById('player-tokens');
		// console.log(player.pickedCards);
		let tokens = document.getElementById(player.pickedCards[0]);
		for (let i = 0; i < player.pickedCards.length; i++) {
			if (tokens.children.length > 0) {
				tokensPlayer.appendChild(tokens.lastChild);
			}
			//else {
			// 	console.log('not enough tokens');
			// }
		}
		// console.log(tokensPlayer);
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
			playerBtns.style.display = 'none';
		} else {
			player.activePlayer = true;
			playerBtns.style.display = 'initial';
		}
	}

	checkWinner() {
		this.calculateScore(player, this.domElements.playerTokens);
		this.calculateScore(machine, this.domElements.machineTokens);
		player.score > machine.score
			? console.log('you won! 😸')
			: player.score < machine.score ? console.log('you lost 😿') : console.log('you tied 🙀');
	}
}
