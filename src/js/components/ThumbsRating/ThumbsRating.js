import React from 'react';
import styled from 'styled-components';
import { Like } from 'grommet-icons/icons/Like';
import { LikeFill } from 'grommet-icons/icons/LikeFill';
import { Dislike } from 'grommet-icons/icons/Dislike';
import { DislikeFill } from 'grommet-icons/icons/DislikeFill';
import { Box } from '../Box';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';
import { focusStyle, useKeyboard } from '../../utils';

const StyledThumbsRatingBox = styled(Box)`
  ${(props) => props.focus && focusStyle()};
`;

const ThumbsRating = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const usingKeyboard = useKeyboard();
  const LikeIcon = theme.thumbsRating?.like?.icon || Like;
  const LikeSelectedIcon = theme.thumbsRating?.like?.icon || LikeFill;
  const DislikeIcon = theme.thumbsRating?.dislike?.icon || Dislike;
  const DislikeSelectedIcon = theme.thumbsRating?.dislike?.icon || DislikeFill;

  return (
    <RadioButtonGroup direction="row" options={['like', 'dislike']} {...rest}>
      {(option, { checked, focus }) => {
        if (option === 'like') {
          return (
            <StyledThumbsRatingBox focus={focus && usingKeyboard}>
              {checked ? (
                <LikeSelectedIcon color={theme.thumbsRating?.like?.color} />
              ) : (
                <LikeIcon color={theme.thumbsRating?.like?.color} />
              )}
            </StyledThumbsRatingBox>
          );
        }
        return (
          <StyledThumbsRatingBox focus={focus && usingKeyboard}>
            {checked ? (
              <DislikeSelectedIcon color={theme.thumbsRating?.dislike?.color} />
            ) : (
              <DislikeIcon color={theme.thumbsRating?.dislike?.color} />
            )}
          </StyledThumbsRatingBox>
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.displayName = 'ThumbsRating';
export { ThumbsRating };
