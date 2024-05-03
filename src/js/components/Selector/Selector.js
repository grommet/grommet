import React, { forwardRef, useState } from 'react';

import { Button } from '../Button';

const Selector = forwardRef(({ children }, ref) => {
  // TO DO
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  const renderChildren =
    typeof children === 'function' ? children : () => children;

  return (
    // TO DO use aria-pressed
    <Button ref={ref} onClick={handleClick}>
      {renderChildren(selected)}
    </Button>
  );
});

Selector.displayName = 'Selector';
// Selector.propTypes = SelectorPropTypes;

export { Selector };
