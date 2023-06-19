import { matrixIterator } from "./utils/matrixIterator";
import { surroundASCII } from "./utils/surroundASCII";
import { Tetramino } from "./tetramino";

const tetr = new Tetramino();

console.log("My tetramino: \n" + surroundASCII(tetr.toString().split("\n")).join("\n"));
