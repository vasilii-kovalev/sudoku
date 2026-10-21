import { type Layout } from "../types";
import { getLayoutBands } from "./get-layout-bands";
import { sortRandomly } from "./sort-randomly";

const shuffleLayoutRows = (layout: Layout): Layout => {
	const layoutBands = getLayoutBands(layout);

	const layoutBandsWithSortedRows = layoutBands.map<Layout>((rows) => {
		return rows.toSorted(sortRandomly);
	});

	return layoutBandsWithSortedRows.flat<Array<Layout>>();
};

export { shuffleLayoutRows };
