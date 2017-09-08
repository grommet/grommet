import { schema, PropTypes } from 'react-desc';

export default Image => schema(Image, {
  description: 'An image.',
  usage: `import { Image } from 'grommet';
  <Image/>`,
  props: {
    fit: [
      PropTypes.oneOf(['cover', 'contain']),
      'How the image fills its container.',
    ],
  },
});
