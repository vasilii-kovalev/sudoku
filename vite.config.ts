import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const config = defineConfig({
	base: "./",
	plugins: [
		// oxlint-disable-next-line eslint/new-cap -- The plugin factory's public API uses this name.
		VitePWA({
			includeAssets: ["*.ico", "*.svg", "*.png", "*.webmanifest"],
			// The manifests are static files in `public`: one per color scheme.
			manifest: false,
		}),
	],
	resolve: {
		tsconfigPaths: true,
	},
});

export default config;
