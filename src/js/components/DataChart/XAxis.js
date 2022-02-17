import React, { forwardRef } from 'react';
import { Box } from '../Box';

const XAxis = forwardRef(({ chartProps, pad, renderValue, serie }, ref) => {
  // pull the x-axis values from the first chart, all should have the same
  const [axisValues] = (
    Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]
  ).axis;

  // When there are only labels at the end of the axis, let them take as much
  // space as they like. If there are more, align their container to the
  // data/guide lines and then let their content overflow that.
  const itemProps =
    axisValues.length === 2
      ? {}
      : { width: '1px', overflow: 'visible', align: 'center' };

  return (
    <Box ref={ref} gridArea="xAxis" direction="row" justify="between" pad={pad}>
      {axisValues.map((dataIndex, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={i} {...itemProps}>
          {serie ? renderValue(serie, dataIndex) : dataIndex}
        </Box>
      ))}
    </Box>
  );
});

export { XAxis };
