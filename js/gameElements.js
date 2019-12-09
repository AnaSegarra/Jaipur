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

const goodsTokens = {
	diamonds: [
		{ img: 'diamond-token5.png', points: 5 },
		{ img: 'diamond-token5.png', points: 5 },
		{ img: 'diamond-token5.png', points: 5 },
		{ img: 'diamond-token7.png', points: 7 },
		{ img: 'diamond-token7.png', points: 7 }
	],
	gold: [
		{ img: 'gold-token5.png', points: 5 },
		{ img: 'gold-token5.png', points: 5 },
		{ img: 'gold-token5.png', points: 5 },
		{ img: 'gold-token6.png', points: 6 },
		{ img: 'gold-token6.png', points: 6 }
	],
	silver: [
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 },
		{ img: 'silver-token.png', points: 5 }
	],
	cloth: [
		{ img: 'cloth-token1.png', points: 1 },
		{ img: 'cloth-token1.png', points: 1 },
		{ img: 'cloth-token2.png', points: 2 },
		{ img: 'cloth-token2.png', points: 2 },
		{ img: 'cloth-token3.png', points: 3 },
		{ img: 'cloth-token3.png', points: 3 },
		{ img: 'cloth-token5.png', points: 5 }
	],
	spice: [
		{ img: 'spice-token1.png', points: 1 },
		{ img: 'spice-token1.png', points: 1 },
		{ img: 'spice-token2.png', points: 2 },
		{ img: 'spice-token2.png', points: 2 },
		{ img: 'spice-token3.png', points: 3 },
		{ img: 'spice-token3.png', points: 3 },
		{ img: 'spice-token5.png', points: 5 }
	],
	leather: [
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token1.png', points: 1 },
		{ img: 'leather-token2.png', points: 2 },
		{ img: 'leather-token3.png', points: 3 },
		{ img: 'leather-token4.png', points: 4 }
	]
};
const bonusTokens = {
	threeCards: [
		{ img: 'token-bonus3.png', points: 1 },
		{ img: 'token-bonus3.png', points: 1 },
		{ img: 'token-bonus3.png', points: 2 },
		{ img: 'token-bonus3.png', points: 2 },
		{ img: 'token-bonus3.png', points: 2 },
		{ img: 'token-bonus3.png', points: 3 },
		{ img: 'token-bonus3.png', points: 3 }
	],
	fourCards: [
		{ img: 'token-bonus4.png', points: 4 },
		{ img: 'token-bonus4.png', points: 4 },
		{ img: 'token-bonus4.png', points: 5 },
		{ img: 'token-bonus4.png', points: 5 },
		{ img: 'token-bonus4.png', points: 6 },
		{ img: 'token-bonus4.png', points: 6 }
	],
	fiveCards: [
		{ img: 'token-bonus5.png', points: 8 },
		{ img: 'token-bonus5.png', points: 8 },
		{ img: 'token-bonus5.png', points: 9 },
		{ img: 'token-bonus5.png', points: 10 },
		{ img: 'token-bonus5.png', points: 10 }
	]
};
