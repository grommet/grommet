"use strict";

exports.__esModule = true;
exports.DataPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var viewType = _propTypes["default"].shape({
  properties: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].shape({})]),
  search: _propTypes["default"].string,
  sort: _propTypes["default"].shape({
    direction: _propTypes["default"].oneOf(['asc', 'desc']),
    property: _propTypes["default"].string
  })
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    data: _propTypes["default"].arrayOf(_propTypes["default"].shape({})),
    defaultView: viewType,
    onView: _propTypes["default"].func,
    properties: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].shape({})]),
    toolbar: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['search', 'filters'])]),
    total: _propTypes["default"].number,
    updateOn: _propTypes["default"].oneOf(['change', 'submit']),
    view: _propTypes["default"].oneOfType([_propTypes["default"].string, viewType])
  };
}
var DataPropTypes = exports.DataPropTypes = PropType;