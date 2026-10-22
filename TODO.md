# TODO

<!-- cspell:words libvips -->

- [ ] Generate a new board when difficulty changes
  - [ ] Check if it is possible to prevent the change rather than revert the value if user declined the generation of a new board while user changed something on the existing board
- [ ] Use [Vitest](https://vitest.dev) to write tests for functions and UI
- [ ] Investigate whether `icons:check` works on other machines
  - It compares the PNG and ICO icons byte for byte, but their digits are rendered with the locally installed fonts and the installed sharp/libvips version, so `icons:check` and `prod:build` may fail on another OS or after a sharp upgrade
  - [ ] Check whether comparing only `icon.svg`, which is plain text, is enough
