import React from 'react';
import { Feedback, StarRating, FormField, TextArea } from 'grommet';

export const FeedbackInline = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    messages={{
      submit: 'Submit Review',
      cancel: 'Cancel',
      successful: 'Thanks',
    }}
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <StarRating color="pink" label="Was this content helpful?" />
    <FormField
      htmlFor="comments"
      name="comments"
      label="Any additional comments?"
    >
      <TextArea id="comments" name="comments" placeholder="Comments" />
    </FormField>
  </Feedback>
  // </Grommet>
);

Feedback.storyName = 'FeedbackInline';

export default {
  title: 'Input/Feedback',
};
