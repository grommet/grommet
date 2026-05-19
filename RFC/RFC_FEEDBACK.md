# RFC Feedback Evaluation (Post-Refinement)

This document evaluates pre-refinement feedback against the current RFC state after retrospective-driven updates.

Status values used:

- Addressed: Fully resolved by RFC refinements.
- Partially Addressed: Improved, but still has gaps or inconsistencies.
- Not Addressed: Feedback remains valid and unresolved.

---

## Evaluation Summary

| #   | Feedback Item                                            | Status    | Finding                                                                                                                                                                                                                                        | Resolution / Recommendation                                                                                 |
| --- | -------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | Stepper currentStep is required but Wizard controls it   | Addressed | Wizard Stepper Integration now explicitly documents that Wizard passes currentStep into Stepper, including uncontrolled mode where Wizard owns internal current step state.                                                                    | Keep current approach. No further RFC change required.                                                      |
| 2   | StepChangeEvent.toStepId is undefined on complete/cancel | Addressed | Wizard RFC now defines `StepChangeEvent` as a discriminated union (`NavigationStepChangeEvent                                                                                                                                                  | TerminalStepChangeEvent`) so transition events require `toStepId` while terminal events disallow it.        | Keep current spec. Optional ergonomics improvement has been applied. |
| 3   | confirmOnCancel has no UI spec                           | Addressed | confirmOnCancel was removed from v1. RFC now defines cancel confirmation as consumer-managed (typically via Layer), including story guidance.                                                                                                  | Keep this as-is. This is a better separation of concerns than embedding confirmation UI into Wizard.        |
| 4   | scrollToTop is under-specified                           | Addressed | Wizard RFC now includes a dedicated Scroll Behavior section defining trigger timing, container-first target selection, viewport fallback, instant behavior default, and safe no-op semantics.                                                  | Keep current spec. Option 1 adopted: container-first scroll policy with deterministic fallbacks.            |
| 5   | Stepper responsive collapse is vague and tooltip-heavy   | Addressed | Stepper RFC now defines a strong fallback for collapsed labels: tooltip is supplemental only, with required non-tooltip access for touch and keyboard users (inline reveal or expandable summary panel), plus programmatic label availability. | Keep current spec. Strong fallback adopted with explicit touch and keyboard accessibility requirements.     |
| 6   | Navigation policy is inconsistent / missing public prop  | Addressed | Wizard RFC now explicitly defines v1 navigation policy as fixed and non-configurable, with no `navigationPolicy` prop in v1. Future policy customization remains deferred to future capabilities.                                              | Keep current spec. Option 1 adopted: fixed v1 policy with explicit deferral of configurable policy APIs.    |
| 7   | cancelTimeoutMs has no behavior spec                     | Addressed | cancelTimeoutMs was removed from v1 and moved to Future Capabilities with baseline behavior notes.                                                                                                                                             | Keep deferred to v2. For v2 readiness, later add full idle detection semantics and event ordering contract. |
| 8   | Form integration documented but not generically typed    | Addressed | Wizard RFC now uses an end-to-end generic model with `TFormValue` across `StepDefinition`, `WizardProps`, `WizardContextValue`, and `WizardCompletionData`, including typed `validation`, `nextStep`, `formValue`, and `setFormValue`.         | Keep current spec. Option 2 adopted with default `TFormValue = unknown` for backward compatibility.         |

---

## Recommended Follow-Up Edits

1. None required for the original feedback set. All identified items are now addressed in the RFCs.

---

## Conclusion

The pre-refinement feedback was valid and has now been fully resolved across the RFC set. No remaining blockers were identified from the original feedback list.
