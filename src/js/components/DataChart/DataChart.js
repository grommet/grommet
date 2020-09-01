import React, {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '../Box';
import { Chart, calcs, calcBounds } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Detail } from './Detail';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { XGuide } from './XGuide';
import { YGuide } from './YGuide';
import { createDateFormat, halfPad, heightYGranularity, points } from './utils';

// DataChart takes a generic data array of objects plus as few properties
// as possible, and creates a Stack of Charts with x and y axes, a legend,
// and interactive detail.
// Much of the code here-in involves the "few properties" aspect where we
// normalize and automatically handle whatever the caller didn't specify.

const DataChart = forwardRef(
  (
    {
      a11yTitle,
      axis: axisProp = true,
      bounds: boundsProp = 'align',
      chart,
      data = [],
      detail,
      gap = 'small',
      guide: guideProp,
      legend,
      pad: padProp,
      series: seriesProp,
      size,
      ...rest
    },
    ref,
  ) => {
    // legend interaction, if any
    const [activeProperty, setActiveProperty] = useState();

    // refs used for ie11 not having Grid
    const xRef = useRef();
    const spacerRef = useRef();

    // normalize seriesProp to an array of objects, one per property
    const series = useMemo(() => {
      if (Array.isArray(seriesProp))
        return seriesProp.map(s =>
          typeof s === 'string' ? { property: s } : s,
        );
      if (typeof seriesProp === 'string') return [{ property: seriesProp }];
      return [seriesProp];
    }, [seriesProp]);

    const getPropertySeries = prop =>
      series.find(({ property }) => prop === property);

    // Normalize chart to an array of objects.
    // Each chart has one or more properties associated with it.
    // A stacked bar chart has an array of properties.
    // A point chart can have x, y, thickness, and color each driven
    // by a separate property.
    const charts = useMemo(() => {
      if (!chart) {
        if (series.length === 1)
          return series.map(s => ({ property: s.property }));
        // if we have more than one property, we'll use the first for
        // the x-axis and we'll plot the rest
        return series.slice(1).map(s => ({ property: s.property }));
      }
      if (Array.isArray(chart))
        return chart.map(c => (typeof c === 'string' ? { property: c } : c));
      return typeof chart === 'string' ? [{ property: chart }] : [chart];
    }, [chart, series]);

    // map the series property values into their own arrays
    const seriesValues = useMemo(() => {
      const result = {};
      series.forEach(({ property }) => {
        result[property] = data.map(d => d[property]);
      });
      return result;
    }, [data, series]);

    // Setup the values property for each chart.
    // The index into 'charts' can be used to index into 'chartValues'.
    const chartValues = useMemo(
      () =>
        charts.map(({ opacity, property, type }) => {
          if (property) {
            if (Array.isArray(property)) {
              // A range chart or a stacked bar chart have multiple properties.
              // In this case, this returns an array of values,
              // one per property.
              if (type === 'bars') {
                // Further down, where we render, each property is rendered
                // using a separate Chart component and the values are stacked
                // such that they line up appropriately.
                const totals = [];
                return property.map(cp => {
                  return seriesValues[cp].map((v, i) => {
                    const base = totals[i] || 0;
                    totals[i] = base + v;
                    return [i, base, base + v];
                  });
                });
              }
              return data.map((_, index) => [
                index,
                ...property.map(p =>
                  seriesValues[p] ? seriesValues[p][index] : data[index][p],
                ),
              ]);
            }
            if (typeof property === 'object') {
              // When 'property' is an array, the keys of this array indicate
              // which property drives which part of the rendered Chart.
              const { color, thickness, x, y, y2 } = property;
              return seriesValues[x].map((value, index) => {
                const aValue = { value: [value] };
                aValue.value.push(seriesValues[y][index]);
                if (y2) aValue.value.push(seriesValues[y2][index]);
                if (thickness) {
                  const t =
                    seriesValues[thickness.property || thickness][index];
                  aValue.thickness = thickness.transform
                    ? thickness.transform(t)
                    : t;
                }
                if (color) {
                  const c = seriesValues[color.property || color][index];
                  aValue.color = color.transform ? color.transform(c) : c;
                }
                if (opacity) aValue.opacity = opacity;
                return aValue;
              });
            }
            return seriesValues[property];
          }
          return undefined;
        }),
      [charts, data, seriesValues],
    );

    // map granularities to work well with the number of data points we have
    const granularities = useMemo(() => {
      let medium;
      [10, 9, 8, 7, 6, 5, 4, 3, 2].some(i => {
        if (data.length % i === 0) medium = i;
        return medium;
      });
      if (!medium) medium = 3;
      return {
        x: { coarse: 2, fine: data.length, medium },
        y: {
          ...(heightYGranularity[(size && size.height) || 'small'] || {
            fine: 5,
            medium: 3,
          }),
          coarse: 2,
        },
      };
    }, [data.length, size]);

    // normalize axis to objects, convert granularity to a number
    const axis = useMemo(() => {
      if (!axisProp) return undefined;
      const result = {};
      if (axisProp === true || axisProp.x === true) result.x = {};
      if (axisProp === true || axisProp.y === true) result.y = {};

      if (!result.x && axisProp.x)
        result.x =
          typeof axisProp.x === 'string'
            ? { property: axisProp.x }
            : { ...axisProp.x };
      if (!result.y && axisProp.y)
        result.y =
          typeof axisProp.y === 'string'
            ? { property: axisProp.y }
            : { ...axisProp.y };

      if (result.x) {
        if (!result.x.property) {
          // see if we have a point chart that has an x property
          if (data && data[0]) {
            if (data[0].date) result.x.property = 'date';
            else if (data[0].time) result.x.property = 'time';
          }
        }
        if (!result.x.granularity) result.x.granularity = 'coarse';
      }

      if (result.y) {
        if (!result.y.property && charts[0])
          // see if we have a point chart that has an x property
          result.y.property = charts[0].property.y || charts[0].property;
        if (!result.y.granularity) result.y.granularity = 'coarse';
      }

      // calculate number of entries based on granularity
      if (result.x) {
        const { granularity = 'coarse' } = result.x;
        result.x.count = granularities.x[granularity];
      }
      if (result.y) {
        const { granularity = 'coarse' } = result.y;
        result.y.count = granularities.y[granularity];
      }

      return result;
    }, [axisProp, data, charts, granularities]);

    // calculate axis, bounds, and thickness for each chart
    const chartProps = useMemo(() => {
      const steps = [];
      const coarseness = [undefined, 5];
      if (axis && axis.x) {
        const { granularity = 'coarse' } = axis.x;
        steps[0] = granularities.x[granularity] - 1;
      } else steps[0] = data.length - 1;

      if (axis && axis.y) {
        const { granularity = 'coarse' } = axis.y;
        steps[1] = granularities.y[granularity] - 1;
      } else steps[1] = 1;

      let chartBounds = chartValues.map((_, index) => {
        if (charts[index].type === 'bars') {
          // merge values for bars case
          let mergedValues = chartValues[index][0].slice(0);
          chartValues[index].slice(1).forEach(values => {
            mergedValues = mergedValues.map((__, i) => [
              i,
              Math.min(mergedValues[i][1], values[i][1]),
              Math.max(mergedValues[i][2], values[i][2]),
            ]);
          });
          return calcBounds(mergedValues, { coarseness, steps });
        }
        // if this is a data driven x chart, set coarseness for x
        return calcBounds(chartValues[index], {
          coarseness: charts[index].property.x ? [5, 5] : coarseness,
          steps,
        });
      });

      if (boundsProp === 'align') {
        const alignedBounds = [...chartBounds[0]];
        chartBounds.forEach(bounds => {
          alignedBounds[0][0] = Math.min(alignedBounds[0][0], bounds[0][0]);
          alignedBounds[0][1] = Math.max(alignedBounds[0][1], bounds[0][1]);
          alignedBounds[1][0] = Math.min(alignedBounds[1][0], bounds[1][0]);
          alignedBounds[1][1] = Math.max(alignedBounds[1][1], bounds[1][1]);
        });
        chartBounds = chartBounds.map(() => alignedBounds);
      }

      return chartValues.map((values, index) => {
        const calcValues = charts[index].type === 'bars' ? values[0] : values;
        return calcs(calcValues, { bounds: chartBounds[index], steps });
      });
    }, [axis, boundsProp, charts, chartValues, data, granularities]);

    // normalize how we style data properties for use by Legend and Detail
    const seriesStyles = useMemo(() => {
      const result = {};
      // start from what we were explicitly given
      charts.forEach(({ color, point, property, thickness, type }, index) => {
        const { thickness: calcThickness } = chartProps[index];

        if (typeof property === 'object' && !Array.isArray(property)) {
          // data driven point chart
          Object.keys(property).forEach(aspect => {
            const prop = property[aspect];
            if (!result[prop.property || prop])
              result[prop.property || prop] = { aspect };
          });
        } else {
          const props = Array.isArray(property) ? property : [property];
          props.forEach(prop => {
            const p = prop.property || prop;
            if (!result[p]) result[p] = {};
            if (color && !result[p].color) result[p].color = color;
            if (point && !result[p].point) result[p].point = point;
            else if (type === 'point') result[p].point = false;
            if ((thickness || calcThickness) && !result[p].thickness)
              result[p].thickness = thickness || calcThickness;
          });
        }
      });

      // set color for any non-aspect properties we don't have one for yet
      let colorIndex = 0;
      let pointIndex = 0;
      Object.keys(result).forEach(key => {
        const seriesStyle = result[key];
        if (!seriesStyle.aspect && !seriesStyle.color) {
          seriesStyle.color = `graph-${colorIndex}`;
          colorIndex += 1;
        }
        // set opacity if it isn't set and this isn't the active property
        if (activeProperty !== undefined && activeProperty !== key) {
          seriesStyle.opacity = 'medium';
        }
        if (seriesStyle.point === false) {
          seriesStyle.point = points[pointIndex];
          pointIndex += 1;
        }
      });

      return result;
    }, [activeProperty, charts, chartProps]);

    // normalize guide
    const guide = useMemo(() => {
      if (!guideProp) return undefined;
      let result;
      if (guideProp === true) {
        result = { x: {}, y: {} };
      } else {
        result = {};
        if (guideProp.x) result.x = { ...guideProp.x };
        if (guideProp.y) result.y = { ...guideProp.y };
      }
      // set counts
      if (result.x) {
        // if no granularity and axis, align count with axis
        if (!result.x.granularity && axis && axis.x)
          result.x.count = axis.x.count;
        if (!result.x.count)
          result.x.count = granularities.x[result.x.granularity || 'coarse'];
      }
      if (result.y) {
        // if no granularity and axis, align count with axis
        if (!result.y.granularity && axis && axis.y)
          result.y.count = axis.y.count;
        if (!result.y.count)
          result.y.count = granularities.y[result.y.granularity || 'coarse'];
      }
      return result;
    }, [axis, granularities, guideProp]);

    // set the pad to half the thickness, based on the chart types
    const pad = useMemo(() => {
      if (padProp !== undefined) return padProp;
      const result = {};
      charts.forEach(({ type }, index) => {
        const { thickness } = chartProps[index];
        result.horizontal = halfPad[thickness];
        if (type && type !== 'bar') result.vertical = halfPad[thickness];
      });
      return result;
    }, [chartProps, charts, padProp]);

    const dateFormats = useMemo(() => {
      const result = {};
      const full = axis && axis.x && axis.x.granularity === 'coarse';
      series.forEach(({ property, render }) => {
        if (
          !render &&
          data.length > 1 &&
          typeof data[0][property] === 'string'
        ) {
          result[property] = createDateFormat(
            data[0][property],
            data[data.length - 1][property],
            full,
          );
        }
      });
      return result;
    }, [axis, data, series]);

    // for ie11, align the spacer Box height to the x-axis height
    useLayoutEffect(() => {
      if (xRef.current && spacerRef.current) {
        const rect = xRef.current.getBoundingClientRect();
        spacerRef.current.style.height = `${rect.height}px`;
      }
    }, []);

    const renderValue = (serie, dataIndex, valueArg) => {
      let value;
      if (valueArg !== undefined) {
        if (serie && serie.render) return serie.render(valueArg);
        value = valueArg;
      } else {
        const datum = data[dataIndex];
        value = datum[serie.property];
        if (serie && serie.render)
          return serie.render(value, datum, serie.property);
      }
      if (serie) {
        const dateFormat = dateFormats[serie.property];
        if (dateFormat) return dateFormat(new Date(value));
        if (serie.prefix) value = `${serie.prefix}${value}`;
        if (serie.suffix) value = `${value}${serie.suffix}`;
      }
      return value;
    };

    // TODO: revisit how x/y axis are hooked up to charts and series

    const xAxisElement =
      axis && axis.x ? (
        <XAxis
          ref={xRef}
          axis={axis}
          chartProps={chartProps}
          data={data}
          renderValue={renderValue}
          serie={axis.x.property && getPropertySeries(axis.x.property)}
        />
      ) : null;

    const yAxisElement =
      axis && axis.y ? (
        <YAxis
          axis={axis}
          chartProps={chartProps}
          pad={pad}
          renderValue={renderValue}
          serie={axis.y.property && getPropertySeries(axis.y.property)}
        />
      ) : null;

    const stackFill = useMemo(() => {
      if (
        size === 'fill' ||
        (size && size.width === 'fill' && size.height === 'fill')
      )
        return true;
      if (size && size.width === 'fill') return 'horizontal';
      if (size && size.height === 'fill') return 'vertical';
      return undefined;
    }, [size]);

    const guidingChild = useMemo(() => {
      let result = 0;
      if (guide && guide.x) result += 1;
      if (guide && guide.y) result += 1;
      return result;
    }, [guide]);

    const stackElement = (
      <Stack gridArea="charts" guidingChild={guidingChild} fill={stackFill}>
        {guide && guide.x && <XGuide guide={guide} pad={pad} />}
        {guide && guide.y && <YGuide guide={guide} pad={pad} />}
        {charts.map(({ property: prop, type, x, y, ...chartRest }, i) => {
          if (type === 'bars') {
            // reverse to ensure area Charts are stacked in the right order
            return prop
              .map((cProp, j) => (
                <Chart
                  // eslint-disable-next-line react/no-array-index-key
                  key={j}
                  values={chartValues[i][j]}
                  overflow
                  {...seriesStyles[cProp]}
                  {...chartProps[i]}
                  {...chartRest}
                  type="bar"
                  size={size}
                  pad={pad}
                />
              ))
              .reverse();
          }
          return (
            <Chart
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              values={chartValues[i]}
              overflow
              {...seriesStyles[prop]}
              {...chartProps[i]}
              {...chartRest}
              type={type}
              size={size}
              pad={pad}
            />
          );
        })}
        {detail && (
          <Detail
            activeProperty={activeProperty}
            axis={axis}
            data={data}
            series={series}
            seriesStyles={seriesStyles}
            renderValue={renderValue}
          />
        )}
      </Stack>
    );

    const legendElement = legend ? (
      <Legend
        series={series}
        seriesStyles={seriesStyles}
        activeProperty={activeProperty}
        setActiveProperty={setActiveProperty}
      />
    ) : null;

    // IE11
    if (!Grid.available) {
      let content = stackElement;
      if (xAxisElement) {
        content = (
          <Box>
            {content}
            {xAxisElement}
          </Box>
        );
      }
      if (yAxisElement) {
        content = (
          <Box direction="row">
            <Box>
              {yAxisElement}
              <Box ref={spacerRef} flex={false} />
            </Box>
            {content}
          </Box>
        );
      }
      if (legendElement) {
        content = (
          <Box>
            {content}
            {legendElement}
          </Box>
        );
      }
      return content;
    }

    let content = (
      <Grid
        ref={ref}
        aria-label={a11yTitle}
        fill={stackFill}
        columns={[
          'auto',
          stackFill === true || stackFill === 'horizontal' ? 'flex' : 'auto',
        ]}
        rows={[
          stackFill === true || stackFill === 'vertical' ? 'flex' : 'auto',
          'auto',
        ]}
        areas={[
          { name: 'yAxis', start: [0, 0], end: [0, 0] },
          { name: 'xAxis', start: [1, 1], end: [1, 1] },
          { name: 'charts', start: [1, 0], end: [1, 0] },
        ]}
        gap={gap}
        {...rest}
      >
        {xAxisElement}
        {yAxisElement}
        {stackElement}
      </Grid>
    );

    if (legendElement) {
      content = (
        <Box align="start">
          {content}
          {legendElement}
        </Box>
      );
    }

    return content;
  },
);

DataChart.displayName = 'DataChart';

let DataChartDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataChartDoc = require('./doc').doc(DataChart);
}
const DataChartWrapper = DataChartDoc || DataChart;

export { DataChartWrapper as DataChart };
