import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';

const Card = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Box overflow="hidden" {...theme.card.container} {...rest} />;
};

Card.displayName = 'Card';

let CardDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardDoc = require('./doc').doc(Card);
}
const CardWrapper = CardDoc || Card;

export { CardWrapper as Card };
