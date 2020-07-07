import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Header } from '../Header';

const CardHeader = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Header {...theme.card.header} {...rest} />;
};

let CardHeaderDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardHeaderDoc = require('./doc').doc(CardHeader);
}
const CardHeaderWrapper = CardHeaderDoc || CardHeader;

export { CardHeaderWrapper as CardHeader };
