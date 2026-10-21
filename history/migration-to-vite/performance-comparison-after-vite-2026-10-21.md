# Deployed Sudoku performance comparison: after Vite

- **URL:** <https://vasilii-kovalev.github.io/sudoku/>
- **Previous baseline:** [Before Vite](./performance-baseline-before-vite-2026-10-21.md)
  (measurements unchanged).
- **Current load samples captured (UTC):** 2026-10-20T23:06:15.830Z
- **Current asset verification completed (UTC):** 2026-10-20T23:07:21.837Z
- **Scope:** actual live deployment, not local build estimates.

## Summary

- The new deployment loads **3 resources instead of 30 (-90%)**.
- Gzip body bytes fell from **13,968 to 6,145 (-56.01%)**.
- Decoded body bytes fell from **56,014 to 33,031 (-41.03%)**.
- Median cold-cache board-ready time fell from **987.40 to 172.60 ms (-82.52%)**.
- Median cold-cache load time fell from **992.30 to 173.60 ms (-82.51%)**.
- Those timings are about **5.7x faster** in these desktop lab observations.
- TTFB was essentially unchanged: 77.50 to 75.90 ms.

The large improvement is consistent with bundling away the many dependent
module requests and reducing JavaScript payload, rather than faster hosting.
This is a plausible explanation, not an isolated causal experiment.
TypeScript itself does not execute in the browser or inherently speed up JS.
There is no reliable evidence here of a gameplay performance regression:
the tiny generation benchmark varied considerably across batches (see below).

## Deployment identity

- **Old HTML Last-Modified:** Wed, 11 Dec 2024 04:53:12 GMT.
- **New HTML Last-Modified:** Tue, 20 Oct 2026 23:02:42 GMT.
- **Old HTML ETag:** `W/"67591ab8-5a38"`
- **New HTML ETag:** `W/"6ad7f312-5090"`
- **Old HTML SHA-256:** `442d24c2a85b4efa82ae2b4e4b92b741da181152b95d386a55dfa6bb2e8b1ff8`
- **New HTML SHA-256:** `4d60a0378c4334e346c09e175411281b3d0a4f92fbb046eff40df1c65d28daae`
- **New entry point:** `/sudoku/assets/index-8cAoamtL.js`
- **New stylesheet:** `/sudoku/assets/index-Dv4bakve.css`

All three requests returned HTTP 200, gzip encoding, and correct MIME types.
JavaScript MIME type: `application/javascript; charset=utf-8`.
Cache-Control: `max-age=600`.
Independent Node HTTPS GETs verified every encoded and decoded body length
against browser Resource Timing, so these are the actual deployed assets.

## Size comparison (exact bytes)

| Metric                     |     Before |      After |  Reduction |
| -------------------------- | ---------: | ---------: | ---------: |
| Requests                   |         30 |          3 |     90.00% |
| HTML gzip                  |      1,410 |      1,383 |      1.91% |
| CSS gzip                   |      1,746 |      1,173 |     32.82% |
| JavaScript gzip            |     10,812 |      3,589 |     66.81% |
| **Total gzip bodies**      | **13,968** |  **6,145** | **56.01%** |
| HTML decoded               |     23,096 |     20,624 |     10.70% |
| CSS decoded                |      4,399 |      3,441 |     21.78% |
| JavaScript decoded         |     28,519 |      8,966 |     68.56% |
| **Total decoded bodies**   | **56,014** | **33,031** | **41.03%** |
| Browser `transferSize` sum |     22,968 |      7,045 |     69.33% |

Before: 1 HTML + 3 CSS + 26 JavaScript files.
After: 1 HTML + 1 CSS + 1 JavaScript file.
Browser `transferSize` uses estimated response overhead (300 bytes/response).
It is NOT a packet capture or exact HTTP/2/TLS wire-byte measurement.
All observed resources used HTTP/2.
HTML whitespace remains, but its gzip body is only 1,383 bytes; JavaScript
bundling/minification and fewer requests provided the much larger savings.

## Timing method and comparability

Same live URL, Windows x64, Node.js v26.11.1, and VS Code integrated browser.
Same browser user agent:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
Code/1.142.0 Chrome/150.0.7871.250 Electron/43.7.7 Safari/537.36
```

Viewport matched to 1456 x 1253 CSS pixels; device pixel ratio matched to 1.5.
`navigator.hardwareConcurrency`: 32.
No CPU or network throttling configured. DNS/TLS/CDN caches may be warm.

Five cold HTTP-cache runs: `Network.setCacheDisabled(true)`, then
`Network.clearBrowserCache` before each `page.reload({waitUntil:'load'})`.
Five cache-enabled attempts: `setCacheDisabled(false)`, a priming reload, then
five measured reloads. Zero browser cache hits in ALL measured attempts,
as in the old baseline. These are NOT genuine warm-cache measurements.
All current runs transferred 6,145 body bytes and 33,031 decoded bytes.
Read timing entries after populated-board detection and a 350 ms wait.

TTFB = Navigation Timing responseStart relative to navigation start.
DOMContentLoaded/load = corresponding eventEnd from navigation start.
Board-ready = MutationObserver sees 81 `input.cell` elements and a readonly clue;
it measures populated DOM, NOT visible paint.

Important difference: the previous baseline browser was hidden during sampling;
this run was visible. Rendering/scheduling conditions therefore differ.
The request/byte savings are directly verified, while timing speedups are
environment-dependent observations, not an exact controlled speedup guarantee.
Only five samples per mode; no statistical significance or field claim.
An initial exploratory run used DPR approximately 1.0 and was excluded.
All numbers reported here use the corrected DPR 1.5 run.

## Current individual load samples (milliseconds)

| Mode          | Run |  TTFB | DOMContentLoaded |   Load | Board ready |
| ------------- | --: | ----: | ---------------: | -----: | ----------: |
| Cold          |   1 | 75.50 |           169.60 | 171.00 |      169.50 |
| Cold          |   2 | 76.70 |           173.90 | 174.50 |      173.80 |
| Cold          |   3 | 75.90 |           164.50 | 167.80 |      164.40 |
| Cold          |   4 | 75.80 |           179.90 | 181.10 |      179.90 |
| Cold          |   5 | 78.00 |           172.70 | 173.60 |      172.60 |
| Cache-enabled |   1 | 78.50 |           168.00 | 171.10 |      167.90 |
| Cache-enabled |   2 | 84.10 |           182.70 | 184.10 |      182.60 |
| Cache-enabled |   3 | 79.30 |           169.10 | 172.60 |      169.00 |
| Cache-enabled |   4 | 80.50 |           177.60 | 181.80 |      177.50 |
| Cache-enabled |   5 | 78.50 |           174.30 | 176.00 |      174.30 |

## Median timing comparison (milliseconds; n=5 each)

| Metric                    | Before |  After | Reduction |
| ------------------------- | -----: | -----: | --------: |
| Cold TTFB                 |  77.50 |  75.90 |     2.06% |
| Cold DOMContentLoaded     | 987.50 | 172.70 |    82.51% |
| Cold load                 | 992.30 | 173.60 |    82.51% |
| Cold board ready          | 987.40 | 172.60 |    82.52% |
| Cache-enabled TTFB        |  77.30 |  79.30 |    -2.59% |
| Cache-enabled DCL         | 979.10 | 174.30 |    82.20% |
| Cache-enabled load        | 984.10 | 176.00 |    82.12% |
| Cache-enabled board ready | 979.00 | 174.30 |    82.20% |

Cold load range: before 972.00-1068.70 ms; after 167.80-181.10 ms.
Cold board-ready range: before 967.20-1064.90 ms; after 164.40-179.90 ms.

## Rendering and errors

Current cold FCP samples: 192, 200, 204, 200, 200 ms (median 200 ms).
Current cold LCP samples: 192, 200, 204, 200, 200 ms (median 200 ms).
Current cache-enabled FCP/LCP samples: 208, 204, 188, 204, 196 ms.
These are short-window observations (350 ms post-board-ready), not a full
Lighthouse audit or finalized field LCP. No comparable old paint values exist.
Current CLS observer recorded 0 in these short windows; old CLS was unreliable.
No JavaScript `pageerror` events or non-success HTTP responses in this test.
No long tasks over 50 ms in any of the ten current load windows, as previously.
No valid before/after INP, Lighthouse score, mobile score, or field CWV results.

## Synchronous board generation (milliseconds)

Same baseline method: per difficulty in order EASY, MEDIUM, HARD, EXPERT,
10 warm-up `button.click()` calls then 100 individually timed calls.
Used the Generate board button, not a removed window global.
No editable values entered and no discard confirmations.
Includes generation, DOM updates, validation and focus; excludes paint,
asynchronous input validation and real user input latency.
Initial current batch UTC: 2026-10-20T23:06:31.939Z.

| Difficulty | Old median | New median | Old mean | New mean | Old P95 | New P95 |
| ---------- | ---------: | ---------: | -------: | -------: | ------: | ------: |
| EASY       |       0.30 |       0.40 |    0.417 |    0.470 |    1.40 |    1.10 |
| MEDIUM     |       0.20 |       1.20 |    0.245 |    1.243 |    0.30 |    2.20 |
| HARD       |       0.20 |       1.10 |    0.233 |    1.193 |    0.30 |    2.00 |
| EXPERT     |       0.20 |       0.40 |    0.233 |    0.610 |    0.30 |    1.50 |

The initial batch looked slower. To avoid drawing a conclusion from noisy
sub-millisecond measurements, repeated the same four-difficulty batch three
more times, each with its own 10 warm-ups + 100 samples per difficulty.
Follow-up batches completed at 2026-10-20T23:07:04.628Z.

| Repeat | Difficulty | Median |  Mean |  P95 |  Max |
| ------ | ---------- | -----: | ----: | ---: | ---: |
| 1      | EASY       |   0.10 | 0.136 | 0.20 | 0.40 |
| 1      | MEDIUM     |   0.10 | 0.115 | 0.20 | 0.40 |
| 1      | HARD       |   0.10 | 0.107 | 0.20 | 0.30 |
| 1      | EXPERT     |   0.10 | 0.096 | 0.20 | 0.20 |
| 2      | EASY       |   0.10 | 0.117 | 0.20 | 0.40 |
| 2      | MEDIUM     |   0.10 | 0.109 | 0.20 | 0.30 |
| 2      | HARD       |   0.10 | 0.102 | 0.20 | 0.30 |
| 2      | EXPERT     |   0.10 | 0.102 | 0.20 | 0.50 |
| 3      | EASY       |   0.10 | 0.142 | 0.20 | 0.40 |
| 3      | MEDIUM     |   0.10 | 0.137 | 0.20 | 0.40 |
| 3      | HARD       |   0.10 | 0.159 | 0.20 | 2.90 |
| 3      | EXPERT     |   0.10 | 0.106 | 0.20 | 0.50 |

All 12 follow-up medians were approximately 0.10 ms, with P95 0.20 ms.
Some samples rounded to zero: duration was below timer resolution, not zero work.
JIT warm-up, scheduling, random puzzles, rendering visibility, timer resolution
and shared-machine load can influence these tiny timings.
The original version had only one recorded generation batch, so comparing
its first batch against only the new version's warmed repeats is not fair.
Keep BOTH the initial batch and repeats; do not claim a stable generation
speedup or regression from these data. Interactive cost remains very small.

## Current asset inventory

| Gzip bytes | Decoded bytes | Path                                | Decoded SHA-256                                                    |
| ---------: | ------------: | ----------------------------------- | ------------------------------------------------------------------ |
|       1383 |         20624 | `/sudoku/`                          | `4d60a0378c4334e346c09e175411281b3d0a4f92fbb046eff40df1c65d28daae` |
|       1173 |          3441 | `/sudoku/assets/index-Dv4bakve.css` | `0dc0d6cc6e378d6618eea110806de5ee80140d8edb80650521b2426a7b2469a7` |
|       3589 |          8966 | `/sudoku/assets/index-8cAoamtL.js`  | `ede6b058c9e8fa29df6952b7bdd8e8bd70ef35a390d4568e18972ae09cad5123` |

## Conclusion

The migration substantially reduced requests and shipped bytes, with much
faster observed startup and nearly unchanged TTFB. The load improvement is
the meaningful result here. Gameplay computation was already fast, and its
small benchmark is too variable to support a reliable before/after claim.
HTML minification remains a relatively small opportunity: the full deployed
HTML is already only 1,383 gzip bytes.

No source, dependency, deployment, build artifact, or previous baseline files
were modified for this comparison. This report is the only workspace change.
