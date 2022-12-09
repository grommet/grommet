import React, { useState } from 'react';
import { Star, StarOutline } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const StarRating = ({ color, scale = 5, ...rest }) => {
  const [rating, setRating] = useState();

  const options = [];
  for (let i = 0; i < scale; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      onChange={(event) => {
        setRating(event.target.value);
      }}
      {...rest}
    >
      {(option) =>
        option <= rating ? (
          <Star
            color={color && typeof color === 'string' ? color : color?.fill}
          />
        ) : (
          <StarOutline
            color={color && typeof color === 'string' ? color : color?.outline}
          />
        )
      }
    </RadioButtonGroup>
  );
};
