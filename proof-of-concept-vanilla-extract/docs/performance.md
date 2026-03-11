# Performance Expectations

## Option A (Phase 1)

| Metric               | Expected Gain               | Source                                                                     |
| -------------------- | --------------------------- | -------------------------------------------------------------------------- |
| Consumer bundle      | ~35–40kB smaller            | styled-components removed from peerDeps                                    |
| Grommet own bundle   | ~20–30% smaller             | Removes Styled\*.js template bodies and CSS-gen utils                      |
| Per-render CPU       | Large reduction             | All 17–25+ interpolation functions eliminated per component render         |
| Initial paint        | Moderate improvement        | CSS loads as static file vs. injected after JS executes                    |
| Memory               | Moderate reduction          | SC's in-memory StyleSheet cache eliminated                                 |
| Re-render speed      | Significant                 | Box/Button re-renders go from executing 25 functions to a classname lookup |
| SSR / RSC compatible | No (React context required) | Runtime context still needed for normalizeColor and dark mode              |

---

## Option B (Future)

| Metric               | Expected Gain       | Source                                    |
| -------------------- | ------------------- | ----------------------------------------- |
| Consumer bundle      | ~55–65kB smaller    | SC removed + normalizeColor removed       |
| Grommet own bundle   | ~45–55% smaller     | Theme JS object (~2,552 lines) eliminated |
| Per-render CPU       | Maximum reduction   | Zero runtime theme resolution             |
| Initial paint        | Large improvement   | All styles static, dark mode is CSS class |
| Re-render speed      | Maximum improvement | Zero runtime style computation            |
| SSR / RSC compatible | Yes                 | No React context, fully static CSS        |

> **Note**: Option A delivers meaningful real-world improvements immediately. Option B
> numbers assume SVG components fully migrated to `currentColor` + CSS vars and
> `normalizeColor` removed from the runtime bundle entirely.
