const cards = new Deck(gameCards);
const bonus = new Deck(bonusTokens);
const player = new Player();
const machine = new Player();

window.addEventListener('load', () => {
	cards.shuffle();
	for (let key in bonus.elements) {
		bonus.shuffle(bonus.elements[key]);
	}

	document.getElementById('start-btn').addEventListener('click', () => {
		player.hand = cards.dealCards();
		// console.log(hand);
		let playerHandDisplay = '';
		player.hand.forEach(card => {
			// console.log(card.name);
			playerHandDisplay += `<div class="card-container" data-card="${card.name}">
										<div class="card-frame" style="background-image: url('images/goodsCards/${card.img}')"></div>
								  </div>`;
		});

		machine.hand = cards.dealCards();
		let machineHandDisplay = '';
		machine.hand.forEach(card => {
			machineHandDisplay += `<div class="card-container" data-card="${card.name}">
										<div class="card-frame" style="background-image: url('images/card-back.png');">
										</div>
                    				</div>`;
		});

		let market = cards.dealCards();
		let marketDisplay = '';
		market.forEach(card => {
			marketDisplay += `<div class="card-container" data-card="${card.name}">
								<div class="card-frame" style="background-image: url('images/goodsCards/${card.img}');">
								</div>
							</div>`;
		});

		// let deckPile = cards.elements;
		// let deckPileDisplay = '';
		// deckPile.forEach(card => {
		// 	deckPileDisplay += `<div class="card-container" data-card="${card.name}">
		// 	<div class="card-frame" style="background-image: url('/images/card-back.png');">
		// 	</div>
		// </div>`;
		// });

		document.getElementById('player-hand').innerHTML = playerHandDisplay;
		document.getElementById('machine-hand').innerHTML = machineHandDisplay;
		document.getElementById('market').innerHTML = marketDisplay;

		// document.getElementById('deck').innerHTML = deckPileDisplay;

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
				displayBonus += `<img src="images/${bonus.img}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayBonus;
			});
		}
		document.getElementById('player-btns').innerHTML = `<button id="take-btn">Take</button>
		<button id="sell-btn">Sell</button>`;

		player.setBtnListeners();

		document.getElementById('game-board').style.display = 'flex';
		document.getElementById('home-page').style.display = 'none';
	});
});

// testing
// function showPage() {
// 	document.getElementById('home-page').style.display = 'flex';
// }
