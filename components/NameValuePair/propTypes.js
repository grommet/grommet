"use strict";

exports.__esModule = true;
exports.NameValuePairType = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object, _propTypes["default"].node, _propTypes["default"].string, _propTypes["default"].number]),
    name: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
  };
}
var NameValuePairType = exports.NameValuePairType = PropType;