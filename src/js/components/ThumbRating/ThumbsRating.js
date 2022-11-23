import React, { useState } from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const ThumbsRating = ({
  fillColor,
  outlineColor,
  formProps,
  name,
  label,
  value,
  onChange,
  options,
  ...rest
}) => {
  const [thumbs, setThumbs] = useState(value);

  const likeOption = options[0];

  return (
    <RadioButtonGroup
      direction="row"
      name="thumbsRating"
      options={options}
      value={thumbs}
      onChange={(event) => {
        setThumbs(event.target.value);
        if (onChange) onChange(event);
      }}
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
