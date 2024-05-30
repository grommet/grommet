"use strict";

exports.__esModule = true;
exports.DataFiltersPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    clearFilters: _propTypes["default"].bool,
    drop: _propTypes["default"].bool,
    heading: _propTypes["default"].string,
    layer: _propTypes["default"].bool,
    updateOn: _propTypes["default"].oneOf(['change', 'submit'])
  };
}
var DataFiltersPropTypes = exports.DataFiltersPropTypes = PropType;