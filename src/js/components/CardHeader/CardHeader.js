import React from 'react';

import { Header } from '../Header';
import { useThemeValue } from '../../utils/useThemeValue';

const CardHeader = ({ ...rest }) => {
  const theme = useThemeValue();
  return <Header {...theme.card.header} {...rest} />;
};

export { CardHeader };
