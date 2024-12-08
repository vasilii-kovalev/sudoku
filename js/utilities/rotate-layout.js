import {
	getRandomItem,
} from "./get-random-item.js";
import {
	rotateLayout0,
} from "./rotate-layout-0.js";
import {
	rotateLayout90,
} from "./rotate-layout-90.js";
import {
	rotateLayout180,
} from "./rotate-layout-180.js";
import {
	rotateLayout270,
} from "./rotate-layout-270.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @param {Layout} layout
 * @returns {Layout}
 */
const rotateLayout = (layout) => {
	const randomRotationFunction = getRandomItem([
		rotateLayout0,
		rotateLayout90,
		rotateLayout180,
		rotateLayout270,
	]);

	return randomRotationFunction(layout);
};

export {
	rotateLayout,
};
