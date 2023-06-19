export type TetraminoColor = {
	piece: string;
	projected: string;
};

export const tetraminoColors: { [x: number]: TetraminoColor } = {
	0: { piece: "BLANK", projected: "BLANK" }, // Nothing
	1: { piece: "\u001b[48;2;255;148;0m", projected: "\u001b[48;2;255;148;0m" }, // O
	2: { piece: "\u001b[48;2;0;153;92m", projected: "\u001b[48;2;0;153;92m" }, // S
	3: { piece: "\u001b[48;2;170;0;56m", projected: "\u001b[48;2;170;0;56m" }, // Z
	4: { piece: "\u001b[48;2;165;0;119m", projected: "\u001b[48;2;165;0;119m" }, // T
	5: { piece: "\u001b[48;2;230;79;43m", projected: "\u001b[48;2;230;79;43m" }, // L
	6: { piece: "\u001b[48;2;24;51;144m", projected: "\u001b[48;2;24;51;144m" }, // J
	7: { piece: "\u001b[48;2;85;209;253m", projected: "\u001b[48;2;85;209;253m" }, // I
};
