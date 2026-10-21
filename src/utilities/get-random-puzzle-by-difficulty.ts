import { type Difficulty, type Puzzle } from "@/types";

import { getRandomItem } from "./get-random-item";
import { getSeedsByDifficulty } from "./get-seeds-by-difficulty";

const getRandomPuzzleByDifficulty = (difficulty: Difficulty): Puzzle => {
	const seedsByDifficulty = getSeedsByDifficulty(difficulty);

	const randomSeed = getRandomItem(seedsByDifficulty);

	return randomSeed.puzzle;
};

export { getRandomPuzzleByDifficulty };
