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

## Development

Requires npm `^12.0.0` and Node.js `^22.22.2`, `^24.15.0`, or `>=26.0.0` (as specified in `package.json`).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally <http://localhost:5173>).

```sh
npm run typecheck
npm run build
npm run preview
```

The build runs strict TypeScript 7 checking and Vite bundling. Deploy the generated `dist` directory
to any static host. `preview` serves the production build locally; it is not a production server.

Application modules live in `src`, styles in `src/css`, and the page markup in `index.html`.
Puzzle seeds are grouped by difficulty; generation randomizes their digits and rearranges the
board using Sudoku-preserving rotations and row, column, band, and stack shuffles.

## External resources and inspirations

- [SudokuGen](https://github.com/petewritescode/sudoku-gen) - puzzle generator
- [CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/#the-css-reset-1)

## License

[MIT](./LICENSE)
