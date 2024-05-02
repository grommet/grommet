import React, { forwardRef, useState } from 'react';
// import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { useForwardedRef } from '../../utils';
import { SelectorPropTypes } from './propTypes';

const Selector = forwardRef(({ children }, ref) => {
  // const theme = useContext(ThemeContext);
  const componentRef = useForwardedRef(ref);

  // TO DO temp until group logic exists
  const [selected, setSelected] = useState(false);

  return (
    // TO DO, focus indicator doesn't match rounding
    // should we have them fill equal height when space is available?
    // or only take the space they need?
    // TO DO use aria-pressed
    <Button onClick={() => setSelected(!selected)}>
      {/* TO DO needs default and selected styling */}
      <Box
        ref={componentRef}
        border={{
          color: selected ? 'brand' : 'border',
          // TO DO changing border size causes layout shift unless we
          // calculate padding difference OR should we explore "box-shadow"?
          // https://stackoverflow.com/questions/19248985/how-to-prevent-shifting-when-changing-border-width
          size: selected ? 'small' : 'xsmall',
        }}
        cssGap
        overflow="hidden"
        round="xsmall"
        fill
      >
        {children}
      </Box>
    </Button>
  );
});

Selector.displayName = 'Selector';
Selector.propTypes = SelectorPropTypes;

export { Selector };
