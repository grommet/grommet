## Colleague 1

A few questions/notes:

- What is the behavior when clickableSteps is false?
  - Response: Stepper becomes non-interactive for step activation. Click and keyboard activation do not fire onStepClick, and interactive visual states are suppressed. It remains a progress display only.
- How are all of these options supported with the current prop structure of stepper? Navigation policy is flexible: linear (sequential only), linear-with-jumps (back to prior steps), or non-linear (free navigation)
  - Response: In v1, navigation policy is not exposed as a configurable Stepper prop. Stepper remains presentational, while Wizard owns policy and currently uses a fixed non-configurable v1 policy. Policy customization is explicitly deferred to future capabilities.
- How is disabledReason used?
  - Response: disabledReason is the explanatory text for why a step is unavailable. It is programmatically associated for assistive tech (aria-describedby), and can be shown inline or via tooltip/focus treatment depending on layout. It is intended to provide both reason and next action.
- For the stepper status do we need to differentiate between a pending step that is available to work on vs a pending step that isn’t available yet (prior steps need to be completed first)
  - Response: Yes. Current RFC mapping differentiates these as pending vs disabled. In Wizard -> Stepper derivation, future reachable steps stay pending, while blocked future steps are disabled (often with disabledReason).
- Looks like wizard has the concept of a skippable step. Should we also have this concept in Stepper?
  - Response: Not in v1. Skippable is orchestration/navigation behavior, so it belongs to Wizard. Stepper should display state only and not own skip semantics.
- In Wizard where do I define the content for a particular step?
  - Response: Step metadata (id/title/description/validation/nextStep/skippable) lives in steps, while actual UI content is authored in Wizard composition (typically inside WizardContent) and rendered based on currentStep.
- If I have showProgress set in Wizard but I want to control some of the other props in stepper beyond just the direction how would I go about doing that?
  - Response: With built-in showProgress integration, Wizard controls the Stepper wiring and only maps the core progress behavior (including direction). If you need deeper Stepper control, use custom composition and render Stepper yourself (or wait for future policy/integration expansion).

## Colleague 2

This is looking really good have a few comments.

1. There’s an inconsistency between currentStep (Stepper) and currentStepId (Wizard). It’s not immediately clear whether currentStep refers to an index or an id.

- There is currentStep (Stepper) and currentStepId (Wizard). It’s not immediately clear whether currentStep refers to an index or an id on Stepper.
  - **Response:** Resolved. Current RFCs standardize on currentStep across both components, and it represents a step id (string), not an array index.

2. deciding state. above it says:

- Stepper is presentational
- Parent is source of truth, but also this is stated Stepper derives “effective state” so is Stepper just displaying state, or is it deciding state?
  - **Response:** Stepper is display-only. Parent/Wizard supplies step.status and currentStep; Stepper derives effective visual state from those inputs for rendering (for example current + completed), but does not decide workflow state.

3. validation

- When is validation triggered? (e.g., on next(), on step change, etc.)
  - **Response:** Validation runs on next() and on forward goTo(). It is skipped for previous() and backward goTo(). skip() bypasses validation when skippable is true.
- What happens on failure?
  - **Response:** Transition is blocked, Wizard emits blocked phase in StepChangeEvent, and user remains on the current step.
- How are errors surfaced to the UI (Stepper or step content)?
  - **Response:** Primary errors are surfaced in Wizard step content (inline/error summary patterns). Progress can also reflect error state via Stepper status mapping, including step-level error presentation.

4. Branching Logic (nextStep). I have some questions on the nextStep.

- What happens if it returns an invalid step id?
  - **Response:** Wizard warns and stays on the current step.
- Does it override linear navigation?
  - **Response:** Yes for forward resolution: nextStep determines the next target after validation passes.
- Can it skip multiple steps?
  - **Response:** Yes, as long as the returned target id is valid in the configured step set.

5. Stepper Interaction Behavior

- Does disabling it also affect keyboard navigation?
  - **Response:** Interaction is prevented for disabled steps and for non-clickable mode. Keyboard activation does not trigger step change in those cases.
- Are disabled steps still focusable?
  - **Response:** Intended behavior is yes for discoverability (with reason announcement), while activation remains blocked. Note: there is one remaining wording conflict in Stepper keyboard text that should be reconciled to match this intent consistently.
- Does Stepper prevent interaction or just avoid firing events?
  - **Response:** It prevents activation behavior and avoids firing onStepClick for non-interactive targets; workflow state changes remain owned by parent/Wizard.
