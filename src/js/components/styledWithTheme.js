import React, { forwardRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../default-props';

// TODO fix display names (?)

const getResultingComponentFunction = (StyledBaseComponent) =>
forwardRef(
  (props, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    return <StyledBaseComponent
      ref={ref}
      theme={theme}
      {...props}
    />;
  },
);

const styledWithTheme = (BaseComponent) => {
  const styledBaseComponentTagFunction = styled(BaseComponent);
  const resultingFunction = (styleTemplate, ...variables) => {
    const StyledBaseComponent = styledBaseComponentTagFunction(
      styleTemplate,
      ...variables,
    );
    if (BaseComponent.displayName) {
      StyledBaseComponent.displayName = BaseComponent.displayName;
    }
    return getResultingComponentFunction(StyledBaseComponent);
  };
  Object.setPrototypeOf(resultingFunction, styledBaseComponentTagFunction);
  return resultingFunction;
};

Object.setPrototypeOf(styledWithTheme, styled);

Object.entries(styled).forEach(([tag, componentFunction]) => {
  const resultingMethod = (styleTemplate, ...variables) => {
    const StyledBaseComponent = componentFunction(styleTemplate, ...variables);
    return getResultingComponentFunction(StyledBaseComponent);
  };
  Object.setPrototypeOf(resultingMethod, componentFunction);
  styledWithTheme[tag] = resultingMethod;
});

export { styledWithTheme };
