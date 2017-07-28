import { schema, PropTypes } from 'react-desc';

export default Box => schema(Box, {
  description: 'A box.',
  usage: `import { Box } from 'grommet';
  <Box/>`,
  props: {
    align: [
      PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
      'How to align the contents along the cross axis.',
    ],
    alignContent: [
      PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
      `How to align the contents when there is extra space in the cross axis.
      Defaults to stretch`,
    ],
    alignSelf: [
      PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
      'How to align within its container along the cross axis.',
    ],
    basis: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge',
        'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '3/4']),
      'A fixed or relative size along its container\'s main axis.',
    ],
    border: [
      PropTypes.oneOf(['top', 'left', 'bottom', 'right',
        'horizontal', 'vertical', 'all']),
      'Include a border.',
    ],
    direction: [
      PropTypes.oneOf(['row', 'column']),
      'The orientation to layout the child components in. Defaults to column.',
    ],
    justify: [
      PropTypes.oneOf(['start', 'center', 'between', 'end']),
      'How to align the contents along the main axis.',
    ],
    reverse: [
      PropTypes.bool,
      'Whether to reverse the order of the child components.',
    ],
    tag: [
      PropTypes.string,
      'The DOM tag to use for the element. Defaults to div.',
    ],
  },
});
