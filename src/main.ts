import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./tetramino";
import { Grid } from "./grid";

const tetr = new Tetramino();
const grid = new Grid({ next: tetr });

console.log("My tetramino: \n" + surroundASCII(tetr.toASCIILines()).join("\n"));

grid.hardDropTetramino(tetr);

function rb1a7() {
	return 1 + Math.floor(Math.random() * 6);
}

for (let i = 0; i < 5; i++) {
	grid.hardDropTetramino(new Tetramino({ type: rb1a7() }));
}

console.log("My grid: \n" + surroundASCII(grid.toASCIILines()).join("\n"));

grid.showGameFrame();
