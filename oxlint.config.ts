import { defineConfig } from "oxlint";

const config = defineConfig({
	categories: {
		correctness: "error",
		pedantic: "error",
		perf: "error",
		restriction: "error",
		style: "error",
		suspicious: "error",
	},
	options: {
		typeAware: true,
		typeCheck: true,
	},
	overrides: [
		{
			files: ["**/*.config.mjs", "**/*.config.ts"],
			rules: {
				"import/no-default-export": "off",
			},
		},
		{
			files: ["vite.config.ts"],
			rules: {
				// The existing base-path choice is intentionally a compact ternary.
				"eslint/no-ternary": "off",
			},
		},
		{
			files: ["src/main.ts"],
			rules: {
				// Native confirmation dialogs are part of the current interaction flow.
				"eslint/no-alert": "off",
			},
		},
	],
	plugins: ["typescript", "import"],
	rules: {
		"eslint/arrow-body-style": ["error", "always"],
		"eslint/func-style": [
			"error",
			"expression",
			{
				allowArrowFunctions: true,
			},
		],
		// Single-character tokens are part of the puzzle representation.
		"eslint/id-length": "off",
		// Nested grid traversal inflates statement counts without added complexity.
		"eslint/max-statements": "off",
		// Board indices and seed data use domain-specific numeric literals.
		"eslint/no-magic-numbers": "off",
		// Standard loop increments are used for grid traversal.
		"eslint/no-plusplus": "off",
		// Explicit undefined checks narrow TypeScript lookup results.
		"eslint/no-undefined": "off",
		"eslint/no-void": [
			"error",
			{
				allowAsStatement: true,
			},
		],
		"eslint/one-var": "off",
		"eslint/prefer-arrow-callback": "error",
		// Property order documents seed/enum data and call-site argument shapes.
		"eslint/sort-keys": "off",
		"eslint/sort-imports": [
			"error",
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
		"import/consistent-type-specifier-style": ["error", "prefer-inline"],
		"import/no-named-export": "off",
		// Parent-relative imports are natural module boundaries in this single-app source tree.
		"import/no-relative-parent-imports": "off",
		"import/no-unassigned-import": [
			"error",
			{
				allow: ["**/*.css"],
			},
		],
		"import/prefer-default-export": "off",
		"typescript/array-type": [
			"error",
			{
				default: "generic",
				readonly: "generic",
			},
		],
		"typescript/consistent-type-exports": [
			"error",
			{
				fixMixedExportsWithInlineTypeSpecifier: true,
			},
		],
		"typescript/consistent-type-imports": [
			"error",
			{
				fixStyle: "inline-type-imports",
				prefer: "type-imports",
			},
		],
		"typescript/no-import-type-side-effects": "off",
		"typescript/prefer-readonly-parameter-types": "off",
	},
});

export default config;
