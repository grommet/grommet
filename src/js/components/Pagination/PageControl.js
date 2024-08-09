import React from 'react';

import {
  StyledContainer,
  StyledPaginationButton,
  StyledSeparator,
} from './StyledPageControl';
import { useThemeValue } from '../../utils/useThemeValue';

export const PageControl = ({
  control,
  separator,
  size: sizeProp,
  ...rest
}) => {
  const theme = useThemeValue();
  const size = sizeProp || 'medium';

  return (
    <StyledContainer as="li" size={size}>
      {separator ? (
        <StyledSeparator size={size}>&#8230;</StyledSeparator>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          size={size}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
