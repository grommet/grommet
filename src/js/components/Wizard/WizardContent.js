// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef } from 'react';
import { Form } from '../Form';
import { Box } from '../Box';
import { Notification } from '../Notification';
import { useThemeValue } from '../../utils/useThemeValue';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const wizard = useWizard();
  const {
    currentStep,
    currentStepObj,
    form,
    formValue,
    renderStep,
    setFormValue,
    validationError,
    stepValidation,
    updateValidation,
    registerForm,
  } = wizard;

  const formRef = useRef(null);
  const pendingSubmission = useRef();

  const contentTheme = theme.wizard?.content;

  useLayoutEffect(() => {
    if (!form || !formRef.current) return undefined;
    const unregister = registerForm(
      currentStep,
      () =>
        new Promise((resolve) => {
          pendingSubmission.current = { stepId: currentStep, resolve };
          formRef.current.requestSubmit();
        }),
    );
    return () => {
      unregister();
      if (pendingSubmission.current?.stepId === currentStep) {
        pendingSubmission.current.resolve({ cancelled: true });
        pendingSubmission.current = undefined;
      }
    };
  }, [currentStep, form, registerForm]);

  const onValidate = useCallback(
    ({ valid, errors, submitting }) => {
      const formElement = formRef.current;
      const result = { ok: valid, errors: { ...errors } };
      Promise.resolve().then(() => {
        updateValidation(currentStep, 'form', result);
        if (submitting && pendingSubmission.current?.stepId === currentStep) {
          pendingSubmission.current.resolve(result);
          pendingSubmission.current = undefined;
        }
      });

      if (submitting && !valid) {
        // focus the first error field that exists in the DOM
        const names = Object.keys(errors || {});
        const firstInvalid = names.reduce((found, name) => {
          if (found) return found;
          const matches = formElement?.elements.namedItem(name);
          return matches?.focus ? matches : matches?.[0] || null;
        }, null);
        if (firstInvalid) {
          setTimeout(() => {
            if (formElement?.isConnected && formRef.current === formElement)
              firstInvalid.focus();
          }, 0);
        }
      }
    },
    [currentStep, updateValidation],
  );

  if (!currentStepObj) return null;

  const stepRender = currentStepObj.render || renderStep;
  const body = stepRender ? stepRender(currentStepObj, wizard) : null;

  const content = (
    <Box {...contentTheme} flex="grow" {...rest}>
      {body}
      {validationError && (
        <Notification status="critical" message={validationError} />
      )}
    </Box>
  );

  return form ? (
    <Form
      key={currentStep}
      id={`${currentStep}-form`}
      ref={formRef}
      value={formValue}
      onChange={setFormValue}
      onValidate={onValidate}
      errors={stepValidation[currentStep]?.form?.errors}
      method="post"
      noValidate
      style={{ display: 'flex', flex: '1 1 auto' }}
    >
      {content}
    </Form>
  ) : (
    content
  );
};

WizardContent.displayName = 'WizardContent';
