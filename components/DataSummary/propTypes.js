"use strict";

exports.__esModule = true;
exports.DataSummaryPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: _propTypes["default"].shape({
      filtered: _propTypes["default"].string,
      total: _propTypes["default"].string
    })
  };
}
var DataSummaryPropTypes = PropType;
exports.DataSummaryPropTypes = DataSummaryPropTypes;