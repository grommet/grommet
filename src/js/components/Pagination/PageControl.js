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
  theme: themeProp,
  ...rest
}) => {
  const theme = useThemeValue(themeProp);

  const size = sizeProp || 'medium';

  return (
    <StyledContainer as="li" size={size} theme={theme}>
      {separator ? (
        <StyledSeparator size={size} theme={theme}>
          &#8230;
        </StyledSeparator>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          size={size}
          theme={theme}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
