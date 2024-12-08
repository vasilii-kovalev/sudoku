/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @typedef {import("../types.ts").Row} Row
 */

/**
 * @param {Layout} layout
 * @returns {Array<Array<Row>>}
 */
const getLayoutBands = (layout) => {
	return [
		[layout[0], layout[1], layout[2]],
		[layout[3], layout[4], layout[5]],
		[layout[6], layout[7], layout[8]],
	];
};

export {
	getLayoutBands,
};
