import { schema, PropTypes } from 'react-desc';

export default Layer => schema(Layer, {
  description: `A modal overlay. It is the caller's responsibility to provide a control for
  the user to close the layer.`,
  usage: `import { Layer } from 'grommet';
  <Layer/>`,
  props: {
    align: [
      PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
      'Which direction the layer contents should emanate from.', {
        defaultProp: 'center',
      },
    ],
    context: [
      PropTypes.object,
      'Object with the context variables to be passed to the Layer.',
    ],
    onEsc: [
      PropTypes.func,
      'Function that will be called when the user presses the escape key inside the Layer.',
    ],
    size: [
      PropTypes.oneOf(
        [
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'xxlarge',
          'full',
        ]
      ),
      'Optional size for the Layer.',
    ],
  },
});
