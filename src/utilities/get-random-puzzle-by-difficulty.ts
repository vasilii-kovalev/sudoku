import {
	getRandomItem,
} from "./get-random-item";
import {
	getSeedsByDifficulty,
} from "./get-seeds-by-difficulty";

import {
	type Difficulty,
	type Puzzle,
} from "../types";

const getRandomPuzzleByDifficulty = (difficulty: Difficulty): Puzzle => {
	const seedsByDifficulty = getSeedsByDifficulty(difficulty);

	const randomSeed = getRandomItem(seedsByDifficulty);

	return randomSeed.puzzle;
};

export {
	getRandomPuzzleByDifficulty,
};
