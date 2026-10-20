import {
	BOARD_SIZE,
} from "../constants";
import {
	getCellInputsInfoWithError,
} from "./get-cell-inputs-info-with-error";

import {
	type CellInputInfo,
} from "../types";

const getCellInputsInfoWithErrorInColumns = (cellInputsInfo: Array<CellInputInfo>): Array<CellInputInfo> => {
	const cellInputsInfoWithError: Array<CellInputInfo> = [];

	for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
		const cellInputsInfoInColumn: Array<CellInputInfo> = [];

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
