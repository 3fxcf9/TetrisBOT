const all_tetraminos = require("./tetraminos.json");

/**
 * Matrix Iterator
 * @param matrix A 2D matrix to iterate on
 * @yields An array [value, row, col]
 */
function* matrixIterator(matrix: Array<Array<any>>): Generator<Array<any>> {
	for (let _row = 0; _row < matrix.length; _row++) {
		for (let _col = 0; _col < matrix[_row].length; _col++) {
			yield [matrix[_row][_col], _row, _col];
		}
	}
}

class Tetramino {
	x: number;
	y: number;
	type: string;
	rotations: any;
	current_rotation: number;
	color: string;
	projected_color: string;

	constructor({ x = 0, y = 0, rotation = 0, type = "L" } = {}) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.current_rotation = rotation;

		let tetramino_data = all_tetraminos[this.type];
		this.rotations = tetramino_data.rotations;
		this.color = tetramino_data.color;
		this.projected_color = tetramino_data.projected_color;
	}

	get matrix() {
		return this.rotations[this.current_rotation] as number[][];
	}

	setRotation(r: number) {
		this.current_rotation = r;
	}

	rotate(dir: -1 | 1) {
		this.current_rotation = (this.current_rotation + dir + 4) % 4; // TODO: Better rotation system
	}

	left() {
		this.x -= 1;
		return this;
	}
	right() {
		this.x += 1;
		return this;
	}
	down() {
		this.y += 1;
		return this;
	}
}
