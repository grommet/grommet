import React from 'react';
import { Like } from 'grommet-icons/icons/Like';
import { LikeFill } from 'grommet-icons/icons/LikeFill';
import { Dislike } from 'grommet-icons/icons/Dislike';
import { DislikeFill } from 'grommet-icons/icons/DislikeFill';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';

const ThumbsRating = ({ ...rest }) => {
  const theme = useThemeValue();
  return (
    <RadioButtonGroup direction="row" options={['like', 'dislike']} {...rest}>
      {(option, { checked }) => {
        if (option === 'like') {
          return checked ? (
            <LikeFill color={theme.thumbsRating?.like?.color} />
          ) : (
            <Like color={theme.thumbsRating?.like?.color} />
          );
        }
        return checked ? (
          <DislikeFill color={theme.thumbsRating?.dislike?.color} />
        ) : (
          <Dislike color={theme.thumbsRating?.dislike?.color} />
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.displayName = 'ThumbsRating';
export { ThumbsRating };
