"use strict";

exports.__esModule = true;
exports.MenuPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
    disabled: _propTypes["default"].bool,
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: _propTypes["default"].oneOf(VERTICAL_ALIGN_OPTIONS),
      left: _propTypes["default"].oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: _propTypes["default"].oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }),
    dropBackground: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      color: _propTypes["default"].string,
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].number, _propTypes["default"].oneOf(['weak', 'medium', 'strong'])])
    })]),
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    justifyContent: _propTypes["default"].oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    icon: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
    items: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].object), _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].object))]),
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    messages: _propTypes["default"].shape({
      closeMenu: _propTypes["default"].string,
      openMenu: _propTypes["default"].string
    }),
    open: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string])
  });
}
var MenuPropTypes = exports.MenuPropTypes = PropType;