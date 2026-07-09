import React, { useState } from 'react';

import { Box, Grommet, Paragraph, Text } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

const steps = [
  {
    id: 'plan',
    title: 'Plan',
    description: 'Choose an approach.',
    render: () => <Paragraph>Plan step content.</Paragraph>,
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Do the work.',
    render: () => <Paragraph>Build step content.</Paragraph>,
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Ship it.',
    render: () => <Paragraph>Deploy step content.</Paragraph>,
  },
];

const VerticalProgress = () => {
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
          aria-label="Deployment wizard"
          header={{ title: 'Deploy an application' }}
          direction="vertical"
          steps={steps}
          onComplete={(value) => setResult({ status: 'complete', value })}
          onCancel={handleCancel}
        />
        {result && <Text>{`Completed: ${JSON.stringify(result.value)}`}</Text>}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Vertical Progress',
};

export { VerticalProgress };
