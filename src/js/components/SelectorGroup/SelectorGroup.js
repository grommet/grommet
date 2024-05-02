import React, {
  Children,
  forwardRef,
  // useContext,
  useMemo,
} from 'react';
// import { ThemeContext } from 'styled-components';

import { Grid } from '../Grid';
import { useForwardedRef } from '../../utils';
import { SelectorGroupPropTypes } from './propTypes';

export const SelectorGroupContext = React.createContext({});

const SelectorGroup = forwardRef(
  ({ children, defaultValue, multiple, onSelect, value, ...rest }, ref) => {
    // const theme = useContext(ThemeContext);
    const componentRef = useForwardedRef(ref);

    const totalChildren = Children.count(children);

    // TO DO eventually this will also contain the other props
    const contextValue = useMemo(
      () => ({
        multiple,
      }),
      [multiple],
    );

    return (
      // TO DO should this be a grid to enforce consistent sizing of
      // individual selectors?
      <Grid
        ref={componentRef}
        // TO DO what should default columns be?
        columns={{
          count: Math.min(4, totalChildren),
          size: ['auto', 'medium'],
        }}
        gap="small"
        role="group"
        {...rest}
      >
        <SelectorGroupContext.Provider value={contextValue}>
          {children}
        </SelectorGroupContext.Provider>
      </Grid>
    );
  },
);

SelectorGroup.displayName = 'SelectorGroup';
SelectorGroup.propTypes = SelectorGroupPropTypes;

export { SelectorGroup };
