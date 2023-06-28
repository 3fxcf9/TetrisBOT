import type { Grid } from "../lib/grid";
import type { Tetramino } from "../lib/tetramino";

interface HistoryItem {
	tetramino: Tetramino;
	hold_used: 0 | 1 | 2; // 1 = swap and 2 = hold was empty
	grid_snapshot?: number[][];
}

export class GameHistory {
	history: Array<HistoryItem>;
	delete_threshold: number;

	played_tetramino: Tetramino | undefined;
	hold_used: 0 | 1 | 2;
	grid_snapshot: number[][] | undefined;

	constructor() {
		this.history = [];
		this.delete_threshold = 50;

		this.played_tetramino = undefined;
		this.hold_used = 0;
		this.grid_snapshot = undefined;
	}

	addTetramino(tetramino: Tetramino) {
		this.played_tetramino = tetramino.copy();
	}

	addGridSnapshot(grid: Grid) {
		this.grid_snapshot = structuredClone(grid.grid);
	}

	holdUsed(n: 0 | 1 | 2) {
		this.hold_used = n;
	}

	saveTurn() {
		if (!this.played_tetramino) return;

		this.history.unshift({ tetramino: this.played_tetramino, hold_used: this.hold_used, grid_snapshot: this.grid_snapshot });

		if (this.history.length > this.delete_threshold) this.history.splice(this.delete_threshold);
		this.played_tetramino = undefined;
		this.hold_used = 0;

		console.log(this.history);
	}

	latest(): HistoryItem | null {
		const latest = this.history.shift();

		return latest || null;
	}
}
