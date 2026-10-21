import { type CELL_VALUE, type CELL_VALUE_EMPTY, type DIFFICULTY } from "./constants";

type ObjectValues<Type> = Type[keyof Type];

type Difficulty = ObjectValues<typeof DIFFICULTY>;

type CellValue = ObjectValues<typeof CELL_VALUE>;

type CellIndex = number;

interface CellInputInfo {
	value: CellValue | typeof CELL_VALUE_EMPTY;
	index: CellIndex;
}

export { type CellIndex, type CellInputInfo, type CellValue, type Difficulty };
