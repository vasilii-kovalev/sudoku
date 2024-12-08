import {
	shuffleLayoutBands,
} from "./shuffle-layout-bands.js";
import {
	shuffleLayoutColumns,
} from "./shuffle-layout-columns.js";
import {
	shuffleLayoutRows,
} from "./shuffle-layout-rows.js";
import {
	shuffleLayoutStacks,
} from "./shuffle-layout-stacks.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const shuffleLayout = (layout) => {
	const layoutWithShuffledBands = shuffleLayoutBands(layout);
	const layoutWithShuffledStacks = shuffleLayoutStacks(layoutWithShuffledBands);
	const layoutWithShuffledRows = shuffleLayoutRows(layoutWithShuffledStacks);
	const layoutWithShuffledColumns = shuffleLayoutColumns(layoutWithShuffledRows);

	return layoutWithShuffledColumns;
};

export {
	shuffleLayout,
};
