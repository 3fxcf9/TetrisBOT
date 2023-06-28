import { Grid } from "./lib/grid";
import { Tetramino } from "./lib/tetramino";
import { TetraminoRandomizer } from "./lib/randomizer";
import { GameHistory } from "./utils/history";

// Get process args
import { getArgs } from "./utils/argv";

// Get keyboard input
import { read } from "./utils/userInput";

const grid = new Grid();
const rdm = new TetraminoRandomizer();
const history = new GameHistory();

// Keyboard controls
const controls = {
	left: "j",
	right: "l",

	soft_drop: "k",
	hard_drop: "i",

	clockwise: "d",
	spin_180: "z",
	anti_clockwise: "q",

	hold: "s",
	revert: "w",
	restart: "r",
};

const args = getArgs();
if (args.help) {
	console.log(`
\u001b[94m--controls=\u001b[0m\u001b[91mlayout\u001b[0m	Comma separated values of control keys
	\u001b[1mformat:\u001b[0m		\u001b[0m\u001b[91m${Object.keys(controls).join(",")}\u001b[0m
	\u001b[1mexample:\u001b[0m	\u001b[0m\u001b[91m${Object.values(controls).join(",")}\u001b[0m			(default)
	`);

	process.exit(0);
}
if (args.controls && typeof args.controls == "string") {
	const layout = args.controls.split(",");
	const controls_labels = Object.keys(controls) as [string & keyof typeof controls];

	layout.forEach((ctrl, i) => {
		controls[controls_labels[i]] = ctrl;
	});
}

// Init game
let current = rdm.newTetramino();
let held = undefined;
let held_used = false;
let score = 0;

// Game loop
(async () => {
	// Show the empty grid
	grid.showGameFrame({ current, held, next: rdm.getNext(5), stats: { S: score } });

	do {
		const prompt = await read();

		switch (prompt) {
			case controls.anti_clockwise:
				grid.rotateTetramino(current, -1);

				break;

			case controls.clockwise:
				grid.rotateTetramino(current, 1);

				break;

			case controls.spin_180:
				grid.rotateTetramino(current, 2);

				break;

			case controls.left:
				current.left();
				if (!grid.isPlacementValid(current)) current.right();

				break;

			case controls.right:
				current.right();
				if (!grid.isPlacementValid(current)) current.left();

				break;

			case controls.soft_drop:
				current.down();
				if (!grid.isPlacementValid(current)) current.up();
				break;

			case controls.hard_drop:
				history.addGridSnapshot(grid);
				grid.hardDropTetramino(current);
				history.addTetramino(current);

				current = rdm.newTetramino();

				held_used = false;
				history.saveTurn();

				break;

			case controls.hold:
				if (held_used) continue;

				if (held) {
					[current, held] = [held, current];
					history.holdUsed(1);
				} else {
					held = current;
					current = rdm.newTetramino();
					history.holdUsed(2);
				}
				held.reset(); // Reset rotation and position

				held_used = true;

				break;

			case controls.revert:
				const latest = history.latest();
				if (!latest?.tetramino) break;

				grid.clearTetramino(latest.tetramino);
				rdm.revert(current);

				current = latest.tetramino.reset();

				if (latest.hold_used == 1 && held) [current, held] = [held, current];
				else if (latest.hold_used == 2 && held) {
					const current_copy = current.copy();
					current = held;
					held = undefined;
					rdm.revert(current_copy);
				}

				// If lines cleared
				if (latest.grid_snapshot) {
					grid.grid = latest.grid_snapshot;
				}

				break;

			case controls.restart:
				grid.clear();
				rdm.reset();
				held = undefined;
				held_used = false;
				break;

			case "escape": // Quit
				process.exit(0);

			default:
				console.log(`
\u001b[94mMove:\u001b[0m q<>d, \u001b[94mRotate:\u001b[0m j<>l, \u001b[94mSoft drop:\u001b[0m k, \u001b[94mHard drop:\u001b[0m i, \u001b[94mBack:\u001b[0m w, \u001b[94mRestart:\u001b[0m r, \u001b[94mQuit:\u001b[0m escape
				`);
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
