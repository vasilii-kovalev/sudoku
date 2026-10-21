import { BLOCK_SIZE, BOARD_SIZE } from "../constants";
import { type CellInputInfo } from "../types";
import { getCellInputsInfoWithError } from "./get-cell-inputs-info-with-error";

const getCellInputsInfoWithErrorInBlocks = (cellInputsInfo: Array<CellInputInfo>): Array<CellInputInfo> => {
	const cellInputsInfoWithError: Array<CellInputInfo> = [];

	for (let blockIndex = 0; blockIndex < BOARD_SIZE; blockIndex++) {
		const columnIndexInBlock = blockIndex % BLOCK_SIZE;
		const firstRowIndex = blockIndex - columnIndexInBlock;
		const firstColumnIndex = columnIndexInBlock * BLOCK_SIZE;

		const cellInputsInfoInBlock: Array<CellInputInfo> = [];

		for (let rowIndexInBlock = 0; rowIndexInBlock < BLOCK_SIZE; rowIndexInBlock++) {
			const rowIndex = rowIndexInBlock + firstRowIndex;
			const cellIndex = rowIndex * BOARD_SIZE + firstColumnIndex;
			const cellInputsInfoInRow = cellInputsInfo.slice(cellIndex, cellIndex + BLOCK_SIZE);

			cellInputsInfoInBlock.push(...cellInputsInfoInRow);
		}

		const cellInputsInfoWithErrorInBlock = getCellInputsInfoWithError(cellInputsInfoInBlock);

		cellInputsInfoWithError.push(...cellInputsInfoWithErrorInBlock);
	}

	return cellInputsInfoWithError;
};

export { getCellInputsInfoWithErrorInBlocks };
