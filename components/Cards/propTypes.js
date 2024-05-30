"use strict";

exports.__esModule = true;
exports.CardsPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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