import { Tetramino } from "./tetramino";

import { allTetraminoSRS } from "./data/srs";
import { tetraminoColors } from "./data/colors";

import { matrixIterator } from "./utils/matrixIterator";
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

	/**
	 * Add tetramino to grid
	 * @param tetramino The piece to append
	 */
	placeTetramino(tetramino: Tetramino): void {
		for (let [value, _row, _col] of matrixIterator(tetramino.matrix)) {
			if (!value) continue;
			this.grid[_row + tetramino.y][_col + tetramino.x] = tetramino.type;
		}
	}

	/**
	 * Check if a tetramino is grounded
	 * @param tetramino The tetramino to check
	 * @returns If the tetramino is grounded
	 */
	isTetraminoGrounded(tetramino: Tetramino): boolean {
		return [...matrixIterator(tetramino.matrix)].some(([v, _row, _col]) => {
			if (!v) return false;

			return _row + tetramino.y >= this.grid.length - 1 || this.grid[_row + tetramino.y + 1][_col + tetramino.x] > 0;
		});
	}

	/**
	 * Check if a tetramino is too high
	 * @param tetramino The tetramino to check
	 * @returns If the tetramino is too high
	 */
	isTetraminoTooHigh(tetramino: Tetramino): boolean {
		return ![...matrixIterator(tetramino.matrix)].some(([v, _row]) => {
			if (!v) return false;
			return _row + tetramino.y >= 0;
		});
	}

	/**
	 * Hard-drop a tetramino in the grid
	 * @param tetramino The tetramino to hard-drop
	 */
	hardDropTetramino(tetramino: Tetramino): void {
		while (!this.isTetraminoGrounded(tetramino)) {
			tetramino.down();
		}
		if (this.isTetraminoTooHigh(tetramino)) {
			console.log("Game Over");
			process.exit(0);
		}
		this.placeTetramino(tetramino);
	}
}
