export interface TetraminoColor {
	piece: string;
	projected: string;
}

export const tetraminoColors: { [x: number]: TetraminoColor } = {
	0: { piece: "\u001b[m", projected: "\u001b[m" }, // Nothing
	1: { piece: "\u001b[48;2;86;208;255m", projected: "\u001b[48;2;43;104;128m" }, // I
	2: { piece: "\u001b[48;2;24;51;144m", projected: "\u001b[48;2;15;33;92m" }, // J
	3: { piece: "\u001b[48;2;230;79;43m", projected: "\u001b[48;2;153;53;31m" }, // L
	4: { piece: "\u001b[48;2;255;148;0m", projected: "\u001b[48;2;128;74;0m" }, // O
	5: { piece: "\u001b[48;2;0;153;92m", projected: "\u001b[48;2;0;77;46m" }, // S
	6: { piece: "\u001b[48;2;165;0;119m", projected: "\u001b[48;2;89;0;64m" }, // T
	7: { piece: "\u001b[48;2;170;0;56m", projected: "\u001b[48;2;94;0;31m" }, // Z
};
