import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Chart, calcs } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Text } from '../Text';

const DataChart = ({
  chart,
  data,
  steps,
  thickness: thicknessProp,
  xAxis,
  yAxis,
  ...rest
}) => {
  const charts = useMemo(() => (Array.isArray(chart) ? chart : [chart]), [
    chart,
  ]);

  const values = useMemo(() => {
    const result = {};
    charts.forEach(({ key }) => {
      if (!result[key]) {
        result[key] = data.map(d => d[key]);
      }
    });
    return result;
  }, [charts, data]);

  const { axis, bounds, thickness } = useMemo(
    () =>
      calcs(values[Object.keys(values)[0]], {
        steps,
        thickness: thicknessProp,
      }),
    [steps, thicknessProp, values],
  );

  const xGuide = useMemo(
    () =>
      axis[0].map((_, i) => {
        if (xAxis && xAxis.guide) {
          if (i === 0) return 'left';
          if (i === axis[0].length - 1) return 'right';
          return true;
        }
        return undefined;
      }),
    [axis, xAxis],
  );

  const yGuide = useMemo(
    () =>
      axis[1].map((_, i) => {
        if (yAxis && yAxis.guide) {
          if (i === 0) return 'top';
          if (i === axis[1].length - 1) return 'bottom';
        }
        return undefined;
      }),
    [axis, yAxis],
  );

  /* eslint-disable react/no-array-index-key */
  return (
    <Grid
      // fill
      columns={['auto', 'flex']}
      rows={['flex', 'auto']}
      areas={[
        { name: 'yAxis', start: [0, 0], end: [0, 0] },
        { name: 'xAxis', start: [1, 1], end: [1, 1] },
        { name: 'charts', start: [1, 0], end: [1, 0] },
      ]}
      {...rest}
    >
      {xAxis && (
        <Box gridArea="xAxis" direction="row" justify="between">
          {axis[0].map((a, i) =>
            xAxis.render ? (
              <Box key={i}>{xAxis.render(i)}</Box>
            ) : (
              <Box key={i} pad="xsmall" align="start" border={xGuide[i]}>
                <Text>{xAxis.key ? data[i][xAxis.key] : a}</Text>
              </Box>
            ),
          )}
        </Box>
      )}
      {yAxis && (
        <Box gridArea="yAxis" justify="between">
          {axis[1].map((a, i) => (
            <Box key={i} pad="xsmall" align="end" border={yGuide[i]}>
              <Text>{a}</Text>
            </Box>
          ))}
        </Box>
      )}
      <Stack gridArea="charts" guidingChild="last">
        {xAxis && xAxis.guide && (
          <Box fill direction="row" justify="between">
            {xGuide.map((_, i) => (
              <Box key={i} border="left" />
            ))}
          </Box>
        )}
        {yAxis && yAxis.guide && (
          <Box fill justify="between">
            {yGuide.map((_, i) => (
              <Box key={i} border="top" />
            ))}
          </Box>
        )}
        {charts.map(({ key, ...chartRest }, i) => (
          <Chart
            key={i}
            values={values[key]}
            bounds={bounds}
            overflow
            thickness={thickness}
            {...chartRest}
          />
        ))}
      </Stack>
    </Grid>
  );
};

DataChart.displayName = 'DataChart';

let DataChartDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataChartDoc = require('./doc').doc(DataChart);
}
const DataChartWrapper = DataChartDoc || DataChart;

export { DataChartWrapper as DataChart };
