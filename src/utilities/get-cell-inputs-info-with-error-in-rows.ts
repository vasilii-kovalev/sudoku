import { BOARD_SIZE } from "../constants";
import { type CellInputInfo } from "../types";
import { getCellInputsInfoWithError } from "./get-cell-inputs-info-with-error";

const getCellInputsInfoWithErrorInRows = (cellInputsInfo: Array<CellInputInfo>): Array<CellInputInfo> => {
	const cellInputsInfoWithError: Array<CellInputInfo> = [];

	for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
		const cellIndex = rowIndex * BOARD_SIZE;
		const cellInputsInfoInRow = cellInputsInfo.slice(cellIndex, cellIndex + BOARD_SIZE);

		const cellInputsInfoWithErrorInRow = getCellInputsInfoWithError(cellInputsInfoInRow);

		cellInputsInfoWithError.push(...cellInputsInfoWithErrorInRow);
	}

	return cellInputsInfoWithError;
};

export { getCellInputsInfoWithErrorInRows };
