import { defineConfig } from "vite";

const config = defineConfig({
	base: "./",
	resolve: {
		tsconfigPaths: true,
	},
});

export default config;
