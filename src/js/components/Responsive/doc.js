import { schema, PropTypes } from 'react-desc';

export default Responsive => schema(Responsive, {
  description: 'A react component that handles responsive breakpoints.',
  usage: `import { Responsive } from 'grommet';
  <Responsive onNarrow={() => {}} />`,
  props: {
    onNarrow: [
      PropTypes.func,
      'Function that will be called when the browser window crosses the narrow width.',
    ],
  },
});
