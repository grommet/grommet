import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

// WizardContent: the primary content surface region for a step's content
const WizardContent = ({ children, ...rest }) => {
  const { theme } = useThemeValue();
  const contentTheme = theme.wizard?.content || {};

  return (
    <Box
      flex
      pad={contentTheme.pad}
      background={contentTheme.background}
      style={{ minHeight: contentTheme.minHeight }}
      {...rest}
    >
      {children}
    </Box>
  );
};

WizardContent.displayName = 'WizardContent';
WizardContent.propTypes = {
  children: PropTypes.node,
};

export { WizardContent };
