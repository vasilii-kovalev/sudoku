# Architecture

This document records why the repository is arranged the way it is. What the project is, and how to install and run it, lives in the [README](../README.md).

## Constraints

The site is a Sudoku game for one player. It ships as static files. There is no server, account system, or cloud sync: the browser keeps the current game and, after the first visit, the application files, so the game also opens offline. The game shows no messages other than its own prompts.

Those constraints decide the rest of this document. Hosting has to serve unchanging files. Saved state lives in browser storage and is shared by every open tab. Offline support, updates, and installation rely on the browser's own mechanisms, and their failures are logged to the browser console instead of interrupting the game.

## Origin

The game first ran as native ES modules with no build step. A Bun server served the files locally, because browsers block module scripts loaded from `file://` URLs. Without a bundler, the game could not use the SudokuGen package, so a puzzle generator modeled on it lived in the repository.

The move to Vite and TypeScript bundled the modules: the deployed page went from 30 requests to 3, and its median cold-cache load time from about 990 to 170 milliseconds. The measurements are in [`history/migration-to-vite/`](../history/migration-to-vite/). SudokuGen then became a regular dependency, and the local generator was removed.

## Hosting

GitHub Pages is the only deployment target. It keeps hosting beside the source repository, costs nothing for this project, and avoids a dedicated server. The site is a project site under `https://vasilii-kovalev.github.io/sudoku/`.

Publishing is a local step: `prod:publish` builds the site, and `oneclickpush` pushes `dist/` to the root of the `gh-pages` branch. There is no deployment workflow in the repository. A local step is simpler to maintain and operate, and small commits do not start a deployment on every push. Pages used to serve a `dist/` committed to `main`; a separate branch keeps build output out of the source history. `oneclickpush` replaces `gh-pages`, which has security issues and is unmaintained. The replacement has no dependencies and pushes with Node's built-in APIs and git.

Asset URLs are relative, so the same build works at a domain root and under a project-site prefix. No source file contains a host name or a repository path. The development server still serves that relative layout from `/`.

GitHub Pages runs Jekyll on a published branch unless a `.nojekyll` file is present. Jekyll would treat the generated site as source and omit names that start with `_` or `.`. `oneclickpush` publishes `dist/` as it stands, including dotfiles. Its CLI has no way to add `.nojekyll` automatically. The empty file is `public/.nojekyll`. Vite copies `public/` into `dist/` unchanged, so the published branch receives that file and Pages serves the tree unchanged.

Pages decides caching on its own. Every file, including content-hashed assets, is served with a ten-minute `Cache-Control: max-age`.

## Page

There is no UI framework. The controls and the 81 board inputs are written in `index.html`, so the page arrives as complete static HTML. The script keeps the game in one object and, after every change, writes it back to those inputs: their values, read-only state, and error highlighting. It changes only values, attributes, and classes, and never creates or removes elements. The measurements from the move to Vite found no bottleneck that a framework would remove; the speed-up came with bundling, which Vite already does.

Svelte or Solid would help maintainability rather than speed: a loop instead of 81 hand-written inputs, and markup that follows the state without code to update it. That becomes worth a framework's build setup and runtime once a feature has to create or remove elements while the game is played, for example pencil marks inside a cell, a move history, or a second screen such as statistics. Repeated markup alone does not need a framework; a build-time template can generate the inputs. Svelte is the closer fit, because its templates are HTML and CSS like the current files.

A framework would not have to give up the static HTML. SvelteKit with `adapter-static`, or SolidStart with route pre-rendering, renders the empty board at build time for GitHub Pages, and the browser hydrates it before restoring or generating a game. Rendering the puzzle itself at build time would show every visitor the same puzzle until the next build.

The script finds its elements in `index.html` by ID and fails fast when a required element is missing, because nothing else checks that the HTML and the script agree. The checks also narrow the element types.

The controls and the board start disabled inside a `fieldset`, and the script enables them once a game is on the board. A module script runs after the page is displayed, and anything typed before that would be neither checked nor saved.

The difficulty select stores the difficulty used the next time a board is generated. Generate board and Reset board replace the board, and each asks before discarding entries the player has made. Choosing an option only changes the select, including when the arrow keys move through the list. [W3C technique H84](https://www.w3.org/WAI/WCAG22/Techniques/html/H84), a way to meet [Success Criterion 3.2.2, On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input), puts the action on a separate button because keyboard users change the selected option while they are still choosing. [WebAIM's form controls](https://webaim.org/techniques/forms/controls) describe the same split.

## Saved games

The current game is one JSON value in `localStorage`: the puzzle and the current values as 81-character strings in SudokuGen's format, the selected difficulty, and a format version. SudokuGen's format lets a generated puzzle be saved without conversion. The difficulty is stored apart from the puzzle because it applies to the next generated board.

`localStorage` fits better than IndexedDB here. The game is one small record, the synchronous API keeps saving free of asynchronous state, and the `storage` event delivers each change to the other tabs; IndexedDB has no equivalent.

Every change writes the whole game, and other tabs apply it from the `storage` event. If two tabs write at the same moment, the later write wins. There are no locks: one player cannot change two tabs faster than a change reaches the other one. A page restored from the back/forward cache re-reads the saved game, because it may have missed changes while it was cached. If the saved game disappears, for example when another tab clears the storage, the open tab writes its game back.

Another version of the app or a manual edit can leave anything under that key, so Valibot validates the saved game on every read. Valibot exports individual functions, so the bundle includes only the validators in use. A save that fails validation is not overwritten, so it stays available for inspection. That failure and any storage error are logged to the console, and the tab keeps playing without saving: its current game, or a new one when the page opens. Leaving the page then asks for confirmation, since the progress would be lost.

Clearing site data, or the browser evicting storage, removes both the saved game and the cached application files. Whether an installed app shares storage with browser tabs depends on the platform.

## Offline use

A service worker caches the built files during the first online visit. After that, the game opens and reloads without a network connection: puzzles are generated and checked in the browser. Only the Rules and Source code links need the internet.

The service worker comes from [vite-plugin-pwa](https://vite-pwa-org.netlify.app/), which uses Workbox. Built file names carry content hashes that change with every build, so the precache list is generated from the build output rather than written by hand. Workbox's default patterns cover scripts, styles, and HTML; `includeAssets` adds the icons and manifests, which those patterns skip. The service worker's scope is relative, like asset URLs.

The plugin keeps the service worker out of the development server, so development never serves files from an outdated cache. Offline behavior is checked with `prod:preview`. Outside localhost, service workers need HTTPS, which GitHub Pages provides.

## Updates

Updates do not interrupt a game. A new service worker downloads in the background and waits until every tab and installed-app window using the old version has closed. The next launch runs the new version and restores the saved game. This is the plugin's default `prompt` registration type without a prompt: nothing ever tells the waiting service worker to skip waiting.

The browser checks for a new service worker whenever the app is opened. A tab or installed-app window can stay open for days without navigating, so the app also checks when the connection comes back and when the page becomes visible again. Each check downloads only the small service worker script, so the checks are not throttled.

Neither the check nor the download waits for the ten-minute Pages cache: browsers fetch the service worker script past the HTTP cache, and Workbox fetches files whose names carry no content hash the same way.

Offline setup and update-check failures are logged to the console. The game keeps working in both cases, and the next opening or check tries again.

## Installation and icons

Installation uses the browser's own interface; the app adds no install button or prompt.

The icons follow the favicon guide linked in the README: an ICO fallback, an SVG favicon, an Apple touch icon, and manifest icons, including a maskable one. The maskable and Apple variants add a margin, because platforms crop and round those icons. The manifests use a relative `id`, `start_url`, and `scope`, like asset URLs.

The SVG favicon switches between light and dark with a `prefers-color-scheme` media query of its own. PNG icons and manifests cannot follow the color scheme, so there are two sets of each. The script points the manifest and Apple touch icon links at the set matching the current scheme and switches them when the scheme changes. An installation takes the set that is active at that moment; the installed icon does not follow later scheme changes. vite-plugin-pwa emits only one manifest, so its manifest generation is off and both manifests are static files.

`public/icon.svg` is the source for every icon. `scripts/generate-icons.ts` replaces its `<style>` block with colors and font settings read from `theme.css`, writes the adaptive SVG back, and renders the PNG files with [sharp](https://www.sharpjs.cn/). Node.js has no built-in SVG renderer, and sharp covers rendering, resizing, and PNG output in one development dependency. Sharp does not write ICO files, so the script wraps a PNG in the 22-byte ICO header itself. The SVG uses the viewer's fonts, while the PNG digits use the fonts installed where the icons were generated.

The generated files are committed. `icons:check` compares `icon.svg` and leaves the PNG and ICO files alone. Those rasters are drawn with the fonts installed on the machine that generated them and with the SVG renderer built into that version of sharp, so a byte comparison fails on another operating system or after a sharp upgrade. The SVG is text. The check rewrites its style block from `theme.css` and fails when the committed file differs, and production builds run the check first, so the SVG favicon stays aligned with the theme. A change to the SVG paths, or to the sizes and margins in the script, reaches the PNG and ICO files only when `icons:generate` is run. The `theme-color` meta tags and the manifest colors repeat the two theme colors by hand.

## Styles

Styles are plain CSS. Modern CSS already provides the features this project needs, including custom properties, nesting, and relative colors, without a preprocessor.

`reset.css` follows the CSS reset linked in the README and stays as close to it as possible, so it can be compared with the source. Project-wide defaults, such as removing the `fieldset` frame, go to `theme.css`.

`theme.css` also holds the values the icon generator reads: the two colors, the font stack, the font-size ratio, and the read-only cell opacity. Some of them are used only in `main.css`, but they stay in `theme.css` so the board and the icons share one source.

## Toolchain

### Node.js and npm

Node.js and npm replaced Bun with the move to Vite. They were chosen because they are already familiar and because the rest of the tools run on Node.js anyway.

npm 12 was chosen because its install-time security defaults are stricter than earlier majors. The Node.js range is recorded only in the `devEngines` field — there is no `engines` field, top-level `packageManager` field, or `.node-version` file — and copies npm 12's own `engines.node`, so the two stay aligned. Odd-numbered short-lived lines such as 23 and 25 are omitted. Every allowed version runs TypeScript files directly, so the icon generator and the config files need no compile step. An incompatible version stops the install. Selecting a compatible Node.js and npm version remains a local responsibility.

`.npmrc` sets `save-exact` and `min-release-age=3`. Every dependency and development dependency uses an exact version. The lockfile is committed, and a clean install uses `npm ci`.

`dependencies` lists only code that ships to the browser: SudokuGen and Valibot. Everything else runs at build or development time.

Small helpers are written by hand. A general-purpose utility library would replace only a few lines.

### TypeScript

Application code, tests, the icon generator, and configuration use TypeScript 7. The `typescript` package provides the editor language server and `tsc`; Oxlint's type-aware rules use `oxlint-tsgolint` instead.

As in Vite's templates, the configuration is split by runtime. `tsconfig.app.json` covers `src/`, tests included. Its `types` list names only `vite/client` and `vite-plugin-pwa/client`, which declare `import.meta.env` and the plugin's `virtual:pwa-register` module, so the installed `@types/node` does not leak Node globals into browser code. `tsconfig.node.json` covers the icon generator and the tool configs, which run in Node rather than in the browser. The root `tsconfig.json` has no sources of its own and only references the two, so a plain `tsc` checks nothing; the production build runs `tsc -b`.

The production bundle target is Vite's default, not a duplicated `build.target`. Node configs use the language level of the minimum Node.js version in `devEngines`. `@types/node` is pinned to the Node 22 line to match the minimum supported runtime major rather than expose APIs from newer majors.

`@/` reaches a file under `src/`, and Vite resolves it from the same TypeScript paths. Files in nested directories, such as utilities and tests, use `@/` because parent-relative imports are forbidden.

### Lint and format

Lint and format commands are plain npm scripts without caching. They run rarely enough that caching would not pay off.

Oxlint and Oxfmt are used for speed. Oxlint enables every category except `nursery`, which the Oxlint docs mark as unstable by design. There is no separate type-check script: Oxlint `typeCheck` reports type errors alongside its rules. Oxfmt reads indentation and line width from `.editorconfig`: tabs, with spaces in Markdown.

Generated and tooling output lives in `.gitignore`. Directory entries use a trailing `/**` so Oxlint `--ignore-path .gitignore` skips files even when a path is passed explicitly on the CLI; a plain `dist/` entry is not enough. Oxfmt, Stylelint, rumdl, and CSpell follow the same ignore file.

rumdl is the Markdown linter because markdownlint-cli and markdownlint-cli2 bring a large dependency tree with open security advisories, including issues a newer release still has. rumdl checks the same rules from a native binary and a much smaller install, and this repository has no custom JavaScript rules that would require the old tools. Rule settings live in `.rumdl.toml`, which the editor extension reads as well. rumdl checks Markdown files from the working directory and respects `.gitignore` by default. `.rumdl.toml` records the rule settings and leaves rumdl's own result cache off. These commands already run rarely enough that the cache would not pay off, and enabling it would only add a `.rumdl_cache/` directory to ignore.

Stylelint checks the CSS: Oxlint does not lint it, and Oxfmt formats it without validating it. The configuration is `stylelint.config.mjs`. A TypeScript config would load through Cosmiconfig, and Cosmiconfig 9 does not work with TypeScript 7 without pinning a newer Cosmiconfig. Plain ESM avoids maintaining that pin; the config shape is checked with a JSDoc `@type` instead.
