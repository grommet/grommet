import React, { useState } from 'react';
import { Star, StarOutline } from 'grommet-icons';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const FeedbackRating = ({
  color,
  formProps,
  name,
  label,
  scale = 5,
  value,
  onChange,
  ...rest
}) => {
  const [rating, setRating] = useState(value);

  const options = [];
  for (let i = 0; i < scale; i += 1) {
    options.push(i);
  }

  return (
    <FormField label={label} name={name} htmlFor={name} {...formProps}>
      <RadioButtonGroup
        direction="row"
        options={options}
        value={rating}
        name="starRating"
        onChange={(event) => {
          const adjustedRating = parseInt(event.target.value, 10) + 1;
          setRating(adjustedRating);
        }}
        {...rest}
      >
        {(option) =>
          option < rating ? <Star color={color} /> : <StarOutline />
        }
      </RadioButtonGroup>
    </FormField>
  );
};
