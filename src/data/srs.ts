export interface TetraminoSRS {
	rotations: number[][][];
}

export const allTetraminoSRS: { [x: number]: TetraminoSRS } = {
	// Empty
	0: {
		rotations: [
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			],
		],
	},

	// I
	1: {
		rotations: [
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			],
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
			],
			[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
			],
			[
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
			],
		],
	},

	// J
	2: {
		rotations: [
			[
				[1, 0, 0],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 1],
				[0, 1, 0],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[0, 0, 1],
			],
			[
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0],
			],
		],
	},

	// L
	3: {
		rotations: [
			[
				[0, 0, 1],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 1],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[1, 0, 0],
			],
			[
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
			],
		],
	},

	// O
	4: {
		rotations: [
			[
				[0, 1, 1],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 1],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 1],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 1],
				[0, 1, 1],
				[0, 0, 0],
			],
		],
	},

	// S
	5: {
		rotations: [
			[
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 1],
				[0, 0, 1],
			],
			[
				[0, 0, 0],
				[0, 1, 1],
				[1, 1, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
				[0, 1, 0],
			],
		],
	},

	// T
	6: {
		rotations: [
			[
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 1, 0],
				[0, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 1, 0],
				[1, 1, 0],
				[0, 1, 0],
			],
		],
	},

	// Z
	7: {
		rotations: [
			[
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
			],
			[
				[0, 0, 1],
				[0, 1, 1],
				[0, 1, 0],
			],
			[
				[0, 0, 0],
				[1, 1, 0],
				[0, 1, 1],
			],
			[
				[0, 1, 0],
				[1, 1, 0],
				[1, 0, 0],
			],
		],
	},
};
