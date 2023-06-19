import { allTetraminoSRS } from "./data/srs";
import type { TetraminoSRS } from "./data/srs";

import { tetraminoColors } from "./data/colors";
import type { TetraminoColor } from "./data/colors";

/**
 * Represents a tetramino (position, rotation).
 */
export class Tetramino {
	x: number;
	y: number;
	type: number;
	srs: TetraminoSRS;
	current_rotation: number;
	colors: TetraminoColor;
	pixel_on_rendering: string;
	pixel_off_rendering: string;

	constructor({ x = 0, y = 0, rotation = 0, type = 5 } = {}) {
		this.x = x;
		this.y = y;
		this.type = type;

		this.current_rotation = rotation;
		this.srs = allTetraminoSRS[type];

		this.colors = tetraminoColors[this.type];
		this.pixel_on_rendering = `${this.colors.piece}  \u001b[0m`;
		this.pixel_off_rendering = `  `;
	}

	get matrix() {
		return this.srs.rotations[this.current_rotation] as number[][];
	}

	toString(): string {
		return this.matrix.map((row) => row.map((s) => (s ? this.pixel_on_rendering : this.pixel_off_rendering)).join("")).join("\n");
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
