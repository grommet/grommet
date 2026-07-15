"use strict";

exports.__esModule = true;
exports.DataSummaryPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    messages: _propTypes["default"].shape({
      filtered: _propTypes["default"].string,
      filteredSingle: _propTypes["default"].string,
      items: _propTypes["default"].string,
      itemsSingle: _propTypes["default"].string,
      selected: _propTypes["default"].string,
      total: _propTypes["default"].string,
      totalSingle: _propTypes["default"].string
    })
  };
}
var DataSummaryPropTypes = exports.DataSummaryPropTypes = PropType;