import React from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const ThumbsRating = ({
  fillColor,
  outlineColor,
  formProps,
  name,
  label,
  options,
  ...rest
}) => {
  const likeOption = options[0];

  return (
    <RadioButtonGroup
      direction="row"
      name="thumbsRating"
      options={options}
      {...rest}
    >
      {(option, { checked }) => {
        if (option === likeOption) {
          return checked ? (
            <LikeFill color={fillColor} />
          ) : (
            <Like color={outlineColor} />
          );
        }
        return checked ? (
          <DislikeFill color={fillColor} />
        ) : (
          <Dislike color={outlineColor} />
        );
      }}
    </RadioButtonGroup>
  );
};
