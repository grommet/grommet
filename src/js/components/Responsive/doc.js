import { schema, PropTypes } from 'react-desc';

export default Responsive => schema(Responsive, {
  description: 'A react component that handles responsive breakpoints.',
  usage: `import { Responsive } from 'grommet';
  <Responsive onChange={() => {}} />`,
  props: {
    onChange: [
      PropTypes.func,
      `Function that will be called when the browser window crosses a responsive
      breakpoint. It will be passed the current media size name, either
      'narrow' or 'wide'`,
    ],
  },
});
