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
  return (
    <RadioButtonGroup direction="row" options={['like', 'dislike']} {...rest}>
      {(option, { checked, focus }) => {
        if (option === 'like') {
          return (
            <StyledThumbsRatingBox focus={focus && usingKeyboard}>
              {checked ? (
                <LikeFill color={theme.thumbsRating?.like?.color} />
              ) : (
                <Like color={theme.thumbsRating?.like?.color} />
              )}
            </StyledThumbsRatingBox>
          );
        }
        return (
          <StyledThumbsRatingBox focus={focus && usingKeyboard}>
            {checked ? (
              <DislikeFill color={theme.thumbsRating?.dislike?.color} />
            ) : (
              <Dislike color={theme.thumbsRating?.dislike?.color} />
            )}
          </StyledThumbsRatingBox>
        );
      }}
    </RadioButtonGroup>
  );
};

ThumbsRating.displayName = 'ThumbsRating';
export { ThumbsRating };
