// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
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
    currentStepIndex,
    currentStepObj,
    totalSteps,
    formValue,
    complete,
    next,
    renderStep,
    setFormValue,
    validationError,
  } = wizard;

  const contentTheme = theme.wizard?.content;
  const submit = currentStepIndex >= totalSteps - 1 ? complete : next;

  const onValidate = useCallback(
    ({ valid, errors, submitting }) => {
      const formElement = document.getElementById(`${currentStep}-form`);
      if (formElement) {
        formElement.setAttribute('data-form-valid', String(valid));
      }

      if (submitting) {
        // focus the first error field that exists in the DOM
        const names = Object.keys(errors || {});
        const firstInvalid = names.reduce((found, name) => {
          if (found) return found;
          const matches = document.getElementsByName(name);
          return matches.length > 0 ? matches[0] : null;
        }, null);
        if (firstInvalid) {
          setTimeout(() => firstInvalid.focus(), 0);
        }
        if (!valid) {
          // Since onSubmit won't get called in this case, go ahead and
          // call submit() to trigger wizard-level state changes. It will
          // get to the runValidation step, see that
          // the form is invalid from the data-form-valid attribute and set
          // the appropriate blocked state.
          // TODO: consider a method on the wizard context to set the
          //       blocked state directly instead of calling submit()
          submit();
        }
      }
    },
    [currentStep, submit],
  );

  if (!currentStepObj) return null;

  const stepRender = currentStepObj.render || renderStep;
  const body = stepRender ? stepRender(currentStepObj, wizard) : null;

  return (
    <Form
      id={`${currentStep}-form`}
      value={formValue}
      onChange={setFormValue}
      onSubmit={submit}
      onValidate={onValidate}
      method="post"
      data-form-valid="true"
      style={{ display: 'flex', flex: '1 1 auto' }}
    >
      <Box {...contentTheme} flex="grow" {...rest}>
        {body}
        {validationError && (
          <Notification status="critical" message={validationError} />
        )}
      </Box>
    </Form>
  );
};

WizardContent.displayName = 'WizardContent';
