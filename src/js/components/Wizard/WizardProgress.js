import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Stepper } from '../Stepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

const getLeafStatus = ({
  step,
  state,
  currentStep,
  currentStepIndex,
  index,
}) => {
  if (state.disabled) return 'disabled';
  if (state.hasError && step.id === currentStep) return 'error';
  if (state.completed || index < currentStepIndex) return 'completed';
  return 'pending';
};

const getParentRollupStatus = (childStatuses) => {
  if (childStatuses.every((status) => status === 'completed')) {
    return 'completed';
  }
  if (childStatuses.some((status) => status === 'error')) {
    return 'error';
  }
  if (childStatuses.every((status) => status === 'disabled')) {
    return 'disabled';
  }
  return 'pending';
};

const mapStepTreeToStepper = ({
  steps,
  stepStates,
  currentStep,
  currentStepIndex,
  indexById,
}) =>
  steps.map((step) => {
    const state = stepStates[step.id] || {};
    const index = indexById[step.id] ?? -1;
    const children = Array.isArray(step.children) ? step.children : [];

    const mappedChildren = children.length
      ? mapStepTreeToStepper({
          steps: children,
          stepStates,
          currentStep,
          currentStepIndex,
          indexById,
        })
      : undefined;

    const status = mappedChildren?.length
      ? getParentRollupStatus(mappedChildren.map((child) => child.status))
      : getLeafStatus({
          step,
          state,
          currentStep,
          currentStepIndex,
          index,
        });

    return {
      id: step.id,
      title: step.title,
      description:
        typeof step.description === 'string' ? step.description : undefined,
      status,
      errorMessage: state.hasError ? state.error : undefined,
      children: mappedChildren,
    };
  });

// WizardProgress: maps wizard state into Stepper presentation props
const WizardProgress = ({ direction = 'horizontal' }) => {
  const { theme } = useThemeValue();
  const wizardTheme = theme.wizard || {};

  const {
    currentStep,
    currentStepIndex,
    steps,
    linearSteps = [],
    stepStates,
    navigation,
  } = useWizard();

  const stepperSteps = useMemo(() => {
    const indexById = linearSteps.reduce(
      (acc, step, index) => ({ ...acc, [step.id]: index }),
      {},
    );

    return mapStepTreeToStepper({
      steps,
      stepStates,
      currentStep,
      currentStepIndex,
      indexById,
    });
  }, [steps, linearSteps, stepStates, currentStep, currentStepIndex]);

  if (!linearSteps.length) return null;

  const progressMargin =
    wizardTheme[direction]?.progress?.margin || wizardTheme.progress?.margin;

  return (
    <Box margin={progressMargin}>
      <Stepper
        steps={stepperSteps}
        currentStep={currentStep}
        direction={direction}
        onStepClick={(stepId) => navigation.goTo(stepId)}
      />
    </Box>
  );
};

WizardProgress.displayName = 'WizardProgress';

export { WizardProgress };
