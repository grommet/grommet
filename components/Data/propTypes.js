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
    properties: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].objectOf(_propTypes["default"].shape({
      filter: _propTypes["default"].bool,
      label: _propTypes["default"].string,
      options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({})])),
      range: _propTypes["default"].shape({
        max: _propTypes["default"].number,
        min: _propTypes["default"].number,
        step: _propTypes["default"].number
      }),
      search: _propTypes["default"].bool,
      sort: _propTypes["default"].bool
    }))]),
    toolbar: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['search', 'filters'])]),
    total: _propTypes["default"].number,
    view: _propTypes["default"].oneOfType([_propTypes["default"].string, viewType])
  };
}
var DataPropTypes = exports.DataPropTypes = PropType;