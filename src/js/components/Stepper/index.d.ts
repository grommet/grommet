import * as React from 'react';

export type StepStatus = 'pending' | 'completed' | 'error' | 'disabled';

export interface StepType {
  id: string;
  title: string;
  description?: string;
  status?: StepStatus;
  disabledReason?: string;
  errorMessage?: string;
  'aria-label'?: string;
  children?: Omit<StepType, 'children'>[];
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, 'children'> {
  steps: StepType[];
  currentStep: string;
  direction?: 'horizontal' | 'vertical';
  clickableSteps?: boolean;
  onStepClick?: (stepId: string) => void;
  id?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
}

export interface StepperContextValue {
  currentStep: string;
  steps: StepType[];
  direction: 'horizontal' | 'vertical';
  clickableSteps: boolean;
  onStepClick?: (stepId: string) => void;
  stepIndex: (stepId: string) => number;
  isPriorStep: (stepId: string) => boolean;
  isAfterStep: (stepId: string) => boolean;
  isCurrentStep: (stepId: string) => boolean;
  canNavigateTo: (stepId: string) => boolean;
}

declare const Stepper: React.ForwardRefExoticComponent<
  StepperProps & React.RefAttributes<HTMLOListElement>
>;

declare const StepperContext: React.Context<StepperContextValue>;
declare const useStepper: () => StepperContextValue;

export interface StepperStepProps {
  step: StepType;
  stepNumber: number;
  isLast: boolean;
  showConnector?: boolean;
  direction: 'horizontal' | 'vertical';
  focusedIndex: number;
  index: number;
  isSubStep?: boolean;
  onKeyDown?: (event: React.KeyboardEvent, index: number) => void;
  stepsRef: React.MutableRefObject<StepType[] | null>;
  stepRefs?: React.MutableRefObject<Map<number, HTMLButtonElement>>;
}

declare const StepperStep: React.FC<StepperStepProps>;
declare const StepperIndicator: React.FC<{
  stepId?: string;
  stepNumber?: number;
}>;
declare const StepperLabel: React.FC<{ stepId?: string }>;
declare const StepperDescription: React.FC<{ stepId?: string }>;
declare const StepperError: React.FC<{ stepId?: string }>;

export {
  Stepper,
  StepperContext,
  useStepper,
  StepperStep,
  StepperIndicator,
  StepperLabel,
  StepperDescription,
  StepperError,
};
