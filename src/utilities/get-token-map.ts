import { CELL_VALUES, TOKENS } from "@/constants";
import { type CellValue, type Token, type TokenMap } from "@/types";

import { sortRandomly } from "./sort-randomly";

const isTokenMap = (tokenMap: Record<string, CellValue>): tokenMap is TokenMap => {
	return TOKENS.every((token) => {
		return Object.hasOwn(tokenMap, token);
	});
};

const getTokenMap = (): TokenMap => {
	const sortedTokens = TOKENS.toSorted(sortRandomly);

	// Every token occurs once, paired with one of the nine cell values.
	const tokenEntries = sortedTokens.map<[Token, CellValue]>((token, index) => {
		return [token, CELL_VALUES[index]];
	});

	const tokenMap = Object.fromEntries(tokenEntries);

	if (!isTokenMap(tokenMap)) {
		throw new Error("Token map is missing one or more tokens.");
	}

	return tokenMap;
};

export { getTokenMap };
