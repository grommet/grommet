import React from 'react';
import { Box } from '../Box';
import { Stepper } from '../Stepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';
import { useWizard } from './WizardContext';

// WizardProgress delegates step rendering to <Stepper>. Descriptions
// are hidden by default (WizardStepHeader shows them in the body).
export const WizardProgress = ({
  'aria-label': ariaLabelProp,
  showDescription = false,
  ...rest
}) => {
  const { theme } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { steps, currentStep, showProgress, stepStates, messages } =
    useWizard();

  // Opt-in: render nothing when `showProgress` is false.
  if (!showProgress) return null;

  const progressTheme =
    showProgress === 'vertical'
      ? theme.wizard?.progress?.vertical
      : theme.wizard?.progress?.horizontal;

  // Map wizard steps (with optional children) into Stepper's step model.
  const stepperSteps = steps.map((step) => {
    const mapped = {
      id: step.id,
      title: step.title,
      description: step.description,
      status: stepStates[step.id],
    };
    if (step.disabledReason) mapped.disabledReason = step.disabledReason;
    if (step['aria-label']) mapped['aria-label'] = step['aria-label'];
    if (step.children && step.children.length) {
      mapped.children = step.children.map((child) => ({
        id: child.id,
        title: child.title,
        description: child.description,
        status: stepStates[child.id],
        ...(child.disabledReason
          ? { disabledReason: child.disabledReason }
          : {}),
        ...(child['aria-label'] ? { 'aria-label': child['aria-label'] } : {}),
      }));
    }
    return mapped;
  });

  const ariaLabel =
    ariaLabelProp || messages?.progress || format({ id: 'wizard.progress' });

  return (
    <Box
      pad={progressTheme?.pad}
      width={showProgress === 'vertical' ? progressTheme?.width : undefined}
      flex={false}
      // Vertical rail should hug its steps, not stretch to the body height.
      alignSelf={showProgress === 'vertical' ? 'start' : undefined}
      {...rest}
    >
      <Stepper
        steps={stepperSteps}
        currentStep={currentStep}
        direction={showProgress === 'vertical' ? 'vertical' : 'horizontal'}
        clickableSteps={false}
        showDescription={showDescription}
        aria-label={ariaLabel}
      />
    </Box>
  );
};

WizardProgress.displayName = 'WizardProgress';
