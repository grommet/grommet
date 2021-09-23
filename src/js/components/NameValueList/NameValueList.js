import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { NameValuePair } from './NameValuePair';

const NameValueList = forwardRef(
  (
    {
      a11yTitle,
      data,
      layout = 'vertical',
      pairProps,
      nameProps,
      listProps,
      valueProps,
      align,
      ...rest
    },
    ref,
  ) => (
    <Box
      ref={ref}
      gap={layout === 'horizontal' ? 'large' : 'medium'}
      direction={layout === 'horizontal' ? 'row' : 'column'}
      {...listProps}
      {...rest}
    >
      {data.map((datum) => (
        <NameValuePair
          // direction can be vertical(default) stacked, or horizontal(inline)
          layout={layout}
          align={align}
          data={datum}
          nameProps={nameProps}
          pairProps={pairProps}
          valueProps={valueProps}
        />
      ))}
    </Box>
  ),
);

NameValueList.displayName = 'NameValueList';

export { NameValueList };
