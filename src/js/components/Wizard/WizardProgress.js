import React from 'react';
import { Box } from '../Box';
import { Stepper } from '../Stepper';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';
import { useWizard } from './WizardContext';

// WizardProgress delegates ALL step indicator + connector rendering to the
// existing Stepper component. It maps Wizard-derived state onto the
// Stepper step model — no connectors, indicators, or icons of its own.
export const WizardProgress = ({ ariaLabel: ariaLabelProp, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { steps, currentStep, direction, getStepStatus, messages } =
    useWizard();

  const progressTheme =
    direction === 'vertical'
      ? theme.wizard?.progress?.vertical
      : theme.wizard?.progress?.horizontal;

  // Map wizard step tree into a Stepper-compatible step[] (with optional
  // children for two-level nesting). Wizard-driven status → Stepper status.
  const stepperSteps = steps.map((step) => {
    const mapped = {
      id: step.id,
      title: step.title,
      description: step.description,
      status: getStepStatus(step.id),
    };
    if (step.disabledReason) mapped.disabledReason = step.disabledReason;
    if (step['aria-label']) mapped['aria-label'] = step['aria-label'];
    if (step.children && step.children.length) {
      mapped.children = step.children.map((child) => ({
        id: child.id,
        title: child.title,
        description: child.description,
        status: getStepStatus(child.id),
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
      border={progressTheme?.border}
      width={direction === 'vertical' ? progressTheme?.width : undefined}
      flex={false}
      // In vertical layout, don't let the flex row's default
      // align-items:stretch grow this rail to the wizard body's
      // full height — the Stepper should be tall enough for its
      // steps only, not stretched to match the content column.
      alignSelf={direction === 'vertical' ? 'start' : undefined}
      {...passThemeFlag}
      {...rest}
    >
      <Stepper
        steps={stepperSteps}
        currentStep={currentStep}
        direction={direction}
        clickableSteps={false}
        showDescription={false}
        aria-label={ariaLabel}
      />
    </Box>
  );
};

WizardProgress.displayName = 'WizardProgress';
