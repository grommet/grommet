import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import {
  StyledContainer,
  StyledPaginationButton,
  StyledSeparator,
} from './StyledPageControl';

export const PageControl = ({ control, separator, size, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <StyledContainer as="li" controlSize={size}>
      {separator ? (
        <StyledSeparator controlSize={size}>&#8230;</StyledSeparator>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          controlSize={size}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
