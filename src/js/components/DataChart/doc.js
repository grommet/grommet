import { describe, PropTypes } from 'react-desc';

import {
  genericProps,
  padPropType,
  pointPropType,
} from '../../utils/prop-types';

import { getAvailableAtBadge } from '../../utils/mixins';

const colorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
]);

const thicknessType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'hair',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    'none',
  ]),
  PropTypes.string,
]);

const chartType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    property: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            color: colorType,
          }),
        ]),
      ),
      PropTypes.shape({
        color: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            transform: PropTypes.func,
          }),
        ]),
        thickness: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            transform: PropTypes.func,
          }),
        ]),
        x: PropTypes.string,
        y: PropTypes.string,
      }),
    ]),
    color: colorType,
    dash: PropTypes.bool,
    opacity: PropTypes.oneOfType([
      PropTypes.oneOf(['weak', 'medium', 'strong']),
      PropTypes.number,
      PropTypes.bool,
    ]),
    point: pointPropType,
    round: PropTypes.bool,
    thickness: thicknessType,
    type: PropTypes.oneOf(['bar', 'bars', 'line', 'area', 'point']),
  }),
]);

const seriesType = PropTypes.oneOfType([
  PropTypes.string, // property
  PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string]),
    prefix: PropTypes.string,
    property: PropTypes.string,
    render: PropTypes.func,
    suffix: PropTypes.string,
  }),
]);

const granularityType = PropTypes.oneOf(['coarse', 'medium', 'fine']);

export const doc = DataChart => {
  const DocumentedDataChart = describe(DataChart)
    .availableAt(getAvailableAtBadge('DataChart', 'Visualizations'))
    .description(
      `Takes a data set and visualizes it. While Chart renders a
    single value across a data set. DataChart allows multiple overlayed
    Charts and adds guides and axes for decoration.`,
    )
    .usage(
      `import { DataChart } from 'grommet';
<DataChart data={data} property={} />`,
    )
    .intrinsicElement('div');

  DocumentedDataChart.propTypes = {
    ...genericProps,
    axis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
        y: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
      }),
    ])
      .description(
        `Whether to show an axis and how it should look.
      If 'x' or 'y' is a string, it indicates the property to use
      to determine the values to show.
      If axis or 'x' is true, DataChart will look for a property called 'date'
      or 'time' and automatically use that for the x-axis. If DataChart
      can't find a property to use, it will use the data index for the x-axis.
      If axis or 'y' is true, DataChart will use the first property in 'series'.
      'granularity' indicates how many values to show.
      'coarse' granularity shows two values, one at each end.
      'fine' granularity shows all x-axis values and 5 y-axis values.
      'medium' granularity picks something in between.`,
      )
      .defaultValue(true),
    bounds: PropTypes.oneOf(['align'])
      .description(
        `When set to 'align', indicates that the bounds of all series
      should be aligned. When not set, the bounds of each series
      property are based solely on the data found for that property.`,
      )
      .defaultValue('align'),
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)])
      .description(`How to visualize the data.
    'property' indicates which property of the data objects to use.
    When 'property' is an array, multiple properties are used for a
    stacked bar chart. If only a string is specified, that is the property
    to use and all other aspects are defaulted. If 'property' is an object,
    it specifies a map of properties to graphic aspects: x, y, color, thickness.
    If 'transform' is specified, it will be used to transform the data value
    before using it. For example, to convert a data value to a hex color
    string for the color.`),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set'),
    detail: PropTypes.bool.description(
      `Whether to add the ability to interact with the chart
      via mouse or keyboard to show details on specific values in the chart.
      It shows all properties specified in 'series', using any 'render'
      functions therein.`,
    ),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
    ]).description(`The spacing between the axes and the Charts.`),
    guide: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            granularity: granularityType,
          }),
        ]),
        y: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            granularity: granularityType,
          }),
        ]),
      }),
    ]).description(`Whether to put guidelines underneath the chart graphics.
    See the description of 'granularity' under 'axis'.`),
    legend: PropTypes.bool.description('Whether to include a legend'),
    pad: padPropType.description(`Spacing around the outer edge of
    the drawing coordinate area for the graphic elements to overflow into.`),
    series: PropTypes.oneOfType([seriesType, PropTypes.arrayOf(seriesType)])
      .description(`Describes which parts of the 'data' are of interest and
    how to handle them. 'property' indicates which property of the 'data'
    objects this series refers to. 'label' indicates how to label the series
    in a legend or hover details. 'prefix' and 'suffix' are applied to the
    data values shown in an axis, legend, or details. 'render' allows custom
    rendering of the data value. 'render' is called with:
    (value, datum, property) => { return < />; }`),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['fill']),
      PropTypes.shape({
        height: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
          ]),
          PropTypes.string,
        ]),
        width: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
            'auto',
          ]),
          PropTypes.string,
        ]),
      }),
    ]).description(
      `The size of the Charts. This does not include the axes
      and any gap. It is passed through to the underlying Chart.`,
    ),
  };

  return DocumentedDataChart;
};
