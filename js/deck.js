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
		let tempArr = [];
		for (let i = 0; i < 5; i++) {
			tempArr.push(this.elements[i]);
		}
		this.elements = this.elements.filter((card, index) => {
			return card !== tempArr[index];
		});
		return tempArr;
	}
}
