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
 * [3, 2]
 * [1, 0]
 */
const rotateLayout180 = (layout) => {
	const layoutWithReversedColumns = layout.map((row) => {
		return row.toReversed();
	});

	return layoutWithReversedColumns.toReversed();
};

export {
	rotateLayout180,
};
