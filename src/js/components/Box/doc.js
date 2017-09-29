import { schema, PropTypes } from 'react-desc';

const PAD_SIZES = ['xsmall', 'small', 'medium', 'large'];

export default Box => schema(Box, {
  description: `A flexible box that lays out its contents along a single
    direction.`,
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
      `How to align along the cross axis when contained in a Box or along
      the column axis when contained in a Grid.`,
    ],
    background: [
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          color: PropTypes.string,
          dark: PropTypes.bool,
          image: PropTypes.string,
          opacity: PropTypes.oneOfType([
            PropTypes.oneOf(['weak', 'medium', 'strong']),
            PropTypes.bool,
          ]),
        }),
      ]),
      `Either a color identifier to use for the background color. For example:
      'neutral-1'. Or, a 'url()' for an image. Dark is not needed if color is provided.`,
    ],
    basis: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge',
        'full', '1/2', '1/3', '2/3', '1/4', '3/4']),
      'A fixed or relative size along its container\'s main axis.',
    ],
    border: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['top', 'left', 'bottom', 'right',
          'horizontal', 'vertical', 'all']),
        PropTypes.shape({
          color: PropTypes.string,
          side: PropTypes.oneOf(['top', 'left', 'bottom', 'right',
            'horizontal', 'vertical', 'all']),
          size: PropTypes.oneOf(['small', 'medium', 'large']),
        }),
      ]),
      'Include a border.',
    ],
    direction: [
      PropTypes.oneOf(['row', 'column']),
      'The orientation to layout the child components in. Defaults to column.',
    ],
    flex: [
      PropTypes.oneOf(['grow', 'shrink', true, false]),
      'Whether flex-grow and/or flex-shrink is true.',
    ],
    full: [
      PropTypes.oneOf(['horizontal', 'vertical', true, false, 'grow']),
      'Whether the width and/or height should take the full viewport size.',
    ],
    gridArea: [
      PropTypes.string,
      'The name of the area to place this Box in inside a parent Grid.',
    ],
    justify: [
      PropTypes.oneOf(['start', 'center', 'between', 'end']),
      'How to align the contents along the main axis.',
    ],
    justifySelf: [
      PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
      'How to align along the row axis when contained in a Grid.',
    ],
    margin: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', ...PAD_SIZES]),
        PropTypes.shape({
          bottom: PropTypes.oneOf(PAD_SIZES),
          horizontal: PropTypes.oneOf(PAD_SIZES),
          left: PropTypes.oneOf(PAD_SIZES),
          right: PropTypes.oneOf(PAD_SIZES),
          top: PropTypes.oneOf(PAD_SIZES),
          vertical: PropTypes.oneOf(PAD_SIZES),
        }),
      ]),
      `The amount of margin around the box. An object can be specified to
      distinguish horizontal margin, vertical margin, and margin on a
      particular side of the box`,
    ],
    pad: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', ...PAD_SIZES]),
        PropTypes.shape({
          bottom: PropTypes.oneOf(PAD_SIZES),
          horizontal: PropTypes.oneOf(PAD_SIZES),
          left: PropTypes.oneOf(PAD_SIZES),
          right: PropTypes.oneOf(PAD_SIZES),
          top: PropTypes.oneOf(PAD_SIZES),
          vertical: PropTypes.oneOf(PAD_SIZES),
        }),
      ]),
      `The amount of padding around the box contents. An object can be specified to
      distinguish horizontal padding, vertical padding, and padding on a
      particular side of the box`,
    ],
    responsive: [
      PropTypes.bool,
      `Whether children laid out in a row direction should be switched to a
      column layout when the display area narrows.`,
    ],
    reverse: [
      PropTypes.bool,
      'Whether to reverse the order of the child components.',
    ],
    round: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'full']),
      'How much to round the corners.',
    ],
    tag: [
      PropTypes.string,
      'The DOM tag to use for the element. Defaults to div.',
    ],
    textAlign: [
      PropTypes.oneOf(['start', 'center', 'end']),
      'How to align the text inside the box.',
    ],
    wrap: [
      PropTypes.bool,
      'Whether children can wrap if they can\'t all fit. Defaults to false.',
    ],
  },
});
