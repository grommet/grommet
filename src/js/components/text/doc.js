import { schema, PropTypes } from 'react-desc';

export default Text => schema(Text, {
  description: 'Arbitrary text.',
  usage: `import { Text } from 'grommet';
  <Text/>`,
  props: {
    margin: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', 'small', 'medium', 'large']),
        PropTypes.shape({
          bottom: PropTypes.oneOf(['small', 'medium', 'large']),
          top: PropTypes.oneOf(['small', 'medium', 'large']),
        }),
      ]),
      `The amount of margin above and/or below the heading. An object can be
      specified to distinguish top margin and bottom margin.`,
    ],
    size: [
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      `The font size is primarily driven by the chosen tag. But, it can
      be adjusted via this size property. The tag should be set for semantic
      correctness and accessibility. This size property allows for stylistic
      adjustments.`,
    ],
    tag: [
      PropTypes.string,
      'The DOM tag to use for the element. Defaults to span.',
    ],
    textAlign: [
      PropTypes.oneOf(['start', 'center', 'end']),
      'How to align the text inside the heading.',
    ],
    truncate: [
      PropTypes.bool,
      `Restrict the text to a single line and truncate with ellipsis if it
      is too long to all fit. Defaults to false.`,
    ],
  },
});
