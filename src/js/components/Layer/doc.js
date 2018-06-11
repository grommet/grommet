import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

const PAD_SIZES = ['xsmall', 'small', 'medium', 'large'];

export default (Layer) => {
  const DocumentedLayer = describe(Layer)
    .availableAt(getAvailableAtBadge('Layer'))
    .description(
      `A modal overlay. It is the caller's responsibility to provide a control for
      the user to close the layer.`
    ).usage(
      `import { Layer } from 'grommet';
<Layer />`
    );

  DocumentedLayer.propTypes = {
    full: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.oneOf(['vertical', 'horizontal']),
    ]).description(
      'Whether the width and/or height should fill the current viewport size.'
    ),
    margin: PropTypes.oneOfType([
      PropTypes.oneOf(['none', ...PAD_SIZES]),
      PropTypes.shape({
        bottom: PropTypes.oneOf(PAD_SIZES),
        horizontal: PropTypes.oneOf(PAD_SIZES),
        left: PropTypes.oneOf(PAD_SIZES),
        right: PropTypes.oneOf(PAD_SIZES),
        top: PropTypes.oneOf(PAD_SIZES),
        vertical: PropTypes.oneOf(PAD_SIZES),
      }),
    ]).description(
      `The amount of margin around the Layer. An object can be specified to
distinguish horizontal margin, vertical margin, and margin on a
particular side of the layer`
    ),
    modal: PropTypes.bool.description(
      'Whether there should be an overlay preventing interaction underneath the layer.'
    ).defaultValue(true),
    onClickOutside: PropTypes.bool.description(
      'Function that will be invoked when the user clicks outside the layer.'
    ),
    onEsc: PropTypes.func.description(
      'Function that will be called when the user presses the escape key inside the layer.'
    ),
    plain: PropTypes.bool.description(
      'Whether this is a plain Layer with no background color or border.'
    ),
    position: PropTypes.oneOf(['bottom', 'center', 'hidden', 'left', 'right', 'top']).description(
      'Position of the layer content.'
    ).defaultValue('center'),
    responsive: PropTypes.bool.description(
      'Whether the layer should take full width and height on mobile'
    ).defaultValue(true),
  };

  return DocumentedLayer;
};
