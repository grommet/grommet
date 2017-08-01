import { schema, PropTypes } from 'react-desc';

export default Paragraph => schema(Paragraph, {
  description: 'A box.',
  usage: `import { Paragraph } from 'grommet';
  <Paragraph/>`,
  props: {
    margin: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['none', 'small', 'medium', 'large']),
        PropTypes.shape({
          bottom: PropTypes.oneOf(['small', 'medium', 'large']),
          top: PropTypes.oneOf(['small', 'medium', 'large']),
        }),
      ]),
      `The amount of margin above and/or below the paragraph. An object can be
      specified to distinguish top margin and bottom margin.`,
    ],
    size: [
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      'The size of the Paragraph text. Defaults to medium.',
    ],
    textAlign: [
      PropTypes.oneOf(['start', 'center', 'end']),
      'How to align the text inside the paragraph.',
    ],
  },
});
