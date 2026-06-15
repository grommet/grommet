## Native `<input type="time">` Spike — Findings & Recommendation

We ran a local Storybook spike testing how far `<input type="time">` can be
styled to meet TimeInput design needs before deciding on an architecture.
Here's what we found.

---

### What the spike tested

- Can the field chrome (border, focus ring, icon, states) match Grommet's
  design tokens?
- Can the trigger icon be replaced with a Grommet icon?
- Can the picker popup (dropdown) be styled to match the design system?

---

### Field chrome — fully styleable ✅

Everything on the _input itself_ works through Grommet's existing `TextInput`
wrapper:

- Border, background, focus ring → Grommet theme tokens applied correctly
- Icon slot → Grommet `Clock` icon renders, and the browser's native indicator
  can be made transparent/overlaid so clicking the Grommet icon opens the
  picker
- Disabled, read-only, error states → all work via `FormField`

---

### Picker popup — cannot be styled ❌

The dropdown that opens is rendered by the **browser/OS outside the DOM
entirely**. There is no CSS, pseudo-element, or JS API that reaches inside it.

Specific dead ends:

- `::-webkit-calendar-picker-indicator` — styles the trigger icon on the field
  only, **not** the popup
- `showPicker()` — opens the popup on demand, but gives zero styling control
- `color-scheme: light | dark` — the only influence available; switches
  between the browser's two built-in presets; Grommet design tokens cannot be
  applied
- On **mobile** the popup is a full OS-native wheel/spinner — completely
  outside web styling reach
- No `::part()`, no shadow DOM to pierce, no emerging spec that applies to
  `<input type="time">`

> _"If your design system requires strict brand colors, you must hide the
> native picker entirely and build a custom dropdown."_
> — MDN / community consensus

---

### Comparison table

| Capability                              |  Native `type="time"`   | `MaskedInput` (time mask) | Custom combobox (Option 1) |
| --------------------------------------- | :---------------------: | :-----------------------: | :------------------------: |
| Field border / focus ring               |           ✅            |            ✅             |             ✅             |
| Grommet icon (trigger)                  |   ✅ via CSS overlay    |            ✅             |             ✅             |
| Disabled / error states                 |           ✅            |            ✅             |             ✅             |
| **Picker popup — brand colors / fonts** |    ❌ browser-owned     |    ✅ fully themeable     |     ✅ fully themeable     |
| **Picker popup — layout / spacing**     |           ❌            |            ✅             |             ✅             |
| **Custom step intervals UI**            |           ❌            |            ✅             |             ✅             |
| **Cross-browser consistency**           | ❌ varies by OS/browser |            ✅             |       ✅ consistent        |
| A11y / keyboard navigation              |     ✅ free, native     |     ⚠️ must implement     |     ⚠️ must implement      |
| Build / maintenance cost                |         ✅ low          |         ⚠️ medium         |         ⚠️ higher          |
| **Known open bugs**                     |            —            |   ❌ **yes — unfixed**    |             —              |
| Community usage / test coverage         |          broad          | ⚠️ low — niche component  |            new             |
| Risk of inheriting existing defects     |           low           |          ❌ high          |            low             |

**Key `MaskedInput` bug (open, unassigned):**
[#7043 — MaskedInput / DateInput prevent editing earlier parts of the input](https://github.com/grommet/grommet/issues/7043)
When a user deletes an earlier segment (e.g. the hour in `11:11`) and tries
to re-type, **the cursor jumps to the end of the input and the value is
rejected**. This is a fundamental editing regression that directly affects
time entry and has been open since November 2023 with no fix or assignee.
Because `MaskedInput` is a low-traffic, niche component it carries a higher
risk of undiscovered edge-case bugs and slower fix cycles than a purpose-built
`TimeInput`.

---

### Conclusion

Native `type="time"` is viable as a **no-JS fallback** for progressive
enhancement, but it cannot be the `TimeInput` component for Grommet because we
cannot guarantee the dropdown matches the design system across browsers, OSes,
or mobile.

Building on top of `MaskedInput` is also not recommended. It carries an open,
unassigned cursor-jump bug ([#7043](https://github.com/grommet/grommet/issues/7043))
that directly breaks time editing. Because `MaskedInput` is a low-traffic,
niche component it has lower test coverage and a slower fix cycle — adopting it
as the foundation of a new component means inheriting its existing defects and
risking more undiscovered ones.

**Option 1 — custom combobox — is the only viable path** (styled `TextInput` +
Grommet-themed drop layer with time suggestions). This is not a preference; the
spike and bug research eliminated both alternatives on technical grounds. It is
the same pattern already used by Carbon, Fluent, Ant Design, and Salesforce
SLDS. It gives us full styling control, consistent cross-browser behavior, and
a11y we own and can test.

The native spike code is in
`src/js/components/TextInput/stories/NativeTimeSpike.stories.js` if anyone
wants to run it locally and see the field chrome win / popup ceiling firsthand.
