import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge, padPropType } from '../../utils';

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
  property: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        color: colorType,
      }),
    ),
  ]),
  dash: PropTypes.bool,
  round: PropTypes.bool,
  thickness: thicknessType,
  type: PropTypes.oneOf(['bar', 'line', 'area', 'point']),
});

const propertyType = PropTypes.shape({
  bounds: PropTypes.arrayOf(PropTypes.number),
  color: colorType,
  label: PropTypes.oneOfType([PropTypes.string]),
  prefix: PropTypes.string,
  property: PropTypes.string,
  render: PropTypes.func,
  suffix: PropTypes.string,
});

const granularityType = PropTypes.oneOf(['coarse', 'medium', 'fine']);

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
<DataChart data={data} property={} />`,
    )
    .intrinsicElement('div');

  DocumentedDataChart.propTypes = {
    ...genericProps,
    axis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
        y: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
      }),
    ]).description('TBD'),
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)])
      .description(`How to visualize the data.
    'property' indicates which property of the data objects to use.
    When 'property' is an array, multiple properties are used for a
    stacked bar chart.`),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set'),
    detail: PropTypes.bool.description('TBD'),
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
        x: PropTypes.shape({
          granularity: granularityType,
        }),
        y: PropTypes.shape({
          granularity: granularityType,
        }),
      }),
    ]).description('TBD'),
    legend: PropTypes.bool.description('Whether to include a legend'),
    pad: padPropType.description(`Spacing around the outer edge of
    the drawing coordinate area for the graphic elements to overflow into.`),
    property: PropTypes.oneOfType([
      propertyType,
      PropTypes.arrayOf(propertyType),
    ]).description('TBD'),
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
