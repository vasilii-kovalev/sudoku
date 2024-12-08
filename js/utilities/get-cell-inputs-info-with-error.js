import {
	CELL_VALUES,
} from "../constants.js";

/**
 * @typedef {import("../types.ts").CellInputInfo} CellInputInfo
 */

/**
 * @param {Array<CellInputInfo>} cellInputsInfo
 * @returns {Array<CellInputInfo>}
 */
const getCellInputsInfoWithError = (cellInputsInfo) => {
	return CELL_VALUES.reduce(
		(
			/** @type {Array<CellInputInfo>} */
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
