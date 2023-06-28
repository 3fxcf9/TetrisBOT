import { Tetramino } from "./tetramino";

export class TetraminoRandomizer {
	next_pieces: number[];
	forward_count: number;
	constructor() {
		this.next_pieces = this.getBatch();
		this.forward_count = 5;
	}

	reset() {
		this.next_pieces = this.getBatch();
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

	/**
	 * Get the next pieces to be generated
	 * @param n The number of next piece to return
	 * @returns An array with the n next pieces
	 */
	getNext(n: number = 5): Tetramino[] {
		return this.next_pieces.slice(0, n).map((p) => new Tetramino({ type: p }));
	}
}
