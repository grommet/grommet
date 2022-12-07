import * as React from 'react';

export interface StarRating {
  color?: string | object;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const StarRating: React.FC<StarRating>;

export { StarRating };
