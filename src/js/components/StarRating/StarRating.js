import React, { useContext } from 'react';
import styled from 'styled-components';
import { Star } from 'grommet-icons/icons/Star';
import { StarOutline } from 'grommet-icons/icons/StarOutline';
import { Box } from '../Box';
import { FormContext } from '../Form/FormContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { useThemeValue } from '../../utils/useThemeValue';
import { useKeyboard, focusStyle } from '../../utils';

const StyledStarRatingBox = styled(Box)`
  ${(props) => props.focus && focusStyle()};
`;

const StarRating = ({ name, defaultValue, value: valueProp, ...rest }) => {
  const formContext = useContext(FormContext);
  const { theme } = useThemeValue();
  const usingKeyboard = useKeyboard();
  const [value, setValue] = formContext.useFormInput({
    name,
    value: valueProp,
    initialValue: defaultValue ?? 0,
  });

  const options = [];
  for (let i = 1; i < 6; i += 1) {
    options.push(i);
  }
  return (
    <RadioButtonGroup
      name={name}
      direction="row"
      options={options}
      onChange={(event) => {
        setValue(event.value);
      }}
      {...rest}
    >
      {(option, { focus }) => (
        <StyledStarRatingBox focus={focus && usingKeyboard}>
          {option <= value ? (
            <Star color={theme.starRating?.color} />
          ) : (
            <StarOutline color={theme.starRating?.color} />
          )}
        </StyledStarRatingBox>
      )}
    </RadioButtonGroup>
  );
};

StarRating.displayName = 'StarRating';
export { StarRating };
