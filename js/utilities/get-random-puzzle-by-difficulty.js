import {
	getRandomItem,
} from "./get-random-item.js";
import {
	getSeedsByDifficulty,
} from "./get-seeds-by-difficulty.js";

/**
 * @typedef {import("../types.ts").Difficulty} Difficulty
 */

/**
 * @typedef {import("../types.ts").Puzzle} Puzzle
 */

/**
 * @param {Difficulty} difficulty
 * @returns {Puzzle}
 */
const getRandomPuzzleByDifficulty = (difficulty) => {
	const seedsByDifficulty = getSeedsByDifficulty(difficulty);

	const randomSeed = getRandomItem(seedsByDifficulty);

	return randomSeed.puzzle;
};

export {
	getRandomPuzzleByDifficulty,
};
