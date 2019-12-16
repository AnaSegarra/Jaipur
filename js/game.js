const cards = new Deck(gameCards);
const bonus = new Deck(bonusTokens);
const player = new Player();
const machine = new Machine();
const board = new Board();

window.addEventListener('load', () => {
	cards.shuffle();
	for (let key in bonus.elements) {
		bonus.shuffle(bonus.elements[key]);
	}

	document.getElementById('start-btn').addEventListener('click', () => {
		document.getElementById('home-page').style.display = 'none';
		document.getElementById('game-board').classList.replace('game-stopped', 'game-played')

		board.displayCards(board.domElements.playerHand, cards.dealCards());
		board.displayCards(board.domElements.machineHand, cards.dealCards());
		board.displayCards(board.domElements.market, cards.dealCards());
		board.displayCards(board.domElements.deckPile, cards.elements);

		for (let key in goodsTokens) {
			// console.log(key);
			let displayTokens = '';
			goodsTokens[key].forEach(token => {
				// console.log(token.points, key);
				displayTokens += `<img src="images/goodsTokens/${token.img}" data-value="${token.points}" alt="">`;
				document.getElementById(`${key}`).innerHTML = displayTokens;
			});
		}

		for (let key in bonus.elements) {
			let displayBonus = '';
			// console.log(bonus.elements[key]);
			bonus.elements[key].forEach(bonus => {
				// console.log(key);
				// console.log(bonus);
				displayBonus += `<img src="images/${bonus.img}" alt="" data-bonus="${bonus.points}">`;
				document.getElementById(`${key}`).innerHTML = displayBonus;
			});
		}
		// document.getElementById('player-btns').innerHTML = `<button id="take-btn">Take</button>
		// <button id="sell-btn">Sell</button><button id="confirm-btn">Ok!</button>`;

		player.setBtnListeners();

		document.getElementById('confirm-btn').addEventListener('click', () => {
			if (player.activeSell && board.validateSell()) {
				// console.log('valid change');
				// board.tokenExchange();
				board.cardSell();
			}

			if (player.activeTake && player.pickedCards.length !== 0) {
				if (player.pickedCards.length > 1) {
					board.cardExchange();
				} else {
					board.cardTake();
				}
			}

			[ ...document.getElementById('player-btns').children ].forEach(btn => {
				btn.classList.remove('btn-clicked');
				btn.style.pointerEvents = 'auto';
				player.activeSell = false;
				player.activeTake = false;
			});

			board.changeActivePlayer();

			if (board.checkGameOver()) {
				document.getElementById('game-board').classList.replace('game-played', 'game-stopped')
				document.getElementById('final-msg').style.display = 'flex';

				board.checkWinner();
			} else {
				setTimeout(() => {
					machine.chooseAction(machine.actions);
					// document.getElementById('player-btns').style.display = 'initial';
					if (board.checkGameOver()) {
						document.getElementById('game-board').classList.replace('game-played', 'game-stopped')
						document.getElementById('final-msg').style.display = 'flex';

						board.checkWinner();
					} else {
						board.changeActivePlayer();
					}
				}, 5000);
				console.log('machine is playing');
			}
		});
	});
});

// testing
// function showPage() {
// 	document.getElementById('home-page').style.display = 'flex';
// }
