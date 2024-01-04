import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Star } from 'grommet-icons/icons/Star';
import { StarOutline } from 'grommet-icons/icons/StarOutline';
import { FormContext } from '../Form/FormContext';
import { RadioButtonGroup } from '../RadioButtonGroup';

const StarRating = ({ name, defaultValue, value: valueProp, ...rest }) => {
  const formContext = useContext(FormContext);
  const theme = useContext(ThemeContext);
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
