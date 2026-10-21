# Sudoku

## Description

A [Sudoku game](https://en.wikipedia.org/wiki/Sudoku) (9 × 9 cells) built with HTML, CSS and TypeScript.
Uses Vite's vanilla TypeScript setup, with no UI framework or backend.

## Features

- Provides several difficulty levels:
  - Easy
  - Medium
  - Hard
  - Expert
- Prevents accidental data lose by asking confirmation on a new board generation, reset and page leave
- Supports light and dark color schemes
- Supports responsiveness

## Installation

### Node.js and npm

The root `package.json` `devEngines` field requires:

- Node.js `^22.22.2 || ^24.15.0 || >=26.0.0`
- npm `^12.0.0`

Incompatible versions fail at install.

### Setup

From the repository root, run the following commands to install dependencies:

```sh
npm ci
```

## Scripts

- `dev` — Run the development server.
- `prod:build` — Check TypeScript and build the production site.
- `prod:preview` — Serve the production build locally.
- `prod:publish` — Build the site and publish it to GitHub Pages.
- `format:check` — Check formatting.
- `format:fix` — Apply formatting.
- `lint:css:check` — Check CSS.
- `lint:css:fix` — Fix CSS lint issues.
- `lint:markdown:check` — Check Markdown.
- `lint:markdown:fix` — Fix Markdown lint issues.
- `lint:spell:check` — Check spelling.
- `lint:ts:check` — Lint TypeScript and report type errors.
- `lint:ts:fix` — Apply TypeScript lint fixes.

### Recommended extensions

The workspace recommends these extensions. The same list is in [`.vscode/extensions.json`](./.vscode/extensions.json):

- Code Spell Checker
- EditorConfig
- markdownlint
- Oxc
- Stylelint

## External resources and inspirations

- [SudokuGen](https://github.com/petewritescode/sudoku-gen) - puzzle generator
- [CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/#the-css-reset-1)

## License

[MIT](./LICENSE)
