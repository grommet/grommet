import React, { useContext } from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  Footer,
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
      <Form
        onSubmit={({ value }) => console.log('Submit', value)}
        validate="submit"
        kind="survey"
      >
        <FormField
          htmlFor="star-rating"
          name="rating"
          label="Was this content helpful?"
        >
          <StarRating id="star-rating" name="rating" />
        </FormField>
        <FormField
          label="What would have improved your experience"
          htmlFor="experience"
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
        <Footer
          align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
          margin={{ top: 'medium', bottom: 'small' }}
        >
          <Button label="Submit Feedback" primary type="submit" />
        </Footer>
      </Form>
    </Box>
    // </Grommet>
  );
};

SolicitedFeedback.storyName = 'Solicited feedback';

export default {
  title: 'Input/Form/Solicited feedback',
};
