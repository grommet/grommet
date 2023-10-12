import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Header } from '../Header';

const CardHeader = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Header {...theme.card.header} {...rest} />;
};

export { CardHeader };
