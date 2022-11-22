import React from 'react';
import { Feedback, FeedbackRating, FormField, TextArea } from 'grommet';

export const FeedbackModal = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    modal
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <FeedbackRating label="Was this content helpful?" />
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

Feedback.storyName = 'FeedbackModal';

export default {
  title: 'Input/Feedback/FeedbackModal',
};
