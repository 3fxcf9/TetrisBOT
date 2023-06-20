import { Tetramino } from "./tetramino";

export class TetraminoRandomizer {
	next_pieces: number[];
	forward_count: number;
	constructor() {
		this.next_pieces = this.getBatch();
		this.forward_count = 5;
	}

	getBatch() {
		let a = [1, 2, 3, 4, 5, 6, 7];
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

	newTetramino() {
		// Get the new piece
		const t = new Tetramino({ type: this.next_pieces[0] });
		this.next_pieces.shift();

		// Generate a new tetramino
		if (this.next_pieces.length <= this.forward_count) {
			this.next_pieces = this.next_pieces.concat(this.getBatch());
		}

		return t;
	}

	get next() {
		return new Tetramino({ type: this.next_pieces[0] });
	}
}
