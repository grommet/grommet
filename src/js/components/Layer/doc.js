import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

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
  };

  return DocumentedLayer;
};
