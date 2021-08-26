import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Footer } from '../Footer';

// Needs to have a CardBody or a flex container when Card uses a fixed height.
const CardFooter = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Footer {...theme.card.footer} {...rest} />;
};

export { CardFooter };
