import * as React from 'react';

export interface StarRating {
  fillColor?: string;
  outlineColor?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const StarRating: React.FC<StarRating>;

export { StarRating };
