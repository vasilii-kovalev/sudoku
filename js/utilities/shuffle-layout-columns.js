import {
	rotateLayout90,
} from "./rotate-layout-90.js";
import {
	rotateLayout270,
} from "./rotate-layout-270.js";
import {
	shuffleLayoutRows,
} from "./shuffle-layout-rows.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const shuffleLayoutColumns = (layout) => {
	/*
		The layout is rotated to get columns conveniently.
		Otherwise it would be necessary to create arrays of individual values
		like [layout[0][0], layout[0][1], layout[0][2]], etc.
	*/
	const rotatedLayout = rotateLayout90(layout);
	const layoutWithShuffledRows = shuffleLayoutRows(rotatedLayout);
	// The layout is rotated back so that the temporary "rows" become columns again.
	const rotatedBackLayout = rotateLayout270(layoutWithShuffledRows);

	return rotatedBackLayout;
};

export {
	shuffleLayoutColumns,
};
