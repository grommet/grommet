import React from 'react';

import { Text } from '../Text';
import { StyledPaginationButton, StyledContainer } from './StyledPageControl';

export const PageControl = ({ control, separator, ...rest }) => {
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
          kind="pagination"
          label={control}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
