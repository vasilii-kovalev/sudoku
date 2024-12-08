import {
	CELL_VALUE_PLACEHOLDER,
} from "../constants.js";

/**
 * @typedef {import("../types.ts").Layout} Layout
 */

/**
 * @typedef {import("../types.ts").PopulatedPuzzle} PopulatedPuzzle
 */

/**
 * @typedef {import("../types.ts").Puzzle} Puzzle
 */

/**
 * @typedef {import("../types.ts").TokenMap} TokenMap
 */

/**
 * @typedef {import("../types.ts").TokenOrPlaceholder} TokenOrPlaceholder
 */

/**
 * @typedef {Object} PopulatePuzzleParams
 * @property {Puzzle} puzzle
 * @property {Layout} layout
 * @property {TokenMap} tokenMap
 */

/**
 * @param {PopulatePuzzleParams} params
 * @returns {PopulatedPuzzle}
 */
const populatePuzzle = ({
	puzzle,
	layout,
	tokenMap,
}) => {
	/** @type {PopulatedPuzzle} */
	let populatedPuzzle = "";

	layout.forEach((row) => {
		row.forEach((cellIndex) => {
			/** @type {TokenOrPlaceholder} */
			const tokenOrPlaceholder = puzzle[cellIndex];

			if (tokenOrPlaceholder === CELL_VALUE_PLACEHOLDER) {
				populatedPuzzle += tokenOrPlaceholder;

				return;
			}

			populatedPuzzle += tokenMap[tokenOrPlaceholder];
		});
	});

	return populatedPuzzle;
};

export {
	populatePuzzle,
};
