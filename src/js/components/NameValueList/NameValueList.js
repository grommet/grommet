import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Grid } from '../Grid';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValueListContext } from './NameValueListContext';

const NameValueList = forwardRef(
  (
    {
      a11yTitle,
      align,
      layout = 'column',
      nameProps,
      pairProps = { direction: 'row' },
      valueProps,
      ...rest
    },
    ref,
  ) => {
    const size = useContext(ResponsiveContext);
    const theme = useContext(ThemeContext);

    // If layout is grid, there is a set max of the valueWidth and
    // the min is set to auto for grid layout.

    let columns;
    const valueWidth = valueProps?.width || theme.nameValueList.value.width;
    const nameWidth = nameProps?.width || theme.nameValueList.name.width;
    if (size === 'small' || layout === 'grid')
      columns = { count: 'fit', size: ['auto', valueWidth] };
    else if (layout === 'column' && pairProps.direction === 'row')
      columns = [nameWidth, valueWidth];
    else columns = [valueWidth];

    return (
      <NameValueListContext.Provider
        value={{ nameProps, pairProps, valueProps }}
      >
        <Grid
          as="dl"
          ref={ref}
          columns={columns}
          gap={theme.nameValueList.gap}
          fill={layout === 'grid'}
          {...rest}
        />
      </NameValueListContext.Provider>
    );
  },
);

NameValueList.displayName = 'NameValueList';

export { NameValueList };
