import React, { useContext } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  TextArea,
  Header,
  Heading,
  StarRating,
  RadioButtonGroup,
  ResponsiveContext,
} from 'grommet';

// This example shows a way to perform validation across multiple fields.
export const SolicitedFeedback = () => {
  const size = useContext(ResponsiveContext);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large" gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
      >
        <Heading level={2} size="small" margin="none">
          Let us know how your expirence was!
        </Heading>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          onSubmit={({ value }) => console.log('Submit', value)}
          method="post"
          validate="submit"
          kind="survey"
        >
          <FormField
            htmlFor="star-rating"
            name="rating"
            label="Was this content helpful?"
          >
            <StarRating id="star-rating" name="rating" color="pink" />
          </FormField>
          <FormField
            label="What would have improved your experience"
            htmlFor="better-experience"
            name="experience"
          >
            <RadioButtonGroup
              options={['Better UI', 'Accessibility', 'Clear Label', 'Nothing']}
              id="experience"
              name="experience"
            />
          </FormField>
          <FormField label="Comments" htmlFor="comments" name="comments">
            <TextArea id="comments" name="comments" />
          </FormField>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Submit Feedback" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
    // </Grommet>
  );
};

SolicitedFeedback.storyName = 'Solicited feedback';

export default {
  title: 'Input/Form/Solicited feedback',
};
