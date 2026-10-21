# TODO

- [ ] Generate a new board when difficulty changes
  - [ ] Check if it is possible to prevent the change rather than revert the value if user declined the generation of a new board while user changed something on the existing board
- [ ] Disable buttons, inputs and select on th first page open
- [ ] Use [Vitest](https://vitest.dev) to write tests for functions and UI
- [ ] Make it PWA
  - [ ] Check [Vite PWA](https://vite-pwa-org.netlify.app) plugin
- [ ] Make the application working offline
  - [ ] Check [Making totally offline-available PWAs with Vite and React](https://adueck.github.io/blog/caching-everything-for-totally-offline-pwa-vite-react) article

## Framework and build-time rendering considerations

Keep vanilla TypeScript and Vite for now. The board is already static HTML,
with no demonstrated performance bottleneck requiring a framework.

Svelte or Solid could simplify repeated cell markup and reactive UI updates.
Their main benefit would be maintainability as features such as undo/redo,
pencil marks, hints, and saved games increase state complexity, not guaranteed
performance gains. Svelte fits the existing HTML/CSS structure; Solid offers
JSX and fine-grained reactivity.

SvelteKit with `adapter-static` and prerendering, or SolidStart with route
prerendering, can generate all 81 empty inputs at build time for GitHub Pages.
Component loops replace repeated markup while preserving static HTML delivery.
Basic client-rendered Vite setups do not automatically prerender.

Hydrate the empty board in the browser, then generate a random puzzle to avoid
hydration mismatches. Visitors need not share a puzzle; only generating puzzle
values at build time fixes them until rebuilding, useful for daily puzzles.
The trade-off is additional build infrastructure and hydration JavaScript,
not guaranteed loading improvements. Build-time templates without a browser
framework are another option.

PWA and offline support do not require a UI framework.
