import React, { forwardRef } from 'react';

import { Box } from '../Box';
import { StyledClearButton, StyledClearButtonText } from './StyledSelect';
import { useThemeValue } from '../../utils/useThemeValue';

const ClearButton = forwardRef(
  ({ clear, onClear, name, theme, ...rest }, ref) => {
    const { label, position } = clear;
    const align = position !== 'bottom' ? 'start' : 'center';
    const buttonLabel = label || `Clear ${name || 'selection'}`;
    const { passThemeFlag } = useThemeValue();
    return (
      <StyledClearButton
        a11yTitle={`${buttonLabel}. Or, press ${
          position === 'bottom' ? 'shift tab' : 'down arrow'
        } to move to select options`}
        fill="horizontal"
        ref={ref}
        onClick={onClear}
        focusIndicator={false}
        theme={theme}
        {...passThemeFlag}
        {...rest}
      >
        <Box {...theme.select.clear.container} align={align}>
          <StyledClearButtonText {...theme.select.clear.text} theme={theme}>
            {buttonLabel}
          </StyledClearButtonText>
        </Box>
      </StyledClearButton>
    );
  },
);

export { ClearButton };
