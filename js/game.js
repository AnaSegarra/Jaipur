const gameCards = [
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'diamonds', img: 'diamonds.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'gold', img: 'gold.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'silver', img: 'silver.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'cloth', img: 'cloth.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'spice', img: 'spice.png' },
	{ name: 'leather', img: 'leather.png' },
	{ name: 'leather', img: 'leather.png' },
	{ name: 'leather', img: 'leather.png' },
	{ name: 'leather', img: 'leather.png' },
	{ name: 'leather', img: 'leather.png' },
	{ name: 'leather', img: 'leather.png' }
];
const gameTokens = {
	diamonds: [
		{ img: 'diamond-token7.png', points: 7 },
		{ img: 'diamond-token7.png', points: 7 },
		{ img: 'diamond-token5.png', points: 5 },
		{ img: 'diamond-token5.png', points: 5 },
		{ img: 'diamond-token5.png', points: 5 }
	],
	gold: [
		{ img: 'gold-token6.png', points: 6 },
		{ img: 'gold-token6.png', points: 6 },
		{ img: 'gold-token5.png', points: 5 },
		{ img: 'gold-token5.png', points: 5 },
		{ img: 'gold-token5.png', points: 5 }
	],
	silver: [
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 }
	],
	cloth: [
		{ img: 'cloth-token5.png', points: 5 },
		{ img: 'cloth-token3.png', points: 3 },
		{ img: 'cloth-token3.png', points: 3 },
		{ img: 'cloth-token2.png', points: 2 },
		{ img: 'cloth-token2.png', points: 2 },
		{ img: 'cloth-token1.png', points: 1 },
		{ img: 'cloth-token1.png', points: 1 }
	],
	spice: [
		{ img: 'spice-token5.png', points: 5 },
		{ img: 'spice-token3.png', points: 3 },
		{ img: 'spice-token3.png', points: 3 },
		{ img: 'spice-token2.png', points: 2 },
		{ img: 'spice-token2.png', points: 2 },
		{ img: 'spice-token1.png', points: 1 },
		{ img: 'spice-token1.png', points: 1 }
	]
};

const cards = new Deck(gameCards);
const tokens = new Deck(gameTokens);

window.addEventListener('load', () => {
	cards.shuffle();

	document.getElementById('start-btn').addEventListener('click', () => {
		// deck.dealCards();
		let hand = cards.dealCards();
		// console.log(deck.cards);
		// console.log(hand);
		let playerHand = '';
		hand.forEach(card => {
			// console.log(card.name);
			playerHand += `<div class="card-container">
		                    <div class="card-frame" style="background-image:url('images/goodsCards/${card.img}')"></div>
		                </div>`;
		});

		for (key in gameTokens) {
			let displayTokens = '';
			gameTokens[key].forEach(token => {
				// console.log(token.img, key);
				displayTokens += `<img src="images/goodsTokens/${token.img}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayTokens;
			});
		}

		document.getElementById('player-hand').innerHTML = playerHand;

		document.getElementById('home-page').style.display = 'none';
	});
});

// testing
/* function showPage() {
	document.getElementById('home-page').style.display = 'flex';
} */
