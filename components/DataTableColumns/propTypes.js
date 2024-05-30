"use strict";

exports.__esModule = true;
exports.DataTableColumnsPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool.isRequired,
    options: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].arrayOf(_propTypes["default"].shape({
      disabled: _propTypes["default"].bool,
      label: _propTypes["default"].string,
      pinned: _propTypes["default"].bool,
      property: _propTypes["default"].string
    }))]).isRequired
  };
}
var DataTableColumnsPropTypes = exports.DataTableColumnsPropTypes = PropType;