import React, { useContext } from 'react';
import { Feedback, StarRating, ResponsiveContext } from 'grommet';

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
      //   onSubmit={onSubmit}
    >
      <StarRating label="Review of Grommet" />
    </Feedback>
    // </Grommet>
  );
};

StarRating.storyName = 'StarRating';

export default {
  title: 'Input/Feedback',
};
