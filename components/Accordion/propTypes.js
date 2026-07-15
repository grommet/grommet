"use strict";

exports.__esModule = true;
exports.AccordionPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    activeIndex: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]),
    animate: _propTypes["default"].bool,
    children: _propTypes["default"].node,
    level: _propTypes["default"].number,
    onActive: _propTypes["default"].func,
    multiple: _propTypes["default"].bool,
    messages: _propTypes["default"].shape({
      tabContents: _propTypes["default"].string
    })
  });
}
var AccordionPropTypes = exports.AccordionPropTypes = PropType;