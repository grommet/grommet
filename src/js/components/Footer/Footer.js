import React from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const Footer = ({ ...rest }) => {
  const { theme } = useThemeValue();
  return (
    <Box
      as="footer"
      align="center"
      direction="row"
      flex={false}
      gap={theme.footer?.gap}
      justify="between"
      {...rest}
    />
  );
};

export { Footer };
