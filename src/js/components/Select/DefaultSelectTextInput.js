import React, { forwardRef } from 'react';
import { SelectTextInput } from './StyledSelect';

export const DefaultSelectTextInput = forwardRef(
  ({ disabled, id, ...rest }, ref) => (
    <SelectTextInput
      // When Select is disabled, we want to show a default cursor
      // but not have disabled styling come from TextInput
      // Disabled can be a bool or an array of options to disable.
      // We only want to disable the TextInput if the control
      // button should be disabled which occurs when disabled
      // equals true.
      defaultCursor={disabled === true || undefined}
      focusIndicator={false}
      id={id ? `${id}__input` : undefined}
      ref={ref}
      {...rest}
      tabIndex="-1"
      type="text"
      plain
      readOnly
    />
  ),
);
