import React, { useState } from 'react';

import { Box, Button, Grommet, Paragraph, Text } from 'grommet';
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
  const handleCancel = () => {
    setResult(null);
    setCurrentStep('one');
    setResetKey((key) => key + 1);
  };

  // Custom footer that adds a "Go to Three" jump using the wizard's
  // `goTo` API. Navigation emits an onStepChange event with
  // `trigger: 'goTo'` which the parent handles below.
  const renderFooter = ({
    goTo,
    previous,
    next,
    complete,
    cancel,
    isFirstStep,
    isLastStep,
    currentStepObj,
  }) => (
    <Box
      background="background-front"
      pad={{ horizontal: 'large', vertical: 'none' }}
      height="xxsmall"
      direction="row"
      justify="end"
      align="center"
      gap="small"
      flex={false}
    >
      <Box direction="row" gap="small" align="center" flex="grow">
        <Button label="Cancel" plain onClick={cancel} />
      </Box>
      <Box direction="row" gap="small" align="center">
        {currentStepObj?.id !== 'three' && (
          <Button label="Go to Three" onClick={() => goTo('three')} />
        )}
        {!isFirstStep && <Button label="Previous" onClick={previous} />}
        {isLastStep ? (
          <Button label="Complete" primary onClick={complete} />
        ) : (
          <Button label="Next" primary onClick={next} />
        )}
      </Box>
    </Box>
  );

  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          key={resetKey}
          aria-label="Controlled wizard"
          header={{ title: 'Configure workspace' }}
          steps={steps}
          currentStep={currentStep}
          footer={renderFooter}
          onStepChange={(event) => {
            if (event.phase === 'navigated' && event.to) {
              setCurrentStep(event.to);
            }
          }}
          onComplete={(value) => setResult({ status: 'complete', value })}
          onCancel={handleCancel}
        />
        {result && <Text>{`Completed: ${JSON.stringify(result.value)}`}</Text>}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Controlled',
};

export { Controlled };
