import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Drop) => {
  const DocumentedDrop = describe(Drop)
    .availableAt(getAvailableAtBadge('Drop'))
    .description(
      'A drop container that opens next to a target.'
    ).usage(
      'import { Drop } from \'grommet\';\n<Drop control={element}>...</Drop>'
    );

  DocumentedDrop.propTypes = {
    align: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    }).description(
      'How to align the drop with respect to the target element.'
    ).defaultValue({
      top: 'top',
      left: 'left',
    }),
    control: PropTypes.object.description(
      'Target container where the drop will be aligned.'
    ).isRequired,
    dir: PropTypes.oneOf(['rtl', 'ltr']).description(
      `Whether text should be rendered right to left or not. Defaults to
      inherit from the document context.`
    ),
    restrictFocus: PropTypes.bool.description(
      'Whether the drop should control focus.'
    ),
    onClose: PropTypes.func.description(
      'Function that will be invoked when the user clicks outside the drop area.'
    ),
    responsive: PropTypes.bool
      .description('Whether to dynamically re-place when resized.')
      .defaultValue(true),
    theme: PropTypes.object.description('Custom styles for Drop component.'),
  };

  return DocumentedDrop;
};
