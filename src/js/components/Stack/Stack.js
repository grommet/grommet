import React, { Children, forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { StyledStack, StyledStackLayer } from './StyledStack';
import { StackPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const buildStyledChildren =
  ({ anchor, fill, guidingIndex, interactiveChild, interactiveIndex }) =>
  (child, index) => {
    const interactive =
      interactiveChild === undefined || interactiveIndex === index;
    const isGuidingIndex = index === guidingIndex;
    const props = isGuidingIndex
      ? { guiding: true, fillContainer: fill }
      : { anchor };

    return (
      <StyledStackLayer key={index} interactive={interactive} {...props}>
        {child}
      </StyledStackLayer>
    );
  };

const Stack = forwardRef(
  (
    { anchor, children, fill, guidingChild, interactiveChild, ...rest },
    ref,
  ) => {
    const theme = useThemeValue();
    const withinThemeContext = useContext(ThemeContext);
    const prunedChildren = Children.toArray(children).filter((c) => c);
    const toChildIndex = (child) => {
      let index = child;
      if (index === 'first' || !index) index = 0;
      else if (index === 'last') index = prunedChildren.length - 1;
      return index;
    };

    const guidingIndex = toChildIndex(guidingChild);
    const interactiveIndex = interactiveChild && toChildIndex(interactiveChild);

    const styledChildren = prunedChildren.map(
      buildStyledChildren({
        anchor,
        fill,
        guidingIndex,
        interactiveChild,
        interactiveIndex,
      }),
    );

    return (
      <StyledStack
        ref={ref}
        fillContainer={fill}
        {...(withinThemeContext === undefined ? { theme } : {})}
        {...rest}
      >
        {styledChildren}
      </StyledStack>
    );
  },
);

Stack.displayName = 'Stack';
Stack.propTypes = StackPropTypes;

export { Stack };
