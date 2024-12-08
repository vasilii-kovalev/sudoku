import {
	rotateLayout90,
} from "./rotate-layout-90.js";
import {
	rotateLayout270,
} from "./rotate-layout-270.js";
import {
	shuffleLayoutBands,
} from "./shuffle-layout-bands.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const shuffleLayoutStacks = (layout) => {
	/*
		The layout is rotated to get stacks conveniently.
		Otherwise it would be necessary to create arrays of individual values
		like [layout[0][0], layout[0][1], layout[0][2]], etc.
	*/
	const rotatedLayout = rotateLayout90(layout);
	const layoutWithShuffledBands = shuffleLayoutBands(rotatedLayout);
	// The layout is rotated back so that the temporary "bands" become stacks again.
	const rotatedBackLayout = rotateLayout270(layoutWithShuffledBands);

	return rotatedBackLayout;
};

export {
	shuffleLayoutStacks,
};
