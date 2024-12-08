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
const getCellInputsInfoWithErrorInRows = (cellInputsInfo) => {
	/** @type {Array<CellInputInfo>} */
	const cellInputsInfoWithError = [];

	for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
		const cellIndex = rowIndex * BOARD_SIZE;
		const cellInputsInfoInRow = cellInputsInfo.slice(
			cellIndex,
			cellIndex + BOARD_SIZE,
		);

		const cellInputsInfoWithErrorInRow = getCellInputsInfoWithError(cellInputsInfoInRow);

		cellInputsInfoWithError.push(...cellInputsInfoWithErrorInRow);
	}

	return cellInputsInfoWithError;
};

export {
	getCellInputsInfoWithErrorInRows,
};
