import React, { useState } from 'react';

import { Box, CheckBox, Grommet, Paragraph, Text } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Branching wizard: on the first step the user chooses whether to include an
// optional review step. step.nextStep(formValue) routes accordingly.
const steps = [
  {
    id: 'plan',
    title: 'Plan',
    description: 'Include optional a manual review.',
    nextStep: (value) => (value.review ? 'review' : 'deploy'),
    render: (step, api) => (
      <CheckBox
        label="Include a manual review step"
        checked={!!api.formValue.review}
        onChange={(event) =>
          api.setFormValue({ ...api.formValue, review: event.target.checked })
        }
      />
    ),
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Someone will review your changes.',
    render: () => <Paragraph>Reviewer will be assigned.</Paragraph>,
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Deploy your changes.',
    render: () => <Paragraph>Ready to deploy.</Paragraph>,
  },
];

const Branching = () => {
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const handleCancel = () => {
    setResult(null);
    setResetKey((key) => key + 1);
  };
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          key={resetKey}
          aria-label="Deployment"
          header={{ title: 'Deploy an application' }}
          steps={steps}
          defaultValue={{ review: false }}
          onComplete={(value) => setResult({ status: 'complete', value })}
          onCancel={handleCancel}
        />
        {result && <Text>{`Completed: ${JSON.stringify(result.value)}`}</Text>}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Branching',
};

export { Branching };
