import React from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { ThumbsRatingPropTypes } from './propTypes';
import { RadioButtonGroup } from '../RadioButtonGroup';

const ThumbsRating = ({ color, options, ...rest }) => {
  const likeOption = options ? options[0] : 'like';

  return (
    <RadioButtonGroup
      direction="row"
      options={options || ['like', 'dislike']}
      {...rest}
    >
      {(option, { checked }) => {
        if (option === likeOption) {
          return checked ? (
            <LikeFill
              color={color && typeof color === 'string' ? color : color?.fill}
            />
          ) : (
            <Like
              color={
                color && typeof color === 'string' ? color : color?.outline
              }
            />
          );
        }
        return checked ? (
          <DislikeFill
            color={color && typeof color === 'string' ? color : color?.fill}
          />
        ) : (
          <Dislike
            color={color && typeof color === 'string' ? color : color?.outline}
          />
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.propTypes = ThumbsRatingPropTypes;

export { ThumbsRating };
