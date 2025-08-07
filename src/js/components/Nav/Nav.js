import React from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const Nav = ({ ...rest }) => {
  const { theme } = useThemeValue();
  return <Box as="nav" flex={false} gap={theme.nav?.gap} {...rest} />;
};

export { Nav };
