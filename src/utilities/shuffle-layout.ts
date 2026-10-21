import { type Layout } from "../types";
import { shuffleLayoutBands } from "./shuffle-layout-bands";
import { shuffleLayoutColumns } from "./shuffle-layout-columns";
import { shuffleLayoutRows } from "./shuffle-layout-rows";
import { shuffleLayoutStacks } from "./shuffle-layout-stacks";

const shuffleLayout = (layout: Layout): Layout => {
	const layoutWithShuffledBands = shuffleLayoutBands(layout);
	const layoutWithShuffledStacks = shuffleLayoutStacks(layoutWithShuffledBands);
	const layoutWithShuffledRows = shuffleLayoutRows(layoutWithShuffledStacks);
	const layoutWithShuffledColumns = shuffleLayoutColumns(layoutWithShuffledRows);

	return layoutWithShuffledColumns;
};

export { shuffleLayout };
