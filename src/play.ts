import { Tetramino } from "./lib/tetramino";
import { Grid } from "./lib/grid";
import { TetraminoRandomizer } from "./lib/randomizer";
import { read } from "./utils/userInput";

const grid = new Grid();

const rdm = new TetraminoRandomizer();

let current = rdm.newTetramino();
let held = undefined;
let held_used = false;

let score = 0;
(async () => {
	// Show the empty grid
	grid.showGameFrame({ current, held, next: rdm.getNext(5), stats: { S: score } });

	do {
		const prompt = await read();
		switch (prompt) {
			case "q": // Anti-clockwise
				grid.rotateTetramino(current, -1);

				break;

			case "d": // Clockwise
				grid.rotateTetramino(current, 1);

				break;

			case "z": // 180 spin
				grid.rotateTetramino(current, 2);

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
				if (!grid.isPlacementValid(current)) current.up();
				break;

			case "i": // Hard drop
				grid.hardDropTetramino(current);
				current = rdm.newTetramino();
				held_used = false;
				break;

			case "s": // Hold
				if (held_used) continue;
				if (held) {
					[current, held] = [held, current];
				} else {
					held = current;
					current = rdm.newTetramino();
				}
				held.reset(); // Reset rotation and position
				held_used = true;
				break;

			case "a": // Quit
				process.exit(0);

			default:
				console.log("Move: q<>d, Rotate: j<>l, Soft drop: k, Hard drop: i, Quit: a");
				break;
		}

		// Commented for zero grav
		// if (grid.isTetraminoGrounded(current)) {
		// 	grid.placeTetramino(current);
		// 	current = rdm.newTetramino();
		// 	held_used = false;
		// }

		if (!grid.isPlacementValid(current)) {
			grid.showGameFrame();
			process.exit(0);
		}

		score += grid.delLines();

		grid.showGameFrame({ current, held, next: rdm.getNext(5), stats: { S: score } });
	} while (true);
})();
