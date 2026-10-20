import {
	sortRandomly,
} from "./sort-randomly";
import {
	getLayoutBands,
} from "./get-layout-bands";

import {
	type Layout,
} from "../types";

const shuffleLayoutBands = (layout: Layout): Layout => {
	const layoutBands = getLayoutBands(layout);
	const sortedLayoutBands = layoutBands.toSorted(sortRandomly);

	return sortedLayoutBands.flat<Array<Layout>>();
};

export {
	shuffleLayoutBands,
};
