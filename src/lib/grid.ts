import { Tetramino } from "./tetramino";

import { allTetraminoSRS } from "../data/srs";
import { tetraminoColors } from "../data/colors";

import { matrixIterator } from "../utils/matrixIterator";
import { surroundASCII } from "../utils/surroundASCII";
import { columnASCIILines } from "../utils/columnASCII";

interface BoardStats {
	T?: string | number; // Playing time
	S?: string | number; // Score
	PPS?: string | number; // Piece per sec
	APS?: string | number; // Attack per sec
	MT?: string | number; // Mean move time
	MDT?: string | number; // Mean decision time
	MAT?: string | number; // Mean move action time
}

/**
 * Represents the tetris grid
 */
export class Grid {
	grid: number[][];

	constructor() {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(10).fill(0));
	}

	toASCIILines({ current }: { current?: Tetramino } = {}): string[] {
		const rendered_grid = structuredClone(this.grid);

		// Display current piece
		if (current) {
			for (let [value, _row, _col] of matrixIterator(current.matrix)) {
				if (value) rendered_grid[current.y + _row][current.x + _col] = current.type;
			}
		}

		// Display projected piece
		if (current) {
			const projected = this.projectHardDrop(current);
			for (let [value, _row, _col] of matrixIterator(projected.matrix)) {
				if (value) rendered_grid[projected.y + _row][projected.x + _col] = projected.type * 10;
			}
		}

		const lines: string[] = [];
		for (const _row in rendered_grid) {
			let line = "";
			for (const _column in rendered_grid[_row]) {
				const color =
					rendered_grid[_row][_column] % 10 == 0
						? tetraminoColors[rendered_grid[_row][_column] / 10].projected
						: tetraminoColors[rendered_grid[_row][_column]].piece;

				line += `${color}  \u001b[0m`;
			}
			lines.push(line);
		}

		return lines;
	}

	toString() {
		return this.toASCIILines().join("\n");
	}

	generateStatistics(stats: BoardStats): string[] {
		const slines: string[] = [];

		for (const sname in stats) {
			if (Object.prototype.hasOwnProperty.call(stats, sname)) {
				const sval = stats[sname as keyof typeof stats];
				slines.push(`\u001b[1m${sname}\u001b[0m: ${sval}`);
			}
		}
		return slines;
	}

	showGameFrame({ current, held, next, stats }: { current?: Tetramino; held?: Tetramino; next?: Tetramino; stats?: BoardStats } = {}) {
		const grid_lines = this.toASCIILines({ current });

		const next_lines = next ? next.toASCIILines() : new Tetramino({ type: 0 }).toASCIILines();
		const held_lines = held ? held.toASCIILines() : new Tetramino({ type: 0 }).toASCIILines();

		const left_col = surroundASCII(held_lines, { width: 4 * 2, height: 4 }).concat(stats ? this.generateStatistics(stats) : []);

		const lines = columnASCIILines(left_col, surroundASCII(grid_lines), surroundASCII(next_lines, { width: 4 * 2, height: 4 }));

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

	/**
	 * Returns the har-dropped copy of a tetramino
	 * @param tetramino The tetramino to project
	 */
	projectHardDrop(tetramino: Tetramino) {
		const projected_copy = Object.assign(Object.create(Object.getPrototypeOf(tetramino)), tetramino);
		while (!this.isTetraminoGrounded(projected_copy)) {
			projected_copy.down();
		}
		return projected_copy;
	}

	/**
	 * Check if a tetramino position is valid
	 * @param tetramino The piece to test
	 * @returns If the position is valid
	 */
	isPlacementValid(tetramino: Tetramino): boolean {
		for (let [value, _row, _col] of matrixIterator(tetramino.matrix)) {
			// Test only filled blocks of a pece
			if (!value) continue; // Skip iteration

			// Inside the grid (x axis)
			if (_col + tetramino.x < 0 || _col + tetramino.x > 9) return false;

			// Not too low
			if (_row + tetramino.y >= this.grid.length) {
				console.log("diquhdqiozuhdqz");
				return false;
			}

			// Only on empty squares
			if (this.grid[_row + tetramino.y][_col + tetramino.x] != 0) return false;
		}
		return true;
	}

	/**
	 * Deletes all completed lines in grid
	 * @returns The number of deleted lines
	 */
	delLines(): number {
		let del_lines = 0;
		for (let _row = 0; _row < this.grid.length; _row++) {
			if (this.grid[_row].every((x) => x > 0)) {
				this.grid.splice(_row, 1);
				this.grid.unshift(Array(10).fill(0));
				del_lines++;
			}
		}
		return del_lines;
	}
}
