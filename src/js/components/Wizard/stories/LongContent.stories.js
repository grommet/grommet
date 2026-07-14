import React, { useState } from 'react';

import {
  Box,
  Button,
  FormField,
  Grommet,
  Heading,
  Notification,
  Paragraph,
  RadioButtonGroup,
  ResponsiveContext,
  Text,
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
      the bottom stay pinned — only the middle scrolls. When the `kind` prop is
      set to `narrow` or `wide`, only this content column narrows; the header
      and footer still span the full wizard width.
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
  const [kind, setKind] = useState('full');
  const [result, setResult] = useState(null);

  // Custom footer inlines the story's `kind` selector on the left and
  // Previous / Next on the right; styling matches theme.wizard.footer.
  const renderFooter = ({
    previous,
    next,
    complete,
    isFirstStep,
    isLastStep,
  }) => (
    <Box
      direction="row"
      align="center"
      gap="small"
      pad={{ horizontal: 'large', vertical: 'none' }}
      background="background-front"
      height="xxsmall"
      flex={false}
    >
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <Box flex="grow" />
          ) : (
            <Box direction="row" align="center" gap="small" flex="grow">
              <Text weight="bold">Wizard kind:</Text>
              <RadioButtonGroup
                name="wizard-kind"
                direction="row"
                gap="medium"
                options={['full', 'narrow', 'wide']}
                value={kind}
                onChange={(event) => setKind(event.target.value)}
              />
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
      <Box direction="row" align="center" gap="small">
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
          aria-label="Long content wizard"
          kind={kind}
          header={{ title: 'Create resource' }}
          steps={steps}
          footer={renderFooter}
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
