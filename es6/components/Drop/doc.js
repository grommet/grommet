import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Drop) {
  var DocumentedDrop = describe(Drop).availableAt(getAvailableAtBadge('Drop')).description('A drop container that opens next to a target.').usage("import { Drop } from 'grommet';\n<Drop target={reference}>...</Drop>");
  DocumentedDrop.propTypes = {
    align: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }).description("How to align the drop with respect to the target element. Not specifying\n      a vertical or horizontal alignment will cause it to be aligned in the\n      center.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    onClickOutside: PropTypes.func.description('Function that will be invoked when the user clicks outside the drop.'),
    onEsc: PropTypes.func.description('Function that will be called when the user presses the escape key inside the drop.'),
    responsive: PropTypes.bool.description('Whether to dynamically re-place when resized.').defaultValue(true),
    restrictFocus: PropTypes.bool.description('Whether the drop should control focus.').defaultValue(false),
    stretch: PropTypes.bool.description("Whether the drop element should be stretched to at least match the\n      width of the target element. The default is true because\n      that is what most uses of Drop want, like Select and Menu.").defaultValue(true),
    target: PropTypes.object.description('Target where the drop will be aligned to. This should be a React reference.').isRequired
  };
  return DocumentedDrop;
};