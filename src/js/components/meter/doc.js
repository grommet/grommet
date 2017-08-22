import { schema, PropTypes } from 'react-desc';

export default Meter => schema(Meter, {
  description: 'A graphical meter.',
  usage: `import { Meter } from 'grommet';
  <Meter/>`,
  props: {
    background: [
      PropTypes.string,
      `A color identifier to use for the background color. For example:
      'light-1'.`,
    ],
    cap: [
      PropTypes.oneOf(['round', 'square']),
      'The end of line cap. Defaults to square.',
    ],
    size: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      'The size of the Meter. Defaults to medium.',
    ],
    thickness: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      'The size of the Meter. Defaults to medium.',
    ],
    type: [
      PropTypes.oneOf(['bar', 'circle']),
      'The visual type of meter.',
    ],
    values: [
      PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string.isRequired, // for a11y
        onClick: PropTypes.func,
        value: PropTypes.number.isRequired,
      })),
      'Values to visualize',
    ],
  },
});
