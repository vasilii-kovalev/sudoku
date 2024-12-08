import {
	BASE_LAYOUT,
} from "../constants.js";
import {
	rotateLayout,
} from "./rotate-layout.js";
import {
	shuffleLayout,
} from "./shuffle-layout.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @returns {Layout}
 */
const getLayout = () => {
	const rotatedLayout = rotateLayout(BASE_LAYOUT);
	const shuffledLayout = shuffleLayout(rotatedLayout);

	return shuffledLayout;
};

export {
	getLayout,
};
