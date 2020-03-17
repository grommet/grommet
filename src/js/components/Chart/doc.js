import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Chart => {
  const DocumentedChart = describe(Chart)
    .availableAt(getAvailableAtBadge('Chart'))
    .description('A graphical chart.')
    .usage("import { Chart } from 'grommet';\n<Chart />");
  // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedChart.propTypes = {
    ...genericProps,
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).description(
      `The limits for the values, specified as a two dimensional array.
      If not specified, the bounds will automatically be set to fit
      the provided values.`,
    ),
    color: PropTypes.oneOfType([
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
    ])
      .description(
        `A color identifier to use for the graphic color. If an
      array is specified, it is used to create a gradient mask. Array objects
      indicate what color to show at what value. In the simplest case, the
      values should map to the Y bounds values, resulting in a vertical
      gradient. Specifying more objects allows more fine grained control over
      where the gradient colors change.`,
      )
      .defaultValue('accent-1'),
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
    id: PropTypes.string.description(`A unique identifier for the Chart. This
      is required if more than one Chart is shown and they use color
      gradients.`),
    dash: PropTypes.bool
      .description(`Whether to use dashed lines for line or bar charts.`)
      .defaultValue(false),
    onClick: PropTypes.func.description(`Called when the user clicks on the
     visualization. Clicking on individual bars or points are handled via
     values[].onClick for those types of charts.`),
    onHover: PropTypes.func.description(`Called with a boolean argument
      indicating when the user hovers onto or away from it.
      This is only available when the type is line or area.`),
    overflow: PropTypes.bool
      .description(
        `Whether the chart strokes should overflow the component. Set this
      to true for precise positioning when stacking charts or including
      precise axes. Set this to false to have the graphical elements
      align with the component boundaries.`,
      )
      .defaultValue(false),
    round: PropTypes.bool
      .description('Whether to round the line ends.')
      .defaultValue(false),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'full',
      ]),
      PropTypes.shape({
        height: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'full',
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
            'full',
            'auto',
          ]),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ])
      .description('The size of the Chart.')
      .defaultValue({ width: 'medium', height: 'small' }),
    thickness: PropTypes.oneOfType([
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
    ])
      .description('The width of the stroke.')
      .defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'line', 'area', 'point'])
      .description('The visual type of chart.')
      .defaultValue('bar'),
    values: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.shape({
          label: PropTypes.string, // for accessibility of bars
          onClick: PropTypes.func,
          onHover: PropTypes.func,
          value: PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.arrayOf(PropTypes.number).isRequired,
          ]).isRequired,
        }),
      ]),
    ).description(
      `Array of value objects describing the data.
      'value' is a tuple indicating the coordinate of the value or a triple
      indicating the x coordinate and a range of two y coordinates.
      'label' is a text string describing it.
      'onHover' and 'onClick' only work when type='bar'.`,
    ).isRequired,
  };

  return DocumentedChart;
};

export const docCalcs = calcs => {
  const DocumentedCalcs = describe(calcs)
    .description(
      `
      A function to help calculate values for bounds and axis. Use it via:
      const data = calcs(<myValues>, { coarseness: 5, steps: [1, 1] });
      where 'data' will contain 'bounds' and 'axis' properties.
    `,
    )
    .usage(
      `import { calcs } from 'grommet';
const data = calcs(<values>, { coarseness: 5, steps: [1, 1] });`,
    );

  return DocumentedCalcs;
};

export const themeDoc = {
  'chart.color': {
    description: 'Color of the Chart.',
    type: 'string | {dark: string, light: string}',
    defaultValue: 'accent-1',
  },
  'chart.extend': {
    description: 'Any additional style for the Chart.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: `{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      ...
    }`,
  },
  'global.edgeSize': {
    description: 'The possible sizes for the thickness in the Chart.',
    type: 'object',
    defaultValue: `{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }`,
  },
  'global.opacity': {
    description: 'The opacity of the Chart stroke.',
    type: 'object',
    defaultValue: `{
      strong: 0.8,
      medium: 0.4,
      weak: 0.1,
    }`,
  },
  'global.size': {
    description: 'The possible sizes for Chart width and height.',
    type: 'object',
    defaultValue: `{
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
      }`,
  },
};
