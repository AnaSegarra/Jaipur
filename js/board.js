class Board {
	constructor() {}
	cardExchange(destination) {
		let cards = [];

		player.cards.forEach(card => {
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

	tokenExchange(goodType, player) {}
}
