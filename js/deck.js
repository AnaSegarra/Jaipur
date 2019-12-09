class Deck {
	constructor(elements) {
		this.elements = elements;
	}

	shuffle(arr = this.elements) {
		for (let i = 0; i < arr.length; i++) {
			let j = Math.floor(Math.random() * i);
			let card = arr[i];
			arr[i] = arr[j];
			arr[j] = card;
		}
		return arr;
	}

	dealCards() {
		let tempArr = []; // player/machine hand of cards
		for (let i = 0; i < 5; i++) {
			tempArr.push(this.elements[i]);
		}
		this.elements = this.elements.filter((card, index) => {
			// console.log(card, tempArr[index], card === tempArr[index]);
			return card !== tempArr[index];
		});
		return tempArr;
		// let html = '';
		// this.cards.forEach(card => {
		// 	// console.log(card.name);
		// 	html += `<div class="card-container">
		//                     <div class="card-frame" style="background-image:url('images/${card.img}')"></div>
		//                 </div>`;
		// });

		// document.getElementById('game-board').innerHTML = html;
	}
}
