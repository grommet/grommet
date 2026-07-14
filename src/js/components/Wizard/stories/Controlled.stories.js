import React, { useState } from 'react';

import {
  Box,
  Button,
  Grommet,
  Heading,
  Layer,
  Notification,
  Paragraph,
} from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Controlled Wizard: parent owns currentStep and reacts to onStepChange.
const steps = [
  {
    id: 'one',
    title: 'One',
    render: () => <Paragraph>Step one.</Paragraph>,
  },
  {
    id: 'two',
    title: 'Two',
    skippable: true,
    render: () => <Paragraph>Step two.</Paragraph>,
  },
  {
    id: 'three',
    title: 'Three',
    render: () => <Paragraph>Step three.</Paragraph>,
  },
];

const Controlled = () => {
  const [currentStep, setCurrentStep] = useState('one');
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(true);
  const handleCancel = () => {
    setConfirmCancel(true);
  };
  const confirmCancelYes = () => {
    setConfirmCancel(false);
    setResult(null);
    setCurrentStep('one');
    setResetKey((key) => key + 1);
    setWizardOpen(false);
  };
  const confirmCancelNo = () => {
    setConfirmCancel(false);
  };
  const reopenWizard = () => {
    setWizardOpen(true);
  };

  return (
    <Grommet theme={grommet} full>
      <Box fill>
        {wizardOpen ? (
          <Wizard
            key={resetKey}
            aria-label="Controlled wizard"
            header={{ title: 'Configure workspace' }}
            steps={steps}
            currentStep={currentStep}
            onStepChange={(event) => {
              if (event.phase === 'navigated' && event.to) {
                setCurrentStep(event.to);
              }
            }}
            onComplete={(value) => setResult({ status: 'complete', value })}
            onCancel={handleCancel}
          />
        ) : (
          <Box pad="medium" align="start">
            <Button primary label="Reopen wizard" onClick={reopenWizard} />
          </Box>
        )}
        {confirmCancel && (
          <Layer
            modal
            position="center"
            onEsc={confirmCancelNo}
            onClickOutside={confirmCancelNo}
          >
            <Box pad="medium" gap="medium" width="medium">
              <Heading level={3} margin="none">
                Cancel wizard?
              </Heading>
              <Paragraph margin="none">
                Are you sure you want to cancel? Your progress will be lost.
              </Paragraph>
              <Box direction="row" justify="end" gap="small">
                <Button label="Keep editing" onClick={confirmCancelNo} />
                <Button
                  label="Yes, cancel"
                  primary
                  color="status-critical"
                  onClick={confirmCancelYes}
                />
              </Box>
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
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Controlled',
};

export { Controlled };
