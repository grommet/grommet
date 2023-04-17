import React, { forwardRef, useMemo } from 'react';
import { edgeToNum } from '../../utils';
import { Box } from '../Box';

const XAxis = forwardRef(
  (
    { values, pad: padProp, renderValue, serie, theme, thickness, ...rest },
    ref,
  ) => {
    // pad to the edge of the thickness, for when padding is more than half
    // the thickness
    const pad = useMemo(
      () => ({
        start: `${
          edgeToNum(padProp.start || padProp.horizontal, theme) -
          edgeToNum(thickness, theme) / 2
        }px`,
        end: `${
          edgeToNum(padProp.end || padProp.horizontal, theme) -
          edgeToNum(thickness, theme) / 2
        }px`,
      }),
      [padProp, theme, thickness],
    );

    // When there are only labels at the end of the axis and there isn't
    // much space for them, let them take as much space as they like
    // flowing in from the edges.
    // Otherwise, align their container to the
    // data/guide lines and then let their content overflow that.
    const labelContainerProps = useMemo(() => {
      // 24px was chosen empirically as 48px is enough to show some simple text
      const centered =
        values.length !== 2 ||
        edgeToNum(padProp.start || padProp.horizontal, theme) >= 24;
      if (centered)
        return { width: thickness, overflow: 'visible', align: 'center' };
      return {};
    }, [padProp, theme, thickness, values]);

    return (
      <Box
        ref={ref}
        gridArea="xAxis"
        direction="row"
        justify="between"
        pad={pad}
        {...rest}
      >
        {values.map((dataIndex, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={i} {...labelContainerProps}>
            {serie ? renderValue(serie, dataIndex) : dataIndex}
          </Box>
        ))}
      </Box>
    );
  },
);

export { XAxis };
