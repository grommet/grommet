import React, { forwardRef } from 'react';
// import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { useForwardedRef } from '../../utils';
import { SelectorPropTypes } from './propTypes';

const SelectorBody = forwardRef(({ children, ...rest }, ref) => {
  // const theme = useContext(ThemeContext);
  const componentRef = useForwardedRef(ref);

  return (
    // TO DO what should default pad be? we've run into awkwardness with how
    // we set up Card pad in past.
    // The goal is the outer edge of Selector should always be "small", but
    // between content we might not want to double up
    <Box cssGap pad="small" flex ref={componentRef} {...rest}>
      {children}
    </Box>
  );
});

SelectorBody.displayName = 'SelectorBody';
SelectorBody.propTypes = SelectorPropTypes;

export { SelectorBody };
