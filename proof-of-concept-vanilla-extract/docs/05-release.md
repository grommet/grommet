# Phase 4: Release (Week 10)

## Dependency Cleanup

```json
// package.json changes
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
    // REMOVED: "styled-components": ">=5"
  },
  "devDependencies": {
    // REMOVED: "jest-styled-components"
    // REMOVED: "babel-plugin-styled-components"
  },
  "dependencies": {
    // REMOVED: "@emotion/is-prop-valid"
  }
}
```

**Checklist:**

- [ ] Confirm major version number — replace all `v3.0.0` references if changed
- [ ] Remove `styled-components` from `peerDependencies`
- [ ] Remove `@emotion/is-prop-valid`
- [ ] Remove `babel-plugin-styled-components`
- [ ] Remove `jest-styled-components`
- [ ] Verify `styled-components` is not imported anywhere in `src/`
- [ ] Full test suite green
- [ ] Bundle size audit — confirm ~35–40kB reduction
- [ ] Consumer app smoke test

---

## Storybook Audit

Storybook is tightly coupled to styled-components across many stories (SC decorators,
`withTheme`, theme knobs). This requires a dedicated audit pass — it is not a single line
change.

**Checklist:**

- [ ] Audit all stories for SC decorator usage
- [ ] Remove SC global decorator from `.storybook/preview.js`
- [ ] Update theme knob stories to use new `GrommetThemeContext` directly
- [ ] Verify Storybook builds cleanly with no SC dependency
- [ ] Update `parameters.docs.source.code` story source fields

---

## Documentation

**Checklist:**

- [ ] Write `MIGRATION_GUIDE.md` (see [migration-guide.md](./migration-guide.md))
- [ ] Update `README.md` — remove SC references
- [ ] Changelog entry
- [ ] Announce to known ecosystem consumers (HPE Aries etc.) before stable release

---

## Release Sequence

- [ ] Major version bump to `v3.0.0`
- [ ] Beta release tag — `v3.0.0-beta.1`
- [ ] 2-week beta soak period
- [ ] Stable release — `v3.0.0`
