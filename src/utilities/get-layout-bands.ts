import { type Layout, type Row } from "@/types";

const getLayoutBands = (layout: Layout): Array<Array<Row>> => {
	return [
		// oxlint-disable no-magic-numbers
		[layout[0], layout[1], layout[2]],
		[layout[3], layout[4], layout[5]],
		[layout[6], layout[7], layout[8]],
		// oxlint-enable no-magic-numbers
	];
};

export { getLayoutBands };
