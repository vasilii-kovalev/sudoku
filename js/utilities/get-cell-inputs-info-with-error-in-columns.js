import {
	BOARD_SIZE,
} from "../constants.js";
import {
	getCellInputsInfoWithError,
} from "./get-cell-inputs-info-with-error.js";

/**
 * @typedef {import("../types.ts").CellInputInfo} CellInputInfo
 */

/**
 * @param {Array<CellInputInfo>} cellInputsInfo
 * @returns {Array<CellInputInfo>}
 */
const getCellInputsInfoWithErrorInColumns = (cellInputsInfo) => {
	/** @type {Array<CellInputInfo>} */
	const cellInputsInfoWithError = [];

	for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
	/** @type {Array<CellInputInfo>} */
		const cellInputsInfoInColumn = [];

		for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
			const cellIndex = rowIndex * BOARD_SIZE + columnIndex;
			const cellInputElement = cellInputsInfo[cellIndex];

			cellInputsInfoInColumn.push(cellInputElement);
		}

		const cellInputsInfoWithErrorInColumn = getCellInputsInfoWithError(cellInputsInfoInColumn);

		cellInputsInfoWithError.push(...cellInputsInfoWithErrorInColumn);
	}

	return cellInputsInfoWithError;
};

export {
	getCellInputsInfoWithErrorInColumns,
};
