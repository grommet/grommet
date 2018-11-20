"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Drop) {
  var DocumentedDrop = (0, _reactDesc.describe)(Drop).availableAt((0, _utils.getAvailableAtBadge)('Drop')).description('A drop container that opens next to a target.').usage("import { Drop } from 'grommet';\n<Drop target={reference}>...</Drop>");
  DocumentedDrop.propTypes = {
    align: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      bottom: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      right: _reactDesc.PropTypes.oneOf(['left', 'right']),
      left: _reactDesc.PropTypes.oneOf(['left', 'right'])
    }).description("How to align the drop with respect to the target element. Not specifying\n      a vertical or horizontal alignment will cause it to be aligned in the\n      center.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    onClickOutside: _reactDesc.PropTypes.func.description('Function that will be invoked when the user clicks outside the drop.'),
    onEsc: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the escape key inside the drop.'),
    responsive: _reactDesc.PropTypes.bool.description('Whether to dynamically re-place when resized.').defaultValue(true),
    restrictFocus: _reactDesc.PropTypes.bool.description('Whether the drop should control focus.').defaultValue(false),
    stretch: _reactDesc.PropTypes.bool.description("Whether the drop element should be stretched to at least match the\n      width of the target element. The default is true because\n      that is what most uses of Drop want, like Select and Menu.").defaultValue(true),
    target: _reactDesc.PropTypes.object.description('Target where the drop will be aligned to. This should be a React reference.').isRequired
  };
  return DocumentedDrop;
};

exports.doc = doc;