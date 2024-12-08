/**
 * @typedef {import("./types.ts").Layout} Layout
 */

/**
 * @typedef {import("./types.ts").SeedInfo} SeedInfo
 */

const DIFFICULTY = /** @type {const} */ ({
	EASY: "EASY",
	MEDIUM: "MEDIUM",
	HARD: "HARD",
	EXPERT: "EXPERT",
});

const DEFAULT_DIFFICULTY = DIFFICULTY.EASY;

const BLOCK_SIZE = 3;

const BOARD_SIZE = 9;

const TOKEN = /** @type {const} */ ({
	A: "a",
	B: "b",
	C: "c",
	D: "d",
	E: "e",
	F: "f",
	G: "g",
	H: "h",
	I: "i",
});

const TOKENS = Object.values(TOKEN);

const CELL_VALUE = /** @type {const} */ ({
	ONE: "1",
	TWO: "2",
	THREE: "3",
	FOUR: "4",
	FIVE: "5",
	SIX: "6",
	SEVEN: "7",
	EIGHT: "8",
	NINE: "9",
});

const CELL_VALUE_PLACEHOLDER = "-";

const CELL_VALUE_EMPTY = "";

const CELL_VALUES = Object.values(CELL_VALUE);

/** @type {Array<SeedInfo>} */
const SEEDS = [
	{
		puzzle: "g--d--caf---g----ii-f--hg-bb-iaedhgc--afcg--d-g-b-----f-d--abc---b------c--h-bfia",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "bf-hiac-g-gi------a-hf-g---g-a-fi--ddef---i-b--b-a-g-ff---gbh--hac---------e-cfd-",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "hgad-e--b-cbf-ge---df-aih-----i-------d-ecai-g---fa----igadf----fe-i-----h-eg-fd-",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "-fbe-c----e-----a---g-ihb--gb-fhdc-eid-g-eahbch-----f-----ef-ga-g----e-i--hi-----",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "c--d-fgeb---g--i-hg-ih--da-a-g-b-cde-edc--a--b--------i-e-cd-ha-fb-h-e-ch--e-----",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "bi---ec--eg--h-fbdf--------i-hba-dfe----ehbig--bf-d-h--f-e-a-c-----g-e--cde--f--a",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "-----ef-ha--bf--ecfe-gc---a----gbch--a--df-b--bi----f-h-af-gidbdf----g--i--c--ha-",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "--fg--hec-ebc-------h-dfgabb--h-a-fg-g-df-i--f-a---b--hf----ad---if----hc-ea---bi",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "-----b-f-e-aih----bi----a----e---i---g-bf--a-----cihg-ic-fdhg-a--h---f-cgef-iad-b",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "e--f-b-------eid-f--h----b-ge-c-fadhab-ihgfe-hc--d----d-g---cf---eg--h-bf---i----",
		difficulty: DIFFICULTY.EASY,
	},
	{
		puzzle: "g-hedcf---i-f--a--e--a-----c--i-deh-i-------g--g--e---a----f--c-cf-e-gi-b-------e",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "-di--ac---b-cid-h---h--b-d-----f----h-d----fca---c-i--d----i-e-bh---cd-g-g---fac-",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "--ac-i------ah-d---e----i---a-e-bc----g--f--ad---gae--ig-fa------hd-e-g-c-d-b----",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "fg----i---h--f-e--e-bd--afh-f--hg--ic------b----f-c-----c-------eiac-gdf-b-----e-",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "--d-g-fi---e-ci-d-a----eg-----i---f---bg--ec-e--d--haig----f----ha--------ch-g-e-",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "----d-a---a-ie---di------h-d-e--cg-b-b-e--i----c-i--dh--h-gf--c------b-g--i-ce-a-",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "---cfa-ibf---i-------g---f--i--h-cd-gdf--------cd--fb-------bc--gb---dhi---he--g-",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "a------g-b--di-a-f--e--ahi----a------bae--------ichbaei---de------c-igd-d-h----ci",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "----g-------ci--bg-i-de-af-------beh-----fgdi---eb-f----ah--ig---hg-d---cd--a----",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "gfbc---dh-a-------d--a--fi--daifc--ech------f-------c-f---e--b---d-----i--igh-d--",
		difficulty: DIFFICULTY.MEDIUM,
	},
	{
		puzzle: "-e-fh--a-g----ed---a--b-f---ih----dc--------a----g----b---i---dhc-gf-----g------e",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "----i-b---fc--a-h-eb----i-fcieg--ad---hd-e----d--a----f---b-e-i-------b--h--e----",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "-------hg-----h-d-a-g---ei--ce--dg--dbf---------bfid--hg---f----d--h---c--a-eg---",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "h---f------------i--e---a-h-dhe---a---fh-b----i--c---gf-ga-di--a-i---d-bce------a",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "f----dha----b------a------dic---h------c--egb-----------a-----ed--f-ec-g-fg------",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "c-a---i---b--c--ede----g--c-e---dga--c---b--i--gf-----b-----ei------a-cg--ie----a",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "--a-i---cc-g-------h--e--a--a---ib---d--f--h-----------i---d-f------g-c-dg---b--h",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "i--f--ec------a-fbg-b-i---h-d---ihg-----b---fe---a------d-----i---ie-b-------g---",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "--e---c------i--g-------d-hbaf--------cfhe--ie------f-h-d-c-----f-h----c---i-ga--",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "--f-d-i---g--b-a-d--c-a-----c-i---e---eh--g---------ac---------b---i-e----gf--d--",
		difficulty: DIFFICULTY.HARD,
	},
	{
		puzzle: "-ica------------bh----g--f--g---a---i-e----c-a---f------d--bg------c---e-fg----id",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "-h-i------i---------f--bh--b---a--ed-ca------i--f---h--------c----he--f-ab--df---",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "-h--c-f-ice-------b--ia--------g-h------e---ff--h---i----b---eh----------ga--f--c",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "a----db---g-c----f--e-f--i---------i----h-f-d--g---ch---b--e-c-ca------h-d-------",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "------c--g-b--a---------g-h---e----gb--id-----i-f---eb----i---c-he-f-d--a------h-",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "---bf-i-------hc-aa----------g------h--c-e----i----bh----f---g--f-----e---hig-a--",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "--c-----d---g-i--h-i----b--ace------d--bh----b--f---------e---------bea--d--a--c-",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "-----d-h--h-----a-gb------i-----a--g----eh-c--i--d-----ge---a--d----f-----ab--i--",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "-bi-------c----e---------af---eba-----a-i-g------c--i----h-e--d-e------gc-b--f---",
		difficulty: DIFFICULTY.EXPERT,
	},
	{
		puzzle: "---i--h-bc----b----g----a----gd-----e--h-f------b---ac-c------ha-----id--i--gd---",
		difficulty: DIFFICULTY.EXPERT,
	},
];

/** @type {Layout} */
const BASE_LAYOUT = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8],
	[9, 10, 11, 12, 13, 14, 15, 16, 17],
	[18, 19, 20, 21, 22, 23, 24, 25, 26],
	[27, 28, 29, 30, 31, 32, 33, 34, 35],
	[36, 37, 38, 39, 40, 41, 42, 43, 44],
	[45, 46, 47, 48, 49, 50, 51, 52, 53],
	[54, 55, 56, 57, 58, 59, 60, 61, 62],
	[63, 64, 65, 66, 67, 68, 69, 70, 71],
	[72, 73, 74, 75, 76, 77, 78, 79, 80],
];

export {
	BASE_LAYOUT,
	BLOCK_SIZE,
	BOARD_SIZE,
	CELL_VALUE,
	CELL_VALUE_EMPTY,
	CELL_VALUE_PLACEHOLDER,
	CELL_VALUES,
	DEFAULT_DIFFICULTY,
	DIFFICULTY,
	SEEDS,
	TOKEN,
	TOKENS,
};
