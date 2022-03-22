import React, { forwardRef } from 'react';
import { Box } from '../Box';

const XAxis = forwardRef(({ values, pad, renderValue, serie }, ref) => {
  // When there are only labels at the end of the axis, let them take as much
  // space as they like. If there are more, align their container to the
  // data/guide lines and then let their content overflow that.
  const itemProps =
    values.length === 2
      ? {}
      : { width: '1px', overflow: 'visible', align: 'center' };

  return (
    <Box
      ref={ref}
      gridArea="xAxis"
      direction="row"
      justify="between"
      pad={pad?.horizontal ? { horizontal: pad.horizontal } : undefined}
    >
      {values.map((dataIndex, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={i} {...itemProps}>
          {serie ? renderValue(serie, dataIndex) : dataIndex}
        </Box>
      ))}
    </Box>
  );
});

export { XAxis };
