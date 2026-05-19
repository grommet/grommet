# RFC Implementation Retrospective: Stepper & Wizard

This document captures observations, ambiguities, and recommendations identified during the Phase 1–2 implementation of the Stepper and Wizard components. It is intended as a reference for RFC refinement before maintainer submission.

---

## What Worked Well

**Presentation/orchestration separation.** Stepper as purely presentational and Wizard as the orchestrator is a natural, composable division. The roles stayed clean throughout implementation and never created confusion.

**`StepChangeEvent` model.** The three-phase model (`attempted → completed/blocked`) with full context (`fromStepId`, `toStepId`, `trigger`, `error`) is expressive without being verbose. It gave validation error handling a natural shape and made the controlled mode pattern easy to implement correctly.

**Controlled/uncontrolled alignment with Grommet.** The Form component precedent made expected behavior clear for both components. The pattern translated directly without ambiguity.

**`nextStep()` branching resolver.** A simple function returning a step id is far easier to reason about than a declarative transition map. Elegant to implement and easy for consumers to understand.

---

## What Could Have Gone Better

### Prop Naming Inconsistencies

**Issue 1 — `currentStep` used for different purposes in each component.**

- Stepper: `currentStep` is required and represents the active step id.
- Wizard: `currentStep` is optional and only meaningful in controlled mode.
- During implementation, Wizard used `currentStepId` to disambiguate — a divergence from the RFC.

**Issue 2 — Uncontrolled mode prop has three names.**

- RFC Stepper section: `defaultStep`
- RFC Wizard section: `initialStep`
- Implementation: `defaultStepId`

**Recommendation:** Standardize on `currentStep` for controlled mode and `defaultStep` for uncontrolled mode across both RFC documents and the implementation. Keep any `*Id` naming internal-only where useful for readability.

---

### `showProgress` Type Union Is Awkward

**Current RFC:**

```typescript
showProgress?: boolean | 'horizontal' | 'vertical'  // default: 'horizontal'
```

`boolean | string` unions are difficult to consume. If the default is `'horizontal'`, what does `true` resolve to? And `false` vs `undefined` are two ways to disable the same feature.

**Recommendation:** Replace with:

```typescript
showProgress?: 'horizontal' | 'vertical' | false  // default: false
```

---

### `formValue` vs `formValues` — Internal Inconsistency

The RFC used mixed form state terminology, including `formData` and `formValues` / `setFormValues`. Neither is the closest match to Grommet's existing Form terminology, which centers on `value`. These should use one consistent term throughout.

**Recommendation:** Standardize on `formValue` / `setFormValue` across all interfaces for better alignment with Grommet's Form API.

---

### `confirmOnCancel` Is Underspecified

```typescript
confirmOnCancel?: boolean  // default: true
```

A built-in confirmation implies a modal or dialog — but Grommet has no `Confirm` primitive. The RFC does not specify whether this should use `window.confirm()`, a custom `Layer`, or something else. Using `window.confirm()` would be inappropriate in a design system component.

**Recommendation:** Remove `confirmOnCancel` from the Wizard API and document cancel confirmation as a consumer responsibility, implemented via Grommet's `Layer` component. Provide a story demonstrating the pattern.

---

### Default Rendering Behavior Is Never Defined

The RFC describes subcomponents (`WizardHeader`, `WizardContent`, `WizardFooter`, etc.) but never specifies what `<Wizard steps={steps} />` renders with **no children**. Does it render all subcomponents in a default layout? Which ones? This was the largest source of ambiguity during implementation — stories could not be written until this was decided unilaterally.

**Recommendation:** Add a section to the RFC explicitly documenting the default render tree when no `children` are provided. For example:

```
Default render (no children):
  <WizardHeader />
  <WizardProgress />   (if showProgress !== false)
  <WizardStepHeader />
  <WizardContent />
  <WizardFooter />     (with Prev / Next / Skip / Cancel buttons)
```

---

### `disabledReason` Rendering Spec — APPLIED ✓

`StepType.disabledReason?: string` is now fully specified in the Stepper RFC with:

- **Rendering visibility:** Available to keyboard and screen readers via `aria-describedby`; optionally rendered inline in vertical layouts, on focus/hover in horizontal layouts.
- **Programmatic association:** HTML example with proper ARIA linkage.
- **Content requirements:** Guidelines for writing clear, actionable reason text with good/poor examples.
- **WCAG alignment:** References to relevant success criteria (1.4.1, 1.3.3, 2.1.1, 3.3.2, 4.1.2).
- **Enterprise use cases:** 7 real-world scenarios (permission gating, prerequisites, data dependency, system lock, compliance, timing, async validation).
- **Keyboard behavior:** Disabled steps remain focusable for discoverability; activation prevented but reason announced by screen readers.

See [RFC/stepper/REQUIREMENTS.md § disabledReason Rendering & Accessibility](./stepper/REQUIREMENTS.md#disabledreason-rendering--accessibility).

---

### `StepperError` Subcomponent — APPLIED ✓

`StepperError` has been added to the Stepper RFC subcomponents list with a full spec:

- **Purpose**: Renders `step.errorMessage` as inline error text below the step label when `step.status === 'error'`.
- **Styling**: Uses error color (status-error token) and small font size for visual consistency.
- **Accessibility**: Automatically associated with the step button via `aria-describedby` for screen reader announcement.
- **Type definition**: Exported as `StepperError: React.FC` in the grommet module declaration.

See [RFC/stepper/REQUIREMENTS.md § Subcomponents & Hooks](./stepper/REQUIREMENTS.md#subcomponents--hooks).

---

## Ambiguous Design Details — All Resolved ✓

| Area                                                | Ambiguity                                          | Resolution                                                  |
| --------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| **`error` type in `StepChangeEvent`**               | `error?: unknown` too loose for consumer use.      | ✓ Narrowed to `error?: Error \| string`                     |
| **`goTo()` validation**                             | Unclear if backward jumps validate current step.   | ✓ Specified: backward skips validation; forward validates   |
| **`onCancel` reason vs. `StepChangeEvent` trigger** | Two different cancel signatures across interfaces. | ✓ Unified with `reason?: 'user'` field in `StepChangeEvent` |
| **`cancelTimeoutMs` behavior**                      | Underspecified timeout cancellation.               | ✓ Removed from v1; added to Future Capabilities             |
| **Wizard → Stepper state mapping**                  | Unclear how step statuses are derived.             | ✓ Added formal mapping table in Stepper Integration section |

---

## Highest Priority Fixes Before Submission

1. **Standardize on `currentStep`** as the public controlled prop across both components and all RFC sections. ✓
2. **Replace `initialStep` with `defaultStep`** (or document a single chosen convention). ✓
3. **Replace `boolean | string` union for `showProgress`** with `'horizontal' | 'vertical' | false` and make `false` the default. ✓
4. **Define default rendering behavior** — document what `<Wizard steps={steps} />` renders with no children. ✓
5. **Add rendering spec for `disabledReason`** — specify visibility, `aria-describedby` association, content requirements, WCAG alignment, and keyboard behavior. ✓
6. **Align form state terminology** on `formValue` / `setFormValue` across all interfaces. ✓
7. **Remove or re-scope `confirmOnCancel`** — document cancel confirmation as a consumer responsibility. ✓
8. **Add `StepperError`** to the subcomponents list in the Stepper RFC. ✓

---

## Summary

The core architecture — presentation/orchestration separation, context-based composition, controlled/uncontrolled support, and the `StepChangeEvent` model — is solid and validated through implementation. The ambiguities that surfaced are primarily naming inconsistencies, underspecified edge cases, and missing rendering defaults. None require architectural changes; all are resolvable with targeted RFC updates before the next implementation phase.
