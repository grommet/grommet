import React from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { ThumbsRatingPropTypes } from './propTypes';
import { RadioButtonGroup } from '../RadioButtonGroup';

const ThumbsRating = ({ color, options, ...rest }) => {
  const likeOption = options ? options[0] : 'like';

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
      options={options || ['like', 'dislike']}
      {...rest}
    >
      {(option, { checked }) => {
        if (option === likeOption) {
          return checked ? (
            <LikeFill color={colorfill || colorProp} />
          ) : (
            <Like color={coloroutline || colorProp} />
          );
        }
        return checked ? (
          <DislikeFill color={colorfill || colorProp} />
        ) : (
          <Dislike color={coloroutline || colorProp} />
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = ThumbsRatingPropTypes;

export { ThumbsRating };
