import { schema, PropTypes } from 'react-desc';

export default Drop => schema(Drop, {
  description: 'A drop container that opens next to a target.',
  usage: `import { Drop } from 'grommet';
  <Drop target={element}>...</Drop>`,
  props: {
    align: [
      PropTypes.shape({
        top: PropTypes.oneOf(['top', 'bottom']),
        bottom: PropTypes.oneOf(['top', 'bottom']),
        right: PropTypes.oneOf(['left', 'right']),
        left: PropTypes.oneOf(['left', 'right']),
      }),
      'How to align the drop with respect to the target element.', {
        defaultProp: {
          top: 'top',
          left: 'left',
        },
      },
    ],
    background: [
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          dark: PropTypes.bool,
          image: PropTypes.string,
        }),
      ]),
      `Either a color identifier to use for the background color. For example:
      'neutral-1'. Or, a 'url()' for an image.`,
    ],
    context: [
      PropTypes.object,
      'Object with the context variables to be passed to the Drop.',
    ],
    control: [
      PropTypes.object,
      'Target container where the drop will be aligned.', {
        required: true,
      },
    ],
    dir: [
      PropTypes.oneOf(['rtl', 'ltr']),
      `Whether text should be rendered right to left or not. Defaults to
      inherit from the document context.`,
    ],
    onClose: [
      PropTypes.func,
      'Function that will be invoked when the user clicks outside the drop area.',
    ],
    responsive: [
      PropTypes.bool,
      'Whether to dynamically re-place when resized.', {
        defaultProp: true,
      },
    ],
    theme: [
      PropTypes.object,
      'Custom styles for Drop component.',
    ],
  },
});
