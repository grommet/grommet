import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Card = forwardRef(({ children, header, footer, ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  return (
    <Box align="start" justify="between" {...theme.card} {...rest}>
      {header && (
        <Header
          round={{ size: theme.card.round, corner: 'top' }}
          fill="horizontal"
          overflow="hidden"
          {...theme.card.header}
        >
          {header}
        </Header>
      )}
      <Box flex {...theme.card.content}>
        {children}
      </Box>
      {footer && (
        <Footer
          round={{ size: theme.card.round, corner: 'bottom' }}
          fill="horizontal"
          overflow="hidden"
          {...theme.card.footer}
        >
          {footer}
        </Footer>
      )}
    </Box>
  );
});

Card.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
};

Card.defaultProps = {
  children: undefined,
  footer: undefined,
  header: undefined,
};
