import React, { useContext } from 'react';
import { Feedback, FormField, StarRating, ResponsiveContext } from 'grommet';

export const StarRatingStory = () => {
  const breakpoint = useContext(ResponsiveContext);
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  return (
    <Feedback
      modal
      title="We’d love your feedback"
      layerProps={{
        margin: 'large',
        position: !['xsmall', 'small'].includes(breakpoint)
          ? 'top-right'
          : 'center',
      }}
      onSubmit={({ value }) => console.log('Submit', value)}
    >
      <FormField abel="Review of Grommet">
        <StarRating />
      </FormField>
    </Feedback>
    // </Grommet>
  );
};

StarRating.storyName = 'StarRating';

export default {
  title: 'Input/Feedback',
};
