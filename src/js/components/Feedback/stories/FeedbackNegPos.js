import React from 'react';
import { Feedback, ThumbsRating } from 'grommet';

export const ThumbsRatingStory = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <ThumbsRating label="Was this content helpful?" />
  </Feedback>
  // </Grommet>
);

ThumbsRatingStory.storyName = 'ThumbsRating';

export default {
  title: 'Input/Feedback/ThumbsRating',
};
