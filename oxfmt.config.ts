import { defineConfig } from "oxfmt";

const config = defineConfig({
	sortImports: {
		groups: ["builtin", "external", ["internal", "parent", "sibling", "index"]],
		sortSideEffects: true,
	},
});

export default config;
