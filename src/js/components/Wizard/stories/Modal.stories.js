import React, { useState } from 'react';

import { Box, Button, Layer, Notification, Paragraph } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';
import { Wizard } from '../Wizard';
import { WizardFooter } from '../WizardFooter';
import { useWizard } from '../WizardContext';

// Wizard inside a modal Layer. `onCancel` wires the header X to the
// parent-owned close handler. A custom footer composed via <WizardFooter>
// children preserves the themed shell while omitting the Cancel button.
const NoCancelFooter = () => {
  const { currentStepIndex, totalSteps, canGoNext, previous, next, complete } =
    useWizard();
  const isFirstStep = currentStepIndex <= 0;
  const isLastStep = currentStepIndex >= totalSteps - 1;
  return (
    <WizardFooter>
      {!isFirstStep && (
        <Button
          label="Previous"
          icon={<FormPrevious aria-hidden="true" />}
          onClick={previous}
        />
      )}
      {isLastStep ? (
        <Button
          label="Complete"
          primary
          disabled={!canGoNext}
          onClick={complete}
        />
      ) : (
        <Button
          label="Next"
          primary
          reverse
          icon={<FormNext aria-hidden="true" />}
          disabled={!canGoNext}
          onClick={next}
        />
      )}
    </WizardFooter>
  );
};

const steps = [
  {
    id: 'details',
    title: 'Details',
    description: 'Enter details for the new resource.',
    render: () => (
      <Paragraph>Describe the resource you are creating.</Paragraph>
    ),
  },
  {
    id: 'configure',
    title: 'Configure',
    description: 'Configure options for this resource.',
    render: () => <Paragraph>Pick configuration options.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and finish.',
    render: () => <Paragraph>Confirm and create the resource.</Paragraph>,
  },
];

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const close = () => {
    setOpen(false);
    setResetKey((key) => key + 1);
  };
  return (
    <Box fill pad="medium" gap="medium">
      <Box align="start">
        <Button primary label="Open wizard" onClick={() => setOpen(true)} />
      </Box>
      {open && (
        // Composed sizing: the wrapping Layer + Box choose the modal's
        // dimensions. Swap these values to make the wizard narrower,
        // wider, or full-screen — the Wizard fills whatever it's placed in.
        <Layer modal position="center" onEsc={close} onClickOutside={close}>
          <Box width="xlarge" height="large">
            <Wizard
              key={resetKey}
              aria-label="Modal wizard"
              title="Create resource"
              showProgress="horizontal"
              steps={steps}
              footer={<NoCancelFooter />}
              onComplete={({ value }) => {
                setResult({ status: 'complete', value });
                close();
              }}
              onCancel={close}
            />
          </Box>
        </Layer>
      )}
      {result && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Wizard complete"
          message={
            result.value && Object.keys(result.value).length > 0
              ? `Completed: ${JSON.stringify(result.value)}`
              : undefined
          }
          onClose={() => setResult(null)}
        />
      )}
    </Box>
  );
};

Modal.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Modal',
};

export { Modal };
