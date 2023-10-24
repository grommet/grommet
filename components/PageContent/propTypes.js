"use strict";

exports.__esModule = true;
exports.PageContentPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      dark: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
      image: _propTypes["default"].string,
      position: _propTypes["default"].string,
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool, _propTypes["default"].number, _propTypes["default"].oneOf(['weak', 'medium', 'strong'])]),
      repeat: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['no-repeat', 'repeat']), _propTypes["default"].string]),
      size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['cover', 'contain']), _propTypes["default"].string]),
      light: _propTypes["default"].string,
      fill: _propTypes["default"].oneOf(['horizontal'])
    })])
  };
}
var PageContentPropTypes = exports.PageContentPropTypes = PropType;