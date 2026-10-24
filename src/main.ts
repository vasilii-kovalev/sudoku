import { getSudoku } from "sudoku-gen";
import { parse, picklist } from "valibot";

import { CELL_VALUE_EMPTY, CELL_VALUE_PLACEHOLDER, CELL_VALUES, DEFAULT_DIFFICULTY } from "./constants";
import {
	DifficultySchema,
	isGameStorageEvent,
	readSavedGame,
	SAVE_VERSION,
	type SavedGame,
	setSavedCell,
	writeSavedGame,
} from "./game-storage";
import { initializePwa } from "./pwa";
import { type CellInputInfo, type Difficulty } from "./types";
import { getCellIndicesWithError } from "./utilities/get-cell-indices-with-error";

const CellInputValueSchema = picklist([...CELL_VALUES, CELL_VALUE_EMPTY]);
const CELL_INPUT_PATTERN = /^(?<value>[1-9])/u;

const gameFieldset = document.getElementById("game");
const difficultySelect = document.getElementById("difficulty");
const generateBoardButton = document.getElementById("generate-board");
const resetBoardButton = document.getElementById("reset-board");

const hasAllBoardControls =
	gameFieldset instanceof HTMLFieldSetElement
	&& difficultySelect instanceof HTMLSelectElement
	&& generateBoardButton instanceof HTMLButtonElement
	&& resetBoardButton instanceof HTMLButtonElement;

if (!hasAllBoardControls) {
	throw new Error("Missing board controls.");
}

const cellInputs = Array.from(document.querySelectorAll<HTMLInputElement>("input.cell"));
let storageFailed = false;

const handleStorageError = (error: unknown): void => {
	storageFailed = true;
	// Only game prompts are shown in the app; the page-leave confirmation covers the unsaved progress.
	// oxlint-disable-next-line eslint/no-console
	console.error("Could not save or restore the game.", error);
};

const loadSavedGame = (): SavedGame | null => {
	try {
		return readSavedGame();
	} catch (error) {
		handleStorageError(error);

		return null;
	}
};

const createGame = (difficulty: Difficulty): SavedGame => {
	const { puzzle } = getSudoku(difficulty);

	return {
		difficulty,
		puzzle,
		values: puzzle,
		version: SAVE_VERSION,
	};
};

let game = loadSavedGame() ?? createGame(DEFAULT_DIFFICULTY);

const getErrors = (): Set<number> => {
	const cellInputsInfo = Array.from<string, CellInputInfo>(game.values, (value, index) => {
		return {
			index,
			value: parse(CellInputValueSchema, value.replace(CELL_VALUE_PLACEHOLDER, CELL_VALUE_EMPTY)),
		};
	});

	return getCellIndicesWithError(cellInputsInfo);
};

const isSolved = (): boolean => {
	return !game.values.includes(CELL_VALUE_PLACEHOLDER) && getErrors().size === 0;
};

const renderGame = (): void => {
	const errors = getErrors();

	difficultySelect.value = game.difficulty;

	// Rendering writes each board input's value and state.
	/* oxlint-disable eslint/no-param-reassign */
	cellInputs.forEach((cellInput, index) => {
		const isInvalid = errors.has(index);

		cellInput.value = game.values[index].replace(CELL_VALUE_PLACEHOLDER, CELL_VALUE_EMPTY);
		cellInput.readOnly = game.puzzle[index] !== CELL_VALUE_PLACEHOLDER;
		cellInput.classList.toggle("highlighted", isInvalid);
		cellInput.ariaInvalid = String(isInvalid);
	});
	/* oxlint-enable eslint/no-param-reassign */
};

const saveGame = (next: SavedGame): void => {
	game = next;

	renderGame();

	if (storageFailed) {
		return;
	}

	try {
		writeSavedGame(game);
	} catch (error) {
		handleStorageError(error);
	}
};

const startGame = (next: SavedGame): void => {
	saveGame(next);
	document.getElementById("board")?.focus();
};

const confirmDiscard = (): boolean => {
	const hasChanges = game.values !== game.puzzle;

	if (!hasChanges) {
		return true;
	}

	// Discarding entries asks with a native confirm dialog.
	// oxlint-disable-next-line eslint/no-alert
	return window.confirm("Any changes will be lost. Proceed?");
};

generateBoardButton.addEventListener("click", () => {
	if (confirmDiscard()) {
		startGame(createGame(game.difficulty));
	}
});

resetBoardButton.addEventListener("click", () => {
	if (confirmDiscard()) {
		startGame({
			...game,
			values: game.puzzle,
		});
	}
});

difficultySelect.addEventListener("change", () => {
	saveGame({
		...game,
		difficulty: parse(DifficultySchema, difficultySelect.value),
	});
});

cellInputs.forEach((cellInput, index) => {
	cellInput.addEventListener("input", () => {
		const value = CELL_INPUT_PATTERN.exec(cellInput.value)?.groups?.value ?? CELL_VALUE_EMPTY;

		saveGame(setSavedCell(game, index, parse(CellInputValueSchema, value)));

		if (isSolved()) {
			// Paint the final entry before displaying a blocking confirmation.
			setTimeout(() => {
				// A solved puzzle asks with a native confirm dialog.
				// oxlint-disable-next-line eslint/no-alert
				if (window.confirm("You solved the puzzle! Generate another one?")) {
					startGame(createGame(game.difficulty));
				}
			}, 0);
		}
	});
});

// Writing an unchanged value is a no-op, and a removed save is restored from this tab.
const syncWithStorage = (): void => {
	saveGame(loadSavedGame() ?? game);
};

window.addEventListener("storage", (event) => {
	if (isGameStorageEvent(event)) {
		syncWithStorage();
	}
});
window.addEventListener("pageshow", (event) => {
	if (event.persisted) {
		syncWithStorage();
	}
});
window.addEventListener("beforeunload", (event) => {
	if (storageFailed) {
		event.preventDefault();
	}
});

saveGame(game);

gameFieldset.disabled = false;

initializePwa();
