import {
	type Layout,
	type Row,
} from "../types";

/**
 * @example
 * [0, 1]
 * [2, 3]
 * becomes
 * [3, 2]
 * [1, 0]
 */
const rotateLayout180 = (layout: Layout): Layout => {
	const layoutWithReversedColumns = layout.map<Row>((row) => {
		return row.toReversed();
	});

	return layoutWithReversedColumns.toReversed();
};

export {
	rotateLayout180,
};
