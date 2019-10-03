import React, { Children } from 'react';

import { StyledStack, StyledStackLayer } from './StyledStack';

const buildStyleChildren = ({
  fill,
  guidingIndex,
  interactiveIndex,
  interactiveChild,
  anchor,
}) => {
  let childIndex = 0;

  return child => {
    if (child) {
      const interactive =
        interactiveChild === undefined || interactiveIndex === childIndex;

      const isGuidingIndex = childIndex === guidingIndex;
      childIndex += 1;

      const props = isGuidingIndex
        ? {
            guiding: true,
            fillContainer: fill,
          }
        : {
            anchor,
          };

      return (
        <StyledStackLayer interactive={interactive} {...props}>
          {child}
        </StyledStackLayer>
      );
    }

    return child;
  };
};

const toChildIndex = (child, children) => {
  let index = child;

  if (index === 'first' || !index) index = 0;
  else if (index === 'last') index = React.Children.count(children) - 1;

  return index;
};

const Stack = ({
  anchor,
  children,
  fill,
  guidingChild,
  interactiveChild,
  ...rest
}) => {
  const guidingIndex = toChildIndex(guidingChild, children);
  const interactiveIndex =
    interactiveChild && toChildIndex(interactiveChild, children);

  const styledChildren = Children.map(
    children,
    buildStyleChildren({
      fill,
      guidingIndex,
      interactiveIndex,
      interactiveChild,
      anchor,
    }),
  );

  return (
    <StyledStack fillContainer={fill} {...rest}>
      {styledChildren}
    </StyledStack>
  );
};

let StackDoc;
if (process.env.NODE_ENV !== 'production') {
  StackDoc = require('./doc').doc(Stack); // eslint-disable-line global-require
}
const StackWrapper = StackDoc || Stack;

export { StackWrapper as Stack };
