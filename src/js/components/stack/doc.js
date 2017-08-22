import { schema, PropTypes } from 'react-desc';

export default Stack => schema(Stack, {
  description: 'Stacks components on top of the first child component.',
  usage: `import { Stack } from 'grommet';
  <Stack/>`,
  props: {
    none: [PropTypes.any, 'not needed'],
  },
});
