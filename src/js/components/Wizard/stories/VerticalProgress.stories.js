import React, { useState } from 'react';

import { Box, Grommet, Notification, Paragraph } from 'grommet';
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
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          aria-label="Deployment wizard"
          header={{ title: 'Deploy an application' }}
          direction="vertical"
          steps={steps}
          onComplete={(value) => setResult({ status: 'complete', value })}
        />
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
  title: 'Layout/Wizard/Vertical Progress',
};

export { VerticalProgress };
