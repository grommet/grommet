"use strict";

exports.__esModule = true;
exports.CalendarPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    activeDate: _propTypes["default"].oneOf(['start', 'end']),
    animate: _propTypes["default"].bool,
    bounds: _propTypes["default"].arrayOf(_propTypes["default"].string),
    children: _propTypes["default"].func,
    date: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]))]),
    dates: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)])),
    disabled: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)])),
    daysOfWeek: _propTypes["default"].bool,
    fill: _propTypes["default"].bool,
    firstDayOfWeek: _propTypes["default"].oneOf([0, 1]),
    header: _propTypes["default"].func,
    level: _propTypes["default"].oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    locale: _propTypes["default"].string,
    messages: _propTypes["default"].shape({
      previous: _propTypes["default"].string,
      next: _propTypes["default"].string
    }),
    onReference: _propTypes["default"].func,
    onSelect: _propTypes["default"].func,
    range: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['array'])]),
    reference: _propTypes["default"].string,
    showAdjacentDays: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['trim'])]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large']), _propTypes["default"].string])
  });
}
var CalendarPropTypes = exports.CalendarPropTypes = PropType;