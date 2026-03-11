# Phase 3: Complex Components (Weeks 7–9, ~24 components)

**Target components:**

| Group     | Components                                                   |
| --------- | ------------------------------------------------------------ |
| Forms     | Form, FormField, TextInput, TextArea, MaskedInput, FileInput |
| Selects   | Select, SelectMultiple                                       |
| Date/Time | DateInput, Calendar                                          |
| Overlay   | Layer, Drop, Menu                                            |
| Data      | DataTable, DataChart, Distribution                           |
| Media     | Carousel, Video                                              |
| Utility   | Skeleton                                                     |

---

## Special Cases

### Layer / Drop — Theme Re-Provision

These re-provide the theme context with `dark` toggled when the background changes. The
`GrommetThemeContext.Provider` re-wrap pattern must be verified for correctness before
starting these components.

```jsx
// Pattern for Layer dark-region re-provision
<ThemeContext.Provider value={{ ...theme, dark: backgroundIsDark }}>
  {children}
</ThemeContext.Provider>
```

---

## SVG/Canvas Components — Option B Migration Start

For `Chart`, `Diagram`, `WorldMap`, `DataChart`, `Distribution` — begin replacing explicit
`fill`/`stroke` hex attribute values with `currentColor` and CSS custom property references
where the SVG rendering engine allows it.

```jsx
// Before (SC runtime):
<circle fill={normalizeColor('brand', theme)} />

// After (Option B target):
<circle fill="currentColor" style={{ color: vars.color.brand }} />
```

---

## Phase 3 Checklist

- [ ] Form / FormField
- [ ] TextInput / TextArea / MaskedInput / FileInput
- [ ] Select / SelectMultiple
- [ ] DateInput / Calendar
- [ ] Layer
- [ ] Drop
- [ ] Menu
- [ ] DataTable
- [ ] DataChart / Distribution
- [ ] Carousel / Video
- [ ] Skeleton
- [ ] Box _(if deferred from Phase 2)_
