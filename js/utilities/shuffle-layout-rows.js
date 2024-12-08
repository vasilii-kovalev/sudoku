import {
	getLayoutBands,
} from "./get-layout-bands.js";
import {
	sortRandomly,
} from "./sort-randomly.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const shuffleLayoutRows = (layout) => {
	const layoutBands = getLayoutBands(layout);

	/** @type {typeof layoutBands} */
	const layoutBandsWithSortedRows = layoutBands.map((rows) => {
		return rows.toSorted(sortRandomly);
	});

	return layoutBandsWithSortedRows.flat();
};

export {
	shuffleLayoutRows,
};
