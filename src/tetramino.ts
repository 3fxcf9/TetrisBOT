const all_tetraminos = require("./tetraminos.json");

/**
 * Represents a tetramino (position, rotation).
 */
export class Tetramino {
	x: number;
	y: number;
	type: string;
	rotations: number[][][];
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

	toString() {
		return `${this.color}Tetramino:${this.type}\u001b[0m`;
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
