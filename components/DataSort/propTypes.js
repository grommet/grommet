"use strict";

exports.__esModule = true;
exports.DataSortPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool
  };
}
var DataSortPropTypes = exports.DataSortPropTypes = PropType;