import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Text } from '../Text';
import { StyledPaginationButton, StyledContainer } from './StyledPageControl';

export const PageControl = ({ control, separator, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <StyledContainer as="li">
      {separator ? (
        <Text
          weight="bold" // thinking we should not be hardcoding these here
        >
          &#8230;
        </Text>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
