/**
 * Matrix Iterator
 * @param matrix A 2D matrix to iterate on
 * @yields An array [value, row, col]
 */
export function* matrixIterator(matrix: Array<Array<any>>): Generator<Array<any>> {
	for (let _row = 0; _row < matrix.length; _row++) {
		for (let _col = 0; _col < matrix[_row].length; _col++) {
			yield [matrix[_row][_col], _row, _col];
		}
	}
}
