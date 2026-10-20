import {
	type CELL_VALUE,
	type CELL_VALUE_EMPTY,
	type CELL_VALUE_PLACEHOLDER,
	type DIFFICULTY,
	type TOKEN,
} from "./constants";

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

export {
	type CellIndex,
	type CellInputInfo,
	type CellValue,
	type Difficulty,
	type Layout,
	type PopulatedPuzzle,
	type Puzzle,
	type Row,
	type SeedInfo,
	type Token,
	type TokenMap,
	type TokenOrPlaceholder,
};
