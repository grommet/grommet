import React from 'react';

import { Footer } from '../Footer';
import { useThemeValue } from '../../utils/useThemeValue';

// Needs to have a CardBody or a flex container when Card uses a fixed height.
const CardFooter = ({ ...rest }) => {
  const theme = useThemeValue();
  return <Footer {...theme.card.footer} {...rest} />;
};

export { CardFooter };
