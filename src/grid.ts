import type { Tetramino } from "./tetramino";

import { tetraminoColors } from "./data/colors";
import type { TetraminoColor } from "./data/colors";

/**
 * Represents the tetris grid
 */
export class Grid {
	grid: number[][];
	next: Tetramino | undefined;
	held: Tetramino | undefined;

	constructor({ next = undefined } = {}) {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(10).fill(0));

		this.next = next;
	}

	gridToASCII() {
		const lines: string[] = [];

		for (const _row in this.grid) {
			let line = "";
			for (const _column in this.grid[_row]) {
				line += `${tetraminoColors[this.grid[_row][_column]].piece}  \u001b[0m`;
			}
			lines.push(line);
		}

		return lines.join("\n");
	}
}
