import {
	CELL_VALUES,
} from "../constants";

import {
	type CellInputInfo,
} from "../types";

const getCellInputsInfoWithError = (cellInputsInfo: Array<CellInputInfo>): Array<CellInputInfo> => {
	return CELL_VALUES.reduce<Array<CellInputInfo>>(
		(
			cellInputsInfoWithErrorCurrent,
			cellValue,
		) => {
			const cellInputsWithCurrentValue = cellInputsInfo.filter((cellInputInfo) => {
				return cellInputInfo.value === cellValue;
			});

			if (cellInputsWithCurrentValue.length > 1) {
				cellInputsInfoWithErrorCurrent.push(...cellInputsWithCurrentValue);
			}

			return cellInputsInfoWithErrorCurrent;
		},
		[],
	);
};

export {
	getCellInputsInfoWithError,
};
