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
    direction: [
      PropTypes.oneOf(['row', 'column']),
      'The orientation to layout the child components in. Defaults to column.',
    ],
    justify: [
      PropTypes.oneOf(['start', 'center', 'between', 'end']),
      'How to align the contents along the main axis.',
    ],
    tag: [
      PropTypes.string,
      'The DOM tag to use for the element. Defaults to div.',
    ],
  },
});
