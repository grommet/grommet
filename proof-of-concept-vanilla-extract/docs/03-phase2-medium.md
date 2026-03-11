# Phase 2: Medium Components (Weeks 4–7, ~35 components)

**Target components:**

| Group        | Components                                                     |
| ------------ | -------------------------------------------------------------- |
| Interaction  | Button _(use POC directly)_, CheckBox, RadioButton, RangeInput |
| Layout       | Box _(see note)_, Grid, Stack, Collapsible                     |
| Navigation   | Tabs, Tab, Pagination                                          |
| Data display | List, Meter, Notification, Tip                                 |
| Charts       | Chart, Diagram                                                 |
| Other        | Accordion, WorldMap _(begin Option B path)_                    |

---

## Box — High Risk Item

Box is the largest migration in the codebase. It has 25+ interpolation functions, dynamic
background resolution, responsive breakpoints, gap handling, and animation support.

**Allocate at least 3 days dedicated to Box alone** and treat it as a formal risk item — if
it overruns, defer to Phase 3 and ship Phase 2 without it.

---

## Button — Use POC Directly

The POC `Button.vanilla.tsx` is production-ready. Promote it directly as the Phase 2
starting point — no re-work required.

---

## Phase 2 Checklist

- [ ] Button _(promote POC)_
- [ ] Box _(high risk — see note)_
- [ ] Grid
- [ ] Stack
- [ ] Collapsible
- [ ] Accordion
- [ ] CheckBox
- [ ] RadioButton
- [ ] RangeInput
- [ ] Tabs / Tab
- [ ] Pagination
- [ ] List
- [ ] Meter
- [ ] Notification
- [ ] Tip
- [ ] Chart _(begin Option B: currentColor)_
- [ ] Diagram _(begin Option B: CSS variables)_
- [ ] WorldMap _(begin Option B)_
