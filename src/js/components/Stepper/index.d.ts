import * as React from 'react';
import { A11yTitleType, MarginType } from '../../utils/index';

export type StepStatus = 'pending' | 'completed' | 'error' | 'disabled';

export type EffectiveStepState =
  | 'pending'
  | 'current'
  | 'completed'
  | 'current-completed'
  | 'error'
  | 'current-error'
  | 'disabled';

export interface StepType {
  id: string;
  title: string;
  description?: string;
  status?: StepStatus;
  disabledReason?: string;
  errorMessage?: string;
}

export interface StepperContextValue {
  currentStep: string | undefined;
  steps: StepType[];
  stepIndex: (stepId: string) => number;
  isPriorStep: (stepId: string) => boolean;
  isAfterStep: (stepId: string) => boolean;
  isCurrentStep: (stepId: string) => boolean;
  canNavigateTo: (stepId: string) => boolean;
}

export interface StepperProps {
  steps: StepType[];
  currentStep: string;
  direction?: 'horizontal' | 'vertical';
  clickableSteps?: boolean;
  onStepClick?: (stepId: string) => void;
  id?: string;
  a11yTitle?: A11yTitleType;
  margin?: MarginType;
  children?: React.ReactNode;
}

export interface StepperExtendedProps
  extends StepperProps,
    Omit<
      React.DetailedHTMLProps<
        React.OlHTMLAttributes<HTMLOListElement>,
        HTMLOListElement
      >,
      'children'
    > {}

export type StepperRef = HTMLOListElement;

declare const Stepper: React.ForwardRefExoticComponent<
  StepperExtendedProps & React.RefAttributes<StepperRef>
>;

export interface StepperStepProps {
  stepId: string;
  index?: number;
  children?: React.ReactNode;
}
declare const StepperStep: React.FC<StepperStepProps>;

declare const StepperIndicator: React.FC;
declare const StepperLabel: React.FC;
declare const StepperDescription: React.FC;
declare const StepperError: React.FC;

declare const StepperContext: React.Context<StepperContextValue>;
declare const useStepper: () => StepperContextValue;

export {
  Stepper,
  StepperStep,
  StepperIndicator,
  StepperLabel,
  StepperDescription,
  StepperError,
  StepperContext,
  useStepper,
};
