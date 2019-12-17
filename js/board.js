class Board {
	constructor() {
		this.cards = gameCards;
		this.goodsTokens = goodsTokens;
		this.bonusTokens = bonusTokens;

		this.playerHand = document.getElementById('player-hand');
		this.playerTokens = document.getElementById('player-tokens');
		this.machineHand = document.getElementById('machine-hand');
		this.machineTokens = document.getElementById('machine-tokens');
		this.market = document.getElementById('market');
		this.deckPile = document.getElementById('deck');
	}

	shuffle(arr) {
		for (let i = 0; i < arr.length; i++) {
			let j = Math.floor(Math.random() * i);
			let card = arr[i];
			arr[i] = arr[j];
			arr[j] = card;
		}
		return arr;
	}

	dealCards() {
		let tempArr = [];
		for (let i = 0; i < 5; i++) {
			tempArr.push(this.cards[i]);
		}
		this.cards = this.cards.filter((card, index) => {
			return card !== tempArr[index];
		});
		return tempArr;
	}

	displayCards(player, cards) {
		let display = '';
		let imgSrc, backClass;
		cards.forEach(card => {
			player !== this.machineHand && player !== this.deckPile
				? ((imgSrc = `goodsCards/${card.img}`), (backClass = ''))
				: ((imgSrc = `card-back.png`), (backClass = 'back'));
			display += `<div class="card-container ${backClass}" data-card="${card.name}">
										<div class="card-frame" data-card="${card.name}" style="background-image: url('images/${imgSrc}')"></div>
								  </div>`;
		});

		player.innerHTML = display;
	}

	displayTokens(tokens) {
		let imgSrc;
		for (let key in tokens) {
			let display = '';
			tokens[key].forEach(token => {
				tokens === this.bonusTokens ? (imgSrc = `${token.img}`) : (imgSrc = `goodsTokens/${token.img}`);
				display += `<img src="images/${imgSrc}" data-points="${token.points}" alt="">`;
				document.getElementById(`${key}`).innerHTML = display;
			});
		}
	}

	tokenExchange(playerChoice, destination) {
		let tokens = document.getElementById(playerChoice[0].getAttribute('data-card'));

		if (destination === this.playerTokens) {
			playerChoice = playerChoice.filter(card => !card.classList.contains('card-container'));
		}

		for (let i = 0; i < playerChoice.length; i++) {
			if (tokens.children.length > 0) {
				tokens.lastElementChild.style.width = '2.5em';
				destination.appendChild(tokens.lastElementChild);
			}
		}
	}

	bonusRetrieval(bonusType, player) {
		let token = document.getElementById(bonusType);
		if (token.children.length > 0) {
			token.lastElementChild.style.width = '2.5em';
			player.appendChild(token.lastElementChild);
		}
	}

	calculateScore(player, tokens) {
		player.score = [ ...tokens.children ]
			.map(token => Number(token.getAttribute('data-points')))
			.reduce((acc, cur) => acc + cur, 0);
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

		return empty === 3 || deck === 0;
	}

	changeActivePlayer() {
		let playerBtns = document.getElementById('player-btns');
		if (player.activePlayer) {
			player.activePlayer = false;
			machine.activePlayer = true;
			playerBtns.style.visibility = 'hidden';

			document.getElementById('machine').classList.add('active-player');
			document.getElementById('player').classList.remove('active-player');
		} else {
			player.activePlayer = true;
			machine.activePlayer = false;

			playerBtns.style.visibility = 'visible';
			document.getElementById('player').classList.add('active-player');
			document.getElementById('machine').classList.remove('active-player');
		}
	}

	checkWinner() {
		this.calculateScore(player, this.playerTokens);
		this.calculateScore(machine, this.machineTokens);
		player.score > machine.score
			? (document.getElementById('win-msg').style.display = 'block')
			: player.score < machine.score
				? (document.getElementById('lose-msg').style.display = 'block')
				: (document.getElementById('draw-msg').style.display = 'block');
	}

	gamePlay() {
		[ ...document.getElementById('player-btns').children ].forEach(btn => {
			btn.classList.remove('btn-clicked');
			btn.style.pointerEvents = 'auto';
			player.activeSell = false;
			player.activeTake = false;
		});

		board.changeActivePlayer();

		if (board.checkGameOver()) {
			document.getElementById('game-board').classList.replace('game-played', 'game-stopped');
			document.getElementById('final-msg').style.display = 'flex';

			board.checkWinner();
		} else {
			setTimeout(() => {
				machine.chooseAction(machine.actions);
				if (board.checkGameOver()) {
					document.getElementById('game-board').classList.replace('game-played', 'game-stopped');
					document.getElementById('final-msg').style.display = 'flex';

					board.checkWinner();
				} else {
					board.changeActivePlayer();
				}
			}, 5000);
		}
	}
}
