type ParsedArgs = { [x: string]: string | boolean };

/**
 * Parse process.argv flags
 * @returns An object containing flags and their value
 */
export function getArgs(): ParsedArgs {
	const args: ParsedArgs = {};
	process.argv.slice(1, process.argv.length).forEach((arg) => {
		// long arg
		if (arg.slice(0, 2) === "--") {
			const longArg = arg.split("=");
			const longArgFlag = longArg[0].slice(2, longArg[0].length);
			const longArgValue = longArg.length > 1 ? longArg[1] : true;
			args[longArgFlag] = longArgValue;
		}
		// flags
		else if (arg[0] === "-") {
			const flags = arg.slice(1, arg.length).split("");
			flags.forEach((flag) => {
				args[flag] = true;
			});
		}
	});
	return args;
}
