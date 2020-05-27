import { describe, PropTypes } from 'react-desc';

import {
  genericProps,
  getAvailableAtBadge,
  padPropType,
  // themeDocUtils,
} from '../../utils';

const colorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.oneOfType([
      PropTypes.oneOf(['weak', 'medium', 'strong']),
      PropTypes.bool,
    ]),
  }),
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

const chartType = PropTypes.shape({
  key: PropTypes.string,
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      color: colorType,
    }),
  ),
  a11yTitle: PropTypes.string,
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  color: colorType,
  dash: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  overflow: PropTypes.bool,
  round: PropTypes.bool,
  thickness: thicknessType,
  type: PropTypes.oneOf(['bar', 'line', 'area', 'point']),
});

export const doc = DataChart => {
  const DocumentedDataChart = describe(DataChart)
    .availableAt(getAvailableAtBadge('DataChart'))
    .description(
      `Takes a data set and visualizes it. While Chart renders a
    single value across a data set. DataChart allows multiple overlayed
    Charts and adds guides and axes for decoration.`,
    )
    .usage(
      `import { DataChart } from 'grommet';
<DataChart data={data} chart={} />`,
    )
    .intrinsicElement('div');

  DocumentedDataChart.propTypes = {
    ...genericProps,
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)])
      .description(`Chart properties indicating how to visualize the data.
    'key' indicates which property of the data objects to use. 'keys' indicates
    that multiple properties should be used for a stacked bar chart. DataChart
    uses the key/keys to build the right 'values' for the underlying Chart.
    All of the other properties in 'chart' are passed through to the Chart.`),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set'),
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
    pad: padPropType,
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
    ])
      .description(
        `The size of the Charts. This does not include the axes
      and any gap. It is passed through to the underlying Chart.`,
      )
      .defaultValue({ width: 'medium', height: 'small' }),
    thickness: thicknessType.description(`Chart thickness given to all
    Charts if not specified per Chart in 'chart'.`),
    xAxis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        guide: PropTypes.bool,
        key: PropTypes.string,
        labels: PropTypes.number, // default undefined, all data points
        render: PropTypes.func, // (dataIndex, axisIndex) => element
      }),
    ]).description(`x-axis configuration. 'guide' specifies that vertical
    guide lines should be drawn under the Chart, one per label.
    'key' specifies what property in the 'data' should be used as
    any label content. 'labels' specifies how many labels to show.
    'render' allows for custom rendering of the labels. It will be
    called with the current data index and axis index and should return
    the element to render: (dataIndex, axisIndex) => element.`),
    yAxis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        guide: PropTypes.bool,
        labels: PropTypes.number, // default 2, top and bottom
        render: PropTypes.func, // (value, axisIndex) => element
      }),
    ]).description(`y-axis configuration. 'guide' specifies that horizontal
    guide lines should be drawn under the Chart, one per label.
    'labels' specifies how many labels to show.
    'render' allows for custom rendering of the labels. It will be
    called with the value and axis index and should return
    the element to render: (value, axisIndex) => element`),
  };

  return DocumentedDataChart;
};

// export const themeDoc = {
// };
