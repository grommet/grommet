import React from 'react';
import { Feedback, FeedbackPosNeg } from 'grommet';

export const FeedbackNegPos = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Feedback
    title="We’d love your feedback"
    //   onSubmit={onSubmit}
  >
    <FeedbackPosNeg label="Was this content helpful?" />
  </Feedback>
  // </Grommet>
);

FeedbackNegPos.storyName = 'FeedbackNegPos';

export default {
  title: 'Input/Feedback/FeedbackNegPos',
};
