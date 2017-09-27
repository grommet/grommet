import { schema, PropTypes } from 'react-desc';

export default Stack => schema(Stack, {
  description: 'Stacks components on top of the first child component.',
  usage: `import { Stack } from 'grommet';
  <Stack/>`,
  props: {
    anchor: [
      PropTypes.oneOf(['center', 'left', 'right', 'top', 'bottom',
        'top-left', 'bottom-left', 'top-right', 'bottom-right']),
      `Where to anchor children from. If not specified, children fill the
      first child's area.`,
    ],
  },
});
