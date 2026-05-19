import React from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

// WizardHeader: optional top region for custom title/actions composition
const WizardHeader = ({ children, ...rest }) => {
  const { theme } = useThemeValue();
  const headerTheme = theme.wizard?.header || {};

  return (
    <Box background={headerTheme.background} pad={headerTheme.pad} {...rest}>
      {children}
    </Box>
  );
};

WizardHeader.displayName = 'WizardHeader';

export { WizardHeader };
