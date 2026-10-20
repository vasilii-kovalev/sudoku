import {
	CELL_VALUES,
	TOKENS,
} from "../constants";
import {
	sortRandomly,
} from "./sort-randomly";

import {
	type CellValue,
	type Token,
	type TokenMap,
} from "../types";

const getTokenMap = (): TokenMap => {
	const sortedTokens = TOKENS.toSorted(sortRandomly);

	// Every token occurs once, paired with one of the nine cell values.
	const tokenEntries = sortedTokens.map<[Token, CellValue]>((token, index) => {
		return [token, CELL_VALUES[index]];
	});

	return Object.fromEntries(tokenEntries) as TokenMap;
};

export {
	getTokenMap,
};
