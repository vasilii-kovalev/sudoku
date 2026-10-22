import { readFile, writeFile } from "node:fs/promises";

import sharp from "sharp";

// oxlint-disable eslint/no-magic-numbers -- Standard icon dimensions and ICO binary-header offsets.
const CSS_CUSTOM_PROPERTY_PATTERN = /--(?<name>[\w-]+):\s*(?<value>[^;]+);/gu;
const SVG_STYLE_BLOCK_PATTERN = /<style>[\s\S]*?<\/style>/u;
const SVG_BACKGROUND_PATH_PATTERN = /<path class="background"[^>]*\/>/u;

const source = await readFile(new URL("../public/icon.svg", import.meta.url), "utf8");
const css = await readFile(new URL("../src/css/theme.css", import.meta.url), "utf8");
const check = process.argv.includes("--check");

const readThemeValue = (name: string): string => {
	const declarations = Array.from(css.matchAll(CSS_CUSTOM_PROPERTY_PATTERN)).filter((declaration) => {
		return declaration.groups?.name === name;
	});

	const value = declarations[0]?.groups?.value;

	if (declarations.length !== 1 || typeof value !== "string") {
		throw new Error(`Expected exactly one --${name} declaration in theme.css.`);
	}

	return value.trim();
};

const dark = readThemeValue("color-dark");
const light = readThemeValue("color-light");
const fontFamily = readThemeValue("font-family");
const fontSizeCoefficient = Number(readThemeValue("font-size-coefficient"));
const opacity = Number(readThemeValue("read-only-cell-opacity"));

if (!Number.isFinite(fontSizeCoefficient) || fontSizeCoefficient <= 0) {
	throw new Error("--font-size-coefficient must be a positive number.");
}

if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) {
	throw new Error("--read-only-cell-opacity must be a number between 0 and 1.");
}

interface IconTheme {
	background: string;
	foreground: string;
	suffix: string;
}

const themes: Record<"dark" | "light", IconTheme> = {
	dark: {
		background: dark,
		foreground: light,
		suffix: "-dark",
	},
	light: {
		background: light,
		foreground: dark,
		suffix: "",
	},
};

const emit = async (name: string, contents: Buffer | string): Promise<void> => {
	const url = new URL(`../public/${name}`, import.meta.url);

	if (check) {
		const existing = await readFile(url);

		if (!existing.equals(Buffer.from(contents))) {
			throw new Error(`${name} is out of date. Run npm run icons:generate.`);
		}
	} else {
		await writeFile(url, contents);
	}
};

const themeStyles = (theme: Pick<IconTheme, "background" | "foreground">): string => {
	return `.background { fill: ${theme.background}; }
		.given { fill: ${theme.foreground}; fill-opacity: ${opacity}; }
		.grid { stroke: ${theme.foreground}; }
		.numbers { fill: ${theme.foreground}; }`;
};

const geometryStyles = `.grid { fill: none; stroke-width: 3; }
		.numbers { font-family: ${fontFamily}; font-size: ${28 * fontSizeCoefficient}px; font-weight: 400; text-anchor: middle; }`;
const adaptiveStyles = `<style>
		${themeStyles(themes.light)}
		${geometryStyles}
		@media (prefers-color-scheme: dark) {
			${themeStyles(themes.dark)}
		}
	</style>`;

if (!SVG_STYLE_BLOCK_PATTERN.test(source)) {
	throw new Error("Missing icon style block.");
}

await emit("icon.svg", source.replace(SVG_STYLE_BLOCK_PATTERN, adaptiveStyles));

const writeIco = async (svg: string): Promise<void> => {
	const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();

	const header = Buffer.alloc(22);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(1, 4);
	header.set([32, 32, 0, 0, 1, 0, 32, 0], 6);
	header.writeUInt32LE(png.length, 14);
	header.writeUInt32LE(header.length, 18);

	await emit("favicon.ico", Buffer.concat([header, png]));
};

interface IconVariant {
	name: string;
	size: number;
	viewBox: string;
}

// PNG and ICO bytes follow the fonts installed here and the sharp build, so the check compares icon.svg only.
if (!check) {
	await Promise.all(
		Object.values(themes).map<Promise<void>>(async (theme) => {
			const svg = source.replace(SVG_STYLE_BLOCK_PATTERN, `<style>${themeStyles(theme)}${geometryStyles}</style>`);
			const variants: Array<IconVariant> = [
				{
					name: `icon-192${theme.suffix}.png`,
					size: 192,
					viewBox: "0 0 96 96",
				},
				{
					name: `icon-512${theme.suffix}.png`,
					size: 512,
					viewBox: "0 0 96 96",
				},
				{
					name: `icon-mask${theme.suffix}.png`,
					size: 512,
					viewBox: "-30 -30 156 156",
				},
				{
					name: `apple-touch-icon${theme.suffix}.png`,
					size: 180,
					viewBox: "-8 -8 112 112",
				},
			];

			await Promise.all(
				variants.map<Promise<void>>(async (variant) => {
					// Flatten supplies a full-bleed background without antialiased seams at the SVG's original edges.
					const input = svg
						.replace('viewBox="0 0 96 96"', `viewBox="${variant.viewBox}"`)
						.replace(SVG_BACKGROUND_PATH_PATTERN, "");

					const png = await sharp(Buffer.from(input))
						.resize(variant.size, variant.size)
						.flatten({ background: theme.background })
						.png()
						.toBuffer();

					await emit(variant.name, png);
				}),
			);

			if (theme.suffix === "") {
				await writeIco(svg);
			}
		}),
	);
}
