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
		this.discardPile = document.getElementById('discard-pile');
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
			// display += `<div class="card-container" data-card="${card.name}">
			// 							<div class="card-frame" data-card="${card.name}" style="background-image: url('images/goodsCards/${card.img}')"></div>
			// 					  </div>`;
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

		for (let i = 0; i < playerChoice.length; i++) {
			if (tokens.children.length > 0) {
				tokens.lastElementChild.style.width = '2.5em';
				tokens.lastElementChild.setAttribute('data-type', playerChoice[0].getAttribute('data-card'));
				destination.appendChild(tokens.lastElementChild);
			}
			if (destination.children.length === 10) {
				destination.lastElementChild.style.transform = `translateX(-${18}em)`;
			}
			if (destination.children.length > 10) {
				let transformProperty = destination.lastElementChild.previousSibling.style.transform;
				let transformValue = Number(transformProperty.match(/\d+/)[0]) + 2;
				destination.lastElementChild.style.transform = `translateX(-${transformValue}em)`;
			}
		}
	}

	bonusRetrieval(bonusType, player) {
		let token = document.getElementById(bonusType);
		if (token.children.length > 0) {
			token.lastElementChild.style.width = '2.5em';
			token.lastElementChild.setAttribute('data-type', 'bonus');
			player.appendChild(token.lastElementChild);
		}
		if (player.children.length === 10) {
			player.lastElementChild.style.transform = `translateX(-${18}em)`;
		}
		if (player.children.length > 10) {
			let transformProperty = player.lastElementChild.previousSibling.style.transform;
			let transformValue = Number(transformProperty.match(/\d+/)[0]) + 2;
			player.lastElementChild.style.transform = `translateX(-${transformValue}em)`;
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

		return empty === 3 || board.deckPile.children.length === 0;
	}

	changeActivePlayer() {
		let playerBtns = document.getElementById('player-btns');

		if (user.activePlayer) {
			user.activePlayer = false;
			machine.activePlayer = true;
			playerBtns.style.visibility = 'hidden';

			document.getElementById('machine').classList.add('active-player');
			document.getElementById('player').classList.remove('active-player');
		} else {
			user.activePlayer = true;
			machine.activePlayer = false;

			playerBtns.style.visibility = 'visible';
			document.getElementById('player').classList.add('active-player');
			document.getElementById('machine').classList.remove('active-player');
		}

		this.machineHand.children.length > 5 ||
		(this.machineHand.children.length === 5 && this.machineTokens.children.length > 0)
			? document.getElementById('machine').classList.add('full-hand')
			: document.getElementById('machine').classList.remove('full-hand');

		this.playerHand.children.length > 5 ||
		(this.playerHand.children.length === 5 && this.playerTokens.children.length > 0)
			? document.getElementById('player').classList.add('full-hand')
			: document.getElementById('player').classList.remove('full-hand');
	}

	checkWinner() {
		this.calculateScore(player, this.playerTokens);
		this.calculateScore(machine, this.machineTokens);

		this.displayScore([ ...this.playerTokens.children ], player);
		this.displayScore([ ...this.machineTokens.children ], machine);

		user.score > machine.score
			? ((document.getElementById('win-msg').style.display = 'block'),
				document.getElementById('total').children[1].classList.add('win-points'))
			: user.score < machine.score
				? ((document.getElementById('lose-msg').style.display = 'block'),
					document.getElementById('total').children[1].classList.add('lose-points'))
				: ((document.getElementById('draw-msg').style.display = 'block'),
					document.getElementById('total').children[1].classList.add('draw-points'));

		document.getElementById('game-board').classList.replace('game-played', 'game-stopped');
		document.getElementById('final-msg').style.display = 'block';
		document.querySelector('.table').style.display = 'flex';
		document.getElementById('help').style.display = 'none';
	}

	retrievePoints(type, tokens) {
		return tokens
			.filter(token => token.getAttribute('data-type') === type)
			.map(token => token.getAttribute('data-points'));
	}

	displayScore(tokens, player) {
		let types = [ 'diamonds', 'gold', 'silver', 'cloth', 'spice', 'leather', 'bonus' ];
		types.forEach(good => {
			let points = document.createElement('p');
			points.innerHTML =
				this.retrievePoints(good, tokens).length === 0 ? '0' : this.retrievePoints(good, tokens).join(' + ');
			document.getElementById(`${good}-row`).appendChild(points);
		});

		let finalScore = document.createElement('p');
		finalScore.innerHTML = player.score;

		document.getElementById('total').appendChild(finalScore);
	}

	gamePlay() {
		[ ...document.getElementById('player-btns').children ].forEach(btn => {
			btn.classList.remove('btn-clicked');
			btn.style.pointerEvents = 'auto';
			user.activeSell = false;
			user.activeTake = false;
		});

		this.changeActivePlayer();

		if (this.checkGameOver()) {
			this.checkWinner();
		} else {
			setTimeout(() => {
				machine.chooseAction(machine.actions);
				setTimeout(() => {
					this.checkGameOver() ? this.checkWinner() : this.changeActivePlayer();
				}, 1500);
			}, 3000);
		}
	}

	animate(card, destination) {
		let originCoords = card.getBoundingClientRect();
		let endCoords =
			destination.children.length === 0
				? destination.getBoundingClientRect()
				: destination.lastElementChild.getBoundingClientRect();

		let finalX = endCoords.x - originCoords.x + originCoords.width;
		let finalY = endCoords.y - originCoords.y;

		card.classList.add('animate');
		card.style.transform = `translate(${finalX}px, ${finalY}px)`;
	}

	createCard() {
		let originCoords = this.deckPile.lastElementChild.getBoundingClientRect();
		let newCard = this.deckPile.lastElementChild.cloneNode(true);
		let cardType = board.deckPile.lastElementChild.getAttribute('data-card');
		newCard.classList.replace('back', 'card-container');
		newCard.children[0].style.backgroundImage = `url(images/goodsCards/${cardType}.png)`;

		board.deckPile.lastElementChild.style.visibility = 'hidden';

		newCard.classList.add('card-draw');
		newCard.style.top = `${originCoords.y - 20}px`;
		newCard.style.left = `${originCoords.x - 20}px`;

		this.market.appendChild(newCard);
	}

	animateDraw() {
		this.createCard();
		let originCoords = this.market.lastElementChild.getBoundingClientRect();
		let endCoords = this.market.children[4].getBoundingClientRect();
		let finalX = endCoords.x - originCoords.x;
		let finalY = endCoords.y - originCoords.y;
		this.market.lastElementChild.classList.add('animate');
		this.market.lastElementChild.style.transform = `translate(${finalX}px, ${finalY}px)`;
	}
}
