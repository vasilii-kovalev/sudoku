import {
	CELL_VALUE,
	CELL_VALUE_EMPTY,
	CELL_VALUE_PLACEHOLDER,
	DIFFICULTY,
	TOKEN,
} from "./constants.js";

type Values<Type> = Type[keyof Type];

type Difficulty = Values<typeof DIFFICULTY>;

type Token = Values<typeof TOKEN>;

type CellValue = Values<typeof CELL_VALUE>;

type TokenOrPlaceholder = Token | typeof CELL_VALUE_PLACEHOLDER;

/** A sequence of values of `TokenOrPlaceholder` type. */
type Puzzle = string;

/** A sequence of values of `CellValue | typeof CELL_VALUE_PLACEHOLDER` type. */
type PopulatedPuzzle = string;

type TokenMap = Record<Token, CellValue>;

interface SeedInfo {
	puzzle: Puzzle;
	difficulty: Difficulty;
}

type CellIndex = number;

type Row = Array<CellIndex>;

type Layout = Array<Row>;

interface CellInputInfo {
	value: CellValue | typeof CELL_VALUE_EMPTY;
	index: CellIndex;
}

export type {
	CellIndex,
	CellInputInfo,
	CellValue,
	Difficulty,
	Layout,
	PopulatedPuzzle,
	Puzzle,
	Row,
	SeedInfo,
	Token,
	TokenMap,
	TokenOrPlaceholder,
};
