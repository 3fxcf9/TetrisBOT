import { strLength } from "./strLength";

const padding = 2;

export function columnASCIILines(...columns: string[][]) {
	const lines: string[] = [];

	columns.forEach((column, cindex) => {
		const max_length_line = lines.reduce((max: number, line: any) => Math.max(max, strLength(line)), 0);

		for (let _row = 0; _row < column.length; _row++) {
			let line_padding = max_length_line - strLength(lines[_row] || ""); // Adds padding; // Adds padding
			line_padding += cindex > 0 ? padding : 0;

			const row = " ".repeat(line_padding) + column[_row];

			lines[_row] = lines[_row] ? lines[_row] + row : row;
		}
	});

	return lines;
}
