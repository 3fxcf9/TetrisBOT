import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./tetramino";
import { Grid } from "./grid";

const tetr = new Tetramino();
const grid = new Grid({ next: tetr });

grid.hardDropTetramino(tetr);

function rb1a7() {
	return 1 + Math.floor(Math.random() * 6);
}

for (let i = 0; i < 5; i++) {
	grid.hardDropTetramino(new Tetramino({ type: rb1a7() }));
}

const current = new Tetramino();
grid.showGameFrame({ current });

current.right();
grid.showGameFrame({ current });
