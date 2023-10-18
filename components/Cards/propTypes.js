"use strict";

exports.__esModule = true;
exports.CardsPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    as: _propTypes["default"].string,
    data: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({})])),
    children: _propTypes["default"].func,
    onMore: _propTypes["default"].func,
    paginate: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
    show: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
      page: _propTypes["default"].number
    })]),
    step: _propTypes["default"].number
  });
}
var CardsPropTypes = exports.CardsPropTypes = PropType;