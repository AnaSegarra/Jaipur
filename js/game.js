let deck = new Deck();
window.addEventListener('load', () => {
	document.getElementById('start-btn').addEventListener('click', () => {
		let html = '';
		deck.cards.forEach(card => {
			console.log(card.name);
			html += `<div class="card-container">
                            <div class="card-frame" style="background-image:url('../images/${card.img}')"></div>
                        </div>`;
		});

		document.getElementById('game-board').innerHTML = html;

		document.getElementById('home-page').style.display = 'none';
	});
});

// testing
/* function showPage() {
	document.getElementById('home-page').style.display = 'flex';
} */
