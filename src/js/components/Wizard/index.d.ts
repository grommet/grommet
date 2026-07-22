import * as React from 'react';
import { BoxExtendedProps } from '../Box';

export type WizardShowProgress = 'horizontal' | 'vertical' | false;

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
  stepHeader?: {
    counter?: string;
  };
  progress?: string;
  validationError?: string;
}

export interface WizardProps<TValue = Record<string, any>> {
  steps: WizardStep<TValue>[];
  currentStep?: string;
  defaultStep?: string;
  showProgress?: WizardShowProgress;
  onStepChange?: (event: StepChangeEvent) => void;
  onComplete?: (value: TValue) => void;
  onCancel?: (value: TValue) => void;
  renderStep?: (
    step: WizardStep<TValue>,
    api: WizardApi<TValue>,
  ) => React.ReactNode;
  title?: string;
  footer?: React.ReactNode | ((api: WizardApi<TValue>) => React.ReactNode);
  scrollToTop?: boolean;
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  id?: string;
  'aria-label'?: string;
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
  stepStates: Record<string, WizardStepStatus>;
  formValue: TValue;
  setFormValue: (next: TValue | ((prev: TValue) => TValue)) => void;
  validationError?: string;
  isValidating: boolean;
  isBlocked: boolean;
  isCompleted: boolean;
  canGoNext: boolean;
  next: () => void;
  previous: () => void;
  goTo: (stepId: string) => void;
  skip: () => void;
  complete: () => void;
  cancel: () => void;
  showProgress: WizardShowProgress;
}

export const WizardContext: React.Context<WizardContextValue>;

export function useWizard<
  TValue = Record<string, any>,
>(): WizardContextValue<TValue>;

export interface WizardHeaderProps extends BoxExtendedProps {
  title?: string;
  children?: React.ReactNode;
}

export const WizardHeader: React.FC<WizardHeaderProps>;

export interface WizardProgressProps extends BoxExtendedProps {
  ariaLabel?: string;
  showDescription?: boolean;
}

export const WizardProgress: React.FC<WizardProgressProps>;

export interface WizardStepHeaderProps extends BoxExtendedProps {}

export const WizardStepHeader: React.FC<WizardStepHeaderProps>;

export interface WizardContentProps<TValue = Record<string, any>>
  extends BoxExtendedProps {
  renderStep?: (
    step: WizardStep<TValue>,
    api: WizardApi<TValue>,
  ) => React.ReactNode;
}

export const WizardContent: <TValue = Record<string, any>>(
  props: WizardContentProps<TValue>,
) => React.ReactElement;

export interface WizardFooterProps extends BoxExtendedProps {}

export const WizardFooter: React.FC<WizardFooterProps>;
