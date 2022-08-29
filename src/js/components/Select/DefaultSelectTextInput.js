import React, { forwardRef } from 'react';
import { SelectTextInput } from './StyledSelect';

export const DefaultSelectTextInput = forwardRef(
  (
    { a11yTitle, disabled, id, name, placeholder, value, size, theme, ...rest },
    ref,
  ) => (
    <SelectTextInput
      a11yTitle={a11yTitle}
      // When Select is disabled, we want to show a default cursor
      // but not have disabled styling come from TextInput
      // Disabled can be a bool or an array of options to disable.
      // We only want to disable the TextInput if the control
      // button should be disabled which occurs when disabled
      // equals true.
      defaultCursor={disabled === true || undefined}
      focusIndicator={false}
      id={id ? `${id}__input` : undefined}
      name={name}
      ref={ref}
      {...rest}
      tabIndex="-1"
      type="text"
      placeholder={placeholder}
      plain
      readOnly
      value={value}
      size={size}
      theme={theme}
    />
  ),
);
