import { schema, PropTypes } from 'react-desc';

export default Layer => schema(Layer, {
  description: 'A modal overlay.',
  usage: `import { Layer } from 'grommet';
  <Layer/>`,
  props: {
    align: [
      PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
      'Which direction the layer contents should emanate from.', {
        defaultProp: 'center',
      },
    ],
    closer: [
      PropTypes.node,
      `The node to be used as the close control.
      If provided, it is the caller's responsibility to listen to events from the node`,
    ],
    messages: [
      PropTypes.object,
      'Messages to be replaced for Layer.',
    ],
    onClose: [
      PropTypes.func,
      `Function that will be called when the user requests the Layer to close.
      This function will only be invoked if closer prop is undefined,
      or if the user pressed escape key.`,
    ],
  },
});
