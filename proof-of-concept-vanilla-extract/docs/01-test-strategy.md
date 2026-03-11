# Test Strategy

## Layers

| Layer                  | Tooling                         | Trigger                              |
| ---------------------- | ------------------------------- | ------------------------------------ |
| Unit                   | Vitest                          | Every commit                         |
| Component              | Vitest + React Testing Library  | Every commit                         |
| Integration            | Vitest                          | Every PR                             |
| Visual regression      | Chromatic                       | Every PR — approval required         |
| Consumer compatibility | Vitest (against published beta) | Pre-release                          |
| Bundle size            | `size-limit`                    | Every PR — fails on regression > 1kB |

---

## Per-Component Acceptance Criteria

A component migration is **done** when all of the following are true:

1. `StyledX.js` deleted — no styled-components import in the component tree
2. All existing unit tests pass without modification (snapshots excepted)
3. Visual diff approved in Chromatic against `main` baseline
4. `theme.X.extend` shim emits correct warning (unit tested)
5. `className` prop merges correctly with VE recipe output (unit tested)
6. Component tree-shakes cleanly in a minimal consumer build

---

## Snapshot Policy

Snapshots may only be regenerated **after** a Chromatic visual approval exists
for the same PR. Bulk regeneration without a corresponding visual approval
is not permitted. Each changed snapshot must be individually reviewed in the PR.

---

## Consumer Compatibility Suite

Location: `src/__tests__/backward-compat/`

Run against the **published beta package** (not source) to catch packaging issues.

| File                          | Covers                                              |
| ----------------------------- | --------------------------------------------------- |
| `ThemeContext.Extend.test.js` | Nesting, deepMerge, multiple levels                 |
| `generate.shim.test.js`       | Custom args warning, return shape unchanged         |
| `theme.extend.shim.test.js`   | String, function, array, pseudo-selector warning    |
| `consumer-app.smoke.test.js`  | Minimal Grommet app renders with zero SC dependency |
