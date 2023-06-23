import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./lib/tetramino";
import { Grid } from "./lib/grid";
import { TetraminoRandomizer } from "./lib/randomizer";

const grid = new Grid();
const rdm = new TetraminoRandomizer();

const current = new Tetramino();
const held = new Tetramino({ type: 1 });
const next = new Tetramino({ type: 2 });
const stats = {
	T: "N/A", // Playing time
	S: "N/A", // Score
	PPS: "N/A", // Piece per sec
	APS: "N/A", // Attack per sec
	MT: "N/A", // Mean move time
	MDT: "N/A", // Mean decision time
	MAT: "N/A", // Mean move action time
};

grid.showGameFrame({ current, held, next: [next], stats });
