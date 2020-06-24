import React, {
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Chart, calcs, round } from '../Chart';
import { Drop } from '../Drop';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Text } from '../Text';

const halfPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall',
};

const doublePad = {
  large: 'xlarge',
  medium: 'large',
  small: 'medium',
  xsmall: 'small',
  xxsmall: 'xsmall',
};

const createDateFormat = (firstValue, lastValue, full) => {
  let dateFormat;
  const startDate = new Date(firstValue);
  const endDate = new Date(lastValue);
  if (
    // check for valid dates, this is the fastest way
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime())
  ) {
    const delta = Math.abs(endDate - startDate);
    let options;
    if (delta < 60000)
      // less than 1 minute
      options = full
        ? {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: undefined,
          }
        : { second: '2-digit', day: undefined };
    else if (delta < 3600000)
      // less than 1 hour
      options = full
        ? { hour: 'numeric', minute: '2-digit', day: undefined }
        : { minute: '2-digit', day: undefined };
    else if (delta < 86400000)
      // less than 1 day
      options = { hour: 'numeric' };
    else if (delta < 2592000000)
      // less than 30 days
      options = {
        month: full ? 'short' : 'numeric',
        day: 'numeric',
      };
    else if (delta < 31557600000)
      // less than 1 year
      options = { month: full ? 'long' : 'short' };
    // 1 year or more
    else options = { year: 'numeric' };
    if (options)
      dateFormat = new Intl.DateTimeFormat(undefined, options).format;
  }
  return dateFormat;
};

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
    const theme = useContext(ThemeContext);

    // detail interaction, if any
    const [detailIndex, setDetailIndex] = useState();
    const detailContainer = useRef();
    const detailRefs = useMemo(() => [], []);

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
        return props.slice(1).map(p => ({ property: p.property }));
      }
      if (Array.isArray(chart))
        return chart.map(c => (typeof c === 'string' ? { property: c } : c));
      return typeof chart === 'string' ? [{ property: chart }] : [chart];
    }, [chart, properties]);

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
            return prop.map(({ property: aProp }) => {
              return propertyValues[aProp].map((v, i) => {
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

      return chartValues.map((_, index) =>
        Array.isArray(chartValues[index][0])
          ? chartValues[index].map(values => calcs(values, { steps }))
          : calcs(chartValues[index], { steps }),
      );
    }, [axis, chartValues, data, granularities]);

    // set the pad to half the thickness, if not defined
    const pad = useMemo(() => {
      if (padProp !== undefined) return padProp;
      const { thickness } = chartProps[0]; // TODO: look across charts
      const padSize = halfPad[thickness];
      const allSides =
        charts.filter(({ type }) => type && type !== 'bar').length > 0;
      if (allSides) return padSize;
      if (axis && axis.y)
        return { horizontal: padSize, vertical: halfPad.medium };
      return { horizontal: padSize };
    }, [axis, charts, chartProps, padProp]);

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

    const dateFormats = useMemo(() => {
      const result = {};
      const full = !(axis && axis.x && axis.x.granularity === 'coarse');
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

    /* eslint-disable react/no-array-index-key */
    let xAxisElement;
    if (axis && axis.x) {
      // Set basis to match thickness. This works well for bar charts,
      // to align each bar's label.
      let basis;
      // if (thickness && axisXX[0].length === numValues) {
      //   basis = theme.global.edgeSize[thickness] || thickness;
      // }

      const prop = axis.x.property && properties[axis.x.property];
      // pull the x-axis values from the first chart, all should have the same
      const [axisValues] = (Array.isArray(chartProps[0])
        ? chartProps[0][0]
        : chartProps[0]
      ).axis;

      xAxisElement = (
        <Box ref={xRef} gridArea="xAxis" direction="row" justify="between">
          {axisValues.map((dataIndex, i) => (
            <Box
              key={i}
              basis={basis}
              flex="shrink"
              align={basis ? 'center' : undefined}
            >
              {prop ? renderProperty(prop, dataIndex) : dataIndex}
            </Box>
          ))}
        </Box>
      );
    }

    let yAxisElement;
    if (axis && axis.y) {
      const prop = axis.y.property && properties[axis.y.property];
      let axisValues;
      charts.forEach(({ property: p }, i) => {
        if (p === prop.property)
          [, axisValues] = (Array.isArray(chartProps[i])
            ? chartProps[i][0]
            : chartProps[i]
          ).axis;
      });
      let divideBy;
      let unit;
      if (!prop.render && !prop.suffix) {
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
      let basis;
      if (axis.y.count === data.length) {
        const edgeSize = doublePad[pad.vertical || pad];
        basis = theme.global.edgeSize[edgeSize] || edgeSize;
      }

      yAxisElement = (
        <Box gridArea="yAxis" justify="between" flex>
          {axisValues.map((axisValue, i) => {
            let content = renderProperty(prop, undefined, axisValue);
            if (content === axisValue) {
              if (divideBy) content = round(content / divideBy, 0);
              if (unit) content = `${content}${unit}`;
            }
            return (
              <Box
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
    }

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
        {guide && guide.x && (
          <Box
            fill
            direction="row"
            justify="between"
            pad={pad}
            responsive={false}
          >
            {Array.from({ length: guide.x.count }).map((_, i) => (
              <Box key={i} border="left" />
            ))}
          </Box>
        )}
        {guide && guide.y && (
          <Box fill justify="between" pad={pad} responsive={false}>
            {Array.from({ length: guide.y.count }).map((_, i) => (
              <Box key={i} border="top" />
            ))}
          </Box>
        )}
        {charts.map(({ property: prop, ...chartRest }, i) => {
          if (Array.isArray(prop)) {
            // reverse to ensure area Charts are stacked in the right order
            return prop
              .map((_, j) => (
                <Chart
                  key={j}
                  values={chartValues[i][j]}
                  color={prop[j].color}
                  overflow
                  pad={pad}
                  size={size}
                  {...chartProps[i]}
                  {...chartRest}
                />
              ))
              .reverse();
          }
          return (
            <Chart
              key={i}
              values={chartValues[i]}
              overflow
              pad={pad}
              size={size}
              {...chartProps[i]}
              {...chartRest}
            />
          );
        })}
        {detail && (
          <>
            <Box
              ref={detailContainer}
              direction="row"
              fill
              justify="between"
              gap={`${data.length / 2 + 1}px`}
              responsive={false}
              onMouseOut={event => {
                const rect = detailContainer.current.getBoundingClientRect();
                if (
                  event.pageX < rect.left ||
                  event.pageX > rect.right ||
                  event.pageY < rect.top ||
                  event.pageY > rect.bottom
                )
                  setDetailIndex(undefined);
              }}
              onFocus={() => {}}
              onBlur={() => {}}
            >
              {data.map((_, i) => (
                <Box
                  key={i}
                  flex
                  align="center"
                  onMouseOver={() => setDetailIndex(i)}
                  onFocus={() => {}}
                  onBlur={() => {}}
                >
                  <Box
                    ref={c => {
                      detailRefs[i] = c;
                    }}
                    fill="vertical"
                    border={detailIndex === i ? true : undefined}
                  />
                </Box>
              ))}
            </Box>
            {detailIndex !== undefined && detailRefs[detailIndex] && (
              <Drop
                target={detailRefs[detailIndex]}
                align={
                  detailIndex > data.length / 2
                    ? { right: 'left' }
                    : { left: 'right' }
                }
                plain
              >
                <Box
                  pad="small"
                  background={{ color: 'background', opacity: 'strong' }}
                >
                  <Grid columns={['auto', 'auto']} gap="xsmall">
                    {Object.values(properties).map(prop => {
                      return (
                        <>
                          <Text size="small">
                            {prop.label || prop.property}
                          </Text>
                          <Text size="small" weight="bold">
                            {renderProperty(prop, detailIndex)}
                          </Text>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
              </Drop>
            )}
          </>
        )}
      </Stack>
    );

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
        ]}
        areas={[
          { name: 'yAxis', start: [0, 0], end: [0, 0] },
          { name: 'xAxis', start: [1, 1], end: [1, 1] },
          { name: 'charts', start: [1, 0], end: [1, 0] },
        ]}
        {...rest}
      >
        {xAxisElement}
        {yAxisElement}
        {stackElement}
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
