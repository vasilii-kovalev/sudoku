import {
	BASE_LAYOUT,
} from "../constants";
import {
	rotateLayout,
} from "./rotate-layout";
import {
	shuffleLayout,
} from "./shuffle-layout";

import {
	type Layout,
} from "../types";

const getLayout = (): Layout => {
	const rotatedLayout = rotateLayout(BASE_LAYOUT);
	const shuffledLayout = shuffleLayout(rotatedLayout);

	return shuffledLayout;
};

export {
	getLayout,
};
