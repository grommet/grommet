import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Chart, calcs, calcBounds } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { parseMetricToNum } from '../../utils';
import { Detail } from './Detail';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { XGuide } from './XGuide';
import { YGuide } from './YGuide';
import {
  createDateFormat,
  halfPad,
  heightYGranularity,
  largestSize,
  points,
} from './utils';
import { DataChartPropTypes } from './propTypes';

const stackedChartType = {
  areas: 'area',
  bars: 'bar',
  lines: 'line',
};

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
      chart: chartProp,
      data = [],
      detail,
      gap = 'small',
      guide: guideProp,
      legend,
      offset,
      placeholder,
      pad: padProp,
      series: seriesProp,
      size,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    // legend interaction, if any
    const [activeProperty, setActiveProperty] = useState();

    // normalize seriesProp to an array of objects, one per property
    const series = useMemo(() => {
      if (Array.isArray(seriesProp))
        return seriesProp
          .filter((s) => s.property || typeof s === 'string')
          .map((s) => (typeof s === 'string' ? { property: s } : s));
      if (typeof seriesProp === 'string') return [{ property: seriesProp }];
      if (seriesProp) return [seriesProp];
      return [];
    }, [seriesProp]);

    const getPropertySeries = (prop) =>
      series.find(({ property }) => prop === property);

    // Normalize chartProp to an array of objects.
    // Each chart has one or more properties associated with it.
    // A stacked bar or area chart has an array of properties.
    // A point chart can have x, y, thickness, and color each driven
    // by a separate property.
    const charts = useMemo(() => {
      if (!chartProp) {
        if (series.length === 1)
          return series
            .filter((s) => s.property)
            .map((s) => ({ property: s.property }));
        // if we have more than one property, we'll use the first for
        // the x-axis and we'll plot the rest
        return series.slice(1).map((s) => ({ property: s.property }));
      }
      if (Array.isArray(chartProp))
        return chartProp
          .map((c) => (typeof c === 'string' ? { property: c } : c))
          .filter(({ property }) => property);
      if (typeof chartProp === 'string') return [{ property: chartProp }];
      if (chartProp) return [chartProp];
      return [];
    }, [chartProp, series]);

    // map the series property values into their own arrays
    const seriesValues = useMemo(() => {
      const result = {};
      series.forEach(({ property }) => {
        result[property] = data.map((d) => d[property]);
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
              // A range chart or a stacked bar or area chart has multiple
              // properties.
              // In this case, this returns an array of values,
              // one per property.
              if (stackedChartType[type]) {
                // Further down, where we render, each property is rendered
                // using a separate Chart component and the values are stacked
                // such that they line up appropriately.
                const totals = [];
                return property.map((cp) => {
                  // handle object or string
                  const aProperty = cp.property || cp;
                  const values = seriesValues[aProperty];
                  if (!values) return undefined; // property name isn't valid
                  return values.map((v, i) => {
                    const base = totals[i] || 0;
                    totals[i] = base + v;
                    if (type === 'lines') return [i, base + v];
                    return [i, base, base + v];
                  });
                });
              }
              return data.map((_, index) => [
                index,
                ...property.map((p) =>
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
      // determine a good medium granularity that will align well with the
      // length of the data
      const steps = data.length - 1;
      // special case property driven point charts
      if (charts[0] && typeof charts[0].property === 'object') medium = 3;
      else if (steps < 4) medium = data.length;
      else if (steps === 4) medium = 3;
      else if (steps % 4 === 0) medium = 5;
      else if (steps % 3 === 0) medium = 4;
      else if (steps % 2 === 0) medium = 3;
      else medium = 2;
      return {
        x: { coarse: Math.min(data.length, 2), fine: data.length, medium },
        y: {
          ...(heightYGranularity[(size && size.height) || 'small'] || {
            fine: 5,
            medium: 3,
          }),
          coarse: 2,
        },
      };
    }, [charts, data.length, size]);

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
        const { type } = charts[index];
        if (stackedChartType[type]) {
          // merge values for bars, areas, and lines cases
          let mergedValues = chartValues[index]?.[0]?.slice(0) || [];
          chartValues[index]
            .slice(1) // skip first index as that is the x value
            .filter((values) => values) // property name isn't valid
            .forEach((values) => {
              mergedValues = mergedValues.map((__, i) =>
                type === 'lines'
                  ? [
                      i,
                      Math.min(mergedValues[i][1], values[i][1]),
                      Math.max(mergedValues[i][1], values[i][1]),
                    ]
                  : [
                      i,
                      Math.min(mergedValues[i][1], values[i][1]),
                      Math.max(mergedValues[i][2], values[i][2]),
                    ],
              );
            });
          return calcBounds(mergedValues, { coarseness, steps });
        }
        // if this is a data driven x chart, set coarseness for x
        return calcBounds(chartValues[index], {
          coarseness: charts[index].property.x ? [5, 5] : coarseness,
          steps,
        });
      });

      if (boundsProp === 'align' && chartBounds.length) {
        const alignedBounds = [...chartBounds[0]];
        chartBounds.forEach((bounds) => {
          alignedBounds[0][0] = Math.min(alignedBounds[0][0], bounds[0][0]);
          alignedBounds[0][1] = Math.max(alignedBounds[0][1], bounds[0][1]);
          alignedBounds[1][0] = Math.min(alignedBounds[1][0], bounds[1][0]);
          alignedBounds[1][1] = Math.max(alignedBounds[1][1], bounds[1][1]);
        });
        chartBounds = chartBounds.map(() => alignedBounds);
      }

      if (typeof boundsProp === 'object') {
        if (boundsProp.y)
          chartBounds = chartBounds.map((b) => [b[0], [...boundsProp.y]]);
      }

      return chartValues.map((values, index) => {
        const { thickness, type } = charts[index];
        const calcValues = stackedChartType[type] ? values[0] : values;
        return calcs(calcValues, {
          bounds: chartBounds[index],
          steps,
          thickness,
        });
      });
    }, [axis, boundsProp, charts, chartValues, data, granularities]);

    // normalize how we style data properties for use by Legend and Detail
    const seriesStyles = useMemo(() => {
      const result = {};
      // start from what we were explicitly given
      charts.forEach((chart, index) => {
        const { thickness: calcThickness } = chartProps[index];

        if (
          typeof chart.property === 'object' &&
          !Array.isArray(chart.property)
        ) {
          // data driven point chart
          Object.keys(chart.property).forEach((aspect) => {
            const prop = chart.property[aspect];
            if (!result[prop.property || prop])
              result[prop.property || prop] = { aspect };
          });
        } else {
          const setPropertyStyle = ({ property, ...styles }) => {
            // keep what we've got, use what is new
            result[property] = {
              ...styles,
              ...(result[property] || {}),
            };
            // unless the new style is has no opacity
            if (!styles.opacity) delete result[property].opacity;
            if (styles.type === 'point') result[property].point = false;
            if (calcThickness && !result[property].thickness)
              result[property].thickness = calcThickness;
          };

          if (Array.isArray(chart.property))
            chart.property.forEach((prop) => {
              if (typeof prop === 'string')
                setPropertyStyle({ ...chart, property: prop });
              else if (typeof prop === 'object')
                setPropertyStyle({ ...chart, ...prop });
            });
          else if (typeof chart === 'object') setPropertyStyle(chart);
          else if (typeof chart === 'string')
            setPropertyStyle({ property: chart });
        }
      });

      // set color for any non-aspect properties we don't have one for yet
      let colorIndex = 0;
      let pointIndex = 0;
      Object.keys(result).forEach((key) => {
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
    // except when using offset, then add even more horizontal pad
    const pad = useMemo(() => {
      if (padProp !== undefined) return padProp;
      const result = {};

      charts.forEach(({ type }, index) => {
        const { thickness } = chartProps[index];
        result.horizontal = largestSize(result.horizontal, halfPad[thickness]);
        if (type && type !== 'bar')
          result.vertical = largestSize(result.vertical, halfPad[thickness]);
      });
      return result;
    }, [chartProps, charts, padProp]);

    // calculate the thickness in pixels of each chart
    const thicknesses = useMemo(
      () =>
        offset
          ? charts.map((_, index) => {
              const { thickness } = chartProps[index];
              return parseMetricToNum(
                theme.global.edgeSize[thickness] || thickness,
              );
            })
          : undefined,
      [charts, chartProps, offset, theme],
    );

    // normalize any offset gap
    const offsetGap = useMemo(
      () =>
        (offset?.gap &&
          parseMetricToNum(theme.global.edgeSize[offset.gap] || offset.gap)) ||
        0,
      [offset, theme],
    );

    // calculate the offset for each chart, which is a sum of the thicknesses
    // any offset gaps that preceded it
    const offsets = useMemo(() => {
      if (offset) {
        return thicknesses.map((t, i) =>
          thicknesses.slice(0, i).reduce((a, b) => a + b + offsetGap, 0),
        );
      }
      return undefined;
    }, [offset, offsetGap, thicknesses]);

    // Calculate the total pad we should add to the end of each chart.
    // We do this to shrink the width of each chart so we can shift them
    // via `translate` and have them take up the right amount of width.
    const offsetPad = useMemo(
      () =>
        offsets
          ? `${
              offsets[offsets.length - 1] + thicknesses[thicknesses.length - 1]
            }px`
          : undefined,
      [offsets, thicknesses],
    );

    // The thickness of the segments. We need to convert to numbers
    // to be able to compare across charts where some might be using T-shirt
    // labels and others might be pixel values.
    const segmentThickness = useMemo(() => {
      let result = 0;
      charts.forEach((_, index) => {
        const { thickness } = chartProps[index];
        result = Math.max(
          result,
          parseMetricToNum(theme.global.edgeSize[thickness] || thickness),
        );
      });
      return `${result}px`;
    }, [charts, chartProps, theme]);

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
      axis && axis.x && chartProps.length ? (
        <XAxis
          axis={axis}
          values={
            (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0])
              .axis[0]
          }
          pad={offsetPad ? { ...pad, end: offsetPad } : pad}
          renderValue={renderValue}
          thickness={segmentThickness}
          serie={axis.x.property && getPropertySeries(axis.x.property)}
          style={
            offsetPad
              ? {
                  transform: `translate(${
                    offsets[Math.floor(offsets.length / 2)]
                  }px, 0px)`,
                }
              : {}
          }
          theme={theme}
        />
      ) : null;

    const yAxisElement =
      axis && axis.y && (chartProps.length || boundsProp?.y) ? (
        <YAxis
          axis={axis}
          values={
            boundsProp?.y?.slice(0).reverse() ||
            (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0])
              .axis[1]
          }
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
          // When we offset, we increase the padding on the end for all charts
          // by the same amount and we shift each successive chart to the
          // right by an offset for that chart. The last chart's right side
          // will end up aligning with where the charts would have been
          // had we not padded their ends.
          const chartPad = offsetPad ? { ...pad, end: offsetPad } : pad;
          const offsetProps = offsetPad
            ? { style: { transform: `translate(${offsets[i]}px, 0px)` } }
            : {};

          if (stackedChartType[type]) {
            // reverse to ensure area Charts are stacked in the right order
            return prop
              .map((cProp, j) => {
                const pProp = cProp.property || cProp;
                const { property, ...propRest } =
                  typeof cProp === 'object' ? cProp : {};
                return (
                  <Chart
                    // eslint-disable-next-line react/no-array-index-key
                    key={j}
                    // when property name isn't valid, send empty array
                    values={chartValues[i][j] || []}
                    overflow
                    {...seriesStyles[pProp]}
                    {...chartProps[i]}
                    {...chartRest}
                    {...propRest}
                    {...offsetProps}
                    type={stackedChartType[type] || type}
                    size={size}
                    pad={chartPad}
                  />
                );
              })
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
              {...offsetProps}
              type={type}
              size={size}
              pad={chartPad}
            />
          );
        })}
        {placeholder &&
          ((typeof placeholder === 'string' && (
            <Box
              fill="vertical"
              align="center"
              justify="center"
              background={{ color: 'background-front', opacity: 'strong' }}
              margin={pad}
            >
              <Text color="text-weak">{placeholder}</Text>
            </Box>
          )) ||
            placeholder)}
        {detail && (
          <Detail
            activeProperty={activeProperty}
            axis={axis}
            data={data}
            pad={pad}
            series={series}
            seriesStyles={seriesStyles}
            renderValue={renderValue}
            thickness={segmentThickness}
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
DataChart.propTypes = DataChartPropTypes;

export { DataChart };
