let discardPile = document.getElementById('discard-pile');
let playerHand = document.getElementById('player-hand');
function cardExchange() {
	let cards = [];
	// console.log({ origin, destination });
	player.cards.forEach(card => {
		if (card.classList.contains('card-chosen')) cards.push(card);
	});
	let cardsArr = [ ...cards ];
	cardsArr.forEach(card => {
		discardPile.appendChild(card);
		card.classList.remove('card-chosen');
		card.removeEventListener('mouseenter', player.playerIsChoosing);
		card.removeEventListener('mouseleave', player.playerIsChoosing);
		card.removeEventListener('click', player.cardChosen);
		player.pickedCards = [];
	});
}
