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

export interface StepperContextStep extends StepType {
  isSubStep: boolean;
  showConnector: boolean;
  childIds: string[];
  parentId?: string;
}

export interface StepperContextValue {
  currentStep: string;
  steps: StepperContextStep[];
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

declare const Stepper: React.ForwardRefExoticComponent<
  StepperProps & React.RefAttributes<HTMLOListElement>
>;

declare const StepperContext: React.Context<StepperContextValue>;
declare const useStepper: () => StepperContextValue;

export interface StepperStepProps 
  extends React.LiHTMLAttributes<HTMLLIElement> {
  stepId: string;
  focusedIndex: number;
  index: number;
  stepRefs?: React.MutableRefObject<Map<number, HTMLButtonElement>>;
  children?: React.ReactNode;
}

declare const StepperStep: React.FC<StepperStepProps>;
declare const StepperIndicator: React.FC<{}>;
declare const StepperLabel: React.FC<{}>;
declare const StepperDescription: React.FC<{}>;
declare const StepperError: React.FC<{}>;
declare const StepperDisabledReason: React.FC<{}>;

export {
  Stepper,
  StepperStep,
  StepperContext,
  useStepper,
  StepperIndicator,
  StepperLabel,
  StepperDescription,
  StepperError,
  StepperDisabledReason,
};
