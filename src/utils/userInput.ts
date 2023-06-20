function getDirection(key: Buffer): string {
	const LEFT_ARROW = "\u001b[D";
	const RIGHT_ARROW = "\u001b[C";
	const UP_ARROW = "\u001b[A";
	const DOWN_ARROW = "\u001b[B";

	if (key.toString() === LEFT_ARROW) {
		return "left";
	} else if (key.toString() === RIGHT_ARROW) {
		return "right";
	} else if (key.toString() === UP_ARROW) {
		return "up";
	} else if (key.toString() === DOWN_ARROW) {
		return "down";
	}

	return key.toString() || "";
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
