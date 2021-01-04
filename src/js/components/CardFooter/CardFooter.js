import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Footer } from '../Footer';

// Needs to have a CardBody or a flex container when Card uses a fixed height.
const CardFooter = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Footer {...theme.card.footer} {...rest} />;
};

let CardFooterDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardFooterDoc = require('./doc').doc(CardFooter);
}
const CardFooterWrapper = CardFooterDoc || CardFooter;

export { CardFooterWrapper as CardFooter };
