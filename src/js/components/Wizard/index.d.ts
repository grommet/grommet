import * as React from 'react';

export type WizardDirection = 'horizontal' | 'vertical';

export type WizardStepStatus = 'pending' | 'completed' | 'error' | 'disabled';

export type WizardTrigger =
  | 'next'
  | 'previous'
  | 'goTo'
  | 'skip'
  | 'complete'
  | 'cancel';

export type WizardPhase =
  | 'requested'
  | 'validating'
  | 'validated'
  | 'navigated'
  | 'blocked'
  | 'completed'
  | 'cancelled';

export interface WizardStep<TValue = Record<string, any>> {
  id: string;
  title: string;
  description?: React.ReactNode;
  render?: (
    step: WizardStep<TValue>,
    api: WizardApi<TValue>,
  ) => React.ReactNode;
  validate?: (
    value: TValue,
  ) =>
    | boolean
    | string
    | void
    | { error?: string }
    | Promise<boolean | string | void | { error?: string }>;
  nextStep?: (value: TValue) => string | undefined | null;
  skippable?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  children?: WizardStep<TValue>[];
  'aria-label'?: string;
}

export interface WizardApi<TValue = Record<string, any>> {
  formValue: TValue;
  setFormValue: (next: TValue | ((prev: TValue) => TValue)) => void;
  next: () => void;
  previous: () => void;
  goTo: (stepId: string) => void;
  skip: () => void;
  complete: () => void;
  cancel: () => void;
}

// Discriminated union for onStepChange events. Consumers can narrow on
// `trigger` + `phase` to reason about event flow without inspecting DOM.
export interface NavigationStepChangeEvent {
  trigger: Exclude<WizardTrigger, 'cancel'>;
  phase: Exclude<WizardPhase, 'cancelled'>;
  from?: string;
  to?: string;
  error?: string;
}

export interface TerminalStepChangeEvent {
  trigger: 'cancel' | 'complete';
  phase: 'cancelled' | 'completed';
  from?: string;
}

export type StepChangeEvent =
  | NavigationStepChangeEvent
  | TerminalStepChangeEvent;

export interface WizardMessages {
  previous?: string;
  next?: string;
  skip?: string;
  cancel?: string;
  complete?: string;
  stepCounter?: string;
  progress?: string;
  validationError?: string;
}

export interface WizardProps<TValue = Record<string, any>> {
  steps: WizardStep<TValue>[];
  currentStep?: string;
  defaultStep?: string;
  direction?: WizardDirection;
  onStepChange?: (event: StepChangeEvent) => void;
  onComplete?: (value: TValue) => void;
  onCancel?: (value: TValue) => void;
  renderStep?: (
    step: WizardStep<TValue>,
    api: WizardApi<TValue>,
  ) => React.ReactNode;
  header?:
    | React.ReactNode
    | {
        title?: React.ReactNode;
        description?: React.ReactNode;
      };
  footer?: React.ReactNode | ((api: WizardApi<TValue>) => React.ReactNode);
  scrollToTop?: boolean;
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  id?: string;
  'aria-label'?: string;
  a11yTitle?: string;
  messages?: WizardMessages;
  children?: React.ReactNode;
}

declare const Wizard: <TValue = Record<string, any>>(
  props: WizardProps<TValue> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export { Wizard };

export interface WizardContextValue<TValue = Record<string, any>> {
  steps: WizardStep<TValue>[];
  currentStep: string;
  currentStepIndex: number;
  currentStepObj?: WizardStep<TValue>;
  totalSteps: number;
  completedSteps: Set<string>;
  visitedSteps: string[];
  formValue: TValue;
  setFormValue: (next: TValue | ((prev: TValue) => TValue)) => void;
  validationError?: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  next: () => void;
  previous: () => void;
  goTo: (stepId: string) => void;
  skip: () => void;
  complete: () => void;
  cancel: () => void;
  getStepStatus: (stepId: string) => WizardStepStatus;
  direction: WizardDirection;
  messages?: WizardMessages;
}

export const WizardContext: React.Context<WizardContextValue>;

export function useWizard<
  TValue = Record<string, any>,
>(): WizardContextValue<TValue>;

export interface WizardHeaderProps {
  header?:
    | React.ReactNode
    | {
        title?: React.ReactNode;
        description?: React.ReactNode;
      };
}

export const WizardHeader: React.FC<WizardHeaderProps>;

export interface WizardProgressProps {
  ariaLabel?: string;
}

export const WizardProgress: React.FC<WizardProgressProps>;

export const WizardStepHeader: React.FC;

export interface WizardContentProps<TValue = Record<string, any>> {
  renderStep?: (
    step: WizardStep<TValue>,
    api: WizardApi<TValue>,
  ) => React.ReactNode;
}

export const WizardContent: <TValue = Record<string, any>>(
  props: WizardContentProps<TValue>,
) => React.ReactElement;

export const WizardFooter: React.FC;
