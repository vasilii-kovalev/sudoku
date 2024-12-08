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
 * [2, 0]
 * [3, 1]
 */
const rotateLayout90 = (layout) => {
	// The row is not necessary to be the first. We need any row to get column indices to use in a loop.
	const [
		firstRow,
	] = layout;

	return firstRow.map((_, index) => {
		/*
			For `index = 0`, the array contains the 1st values of all rows.
			For `index = 1`, the array contains the 2nd values of all rows, etc.
		*/
		const valuesByIndexColumn = layout.map((row) => {
			return row[index];
		});

		return valuesByIndexColumn.toReversed();
	});
};

export {
	rotateLayout90,
};
