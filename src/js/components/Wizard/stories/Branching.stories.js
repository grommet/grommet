import React, { useMemo, useState } from 'react';

import { Box, CheckBox, Grommet, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Branching wizard: the Review step is added only when the user checks
// "Include a manual review step"; the stepper updates live.
const planStep = {
  id: 'plan',
  title: 'Plan',
  description: 'Include optional a manual review.',
  render: (step, api) => (
    <CheckBox
      label="Include a manual review step"
      checked={!!api.formValue.review}
      onChange={(event) =>
        api.setFormValue({ ...api.formValue, review: event.target.checked })
      }
    />
  ),
};

const reviewStep = {
  id: 'review',
  title: 'Review',
  description: 'Someone will review your changes.',
  render: () => <Paragraph>Reviewer will be assigned.</Paragraph>,
};

const deployStep = {
  id: 'deploy',
  title: 'Deploy',
  description: 'Deploy your changes.',
  render: () => <Paragraph>Ready to deploy.</Paragraph>,
};

const Branching = () => {
  const [value, setValue] = useState({ review: false });
  const [result, setResult] = useState(null);
  const steps = useMemo(
    () =>
      value.review
        ? [planStep, reviewStep, deployStep]
        : [planStep, deployStep],
    [value.review],
  );
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          aria-label="Deployment"
          title="Deploy an application"
          showProgress="horizontal"
          steps={steps}
          value={value}
          onValueChange={setValue}
          onComplete={(nextValue) =>
            setResult({ status: 'complete', value: nextValue })
          }
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
  title: 'Layout/Wizard/Branching',
};

export { Branching };
