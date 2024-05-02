import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Text } from '../Text';
import { useForwardedRef } from '../../utils';
import { SelectorPropTypes } from './propTypes';

const SelectorTitle = forwardRef(({ children, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const componentRef = useForwardedRef(ref);

  return (
    <Text weight={500} ref={componentRef} {...rest}>
      {children}
    </Text>
  );
});

SelectorTitle.displayName = 'SelectorTitle';
SelectorTitle.propTypes = SelectorPropTypes;

export { SelectorTitle };
