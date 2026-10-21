const DIFFICULTY = {
	// Matches the difficulty values used in the sudoku-gen library.
	EASY: "easy",
	EXPERT: "expert",
	HARD: "hard",
	MEDIUM: "medium",
} as const;

const DEFAULT_DIFFICULTY = DIFFICULTY.EASY;

const BLOCK_SIZE = 3;

const BOARD_SIZE = 9;

/* oxlint-disable eslint/sort-keys -- Keep cell values in numeric order. */
const CELL_VALUE = {
	ONE: "1",
	TWO: "2",
	THREE: "3",
	FOUR: "4",
	FIVE: "5",
	SIX: "6",
	SEVEN: "7",
	EIGHT: "8",
	NINE: "9",
} as const;
/* oxlint-enable eslint/sort-keys */

const CELL_VALUE_PLACEHOLDER = "-";

const CELL_VALUE_EMPTY = "";

const CELL_VALUES = Object.values(CELL_VALUE);

export {
	BLOCK_SIZE,
	BOARD_SIZE,
	CELL_VALUE_EMPTY,
	CELL_VALUE_PLACEHOLDER,
	CELL_VALUE,
	CELL_VALUES,
	DEFAULT_DIFFICULTY,
	DIFFICULTY,
};
