import { schema, PropTypes } from 'react-desc';

export default Chart => schema(Chart, {
  description: 'A graphical chart.',
  usage: `import { Chart } from 'grommet';
  <Chart/>`,
  props: {
    bounds: [
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      `The limits for the values, specified as a two dimensional array.
      If not specified, the bounds will automatically be set to fit
      the provided values.`,
    ],
    color: [
      PropTypes.string,
      `A color identifier to use for the graphic color. Defaults to
      'accent-1'.`,
    ],
    round: [
      PropTypes.bool,
      'Whether to round the line ends',
    ],
    size: [
      PropTypes.oneOfType([
        PropTypes.oneOf(
          ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
        PropTypes.shape({
          height: PropTypes.oneOf(
            ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
          width: PropTypes.oneOf(
            ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
        }),
      ]),
      'The size of the Chart. Defaults to { width: "medium", height: "small" }.',
    ],
    thickness: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      'The width of the stroke. Defaults to medium.',
    ],
    title: [
      PropTypes.string.isRequired,
      'Accessible title of the chart.',
    ],
    type: [
      PropTypes.oneOf(['bar', 'line', 'area']),
      'The visual type of meter. The default is bar',
    ],
    values: [
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string, // for accessibility of bars
        value: PropTypes.arrayOf(PropTypes.number).isRequired,
      })),
      `Array of value objects describing the data.
      'value' is a tuple indicating the coordinate of the value or a triple
      indicating the x coordinate and a range of two y coordinates.
      'label' is a text string describing it.`,
    ],
  },
});
