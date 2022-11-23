import React, { useState } from 'react';
import { Star, StarOutline } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const StarRating = ({
  fillColor,
  name,
  label,
  scale = 5,
  value,
  onChange,
  outlineColor,
  ...rest
}) => {
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
      name="starRating"
      onChange={(event) => {
        const adjustedRating = parseInt(event.target.value, 10) + 1;
        setRating(adjustedRating);
      }}
      {...rest}
    >
      {(option) =>
        option < rating ? (
          <Star color={fillColor} />
        ) : (
          <StarOutline color={outlineColor} />
        )
      }
    </RadioButtonGroup>
  );
};
