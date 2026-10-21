import { CELL_VALUE_PLACEHOLDER, TOKENS } from "@/constants";
import { type Layout, type PopulatedPuzzle, type Puzzle, type TokenMap } from "@/types";

interface PopulatePuzzleParams {
	puzzle: Puzzle;
	layout: Layout;
	tokenMap: TokenMap;
}

const populatePuzzle = ({ puzzle, layout, tokenMap }: PopulatePuzzleParams): PopulatedPuzzle => {
	let populatedPuzzle: PopulatedPuzzle = "";

	layout.forEach((row) => {
		row.forEach((cellIndex) => {
			const tokenOrPlaceholder = puzzle[cellIndex];

			if (tokenOrPlaceholder === CELL_VALUE_PLACEHOLDER) {
				populatedPuzzle += tokenOrPlaceholder;

				return;
			}

			const token = TOKENS.find((candidateToken) => {
				return candidateToken === tokenOrPlaceholder;
			});

			if (typeof token === "undefined") {
				throw new Error(`Invalid puzzle token at cell ${cellIndex}: ${tokenOrPlaceholder}`);
			}

			populatedPuzzle += tokenMap[token];
		});
	});

	return populatedPuzzle;
};

export { populatePuzzle };
