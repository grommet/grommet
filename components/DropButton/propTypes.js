"use strict";

exports.__esModule = true;
exports.DropButtonPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    disabled: _propTypes["default"].bool,
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(['top', 'bottom']),
      bottom: _propTypes["default"].oneOf(['top', 'bottom']),
      right: _propTypes["default"].oneOf(['left', 'right']),
      left: _propTypes["default"].oneOf(['left', 'right'])
    }),
    dropContent: _propTypes["default"].element.isRequired,
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    onClose: _propTypes["default"].func,
    onOpen: _propTypes["default"].func,
    open: _propTypes["default"].bool
  });
}
var DropButtonPropTypes = exports.DropButtonPropTypes = PropType;