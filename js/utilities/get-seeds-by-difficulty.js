import {
	SEEDS,
} from "../constants.js"

/**
 * @typedef {import("../types.ts").Difficulty} Difficulty
 */

/**
 * @typedef {import("../types.ts").SeedInfo} SeedInfo
 */

/**
 * @param {Difficulty} difficulty
 * @returns {Array<SeedInfo>}
 */
const getSeedsByDifficulty = (difficulty) => {
	return SEEDS.filter((seed) => seed.difficulty === difficulty);
};

export {
	getSeedsByDifficulty,
};
