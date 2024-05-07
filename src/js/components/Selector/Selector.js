import React, { forwardRef, useState } from 'react';

import { Button } from '../Button';

const Selector = forwardRef(({ children }, ref) => {
  // TO DO
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button aria-pressed={selected} ref={ref} onClick={handleClick}>
      {typeof children === 'function' ? children({ selected }) : children}
    </Button>
  );
});

Selector.displayName = 'Selector';
// Selector.propTypes = SelectorPropTypes;

export { Selector };
