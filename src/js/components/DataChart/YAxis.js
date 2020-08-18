import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { round } from '../Chart';
import { doublePad } from './utils';

const YAxis = forwardRef(
  ({ chartProps, pad, renderValue, serie = {} }, ref) => {
    const theme = useContext(ThemeContext);
    const { render, suffix } = serie;

    // pull the x-axis values from the first chart, all should have the same
    const [, axisValues] = (Array.isArray(chartProps[0])
      ? chartProps[0][0]
      : chartProps[0]
    ).axis;

    let divideBy;
    let unit;
    if (!render && !suffix) {
      // figure out how many digits to show
      const maxValue = Math.max(...axisValues.map(v => Math.abs(v)));
      if (maxValue > 10000000) {
        divideBy = 1000000;
        unit = 'M';
      } else if (maxValue > 10000) {
        divideBy = 1000;
        unit = 'K';
      }
    }

    // Set basis to match double the vertical pad, so we can align the
    // text with the guides
    const edgeSize = doublePad[pad.vertical || pad];
    const basis = theme.global.edgeSize[edgeSize] || edgeSize;

    return (
      <Box ref={ref} gridArea="yAxis" justify="between" flex>
        {axisValues.map((axisValue, i) => {
          let content = renderValue(serie, undefined, axisValue);
          if (content === axisValue) {
            if (divideBy) content = round(content / divideBy, 0);
            if (unit) content = `${content}${unit}`;
          }
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              align="end"
              basis={basis}
              flex="shrink"
              justify={basis ? 'center' : undefined}
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
