import { describe, PropTypes } from 'react-desc';

export default (Layer) => {
  const DocumentedLayer = describe(Layer).description(
    `A modal overlay. It is the caller's responsibility to provide a control for
    the user to close the layer.`
  ).usage(
    `import { Layer } from 'grommet';
    <Layer/>`
  );

  DocumentedLayer.propTypes = {
    align: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']).description(
      'Which direction the layer contents should emanate from.'
    ).defaultProp('center'),
    onEsc: PropTypes.func.description(
      'Function that will be called when the user presses the escape key inside the Layer.'
    ),
    size: PropTypes.oneOf(
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
    ).description(
      'Size for the Layer.'
    ),
  };

  return DocumentedLayer;
};
