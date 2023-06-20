import { Tetramino } from "./tetramino";
import { Grid } from "./grid";
import { read } from "./utils/userInput";

const grid = new Grid();

function rb1a7() {
	return 1 + Math.round(Math.random() * 6);
}

let current = new Tetramino({ type: rb1a7() });
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
				current = new Tetramino({ type: rb1a7() });
				break;

			case "s": // Hold
				break;

			case "a": // Quit
				process.exit(0);

			default:
				console.log("Move: q<>d, Rotate: j<>l, Soft drop: k, Hard drop: i, Quit: a");
				break;
		}

		if (grid.isTetraminoGrounded(current)) {
			grid.placeTetramino(current);
			current = new Tetramino({ type: rb1a7() });
		}
		if (!grid.isPlacementValid(current)) {
			grid.showGameFrame();
			process.exit(0);
		}

		grid.showGameFrame({ current });
	} while (true);
})();
