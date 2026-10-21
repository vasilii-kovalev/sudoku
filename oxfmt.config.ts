import { defineConfig } from "oxfmt";

// Indentation and line width come from `.editorconfig`.
const config = defineConfig({
	sortImports: {
		groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
		sortSideEffects: true,
	},
});

export default config;
