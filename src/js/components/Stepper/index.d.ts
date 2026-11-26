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
  childIds: string[];
  parentId?: string;
}

export interface StepperContextValue {
  currentStep: string;
  focusedStepId?: string;
  steps: StepperContextStep[];
  direction: 'horizontal' | 'vertical';
  clickableSteps: boolean;
  showDescription: boolean;
  errorAnnouncement: 'assertive' | 'polite' | false;
  onStepClick?: (stepId: string) => void;
  onFocusStep?: (stepId: string) => void;
  registerStepRef?: (stepId: string, element: HTMLElement | null) => void;
  stepIndex: (stepId: string) => number;
  isPriorStep: (stepId: string) => boolean;
  isAfterStep: (stepId: string) => boolean;
  isCurrentStep: (stepId: string) => boolean;
  canNavigateTo: (stepId: string) => boolean;
}

export interface StepItemContextValue {
  step: StepType | null;
  isSubStep: boolean;
  isDisabled: boolean;
}

declare const Stepper: React.ForwardRefExoticComponent<
  StepperProps & React.RefAttributes<HTMLOListElement>
>;

declare const StepperContext: React.Context<StepperContextValue>;
declare const useStepper: () => StepperContextValue;
declare const StepItemContext: React.Context<StepItemContextValue>;
declare const useStepItem: () => StepItemContextValue;

export interface StepperStepProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  stepId: string;
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
