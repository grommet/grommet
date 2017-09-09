import { schema, PropTypes } from 'react-desc';

export default Grommet => schema(Grommet, {
  description: 'This is the top level Grommet container.',
  usage: `import { Grommet } from 'grommet';
  <Grommet>...</Grommet>`,
  props: {
    dir: [
      PropTypes.oneOf(['rtl', 'ltr']),
      `Whether text should be rendered right to left or not. Defaults to
      inherit from the document context.`,
    ],
    theme: [
      PropTypes.object,
      'Custom styles for Grommet app component.',
    ],
  },
});
