import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Star } from 'grommet-icons/icons/Star';
import { StarOutline } from 'grommet-icons/icons/StarOutline';
import { RadioButtonGroup } from '../RadioButtonGroup';

const StarRating = ({ ...rest }) => {
  const theme = useContext(ThemeContext);
  const [value, setValue] = useState();

  const options = [];
  for (let i = 1; i < 6; i += 1) {
    options.push(i);
  }

  return (
    <RadioButtonGroup
      direction="row"
      options={options}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      {...rest}
    >
      {(option) =>
        option <= value ? (
          <Star color={theme.starRating?.color} />
        ) : (
          <StarOutline color={theme.starRating?.color} />
        )
      }
    </RadioButtonGroup>
  );
};

StarRating.displayName = 'StarRating';
export { StarRating };
