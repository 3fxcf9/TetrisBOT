import { Grid } from "./lib/grid";
import { TetraminoRandomizer } from "./lib/randomizer";

// Get process args
import { getArgs } from "./utils/argv";

// Get keyboard input
import { read } from "./utils/userInput";

const grid = new Grid();
const rdm = new TetraminoRandomizer();

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
	restart: "r",
};

const args = getArgs();
if (args.help) {
	console.log(`
--controls=layout	Comma separated values of control keys
	format:		left,right,down,hard-drop,clockwise,anticlock,180spin,hold,restart
	example:	j,l,k,i,d,z,s,q,r			(swap hold and anticlockwise)
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
				grid.hardDropTetramino(current);
				current = rdm.newTetramino();
				held_used = false;
				break;

			case controls.hold:
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

			case controls.restart:
				grid.clear();
				rdm.reset();
				held = undefined;
				held_used = false;
				break;

			case "escape": // Quit
				process.exit(0);

			default:
				console.log("Move: q<>d, Rotate: j<>l, Soft drop: k, Hard drop: i, Quit: esc");
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
