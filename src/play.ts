import { Tetramino } from "./lib/tetramino";
import { Grid } from "./lib/grid";
import { TetraminoRandomizer } from "./lib/randomizer";
import { read } from "./utils/userInput";

const grid = new Grid();

const rdm = new TetraminoRandomizer();

let current = rdm.newTetramino();
let held = undefined;

let score = 0;
(async () => {
	do {
		const prompt = await read();
		switch (prompt) {
			case "q": // Anti-clockwise
				current.rotate(-1);
				if (!grid.isPlacementValid(current)) current.rotate(1);

				break;

			case "d": // Clockwise
				current.rotate(1);
				if (!grid.isPlacementValid(current)) current.rotate(-1);

				break;

			case "j": // Left
				current.left();
				if (!grid.isPlacementValid(current)) current.right();

				break;

			case "l": // Right
				current.right();
				if (!grid.isPlacementValid(current)) current.left();

				break;

			case "k": // Soft drop
				current.down();
				break;

			case "i": // Hard drop
				grid.hardDropTetramino(current);
				current = rdm.newTetramino();
				break;

			case "s": // Hold
				if (held) {
					[current, held] = [held, current];
				} else {
					held = current;
					current = rdm.newTetramino();
				}
				break;

			case "a": // Quit
				process.exit(0);

			default:
				console.log("Move: q<>d, Rotate: j<>l, Soft drop: k, Hard drop: i, Quit: a");
				break;
		}

		if (grid.isTetraminoGrounded(current)) {
			grid.placeTetramino(current);
			current = rdm.newTetramino();
		}
		if (!grid.isPlacementValid(current)) {
			grid.showGameFrame();
			process.exit(0);
		}

		score += grid.delLines();

		grid.showGameFrame({ current, held, next: rdm.next });
	} while (true);
})();
