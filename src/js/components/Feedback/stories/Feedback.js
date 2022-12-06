import React, { useContext } from 'react';
import {
  Feedback,
  FeedbackQuestion,
  StarRating,
  TextArea,
  ResponsiveContext,
} from 'grommet';

export const FeedbackModal = () => {
  const breakpoint = useContext(ResponsiveContext);
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  return (
    <Feedback
      title="We’d love your feedback"
      feedbackButton
      layerProps={{
        margin: { vertical: 'xlarge', horizontal: 'medium' },
        position: !['xsmall', 'small'].includes(breakpoint)
          ? 'bottom-right'
          : 'center',
      }}
      onSubmit={({ value }) => console.log('Submit', value)}
    >
      <FeedbackQuestion label="Was this content helpful?">
        <StarRating />
      </FeedbackQuestion>
      <FeedbackQuestion
        htmlFor="comments"
        name="comments"
        label="Any additional comments?"
      >
        <TextArea id="comments" name="comments" placeholder="Comments" />
      </FeedbackQuestion>
    </Feedback>
    // </Grommet>
  );
};

Feedback.storyName = 'FeedbackModal';

export default {
  title: 'Input/Feedback/FeedbackModal',
};
