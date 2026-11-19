// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
  showDescription?: boolean;
  errorAnnouncement?: 'assertive' | 'polite' | false;
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
  showDescription: boolean;
  errorAnnouncement: 'assertive' | 'polite' | false;
  onStepClick?: (stepId: string) => void;
  stepIndex: (stepId: string) => number;
  isPriorStep: (stepId: string) => boolean;
  isAfterStep: (stepId: string) => boolean;
  isCurrentStep: (stepId: string) => boolean;
  canNavigateTo: (stepId: string) => boolean;
}

export interface StepItemContextValue {
  step: StepType | null;
  index: number;
  isLast: boolean;
  isSubStep: boolean;
  isDisabled: boolean;
  descriptionId?: string;
  errorId?: string;
  reasonId?: string;
}

declare const Stepper: React.ForwardRefExoticComponent<
  StepperProps & React.RefAttributes<HTMLOListElement>
>;

declare const StepperContext: React.Context<StepperContextValue>;
declare const useStepper: () => StepperContextValue;
declare const StepItemContext: React.Context<StepItemContextValue>;
declare const useStepItem: () => StepItemContextValue;

export interface StepperStepProps {
  step: StepType;
  isLast: boolean;
  showConnector?: boolean;
  direction: 'horizontal' | 'vertical';
  focusedIndex: number;
  index: number;
  isSubStep?: boolean;
  onKeyDown?: (event: React.KeyboardEvent, index: number) => void;
  stepRefs?: React.MutableRefObject<Map<number, HTMLButtonElement>>;
}

declare const StepperStep: React.ForwardRefExoticComponent<
  {
    stepId: string;
    children?: React.ReactNode;
    'aria-describedby'?: string;
  } & React.RefAttributes<HTMLElement>
>;
declare const StepperIndicator: React.FC<{}>;
declare const StepperLabel: React.FC<{}>;
declare const StepperDescription: React.FC<{ id?: string }>;
declare const StepperError: React.FC<{ id?: string }>;
declare const StepperDisabledReason: React.FC<{ id?: string }>;

export {
  Stepper,
  StepperContext,
  StepItemContext,
  useStepper,
  useStepItem,
  StepperStep,
  StepperIndicator,
  StepperLabel,
  StepperDescription,
  StepperError,
  StepperDisabledReason,
};
