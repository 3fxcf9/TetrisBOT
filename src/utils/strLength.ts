export function strLengthExcludingEscape(string: string) {
	return string.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "").length;
}
