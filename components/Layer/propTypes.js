"use strict";

exports.__esModule = true;
exports.LayerPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    animate: _propTypes["default"].bool,
    animation: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['slide', 'fadeIn', 'none']), _propTypes["default"].bool]),
    background: _generalPropTypes.backgroundDoc,
    full: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['vertical', 'horizontal'])]),
    margin: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none'].concat(PAD_SIZES)), _propTypes["default"].shape({
      bottom: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      end: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      horizontal: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      left: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      right: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      start: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      top: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
      vertical: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string])
    }), _propTypes["default"].string]),
    modal: _propTypes["default"].bool,
    onClickOutside: _propTypes["default"].func,
    onEsc: _propTypes["default"].func,
    plain: _propTypes["default"].bool,
    position: _propTypes["default"].oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right']),
    responsive: _propTypes["default"].bool,
    target: _propTypes["default"].object
  };
}

var LayerPropTypes = PropType;
exports.LayerPropTypes = LayerPropTypes;