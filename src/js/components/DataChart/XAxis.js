import React, { forwardRef, useMemo } from 'react';
import { edgeToNum } from '../../utils';
import { Box } from '../Box';
import { showInUnits } from './utils';

const onlyHorizontalPad = (pad) => {
  let result;
  if (pad) {
    if (typeof pad === 'string') result = { horizontal: pad };
    else
      result = {
        horizontal: pad.horizontal,
        start: pad.start,
        end: pad.end,
        left: pad.left,
        right: pad.right,
      };
  }
  return result;
};

const XAxis = forwardRef(
  (
    { values, pad: padProp, renderValue, serie, theme, thickness, ...rest },
    ref,
  ) => {
    const { render, suffix } = serie || {};

    // pad to the edge of the thickness, for when padding is more than half
    // the thickness
    const pad = useMemo(
      () =>
        (thickness &&
          padProp && {
            start: `${
              edgeToNum(padProp.start || padProp.horizontal, theme) -
              edgeToNum(thickness, theme) / 2
            }px`,
            end: `${
              edgeToNum(padProp.end || padProp.horizontal, theme) -
              edgeToNum(thickness, theme) / 2
            }px`,
          }) ||
        onlyHorizontalPad(padProp),
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
        edgeToNum(padProp?.start || padProp?.horizontal, theme) >= 24;
      if (centered)
        return {
          basis: thickness || '1px',
          overflow: 'visible',
          align: 'center',
        };
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
        {values.map((axisValue, i) => {
          let content = serie ? renderValue(serie, axisValue) : axisValue;
          if (content === axisValue && !render && !suffix) {
            const maxValue = Math.max(...values.map((v) => Math.abs(v)));
            content = showInUnits(content, maxValue);
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={i} {...labelContainerProps}>
              {content}
            </Box>
          );
        })}
      </Box>
    );
  },
);

export { XAxis };
