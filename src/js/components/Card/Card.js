import React, { forwardRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { elevationStyle } from '../Box/StyledBox';

const StyledCard = styled(Box)`
  &:hover {
    ${(props) =>
      props.onClick &&
      props.theme.card.hover?.container?.elevation &&
      elevationStyle(props.theme.card.hover.container.elevation)}
    ${(props) => props.theme.card.hover?.container?.extend}
  }
`;

const Card = forwardRef(({ ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <StyledCard
      overflow="hidden"
      ref={ref}
      {...theme.card.container}
      {...rest}
    />
  );
});

Card.displayName = 'Card';

export { Card };
