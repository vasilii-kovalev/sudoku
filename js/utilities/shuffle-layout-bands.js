import {
	sortRandomly,
} from "./sort-randomly.js";
import {
	getLayoutBands,
} from "./get-layout-bands.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const shuffleLayoutBands = (layout) => {
	const layoutBands = getLayoutBands(layout);
	/** @type {typeof layoutBands} */
	const sortedLayoutBands = layoutBands.toSorted(sortRandomly);

	return sortedLayoutBands.flat();
};

export {
	shuffleLayoutBands,
};
