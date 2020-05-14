import { describe, PropTypes } from 'react-desc';

import {
  genericProps,
  getAvailableAtBadge,
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
      `Takes a data set and visualizes it. Chart renders a
    single value across a data set. DataChart allows multiple Charts and adds
    guides and axes for decoration.`,
    )
    .usage(
      `import { DataChart } from 'grommet';
<DataChart data={data} chart={} />`,
    )
    .intrinsicElement('div');

  DocumentedDataChart.propTypes = {
    ...genericProps,
    chart: PropTypes.oneOfType([
      chartType,
      PropTypes.arrayOf(chartType),
    ]).description('how to visualize the data'),
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
    ]).description(`The amount of spacing between data points. This
    is only used when the size specifies width as 'auto'.`),
    steps: PropTypes.arrayOf(PropTypes.number).description(
      'how many steps in the x and y axis',
    ),
    thickness: thicknessType.description('Default thickness across charts.'),
    xAxis: PropTypes.shape({
      guide: PropTypes.bool,
      key: PropTypes.string,
      render: PropTypes.func, // (dataIndex, axisIndex) => element
    }).description('x-axis configuration'),
    yAxis: PropTypes.shape({
      guide: PropTypes.bool,
      render: PropTypes.func, // (value, axisIndex) => element
    }).description('y-axis configuration'),
  };

  return DocumentedDataChart;
};

// export const themeDoc = {
// };
