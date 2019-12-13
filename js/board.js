class Board {
	constructor() {}
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
		if (playerCards.length === marketCards.length) {
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
		// console.log(tokens);
		// console.log(tokens.lastChild);
		for (let i = 0; i < player.pickedCards.length; i++) {
			tokensPlayer.appendChild(tokens.lastChild);
		}
	}
}
