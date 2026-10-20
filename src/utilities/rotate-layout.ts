import {
	getRandomItem,
} from "./get-random-item";
import {
	rotateLayout0,
} from "./rotate-layout-0";
import {
	rotateLayout90,
} from "./rotate-layout-90";
import {
	rotateLayout180,
} from "./rotate-layout-180";
import {
	rotateLayout270,
} from "./rotate-layout-270";

import {
	type Layout,
} from "../types";

const rotateLayout = (layout: Layout): Layout => {
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
