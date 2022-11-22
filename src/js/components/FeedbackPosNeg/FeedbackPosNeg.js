import React, { useState } from 'react';
import { Like, LikeFill, Dislike, DislikeFill } from 'grommet-icons';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';

export const FeedbackPosNeg = ({
  color,
  formProps,
  name,
  label,
  value,
  onChange,
  ...rest
}) => {
  const [thumbs, setThumbs] = useState(value);

  return (
    <FormField label={label} name={name} htmlFor={name} {...formProps}>
      <RadioButtonGroup
        direction="row"
        options={['1', '2']}
        value={thumbs}
        onChange={(event) => {
          setThumbs(event.target.value);
          if (onChange) onChange(event);
        }}
        {...rest}
      >
        {(option, { checked }) => {
          if (option === '1') {
            return checked ? (
              <LikeFill color="purple!" />
            ) : (
              <Like color="purple!" />
            );
          }
          return checked ? (
            <DislikeFill color="purple!" />
          ) : (
            <Dislike color="purple!" />
          );
        }}
      </RadioButtonGroup>
    </FormField>
  );
};
