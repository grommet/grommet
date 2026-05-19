# RFC Refinement Changelog

**Date:** May 2026  
**Phase:** Post-Implementation Retrospective Refinements (v1.0 -> v1.2)  
**Scope:** Stepper & Wizard RFCs + Implementation Retrospective + Feedback Closure

This document captures all refinements made to the Stepper and Wizard RFCs following the completion of the implementation retrospective. All changes address ambiguities, inconsistencies, and underspecified behaviors identified during Phase 1–2 implementation.

---

## Summary of Changes

| #   | Area          | Change                                                                      | Impact                                                           | Status |
| --- | ------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| 1   | Naming        | Standardized `currentStep` across Stepper & Wizard                          | Consistency, reduced confusion                                   | ✓      |
| 2   | Naming        | Replaced `initialStep` with `defaultStep`                                   | Alignment with Grommet Form conventions                          | ✓      |
| 3   | Props         | `showProgress`: `boolean \| string` → `'horizontal' \| 'vertical' \| false` | Clearer semantics, type safety                                   | ✓      |
| 4   | Rendering     | Documented default render tree when no children provided                    | Eliminated largest implementation ambiguity                      | ✓      |
| 5   | Accessibility | Added `disabledReason` rendering spec with WCAG alignment                   | Enterprise-ready disabled state UX                               | ✓      |
| 6   | Terminology   | Standardized form state on `formValue` / `setFormValue`                     | Consistency with Grommet Form API                                | ✓      |
| 7   | Scope         | Removed `confirmOnCancel` prop; documented as consumer responsibility       | Clearer separation of concerns                                   | ✓      |
| 8   | Subcomponents | Added `StepperError` component specification                                | Support for step-level error messaging                           | ✓      |
| 9   | Type Safety   | Narrowed `error` type: `unknown` → `Error \| string`                        | Predictable consumer error handling                              | ✓      |
| 10  | Navigation    | Specified direction-aware `goTo()` validation behavior                      | Eliminated validation ambiguity                                  | ✓      |
| 11  | Events        | Unified `onCancel` signatures across interfaces                             | Consistent cancel reason handling                                | ✓      |
| 12  | Scope         | Removed `cancelTimeoutMs` from v1; moved to Future Capabilities             | Simplified v1 scope, deferred complexity                         | ✓      |
| 13  | Integration   | Added formal Wizard -> Stepper state mapping table                          | Explicit derivation contract                                     | ✓      |
| 14  | Behavior      | Added normative `scrollToTop` behavior contract                             | Deterministic and accessible transition scrolling                | ✓      |
| 15  | Accessibility | Added strong fallback for collapsed Stepper labels                          | Touch and keyboard users no longer depend on tooltip-only labels | ✓      |
| 16  | Navigation    | Declared v1 policy fixed/non-configurable                                   | Removed policy ambiguity without expanding API scope             | ✓      |
| 17  | Type Safety   | Added end-to-end generic typing (`TFormValue`) across Wizard surfaces       | Stronger compile-time safety with backward-compatible defaults   | ✓      |
| 18  | Events        | Upgraded `StepChangeEvent` to discriminated union model                     | Safer event handling for transition vs terminal triggers         | ✓      |

---

## Detailed Changes by Component

### 1. Stepper Component (`RFC/stepper/REQUIREMENTS.md`)

#### 1.1 — Subcomponents: Added `StepperError` Specification

**Rationale:** Implementation revealed need for step-level error messaging separate from step status.

**Change:**

- Added new subcomponent `<StepperError />` to the Subcomponents & Hooks section
- Specification includes:
  - Purpose: Render `step.errorMessage` as inline error text
  - Styling: Error color (status-error token) + small font size
  - Accessibility: Automatic `aria-describedby` association with step button
  - TypeScript export: `const StepperError: React.FC`

**Files Modified:**

- RFC/stepper/REQUIREMENTS.md (Subcomponents & Hooks section)

---

#### 1.2 — disabledReason: Comprehensive Rendering & Accessibility Specification

**Rationale:** `disabledReason?: string` was present but had no rendering or accessibility guidance, leaving implementation details ambiguous.

**Change:**

- Added new subsection: "disabledReason Rendering & Accessibility"
- Includes:
  - **Rendering Specification:** `aria-describedby` pattern with HTML example
  - **Visibility Rules:** Inline in vertical layouts; on focus/hover in horizontal layouts
  - **Content Requirements:** Guidelines with good/poor examples ("Complete Account Setup first." vs. "Unavailable")
  - **WCAG Alignment:** References to 5 success criteria (1.4.1, 1.3.3, 2.1.1, 3.3.2, 4.1.2)
  - **Enterprise Use Cases:** 7 real-world scenarios—permission gating, prerequisites, data dependency, system lock, compliance, timing, async validation
  - **Keyboard Behavior:** Disabled steps remain focusable for discoverability; activation prevented

**Files Modified:**

- RFC/stepper/REQUIREMENTS.md (~lines 583–660)

---

#### 1.3 — Responsive Collapse: Strong Fallback Requirements

**Rationale:** Tooltip-first collapsed labels are insufficient for touch and some keyboard flows.

**Change:**

- Updated responsive adaptation rules for constrained layouts to ensure tooltip content is supplemental only.
- Added explicit strong fallback requirements:
  - non-tooltip label access for touch interactions
  - keyboard-triggered label reveal path
  - programmatic label availability for assistive tech
  - optional expandable summary/panel pattern for constrained contexts

**Rationale:**

- Prevents hover-only access patterns.
- Aligns collapse behavior with accessibility requirements across input modes.

**Files Modified:**

- RFC/stepper/REQUIREMENTS.md (Horizontal/Vertical responsive adaptation sections)

---

### 2. Wizard Component (`RFC/wizard/REQUIREMENTS.md`)

#### 2.1 — Props: Replaced `showProgress` Union Type

**Rationale:** `boolean | string` union is difficult for consumers to reason about; default value was ambiguous.

**Change:**

- **Before:** `showProgress?: boolean | 'horizontal' | 'vertical'` (default: `'horizontal'`)
- **After:** `showProgress?: 'horizontal' | 'vertical' | false` (default: `false`)

**Rationale:**

- Eliminates ambiguity: `true` no longer a valid value
- Clearer intent: `false` explicitly disables progress display
- Matches TypeScript best practices for unions

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (WizardProps interface × 2 locations)

---

#### 2.2 — Props: Removed `confirmOnCancel`

**Rationale:** Built-in confirmation implies a modal/dialog UI that Grommet does not provide; spec was incomplete.

**Change:**

- Removed `confirmOnCancel?: boolean` from WizardProps
- Updated documentation: Cancel confirmation is now a consumer responsibility
- Added guidance: Use Grommet's `Layer` component to implement custom confirmation pattern

**Rationale:**

- Stepper/Wizard should not own confirmation UX
- Consumers have full control over confirmation trigger, message, and callback
- Provides example story demonstrating the pattern with Layer

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (WizardProps interface, Props subsection, Example section)

---

#### 2.3 — Props: Removed `cancelTimeoutMs` from v1 Scope

**Rationale:** Underspecified timeout behavior; unclear interaction with other props; deferred to v2.

**Change:**

- Removed `cancelTimeoutMs?: number` from WizardProps interface (3 locations)
- Updated `onCancel` callback signature: `(reason: 'user' | 'timeout')` → `(reason: 'user')`
- Updated `StepChangeEvent.reason` field: `'user' | 'timeout'` → `'user'`
- Moved "Automatic Cancellation on Timeout" to Future Capabilities section with v2 spec placeholder

**Rationale:**

- Simplifies v1 scope; focuses on user-initiated navigation
- Timeout cancellation requires idle detection, timer management—better as dedicated feature
- v2 can add this without breaking v1 API

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (WizardProps, onCancel callback, StepChangeEvent definitions × 3, Future Capabilities)

---

#### 2.4 — Events: Narrowed `error` Type in `StepChangeEvent`

**Rationale:** `error?: unknown` too loose for predictable consumer error handling.

**Change:**

- **Before:** `error?: unknown`
- **After:** `error?: Error | string`

**Rationale:**

- Consumers can safely assume error is either an Error instance or a message string
- Eliminates need for type guards or assertions
- Aligns with common error-handling patterns in Grommet

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (StepChangeEvent interface × 3 locations)

---

#### 2.5 — Navigation: Specified Direction-Aware Validation for `goTo()`

**Rationale:** Ambiguous whether backward navigation via `goTo()` should validate current step.

**Change:**

- Added "Navigation Policy" subsection specifying behavior:
  - `next()`: Always runs validation
  - `skip()`: Only when `skippable: true`
  - `goTo(stepId)`:
    - **Backward jump** → skips validation on current step
    - **Forward jump** → runs validation (consistent with `next()`)
  - Cannot navigate to unknown/disabled/blocked steps

**Rationale:**

- Backward navigation is "undoing" — no need to validate
- Forward navigation is equivalent to `next()` — validate current state
- Prevents invalid states from blocking backward progression

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Navigation Policy subsection, ~lines 1386–1395)

---

#### 2.6 — Events: Unified `onCancel` Reason Signatures

**Rationale:** Two interfaces with different cancel signatures created confusion: `onCancel(reason)` callback vs. `StepChangeEvent` with `trigger: 'cancel'` but no reason field.

**Change:**

- Added `reason?: 'user'` field to `StepChangeEvent` type
- Populated only when `trigger === 'cancel'`
- Updated documentation: "For cancel events, `reason` field is populated with `'user'` to match `onCancel(reason)` callback signature"

**Rationale:**

- Single source of truth for cancel context
- Consumers can access cancel reason from event object
- Callback signature and event signature now aligned

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (StepChangeEvent interface × 3 locations, Event Emission Contract section)

---

#### 2.7 — Terminology: Standardized Form State on `formValue` / `setFormValue`

**Rationale:** RFC mixed terminology (`formData`, `formValues`, `setFormValues`); misaligned with Grommet Form conventions.

**Change:**

- Standardized all references to: `formValue` (prop/getter) and `setFormValue` (callback)
- Updated example code, type definitions, and documentation

**Rationale:**

- Aligns with Grommet Form component API (`value` → `formValue` in wizard context)
- Single, consistent term reduces cognitive load
- Matches existing developer expectations

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Props subsection, example code, Behavior section × multiple locations)

---

#### 2.8 — Rendering: Documented Default Render Tree (No Children)

**Rationale:** RFC described subcomponents but never specified what `<Wizard steps={steps} />` renders with no children—largest implementation ambiguity.

**Change:**

- Added explicit section documenting default render behavior:

```
Default render (no children):
  <WizardHeader />
  <WizardProgress />      (if showProgress !== false)
  <WizardStepHeader />
  <WizardContent />
  <WizardFooter />        (with Prev / Next / Skip / Cancel buttons)
```

- Clarified: `<WizardProgress />` is conditional on `showProgress` prop
- Clarified: `<WizardFooter />` includes default navigation buttons
- Clarified: Children prop can override any/all subcomponents

**Rationale:**

- Eliminates guesswork during implementation
- Enables consistent stories and examples
- Documents composition contract explicitly

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Rendering Behavior section, Example section)

---

#### 2.9 — Props: Naming — Standardized `currentStep` and `defaultStep`

**Rationale:** RFC used inconsistent naming: `currentStep` vs. `currentStepId`; `defaultStep` vs. `initialStep`.

**Change:**

- Standardized public API on: `currentStep` (controlled) and `defaultStep` (uncontrolled)
- Replaced all references to `initialStep` with `defaultStep`
- Implementation may use `*Id` suffix internally for clarity, but RFC uses single convention

**Rationale:**

- Consistency across Stepper & Wizard
- Alignment with Grommet Form precedent
- Reduced cognitive load for consumers

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (WizardProps interface, Controlled/Uncontrolled section, example code × multiple)
- RFC/stepper/REQUIREMENTS.md (StepperProps interface, naming conventions)

---

#### 2.10 — Integration: Added Formal Wizard → Stepper State Mapping Table

**Rationale:** Unclear how Wizard derives Stepper-compatible step statuses; "largest remaining ambiguity."

**Change:**

- Added comprehensive "Stepper Integration" section including:
  - **Progress Display Mapping Table:** `showProgress` values → Stepper direction
  - **Step Status Derivation Contract Table:** Shows how each step condition maps to a derived status
    - Step in `completedSteps` → `completed`
    - Current step + validation passed → `pending`
    - Current step + validation failed → `error`
    - Future reachable step → `pending`
    - Future blocked step → `disabled`
    - Past step → `completed`
  - **Stepper Props Signature:** Exact props Wizard passes to Stepper
  - **Integration Pattern:** 4-point description of orchestration model

**Rationale:**

- Explicit contract eliminates implementation ambiguity
- Developers can understand exactly how status is computed
- Enables independent Stepper rendering without Wizard if needed

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Stepper Integration section, ~lines 1103–1165)

---

#### 2.11 — Behavior: Added Normative `scrollToTop` Contract

**Rationale:** `scrollToTop` existed as a boolean prop but lacked actionable behavior semantics.

**Change:**

- Added explicit Scroll Behavior section defining:
  - trigger timing (successful transitions only)
  - container-first target priority with viewport fallback
  - default instant behavior
  - safe no-op when no scrollable target exists

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Behavior & Interaction section)

---

#### 2.12 — Navigation: Declared v1 Policy Fixed and Non-Configurable

**Rationale:** Prior wording implied policy flexibility without a corresponding v1 API.

**Change:**

- Added explicit statement that v1 navigation policy is fixed.
- Confirmed no `navigationPolicy` prop in v1.
- Kept policy customization in Future Capabilities only.

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (Navigation Policy and Future Capabilities sections)

---

#### 2.13 — Type System: Added End-to-End `TFormValue` Generics

**Rationale:** Form integration was documented but weakly typed in key API surfaces.

**Change:**

- Introduced `TFormValue = unknown` across:
  - `StepDefinition<TFormValue>`
  - `WizardProps<TFormValue>`
  - `WizardContextValue<TFormValue>`
  - `WizardCompletionData<TFormValue>`
- Updated typed signatures for `validation`, `nextStep`, `formValue`, and `setFormValue`.

**Rationale:**

- Delivers end-to-end typing while preserving backward compatibility via default generic.

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (API, module declaration, and context usage snippets)

---

#### 2.14 — Events: Converted `StepChangeEvent` to Discriminated Union

**Rationale:** Optional `toStepId` in a single event type increased consumer branching complexity.

**Change:**

- Replaced broad event shape with:
  - `NavigationStepChangeEvent`
  - `TerminalStepChangeEvent`
  - `StepChangeEvent = NavigationStepChangeEvent | TerminalStepChangeEvent`
- Enforced `toStepId` required for transitions and disallowed for terminal actions.

**Rationale:**

- Improves type narrowing and correctness for event consumers.

**Files Modified:**

- RFC/wizard/REQUIREMENTS.md (all duplicated StepChangeEvent type blocks)

---

### 3. Implementation Retrospective (`RFC/IMPLEMENTATION_RETROSPECTIVE.md`)

#### 3.1 — Updated Ambiguity Resolution Table

**Change:**

- Reorganized "Ambiguous Design Details" section
- Changed from two separate tables (Recommended + Remaining) to single table showing all 5 ambiguities as resolved:
  1. ✓ `error` type narrowing
  2. ✓ `goTo()` validation behavior
  3. ✓ `onCancel` reason unification
  4. ✓ `cancelTimeoutMs` removal to v2
  5. ✓ Wizard → Stepper state mapping table

**Rationale:**

- Provides clear closure on all identified ambiguities
- Easy reference for maintainers reviewing RFC quality
- Documents all recommendations as applied

**Files Modified:**

- RFC/IMPLEMENTATION_RETROSPECTIVE.md (Ambiguous Design Details section)

---

### 4. Feedback Resolution Status (`RFC/RFC_FEEDBACK.md`)

#### 4.1 — Closed All 8 Feedback Items

**Change:**

- Updated `RFC_FEEDBACK.md` to mark all 8 original feedback items as Addressed.
- Removed obsolete observation section after consistency issues were resolved.
- Updated follow-up and conclusion to reflect full closure of the feedback set.

**Files Modified:**

- RFC/RFC_FEEDBACK.md

---

## Files Modified Summary

| File                                | Changes                                                                                                 | Lines Affected                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| RFC/stepper/REQUIREMENTS.md         | Added `StepperError` spec + `disabledReason` rendering & accessibility                                  | ~583–660, Subcomponents section           |
| RFC/wizard/REQUIREMENTS.md          | 14 distinct refinements: props, events, integration, terminology, rendering, typing, and policy clarity | Multiple sections                         |
| RFC/IMPLEMENTATION_RETROSPECTIVE.md | Updated ambiguity resolution table                                                                      | Ambiguous Design Details section          |
| RFC/RFC_FEEDBACK.md                 | Finalized resolution status for all original feedback items                                             | Evaluation summary, follow-up, conclusion |

---

## Verification

**Error Checking:**

- ✓ No compilation/syntax errors in RFC/stepper/REQUIREMENTS.md
- ✓ No compilation/syntax errors in RFC/wizard/REQUIREMENTS.md
- ✓ No compilation/syntax errors in RFC/IMPLEMENTATION_RETROSPECTIVE.md

**Type Safety:**

- ✓ All TypeScript interfaces updated consistently
- ✓ Union types replaced with discriminated types where appropriate
- ✓ Optional fields properly marked with `?`

**Consistency:**

- ✓ Terminology unified across both RFCs
- ✓ Naming conventions aligned (currentStep, defaultStep, formValue)
- ✓ Examples updated to reflect new APIs

---

## Impact on Implementation

These refinements improve implementation guidance in the following ways:

1. **Reduced Ambiguity** — 13 specific design details clarified or resolved
2. **Event Ergonomics** — Discriminated union event model improves correctness for transition vs terminal handling
3. **Typed Form Flows** — End-to-end generic typing for Wizard form payloads and callbacks
4. **Responsive A11y** — Strong fallback ensures collapsed labels remain usable on touch and keyboard
5. **Deterministic Behavior** — `scrollToTop` and fixed v1 navigation policy now fully specified
6. **Type Safety** — Union types replaced with discriminated types; error handling more predictable
7. **Accessibility** — `disabledReason` rendering spec enables WCAG-compliant disabled state UX
8. **Scope Clarity** — v1 scope simplified by deferring timeout cancellation to v2
9. **API Consistency** — Form state terminology and prop naming aligned across components
10. **Rendering Defaults** — Default component tree documented, eliminating implementation guesswork
11. **Integration Contract** — Wizard -> Stepper mapping explicit and testable

---

## Glossary of Terms

- **currentStep:** Active step id (public API for controlled/uncontrolled modes)
- **defaultStep:** Initial step id for uncontrolled mode
- **formValue:** Current form data for the active step
- **setFormValue:** Callback to update form data
- **showProgress:** Conditional Stepper display ('horizontal' | 'vertical' | false)
- **disabledReason:** Human-readable text explaining why a step is disabled
- **StepChangeEvent:** Event emitted when step navigation is attempted, blocked, or completed
- **Phase:** Lifecycle phase of a step change ('attempted' | 'completed' | 'blocked')
- **Trigger:** The action that initiated step change ('next' | 'previous' | 'goTo' | 'skip' | 'complete' | 'cancel')
