import { type Difficulty, type PopulatedPuzzle } from "../types";
import { getLayout } from "./get-layout";
import { getRandomPuzzleByDifficulty } from "./get-random-puzzle-by-difficulty";
import { getTokenMap } from "./get-token-map";
import { populatePuzzle } from "./populate-puzzle";

const getPopulatedPuzzle = (difficulty: Difficulty): PopulatedPuzzle => {
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

export { getPopulatedPuzzle };
