import {
	defineConfig,
} from "vite";

const config = defineConfig(({
	command,
	isPreview,
}) => {
	return {
		base: command === "serve" && !isPreview
			? "/"
			: "/sudoku/",
	};
});

export default config;
