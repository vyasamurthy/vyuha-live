# vyuha.live

Single-page site for VYUHA — physics-constrained placement and continuous
re-adjudication for enterprise AI workloads. Venture Vertex LLC.

## Build

```
python3 build.py      # inlines instruments.js + the VV mark, asserts invariants, writes index.html
node qa.js            # 7 viewports + reduced-motion + reader, fails on overflow/console errors
```

`index.html` is generated. Edit `src.html` (markup + CSS) and `instruments.js`
(the five instruments), then rebuild — never edit `index.html` directly.

## What the build asserts

- both inline script blocks parse (`node --check`)
- no `classList.add("")` — the empty-token crash that shipped on varc.live v1.9.0
- every in-page anchor resolves to a real id
- every id the instruments reach for exists in the markup
- precedence classes appear in repository order: LEGALITY > PHYSICS > DELIVERABILITY > ECONOMICS > PREFERENCE
- all ten modules from the repository's own layer table are present
- the verified figures survive: 99 rendered files, 4,059 test cases
- claims discipline: no customer, prospect or tenant names; no competitor names;
  no patent-pending claim; no key/token patterns
- insight cards and articles match one-to-one

## Instruments

| # | Section | Source of its figures |
|---|---------|----------------------|
| 0 | AI factory workflow | nine stages, owner / artifact / elapsed; tooling-coverage flags show software exists for 3 of 9 |
| 0b | The hand-off | three published category claims, their stage of origin and the stage their cost lands on — mirrors the engine's own Handoffs surface; no vendor named |
| 1 | Derivation chain | illustrative 70B FP8 workload, internally consistent arithmetic |
| 2 | Three-valued adjudication | precedence order verified in `backend/tests/lab` |
| 3 | Energization gate | illustrative sites; the gate logic is the claim |
| 4 | Agent amplification | sampled fan-out draw, explicitly labelled illustrative |
| 5 | Lab fabric stack | the repository's own module table; `99 files written to ./lab-repo` verified by running the renderer |

No measured coefficient values appear anywhere in this site.

## Deploy

GitHub Pages from `main`, custom domain `vyuha.live` (CNAME in repo root).
Apex A records → 185.199.108–111.153; `www` CNAME → `vyasamurthy.github.io`.
