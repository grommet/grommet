import * as React from 'react';
export interface ThumbRatingProps {
  color?: string | object;
  options: (
    | string
    | number
    | boolean
    | {
        disabled?: boolean;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
}

declare const ThumbsRating: React.FC<ThumbRatingProps>;

export { ThumbsRating };
