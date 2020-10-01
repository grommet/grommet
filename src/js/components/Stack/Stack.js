import React, { Children } from 'react';

import { StyledStack, StyledStackLayer } from './StyledStack';
import { Box } from '../Box';

const buildStyledChildren = ({
  anchor,
  fill,
  guidingIndex,
  interactiveChild,
  interactiveIndex,
}) => (child, index) => {
  const interactive =
    interactiveChild === undefined || interactiveIndex === index;
  const isGuidingIndex = index === guidingIndex;
  const props = isGuidingIndex
    ? { guiding: true, fillContainer: fill }
    : { anchor };

  return (
    <StyledStackLayer key={index} interactive={interactive} {...props}>
      <Box>{child}</Box>
    </StyledStackLayer>
  );
};

const Stack = ({
  anchor,
  children,
  fill,
  guidingChild,
  interactiveChild,
  ...rest
}) => {
  const prunedChildren = Children.toArray(children).filter(c => c);
  const toChildIndex = child => {
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
