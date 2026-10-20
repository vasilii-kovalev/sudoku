# Deployed Sudoku performance and size baseline: before Vite

- **URL:** <https://vasilii-kovalev.github.io/sudoku/>
- **Browser samples captured (UTC):** 2026-10-20T22:37:10.053Z
- **Asset verification completed (UTC):** 2026-10-20T22:39:28.514Z
- **Scope:** public deployed site only, **not** the local `dist` build.
- **Deployed entry point:** `./js/main.js`; styles: `./css/{reset,theme,main}.css`.
- **HTML Last-Modified:** Wed, 11 Dec 2024 04:53:12 GMT
- **HTML ETag:** `W/"67591ab8-5a38"`
- **HTML decoded SHA-256:** `442d24c2a85b4efa82ae2b4e4b92b741da181152b95d386a55dfa6bb2e8b1ff8`
- **HTML Cache-Control:** `max-age=600`
- **HTML server:** GitHub.com

## Test environment and method

Windows x64; Node.js v26.11.1 for independent asset byte/hash verification.
VS Code integrated Chromium browser, user agent:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
Code/1.142.0 Chrome/150.0.7871.250 Electron/43.7.7 Safari/537.36
```

Viewport: 1456 x 1253 CSS pixels; device pixel ratio: 1.5.
`navigator.hardwareConcurrency`: 32.
No CPU or network throttling configured by this test; desktop lab test, not mobile.
Browser was already open; DNS/TLS connections and CDN caches may already be warm.

Five cold HTTP-cache runs: CDP `Network.setCacheDisabled(true)`,
`Network.clearBrowserCache` before each `page.reload({waitUntil:'load'})`.
Five cache-enabled reload attempts: `setCacheDisabled(false)`, one priming reload,
then five reloads. These were **not** successful warm-cache samples: all 30 resources
still transferred on every run (zero Resource Timing cache hits).
An additional cache-enabled `page.goto` also had zero cache hits.
Each run waited for a populated board, then 350 ms before reading timings.

TTFB = Navigation Timing responseStart relative to navigation start.
DOMContentLoaded/load = corresponding eventEnd relative to navigation start.
Board-ready = first MutationObserver callback seeing 81 `input.cell` elements
and at least one readonly clue; approximates populated DOM, NOT visible paint.

Byte totals use same-origin Navigation/Resource Timing entries: one HTML,
three CSS files, and 26 JavaScript modules. External hyperlinks were not visited.
Independent Node HTTPS GETs requested `Accept-Encoding: gzip` for all 30 assets,
counted actual encoded bytes, decompressed them, and verified both lengths
against the browser capture. SHA-256 values below identify decoded content.

## Size baseline (exact bytes, not KB)

| Type | Requests | Encoded body bytes | Decoded body bytes |
| --- | ---: | ---: | ---: |
| HTML | 1 | 1410 | 23096 |
| CSS | 3 | 1746 | 4399 |
| JavaScript | 26 | 10812 | 28519 |
| **Total** | **30** | **13968** | **56014** |

All 30 responses used gzip. Browser protocol: h2.
Browser `transferSize` sum: 22,968 bytes per measured navigation.
That browser API includes an estimated 300 bytes per response of overhead;
it is NOT a packet capture or exact TLS/HTTP2 wire-byte measurement.
Encoded body sum: 13,968 bytes; decoded body sum: 56,014 bytes.
HTML alone: 1,410 gzip bytes / 23,096 decoded bytes.

## Load timings (milliseconds)

| Mode | Run | TTFB | HTML download | DOMContentLoaded | Load | Board ready |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Cold | 1 | 76.70 | 1.60 | 991.20 | 994.20 | 991.10 |
| Cold | 2 | 78.80 | 1.20 | 1064.90 | 1068.70 | 1064.90 |
| Cold | 3 | 77.50 | 1.20 | 987.50 | 992.30 | 987.40 |
| Cold | 4 | 88.60 | 1.30 | 967.30 | 972.00 | 967.20 |
| Cold | 5 | 77.40 | 0.90 | 980.80 | 987.10 | 980.80 |
| Cache-enabled | 1 | 77.80 | 1.20 | 980.20 | 986.30 | 980.00 |
| Cache-enabled | 2 | 75.90 | 0.80 | 978.30 | 983.70 | 978.20 |
| Cache-enabled | 3 | 76.50 | 1.00 | 971.80 | 977.20 | 971.60 |
| Cache-enabled | 4 | 77.30 | 0.30 | 979.10 | 984.10 | 979.00 |
| Cache-enabled | 5 | 79.80 | 1.20 | 987.20 | 991.60 | 987.10 |

### Cold-cache summary (n=5)

| Metric | Min | Median | Max |
| --- | ---: | ---: | ---: |
| TTFB | 76.70 | 77.50 | 88.60 |
| DOMContentLoaded | 967.30 | 987.50 | 1064.90 |
| Load | 972.00 | 992.30 | 1068.70 |
| Board ready | 967.20 | 987.40 | 1064.90 |

### Cache-enabled reload summary (n=5; not verified warm cache)

| Metric | Min | Median | Max |
| --- | ---: | ---: | ---: |
| TTFB | 75.90 | 77.30 | 79.80 |
| DOMContentLoaded | 971.80 | 979.10 | 987.20 |
| Load | 977.20 | 984.10 | 991.60 |
| Board ready | 971.60 | 979.00 | 987.10 |

## Rendering and interactivity limitations

FCP and LCP: unavailable/unreliable. The embedded browser was hidden during
automation, paint entries were absent during sampling, and one late paint
appeared only after the automation batch finished. Do not use it as a metric.

CLS: observer recorded 0, but NOT accepted as a visual-stability baseline
because rendering was suppressed. No claim of zero real-world CLS.

No long tasks (>50 ms) were observed during the ten load sampling windows.
The derived `sum(max(0,duration-50))` was 0 ms in all those windows; this is
NOT a Lighthouse TBT score (no valid FCP/TTI measurement window).

INP, Lighthouse score, mobile performance and field Core Web Vitals: not measured.
No JavaScript `pageerror` events were observed during the ten load runs.

## Synchronous generate-board cost (milliseconds)

Measured on the deployed page at 2026-10-20T22:37:57.485Z.
For EACH difficulty, select it; click Generate board 10 times for warm-up;
then time 100 synchronous `button.click()` calls individually with `performance.now()`.
All editable cells were empty, so no discard confirmation was shown.
Includes generation, DOM value/readonly updates, validation, and focus.
Excludes browser paint, asynchronous input validation and real input latency.
Fixed order EASY, MEDIUM, HARD, EXPERT; JIT warm-up/order and timer resolution
affect these tiny samples. Not an end-to-end interaction benchmark.

| Difficulty | Samples | Min | Median | Mean | P95 | Max |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| EASY | 100 | 0.20 | 0.30 | 0.417 | 1.40 | 2.60 |
| MEDIUM | 100 | 0.10 | 0.20 | 0.245 | 0.30 | 0.40 |
| HARD | 100 | 0.10 | 0.20 | 0.233 | 0.30 | 0.50 |
| EXPERT | 100 | 0.10 | 0.20 | 0.233 | 0.30 | 0.60 |

## Per-asset inventory

| Gzip bytes | Decoded bytes | Path | Decoded SHA-256 |
| ---: | ---: | --- | --- |
| 1410 | 23096 | `/sudoku/` | `442d24c2a85b4efa82ae2b4e4b92b741da181152b95d386a55dfa6bb2e8b1ff8` |
| 902 | 2634 | `/sudoku/css/main.css` | `019bb9ef8dac238a274d5adc6a8bf1b1d5adae3e1ec7a3847e744d777bf53309` |
| 379 | 639 | `/sudoku/css/reset.css` | `ea738e140cf4b7ad00a77d45c1a1614e660ee361d8028ca8aa13789f320b419f` |
| 465 | 1126 | `/sudoku/css/theme.css` | `5dbf71b05ea0d9fd6d4a49c205d24bdb1dd873f1700e9bedf5bb4dd53d67a69c` |
| 2103 | 6742 | `/sudoku/js/constants.js` | `c6dd810f4d81ab58e20eeab108962aa62f51798c4b24dba9033d8042ea06f320` |
| 1483 | 5373 | `/sudoku/js/main.js` | `b292d5a1a70d87015cfd029d5bc3d20951f104ce8c275263b8404afab274cab1` |
| 360 | 1385 | `/sudoku/js/utilities/get-cell-indices-with-error.js` | `93363a020ec916418631f1d1ea1dc67990003c58274273fcf273a9d11fef6142` |
| 459 | 1375 | `/sudoku/js/utilities/get-cell-inputs-info-with-error-in-blocks.js` | `eb5ed7c55a02225ce283254168eed61527fd40897b8614c77fc748e9f6ee5b79` |
| 379 | 1069 | `/sudoku/js/utilities/get-cell-inputs-info-with-error-in-columns.js` | `43428deda37063187798e563d06e4a04d628d5b844b6772962a538dbdb9c1afc` |
| 350 | 881 | `/sudoku/js/utilities/get-cell-inputs-info-with-error-in-rows.js` | `31be53edb7cbd1aa4bad8181ab00e5c66560ec688226bab313ff6c6f9973f410` |
| 335 | 763 | `/sudoku/js/utilities/get-cell-inputs-info-with-error.js` | `b59e31a5af6ec08cbce7e2c08761ea0390faac1b90dcda3d5647239852eef5bd` |
| 208 | 373 | `/sudoku/js/utilities/get-layout-bands.js` | `026c244d5b3b09e399352b44478bb5eec57fc3254fa23b31b83992a8d27ef99d` |
| 221 | 429 | `/sudoku/js/utilities/get-layout.js` | `bbffdf6cf7570c3cd418e4efa8cdb1a78e4d8b591c9b5b7acb84a9f8c3697436` |
| 311 | 765 | `/sudoku/js/utilities/get-populated-puzzle.js` | `344d794a9ba781ec5c491926174cda2d33897250a06805a4291e070500d25347` |
| 189 | 288 | `/sudoku/js/utilities/get-random-item.js` | `4e3c0aeac1289518f6faaa6bdb8534319986bc231399878aaeb387b3de2debce` |
| 250 | 561 | `/sudoku/js/utilities/get-random-puzzle-by-difficulty.js` | `8c433bce2b492c4ee448febf8dd09d418e62e08abcf569649b773e8c5d07b444` |
| 217 | 395 | `/sudoku/js/utilities/get-seeds-by-difficulty.js` | `183623fba10811e95935b7b51df82905228c818d7c9ace214af489e511575146` |
| 320 | 700 | `/sudoku/js/utilities/get-token-map.js` | `cba0418c49370a8c4bebd29053edbdf85ddcc79e32a1970b87b6c335b7445044` |
| 410 | 1130 | `/sudoku/js/utilities/populate-puzzle.js` | `46500c7b869f429693b6fe48311c47cc964a6ebbd46ae8b982719de7196b62bd` |
| 198 | 198 | `/sudoku/js/utilities/rotate-layout-0.js` | `21c62ade9d41071ca39afd6c35078e5c13ba4161d808e31a3861683666cb0fe1` |
| 236 | 387 | `/sudoku/js/utilities/rotate-layout-180.js` | `ea38427ceef186b70631f41f3baf25f1ce040fdbbc3531980347b9de55b4b6f6` |
| 396 | 703 | `/sudoku/js/utilities/rotate-layout-270.js` | `fdd0ced8a602b6fd153b49045f19ea9d03ff15f88bbef380ea72b0ee5ae22915` |
| 386 | 699 | `/sudoku/js/utilities/rotate-layout-90.js` | `467a2591641c122b1a62fbb72c82fb5d6052ced4a511761e587358cf46aa9cbd` |
| 261 | 638 | `/sudoku/js/utilities/rotate-layout.js` | `2ad3fd4e6b5df9134a21c46197290e9f9bacbcf387607e770bd06194a5cee923` |
| 245 | 482 | `/sudoku/js/utilities/shuffle-layout-bands.js` | `9cf28dcb6635e0e2b3b2572f0d2d03944ad57e40a40afc1e3e1e6bac5a40111a` |
| 407 | 859 | `/sudoku/js/utilities/shuffle-layout-columns.js` | `c12dea3a726f4de3882b25a6d88bf7907d088bd1d3c71717aa6392ad01ac778f` |
| 272 | 532 | `/sudoku/js/utilities/shuffle-layout-rows.js` | `801ce63cd3bd813ddc6678f275f9567bbd763f25c1416501e1f4813a05c42146` |
| 405 | 861 | `/sudoku/js/utilities/shuffle-layout-stacks.js` | `6df6f24399deb621b25b8464c8f246c68a9834b965af6d92914656319ee44cfd` |
| 266 | 786 | `/sudoku/js/utilities/shuffle-layout.js` | `11e7ee064c0f374fb5be51fa3d7d8d6825de1f784d5110a6b89f91f5f656d33e` |
| 145 | 145 | `/sudoku/js/utilities/sort-randomly.js` | `3626f5bca8d4b781662f304adef1fb13f69770bf2981e13b5a516040467fa10e` |

## How to compare after deployment

1. Keep this baseline unchanged. Verify the new HTML ETag/hash/entry point
   differs, so you are not comparing a stale CDN deployment.
2. Use the same browser/viewport/device, no added throttling, and the same URL.
   Keep network conditions comparable; CDN routing can affect timings.
3. Repeat five cache-disabled loads with browser cache cleared each time.
   Compare median TTFB, DOMContentLoaded, load and populated-board timings;
   keep individual samples and ranges rather than comparing one request.
4. Sum HTML + CSS + JavaScript `encodedBodySize`/`decodedBodySize` and count
   requests; verify `transferSize`/cache evidence before calling a run warm.
5. Repeat generation timing through the button, not `window.generateNewBoard`:
   the Vite version intentionally does not expose that global function.
6. Use a visible standalone browser or Lighthouse for FCP/LCP/CLS/INP tests.
   Those cannot be compared to this baseline because reliable values are absent.
7. Treat network/CPU timings as environment-dependent lab observations, not
   guarantees or field percentiles. Do not infer bottlenecks solely from size.

No application, deployment configuration, dependencies, or `dist` files were
modified to obtain this baseline. No HTML minification was applied.
