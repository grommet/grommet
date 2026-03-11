# Breaking Changes & Backward Compatibility

## Breaking Changes

| Change                                                                  | Affected consumers                                 | Mitigation                                                          |
| ----------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------- |
| `styled-components` no longer a peer dependency                         | All consumers                                      | Remove from app — see migration guide                               |
| `theme.X.extend` pseudo-selectors / media queries silently ignored      | Consumers using complex `extend`                   | Dev warning identifies dropped rules; migrate to `className` prop   |
| `theme.X.extend` deprecated                                             | All consumers using `extend`                       | Dev warning points to `className` migration guide                   |
| `generate(customBaseSpacing, customScale)` no longer affects CSS output | Ecosystem forks (HPE Aries etc.)                   | Dev warning emitted; JS object still returned for context overrides |
| `ThemeContext` no longer re-exports styled-components' context          | Consumers using SC-specific APIs on `ThemeContext` | Documented in release notes                                         |

---

## Internal Changes (No Consumer Impact)

| Change                             | Notes                            |
| ---------------------------------- | -------------------------------- |
| `passThemeFlag` pattern eliminated | Internal only — not a public API |
| `StyledX.js` files removed         | Internal implementation detail   |

---

## Backward Compatibility

### What Works Unchanged (~90% of consumers)

- `import { ThemeContext } from 'grommet/contexts'` — same shape, new implementation
- `<ThemeContext.Extend value={...}>` — re-implemented, identical public API
- `generate()` with default args — still exported, callable, returns merge-able JS object
- `deepMerge(grommet, customTokens)` theme overrides — still work via runtime context
- All component props — unchanged
- `theme.X.extend` simple flat string values — shim applies as inline style

---

### What Breaks (~10% of consumers)

- `theme.X.extend` with pseudo-selectors or media queries — dropped by shim
- Direct use of styled-components APIs on `ThemeContext`
- Apps listing `styled-components` as a peer or direct dependency
