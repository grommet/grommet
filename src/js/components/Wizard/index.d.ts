import * as React from 'react';
import {
  A11yTitleType,
  GapType,
  MarginType,
  WidthType,
} from '../../utils/index';

export interface StepDefinition<TFormValue = unknown> {
  id: string;
  title: string;
  description?: string | React.ReactNode;
  skippable?: boolean;
  validation?: (formValue: TFormValue) => Promise<void> | void;
  nextStep?: (formValue: TFormValue) => string;
  children?: Omit<StepDefinition<TFormValue>, 'children'>[];
}

export type NavigationStepChangeEvent = {
  fromStepId: string;
  toStepId: string;
  trigger: 'next' | 'previous' | 'goTo' | 'skip';
  phase: 'attempted' | 'completed' | 'blocked';
  blocked?: boolean;
  error?: Error | string;
};

export type TerminalStepChangeEvent = {
  fromStepId: string;
  toStepId?: never;
  trigger: 'complete' | 'cancel';
  phase: 'attempted' | 'completed';
  reason?: 'user';
};

export type StepChangeEvent =
  | NavigationStepChangeEvent
  | TerminalStepChangeEvent;

export interface WizardCompletionData<TFormValue = unknown> {
  completedSteps: string[];
  formValue?: TFormValue;
}

export interface StepState {
  completed: boolean;
  hasError: boolean;
  disabled: boolean;
  error?: string;
}

export interface WizardNavigationAPI {
  next: () => void;
  previous: () => void;
  goTo: (stepId: string) => void;
  skip: () => void;
  complete: () => void;
  cancel: () => void;
}

export type RenderStepContext<TFormValue = unknown> =
  WizardContextValue<TFormValue>;

export interface WizardContextValue<TFormValue = unknown> {
  currentStep: string | undefined;
  currentStepIndex: number;
  steps: StepDefinition<TFormValue>[];
  linearSteps?: StepDefinition<TFormValue>[];
  isValidating: boolean;
  isBlocked: boolean;
  isCompleted: boolean;
  navigation: WizardNavigationAPI;
  stepStates: Record<string, StepState>;
  formValue?: TFormValue;
  setFormValue?: (value: TFormValue) => void;
}

export interface WizardProps<TFormValue = unknown>
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'children'
  > {
  steps: StepDefinition<TFormValue>[];
  defaultStep?: string;
  currentStep?: string;
  onStepChange?: (event: StepChangeEvent) => void;
  onComplete?: (data: WizardCompletionData<TFormValue>) => void;
  onCancel?: (reason: 'user') => void;
  showProgress?: false | 'horizontal' | 'vertical';
  scrollToTop?: boolean;
  renderStep?: (
    step: StepDefinition<TFormValue>,
    context: RenderStepContext<TFormValue>,
  ) => React.ReactNode;
  width?: WidthType;
  gap?: GapType;
  id?: string;
  a11yTitle?: A11yTitleType;
  margin?: MarginType;
  children?: React.ReactNode;
}

declare const Wizard: <TFormValue = unknown>(
  props: WizardProps<TFormValue> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element;

declare const WizardHeader: React.FC<{ children?: React.ReactNode }>;

declare const WizardProgress: React.FC<{
  direction?: 'horizontal' | 'vertical';
}>;

declare const WizardStepHeader: React.FC;

declare const WizardContent: React.FC<{ children?: React.ReactNode }>;

declare const WizardFooter: React.FC;

declare const WizardContext: React.Context<WizardContextValue>;

declare const useWizard: <
  TFormValue = unknown,
>() => WizardContextValue<TFormValue>;

export {
  Wizard,
  WizardHeader,
  WizardProgress,
  WizardStepHeader,
  WizardContent,
  WizardFooter,
  WizardContext,
  useWizard,
};
