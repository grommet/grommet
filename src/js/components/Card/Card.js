import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';

export const Card = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <Box
      round="small"
      elevation="small"
      overflow="hidden"
      {...theme.card.container}
      {...rest}
    />
  );
};
