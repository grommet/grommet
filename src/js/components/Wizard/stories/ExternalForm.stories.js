// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import {
  Box,
  Button,
  FormField,
  Notification,
  Paragraph,
  TextInput,
} from 'grommet';
import { Wizard } from '../Wizard';
import { WizardFooter } from '../WizardFooter';
import { useWizard } from '../WizardContext';

const validate = (value) => ({
  details: value.name?.trim() ? undefined : 'A request name is required.',
});

const ExternalFormFooter = ({ errors }) => {
  const {
    complete,
    currentStep,
    currentStepIndex,
    next,
    previous,
    totalSteps,
  } = useWizard();
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const hasError = !!errors[currentStep];

  return (
    <WizardFooter>
      {!isFirstStep && <Button label="Previous" secondary onClick={previous} />}
      <Button
        label={isLastStep ? 'Complete' : 'Next'}
        primary
        disabled={hasError}
        onClick={isLastStep ? complete : next}
      />
    </WizardFooter>
  );
};

const ExternalForm = () => {
  const [submittedValue, setSubmittedValue] = useState();
  const [value, setValue] = useState({ name: '' });
  const errors = validate(value);
  const steps = [
    {
      id: 'details',
      title: 'Details',
      status: errors.details ? 'error' : 'completed',
      errorMessage: errors.details,
      render: () => (
        <FormField
          htmlFor="request-name"
          label="Request name"
          name="name"
          error={errors.details}
        >
          <TextInput
            id="request-name"
            name="name"
            value={value.name}
            onChange={(event) =>
              setValue((currentValue) => ({
                ...currentValue,
                name: event.target.value,
              }))
            }
          />
        </FormField>
      ),
    },
    {
      id: 'review',
      title: 'Review',
      render: () => (
        <Paragraph>
          Review the request for {value.name || 'an unnamed request'}.
        </Paragraph>
      ),
    },
  ];

  return (
    <Box fill>
      <Wizard
        aria-label="New request"
        form={false}
        title="New request"
        showProgress="vertical"
        steps={steps}
        footer={<ExternalFormFooter errors={errors} />}
        onComplete={() => setSubmittedValue(value)}
      />
      {submittedValue && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Request submitted"
          message={`Created request ${submittedValue.name}.`}
          onClose={() => setSubmittedValue(undefined)}
        />
      )}
    </Box>
  );
};

ExternalForm.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/External Form',
};

export { ExternalForm };
