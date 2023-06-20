import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./tetramino";
import { Grid } from "./grid";

const tetr = new Tetramino();
const grid = new Grid();

console.log("My tetramino: \n" + surroundASCII(tetr.toString().split("\n")).join("\n"));

console.log("My grid: \n" + surroundASCII(grid.gridToASCII().split("\n")).join("\n"));
