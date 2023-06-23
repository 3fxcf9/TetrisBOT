import { strLength } from "./strLength";

/**
 * Surround with ASCII border
 * @param lines Array of ASCII lines
 * @returns An array of lines surrounded by ASCII border
 */
export function surroundASCII(lines: string[], min_dimensions: { height?: number; width?: number } = {}): string[] {
	const width = lines.reduce((max: number, line: any) => Math.max(max, strLength(line)), 0);

	const dimensions = {
		height: Math.max(min_dimensions.height ?? 0, lines.length),
		width: Math.max(min_dimensions.width ?? 0, width),
	};

	let result = ["╭" + "─".repeat(dimensions.width) + "╮"];

	result = result.concat(lines.map((line: string) => "│" + line + " ".repeat(dimensions.width - strLength(line)) + "│"));

	result = result.concat(Array(dimensions.height - lines.length).fill("│" + " ".repeat(dimensions.width) + "│"));

	result.push("╰" + "─".repeat(dimensions.width) + "╯");

	return result;
}
