import {
	getCellInputsInfoWithErrorInBlocks,
} from "./get-cell-inputs-info-with-error-in-blocks.js";
import {
	getCellInputsInfoWithErrorInColumns,
} from "./get-cell-inputs-info-with-error-in-columns.js";
import {
	getCellInputsInfoWithErrorInRows,
} from "./get-cell-inputs-info-with-error-in-rows.js";

/**
 * @typedef {import("../types.ts").CellIndex} CellIndex
 */

/**
 * @typedef {import("../types.ts").CellInputInfo} CellInputInfo
 */

/**
 * @param {Array<CellInputInfo>} cellInputsInfo
 * @returns {Set<CellIndex>}
 */
const getCellIndicesWithError = (cellInputsInfo) => {
	/** @type {Set<CellIndex>} */
	const cellInputIndicesWithError = new Set();

	const cellInputsInfoWithErrorInRows = getCellInputsInfoWithErrorInRows(cellInputsInfo);

	cellInputsInfoWithErrorInRows.forEach((cellInputInfo) => {
		cellInputIndicesWithError.add(cellInputInfo.index);
	});

	const cellInputsInfoWithErrorInColumns = getCellInputsInfoWithErrorInColumns(cellInputsInfo);

	cellInputsInfoWithErrorInColumns.forEach((cellInputInfo) => {
		cellInputIndicesWithError.add(cellInputInfo.index);
	});

	const cellInputsInfoWithErrorInBlocks = getCellInputsInfoWithErrorInBlocks(cellInputsInfo);

	cellInputsInfoWithErrorInBlocks.forEach((cellInputInfo) => {
		cellInputIndicesWithError.add(cellInputInfo.index);
	});

	return cellInputIndicesWithError;
};

export {
	getCellIndicesWithError,
};
