"use strict";

exports.__esModule = true;
exports.DataFilterPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].shape({
      label: _propTypes["default"].string,
      value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool])
    })])),
    property: _propTypes["default"].string
  };
}
var DataFilterPropTypes = exports.DataFilterPropTypes = PropType;