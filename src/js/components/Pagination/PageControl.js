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
  const { theme, passThemeFlag } = useThemeValue();
  const size = sizeProp || 'medium';

  return (
    <StyledContainer as="li" size={size} {...passThemeFlag}>
      {separator ? (
        <StyledSeparator size={size} {...passThemeFlag}>
          &#8230;
        </StyledSeparator>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          size={size}
          {...passThemeFlag}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
