// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form } from '../Form';
import { Box } from '../Box';
import { Notification } from '../Notification';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const wizard = useWizard();
  const {
    currentStep,
    currentStepObj,
    formValue,
    next,
    renderStep,
    setFormValue,
    validationError,
  } = wizard;

  const contentTheme = theme.wizard?.content;
  const errorTheme = theme.wizard?.error;
  const Icon = errorTheme?.icon || (() => null);

  if (!currentStepObj) return null;

  const stepRender = currentStepObj.render || renderStep;
  const body = stepRender ? stepRender(currentStepObj, wizard) : null;

  const onValidate = (validationResults) => {
    // focus first error field if any
    const names = [
      ...Object.keys(validationResults.errors),
      ...Object.keys(validationResults.infos),
    ];
    if (names.length > 0) {
      const selector = names.map((name) => `[name=${name}]`).join(',');
      const firstInvalid = document.querySelectorAll(selector)[0];
      if (firstInvalid) {
        setTimeout(() => firstInvalid.focus(), 0);
      }
    }
    const valid = names.length === 0;
    const formElement = document.getElementById(`${currentStep}-form`);
    if (formElement) {
      formElement.setAttribute('data-form-valid', String(valid));
    }
    if (!valid) {
      // Go ahead and call next() to trigger
      // wizard-level validation error message.
      next();
    }
  };
  return (
    <Form
      id={`${currentStep}-form`}
      value={formValue}
      onChange={setFormValue}
      onSubmit={next}
      onValidate={onValidate}
      method="post"
      data-form-valid="true"
      style={{ display: 'flex', flex: '1 1 auto' }}
    >
      <Box {...contentTheme} flex="grow" {...rest}>
        {body}
        {validationError && (
          <Notification
            status="critical"
            message={validationError}
            icon={
              <Box margin={{ top: '4px' }}>
                <Icon />
              </Box>
            }
          />
        )}
      </Box>
    </Form>
  );
};

WizardContent.displayName = 'WizardContent';
