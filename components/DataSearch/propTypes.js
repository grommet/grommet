"use strict";

exports.__esModule = true;
exports.DataSearchPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool,
    responsive: _propTypes["default"].bool,
    updateOn: _propTypes["default"].oneOf(['change', 'submit'])
  };
}
var DataSearchPropTypes = exports.DataSearchPropTypes = PropType;