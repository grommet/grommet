import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SelectTextInput } from './StyledSelect';
import { defaultProps } from '../../default-props';

export const DefaultSelectTextInput = forwardRef(
  ({ disabled, id, ...rest }, ref) => {
    // This component override default cursor for the TextInput
    // By default the cursor is 'pointer'
    // If the component is disabled the cursor is the one define in
    // theme.global.control.disabled.cursor, else is 'default"
    const theme = useContext(ThemeContext) || defaultProps.theme;

    return (
      <SelectTextInput
        disabled={disabled}
        focusIndicator={false}
        id={id ? `${id}__input` : undefined}
        ref={ref}
        {...rest}
        theme={theme}
        tabIndex="-1"
        type="text"
        plain
        readOnly
      />
    );
  },
);
