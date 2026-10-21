import { BASE_LAYOUT } from "../constants";
import { type Layout } from "../types";
import { rotateLayout } from "./rotate-layout";
import { shuffleLayout } from "./shuffle-layout";

const getLayout = (): Layout => {
	const rotatedLayout = rotateLayout(BASE_LAYOUT);
	const shuffledLayout = shuffleLayout(rotatedLayout);

	return shuffledLayout;
};

export { getLayout };
