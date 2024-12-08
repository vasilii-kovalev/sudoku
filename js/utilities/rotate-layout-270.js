/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 * @example
 * [0, 1]
 * [2, 3]
 * becomes
 * [1, 3]
 * [0, 2]
 */
const rotateLayout270 = (layout) => {
	// The row is not necessary to be the first. We need any row to get column indices to use in a loop.
	const [
		firstRow,
	] = layout;

	return firstRow.map((_, index) => {
		/*
			For `index = 0`, the array contains the last values from of all rows.
			For `index = 1`, the array contains the penultimate values of all rows,
			etc.
		*/
		return layout.map((row) => {
			const reversedRow = row.toReversed();

			return reversedRow[index];
		});
	});
};

export {
	rotateLayout270,
};
