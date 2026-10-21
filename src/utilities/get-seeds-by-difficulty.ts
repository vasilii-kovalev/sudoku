import { SEEDS } from "@/constants";
import { type Difficulty, type SeedInfo } from "@/types";

const getSeedsByDifficulty = (difficulty: Difficulty): Array<SeedInfo> => {
	return SEEDS.filter((seed) => {
		return seed.difficulty === difficulty;
	});
};

export { getSeedsByDifficulty };
