import { type CellIndex, type CellInputInfo } from "../types";
import { getCellInputsInfoWithErrorInBlocks } from "./get-cell-inputs-info-with-error-in-blocks";
import { getCellInputsInfoWithErrorInColumns } from "./get-cell-inputs-info-with-error-in-columns";
import { getCellInputsInfoWithErrorInRows } from "./get-cell-inputs-info-with-error-in-rows";

const getCellIndicesWithError = (cellInputsInfo: Array<CellInputInfo>): Set<CellIndex> => {
	const cellInputIndicesWithError = new Set<CellIndex>();

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

export { getCellIndicesWithError };
