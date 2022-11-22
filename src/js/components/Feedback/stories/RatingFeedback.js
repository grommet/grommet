import React from 'react';
import { Feedback, FeedbackRating } from 'grommet';

export const FeedbackRatingStory = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    modal
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <FeedbackRating label="Review of Grommet" />
  </Feedback>
  // </Grommet>
);

FeedbackRating.storyName = 'FeedbackRating';

export default {
  title: 'Input/Feedback',
};
