import {
	getLayout,
} from "./get-layout.js";
import {
	getRandomPuzzleByDifficulty,
} from "./get-random-puzzle-by-difficulty.js"
import {
	getTokenMap,
} from "./get-token-map.js";
import {
	populatePuzzle,
} from "./populate-puzzle.js";

/**
 * @typedef {import("../types.ts").Difficulty} Difficulty
 */

/**
 * @typedef {import("../types.ts").PopulatedPuzzle} PopulatedPuzzle
 */

/**
 * @param {Difficulty} difficulty
 * @returns {PopulatedPuzzle}
 */
const getPopulatedPuzzle = (difficulty) => {
	const puzzle = getRandomPuzzleByDifficulty(difficulty);
	const layout = getLayout();
	const tokenMap = getTokenMap();

	const populatedPuzzle = populatePuzzle({
		puzzle,
		layout,
		tokenMap,
	});

	return populatedPuzzle;
};

export {
	getPopulatedPuzzle,
};
