import React, {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '../Box';
import { Chart, calcs } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Detail } from './Detail';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { XGuide } from './XGuide';
import { YGuide } from './YGuide';
import { createDateFormat, halfPad, pointTypes } from './utils';

const DataChart = forwardRef(
  (
    {
      a11yTitle,
      axis: axisProp,
      chart,
      data = [],
      detail,
      gap,
      guide: guideProp,
      legend,
      pad: padProp,
      property,
      size,
      ...rest
    },
    ref,
  ) => {
    console.warn(`The DataChart component is still experimental.
      It is not guaranteed to be backwards compatible until it is explicitly
      released. Keep an eye on the release notes and #announcements channel
      in Slack.`);

    // legend interaction, if any
    const [activeProperty, setActiveProperty] = useState();

    // refs used for ie11 not having Grid
    const xRef = useRef();
    const spacerRef = useRef();

    // normalize property to an object
    const properties = useMemo(() => {
      const result = {};
      if (Array.isArray(property))
        property.forEach(p => {
          if (typeof p === 'string') result[p] = { property: p };
          else result[p.property] = p;
        });
      else if (typeof property === 'string') result[property] = { property };
      else result[property.property] = property;
      return result;
    }, [property]);

    // normalize chart to an array of objects
    const charts = useMemo(() => {
      if (!chart) {
        const props = Object.values(properties);
        if (props.length === 1)
          return props.map(p => ({ property: p.property }));
        // if we have more than one property, we'll use the first for
        // the x-axis and we'll plot the rest
        return props.slice(1).map(p => ({ property: p.property }));
      }
      if (Array.isArray(chart))
        return chart.map(c => (typeof c === 'string' ? { property: c } : c));
      return typeof chart === 'string' ? [{ property: chart }] : [chart];
    }, [chart, properties]);

    // normalize property color and point style
    const propertyStyles = useMemo(() => {
      const result = {};
      let colorIndex = 0;
      let pointIndex = 0;
      Object.values(properties)
        // only if we're charting it
        .filter(p =>
          charts.find(c =>
            Array.isArray(c.property)
              ? c.property.includes(p.property)
              : c.property === p.property,
          ),
        )
        .forEach(prop => {
          const { color, point } = prop;
          const propertyStyle = { color, point };
          if (!color) {
            propertyStyle.color = `graph-${colorIndex}`;
            colorIndex += 1;
          }
          if (!point) {
            propertyStyle.point = pointTypes[pointIndex];
            pointIndex += 1;
          }
          if (
            activeProperty !== undefined &&
            activeProperty !== prop.property
          ) {
            propertyStyle.color = {
              color: propertyStyle.color,
              opacity: 'medium',
            };
          }
          result[prop.property] = propertyStyle;
        });
      return result;
    }, [activeProperty, charts, properties]);

    // map the property values into their own arrays
    const propertyValues = useMemo(() => {
      const result = {};
      Object.values(properties).forEach(({ property: prop }) => {
        result[prop] = data.map(d => d[prop]);
      });
      return result;
    }, [properties, data]);

    // setup the values property for each chart
    const chartValues = useMemo(
      () =>
        charts.map(({ property: prop }) => {
          if (Array.isArray(prop)) {
            // stacked bar chart
            const totals = [];
            return prop.map(cp => {
              return propertyValues[cp].map((v, i) => {
                const base = totals[i] || 0;
                totals[i] = base + v;
                return [i, base, base + v];
              });
            });
          }
          return propertyValues[prop];
        }),
      [charts, propertyValues],
    );

    // map granularities to counts
    const granularities = useMemo(() => {
      let medium;
      [10, 9, 8, 7, 6, 5, 4, 3, 2].some(i => {
        if (data.length % i === 0) medium = i;
        return medium;
      });
      return {
        x: { coarse: 2, fine: data.length, medium },
        // TODO: adjust fine and medium based on vertical size
        y: { coarse: 2, fine: 5, medium: 3 },
      };
    }, [data.length]);

    // normalize axis to objects, convert granularity to a number
    const axis = useMemo(() => {
      if (!axisProp) return undefined;
      let result;
      if (axisProp === true) {
        const props = Object.values(properties);
        result = {
          x: { granularity: 'coarse' },
          y: { granularity: 'coarse' },
        };
        if (props.length === 1) {
          result.y.property = props[0].property;
        } else {
          result.x.property = props[0].property;
          result.y.property = props[1].property;
        }
      } else {
        result = {};
        if (axisProp.x) {
          if (typeof axisProp.x === 'string')
            result.x = { property: axisProp.x };
          else result.x = { ...axisProp.x };
        }
        if (axisProp.y) {
          if (typeof axisProp.y === 'string')
            result.y = { property: axisProp.y };
          else result.y = { ...axisProp.y };
        }
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
    }, [axisProp, granularities, properties]);

    // calculate axis, bounds, and thickness for each chart
    const chartProps = useMemo(() => {
      const steps = [];
      // TODO: not sure this is the right way to setup steps
      if (axis && axis.x) {
        const { granularity = 'coarse' } = axis.x;
        steps[0] = granularities.x[granularity] - 1;
      } else steps[0] = data.length - 1;

      if (axis && axis.y) {
        const { granularity = 'coarse' } = axis.y;
        steps[1] = granularities.y[granularity] - 1;
      } else steps[1] = 1;

      return chartValues.map((_, index) => {
        if (Array.isArray(chartValues[index][0])) {
          // merge values for stacked bars case
          const mergedValues = [...chartValues[index][0]];
          chartValues[index].slice(1).forEach(values => {
            mergedValues.forEach((__, i) => {
              mergedValues[i] = [
                i,
                Math.min(mergedValues[i][1], values[i][1]),
                Math.max(mergedValues[i][2], values[1][2]),
              ];
            });
          });
          return calcs(mergedValues, { steps });
        }
        return calcs(chartValues[index], { steps });
      });
    }, [axis, chartValues, data, granularities]);

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

    // set the pad to half the thickness, if not defined
    const pad = useMemo(() => {
      if (padProp !== undefined) return padProp;
      const { thickness } = chartProps[0]; // TODO: look across charts
      return halfPad[thickness];
    }, [chartProps, padProp]);

    const dateFormats = useMemo(() => {
      const result = {};
      const full = axis && axis.x && axis.x.granularity === 'coarse';
      Object.values(properties).forEach(prop => {
        if (
          !prop.render &&
          data.length > 1 &&
          typeof data[0][prop.property] === 'string'
        ) {
          result[prop.property] = createDateFormat(
            data[0][prop.property],
            data[data.length - 1][prop.property],
            full,
          );
        }
      });
      return result;
    }, [axis, data, properties]);

    // for ie11, align the spacer Box height to the x-axis height
    useLayoutEffect(() => {
      if (xRef.current && spacerRef.current) {
        const rect = xRef.current.getBoundingClientRect();
        spacerRef.current.style.height = `${rect.height}px`;
      }
    }, []);

    const renderProperty = (prop, index, valueArg) => {
      let value;
      if (valueArg !== undefined) {
        if (prop.value) return prop.render(valueArg);
        value = valueArg;
      } else {
        const datum = data[index];
        value = datum[prop.property];
        if (prop.render) return prop.render(value, datum, prop.property);
      }
      const dateFormat = dateFormats[prop.property];
      if (dateFormat) return dateFormat(new Date(value));
      if (prop.prefix) value = `${prop.prefix}${value}`;
      if (prop.suffix) value = `${value}${prop.suffix}`;
      return value;
    };

    const xAxisElement =
      axis && axis.x ? (
        <XAxis
          ref={xRef}
          axis={axis}
          chartProps={chartProps}
          data={data}
          properties={properties}
          renderProperty={renderProperty}
        />
      ) : null;

    const yAxisElement =
      axis && axis.y ? (
        <YAxis
          axis={axis}
          charts={charts}
          chartProps={chartProps}
          pad={pad}
          properties={properties}
          renderProperty={renderProperty}
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
        {charts.map(({ property: prop, ...chartRest }, i) => {
          if (Array.isArray(prop)) {
            // reverse to ensure area Charts are stacked in the right order
            return prop
              .map((cProp, j) => (
                <Chart
                  // eslint-disable-next-line react/no-array-index-key
                  key={j}
                  values={chartValues[i][j]}
                  overflow
                  pad={pad}
                  size={size}
                  {...propertyStyles[cProp]}
                  {...chartProps[i]}
                  {...chartRest}
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
              pad={pad}
              size={size}
              {...propertyStyles[prop]}
              {...chartProps[i]}
              {...chartRest}
            />
          );
        })}
        {detail && (
          <Detail
            activeProperty={activeProperty}
            axis={axis}
            data={data}
            properties={properties}
            propertyStyles={propertyStyles}
            renderProperty={renderProperty}
          />
        )}
      </Stack>
    );

    const legendElement = legend ? (
      <Legend
        properties={properties}
        propertyStyles={propertyStyles}
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

    return (
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
          'auto',
        ]}
        areas={[
          { name: 'yAxis', start: [0, 0], end: [0, 0] },
          { name: 'xAxis', start: [1, 1], end: [1, 1] },
          { name: 'charts', start: [1, 0], end: [1, 0] },
          { name: 'legend', start: [1, 2], end: [1, 2] },
        ]}
        {...rest}
      >
        {xAxisElement}
        {yAxisElement}
        {stackElement}
        {legendElement}
      </Grid>
    );
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
