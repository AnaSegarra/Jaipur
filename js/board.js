class Board {
	constructor() {}
	cardExchange(destination) {
		let cards = [];

		player.eligibleCards.forEach(card => {
			if (card.classList.contains('card-chosen')) cards.push(card);
		});

		cards.forEach(card => {
			destination.appendChild(card);
			card.classList.remove('card-chosen');
			card.removeEventListener('mouseenter', player.playerIsChoosing);
			card.removeEventListener('mouseleave', player.playerIsChoosing);
			card.removeEventListener('click', player.cardChosen);
			player.pickedCards = [];
		});
	}

	cardTake() {
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
				card.removeEventListener('mouseenter', player.playerIsChoosing);
				card.removeEventListener('mouseleave', player.playerIsChoosing);
				card.removeEventListener('click', player.cardChosen);
				player.pickedCards = [];
			});

			marketCards.forEach(card => {
				marketCardsDisplay.appendChild(card);
				card.classList.remove('card-chosen');
				card.removeEventListener('mouseenter', player.playerIsChoosing);
				card.removeEventListener('mouseleave', player.playerIsChoosing);
				card.removeEventListener('click', player.cardChosen);
				player.pickedCards = [];
			});
		}
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
		for (let i = 0; i < player.pickedCards.length; i++) {
			tokensPlayer.appendChild(tokens.lastChild);
		}
	}
}
