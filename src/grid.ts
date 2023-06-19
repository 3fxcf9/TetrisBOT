/**
 * Represents the tetris grid
 */
export class Grid {
	grid: number[][];

	/**
	 * Create a new Grid
	 */
	constructor() {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(10).fill(0));
	}
}
