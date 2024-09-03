import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

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
  const withinThemeContext = useContext(ThemeContext);
  const size = sizeProp || 'medium';

  return (
    <StyledContainer
      as="li"
      size={size}
      {...(withinThemeContext === undefined ? { theme } : {})}
    >
      {separator ? (
        <StyledSeparator
          size={size}
          {...(withinThemeContext === undefined ? { theme } : {})}
        >
          &#8230;
        </StyledSeparator>
      ) : (
        <StyledPaginationButton
          a11yTitle={`Go to page ${control}`}
          fill
          kind={theme.pagination.button}
          label={control}
          size={size}
          {...(withinThemeContext === undefined ? { theme } : {})}
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
