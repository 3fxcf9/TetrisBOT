import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./tetramino";
import { Grid } from "./grid";

const tetr = new Tetramino();
const grid = new Grid({ next: tetr });

console.log("My tetramino: \n" + surroundASCII(tetr.toASCIILines()).join("\n"));

grid.grid[4] = [1, 2, 3, 2, 6, 5, 7, 4];
console.log("My grid: \n" + surroundASCII(grid.toASCIILines()).join("\n"));

grid.showGameFrame();
