import {
	check,
	type InferOutput,
	length,
	literal,
	object,
	parse,
	parseJson,
	picklist,
	pipe,
	regex,
	string,
} from "valibot";

import { BOARD_SIZE, type CELL_VALUE_EMPTY, CELL_VALUE_PLACEHOLDER, DIFFICULTY } from "./constants";
import { type CellValue } from "./types";

const STORAGE_KEY = "sudoku-game";
const SAVE_VERSION = 1;
const BOARD_PATTERN = /^[-1-9]+$/u;

const DifficultySchema = picklist(Object.values(DIFFICULTY));
const BoardSchema = pipe(string(), length(BOARD_SIZE * BOARD_SIZE), regex(BOARD_PATTERN));

const SavedGameSchema = pipe(
	object({
		difficulty: DifficultySchema,
		puzzle: BoardSchema,
		values: BoardSchema,
		version: literal(SAVE_VERSION),
	}),
	check(({ puzzle, values }) => {
		return Array.from(puzzle).every((value, index) => {
			return value === CELL_VALUE_PLACEHOLDER || value === values[index];
		});
	}, "Saved game changes a fixed cell."),
);

const SerializedGameSchema = pipe(string(), parseJson(), SavedGameSchema);

type SavedGame = InferOutput<typeof SavedGameSchema>;

const isGameStorageEvent = (event: Pick<StorageEvent, "key" | "storageArea">): boolean => {
	return event.storageArea === localStorage && (event.key === STORAGE_KEY || event.key === null);
};

const readSavedGame = (): SavedGame | null => {
	const serialized = localStorage.getItem(STORAGE_KEY);

	if (serialized === null) {
		return null;
	}

	return parse(SerializedGameSchema, serialized);
};

const writeSavedGame = (game: SavedGame): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
};

const setSavedCell = (game: SavedGame, index: number, value: CellValue | typeof CELL_VALUE_EMPTY): SavedGame => {
	const values = Array.from(game.values);
	values[index] = value || CELL_VALUE_PLACEHOLDER;

	return {
		...game,
		values: values.join(""),
	};
};

export {
	DifficultySchema,
	isGameStorageEvent,
	readSavedGame,
	SAVE_VERSION,
	type SavedGame,
	setSavedCell,
	writeSavedGame,
};
