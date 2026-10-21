import { getSudoku } from "sudoku-gen";

import { CELL_VALUE_EMPTY, CELL_VALUE_PLACEHOLDER, CELL_VALUES, DEFAULT_DIFFICULTY, DIFFICULTY } from "./constants";
import { type CellInputInfo, type CellValue, type Difficulty } from "./types";
import { getCellIndicesWithError } from "./utilities/get-cell-indices-with-error";

const getCellValue = (value: string): CellValue | typeof CELL_VALUE_EMPTY => {
	if (value === CELL_VALUE_EMPTY) {
		return value;
	}

	const cellValue = CELL_VALUES.find((candidateCellValue) => {
		return candidateCellValue === value;
	});

	if (typeof cellValue === "undefined") {
		throw new Error(`Invalid cell value: ${value}`);
	}

	return cellValue;
};

const getDifficultySelectElement = (): HTMLSelectElement => {
	const selectElement = document.getElementById("difficulty");

	if (!(selectElement instanceof HTMLSelectElement)) {
		throw new Error("Missing difficulty select element.");
	}

	return selectElement;
};

const getCellInputElements = (): Array<HTMLInputElement> => {
	const cellInputs = document.querySelectorAll<HTMLInputElement>("input.cell");

	return Array.from<HTMLInputElement>(cellInputs);
};

const getSelectedDifficulty = (selectElement: HTMLSelectElement): Difficulty => {
	const difficulties = Object.values(DIFFICULTY);

	const selectedDifficulty = difficulties.find((difficulty) => {
		return difficulty === selectElement.value;
	});

	return selectedDifficulty ?? DEFAULT_DIFFICULTY;
};

const setFocusToBoardElement = (): void => {
	const boardElement = document.getElementById("board");

	boardElement?.focus();
};

const highlightIncorrectCells = (
	cellInputElements: Array<HTMLInputElement>,
	cellInputIndicesWithError: Set<number>,
): void => {
	cellInputElements.forEach((cellInputElement, index) => {
		if (cellInputIndicesWithError.has(index)) {
			cellInputElement.classList.add("highlighted");
			cellInputElement.ariaInvalid = "true";
		} else {
			cellInputElement.classList.remove("highlighted");
			cellInputElement.ariaInvalid = "false";
		}
	});
};

const isBoardFilledCorrectly = (
	cellInputsInfo: Array<CellInputInfo>,
	cellInputIndicesWithError: Set<number>,
): boolean => {
	return cellInputsInfo.every((cellInputInfo, index) => {
		return cellInputInfo.value !== CELL_VALUE_EMPTY && !cellInputIndicesWithError.has(index);
	});
};

const generateBoard = (): void => {
	const selectElement = getDifficultySelectElement();

	const selectedDifficulty = getSelectedDifficulty(selectElement);

	selectElement.value = selectedDifficulty;

	const { puzzle } = getSudoku(selectedDifficulty);

	const cellInputElements = getCellInputElements();

	cellInputElements.forEach((cellInputElement, index) => {
		const value = puzzle[index];

		if (value === CELL_VALUE_PLACEHOLDER) {
			cellInputElement.value = CELL_VALUE_EMPTY;

			cellInputElement.readOnly = false;

			return;
		}

		cellInputElement.value = value;

		cellInputElement.readOnly = true;
	});
};

const validateBoard = (): void => {
	const cellInputElements = getCellInputElements();
	const cellInputsInfo = cellInputElements.map<CellInputInfo>((cellInput, index) => {
		return {
			index,
			value: getCellValue(cellInput.value),
		};
	});

	const cellInputIndicesWithError = getCellIndicesWithError(cellInputsInfo);

	highlightIncorrectCells(cellInputElements, cellInputIndicesWithError);

	if (
		isBoardFilledCorrectly(cellInputsInfo, cellInputIndicesWithError) &&
		window.confirm("You solved the puzzle! Generate another one?")
	) {
		generateBoard();

		validateBoard();

		setFocusToBoardElement();
	}
};

const handleCellInput = (event: Event): void => {
	const cellInputElement = event.currentTarget;

	if (!(cellInputElement instanceof HTMLInputElement)) {
		throw new Error("Cell input event must originate from an input element.");
	}

	const nextValue = cellInputElement.value;
	const inputRegexpResult = /^(?<value>[1-9])/u.exec(nextValue);
	const validValue = inputRegexpResult?.groups?.value ?? CELL_VALUE_EMPTY;

	cellInputElement.value = validValue;

	// Without timeout, the "congratulations" confirmation window appears before a new value is set to the input cell.
	setTimeout(() => {
		validateBoard();
	}, 0);
};

const getCellInputElementsWithChanges = (): Array<HTMLInputElement> => {
	const cellInputElements = getCellInputElements();

	return cellInputElements.filter((cellInputElement) => {
		return !cellInputElement.readOnly && cellInputElement.value !== CELL_VALUE_EMPTY;
	});
};

const getConfirmationToClearBoard = (cellInputElementsWithChanges: Array<HTMLInputElement>): boolean => {
	if (cellInputElementsWithChanges.length === 0) {
		return true;
	}

	return window.confirm("Any changes will be lost. Proceed?");
};

const resetBoard = (): void => {
	const cellInputElementsWithChanges = getCellInputElementsWithChanges();
	const canResetBoard = getConfirmationToClearBoard(cellInputElementsWithChanges);

	if (canResetBoard) {
		cellInputElementsWithChanges.forEach((cellInputElement) => {
			cellInputElement.value = CELL_VALUE_EMPTY;
		});

		validateBoard();

		setFocusToBoardElement();
	}
};

const generateNewBoard = (): void => {
	const cellInputElementsWithChanges = getCellInputElementsWithChanges();
	const canGenerateBoard = getConfirmationToClearBoard(cellInputElementsWithChanges);

	if (canGenerateBoard) {
		generateBoard();

		validateBoard();

		setFocusToBoardElement();
	}
};

const handlePageLeave = (event: BeforeUnloadEvent): void => {
	const cellInputElementsWithChanges = getCellInputElementsWithChanges();

	const canLeavePage = getConfirmationToClearBoard(cellInputElementsWithChanges);

	if (!canLeavePage) {
		event.preventDefault();
	}
};

const generateBoardButton = document.getElementById("generate-board");
const resetBoardButton = document.getElementById("reset-board");

if (!(generateBoardButton instanceof HTMLButtonElement) || !(resetBoardButton instanceof HTMLButtonElement)) {
	throw new Error("Missing board control buttons.");
}

generateBoardButton.addEventListener("click", generateNewBoard);
resetBoardButton.addEventListener("click", resetBoard);

getCellInputElements().forEach((cellInputElement) => {
	cellInputElement.addEventListener("input", handleCellInput);
});

// Module scripts run after the document has been parsed.
generateBoard();

validateBoard();

window.addEventListener("beforeunload", handlePageLeave);
