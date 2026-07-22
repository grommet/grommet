import React, { useState } from 'react';

import {
  Box,
  FormField,
  Grommet,
  Heading,
  Notification,
  Paragraph,
  TextArea,
  TextInput,
} from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Long-content step demonstrating that the wizard header, stepper, and
// footer remain in place while the content column scrolls internally.
// Uses form fields plus a big block of prose so vertical space is
// clearly exceeded on typical viewports.
const LongStepBody = ({ heading, count = 40 }) => (
  <Box gap="medium">
    <Heading level={3} margin={{ vertical: 'none' }}>
      {heading}
    </Heading>
    <Paragraph fill>
      Scroll this content column. The wizard header at the top and the footer at
      the bottom stay pinned — only the middle scrolls.
    </Paragraph>
    <FormField label="Name" htmlFor="long-content-name">
      <TextInput id="long-content-name" placeholder="Your name" />
    </FormField>
    <FormField label="Notes" htmlFor="long-content-notes">
      <TextArea id="long-content-notes" rows={4} placeholder="Notes…" />
    </FormField>
    {Array.from({ length: count }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Paragraph key={index} fill>
        {`Filler paragraph ${index + 1}. This wizard example intentionally
          renders a lot of content so the scroll behavior is visible in
          Storybook. Long-form documentation, review screens, and
          confirmation lists commonly exceed the viewport height and
          need the middle column to scroll while the primary
          navigation stays visible.`}
      </Paragraph>
    ))}
  </Box>
);

// Step data intentionally omits `description` so the stepper shows
// only the step titles; the descriptive text is rendered instead as
// the content heading inside the white card via LongStepBody.
const steps = [
  {
    id: 'details',
    title: 'Details',
    render: () => <LongStepBody heading="Enter details for the new resource" />,
  },
  {
    id: 'configure',
    title: 'Configure',
    render: () => (
      <LongStepBody heading="Configure options for this resource" count={30} />
    ),
  },
  {
    id: 'review',
    title: 'Review',
    render: () => <LongStepBody heading="Review and finish" count={60} />,
  },
];

const LongContent = () => {
  const [result, setResult] = useState(null);

  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          aria-label="Long content wizard"
          title="Create resource"
          showProgress="horizontal"
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
  title: 'Layout/Wizard/Long Content',
};

export { LongContent };
