import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Stepper } from '../Stepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardProgress: maps wizard state into Stepper presentation props
const WizardProgress = ({ direction = 'horizontal' }) => {
  const { theme } = useThemeValue();
  const wizardTheme = theme.wizard || {};

  const { currentStep, currentStepIndex, steps, stepStates, navigation } =
    useWizard();

  const stepperSteps = useMemo(
    () =>
      steps.map((step, idx) => {
        const state = stepStates[step.id] || {};
        let status;
        if (state.disabled) status = 'disabled';
        else if (state.hasError && step.id === currentStep) status = 'error';
        else if (state.completed || idx < currentStepIndex)
          status = 'completed';
        else status = 'pending';

        return {
          id: step.id,
          title: step.title,
          description:
            typeof step.description === 'string' ? step.description : undefined,
          status,
          errorMessage: state.hasError ? state.error : undefined,
        };
      }),
    [steps, stepStates, currentStep, currentStepIndex],
  );

  if (!steps.length) return null;

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
