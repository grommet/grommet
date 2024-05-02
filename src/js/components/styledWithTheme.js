import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { defaultProps } from '../default-props';

const getResultingComponentFunction = (StyledBaseComponent) =>
forwardRef(
  (props, ref) => <StyledBaseComponent
    ref={ref}
    {...defaultProps}
    {...props}
  />,
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
