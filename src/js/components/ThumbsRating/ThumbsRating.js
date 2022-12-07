import React from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const ThumbsRating = ({ color, options, ...rest }) => {
  const likeOption = options[0];

  return (
    <RadioButtonGroup
      direction="row"
      name="thumbsRating"
      options={['like', 'dislike'] || options}
      {...rest}
    >
      {(option, { checked }) => {
        if (option === likeOption) {
          return checked ? (
            <LikeFill color={typeof color === 'string' ? color : color.fill} />
          ) : (
            <Like color={typeof color === 'string' ? color : color.outline} />
          );
        }
        return checked ? (
          <DislikeFill color={typeof color === 'string' ? color : color.fill} />
        ) : (
          <Dislike color={typeof color === 'string' ? color : color.outline} />
        );
      }}
    </RadioButtonGroup>
  );
};
