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
      <NameValueListContext.Provider value={{ direction, align }}>
        <Grid
          as="dl"
          ref={ref}
          columns={columnsProp || columns}
          gap={gap || theme.nameValueList.gap}
          fill={direction.list === 'row'}
          {...rest}
        />
      </NameValueListContext.Provider>
    );
  },
);

NameValueList.displayName = 'NameValueList';

export { NameValueList };
