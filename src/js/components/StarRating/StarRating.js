import React, { useState } from 'react';
import { Star, StarOutline } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const StarRating = ({ color, scale = 5, value, onChange, ...rest }) => {
  const [rating, setRating] = useState(value);

  const options = [];
  for (let i = 0; i < scale; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      value={rating}
      onChange={(event) => {
        const adjustedRating = parseInt(event.target.value, 10) + 1;
        setRating(adjustedRating);
      }}
      {...rest}
    >
      {(option) =>
        option < rating ? (
          <Star color={typeof color === 'string' ? color : color?.fill} />
        ) : (
          <StarOutline
            color={typeof color === 'string' ? color : color?.outline}
          />
        )
      }
    </RadioButtonGroup>
  );
};
