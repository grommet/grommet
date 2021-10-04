import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Grid } from '../Grid';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PropertyListContext } from './PropertyListContext';

const PropertyList = forwardRef(
  (
    {
      a11yTitle,
      align,
      columns: columnsProp,
      direction = { list: 'column', property: 'row' },
      gap,
      nameProps,
      valueProps,
      ...rest
    },
    ref,
  ) => {
    const size = useContext(ResponsiveContext);
    const theme = useContext(ThemeContext);

    let columns;
    if (size === 'small' || direction.list === 'row') columns = 'medium';
    else if (direction.list === 'column') columns = ['small', 'medium'];

    return (
      <PropertyListContext.Provider value={{ direction, align }}>
        <Grid
          as="dl"
          ref={ref}
          columns={columnsProp || columns}
          gap={gap || theme.propertyList.gap}
          fill={direction.list === 'row'}
          {...rest}
        />
      </PropertyListContext.Provider>
    );
  },
);

PropertyList.displayName = 'PropertyList';

export { PropertyList };
