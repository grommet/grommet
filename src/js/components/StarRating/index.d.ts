import * as React from 'react';

export interface FeedbackRating {
  fillColor?: string;
  outlineColor?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const FeedbackRating: React.FC<FeedbackRating>;

export { FeedbackRating };
