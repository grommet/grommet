"use strict";

exports.__esModule = true;
exports.CalendarPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var CalendarPropTypes = PropType;
exports.CalendarPropTypes = CalendarPropTypes;