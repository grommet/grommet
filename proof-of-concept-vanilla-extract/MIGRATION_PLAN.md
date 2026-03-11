# Grommet → Vanilla Extract Migration Plan

**Date**: March 11, 2026  
**Branch**: `copilot-help-vanilla-extract`  
**Status**: Approved — ready for execution  
**Version target**: v3.0.0 (major version bump — breaking change release)

---

## Decisions (Finalized)

| #   | Question                 | Decision                                                                                                              |
| --- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Distribution build tool  | **Vite library mode**                                                                                                 |
| 2   | Runtime theme strategy   | **Option A** — custom `GrommetThemeContext` (React context)                                                           |
| 3   | `generate()` deprecation | **Keep working** (returns JS object for `deepMerge`); remove effect on VE CSS output; dev-mode warning on custom args |
| 4   | `ThemeContext.Extend`    | **Keep for Phase 1** — re-implemented as wrapper around new context                                                   |
| 5   | Backward compatibility   | **Yes, ~90%** — exceptions documented in breaking changes table                                                       |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Consumer App                                               │
│                                                             │
│  <Grommet theme={deepMerge(grommet, customTokens)}>         │
│    <GrommetThemeContext.Provider value={mergedTheme}>       │
│      <Component className={recipe(...)} style={extendShim}> │
│    </GrommetThemeContext.Provider>                           │
│  </Grommet>                                                 │
└─────────────────────────────────────────────────────────────┘

Runtime (Option A — Phase 1):
  - GrommetThemeContext  →  plain React.createContext()
  - normalizeColor()     →  unchanged, reads from context
  - VE CSS              →  static, pre-compiled from generate(24, 6)
  - theme.X.extend      →  degraded shim via inline style + dev warning

Long-term target (Option B — Future major version):
  - All tokens           →  CSS custom properties via createTheme()
  - Dark/light mode      →  CSS class swap on root element
  - normalizeColor()     →  removed from runtime bundle
  - SVG components       →  currentColor + CSS variable references
```

---

## Rollback / Escape Hatches

| Scenario                                     | Mitigation                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| VE + Vite build failure                      | Fall back to `@vanilla-extract/rollup-plugin` with existing Rollup config                             |
| Component migration stalls mid-phase         | Continue using `StyledX.js` updated to import from `GrommetThemeContext` — partial migration can ship |
| Box overruns Phase 2 timeline                | Defer Box to Phase 3 — ship Phase 2 without it                                                        |
| Critical consumer regression found post-beta | `ThemeContext.Extend` and `generate()` shims can be hardened without a new major version bump         |

---

## Execution Plan

### [Phase 0: Infrastructure](./docs/00-infrastructure.md) (Weeks 1–2)

Hard blockers — no component migration can begin until complete.

- Vite library mode build config
- `GrommetThemeContext` custom React context
- Static VE theme contract
- Shared CSS utility migration
- Shared internal utilities (`cx`, `resolveExtend`)
- Test infrastructure

### [Test Strategy](./docs/01-test-strategy.md)

Layers, acceptance criteria, snapshot policy, consumer compatibility suite.

### [Phase 1: Simple Components](./docs/02-phase1-simple.md) (Weeks 2–4, ~20 components)

Typography, media, indicators, navigation, layout.

### [Phase 2: Medium Components](./docs/03-phase2-medium.md) (Weeks 4–7, ~35 components)

Interaction, layout (Box — high risk), navigation, data display, charts.

### [Phase 3: Complex Components](./docs/04-phase3-complex.md) (Weeks 7–9, ~24 components)

Forms, selects, date/time, overlays, data tables, media, SVG/canvas (Option B start).

### [Phase 4: Release](./docs/05-release.md) (Week 10)

Dependency cleanup, Storybook audit, documentation, release sequence.

---

## Reference Documentation

- [Breaking Changes & Backward Compatibility](./docs/breaking-changes.md)
- [Consumer Migration Guide](./docs/migration-guide.md)
- [Performance Expectations](./docs/performance.md)

---

## Resources

- [POC Button](./button.css.ts)
- [POC Theme Contract](./theme.contract.css.ts)
- [POC Theme Implementation](./grommet.theme.css.ts)
- [POC Migrated Button Component](./Button.vanilla.tsx)
- [Plan Review Summary](./PLAN_REVIEW_SUMMARY.md)
- [Vanilla Extract Docs](https://vanilla-extract.style/)
