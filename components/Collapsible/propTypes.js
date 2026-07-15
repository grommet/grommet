"use strict";

exports.__esModule = true;
exports.CollapsiblePropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    open: _propTypes["default"].bool,
    direction: _propTypes["default"].oneOf(['horizontal', 'vertical'])
  };
}
var CollapsiblePropTypes = exports.CollapsiblePropTypes = PropType;