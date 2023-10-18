"use strict";

exports.__esModule = true;
exports.DataSortPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool
  };
}
var DataSortPropTypes = exports.DataSortPropTypes = PropType;