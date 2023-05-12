import React, { forwardRef, useMemo } from 'react';
import { edgeToNum } from '../../utils';
import { Box } from '../Box';
import { round } from '../Chart';

const onlyVerticalPad = (pad) => {
  let result;
  if (pad) {
    if (typeof pad === 'string') result = { vertical: pad };
    else
      result = {
        vertical: pad.vertical,
        top: pad.top,
        bottom: pad.bottom,
      };
  }
  return result;
};

const YAxis = forwardRef(
  ({ values, pad: padProp, renderValue, serie, theme, thickness }, ref) => {
    const { render, suffix } = serie || {};

    // pad to the edge of the thickness, for when padding is more than half
    // the thickness
    const pad = useMemo(
      () =>
        (padProp && thickness && {
          top: `${
            edgeToNum(padProp.top || padProp.vertical, theme) -
            edgeToNum(thickness, theme) / 2
          }px`,
          bottom: `${
            edgeToNum(padProp.bottom || padProp.vertical, theme) -
            edgeToNum(thickness, theme) / 2
          }px`,
        }) ||
        onlyVerticalPad(padProp),
      [padProp, theme, thickness],
    );

    let divideBy;
    let unit;
    if (!render && !suffix) {
      // figure out how many digits to show
      const maxValue = Math.max(...values.map((v) => Math.abs(v)));
      if (maxValue > 10000000) {
        divideBy = 1000000;
        unit = 'M';
      } else if (maxValue > 10000) {
        divideBy = 1000;
        unit = 'K';
      }
    }

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
      <Box ref={ref} gridArea="yAxis" justify="between" flex pad={pad}>
        {values.map((axisValue, i) => {
          let content = serie ? renderValue(serie, axisValue, true) : axisValue;
          if (content === axisValue) {
            if (divideBy) content = round(content / divideBy, 0);
            if (unit) content = `${content}${unit}`;
          }
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              align="end"
              justify="center"
              {...labelContainerProps}
            >
              {content}
            </Box>
          );
        })}
      </Box>
    );
  },
);

export { YAxis };
