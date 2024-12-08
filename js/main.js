import {
	CELL_VALUE_EMPTY,
	CELL_VALUE_PLACEHOLDER,
	DEFAULT_DIFFICULTY,
	DIFFICULTY,
} from "./constants.js";
import {
	getCellIndicesWithError,
} from "./utilities/get-cell-indices-with-error.js";
import {
	getPopulatedPuzzle,
} from "./utilities/get-populated-puzzle.js";

/**
 * @typedef {import("./types.ts").Difficulty} Difficulty
 */

/**
 * @typedef {import("./types.ts").CellInputInfo} CellInputInfo
 */

/**
 * @returns {HTMLSelectElement}
 */
const getDifficultySelectElement = () => {
	return document.getElementById("difficulty");
};

/**
 * @returns {Array<HTMLInputElement>}
 */
const getCellInputElements = () => {
	/** @type {NodeListOf<HTMLInputElement>} */
	const cellInputs = document.querySelectorAll(".cell");

	return Array.from(cellInputs);
};

/**
 * @param {HTMLSelectElement} selectElement
 * @returns {Difficulty}
 */
const getSelectedDifficulty = (selectElement) => {
	const selectedDifficulty = selectElement?.value;

	if (Object.values(DIFFICULTY).includes(selectedDifficulty)) {
		return selectedDifficulty;
	}

	return DEFAULT_DIFFICULTY;
};

const setFocusToBoardElement = () => {
	const boardElement = document.getElementById("board");

	boardElement?.focus();
};

const generateBoard = () => {
	const selectElement = getDifficultySelectElement();

	const selectedDifficulty = getSelectedDifficulty(selectElement);

	selectElement.value = selectedDifficulty;

	const populatedPuzzle = getPopulatedPuzzle(selectedDifficulty);

	const cellInputElements = getCellInputElements();

	cellInputElements.forEach((cellInputElement, index) => {
		const value = populatedPuzzle[index];

		if (value === CELL_VALUE_PLACEHOLDER) {
			cellInputElement.value = CELL_VALUE_EMPTY;

			cellInputElement.readOnly = false;

			return;
		}

		cellInputElement.value = value;

		cellInputElement.readOnly = true;
	});
};

const validateBoard = () => {
	const cellInputElements = getCellInputElements();
	/** @type {Array<CellInputInfo>} */
	const cellInputsInfo = cellInputElements.map((cellInput, index) => {
		return {
			value: cellInput.value,
			index,
		};
	});

	const cellInputIndicesWithError = getCellIndicesWithError(cellInputsInfo);

	cellInputElements.forEach((cellInputElement, index) => {
		if (cellInputIndicesWithError.has(index)) {
			cellInputElement.classList.add("highlighted");
			cellInputElement.ariaInvalid = "true";
		} else {
			cellInputElement.classList.remove("highlighted");
			cellInputElement.ariaInvalid = "false";
		}
	});

	const isBoardFilledCorrectly = cellInputsInfo.every((cellInputInfo, index) => {
		return (
			cellInputInfo.value !== CELL_VALUE_EMPTY
			&& !cellInputIndicesWithError.has(index)
		);
	});

	if (!isBoardFilledCorrectly) {
		return;
	}

	const shouldGenerateNewBoard = window.confirm("You solved the puzzle! Generate another one?");

	if (shouldGenerateNewBoard) {
		generateBoard();

		validateBoard();

		setFocusToBoardElement();
	}
};

/**
 * @param {InputEvent} event
 */
const handleCellInput = (event) => {
	/** @type {string} */
	const nextValue = event.target.value;
	const inputRegexpResult = /^(?<value>[1-9])/g.exec(nextValue);
	const validValue = inputRegexpResult?.groups?.value;

	// Includes incorrect and empty values.
	if (validValue === undefined) {
		event.target.value = CELL_VALUE_EMPTY;
	} else {
		event.target.value = validValue;
	}

	// Without timeout, the "congratulations" confirmation window appears before a new value is set to the input cell.
	setTimeout(
		() => {
			validateBoard();
		},
		0,
	);
};

const getCellInputElementsWithChanges = () => {
	const cellInputElements = getCellInputElements();

	return cellInputElements.filter((cellInputElement) => {
		return (
			!cellInputElement.readOnly
			&& cellInputElement.value !== CELL_VALUE_EMPTY
		);
	});
};

/**
 * @param {Array<HTMLInputElement>} cellInputElementsWithChanges
 * @returns {boolean}
 */
const getConfirmationToClearBoard = (cellInputElementsWithChanges) => {
	if (cellInputElementsWithChanges.length === 0) {
		return true;
	}

	return window.confirm("Any changes will be lost. Proceed?");
};

const resetBoard = () => {
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

const generateNewBoard = () => {
	const cellInputElementsWithChanges = getCellInputElementsWithChanges();
	const canGenerateBoard = getConfirmationToClearBoard(cellInputElementsWithChanges);

	if (canGenerateBoard) {
		generateBoard();

		validateBoard();

		setFocusToBoardElement();
	}
};

window.handleCellInput = handleCellInput;
window.resetBoard = resetBoard;
window.generateNewBoard = generateNewBoard;

const generateBoardOnDocumentLoad = () => {
	generateBoard();

	validateBoard();
};

/**
 * @param {BeforeUnloadEvent} event
 */
const handlePageLeave = (event) => {
	const cellInputElementsWithChanges = getCellInputElementsWithChanges();

	const canLeavePage = getConfirmationToClearBoard(cellInputElementsWithChanges);

	if (!canLeavePage) {
		event.preventDefault();
	}
};

document.addEventListener("DOMContentLoaded", generateBoardOnDocumentLoad);

window.addEventListener("beforeunload", handlePageLeave);
