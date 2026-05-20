# Wizard Component RFC

## One-Sentence Summary

A workflow orchestrator for multi-step processes that manages navigation, validation, and state—with optional Stepper integration for visual progress display.

## Overview

Multi-step workflow orchestrator with smart defaults for linear flows and composable primitives for advanced customization. Wizard handles navigation, validation, and optional progress display via Stepper integration. Designed as an independent orchestration component that remains form-agnostic and works seamlessly with Form when needed.

**Import Path**: `grommet`  
**Status**: Proposed  
**Related**: [Stepper Component RFC](../stepper/REQUIREMENTS.md)

---

## Table of Contents

1. [Overview](#overview)

   - [Use Cases](#use-cases)
   - [Goals & Non-Goals](#goals--non-goals)

2. [API Specification](#api-specification)
   - [Props Interface](#props-interface)
   - [Step Definition Model](#step-definition-model)
   - [Event Model](#event-model)
   - [Navigation API](#navigation-api)
   - [Subcomponents & Hooks](#subcomponents--hooks)

- [Default Render Contract (No `children`)](#default-render-contract-no-children)
- [Type Definitions](#type-definitions)

3. [State Management](#state-management)

   - [Controlled vs. Uncontrolled](#controlled-vs-uncontrolled)
   - [Step State Derivation](#step-state-derivation)
   - [Validation & Error Recovery](#validation--error-recovery)

4. [Anatomy & Rendering](#anatomy--rendering)

   - [Component Hierarchy](#component-hierarchy)
   - [Horizontal Layout](#horizontal-layout)
   - [Vertical Layout](#vertical-layout)
   - [No-Progress Layout](#no-progress-layout)

5. [Behavior & Interaction](#behavior--interaction)

   - [State Machine](#state-machine)
   - [Navigation Policy](#navigation-policy)
   - [Branching Logic](#branching-logic)
   - [Keyboard Navigation](#keyboard-navigation)
   - [Focus Management](#focus-management)

6. [Theming & Styling](#theming--styling)

   - [Theme Tokens](#theme-tokens)

7. [Accessibility (WCAG 2.2 AA)](#accessibility-wcag-22-aa)

8. [Storybook Stories](#storybook-stories)

9. [Form Integration Pattern](#form-integration-pattern)

10. [Stepper Integration](#stepper-integration)

11. [Implementation Guide](#implementation-guide)

- [File Structure](#file-structure)

12. [Future Capabilities](#future-capabilities)

13. [References](#references)

---

## Overview

### Use Cases

- **Linear workflows** — Simple step-by-step flows with minimal configuration
- **Branching workflows** — Conditional paths based on user input or business logic
- **Form orchestration** — Multi-step forms with optional validation and state management
- **Onboarding flows** — Guided user setup with progress indication and skip/back options
- **Embedded workflows** — Reusable workflow components in larger applications

### Goals & Non-Goals

**Goals**

- [x] Enable reusable orchestration for multi-step workflows (form and non-form)
- [x] Support linear flows (80% use case) with minimal configuration
- [x] Support branching and conditional step navigation
- [x] Follow Grommet API conventions and composition patterns
- [x] Remain form-agnostic; provide optional Form integration guidance
- [x] Meet WCAG 2.2 AA accessibility standards
- [x] Provide themeable design tokens for all regions and states
- [x] Optional progress display via Stepper integration
- [x] Support parent steps with child sub-steps (v1 scope: parent-and-child levels)

**Non-Goals (v1)**

- Backend persistence or state sync patterns
- Analytics instrumentation (users can emit custom events via callbacks)
- Domain-specific content primitives (accept any JSX/components)
- Multi-user collaboration or audit trails
- Detailed completion view slot (onComplete callback only in v1)
- Arbitrary recursive step depth beyond parent-and-child levels

---

## API Specification

### Props Interface

```typescript
interface WizardProps<TFormValue = unknown> {
  // Step definitions (required)
  steps: StepDefinition<TFormValue>[];

  // Uncontrolled mode
  defaultStep?: string; // default: steps[0].id

  // Controlled mode
  currentStep?: string;
  onStepChange?: (event: StepChangeEvent) => void;

  // Completion and cancellation
  onComplete?: (data: WizardCompletionData<TFormValue>) => void;
  onCancel?: (reason: 'user') => void;

  // Progress display
  showProgress?: 'horizontal' | 'vertical' | false; // default: false

  // Behavior
  scrollToTop?: boolean; // default: true; scroll on successful step transitions

  // Step content injection (default layout mode)
  renderStep?: (
    step: StepDefinition<TFormValue>,
    context: RenderStepContext<TFormValue>,
  ) => React.ReactNode;

  // Layout
  width?: string | ResponsiveValue;
  gap?: string | ResponsiveValue;

  // HTML attributes
  id?: string;
  a11yTitle?: string;

  // Custom composition
  children?: React.ReactNode;
}

interface StepDefinition<TFormValue = unknown> {
  id: string; // Unique identifier across the full parent-and-child graph
  title: string; // Display title
  description?: string | React.ReactNode; // Optional secondary text
  skippable?: boolean; // Allow skip without validation
  validation?: (formValue: TFormValue) => Promise<void> | void; // Validation hook
  nextStep?: (formValue: TFormValue) => string; // Branching resolver
  children?: Omit<StepDefinition<TFormValue>, 'children'>[]; // Optional child sub-steps
}

type NavigationStepChangeEvent = {
  fromStepId: string; // Source step
  toStepId: string; // Required for step transitions
  trigger: 'next' | 'previous' | 'goTo' | 'skip';
  phase: 'attempted' | 'completed' | 'blocked';
  blocked?: boolean; // true if transition was prevented
  error?: Error | string; // Validation error details
};

type TerminalStepChangeEvent = {
  fromStepId: string; // Source step
  toStepId?: never; // Terminal events do not transition to a step
  trigger: 'complete' | 'cancel';
  phase: 'attempted' | 'completed';
  reason?: 'user'; // Present when trigger === 'cancel'
};

type StepChangeEvent = NavigationStepChangeEvent | TerminalStepChangeEvent;

interface WizardCompletionData<TFormValue = unknown> {
  completedSteps: string[]; // All completed step ids
  formValue?: TFormValue; // Optional form value payload
}

type RenderStepContext<TFormValue = unknown> = WizardContextValue<TFormValue>;
```

### Step Definition Model

```typescript
type StepDefinition<TFormValue = unknown> = {
  id: string;
  title: string;
  description?: string | ReactNode;
  skippable?: boolean;
  validation?: (data: TFormValue) => Promise<void> | void;
  nextStep?: (data: TFormValue) => string;
  children?: Omit<StepDefinition<TFormValue>, 'children'>[];
};
```

**Properties**

- **`id`** — Unique identifier across all parent-and-child steps; used in `currentStep` and `onStepChange` events
- **`title`** — Display label; used in Step Header and progress indication
- **`description`** — Optional secondary text; shown below title in Step Header
- **`skippable`** — When true, `skip()` button is shown; advances without validation
- **`validation`** — Optional validation function; run before advancing to next step
  - Synchronous: return void or throw to indicate error
  - Asynchronous: return Promise; resolves on success, rejects on error
- **`nextStep`** — Optional branching resolver; called with current form data
  - Must return a valid step id (deterministic)
  - If omitted, advances to the next step in the rendered child-first hierarchy order
- **`children`** — Optional child sub-steps (v1 supports one child level)
  - Wizard traverses in child-first order when a parent contains children
  - Parent completion defaults to all child steps completed
  - Descendants beyond the child level are unsupported in v1.
  - In development builds, Wizard warns when deeper nesting is authored.
  - Descendants beyond the child level are ignored for navigation, progress, and counters.

### Event Model

The `StepChangeEvent` emitted via `onStepChange` callback provides detailed context for each navigation attempt:

```typescript
type NavigationStepChangeEvent = {
  fromStepId: string; // Source step
  toStepId: string; // Required for next/previous/goTo/skip
  trigger: 'next' | 'previous' | 'goTo' | 'skip';
  phase: 'attempted' | 'completed' | 'blocked';
  blocked?: boolean; // true if navigation prevented
  error?: Error | string; // Error details if blocked
};

type TerminalStepChangeEvent = {
  fromStepId: string; // Source step
  toStepId?: never; // Not present for complete/cancel
  trigger: 'complete' | 'cancel';
  phase: 'attempted' | 'completed';
  reason?: 'user'; // Cancel reason (only when trigger === 'cancel')
};

type StepChangeEvent = NavigationStepChangeEvent | TerminalStepChangeEvent;
```

**Event Flow**

1. User triggers navigation (click Next, keyboard Enter, etc.)
2. Wizard emits `{ phase: 'attempted', trigger, ... }`
3. Validation runs (if configured)
4. If validation fails: emit `{ phase: 'blocked', blocked: true, error, ... }`
5. If validation passes: emit `{ phase: 'completed', ... }` and transition
6. Parent updates state (in controlled mode)

### Navigation API

Methods accessible via `useWizard()` hook (within WizardContent or custom composition):

```typescript
const wizard = useWizard();

// Navigation
wizard.navigation.next(); // Validate current step, advance if valid
wizard.navigation.previous(); // Go to previous step (no validation)
wizard.navigation.goTo(stepId); // Jump to specific step
wizard.navigation.skip(); // Advance without validation (if skippable)
wizard.navigation.complete(); // Mark workflow as complete
wizard.navigation.cancel(); // Trigger cancellation flow
```

### Subcomponents & Hooks

When custom rendering is needed, use composition subcomponents that read from `WizardContext`:

```typescript
// Subcomponents for custom composition
<WizardHeader />          // Title, help, close button
<WizardProgress />        // Stepper display region
<WizardStepHeader />      // Step counter, title, description
<WizardContent />         // Content surface area
<WizardFooter />          // Navigation actions (Prev, Next, Skip, Cancel)

// Hook for accessing wizard state and navigation
const wizard = useWizard<TFormValue>()
// Returns: {
//   currentStep: string
//   currentStepIndex: number
//   steps: StepDefinition<TFormValue>[]
//   isValidating: boolean
//   isBlocked: boolean
//   isCompleted: boolean
//   navigation: NavigationAPI
//   stepStates: { [stepId]: StepState }
//   formValue?: TFormValue
//   setFormValue?: (value: TFormValue) => void
// }
```

### Step Content Coordination (Recommended)

Wizard provides a first-class `renderStep` prop for injecting step content into
the default layout without requiring manual composition of subcomponents.

`renderStep` is called on every render with two arguments:

1. **`step: StepDefinition`** — the currently active step's definition object
   (id, title, skippable, etc.).
2. **`context: RenderStepContext`** — a snapshot of the full `WizardContextValue`
   at the time of rendering (stepStates, formValue, navigation, etc.).

Because `renderStep` is called at render time, content can react to live state,
API data, user roles, and accumulated form values without re-creating the `steps`
array.

Recommended pattern — external content map:

```tsx
const steps: StepDefinition[] = [
  { id: 'account', title: 'Account' },
  { id: 'billing', title: 'Billing' },
  { id: 'review', title: 'Review' },
];

const stepContentById: Record<string, React.ReactNode> = {
  account: <AccountStep />,
  billing: <BillingStep />,
  review: <ReviewStep />,
};

export const MyWizard = () => (
  <Wizard
    steps={steps}
    showProgress="horizontal"
    onComplete={handleComplete}
    renderStep={(step) => stepContentById[step.id] ?? null}
  />
);
```

For content that depends on runtime state, use the second `context` argument:

```tsx
renderStep={(step, context) => (
  context.stepStates[step.id]?.hasError
    ? <ErrorSummary error={context.stepStates[step.id].error} />
    : stepContentById[step.id]
)}
```

For content that depends on accumulated form values:

```tsx
renderStep={(step, { formValue }) => (
  step.id === 'review'
    ? <ReviewSummary data={formValue} />
    : stepContentById[step.id]
)}
```

This keeps `StepDefinition` focused on orchestration metadata (`id`, `title`,
`validation`, `nextStep`, `children`) while rendering concerns remain in a
separate, easily testable function.

**Advanced composition** — When full control over Wizard's layout is required
(custom grid, additional slots, etc.), pass `children` instead of `renderStep`.
Passing `children` bypasses the default layout; all subcomponents
(`WizardProgress`, `WizardStepHeader`, `WizardContent`, `WizardFooter`) must be
explicitly placed. See the "Custom Composition" story for an example.

### Default Render Contract (No `children`)

When `children` is not provided, Wizard renders a default built-in layout in this order:

```tsx
<Wizard>
  <WizardHeader />
  <WizardProgress /> // only when showProgress is 'horizontal' or 'vertical'
  <WizardStepHeader />
  <WizardContent /> // renders validation error and renderStep(step, context) output
  when provided
  <WizardFooter />
</Wizard>
```

Default `WizardFooter` action behavior:

- Previous: shown, disabled on first step
- Next: shown when not on final step
- Complete: shown on final step
- Skip: shown only when current step is `skippable: true`
- Cancel: optional action; when included, confirmation is consumer-managed (for example via `Layer`)

Default progress behavior:

- `showProgress='horizontal'`: render `WizardProgress` above content
- `showProgress='vertical'`: render `WizardProgress` as sidebar
- `showProgress=false`: omit `WizardProgress`

### Type Definitions

```typescript
// index.d.ts exports
declare module 'grommet' {
  interface StepDefinition<TFormValue = unknown> {
    id: string;
    title: string;
    description?: string | React.ReactNode;
    skippable?: boolean;
    validation?: (data: TFormValue) => Promise<void> | void;
    nextStep?: (data: TFormValue) => string;
    children?: Omit<StepDefinition<TFormValue>, 'children'>[];
  }

  type NavigationStepChangeEvent = {
    fromStepId: string;
    toStepId: string;
    trigger: 'next' | 'previous' | 'goTo' | 'skip';
    phase: 'attempted' | 'completed' | 'blocked';
    blocked?: boolean;
    error?: Error | string;
  };

  type TerminalStepChangeEvent = {
    fromStepId: string;
    toStepId?: never;
    trigger: 'complete' | 'cancel';
    phase: 'attempted' | 'completed';
    reason?: 'user';
  };

  type StepChangeEvent = NavigationStepChangeEvent | TerminalStepChangeEvent;

  interface WizardCompletionData<TFormValue = unknown> {
    completedSteps: string[];
    formValue?: TFormValue;
  }

  interface WizardProps<TFormValue = unknown>
    extends React.HTMLAttributes<HTMLDivElement> {
    steps: StepDefinition<TFormValue>[];
    defaultStep?: string;
    currentStep?: string;
    onStepChange?: (event: StepChangeEvent) => void;
    onComplete?: (data: WizardCompletionData<TFormValue>) => void;
    onCancel?: (reason: 'user') => void;
    showProgress?: 'horizontal' | 'vertical' | false;
    scrollToTop?: boolean;
    renderStep?: (
      step: StepDefinition<TFormValue>,
      context: RenderStepContext<TFormValue>,
    ) => React.ReactNode;
    width?: string | ResponsiveValue;
    gap?: string | ResponsiveValue;
    id?: string;
    a11yTitle?: string;
    children?: React.ReactNode;
  }

  type RenderStepContext<TFormValue = unknown> = WizardContextValue<TFormValue>;

  interface WizardContextValue<TFormValue = unknown> {
    currentStep: string;
    currentStepIndex: number;
    steps: StepDefinition<TFormValue>[];
    isValidating: boolean;
    isBlocked: boolean;
    isCompleted: boolean;
    navigation: {
      next: () => void;
      previous: () => void;
      goTo: (stepId: string) => void;
      skip: () => void;
      complete: () => void;
      cancel: () => void;
    };
    stepStates: Record<string, StepState>;
    formValue?: TFormValue;
    setFormValue?: (value: TFormValue) => void;
  }

  interface StepState {
    completed: boolean;
    hasError: boolean;
    disabled: boolean;
  }

  const Wizard: <TFormValue = unknown>(
    props: WizardProps<TFormValue>,
  ) => JSX.Element;
  const WizardHeader: React.FC;
  const WizardProgress: React.FC;
  const WizardStepHeader: React.FC;
  const WizardContent: React.FC;
  const WizardFooter: React.FC;
  const useWizard: <TFormValue = unknown>() => WizardContextValue<TFormValue>;
}
```

---

## State Management

### Controlled vs. Uncontrolled

**Uncontrolled Mode** (default)

- Wizard owns `currentStep` state internally
- Initialized via `defaultStep` prop (defaults to first step)
- Parent listens to `onStepChange` for awareness; does not need to update state
- Use for simple flows where external orchestration isn't needed

```typescript
<Wizard
  steps={steps}
  defaultStep="step1" // Wizard owns state
  onComplete={handleComplete}
/>
```

**Controlled Mode**

- Parent owns `currentStep` state
- Wizard updates on navigation via `onStepChange`
- Parent updates `currentStep` prop in response to events
- Use for complex flows needing external validation or orchestration

```typescript
const [currentStep, setCurrentStep] = React.useState('step1')

<Wizard
  steps={steps}
  currentStep={currentStep}  // Parent owns state
  onStepChange={(event) => {
    if (event.phase === 'completed') {
      setCurrentStep(event.toStepId)
    }
  }}
  onComplete={handleComplete}
/>
```

### Step State Derivation

Wizard tracks step completion state internally and derives Stepper-compatible states:

```typescript
// Internal step state tracking
const stepStates = {
  [stepId]: {
    completed: boolean        // User navigated past this step
    hasError: boolean         // Validation failed on this step
    disabled: boolean         // Step is blocked from navigation
  }
}

// Mapping to Stepper step.status
// pending: not yet visited
// completed: successfully navigated past
// error: validation failed; user is on error recovery path
// disabled: blocked by parent logic or prior validation failure
```

### Validation & Error Recovery

**Synchronous Validation**

```typescript
{
  id: 'billing',
  title: 'Billing',
  validation: (data) => {
    if (!data.cardNumber) throw new Error('Card number required')
    // No error: transition succeeds
  }
}
```

**Asynchronous Validation**

```typescript
{
  id: 'verification',
  title: 'Verification',
  validation: async (data) => {
    const response = await fetch('/api/verify', { body: data })
    if (!response.ok) throw new Error('Verification failed')
  }
}
```

**Error Surfacing**

- Wizard emits `{ phase: 'blocked', error, ... }` event
- Parent displays error message near form or in dedicated summary region
- User corrects input and retries navigation
- On retry success, Wizard emits `{ phase: 'completed', ... }` and transitions

---

## Anatomy & Rendering

### Component Hierarchy

```
<Wizard>
  [WizardContext.Provider]

  <WizardHeader />           (optional when using custom composition)
    <h1>Wizard Title</h1>
    <Button>Help</Button>
    <Button>Close</Button>

  <div>                      (Body region)
    <WizardProgress />       (optional, controlled by showProgress prop)
      <Stepper />           (rendered when showProgress !== false)

    <div>                   (Main content area)
      <WizardStepHeader />
        <Text>Step 1 of 5</Text>
        <h2>Step Title</h2>

      <WizardContent />
        <Form>              (optional, parent-provided)
          <!-- Step form fields -->
        </Form>

  <WizardFooter />          (optional)
    <Button>Previous</Button>
    <Button>Next</Button>
    <Button>Skip</Button>   (if skippable)
    <Button>Cancel</Button>

</Wizard>
```

### Horizontal Layout

Default layout when `showProgress='horizontal'`:

- Modal Header at top
- Stepper (horizontal) below header
- Step Header and Content in main area
- Footer with navigation buttons at bottom

**Use when**: Compact space, < 5 steps, minimal step descriptions needed

### Vertical Layout

Used when `showProgress='vertical'`:

- Modal Header at top
- Body splits into sidebar (Stepper, vertical) and main column (content)
- Step Header and Content in main column
- Footer at bottom

**Use when**: > 5 steps, descriptions important, sidebar space available

### No-Progress Layout

Used when `showProgress=false`:

- Header at top
- Step Header and Content in main area
- Footer at bottom
- No Stepper displayed

**Use when**: Progress already shown elsewhere, constrained space, system-driven workflow

---

## Behavior & Interaction

### State Machine

```
Idle
  ↓ (user navigates)
Validating
  ↓ (validation runs)
Blocked (if error) → Editing (user corrects) → Validating (retry)
  ↓ (validation passes)
Ready → Editing (next step)
  ↓ (final step + complete)
Completed
  ↓ (onComplete callback)
Exit

Editing
  ↓ (user cancels)
Consumer confirmation (optional) → Canceling → Exit
                               ↓ (dismiss dialog)
                               Editing
```

- **Validating**: Prevents duplicate submissions; disables advance actions
- **Blocked**: Error state; user must correct or cancel
- **Branching**: Deterministic `nextStep()` resolver runs after validation passes
- **Cancellation**: Confirmation is consumer-managed when needed, typically via Grommet's `Layer`

### Navigation Policy

V1 policy is fixed and non-configurable. Wizard does not expose a `navigationPolicy` prop in v1.

- **`next()`** — Validate current step; advance if valid
- **`previous()`** — Go to previous step (no validation)
- **`goTo(stepId)`** — Jump to target step; validate if jumping forward, skip validation if jumping backward
- **`skip()`** — Advance without validation (only if `skippable: true`)
- **`complete()`** — Mark workflow complete; emit `onComplete`
- **`cancel()`** — Trigger cancellation flow

**Nested Steps (v1 two-level scope)**

Wizard supports an optional parent-and-child (two-level) step hierarchy where parents are organizational containers, not navigation waypoints. Parents should never be landed on directly; navigation always lands on children.

**Navigation Behavior with Nested Steps**

1. **Parents are organizational only**: Parents are visual/logical grouping containers and should not be treated as actual navigation stops. All navigation methods (`next()`, `previous()`, `goTo()`, `skip()`) skip over parents automatically.

2. **Forward navigation (`next()`)**:

   - On a child step within a parent: advance to next child within same parent
   - On last child of a parent: auto-expand next parent and land on its first child
   - Parents encountered during traversal are auto-expanded and skipped to their first child

3. **Backward navigation (`previous()`)**:

   - On non-first child: go to previous child within same parent
   - On first child: go to the step immediately before the parent (skipping the parent)
   - Walk backward through children before exiting to prior parent

4. **Jump navigation (`goTo(stepId)`)**:

   - **`goTo(parentId)`** (if parentId has children): auto-expand parent, land on first child; mark all children as revealed
   - **`goTo(childId)`**: auto-expand parent (if not already revealed), land on childId
   - Both forward and backward jumps trigger auto-expansion of target parent

5. **Skip navigation (`skip()`)**:

   - Not applicable to parent steps directly; skip should not be called on parent-only steps
   - Skipping from a child step advances to next child or (if last child) auto-expands next parent and lands on its first child
   - Skipping from a step before a parent auto-expands that parent and lands on its first child

6. **Stepper rendering and visibility**:
   - Parents are always visible in Stepper
   - Children are hidden until first reveal (lazy-reveal pattern)
   - Once a parent's children are revealed (first navigation to any child), they persist as visible
   - Step counter only counts parent-level steps ("Step 2 of 3" for 3 parents, regardless of total children)

**Parent Completion Rollup**

- Parent step is marked `completed` when all its children are `completed`
- Parent step inherits error status if any child has `error` status
- Parent step is `disabled` only if all children are `disabled`
- Otherwise, parent inherits pending status from children

**Technical Implementation**

- Descendants beyond the child level (grandchildren) are unsupported in v1
- In development builds, Wizard warns when deeper nesting is authored
- Descendants beyond the child level are ignored for navigation, progress, and step counters
- `linearSteps` flattens the hierarchy (parents first, then their children) for indexing, but navigation respects parent boundaries
- `revealedParentIds` tracks which parents have been visited; used for persistent visibility

**Example: Multi-parent flow with lazy reveal**

```typescript
const steps = [
  {
    id: 'accountSetup',
    title: 'Account Setup', // Parent
    children: [
      { id: 'email', title: 'Email Address' },
      { id: 'password', title: 'Set Password' },
    ],
  },
  {
    id: 'profileSetup',
    title: 'Profile Setup', // Parent
    children: [
      { id: 'name', title: 'Full Name' },
      { id: 'photo', title: 'Profile Photo' },
    ],
  },
  { id: 'review', title: 'Review & Submit' }, // Flat step
];

// Navigation flow:
// 1. next() on first visit → Account Setup parent auto-expands → lands on 'email' child
// 2. next() on 'email' → lands on 'password' (next sibling child)
// 3. next() on 'password' → Profile Setup parent auto-expands → lands on 'name' (first child)
// 4. previous() on 'name' → lands on 'password' (step before parent)
// 5. goTo('profileSetup') → auto-expands and lands on 'name' (first child)
// 6. In Stepper: only 2 top-level parents visible initially; children hidden until entry
// 7. Aria-labels: "Step 2 of 3" (counting parents only, not all 5 flattened steps)
```

**Gating Rules**

- Cannot navigate to unknown, disabled, or blocked steps
- Skip only available on `skippable: true` steps
- Previous always available (never blocked)
- Validation runs before advancing to next step or jumping to a forward step via `goTo()`

### Branching Logic

```typescript
// Deterministic branching via nextStep resolver
const steps = [
  {
    id: 'accountType',
    title: 'Choose Account Type',
    nextStep: (data) => {
      return data.type === 'business' ? 'businessDetails' : 'personalDetails';
    },
  },
  { id: 'businessDetails', title: 'Business Details' },
  { id: 'personalDetails', title: 'Personal Details' },
  { id: 'review', title: 'Review & Submit' },
];
```

**Requirements**

- Must return a valid step id
- Must be deterministic (same input → same output)
- Called after validation passes
- If resolver returns invalid id, Wizard warns and stays on current step

### Keyboard Navigation

| Key               | Context                                    | Action                                                   |
| ----------------- | ------------------------------------------ | -------------------------------------------------------- |
| **Tab/Shift+Tab** | Wizard focused                             | Move focus through header, content, footer regions       |
| **Enter/Space**   | Focused button                             | Activate button (Next, Previous, Skip, Cancel, Complete) |
| **Escape**        | Consumer-provided confirmation dialog open | Dismiss dialog and return to editing                     |
| **Arrow keys**    | Focus on Stepper                           | Delegate to Stepper (navigate between steps)             |

For parent-and-child sub-steps (v1):

- Stepper keyboard traversal remains the source of truth for parent-and-child focus movement.
- Wizard consumes selected parent-and-child ids through `goTo(stepId)` and applies the same validation policy.

### Focus Management

- **On step transition**: Focus moves to Step Header (h2 step title)
- **On validation failure**: Focus moves to first invalid form field (or error summary if present)
- **On confirmation dialog open**: Focus moves to the dialog dismiss or safe action
- **On dialog dismissal**: Focus returns to the Cancel button or consumer-defined trigger
- **On completion**: Focus moves to completion message or parent-controlled target

### Scroll Behavior (`scrollToTop`)

When `scrollToTop` is `true` (default), Wizard scrolls after a successful step transition (`phase='completed'`) for `next`, `previous`, `goTo`, and `skip`.

- No scroll occurs for blocked transitions (`phase='blocked'`) or non-transition terminal actions (`complete`, `cancel`).
- Scroll target selection is container-first:
  1. Wizard step content scroll container (if present)
  2. Nearest scrollable ancestor
  3. Window/document viewport fallback
- Scroll behavior is `instant` by default to avoid delayed orientation changes during step transitions.
- If no scrollable target exists, behavior is a safe no-op.

---

## Theming & Styling

### Theme Tokens

Wizard tokens are namespaced under `theme.wizard`:

```javascript
// src/js/themes/base.js
wizard: {
  // Container
  container: {
    background: 'background-front',
    border: undefined,
    shadow: 'medium',
    gap: 'medium',  // Gap between regions
    pad: { horizontal: 'large', vertical: 'medium' },
    // extend: undefined
  },

  // Header region
  header: {
    background: 'background-back',
    border: { side: 'bottom', color: 'border', size: 'xsmall' },
    pad: { horizontal: 'large', vertical: 'medium' },
    gap: 'medium',  // Gap between title and actions
    title: {
      size: 'large',
      weight: 'bold',
    },
  },

  // Progress region (when Stepper integrated)
  progress: {
    margin: { bottom: 'medium' },
    // stepper tokens inherited from theme.stepper
  },

  // Step Header region (counter + title + description)
  stepHeader: {
    margin: { bottom: 'medium' },
    counter: {
      font: { size: 'small' },
      color: 'text-weak',
    },
    title: {
      size: 'medium',
      weight: 'bold',
      margin: { bottom: 'xsmall' },
    },
    description: {
      font: { size: 'small' },
      color: 'text-weak',
      margin: { bottom: 'small' },
    },
  },

  // Content surface region
  content: {
    background: undefined,  // Inherit from container
    pad: 'medium',
    minHeight: '200px',  // Prevent layout shift during transitions
    // extend: undefined
  },

  // Error message region
  error: {
    border: { side: 'left', size: 'xsmall', color: 'status-error' },
    background: 'rgba(235, 0, 0, 0.05)',
    pad: { horizontal: 'small', vertical: 'xsmall' },
    margin: { bottom: 'small' },
    text: {
      color: 'status-error',
      size: 'small',
    },
  },

  // Footer region (navigation buttons)
  footer: {
    background: 'background-back',
    border: { side: 'top', color: 'border', size: 'xsmall' },
    pad: { horizontal: 'large', vertical: 'medium' },
    gap: 'small',  // Gap between buttons
    justify: 'between',  // or 'start' | 'center' | 'end'
  },

  // Action buttons
  actions: {
    previous: {
      // Button styling inherited from theme.button
    },
    next: {
      color: 'brand',  // Primary action
    },
    skip: {
      // Tertiary or ghost button style
    },
    cancel: {
      // Destructive or secondary button style
    },
  },

  // Layout-specific overrides
  horizontal: {
    body: {
      direction: 'column',
    },
    progress: {
      margin: { bottom: 'large' },
    },
  },
  vertical: {
    body: {
      direction: 'row',
      gap: 'large',
    },
    progress: {
      width: '220px',  // Sidebar width
      flex: 'shrink',
    },
    content: {
      flex: 'grow',
    },
  },

  // Focus and interactive states
  focus: {
    outline: { color: 'focus' },
  },
}
```

---

## Accessibility (WCAG 2.2 AA)

### Semantic HTML

```html
<div role="region" aria-label="Multi-step workflow">
  <h1>Wizard Title</h1>

  <!-- Progress (Stepper, if shown) -->
  <ol aria-label="Progress">
    <!-- Stepper's own structure -->
    <li aria-current="step">...</li>
  </ol>

  <!-- Step Header -->
  <h2>Current Step Title</h2>

  <!-- Content -->
  <div>
    <form>
      <!-- If using Form integration -->
      <!-- Form fields -->
    </form>
  </div>

  <!-- Actions -->
  <footer>
    <button>Previous</button>
    <button>Next</button>
  </footer>
</div>
```

### ARIA Attributes

| Attribute             | Element         | Value                            | Purpose                                         |
| --------------------- | --------------- | -------------------------------- | ----------------------------------------------- |
| `aria-label`          | Main region     | `"Step 2 of 5: Payment Details"` | Describe workflow context                       |
| `aria-current="step"` | Current step    | —                                | Announce active step (delegated to Stepper)     |
| `aria-live="polite"`  | Error message   | —                                | Announce validation errors without interruption |
| `aria-describedby`    | Form field      | Error id                         | Associate field with error message              |
| `aria-busy="true"`    | Stepper/content | —                                | During async validation                         |

### Keyboard Support

| Context                          | Keys          | Expected Behavior                              |
| -------------------------------- | ------------- | ---------------------------------------------- |
| **Wizard focus**                 | Tab           | Move focus into first focusable header control |
| **Header/Footer**                | Tab/Shift+Tab | Navigate between buttons normally              |
| **Content area**                 | Tab/Shift+Tab | Navigate through form fields (if present)      |
| **Focused button**               | Enter/Space   | Activate button (Next, Previous, etc.)         |
| **Consumer confirmation dialog** | Escape        | Dismiss dialog (or activate dismiss button)    |

### Contrast & Sizing

- All text ≥ 4.5:1 contrast (WCAG AA for normal text)
- Interactive targets ≥ 44×44px (touch target sizing)
- Focus rings ≥ 3:1 contrast with adjacent colors
- Icons support color-blind users (not color-only differentiation)

### Screen Reader Testing

- [ ] Wizard title and context announced on focus
- [ ] Step number and title announced when transitioning
- [ ] Error messages announced via `aria-live="polite"` without interruption
- [ ] When progress is shown, Stepper preserves its roving-focus accessibility model, including discoverable disabled steps with associated reason text
- [ ] Button purposes clear (Previous, Next, Skip, Cancel, Complete)
- [ ] Form fields (if present) associated with labels and errors
- [ ] Focus visible at all times during keyboard navigation

---

## Storybook Stories

All stories support light/dark theme switching and are fully keyboard-testable.

### Story: Basic Linear Wizard

**Path**: `Wizard/Basic Linear`

```jsx
export const BasicLinear = () => {
  const [currentStep, setCurrentStep] = React.useState('account');

  const steps = [
    { id: 'account', title: 'Account Details' },
    { id: 'profile', title: 'Profile Setup' },
    { id: 'review', title: 'Review & Submit' },
  ];

  const handleComplete = (data) => console.log('Complete:', data);

  return (
    <Wizard
      steps={steps}
      defaultStep="account"
      showProgress="horizontal"
      onComplete={handleComplete}
    >
      {/* Default layout: header, stepper, content, footer */}
    </Wizard>
  );
};
```

**Purpose**: Simplest case with default layout.  
**Interactions**: Click Next/Previous to navigate; form validation example optional.

### Story: Vertical Progress Layout

**Path**: `Wizard/Vertical Progress`

```jsx
export const VerticalProgress = () => {
  const steps = [
    {
      id: 'company',
      title: 'Company Info',
      description: 'Your business details',
    },
    {
      id: 'users',
      title: 'User Access',
      description: 'Team member permissions',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Authentication settings',
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Final confirmation',
    },
  ];

  return (
    <Wizard steps={steps} showProgress="vertical" onComplete={handleComplete} />
  );
};
```

**Purpose**: Sidebar progress for longer workflows.  
**Layout**: Stepper on left, content on right.

### Story: No Progress Display

**Path**: `Wizard/No Progress`

```jsx
export const NoProgress = () => {
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
  ];

  return (
    <Wizard steps={steps} showProgress={false} onComplete={handleComplete} />
  );
};
```

**Purpose**: Progress hidden (shown elsewhere or not needed).

### Story: Branching Workflow

**Path**: `Wizard/Branching`

```jsx
export const Branching = () => {
  const steps = [
    {
      id: 'accountType',
      title: 'Choose Account Type',
      nextStep: (data) =>
        data.type === 'business' ? 'businessDetails' : 'personalDetails',
    },
    { id: 'businessDetails', title: 'Business Details' },
    { id: 'personalDetails', title: 'Personal Details' },
    { id: 'review', title: 'Review & Submit' },
  ];

  return <Wizard steps={steps} onComplete={handleComplete} />;
};
```

**Purpose**: Conditional step navigation.  
**Interactions**: Choose type on first step; path branches to business or personal details.

### Story: Skippable Step

**Path**: `Wizard/Skippable Step`

```jsx
export const SkippableStep = () => {
  const steps = [
    { id: 'account', title: 'Account' },
    { id: 'optional', title: 'Optional Info', skippable: true },
    { id: 'confirm', title: 'Confirm' },
  ];

  return <Wizard steps={steps} onComplete={handleComplete} />;
};
```

**Purpose**: Show Skip button and behavior.  
**Interactions**: Click Skip on optional step to advance without validation.

### Story: Validation & Error Handling

**Path**: `Wizard/Validation`

```jsx
export const Validation = () => {
  const steps = [
    {
      id: 'email',
      title: 'Email Address',
      validation: async (data) => {
        const response = await fetch('/api/validate-email', {
          body: data.email,
        });
        if (!response.ok) throw new Error('Email already in use');
      },
    },
    { id: 'confirm', title: 'Confirm' },
  ];

  return <Wizard steps={steps} onComplete={handleComplete} />;
};
```

**Purpose**: Show validation errors, blocking, and retry flow.  
**Interactions**: Enter email, click Next; if error, correct and retry.

### Story: Controlled Mode

**Path**: `Wizard/Controlled Mode`

```jsx
export const ControlledMode = () => {
  const [currentStep, setCurrentStep] = React.useState('step1');

  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
    { id: 'step3', title: 'Step 3' },
  ];

  const handleStepChange = (event) => {
    if (event.phase === 'completed' && event.toStepId) {
      setCurrentStep(event.toStepId);
    }
  };

  return (
    <Wizard
      steps={steps}
      currentStep={currentStep}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
    />
  );
};
```

**Purpose**: Parent owns state and navigation logic.

### Story: Uncontrolled Mode

**Path**: `Wizard/Uncontrolled Mode`

```jsx
export const UncontrolledMode = () => {
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
  ];

  return (
    <Wizard steps={steps} defaultStep="step1" onComplete={handleComplete} />
  );
};
```

**Purpose**: Wizard owns state (simplest case).

### Story: Custom Composition

**Path**: `Wizard/Custom Composition`

```jsx
export const CustomComposition = () => {
  const steps = [...]

  return (
    <Wizard steps={steps} onComplete={handleComplete}>
      <WizardHeader />
      <WizardProgress />
      <WizardContent>
        {/* Custom content rendering */}
      </WizardContent>
      <WizardFooter />
    </Wizard>
  )
}
```

**Purpose**: Advanced layout control via subcomponents.

### Story: Nested Sub-Steps

**Path**: `Wizard/Nested Sub-Steps`

**Purpose**: Demonstrate child-first navigation with parent-and-child steps, including next/previous traversal, `goTo(stepId)` targeting child nodes, and progress/header counters using flattened rendered order.

**Verification**:

- Parent-and-child steps render and navigate in v1 child-first order
- Step counter and progress labels reflect flattened rendered hierarchy order
- Parent progress status is derived from child statuses before passing to Stepper

### Story: Keyboard Navigation

**Path**: `Wizard/Keyboard Navigation`

**Purpose**: Verify keyboard-only operation.

**Documented Interactions**:

- Tab to focus first header control
- Tab to navigate to Next button
- Enter to activate
- All regions accessible via Tab
- Escape to dismiss consumer-managed confirmation dialog
- Arrow keys delegate to Stepper (if focused)

---

## Form Integration Pattern

Wizard is form-agnostic. To integrate with Grommet's Form component:

```jsx
<Wizard steps={steps} onComplete={handleComplete}>
  {/* Wrap content with Form */}
  <WizardContent>
    <Form
      value={formValue}
      onChange={setFormValue}
      onSubmit={handleFormSubmit}
      validate="blur"
    >
      <FormField name="email" label="Email" required />
      <FormField name="password" label="Password" required />
    </Form>
  </WizardContent>
</Wizard>
```

**Validation Integration**

- Step's `validation` hook can call Form's validation method
- Errors surface in Form field and are mapped to Stepper `error` state
- Focus moves to first invalid field on validation failure
- Form values can be stored in Wizard context (optional via `formValue`/`setFormValue` hook)

---

## Stepper Integration

Wizard optionally integrates Stepper for progress display when `showProgress !== false`.

### Progress Display Mapping

| `showProgress` Value | Stepper Direction | Rendering                                         |
| -------------------- | ----------------- | ------------------------------------------------- |
| `'horizontal'`       | `horizontal`      | Stepper displayed above WizardContent             |
| `'vertical'`         | `vertical`        | Stepper displayed as sidebar beside WizardContent |
| `false`              | —                 | No Stepper; progress display disabled             |

### Step Status Derivation Contract

Wizard derives each step's Stepper status based on navigation state, validation, and completion:

| Step Condition                                                    | Derived Status | Rationale                                                                              |
| ----------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| Step appears in `completedSteps` array                            | `completed`    | User has finished this step; checkmark icon.                                           |
| Step is current (`currentStep === step.id`) AND validation passed | `pending`      | Current step is active; ready for user input or next navigation.                       |
| Step is current AND validation failed                             | `error`        | Current step has validation errors; error icon and message.                            |
| Step comes after current step AND no `disabledReason`             | `pending`      | Future reachable step; not yet visited.                                                |
| Step comes after current step AND `disabledReason` is defined     | `disabled`     | Future step is blocked (e.g., missing prerequisites); reason shown via tooltip/inline. |
| Step comes before current step                                    | `completed`    | Past step is considered completed (implicit); visual closed state.                     |

For parent steps with children, Wizard derives parent status from children before passing data to Stepper:

- Any child in `error` -> parent `error`
- All children `completed` -> parent `completed`
- All children `disabled` -> parent `disabled`
- Otherwise -> parent `pending`

### Stepper Props Passed by Wizard

```typescript
<Stepper
  steps={[
    {
      id: step.id,
      title: step.title,
      description: step.description,
      status: derivedStatus, // 'pending' | 'completed' | 'error' | 'disabled'
      errorMessage: step.errorMessage,
      disabledReason: step.disabledReason,
    },
  ]}
  currentStep={currentStep}
  direction={showProgress === 'horizontal' ? 'horizontal' : 'vertical'}
  onStepClick={(stepId) => {
    // Wizard routes click to navigation policy (goTo, validation checks)
    wizard.navigation.goTo(stepId);
  }}
/>
```

### Integration Pattern

1. Wizard owns orchestration logic and validation state.
2. Stepper is purely presentational; receives step data and status from Wizard.
3. Stepper emits `onStepClick` events; Wizard handles routing via `navigation.goTo()`.
4. Wizard updates step statuses after navigation, validation, or completion and re-renders Stepper.

For Stepper API details, see [Stepper Component RFC](../stepper/REQUIREMENTS.md).

---

## Implementation Guide

### File Structure

```
src/js/components/Wizard/
├── Wizard.js                 // Main component
├── WizardContext.js          // Context provider
├── WizardHeader.js           // Subcomponent
├── WizardProgress.js         // Subcomponent (Stepper integration)
├── WizardStepHeader.js       // Subcomponent
├── WizardContent.js          // Subcomponent
├── WizardFooter.js           // Subcomponent
├── propTypes.js              // PropTypes definitions
├── index.d.ts               // TypeScript definitions
├── index.js                 // Exports
├── README.md                // Component overview
├── __tests__/
│   ├── Wizard.test.js
│   ├── navigation.test.js
│   ├── validation.test.js
│   └── accessibility.test.js
└── stories/
    ├── Wizard.stories.js
    └── Wizard.mdx
```

---

## Future Capabilities

- **Persisted Progress** — Optional hooks to save/restore workflow state
- **Completion View Slot** — Dedicated completion screen before `onComplete` callback
- **Analytics Integration** — Structured event callbacks for step impressions and funnel tracking
- **Advanced Stepper Policy** — Future Stepper navigation guards integration
- **Conditional Step Visibility** — Dynamic step show/hide based on form data
- **Multi-step Form Arrays** — Repeat groups of steps based on dynamic data

---

## References

- Stepper RFC: [RFC/stepper/REQUIREMENTS.md](../stepper/REQUIREMENTS.md)
- Grommet Form component: [src/js/components/Form/](../../src/js/components/Form/)
- Grommet Stepper (proposed): [src/js/components/Stepper/](../../src/js/components/Stepper/)
- WCAG 2.2 AA guidelines: https://www.w3.org/WAI/WCAG22/quickref/

---

## Appendix: Detailed Addendum

The sections below expand on the canonical Wizard requirements above. They should be read as supporting detail, not as an alternate source of truth.

### Core Container

```typescript
<Wizard
  id?: string
  steps={[{ id, title, description?, skippable?, validation?, nextStep? }, ...]}

  // Uncontrolled mode
  defaultStep?: string  // default: steps[0].id

  // Controlled mode
  currentStep?: string
  onStepChange?: (event: StepChangeEvent) => void

  // Completion and cancellation
  onComplete?: (data: { completedSteps: string[], formValue?: TFormValue }) => void
  onCancel?: (reason: 'user') => void

  // Progress display
  showProgress?: 'horizontal' | 'vertical' | false  // default: false
  // - false: no Stepper displayed
  // - 'horizontal': Stepper above content
  // - 'vertical': Stepper in sidebar beside content

  // Optional behavior/layout
  width?: string | ResponsiveValue
  scrollToTop?: boolean       // default: true; scroll on successful step transitions
>
  {children}
</Wizard>
```

### Step Definition Model

```typescript
{
  id: string                               // Unique identifier
  title: string                            // Display title
  description?: string | ReactNode
  skippable?: boolean                      // Allow skip() to advance
  validation?: (data: TFormValue) => Promise<void> | void  // Throws if invalid
  nextStep?: (data: TFormValue) => string     // Branching: return next step id
}
```

### Step Change Event Model

```typescript
type NavigationStepChangeEvent = {
  fromStepId: string;
  toStepId: string;
  trigger: 'next' | 'previous' | 'goTo' | 'skip';
  phase: 'attempted' | 'completed' | 'blocked';
  blocked?: boolean;
  error?: Error | string;
};

type TerminalStepChangeEvent = {
  fromStepId: string;
  toStepId?: never;
  trigger: 'complete' | 'cancel';
  phase: 'attempted' | 'completed';
  reason?: 'user'; // Cancel reason (only when trigger === 'cancel')
};

type StepChangeEvent = NavigationStepChangeEvent | TerminalStepChangeEvent;
```

`toStepId` is required for navigation transitions (`next`, `previous`, `goTo`, `skip`) and disallowed for terminal triggers (`complete`, `cancel`).

### Event Emission Contract

- For `next`, `previous`, `goTo`, and `skip`, Wizard emits `phase='attempted'` before validation/navigation guards run.
- If navigation is prevented (validation failure, disallowed target, or guard failure), Wizard emits `phase='blocked'` with `blocked=true` and optional `error`.
- On successful transition, Wizard emits `phase='completed'` with `toStepId`.
- For terminal actions (`complete`, `cancel`), Wizard emits `phase='attempted'` and then `phase='completed'`; `toStepId` may be omitted.
  - For cancel events, `reason` field is populated with `'user'` to match `onCancel(reason)` callback signature.
- Each attempted action produces exactly one terminal phase: either `blocked` or `completed`.

### State Source of Truth

- Wizard is controlled/presentational in controlled mode and stateful in uncontrolled mode.
- In controlled mode, `currentStep` is the requested active step from the parent.
- In uncontrolled mode, Wizard owns active step state initialized from `defaultStep`.
- If both `currentStep` and `defaultStep` are provided, Wizard treats the component as controlled and ignores `defaultStep` after initialization.
- `steps` is the canonical source for titles, descriptions, branching rules, and validation hooks.
- Wizard is responsible for deriving Stepper-compatible step states (`pending`, `completed`, `error`, `disabled`) before rendering Stepper.
- Wizard derives `effectiveStepId` as `currentStep` when valid, otherwise the first valid step id.
- If `currentStep` is missing or invalid in controlled mode, Wizard warns in development and uses `effectiveStepId` as a non-authoritative rendering fallback until the parent provides a valid `currentStep`.

### Navigation API

- `next()` — Validate current step and advance if valid
- `previous()` — Navigate to prior reachable step
- `goTo(stepId)` — Jump to a specific step id (Wizard applies navigation/validation rules)
- `skip()` — Advance without validation when current step is `skippable: true`
- `cancel()` — Trigger cancellation flow; consumers may gate this behind a confirmation `Layer`
- `complete()` — Trigger completion on final step or explicit completion action

### Composition Subcomponents

```typescript
<WizardHeader />         // Modal chrome header (wizard title/help/close)
<WizardProgress />       // Progress region host for integrated Stepper
<WizardStepHeader />     // Step counter/title/description within content area
<WizardContent />        // Step content surface region
<WizardFooter />         // Navigation actions region
<WizardStep />           // Optional explicit wrapper for advanced composition
```

### Context Hook

```typescript
const wizard = useWizard();
// Returns:
// {
//   currentStep: string
//   currentStepIndex: number
//   steps: WizardStepType[]
//   isValidating: boolean
//   isBlocked: boolean
//   isCompleted: boolean
//   navigation: { next, previous, goTo, skip, cancel, complete }
//   stepStates: { [stepId]: { completed: boolean, disabled: boolean, hasError: boolean } }
//   formValue?: TFormValue
//   setFormValue?: (value: TFormValue) => void
// }
```

### Optional Form Integration Pattern

- Wizard remains form-agnostic. When form behavior is needed:
  - Wrap `WizardContent` with Grommet `Form`
  - Keep form values in parent state or `useWizard().formValue`
  - Connect `validation()` step hooks to form validation outcomes
  - Move focus to first invalid field on validation failure
  - Mirror validation outcomes into Stepper state (`error`, `errorMessage`) through Wizard state mapping

---

## Anatomy

### Horizontal Progress Layout

Default built-in composition for `showProgress='horizontal'`.

```
 ┌───────────────────────────────────────────────────────────┐
 │ 1 Wizard Container                                        │
 │                                                           │
 │ 2 Modal Header Region                                     │
 │   2a Wizard Title                                         │
 │   2b Help / Close Actions                                 │
 │ ───────────────────────────────────────────────────────── │
 │ 3 Body Region                                             │
 │   3a Progress Region (Stepper - horizontal)               │
 │   3b Step Content Stack                                   │
 │      3b(i) Step Header (counter/title/description)        │
 │      3b(ii) Content Surface                               │
 │                                                           │
 │ 4 Footer Region (Previous / Next / Cancel / Skip)         │
 └───────────────────────────────────────────────────────────┘
```

### Vertical Progress Layout

```
 ┌────────────────────────────────────────────────────────────────┐
 │ 1 Wizard Container                                             │
 │ 2 Modal Header Region                                          │
 │ ────────────────────────────────────────────────────────────── │
 │ 3 Body Region                                                  │
 │ ┌── 3a Progress (Stepper - vertical) ──┐ ┌─ 3b Main Column  ─┐ │
 │ │                                      │ │ 3b(i) Step Header │ │
 │ │                                      │ │ 3b(ii) Content    │ │
 │ │                                      │ │ Surface           │ │
 │ └──────────────────────────────────────┘ └───────────────────┘ │
 │ 4 Footer Region                                                │
 └────────────────────────────────────────────────────────────────┘
```

|   Label    | Region                     | Purpose                                                                | Required | Notes                                                                  |
| :--------: | -------------------------- | ---------------------------------------------------------------------- | :------: | ---------------------------------------------------------------------- |
|   **1**    | **Wizard Container**       | Root layout and state orchestration boundary.                          |    ✓     | Width and outer positioning are parent-controlled.                     |
|   **2**    | **Modal Header Region**    | Wizard-level chrome: title and top actions (help/close).               |    ✓     | Rendered at top of modal/container.                                    |
|   **3**    | **Body Region**            | Primary layout region containing progress and step content structures. |    ✓     | Horizontal: stacked flow; vertical: progress sidebar plus main column. |
|   **3a**   | **Progress Region**        | Hosts Stepper when `showProgress` is enabled.                          | Optional | Hidden when `showProgress={false}`.                                    |
| **3b(i)**  | **Step Header Region**     | Step counter, title, and optional description.                         |    ✓     | Focus target on step transition.                                       |
| **3b(ii)** | **Content Surface Region** | Arbitrary step content and validation UI.                              |    ✓     | May include Form but is not required to.                               |
|   **4**    | **Footer Region**          | Navigation actions (Previous, Next, Skip, Cancel, Complete).           |    ✓     | Button visibility depends on step position and state.                  |

---

## Rendering & Layout

### Horizontal Layout (`showProgress='horizontal'`)

- Built-in layout renders Modal Header, then Body, then Footer.
- In Body: Progress appears above Step Header and Content Surface.
- Best for compact flows and shorter step titles.

### Vertical Layout (`showProgress='vertical'`)

- Built-in layout renders Modal Header, then Body, then Footer.
- In Body: Stepper is rendered in a sidebar beside Step Header and Content Surface.
- Best for longer step sets and workflows where step descriptions matter.

### No Progress Layout (`showProgress=false`)

- Stepper is omitted.
- Modal Header remains top-level; Body contains Step Header and Content Surface without Progress.
- Recommended when progress indicator is redundant or spatially constrained.

### Responsive Behavior

- Wizard adapts to available container real estate, not fixed viewport assumptions.
- As inline space decreases:
  - Horizontal progress keeps single-column layout while content area compresses.
  - Vertical progress may collapse to horizontal or stacked composition when sidebar becomes unreadable.
- Focus order and keyboard behavior remain stable across layout changes.

---

## Behavior & Interaction

### State Machine

**Idle** -> **Editing** -> **Validating** -> (**Blocked** or **Ready**) -> **Editing (next step)**  
Terminal states: **Canceled**, **Completed**

- Validating prevents duplicate submissions and disables advance actions while pending.
- Blocked persists until user corrects input, skips (if allowed), or cancels.
- Branching is deterministic: identical step data must resolve to the same `nextStep`.
- Cancellation confirmation, when needed, is consumer-managed rather than built into Wizard.

### Navigation Policy

- V1 policy is fixed and non-configurable. Wizard does not expose a `navigationPolicy` prop in v1.
- `next()` runs step validation before transition.
- `skip()` is available only when current step has `skippable: true`.
- `goTo(stepId)` behavior depends on direction:
  - **Backward navigation** (target step index < current step index): Skips validation on current step; always allows jump.
  - **Forward navigation** (target step index > current step index): Runs validation on current step; only transitions if valid.
  - **Same step**: No-op; no validation runs.
- `goTo(stepId)` to an unknown, disabled, or blocked target emits `phase='blocked'` and does not transition.
- Wizard does not mutate step definitions; parent updates data and controlled state as needed.

### Error & Recovery

- Validation errors are surfaced inline within Content Surface region.
- Optional error summary may appear above Content Surface region for multi-field failures.
- Async validation displays loading state and blocks re-submission.
- Retry behavior is explicit: user changes input then re-triggers navigation.
- Recoverable failures can be emitted through `onStepChange` events.

### Keyboard Model

- **Tab/Shift+Tab:** Move through Modal Header controls, Step Header, interactive Content Surface elements, Footer actions, and optional Stepper controls.
- **Enter/Space:** Activate focused action buttons.
- **Escape:** Dismiss a consumer-provided confirmation dialog (if open).
- **Arrow keys:** Delegated to Stepper when focus is within Stepper region.

### Focus Management

- On successful step transition, focus moves to step heading in Step Header region.
- On validation failure, focus moves to first invalid field (or error summary when configured).
- When a consumer-provided confirmation dialog opens, initial focus lands on the dialog's dismiss or safe action.

---

## Accessibility Requirements (WCAG 2.2 AA)

- [ ] Semantic structure with heading hierarchy (`h1` wizard title, `h2` step title)
- [ ] Step progress announced with clear position context when progress is visible (for example: "Step 2 of 5")
- [ ] Keyboard-only operation for all navigation actions and modal controls
- [ ] Validation messages linked with `aria-describedby` and announced via `aria-live="polite"`
- [ ] Focus transitions are deterministic on navigation and validation failure
- [ ] Consumer-provided confirmation dialog uses `role="alertdialog"`, labeled controls, and managed focus when included
- [ ] Contrast and target sizes satisfy WCAG 2.2 AA requirements
- [ ] Stepper integration preserves Stepper accessibility requirements when progress is shown

---

## Storybook Stories

### Story: **Basic Linear Wizard**

**Purpose:** Demonstrate the simplest linear setup with default horizontal progress.

### Story: **Vertical Progress Wizard**

**Purpose:** Demonstrate sidebar progress layout for longer multi-step workflows.

### Story: **No Progress Wizard**

**Purpose:** Demonstrate full-width Wizard behavior with progress hidden.

### Story: **Branching Flow**

**Purpose:** Demonstrate deterministic `nextStep(data)` routing for conditional paths.

### Story: **Skippable Step**

**Purpose:** Demonstrate `skippable` behavior and Skip action visibility.

### Story: **Validation Blocking**

**Purpose:** Demonstrate blocked transitions, inline errors, and retry behavior.

### Story: **Async Validation**

**Purpose:** Demonstrate loading state and duplicate-submission prevention.

### Story: **Controlled Mode**

**Purpose:** Demonstrate external state management with `currentStep` and `onStepChange`.

### Story: **Uncontrolled Mode**

**Purpose:** Demonstrate internal state with `defaultStep` and defaults.

### Story: **Custom Composition Layout**

**Purpose:** Demonstrate custom header/content/footer composition with `useWizard()`.

### Story: **Nested Sub-Steps**

**Purpose:** Demonstrate parent-and-child step traversal and flattened progress ordering in the v1 two-level hierarchy.

### Story: **Consumer-managed Cancel Confirmation**

**Purpose:** Demonstrate cancel confirmation as a consumer responsibility using Grommet's `Layer` before calling `onCancel` or exiting the flow.

### Story: **Keyboard Navigation**

**Purpose:** Verify keyboard-only usage end-to-end, including consumer-managed confirmation dialog and validation scenarios.

### Story: **Theming (Light & Dark)**

**Purpose:** Verify token-driven styling for all Wizard regions and action states.

---

## Future Capabilities

### Persisted Progress

- Optional persistence hooks for restoring interrupted workflows.

### Completion View Slot

- Optional dedicated completion screen slot separate from `onComplete` callback.

### Analytics Hooks

- Structured event callbacks for step impressions, transitions, and completion funnels.

### Automatic Cancellation on Timeout

- Future scope only. Any timeout-based cancellation model would require an explicit API addition and an expanded cancel event/reason contract beyond v1's `reason: 'user'`.

### Advanced Stepper Policy Integration

- Policy customization is deferred to future scope. V1 intentionally keeps a fixed navigation policy.
- Adoption of future Stepper navigation policy APIs (`navigationMode`, `allowStepJump`, blocked-navigation callbacks) once those capabilities graduate from Stepper's future roadmap.

---

## Theming Requirements

### Token Surface

```
wizard
  ├── container { background, border, shadow, gap }
  ├── header { background, textColor, spacing }
  ├── layout
  │   ├── horizontal { progressGap, sectionSpacing }
  │   └── vertical { sidebarWidth, contentGap, collapseBehavior }
  ├── content { background, padding, spacing }
  ├── footer { background, justifyContent, spacing }
  └── actions
      ├── previous { rest, hover, active, disabled, focus }
      ├── next { rest, hover, active, disabled, focus }
      ├── cancel { rest, hover, active, disabled, focus }
      └── skip { rest, hover, active, disabled, focus }
```

- [ ] Light and dark variants are available for all Wizard tokens
- [ ] Interactive state tokens are complete and consistent across actions
- [ ] Wizard inherits typography and semantic text color from Grommet theme
- [ ] Wizard token overrides do not require coupling to Stepper token overrides

---

## Integration with Stepper

- Wizard renders Stepper only when `showProgress` is enabled.
- Mapping rules:
  - `showProgress='horizontal'` -> Stepper `direction="horizontal"`
  - `showProgress='vertical'` -> Stepper `direction="vertical"`
  - `showProgress=false` -> no Stepper rendered
- Wizard owns derivation of Stepper `steps[]` status (`pending`, `completed`, `error`, `disabled`) from workflow state.
- Wizard wires Stepper `onStepClick` to Wizard navigation logic.
- Wizard remains orchestration owner; Stepper remains presentational.

For standalone Stepper requirements, see [Stepper Component RFC](../stepper/REQUIREMENTS.md).

---

## Acceptance Criteria

### Functionality

- [ ] Linear Wizard works with minimal props (`steps`; `onComplete` recommended)
- [ ] Branching Wizard resolves deterministic conditional paths with `nextStep`
- [ ] Controlled and uncontrolled modes provide equivalent user behavior
- [ ] Validation blocks unsafe transitions and surfaces clear error feedback
- [ ] Skip action is available only for steps marked `skippable`
- [ ] Consumer-managed cancel confirmation can be implemented with `Layer` without custom Wizard APIs

### Responsive Behavior

- [ ] Horizontal, vertical, and no-progress layouts render correctly across constrained and ample container space
- [ ] Vertical layout recomposes when sidebar presentation is no longer readable
- [ ] Focus order remains correct during responsive recomposition

### Accessibility

- [ ] Keyboard-only navigation works across regions, modals, and validation scenarios
- [ ] Screen readers receive step and error announcements
- [ ] Focus transitions are deterministic on step change and validation failure
- [ ] Stepper accessibility behavior is preserved when integrated

### Testing Coverage

- [ ] Unit: state transitions, branching logic, navigation guards (>85% coverage)
- [ ] Integration: validation -> error handling -> retry -> transition
- [ ] Accessibility: automated checks and manual keyboard-only verification
- [ ] Visual regression: major layouts and interaction states in light/dark themes

### Documentation & Migration

- [ ] API reference includes all Wizard props/events/hooks and composition points
- [ ] Migration guide maps template behaviors to Wizard API
- [ ] Example coverage includes linear, branching, custom composition, and Stepper integration

---

## Open Questions

1. **Branching Model**: Keep deterministic `nextStep(data)` only, or also allow centralized graph configuration?
2. **Completion UX**: Keep callback-only completion, or add optional completion slot in core API?
3. **Error Summary**: Keep optional summary region, or enforce summary on multi-error validation failures?
4. **Controlled Form State**: Should `formValue`/`setFormValue` remain optional hook fields or move to explicit top-level props?

---
