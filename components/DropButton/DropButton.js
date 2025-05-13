"use strict";

exports.__esModule = true;
exports.DropButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Drop = require("../Drop");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "onAlign", "disabled", "dropAlign", "dropProps", "dropContent", "dropTarget", "id", "open", "onClick", "onClose", "onOpen"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var defaultDropAlign = {
  top: 'top',
  left: 'left'
};
var DropButton = exports.DropButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$a11yTitle = _ref.a11yTitle,
    a11yTitle = _ref$a11yTitle === void 0 ? 'Open Drop' : _ref$a11yTitle,
    onAlign = _ref.onAlign,
    disabled = _ref.disabled,
    _ref$dropAlign = _ref.dropAlign,
    dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
    dropProps = _ref.dropProps,
    dropContent = _ref.dropContent,
    dropTarget = _ref.dropTarget,
    id = _ref.id,
    open = _ref.open,
    onClick = _ref.onClick,
    onClose = _ref.onClose,
    onOpen = _ref.onOpen,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var buttonRef = (0, _utils.useForwardedRef)(ref);
  var _useState = (0, _react.useState)(),
    show = _useState[0],
    setShow = _useState[1];
  (0, _react.useEffect)(function () {
    if (open !== undefined && open !== show) {
      setShow(open);
    }
  }, [open, show]);
  var onDropClose = (0, _react.useCallback)(function (event) {
    // if the user has clicked on our Button, don't do anything here,
    // handle that in onClickInternal() below.
    var node = event.composed && event.composedPath()[0] || event.target;
    while (node && node !== document && !(node instanceof ShadowRoot) && node !== buttonRef.current) {
      node = node.parentNode;
    }
    if (node !== buttonRef.current) {
      // don't change internal state if caller is driving
      if (open === undefined) setShow(false);
      if (onClose) onClose(event);
    }
  }, [buttonRef, onClose, open]);
  var onClickInternal = (0, _react.useCallback)(function (event) {
    if (!show) {
      setShow(true);
      if (onOpen) onOpen(event);
    } else {
      setShow(false);
      if (onClose) onClose(event);
    }
    if (onClick) onClick(event);
  }, [onClick, onClose, onOpen, show]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
    id: id,
    ref: buttonRef,
    a11yTitle: a11yTitle,
    disabled: disabled
  }, rest, {
    onClick: onClickInternal
  })), show && buttonRef.current && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    id: id ? id + "__drop" : undefined,
    onAlign: onAlign,
    restrictFocus: true,
    align: dropAlign,
    target: dropTarget || buttonRef,
    onClickOutside: onDropClose,
    onEsc: onDropClose
  }, dropProps), dropContent));
});
DropButton.displayName = 'DropButton';
DropButton.propTypes = _propTypes.DropButtonPropTypes;