"use strict";

exports.__esModule = true;
exports.DataTableColumnsPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool.isRequired,
    options: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].arrayOf(_propTypes["default"].shape({
      label: _propTypes["default"].string,
      property: _propTypes["default"].string
    }))]).isRequired
  };
}
var DataTableColumnsPropTypes = exports.DataTableColumnsPropTypes = PropType;