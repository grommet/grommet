import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';

const CardBody = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Box flex {...theme.card.body} {...rest} />;
};

let CardBodyDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardBodyDoc = require('./doc').doc(CardBody);
}
const CardBodyWrapper = CardBodyDoc || CardBody;

export { CardBodyWrapper as CardBody };
