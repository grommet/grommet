# Stepper Component RFC

## One-Sentence Summary

A presentation-only progress indicator for multi-step workflows that displays step states, enables direct navigation, and optionally integrates with Wizard for orchestrated flows.

## Overview

A reusable progress indicator component that visualizes multi-step workflows. Stepper supports both horizontal and vertical directions, displays step completion states and errors, and enables direct step navigation via click or keyboard. Designed as a standalone component that works independently or integrates cleanly with Wizard for orchestrated workflows.

**Import Path**: `grommet`  
**Status**: Proposed  
**Related**: [Wizard Component RFC](../wizard/REQUIREMENTS.md)

---

## Table of Contents

1. [Overview](#overview)

   - [Use Cases](#use-cases)
   - [Goals](#goals)

2. [API Specification](#api-specification)

   - [Props Interface](#props-interface)
   - [Subcomponents & Hooks](#subcomponents--hooks)
   - [Type Definitions](#type-definitions)
   - [Step State Model](#step-state-model)
   - [Content Guidelines](#content-guidelines)

3. [Anatomy & Rendering](#anatomy--rendering)

   - [Component Hierarchy](#component-hierarchy)
   - [Horizontal Layout](#horizontal-layout)
   - [Vertical Layout](#vertical-layout)
   - [Step State Matrix](#step-state-matrix)

4. [Behavior & Interaction](#behavior--interaction)

   - [Interactive States](#interactive-states)
   - [Keyboard Navigation](#keyboard-navigation)
   - [Focus Management](#focus-management)

5. [Theming & Styling](#theming--styling)

   - [Theme Tokens](#theme-tokens)
   - [Component Styles](#component-styles)

6. [Accessibility (WCAG 2.2 AA)](#accessibility-wcag-22-aa)

   - [Semantic HTML](#semantic-html)
   - [ARIA Attributes](#aria-attributes)
   - [Keyboard Support](#keyboard-support)
   - [Color Contrast](#color-contrast)
   - [Screen Reader Testing](#screen-reader-testing)
   - [disabledReason Rendering & Accessibility](#disabledreason-rendering--accessibility)

7. [Storybook Stories](#storybook-stories)

8. [Implementation Guide](#implementation-guide)

   - [File Structure](#file-structure)
   - [Component Composition](#component-composition)

9. [Future Capabilities](#future-capabilities)
10. [Theming Requirements](#theming-requirements)
11. [Integration with Wizard](#integration-with-wizard)
12. [Acceptance Criteria](#acceptance-criteria)

---

## Overview

### Use Cases

- **Embedded in Wizard** — Display progress and enable jump-to-step navigation within Wizard's orchestration.
- **Standalone indicator** — Show workflow progress in documentation, onboarding flows, or system-driven process flows.
- **Custom orchestration** — Build advanced layouts where Stepper state is managed externally via custom logic.

### Goals

- [x] Provide a reusable, accessible progress indicator for multi-step workflows
- [x] Support horizontal and vertical layouts with responsive adaptation
- [x] Enable direct step navigation while remaining presentation-only (parent orchestrates validation/routing)
- [x] Display completion, error, and disabled states with clear visual distinction
- [x] Work standalone or integrate seamlessly with Wizard component
- [x] Meet WCAG 2.2 AA accessibility standards with full keyboard support
- [x] Themeable with design tokens for all states and regions
- [x] Support parent steps with child sub-steps (v1 scope: parent-and-child levels)

---

## API Specification

### Props Interface

```typescript
interface StepperProps {
  // Step definitions
  steps: StepType[];

  // Current active step
  currentStep: string;

  // Layout direction (default: 'horizontal')
  direction?: 'horizontal' | 'vertical';

  // Interaction control
  clickableSteps?: boolean; // default: true
  onStepClick?: (stepId: string) => void;

  // HTML attributes
  id?: string;
  a11yTitle?: string;

  // Custom rendering
  children?: React.ReactNode;
}

interface StepType {
  id: string; // Unique identifier
  title: string; // Display label (≤ 50 chars recommended)
  description?: string; // Optional secondary text (≤ 150 chars recommended)
  status?: StepStatus; // Progress state ('pending' | 'completed' | 'error' | 'disabled')
  disabledReason?: string; // Tooltip/inline text explaining why step is disabled
  errorMessage?: string; // Tooltip/inline text explaining validation error
  children?: Omit<StepType, 'children'>[]; // Optional child sub-steps (v1 supports one child level)
}

type StepStatus = 'pending' | 'completed' | 'error' | 'disabled';

// Effective visual state derived from step.status + whether step is current
type EffectiveStepState =
  | 'pending'
  | 'current'
  | 'completed'
  | 'current-completed'
  | 'error'
  | 'current-error'
  | 'disabled';
```

### Subcomponents & Hooks

When custom rendering is needed, use composition subcomponents that read from `StepperContext`:

```typescript
// Subcomponents (all read from context, no props required except stepId)
<StepperStep stepId={string} />
<StepperIndicator />           // Circular badge with number/icon
<StepperLabel />               // Step title
<StepperDescription />         // Optional secondary text
<StepperError />               // Error message (renders when step.status === 'error')

// Hook for advanced composition
const stepper = useStepper()
// Returns: {
//   currentStep: string
//   steps: StepType[]
//   stepIndex: (stepId: string) => number
//   isPriorStep: (stepId: string) => boolean
//   isAfterStep: (stepId: string) => boolean
//   isCurrentStep: (stepId: string) => boolean
//   canNavigateTo: (stepId: string) => boolean
// }
```

**Subcomponent Spec:**

- **`StepperError`**: Renders `step.errorMessage` as inline error text below the step label when `step.status === 'error'`. Uses error color (status-error token) and small font size. Automatically associated with the step button via `aria-describedby` for accessibility.

### Type Definitions

```typescript
// index.d.ts exports
declare module 'grommet' {
  interface StepType {
    id: string;
    title: string;
    description?: string;
    status?: 'pending' | 'completed' | 'error' | 'disabled';
    disabledReason?: string;
    errorMessage?: string;
    children?: Omit<StepType, 'children'>[];
  }

  interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
    steps: StepType[];
    currentStep: string;
    direction?: 'horizontal' | 'vertical';
    clickableSteps?: boolean;
    onStepClick?: (stepId: string) => void;
    id?: string;
    a11yTitle?: string;
    children?: React.ReactNode;
  }

  type StepperRef = HTMLOListElement;

  const Stepper: React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<StepperRef>
  >;

  interface StepperContextValue {
    currentStep: string;
    steps: StepType[];
    stepIndex: (stepId: string) => number;
    isPriorStep: (stepId: string) => boolean;
    isAfterStep: (stepId: string) => boolean;
    isCurrentStep: (stepId: string) => boolean;
    canNavigateTo: (stepId: string) => boolean;
  }

  const useStepper: () => StepperContextValue;
  const StepperContext: React.Context<StepperContextValue>;

  const StepperStep: React.FC<{ stepId: string }>;
  const StepperIndicator: React.FC;
  const StepperLabel: React.FC;
  const StepperDescription: React.FC;
  const StepperError: React.FC;
}
```

### Step State Model

Each step combines two independent sources of truth:

1. **`step.status`** — Progress history (`pending`, `completed`, `error`, `disabled`)
2. **`currentStep` prop** — Which step is active

This produces an **effective visual state**:

| `step.status` | Is Current? | Effective State     | Visual Treatment                                                   |
| ------------- | ----------- | ------------------- | ------------------------------------------------------------------ |
| `pending`     | No          | Pending             | Gray, empty indicator; neutral connector                           |
| `pending`     | Yes         | Current             | Highlighted indicator, bold label, neutral connector               |
| `completed`   | No          | Completed           | Checkmark icon, muted colors, success connector                    |
| `completed`   | Yes         | Current + Completed | Checkmark, highlighted, bold label, success connector              |
| `error`       | No          | Error               | Warning icon, error color, error connector                         |
| `error`       | Yes         | Current + Error     | Warning icon, error highlight, bold red label, error connector     |
| `disabled`    | No          | Disabled            | Gray indicator, disabled opacity, pending connector                |
| `disabled`    | Yes         | Invalid\*           | ⚠️ Warn in console; render as disabled and do not treat as current |

\*Providing `currentStep` that matches a disabled step is an error condition. Parent should prevent this via validation logic.

#### State Source of Truth & Conflict Handling

- Stepper is controlled and presentational. Parent state is the single source of truth.
- `step.status` is the canonical progress value for each step.
- `currentStep` is the canonical indicator of which step is active. It is the only input that produces the current visual overlay.
- If `currentStep` does not match any step id, Stepper should warn in development and render the first non-disabled step as fallback.
- Conflicting state inputs should trigger development warnings and deterministic fallback behavior.

**Conflict Resolution Examples:**

- `currentStep="step-3"` but step 3 has `status: 'disabled'` -> warn in development and render the step as disabled rather than current.
- `currentStep="invalid-id"` -> warn in development and render the first non-disabled step as current fallback.
- `disabled` + matches `currentStep` -> invalid authored state; render as disabled and do not treat as current.

#### Nested Step Scope (v1)

- V1 supports parent steps with one level of child sub-steps.
- Flat step arrays remain fully supported and unchanged.
- V1 does not include expand/collapse controls; when `children` are provided,
  child steps are rendered inline as part of the default hierarchy.
- Parent-and-child visibility is therefore deterministic in v1: all provided child
  steps are visible in rendered order.
- Descendants beyond the child level are unsupported in v1.
- In development builds, Stepper warns when deeper nesting is authored.
- Descendants beyond the child level are ignored in default rendering, keyboard traversal, and status rollups.
- When a parent step has children, parent status is a rollup:
  - Parent is `completed` when all children are `completed`.
  - Parent is `error` when any child is `error`.
  - Parent is `disabled` when all children are `disabled`.
  - Otherwise parent is `pending`.
- `currentStep` always identifies a concrete active node id (parent or child).

### Content Guidelines

**Step Titles**

- Must be non-empty strings with ≤ 50 characters
- Use sentence case: "Payment Details" not "PAYMENT DETAILS"
- Avoid special characters except hyphens and apostrophes
- Valid examples: "Account Setup", "Shipping Address", "Review & Confirm"

**Descriptions**

- Recommended ≤ 150 characters for readability
- Optional; omit if title alone is sufficient
- Shown with the label block: below the label in horizontal and below the label block in vertical

**Helper Text**

- **`errorMessage`**: Rendered below label in error color; associated with step via `aria-describedby`
- **`disabledReason`**: Rendered as tooltip on hover or inline in muted color
- Both may be shown simultaneously; error takes visual priority

---

## Anatomy & Rendering

### Component Hierarchy

```
<Stepper>                          // Root: <ol>
  [StepperContext.Provider]
  {steps.map((step) => (
    <React.Fragment key={step.id}>
      <StepperStep stepId={step.id}>                // parent <li>
        <StepperIndicator />
        <StepperLabel />
        {step.description && <StepperDescription />}
      </StepperStep>
      {step.children?.map((child) => (
        <StepperStep key={child.id} stepId={child.id}>   // child <li>
          <StepperIndicator />
          <StepperLabel />
          {child.description && <StepperDescription />}
        </StepperStep>
      ))}
    </React.Fragment>
  ))}
  [Horizontal connectors between indicators]
  [or vertical connectors between indicators]
</Stepper>
```

### Anatomy Diagrams

The diagrams below label each anatomical region. Part numbers are consistent across both orientations; the same regions apply in each layout.

#### Horizontal Orientation

```
 ┌──────────────────────────────────────────────────────────────────┐
 │  1  Stepper                                                      │
 │                                                                  │
 │   ┌─── 2  Step ──────────┐          ┌─── 2  Step ──────────┐     │
 │   │                      │          │                      │     │
 │   │    ╭──── 2a ────╮    │          │    ╭──── 2a ────╮    │     │
 │   │    │            │────┼─── 3 ────┼────│            │    │     │
 │   │    ╰────────────╯    │          │    ╰────────────╯    │     │
 │   │    2b  Label         │          │    2b  Label         │     │
 │   │    2c  Description   │          │    2c  Description   │     │
 │   └──────────────────────┘          └──────────────────────┘     │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

#### Vertical Orientation

```
 ┌──── 1  Stepper ──────────────────┐
 │                                  │
 │   ┌──── 2  Step ─────────────┐   │
 │   │  ╭──── 2a ────╮          │   │
 │   │  │            │  2b Label│   │
 │   │  ╰────────────╯  2c Desc.│   │
 │   └──────────────────────────┘   │
 │            │                     │
 │            3  Connector          │
 │            │                     │
 │   ┌──── 2  Step ─────────────┐   │
 │   │  ╭──── 2a ────╮          │   │
 │   │  │            │  2b Label│   │
 │   │  ╰────────────╯  2c Desc.│   │
 │   └──────────────────────────┘   │
 │            │                     │
 │            3  Connector          │
 │            │                     │
 │   ┌──── 2  Step ─────────────┐   │
 │   │  ╭──── 2a ────╮          │   │
 │   │  │            │  2b Label│   │
 │   │  ╰────────────╯          │   │
 │   └──────────────────────────┘   │
 │                                  │
 └──────────────────────────────────┘
```

| Label  | Region          | Purpose                                                                                          | Required | Notes                                                                                                                                                         |
| :----: | --------------- | ------------------------------------------------------------------------------------------------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**  | **Stepper**     | Container that arranges steps and connectors in the chosen direction.                            |    ✓     | Width is determined by parent layout, not Stepper itself.                                                                                                     |
| **2**  | **Step**        | A single node in the workflow sequence. Contains the indicator, label, and optional description. |    ✓     | Repeats once per rendered node in the hierarchy (parents and any inline child sub-steps).                                                                     |
| **2a** | **Indicator**   | Circular badge displaying the step number, a checkmark, or a status icon.                        |    ✓     | Content and visual treatment reflect the effective state. Minimum touch target 44x44px regardless of visual size.                                             |
| **2b** | **Label**       | Text identifying the step.                                                                       |    ✓     | Truncates to one line as horizontal real estate becomes constrained; may wrap in vertical layouts when space allows.                                          |
| **2c** | **Description** | Secondary text providing additional context for the step.                                        | Optional | When present, renders with the label block. In constrained horizontal layouts it may be visually truncated or hidden by parent-managed CSS treatment.         |
| **3**  | **Connector**   | Decorative line linking adjacent indicator centers.                                              |    ✓     | Length is computed from layout, not a fixed token. Color reflects the status of the preceding step. Marked `aria-hidden="true"`. Minimum stroke width is 1px. |

### Horizontal Layout

**Visual Structure**

- Steps arranged left-to-right in a single row
- Circular indicators centered on a horizontal connector track
- Labels appear below indicators
- Descriptions appear below labels (may truncate in constrained space)
- Connectors run horizontally between indicator centers, anchored to the vertical midpoint of the indicator row.
- Labels and descriptions sit below the connector track and do not affect connector position or length.

**Responsive Adaptation**

- **Ample space**: Full labels, all steps visible
- **Constrained space**: Labels truncate to single line
- **Severely constrained**: Icon-first layout; labels are not tooltip-only. Tooltips may supplement labels, but touch and keyboard users must have a non-tooltip path to read step labels.

**Strong Fallback Requirements (Collapsed Labels)**

- Tooltip content is supplemental only and must not be the only source of step label text.
- On touch/pointer devices, tapping a collapsed step reveals its label inline (or opens an expandable step summary panel) without requiring hover.
- On keyboard focus, collapsed steps reveal the label inline or in an adjacent always-readable region.
- Each step control must expose the full label programmatically (for example via visible text or `aria-label`) so screen readers do not depend on tooltip content.
- If a parent chooses panel-based fallback, the panel must list all steps with their statuses and remain reachable via keyboard.

**Connector Behavior**

- Runs horizontally between indicator center points
- Length formula: `distanceBetweenCenters - (radius1 + radius2)`
- Color reflects **preceding step status** (pending → gray, completed → success, error → red)
- Stroke width: minimum 1px for visibility
- Connector length is computed from available layout space; it is not a fixed token.
- Each connector segment reflects the status of the step that precedes it, not the status of the next step.

### Vertical Layout

**Visual Structure**

- Steps arranged top-to-bottom in a column
- Circular indicators on the left side
- Labels to the right of indicators
- Descriptions below labels
- Connectors run vertically between indicator centers, anchored to the horizontal center of the indicator column.
- Labels and descriptions extend to the right of the indicator track and do not affect connector position or length.

**Responsive Adaptation**

- **Sidebar layout**: Full labels and descriptions visible
- **Constrained sidebar**: Labels may truncate; descriptions still shown
- **No sidebar space**: Recompose to horizontal or collapse (parent-controlled)

**Connector Behavior**

- Runs vertically between indicator center points
- Length formula: `distanceBetweenCenters - (radius1 + radius2)`
- Color reflects **preceding step status**
- Stroke width: minimum 1px for visibility
- Connector length is computed from available layout space; it is not a fixed token.
- If the parent can no longer support vertical presentation, it may switch to a horizontal or stacked-card composition as a container-level layout decision.

### Step State Matrix

**All Combinations** (showing indicator icon, color, and connector)

| Effective State       | Indicator Icon | Indicator Color | Label Color       | Connector Color |
| --------------------- | -------------- | --------------- | ----------------- | --------------- |
| Pending (inactive)    | Step number    | Neutral gray    | Neutral gray      | Neutral gray    |
| Current (first visit) | Step number    | Accent/brand    | Bold accent/brand | Neutral gray    |
| Completed (inactive)  | ✓ Checkmark    | Success green   | Neutral gray      | Success green   |
| Current + Completed   | ✓ Checkmark    | Accent/brand    | Bold accent/brand | Success green   |
| Error (inactive)      | ⚠ Warning      | Error red       | Error red         | Error red       |
| Current + Error       | ⚠ Warning      | Error red       | Bold error red    | Error red       |
| Disabled (inactive)   | Step number    | Disabled gray   | Disabled gray     | Neutral gray    |

---

## Behavior & Interaction

### Interactive States

Applied only when `clickableSteps=true` and step is not `disabled`:

| State              | Trigger                           | Visual Effect                                                            |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------ |
| **Rest**           | No interaction                    | Base effective state only                                                |
| **Hover**          | Pointer over step                 | Subtle background tint on indicator; `cursor: pointer`                   |
| **Focus**          | Keyboard focus (`:focus-visible`) | Focus ring 2px outside indicator boundary; ≥ 3:1 contrast; keyboard-only |
| **Active/Pressed** | Mouse or keyboard press           | Brief scale (0.95) or shadow inset; ≤ 100ms duration                     |

**Non-interactive steps** (`disabled` or `clickableSteps=false`) never show hover or active states. Disabled steps may still receive visible focus when roving focus lands on them for discoverability.

### Keyboard Navigation

All keyboard interactions follow arrow key and focus patterns from native `<select>` and Tabs components:

| Key                          | Action                                                     |
| ---------------------------- | ---------------------------------------------------------- |
| **Tab/Shift+Tab**            | Move focus into/out of Stepper component                   |
| **Right Arrow** (horizontal) | Move focus to next step                                    |
| **Left Arrow** (horizontal)  | Move focus to previous step                                |
| **Down Arrow** (vertical)    | Move focus to next step                                    |
| **Up Arrow** (vertical)      | Move focus to previous step                                |
| **Home**                     | Move focus to first step                                   |
| **End**                      | Move focus to last step                                    |
| **Enter/Space**              | Activate focused step (fire `onStepClick` if not disabled) |

For parent-and-child sub-steps (v1):

- Arrow navigation follows rendered order (parent then its inline child steps).
- Parent-and-child nodes use the same activation rules (`clickableSteps`, `disabled` checks).
- Home/End move to the first/last rendered node in the current hierarchy.

**Disabled steps remain arrow-focusable** for discoverability, but they are not activatable.

**Roving Tabindex Pattern**

- Only one step in tab order at a time (`tabindex="0"`)
- All others are `tabindex="-1"`
- Arrow keys update which step receives `tabindex="0"`
- Tabbing into the Stepper lands on the current step when it is interactive; otherwise it lands on the first interactive step. Arrow navigation may then move focus onto disabled steps so their `disabledReason` can be discovered.

### Focus Management

- Initial focus (Tab into Stepper): First enabled step receives focus
- After click: Focus remains on clicked step; parent responsible for managing `currentStep` update
- On `currentStep` prop change: If new step is in Stepper, focus moves to it (only if triggered by keyboard event)
- Lost focus recovery: Focus returns to previously focused step when Stepper regains focus
- When a disabled step receives roving focus, focus remains visible and the step's reason text remains programmatically associated.

---

## Theming & Styling

### Theme Tokens

Stepper tokens are namespaced under `theme.stepper`:

```javascript
// src/js/themes/base.js
stepper: {
  // Container
  container: {
    // background: undefined (inherits from parent)
    // extend: undefined
  },

  // Indicator (step badge)
  indicator: {
    size: 'medium',                    // 'small' | 'medium' | 'large'
    border: {
      color: 'text-weak',              // Default border color
      width: '2px',
    },
    colors: {
      pending: {
        background: 'background-front', // or light gray
        text: 'text-strong',
        border: 'text-weak',
      },
      current: {
        background: 'brand',            // Accent color
        text: 'white',
        border: 'brand',
      },
      completed: {
        background: 'status-ok',        // Success color
        text: 'white',
        border: 'status-ok',
      },
      error: {
        background: 'status-error',     // Error color
        text: 'white',
        border: 'status-error',
      },
      disabled: {
        background: 'background-contrast',
        text: 'text-weak',
        border: 'text-weak',
      },
    },
    icon: {
      size: 'small',                   // For checkmark and warning icons
    },
  },

  // Label (step title text)
  label: {
    font: {},                           // Inherited from theme.text
    color: {
      default: 'text',
      current: 'brand',
      completed: 'text-weak',
      error: 'status-error',
      disabled: 'text-weak',
    },
    weight: {
      default: 'normal',
      current: 'bold',
    },
  },

  // Description (secondary text)
  description: {
    font: { size: 'small' },
    color: 'text-weak',
    margin: { top: 'xsmall' },
  },

  // Helper text (error and disabled messages)
  helperText: {
    font: { size: 'xsmall' },
    color: {
      error: 'status-error',
      disabled: 'text-weak',
    },
    margin: { top: 'xsmall' },
  },

  // Connector (line between steps)
  connector: {
    stroke: {
      width: '2px',
      color: {
        pending: 'border',              // Neutral
        completed: 'status-ok',         // Success
        error: 'status-error',          // Error
        disabled: 'border',             // Neutral
      },
    },
    // Responsive sizing
    horizontal: {
      margin: { vertical: 'medium' },
    },
    vertical: {
      margin: { horizontal: 'small' },
    },
  },

  // Direction-specific overrides
  horizontal: {
    gap: 'medium',                      // Gap between step columns
    label: { truncate: true },
  },
  vertical: {
    gap: 'medium',                      // Gap between step rows
    labelAlign: 'start',
  },

  // Interactive states
  focus: {
    ring: {
      color: 'focus',
      width: '2px',
      offset: '2px',
    },
  },
  hover: {
    background: 'background-contrast',  // Subtle tint
    shadow: undefined,
  },
  active: {
    transform: 'scale(0.95)',           // Tactile feedback
  },
}
```

### Component Styles

**Indicator**

- Minimum touch target: 44×44px regardless of icon size
- Circular shape: `border-radius: 50%`
- Icon and number centered within circle
- State-based colors applied via conditional CSS classes or styled-components

**Label & Description**

- Font: Inherited from `theme.text` (Grommet's default)
- Truncation: Horizontal layout truncates labels to 1 line by default
- Vertical wrapping: Vertical layout allows multi-line labels and descriptions

**Connectors**

- Rendered as `<svg>` line elements between indicator centers
- Length dynamically computed based on indicator size and step spacing
- Color derived from preceding step's status
- Responsive stroke width adjustment for smaller screens

**Focus Ring**

- Applied only with `:focus-visible` selector (keyboard-only)
- Positioned outside indicator boundary (offset from border)
- High contrast color (≥ 3:1 ratio with background)

---

## Accessibility (WCAG 2.2 AA)

### Semantic HTML

```html
<ol>
  <!-- Ordered list of steps -->
  <li>
    <!-- List item for each step -->
    <button>
      <!-- Interactive step control (if clickable) -->
      <span aria-hidden="true">1</span>
      <!-- Icon/number -->
      <span>Step Title</span>
    </button>
  </li>
</ol>
```

### ARIA Attributes

| Attribute             | Element                  | Value                            | Purpose                                                                                                                               |
| --------------------- | ------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-current="step"` | Current step's `<li>`    | `"step"`                         | Announces which step is active                                                                                                        |
| `aria-label`          | Interactive step         | `"Step 2 of 5: Payment Details"` | Full context for screen readers                                                                                                       |
| `aria-describedby`    | Step with error/disabled | ID of helper text                | Associates error/disabled reason                                                                                                      |
| `aria-live="polite"`  | Helper text region       | `"polite"`                       | Announce changes without interruption                                                                                                 |
| `aria-hidden="true"`  | Connector `<svg>`        | `"true"`                         | Hide decorative connector from SR                                                                                                     |
| `aria-disabled`       | Disabled step control    | `"true"`                         | Communicate disabled, non-activatable state while preserving discoverability in roving focus model                                    |
| `disabled`            | Button disabled step     | —                                | Do not use when disabled steps must remain discoverable via arrow-key focus; native disabled removes the control from the focus model |

### Keyboard Support

| Context                      | Keys             | Expected Behavior                                                                 |
| ---------------------------- | ---------------- | --------------------------------------------------------------------------------- |
| **Stepper focus**            | Tab              | Move focus into first enabled step                                                |
| **Within Stepper**           | Right/Down Arrow | Move focus to next step; disabled steps may receive focus for discoverability     |
| **Within Stepper**           | Left/Up Arrow    | Move focus to previous step; disabled steps may receive focus for discoverability |
| **Within Stepper**           | Home             | Jump to first step                                                                |
| **Within Stepper**           | End              | Jump to last step                                                                 |
| **Focused interactive step** | Enter/Space      | Activate step; fire `onStepClick`                                                 |
| **Focused disabled step**    | Enter/Space      | No activation; disabled state and associated reason remain announced              |

### Color Contrast

- All text meets WCAG AA (≥ 4.5:1) for normal text
- Interactive elements meet ≥ 3:1 for non-text color contrast
- Focus rings ≥ 3:1 against background
- Icon colors distinguish states (not color alone)

### Screen Reader Testing

- [ ] Step label and position announced on focus
- [ ] Current step announced with `aria-current="step"`
- [ ] Error and disabled messages announced via associated text
- [ ] Disabled steps can be discovered with arrow-key focus and announce their associated reason
- [ ] Connector is not announced (hidden with `aria-hidden="true"`)

### disabledReason Rendering & Accessibility

Disabled steps often require explanation to prevent user confusion. The `disabledReason` field on each step provides clear, actionable guidance on why a step is unavailable and what prerequisite action is needed.

#### Rendering Specification

**Visibility:**

- `disabledReason` is always available to keyboard and screen reader users via `aria-describedby` association with helper text element.
- In vertical layouts, `disabledReason` may render as inline helper text below the step indicator in muted color (with sufficient contrast).
- In horizontal layouts, `disabledReason` is optionally shown on focus/hover via tooltip or inline expansion.
- **Do not rely on hover-only tooltips:** Ensure the reason is also accessible via keyboard focus and screen readers.

**Programmatic Association:**

```typescript
// Disabled step with reason
<li aria-current={currentStep === step.id ? 'step' : undefined}>
  <button
    aria-disabled={step.status === 'disabled'}
    aria-describedby={step.disabledReason ? `reason-${step.id}` : undefined}
  >
    {/* Step indicator and label */}
  </button>
  {step.disabledReason && (
    <span id={`reason-${step.id}`} className="stepper-disabled-reason">
      {step.disabledReason}
    </span>
  )}
</li>
```

#### Content Requirements

`disabledReason` should:

1. **Describe why** the step is unavailable (e.g., "Requires Admin role").
2. **Suggest next action** when possible (e.g., "Complete Account Setup first" or "Contact your administrator").
3. Be concise and plain language (one sentence, < 100 characters preferred).
4. Use action verbs when appropriate ("Select at least one environment" vs. "No environments available").

**Good examples:**

- "Complete Account Setup first."
- "Requires Billing Admin role."
- "Available after 6:00 PM UTC maintenance window."
- "Select at least one environment to continue."

**Poor examples:**

- "Unavailable" (vague, no guidance)
- "Requires role" (incomplete, no next action)
- "Step locked" (no explanation)

#### WCAG & Accessibility Alignment

Disabled steps with clear reasons meet these WCAG 2.2 AA success criteria:

- **[1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)** — Do not rely on color/opacity alone; text explanation required.
- **[1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html)** — Reason description complements visual disabled state.
- **[2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)** — Reason text available on focus, not hover-only.
- **[3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)** — Provides instruction on how to proceed.
- **[4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)** — State and reason exposed to accessibility tree.

#### Enterprise Use Cases

`disabledReason` is essential for enterprise workflows where access control, prerequisite dependencies, and asynchronous validation are common:

1. **Permission gating** — "Requires Finance Approver role"
2. **Prerequisite completion** — "Complete Steps 1 and 2 first"
3. **Data dependency** — "Select at least one resource below"
4. **System lock** — "Record locked by Jane Smith until 5:00 PM"
5. **Compliance/legal** — "Accept data processing terms to continue"
6. **Timing/maintenance window** — "Available after maintenance (6:00 PM UTC)"
7. **Async validation** — "Checking permissions… try again in 10 seconds"

#### Keyboard & Composite Behavior

In roving-tabindex stepper layouts:

- Disabled steps remain programmatically focusable (focus can reach them via arrow keys) for discoverability.
- Use `aria-disabled="true"` and event guards to prevent activation while preserving focusability. Do not rely on the native `disabled` attribute when discoverability by arrow-key focus is required.
- Screen readers announce "disabled" when focused; associated `aria-describedby` reason is announced automatically.
- Users can discover what exists and why it is unavailable without getting "stuck."

---

## Storybook Stories

All stories use Grommet theming and support light/dark theme switching.

### Story: Horizontal Steps

**Path**: `Stepper/Horizontal Steps`

```jsx
export const HorizontalSteps = () => {
  const [currentStep, setCurrentStep] = React.useState('account');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'profile', title: 'Profile', status: 'pending' },
    { id: 'review', title: 'Review', status: 'pending' },
  ];

  return (
    <Box gap="medium">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        direction="horizontal"
        onStepClick={(id) => setCurrentStep(id)}
      />
      <Box pad="medium" background="background-contrast" round="small">
        <Paragraph>Step content for "{currentStep}"</Paragraph>
      </Box>
    </Box>
  );
};

HorizontalSteps.args = {};
HorizontalSteps.storyName = 'Horizontal Steps';
```

**Purpose**: Default horizontal layout with interactive navigation.  
**Controls**: `currentStep` selector to simulate step transitions.  
**Interactions**: Click steps to update active step.

### Story: Vertical Steps

**Path**: `Stepper/Vertical Steps`

```jsx
export const VerticalSteps = () => {
  const [currentStep, setCurrentStep] = React.useState('setup');

  const steps = [
    {
      id: 'setup',
      title: 'Setup',
      description: 'Configure your environment.',
      status: 'completed',
    },
    {
      id: 'deploy',
      title: 'Deploy',
      description: 'Push your application to production.',
      status: 'pending',
    },
    {
      id: 'verify',
      title: 'Verify',
      description: 'Run post-deployment checks.',
      status: 'pending',
    },
  ];

  return (
    <Box direction="row" gap="large" pad="medium">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        direction="vertical"
        onStepClick={(id) => setCurrentStep(id)}
      />
      <Box flex>
        <Heading level={2}>
          {steps.find((s) => s.id === currentStep)?.title}
        </Heading>
        <Paragraph>
          {steps.find((s) => s.id === currentStep)?.description}
        </Paragraph>
      </Box>
    </Box>
  );
};
```

**Purpose**: Vertical layout with descriptions.  
**Layout**: Sidebar stepper with content area to the right.

### Story: Error States

**Path**: `Stepper/Error States`

```jsx
export const ErrorStates = () => {
  const [currentStep, setCurrentStep] = React.useState('billing');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    {
      id: 'billing',
      title: 'Billing',
      status: 'error',
      errorMessage: 'Card number is invalid.',
    },
    { id: 'review', title: 'Review', status: 'pending' },
  ];

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepClick={(id) => setCurrentStep(id)}
    />
  );
};
```

**Purpose**: Show error state rendering and messages.  
**Verification**: Error message displayed; matches error color; associated with step.

### Story: Disabled Steps

**Path**: `Stepper/Disabled Steps`

```jsx
export const DisabledSteps = () => {
  const [currentStep, setCurrentStep] = React.useState('account');

  const steps = [
    { id: 'account', title: 'Account', status: 'completed' },
    { id: 'billing', title: 'Billing', status: 'pending' },
    {
      id: 'confirm',
      title: 'Confirm',
      status: 'disabled',
      disabledReason: 'Complete billing first.',
    },
  ];

  return (
    <Stepper
      steps={steps}
      currentStep={currentStep}
      onStepClick={(id) => setCurrentStep(id)}
    />
  );
};
```

**Purpose**: Show disabled state and restrictions.  
**Verification**: Disabled step is not activatable via click or Enter/Space, but can receive roving focus so its reason is available to screen reader and keyboard users.

### Story: Non-Interactive (Read-Only)

**Path**: `Stepper/Read-Only`

```jsx
export const ReadOnly = () => {
  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' },
    { id: 'step2', title: 'Step 2', status: 'completed' },
    { id: 'step3', title: 'Step 3', status: 'pending' },
    { id: 'step4', title: 'Step 4', status: 'pending' },
  ];

  return <Stepper steps={steps} currentStep="step3" clickableSteps={false} />;
};
```

**Purpose**: Stepper as decorative progress indicator.  
**Interactions**: Clicking steps has no effect; no cursor change.

### Story: Compound States

**Path**: `Stepper/Compound States`

```jsx
export const CompoundStates = () => {
  const [currentStep, setCurrentStep] = React.useState('step1');

  const steps = [
    { id: 'step1', title: 'Step 1', status: 'completed' },
    {
      id: 'step2',
      title: 'Step 2',
      status: 'error',
      errorMessage: 'Fix the issue before proceeding.',
    },
    { id: 'step3', title: 'Step 3', status: 'pending' },
  ];

  return (
    <>
      <Text>Current step: {currentStep}</Text>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(id) => setCurrentStep(id)}
      />
      <Box pad="medium" gap="small">
        {steps.map((step) => (
          <Button
            key={step.id}
            label={`Go to ${step.id}`}
            onClick={() => setCurrentStep(step.id)}
            disabled={step.status === 'disabled'}
          />
        ))}
      </Box>
    </>
  );
};
```

**Purpose**: Show current + completed and current + error states.  
**Verification**: Checkmark icon shown with current styling when returning to completed step.

### Story: Custom Composition

**Path**: `Stepper/Custom Composition`

```jsx
export const CustomComposition = () => {
  const [currentStep, setCurrentStep] = React.useState('step1');

  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
    { id: 'step3', title: 'Step 3' },
  ];

  return (
    <Stepper steps={steps} currentStep={currentStep} direction="horizontal">
      {steps.map((step, index) => (
        <StepperStep key={step.id} stepId={step.id}>
          <Box direction="row" gap="small" align="center">
            <StepperIndicator />
            <Box>
              <StepperLabel />
              {step.description && <StepperDescription />}
            </Box>
          </Box>
        </StepperStep>
      ))}
    </Stepper>
  );
};
```

**Purpose**: Advanced composition with context and subcomponents.  
**Hook usage**: `useStepper()` available within children.

### Story: Nested Sub-Steps

**Path**: `Stepper/Nested Sub-Steps`

**Purpose**: Demonstrate parent-and-child rendering, child-first keyboard traversal, and parent status rollup behavior in the v1 two-level hierarchy.

**Verification**:

- Parent-and-child nodes render in deterministic hierarchy order
- Arrow keys traverse parent-and-child nodes in rendered order
- Parent visual state reflects child rollup rules (`completed`, `error`, `disabled`, otherwise `pending`)

### Story: Keyboard Navigation

**Path**: `Stepper/Keyboard Navigation`

**Purpose**: Verify keyboard-only navigation is fully functional.

**Documented Interactions**:

- Tab to focus into first step
- Arrow keys to navigate between steps
- Home/End to jump to first/last step
- Enter/Space to activate focused step
- Disabled steps may receive focus for discoverability, but activation remains blocked

**Implementation Note**: Story itself is functional keyboard-testable example. Include documentation inline or in Storybook notes.

### Story: Responsive Behavior (Horizontal)

**Purpose**: Demonstrate how horizontal Stepper adapts as available inline space decreases.

**Verification**:

- Full labels in ample space
- One-line truncation in constrained space
- Icon-first layout with strong non-tooltip fallback in severely constrained space

### Story: All States Matrix

**Purpose**: Comprehensive visual grid showing all effective states for design QA and visual regression.

### Story: Theming (Light & Dark)

**Purpose**: Verify Stepper respects theme tokens across both orientations and all major states.

---

## Implementation Guide

### File Structure

```
src/js/components/Stepper/
├── Stepper.js              // Main component
├── StepperContext.js       // Context provider
├── StepperStep.js          // Subcomponent
├── StepperIndicator.js     // Subcomponent
├── StepperLabel.js         // Subcomponent
├── StepperDescription.js   // Subcomponent
├── StyledStepper.js        // Styled-components (if needed)
├── propTypes.js            // PropTypes definitions
├── index.d.ts              // TypeScript definitions
├── index.js                // Exports
├── README.md               // Component overview
├── __tests__/
│   ├── Stepper.test.js
│   ├── keyboard.test.js
│   └── accessibility.test.js
└── stories/
    ├── Stepper.stories.js
    └── Stepper.mdx
```

### Component Composition

**StepperContext.js**

```javascript
export const StepperContext = React.createContext({
  currentStep: '',
  steps: [],
  stepIndex: () => -1,
  isPriorStep: () => false,
  isAfterStep: () => false,
  isCurrentStep: () => false,
  canNavigateTo: () => false,
});

export const useStepper = () => React.useContext(StepperContext);
```

**Stepper.js**

- Use `forwardRef` to expose ref (HTML `<ol>` element)
- Render `<ol>` with semantic list structure
- Provide `StepperContext` to children
- Handle keyboard navigation (arrow keys, tab)
- Render default layout if no children
- Use `useThemeValue()` to access Stepper tokens

**Subcomponents**

- Each accepts only `stepId` (for `StepperStep`) or no props
- Read all styling and state from context via `useStepper()`
- Self-contained rendering logic

---

## Future Capabilities

The following features are not included in the MVP but are planned enhancements for future releases:

### Navigation Constraints (`navigationMode` and `allowStepJump`)

**Purpose:** Provide fine-grained control over step navigation flow beyond simple clickability.

**Proposed API:**

```typescript
navigationMode?: 'linear' | 'nonLinear'  // default: 'linear'
allowStepJump?: 'previousOnly' | 'completedOnly' | 'anyEnabled'  // default: 'previousOnly' in linear mode
```

**Use Cases:**

- **`navigationMode: 'linear'`** enforces sequential progress with `allowStepJump` constraints:
  - `'previousOnly'`: Users may only return to current or prior steps (default wizard behavior)
  - `'completedOnly'`: Users may jump back to previously completed steps, but not ahead to incomplete steps
  - `'anyEnabled'`: Users may click any non-disabled step (less restrictive linear mode)
- **`navigationMode: 'nonLinear'`** allows free navigation to any non-disabled step (e.g., settings panel, independent workflows)

**Implementation Considerations:**

- Navigation policy logic separate from clickability
- May require additional callback/event for blocked navigation scenarios
- Consider UX feedback mechanisms when navigation is blocked (tooltip, message, etc.)

### Blocked Navigation Callback (`onBlockedStepNavigation`)

**Purpose:** Notify parent when user attempts to navigate to an inaccessible step.

**Proposed API:**

```typescript
onBlockedStepNavigation?: (details: {
  fromStepId: string
  toStepId: string
  reason: 'step-disabled' | 'navigation-policy-violation'
}) => void
```

**Use Cases:**

- Show validation error messages ("Please complete current step before continuing")
- Log analytics for UX research
- Implement custom feedback UI (toast, inline message, etc.)

### Size and Density Variants (`size` prop)

**Purpose:** Support visual density scaling for different use cases and screen sizes.

**Proposed API:**

```typescript
size?: 'small' | 'medium' | 'large'  // default: 'medium'
```

**Variants:**

- **small (24px indicator):** Compact mobile layouts, narrow sidebars
- **medium (32px indicator):** Default, works for most use cases
- **large (40px indicator):** Accessibility-focused, touch-friendly, desktop-first

**Implementation Considerations:**

- Scales: indicator diameter, icon size, label/description type scale, connector thickness, inter-step gap
- Min touch target (44×44px) must be maintained across all sizes per WCAG
- May be better served by theming/design tokens rather than a prop

### Controlled Description Visibility (`showDescriptions` prop)

**Purpose:** Allow consumers to override default description visibility behavior independent of data.

**Proposed API:**

```typescript
showDescriptions?: boolean  // default: undefined (direction-based)
```

**Current MVP behavior:** Descriptions always render when present in step object; visibility controlled by parent CSS.

**Future Enhancement:** Prop-based control allowing:

- Force hide descriptions regardless of step data
- Force show descriptions even when the parent would otherwise visually truncate or hide them in constrained horizontal layouts
- Different defaults per direction

---

## Theming Requirements

### Token Surface

```
stepper
  ├── container { background, padding, gap }
  ├── step
  │   ├── indicator { size, background, border, textColor }
  │   ├── icon { size, color }
  │   ├── label { textColor, fontSize, fontWeight }
  │   ├── description { textColor, fontSize }
  │   ├── focusRing { color, width, offset, style }
  │   └── states
  │       ├── pending          { indicator.background, indicator.border, label.color }
  │       ├── current          { indicator.background, indicator.border, label.color }
  │       ├── currentCompleted { indicator.background, indicator.border, label.color }
  │       ├── currentError     { indicator.background, indicator.border, label.color }
  │       ├── completed        { indicator.background, indicator.border, label.color }
  │       ├── error            { indicator.background, indicator.border, label.color }
  │       ├── disabled         { indicator.background, indicator.border, label.color }
  │       └── interactive      // overlays applied over any base state above
  │           ├── hover  { indicator.background, indicator.border }
  │           └── active { indicator.background, indicator.scale }
  ├── connector
  │   ├── stroke { color }         // line color; varies by state
  │   ├── strokeWidth              // tokenized stroke width
  │   ├── margin                   // gap between indicator edge and connector start/end
  │   └── states { pending, completed, error }
  │       // note: connector length is computed from layout, not a token
  └── interactive { cursor, hover background }
```

- [ ] All step states (current, completed, error, disabled, pending) have distinct visual tokens
- [ ] Both directions support identical state tokens
- [ ] Light/dark theme variants provided
- [ ] Color palette respects system theme (light/dark mode)

---

## Integration with Wizard

When Wizard's `showProgress` is set to `'horizontal'` or `'vertical'`:

- Wizard automatically renders `<Stepper>` above/beside content
- Stepper receives `steps`, `currentStep` from Wizard context
- Wizard is responsible for shaping each step object's `status`, `errorMessage`, and `disabledReason` before passing `steps` into Stepper
- Stepper `onStepClick` is wired to Wizard navigation (respects validation)
- Wizard manages all state; Stepper is presentational
- For parent steps with children, Wizard supplies child-first rendered order and rolled-up parent status

For Stepper used standalone (without Wizard), all state and navigation are managed by parent component.

---

## Acceptance Criteria

### Functionality

- [ ] Stepper renders all steps with correct state indicators
- [ ] Horizontal direction displays left-to-right with connectors
- [ ] Vertical direction displays top-to-bottom with descriptions
- [ ] Current step is visually distinct and announced
- [ ] Completed steps show checkmark icon
- [ ] Error steps show error icon and error color
- [ ] Disabled steps are not activatable and remain discoverable through roving focus with their associated reason text
- [ ] Clicking a non-disabled step fires `onStepClick`
- [ ] Standalone Stepper works without Wizard
- [ ] Stepper with custom renderer compiles without private APIs
- [ ] Conflicting state inputs produce deterministic behavior and development warnings
- [ ] Connector color is derived from the preceding step's status rather than the next step's status
- [ ] Parent steps with child steps render deterministically in documented order
- [ ] Parent status rollup follows the v1 nested-state rules
- [ ] `onStepClick` supports interactive parent-and-child step ids

### Responsive Behavior

- [ ] Horizontal behavior responds to available inline space per spec
- [ ] Vertical behavior responds to available container space per spec
- [ ] Horizontal direction displays left-to-right with connectors
- [ ] Vertical direction displays top-to-bottom with descriptions
- [ ] Both directions remain readable as container real estate decreases
- [ ] Overflow or recomposition behavior is explicit and tested, matching the documented real-estate response model

### Accessibility

- [ ] Keyboard-only navigation works (Tab, Arrow keys, Enter/Space)
- [ ] All steps announced properly for screen readers
- [ ] Current step always has `aria-current="step"`
- [ ] Error states are announced with descriptive messages
- [ ] Focus visible on all interactive elements
- [ ] Home/End keyboard behavior works with the full roving-focus model
- [ ] Disabled steps announce disabled state and `disabledReason` when focused
- [ ] Collapsed-label fallback remains usable for touch and keyboard users without relying on tooltip-only access

### Testing Coverage

- [ ] Unit: state calculations, click handling, keyboard events (>85% coverage)
- [ ] Integration: Stepper + Wizard with validation → step click → validate → navigate
- [ ] Accessibility: keyboard-only and screen reader testing
- [ ] Visual regression: all state combinations in both orientations, light/dark themes

---

## References

- Wizard Component RFC: [RFC/wizard/REQUIREMENTS.md](../wizard/REQUIREMENTS.md)
- Grommet Tabs (composition reference): [src/js/components/Tabs/](../../src/js/components/Tabs/)
- Grommet Form (composition reference): [src/js/components/Form/](../../src/js/components/Form/)
- WCAG 2.2 AA guidelines: https://www.w3.org/WAI/WCAG22/quickref/
