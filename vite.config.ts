import { defineConfig } from "vite";

const config = defineConfig(({ command, isPreview }) => {
	return {
		base: command === "serve" && isPreview !== true ? "/" : "/sudoku/",
	};
});

export default config;
