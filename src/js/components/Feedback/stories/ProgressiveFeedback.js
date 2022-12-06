import React, { useState } from 'react';
import { Feedback, FeedbackQuestion, ThumbsRating, TextArea } from 'grommet';

export const ProgressiveFeedback = () => {
  const [likeValue, setLikeValue] = useState();
  console.log(likeValue);
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  return (
    <Feedback
      title="We’d love your feedback"
      onSubmit={({ value }) => console.log('Submit', likeValue, value)}
    >
      <FeedbackQuestion label="Was this content helpful?">
        <ThumbsRating
          onChange={(event) => setLikeValue(event.target.value)}
          options={['like', 'dislike']}
          value={likeValue}
          fillColor="purple"
          outlineColor="purple"
        />
      </FeedbackQuestion>
      {likeValue && (
        <FeedbackQuestion
          htmlFor="comments"
          name="comments"
          label="Any additional comments?"
        >
          <TextArea id="comments" name="comments" placeholder="Comments" />
        </FeedbackQuestion>
      )}
    </Feedback>
    // </Grommet>
  );
};

Feedback.storyName = 'ProgressiveFeedback';

export default {
  title: 'Input/Feedback/ProgressiveFeedback',
};
