function getDirection(key: Buffer): string {
	const LEFT_ARROW = "\u001b[D";
	const RIGHT_ARROW = "\u001b[C";
	const UP_ARROW = "\u001b[A";
	const DOWN_ARROW = "\u001b[B";
	const ESCAPE_KEY = "\u001b";

	const key_string = key.toString();

	if (key_string === LEFT_ARROW) {
		return "left";
	} else if (key_string === RIGHT_ARROW) {
		return "right";
	} else if (key_string === UP_ARROW) {
		return "up";
	} else if (key_string === DOWN_ARROW) {
		return "down";
	} else if (key_string === ESCAPE_KEY) {
		return "escape";
	} else if (key_string === " ") {
		return "space";
	}

	return key_string || "";
}

export function read(): Promise<string> {
	const stdin = process.stdin;

	// Set raw mode to read input without waiting for the enter key
	stdin.setRawMode(true);

	return new Promise((resolve) => {
		stdin.once("data", (key: Buffer) => {
			stdin.setRawMode(false);
			resolve(getDirection(key));
		});
	});
}
