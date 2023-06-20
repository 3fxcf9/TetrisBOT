import { strLengthExcludingEscape } from "./strLength";

/**
 * Surround with ASCII border
 * @param lines Array of ASCII lines
 * @returns An array of lines surrounded by ASCII border
 */
export function surroundASCII(lines: string[]): string[] {
	const max_length_line = lines.reduce((max: number, line: any) => Math.max(max, strLengthExcludingEscape(line)), 0);

	let result = ["╭" + "─".repeat(max_length_line) + "╮"];
	result = result.concat(lines.map((line: string) => "│" + line + " ".repeat(max_length_line - strLengthExcludingEscape(line)) + "│"));
	result.push("╰" + "─".repeat(max_length_line) + "╯");

	return result;
}
