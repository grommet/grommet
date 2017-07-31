import { schema, PropTypes } from 'react-desc';

export default Box => schema(Box, {
  description: 'A box.',
  usage: `import { Box } from 'grommet';
  <Box/>`,
  props: {
    // a11yTitle - removed
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
    // appCentered - removed
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
    // colorIndex - TODO
    direction: [
      PropTypes.oneOf(['row', 'column']),
      'The orientation to layout the child components in. Defaults to column.',
    ],
    // focusable - removed
    flex: [
      PropTypes.oneOf(['grow', 'shrink', true, false]),
      'Whether flex-grow and/or flex-shrink is true.',
    ],
    // full - removed
    justify: [
      PropTypes.oneOf(['start', 'center', 'between', 'end']),
      'How to align the contents along the main axis.',
    ],
    // onClick - removed
    margin: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', 'small', 'medium', 'large']),
        PropTypes.shape({
          bottom: PropTypes.oneOf(['small', 'medium', 'large']),
          horizontal: PropTypes.oneOf(['small', 'medium', 'large']),
          left: PropTypes.oneOf(['small', 'medium', 'large']),
          right: PropTypes.oneOf(['small', 'medium', 'large']),
          top: PropTypes.oneOf(['small', 'medium', 'large']),
          vertical: PropTypes.oneOf(['small', 'medium', 'large']),
        }),
      ]),
      `The amount of margin around the box. An object can be specified to
      distinguish horizontal margin, vertical margin, and margin on a
      particular side of the box`,
    ],
    pad: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', 'small', 'medium', 'large']),
        PropTypes.shape({
          bottom: PropTypes.oneOf(['small', 'medium', 'large']),
          horizontal: PropTypes.oneOf(['small', 'medium', 'large']),
          left: PropTypes.oneOf(['small', 'medium', 'large']),
          right: PropTypes.oneOf(['small', 'medium', 'large']),
          top: PropTypes.oneOf(['small', 'medium', 'large']),
          vertical: PropTypes.oneOf(['small', 'medium', 'large']),
        }),
      ]),
      `The amount of padding around the box contents. An object can be specified to
      distinguish horizontal padding, vertical padding, and padding on a
      particular side of the box`,
    ],
    // responsive: [
    //   PropTypes.bool,
    //   `Whether children laid out in a row direction should be switched
    //   to a column layout when the display area narrows. Defaults to true.`,
    // ],
    reverse: [
      PropTypes.bool,
      'Whether to reverse the order of the child components.',
    ],
    // separator - moved to border
    // size - removed, use basis
    tag: [
      PropTypes.string,
      'The DOM tag to use for the element. Defaults to div.',
    ],
    textAlign: [
      PropTypes.oneOf(['start', 'center', 'end']),
      'How to align the text inside the box.',
    ],
    // texture - TODO
    wrap: [
      PropTypes.bool,
      'Whether children can wrap if they can\'t all fit. Defaults to false.',
    ],
  },
});
