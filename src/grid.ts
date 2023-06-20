import { Tetramino } from "./tetramino";

import { allTetraminoSRS } from "./data/srs";
import { tetraminoColors } from "./data/colors";

import { surroundASCII } from "./utils/surroundASCII";
import { columnASCIILines } from "./utils/columnASCII";

/**
 * Represents the tetris grid
 */
export class Grid {
	grid: number[][];
	next: Tetramino | undefined;
	held: Tetramino | undefined;

	constructor({ next = undefined }: { next?: Tetramino | undefined } = {}) {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(10).fill(0));

		this.next = next;
	}

	toASCIILines(): string[] {
		const lines: string[] = [];

		for (const _row in this.grid) {
			let line = "";
			for (const _column in this.grid[_row]) {
				line += `${tetraminoColors[this.grid[_row][_column]].piece}  \u001b[0m`;
			}
			lines.push(line);
		}

		return lines;
	}

	toString() {
		return this.toASCIILines().join("\n");
	}

	showGameFrame() {
		const grid_lines = this.toASCIILines();
		const next_lines = this.next ? this.next.toASCIILines() : new Tetramino({ type: 0 }).toASCIILines();
		const held_lines = this.held ? this.held.toASCIILines() : new Tetramino({ type: 0 }).toASCIILines();

		const left_col = surroundASCII(held_lines).concat([
			"",
			"T:   N/A", // Playing time
			"S:   N/A", // Score
			"PPS: N/A", // Piece per sec
			"APS: N/A", // Attack per sec
			"MT:  N/A", // Mean move time
			"MDT: N/A", // Mean decision time
			"MAT: N/A", // Mean move action time
		]);

		const lines = columnASCIILines(left_col, surroundASCII(grid_lines), surroundASCII(next_lines));

		console.log(lines.join("\n"));
	}
}
