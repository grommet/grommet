import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];
export var doc = function doc(Layer) {
  var DocumentedLayer = describe(Layer).availableAt(getAvailableAtBadge('Layer')).description("A modal overlay. It is the caller's responsibility to provide a control for\n      the user to close the layer.").usage("import { Layer } from 'grommet';\n<Layer />");
  DocumentedLayer.propTypes = {
    full: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['vertical', 'horizontal'])]).description('Whether the width and/or height should fill the current viewport size.').defaultValue(false),
    margin: PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(PAD_SIZES)), PropTypes.shape({
      bottom: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      horizontal: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string])
    }), PropTypes.string]).description("The amount of margin around the Layer. An object can be specified to\ndistinguish horizontal margin, vertical margin, and margin on a\nparticular side of the layer"),
    modal: PropTypes.bool.description('Whether there should be an overlay preventing interaction underneath the layer.').defaultValue(true),
    onClickOutside: PropTypes.func.description('Function that will be invoked when the user clicks outside the layer.'),
    onEsc: PropTypes.func.description('Function that will be called when the user presses the escape key inside the layer.'),
    plain: PropTypes.bool.description('Whether this is a plain Layer with no background color or border.').defaultValue(false),
    position: PropTypes.oneOf(['bottom', 'center', 'hidden', 'left', 'right', 'top']).description('Position of the layer content.').defaultValue('center'),
    responsive: PropTypes.bool.description('Whether the layer should take full width and height on mobile').defaultValue(true)
  };
  return DocumentedLayer;
};