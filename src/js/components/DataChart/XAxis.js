import React, { forwardRef } from 'react';
import { Box } from '../Box';

const XAxis = forwardRef(
  ({ axis, chartProps, data, properties, renderProperty }, ref) => {
    const prop = axis.x.property && properties[axis.x.property];
    // pull the x-axis values from the first chart, all should have the same
    const [axisValues] = (Array.isArray(chartProps[0])
      ? chartProps[0][0]
      : chartProps[0]
    ).axis;

    return (
      <Box ref={ref} gridArea="xAxis" direction="row" justify="between">
        {axisValues.map((dataIndex, i) => {
          let align;
          if (axisValues.length === data.length) align = 'center';
          else if (i === 0) align = 'start';
          else if (i === axisValues.length - 1) align = 'end';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={i} flex align={align}>
              {prop ? renderProperty(prop, dataIndex) : dataIndex}
            </Box>
          );
        })}
      </Box>
    );
  },
);

export { XAxis };
