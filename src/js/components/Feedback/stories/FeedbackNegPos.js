import React from 'react';
import { Feedback, FormField, ThumbsRating } from 'grommet';

export const ThumbsRatingStory = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <FormField label="Was this content helpful?">
      <ThumbsRating
        outlineColor="purple"
        fillColor="purple"
        options={['1', '2']}
      />
    </FormField>
  </Feedback>
  // </Grommet>
);

ThumbsRatingStory.storyName = 'ThumbsRating';

export default {
  title: 'Input/Feedback/ThumbsRating',
};
