const cards = new Deck(gameCards);
const bonus = new Deck(bonusTokens);

window.addEventListener('load', () => {
	cards.shuffle();
	for (let key in bonus.elements) {
		bonus.shuffle(bonus.elements[key]);
	}

	document.getElementById('start-btn').addEventListener('click', () => {
		let playerHand = cards.dealCards();
		// console.log(hand);
		let playerHandDisplay = '';
		playerHand.forEach(card => {
			// console.log(card.name);
			playerHandDisplay += `<div class="card-container">
		                    <div class="card-frame" style="background-image:url('images/goodsCards/${card.img}')"></div>
		                </div>`;
		});

		for (let key in goodsTokens) {
			// console.log(key);
			let displayTokens = '';
			goodsTokens[key].forEach(token => {
				// console.log(token.img, key);
				displayTokens += `<img src="images/goodsTokens/${token.img}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayTokens;
			});
		}

		for (let key in bonus.elements) {
			let displayBonus = '';
			// console.log(bonus.elements[key]);
			bonus.elements[key].forEach(bonus => {
				// console.log(key);
				// console.log(bonus);
				displayBonus += `<img src="/images/${bonus.img}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayBonus;
			});
		}

		document.getElementById('player-hand').innerHTML = playerHandDisplay;

		document.getElementById('home-page').style.display = 'none';
	});
});

// testing
/* function showPage() {
	document.getElementById('home-page').style.display = 'flex';
} */
