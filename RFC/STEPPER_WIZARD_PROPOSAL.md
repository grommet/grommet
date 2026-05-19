# RFC: Stepper and Wizard Components for Multi-Step Workflows

## Overview

This RFC proposes two complementary components for multi-step workflow management:

- **[Stepper](https://github.com/grommet/grommet/issues/7945)** — A presentation-only progress indicator for multi-step workflows that displays step states, enables direct navigation, and optionally integrates with Wizard for orchestrated flows.

- **[Wizard](https://github.com/grommet/grommet/issues/7946)** — A workflow orchestrator for multi-step processes that manages navigation, validation, and state—with optional Stepper integration for visual progress display.

### Design Philosophy

These components follow a **loosely coupled integration model**: Wizard is a complete, standalone orchestrator for step-based flows. Stepper is a presentational component that can be used independently OR composed by Wizard for visual progress display. Neither component requires the other; both work in isolation.

---

## Design Goals

- [x] Provide reusable components for common multi-step workflow patterns
- [x] Loose coupling: Wizard and Stepper work independently and together
- [x] Align with existing Grommet patterns (Form, Tabs, Accordion composition models)
- [x] Support both controlled and uncontrolled usage modes
- [x] Full WCAG 2.2 AA accessibility with comprehensive keyboard support
- [x] Context-based composition for advanced customization (useStepper, useWizard hooks)
- [x] Complete TypeScript support with strict type definitions
- [x] Theme-driven styling with design tokens for all states
- [x] Horizontal and vertical layout support with responsive adaptation

---

## Key Design Decisions

### 1. **Presentation vs. Orchestration Separation**

- **Stepper** = Presentation only (displays state, fires click events, parent handles navigation)
- **Wizard** = Orchestration (manages state, validation, fixed v1 navigation behavior, and step progression)
- This separation allows Stepper to be used in dashboards, documentation, or other contexts without needing Wizard

### 2. **Controlled/Uncontrolled Modes**

Both components support React's standard patterns:

- **Controlled**: Parent manages state (`currentStep` prop + `onStepChange` callback)
- **Uncontrolled**: Component manages state internally (`defaultStep` prop)
- Aligns with Form component precedent in Grommet

### 3. **Step State Model (Stepper)**

Visual state is derived from two independent inputs:

- `step.status` — Progress history (`pending`, `completed`, `error`, `disabled`)
- `currentStep` prop — Which step is active

This produces **effective visual states** (e.g., `current + completed` when returning to edit a finished step).

### 4. **Validation & Navigation Policy (Wizard)**

- Validation is optional and per-step (synchronous or async)
- V1 navigation policy is fixed and non-configurable: `next()` validates before advancing, `previous()` always allows backward movement, and `goTo()` validates only when moving forward
- Parent responds to emitted events and may control state in controlled mode, but Wizard owns the built-in navigation rules

### 5. **Optional Form Integration (Wizard)**

- Wizard works standalone (no Form required)
- Can optionally wrap a Form component for form-aware workflows
- This keeps Wizard form-agnostic while supporting form-heavy use cases

### 6. **Context-Based Composition**

- Subcomponents (StepperStep, StepperIndicator, WizardContent, etc.) read from context
- `useStepper()` and `useWizard()` hooks provide access to state and helper methods
- Enables advanced customization (timeline views, card-based layouts, etc.) without component library changes

---

## API Highlights

### Stepper (Presentation Component)

```typescript
<Stepper
  steps={[
    {
      id: string
      title: string
      description?: string
      status?: 'pending' | 'completed' | 'error' | 'disabled'
      disabledReason?: string
      errorMessage?: string
    }
  ]}
  currentStep={string}
  direction="horizontal" | "vertical"  // default: 'horizontal'
  clickableSteps?: boolean  // default: true
  onStepClick?: (stepId: string) => void
>
  {/* Optional custom rendering with subcomponents */}
</Stepper>
```

**Key Features:**

- Semantic `<ol>` list structure for accessibility
- Roving tabindex keyboard navigation (arrow keys, Home/End, Tab)
- Automatic connector rendering between steps
- Subcomponents: `StepperStep`, `StepperIndicator`, `StepperLabel`, `StepperDescription`
- Hook: `useStepper()` for advanced composition

---

### Wizard (Orchestration Component)

```typescript
<Wizard
  steps={[
    {
      id: string
      title: string
      description?: string
      skippable?: boolean
      validation?: (data: unknown) => Promise<void> | void
      nextStep?: (data: unknown) => string  // For branching logic
    }
  ]}

  // State (controlled mode)
  currentStep?: string
  onStepChange?: (event: StepChangeEvent) => void

  // State (uncontrolled mode)
  defaultStep?: string

  // Features
  showProgress?: false | 'horizontal' | 'vertical'  // Stepper integration
  onComplete?: (data: WizardCompletionData<unknown>) => void
  onCancel?: (reason: 'user') => void
  scrollToTop?: boolean  // default: true
>
  {/* Optional custom rendering with subcomponents */}
</Wizard>
```

**Key Features:**

- Smart defaults for linear workflows
- Step-level validation with async support
- Branching logic support (nextStep resolver)
- Skippable steps
- Stepper integration for progress display
- Navigation API: `next()`, `previous()`, `goTo(stepId)`, `skip()`, `complete()`, `cancel()`
- Subcomponents: `WizardHeader`, `WizardProgress`, `WizardContent`, `WizardFooter`
- Hook: `useWizard()` for accessing state and navigation

---

## Component Interaction Model

```
┌─────────────────────────────────────────┐
│  Parent Component (State Owner)         │
│  ├─ currentStep state                   │
│  ├─ validation logic                    │
│  └─ event handling / data updates       │
└────────┬────────────────────────────────┘
         │
         ├─── Wizard (Orchestrator)
         │    ├─ Manages internal state
         │    ├─ Validates steps
         │    ├─ Provides navigation API
         │    └─ Optional: renders Stepper if showProgress
         │
         └─── Stepper (Standalone)
              ├─ Displays progress
              ├─ Fires click events
              └─ No navigation logic
```

**Wizard** can internally render **Stepper** when `showProgress` is `'horizontal'` or `'vertical'`, creating a fully orchestrated flow. Or either component can be used independently.

---

## Implementation Roadmap

### Phase 1: Core Implementation (2-3 weeks)

- [ ] Stepper component with horizontal/vertical layout
- [ ] Step state model and effective state derivation
- [ ] Keyboard navigation and roving tabindex
- [ ] Wizard component with linear navigation
- [ ] Basic validation support (sync + async)
- [ ] Theme tokens for base component styling
- [ ] TypeScript definitions
- [ ] Unit tests (85%+ coverage)
- [ ] Storybook stories (8-10 basic stories)

### Phase 2: Advanced Features (2 weeks)

- [ ] Wizard subcomponents (WizardHeader, WizardContent, WizardFooter, WizardProgress)
- [ ] Form integration pattern
- [ ] Custom rendering with context hooks
- [ ] Branching logic (nextStep resolver)
- [ ] Skippable steps
- [ ] Keyboard navigation stories and tests
- [ ] Accessibility audit and refinement

### Phase 3: Polish & Documentation (1-2 weeks)

- [ ] Complete theme token coverage (light/dark themes)
- [ ] Visual regression testing
- [ ] Comprehensive screen reader testing
- [ ] Storybook documentation (MDX)
- [ ] Implementation guide for maintainers
- [ ] grommet-site documentation

### Total Estimated Timeline: 5-8 weeks

---

## What's Included in This RFC

✅ **Complete API Specifications**

- TypeScript definitions with full type safety
- Props interface with JSDoc comments
- Subcomponent and hook specifications

✅ **Detailed Component Anatomy**

- ASCII diagrams for both orientations
- Component hierarchy visualization
- Step state matrix (all 8 possible states)
- Interactive state mappings

✅ **Comprehensive Accessibility**

- WCAG 2.2 AA compliance checklist
- Semantic HTML structure
- ARIA attribute mapping
- Keyboard navigation requirements
- Color contrast specifications

✅ **Theming & Design Tokens**

- Complete theme token structure
- State-based color mappings
- Direction-specific overrides
- Interactive state treatments

✅ **Storybook Story Specifications**

- 10+ story specifications with JSX code
- Purpose, controls, and interactions documented
- Coverage: linear flow, branching, validation, custom composition, keyboard navigation

✅ **File Structure & Implementation Guidance**

- Recommended directory layout
- Component composition patterns
- Context provider structure
- Testing approach recommendations

---

## Design Validation Against Existing Grommet Patterns

| Pattern                     | Precedent                    | Stepper/Wizard Implementation                                              |
| --------------------------- | ---------------------------- | -------------------------------------------------------------------------- |
| **Composition Model**       | Form/FormField, Tabs/Tab     | Stepper/StepperStep, Wizard/WizardContent subcomponents with context hooks |
| **Controlled/Uncontrolled** | Form, Select                 | Both components support controlled + uncontrolled modes                    |
| **Context & Hooks**         | Tabs (useTab), FormContext   | useStepper(), useWizard() hooks for advanced composition                   |
| **Theme Namespacing**       | theme.tabs, theme.form       | theme.stepper._, theme.wizard._                                            |
| **Accessibility**           | WCAG 2.2 AA baseline         | Full compliance with semantic HTML, ARIA, keyboard support                 |
| **TypeScript**              | index.d.ts in all components | Complete type definitions with React generics                              |

---

## Questions for Maintainers

1. **Architectural Alignment** — Does the loose coupling model and presentation vs. orchestration separation align with Grommet's design philosophy?

2. **API Naming** — Are the prop names (`clickableSteps`, `showProgress`, `onStepChange`, etc.) consistent with Grommet naming conventions?

3. **Navigation Policy** — Is the fixed v1 navigation model acceptable for the initial release, with richer policy customization deferred to future scope?

4. **Form Integration** — Should WizardContent automatically support `<Form>` wrapping, or should integration be documented as optional parent-level composition?

5. **Priority & Timeline** — Does this fit Grommet's roadmap? Any timeline constraints or other dependencies to be aware of?

6. **Maintainer Support** — Would you prefer I implement these components initially, or would you like to assign them to maintainers after RFC approval?

---

## Full RFC Documents

For complete details, specifications, and implementation guidance, see:

- **[Stepper RFC](https://github.com/grommet/grommet/issues/7945)**

  - Complete API specification with TypeScript definitions
  - Step state model and effective state derivation
  - Theming tokens and component styles
  - WCAG 2.2 AA accessibility requirements
  - 8+ Storybook story specifications with code
  - Implementation guide and file structure

- **[Wizard RFC](https://github.com/grommet/grommet/issues/7946)**
  - Complete API specification with controlled/uncontrolled modes
  - Step definition and validation models
  - Event model and state machine
  - Navigation API and branching logic
  - Stepper integration patterns
  - Form integration guidance
  - 10+ Storybook story specifications with code
  - Implementation guide and file structure

---
