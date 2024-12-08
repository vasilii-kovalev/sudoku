import {
	TOKENS,
} from "../constants.js";
import {
	sortRandomly,
} from "./sort-randomly.js";

/**
 * @typedef {import("../types.ts").CellValue} CellValue
 */

/**
 * @typedef {import("../types.ts").Token} Token
 */

/**
 * @typedef {import("../types.ts").TokenMap} TokenMap
 */

/**
 * @returns {TokenMap}
 */
const getTokenMap = () => {
	/** @type {typeof TOKENS} */
	const sortedTokens = TOKENS.toSorted(sortRandomly);

	return sortedTokens.reduce(
		(
			/** @type {TokenMap} */
			tokenMap,
			token,
			index,
		) => {
			/** @type {CellValue} */
			const cellValue = (index + 1).toString();

			tokenMap[token] = cellValue;

			return tokenMap;
		},
		{},
	);
};

export {
	getTokenMap,
};
