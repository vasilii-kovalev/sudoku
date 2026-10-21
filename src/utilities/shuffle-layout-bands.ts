import { type Layout } from "../types";
import { getLayoutBands } from "./get-layout-bands";
import { sortRandomly } from "./sort-randomly";

const shuffleLayoutBands = (layout: Layout): Layout => {
	const layoutBands = getLayoutBands(layout);
	const sortedLayoutBands = layoutBands.toSorted(sortRandomly);

	return sortedLayoutBands.flat<Array<Layout>>();
};

export { shuffleLayoutBands };
