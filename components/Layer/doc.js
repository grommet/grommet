"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];

var doc = function doc(Layer) {
  var DocumentedLayer = (0, _reactDesc.describe)(Layer).availableAt((0, _utils.getAvailableAtBadge)('Layer')).description("A modal overlay. It is the caller's responsibility to provide a control for\n      the user to close the layer.").usage("import { Layer } from 'grommet';\n<Layer />");
  DocumentedLayer.propTypes = {
    full: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['vertical', 'horizontal'])]).description('Whether the width and/or height should fill the current viewport size.').defaultValue(false),
    margin: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(PAD_SIZES)), _reactDesc.PropTypes.shape({
      bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description("The amount of margin around the Layer. An object can be specified to\ndistinguish horizontal margin, vertical margin, and margin on a\nparticular side of the layer"),
    modal: _reactDesc.PropTypes.bool.description('Whether there should be an overlay preventing interaction underneath the layer.').defaultValue(true),
    onClickOutside: _reactDesc.PropTypes.func.description('Function that will be invoked when the user clicks outside the layer.'),
    onEsc: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the escape key inside the layer.'),
    plain: _reactDesc.PropTypes.bool.description('Whether this is a plain Layer with no background color or border.').defaultValue(false),
    position: _reactDesc.PropTypes.oneOf(['bottom', 'center', 'hidden', 'left', 'right', 'top']).description('Position of the layer content.').defaultValue('center'),
    responsive: _reactDesc.PropTypes.bool.description('Whether the layer should take full width and height on mobile').defaultValue(true)
  };
  return DocumentedLayer;
};

exports.doc = doc;