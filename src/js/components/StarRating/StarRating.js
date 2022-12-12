import React, { useState } from 'react';
import { Star, StarOutline } from 'grommet-icons';
import { StarRatingPropTypes } from './propTypes';
import { RadioButtonGroup } from '../RadioButtonGroup';

const StarRating = ({ color, scale = 5, ...rest }) => {
  const [rating, setRating] = useState();

  const options = [];
  for (let i = 0; i < scale; i += 1) {
    options.push(i);
  }

  let colorProp;
  let colorfill;
  let coloroutline;
  if (color && typeof color === 'string') {
    colorProp = color;
  } else if (color && typeof color === 'object') {
    colorfill = color.fill;
    coloroutline = color.outline;
  } else colorProp = undefined;

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
          <Star color={colorfill || colorProp} />
        ) : (
          <StarOutline color={coloroutline || colorProp} />
        )
      }
    </RadioButtonGroup>
  );
};

StarRating.propTypes = StarRatingPropTypes;

export { StarRating };
