import React from 'react';
import styled from 'styled-components';

import { defaultProps } from '../default-props';

const styledWithTheme = (
  BaseComponent, styleTemplate, ...variables
) => {
  const StyledBaseComponent =
    styled(BaseComponent)(styleTemplate, ...variables);
  return (props) => <StyledBaseComponent {...defaultProps} {...props} />;
};

Object.setPrototypeOf(styledWithTheme, styled);

Object.entries(styled).forEach(([tag, componentFunction]) => {
  const resultingMethod = (styleTemplate, ...variables) => {
    const StyledBaseComponent = componentFunction(styleTemplate, ...variables);
    return (props) => <StyledBaseComponent {...defaultProps} {...props} />;
  };;
  Object.setPrototypeOf(resultingMethod, componentFunction);
  styledWithTheme[tag] = resultingMethod;
});

export { styledWithTheme };

