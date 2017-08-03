import { schema, PropTypes } from 'react-desc';

export default Keyboard => schema(Keyboard, {
  description: 'A react component that handles keyboard key presses.',
  usage: `import { Keyboard } from 'grommet';
  <Keyboard onUp={() => {}} />`,
  props: {
    onBackspace: [
      PropTypes.func,
      'Function that will be called when the user presses the backspace key.',
    ],
    onComma: [
      PropTypes.func,
      'Function that will be called when the user presses the comma key.',
    ],
    onDown: [
      PropTypes.func,
      'Function that will be called when the user presses the down key.',
    ],
    onEnter: [
      PropTypes.func,
      'Function that will be called when the user presses the enter key.',
    ],
    onEsc: [
      PropTypes.func,
      'Function that will be called when the user presses the esc key.',
    ],
    onLeft: [
      PropTypes.func,
      'Function that will be called when the user presses the left key.',
    ],
    onRight: [
      PropTypes.func,
      'Function that will be called when the user presses the right key.',
    ],
    onShift: [
      PropTypes.func,
      'Function that will be called when the user presses the shift key.',
    ],
    onSpace: [
      PropTypes.func,
      'Function that will be called when the user presses the space key.',
    ],
    onTab: [
      PropTypes.func,
      'Function that will be called when the user presses the tab key.',
    ],
    onUp: [
      PropTypes.func,
      'Function that will be called when the user presses the up key.',
    ],
  },
});
