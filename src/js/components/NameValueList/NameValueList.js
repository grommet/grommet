import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Grid } from '../Grid';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValuePair } from './NameValuePair';

const NameValueList = forwardRef(
  (
    {
      a11yTitle,
      align,
      columns: columnsProp,
      data,
      direction = { list: 'column', pair: 'row' },
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
      <Grid
        as="dl"
        ref={ref}
        columns={columnsProp || columns}
        gap={gap || theme.nameValueList.gap}
        fill={direction.list === 'row'}
        {...rest}
      >
        {data.map((datum) => (
          <NameValuePair
            key={datum?.name}
            align={align}
            data={datum}
            direction={direction.pair}
            nameProps={nameProps}
            valueProps={valueProps}
          />
        ))}
      </Grid>
    );
  },
);

NameValueList.displayName = 'NameValueList';

export { NameValueList };
