"use strict";

exports.__esModule = true;
exports.TipPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: _propTypes["default"].node,
    dropProps: _propTypes["default"].object,
    plain: _propTypes["default"].bool,
    defaultVisible: _propTypes["default"].bool
  };
}
var TipPropTypes = exports.TipPropTypes = PropType;