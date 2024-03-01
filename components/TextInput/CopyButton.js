"use strict";

exports.__esModule = true;
exports.CopyButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Copy = require("grommet-icons/icons/Copy");
var _Button = require("../Button");
var _Tip = require("../Tip");
var _styles = require("../../utils/styles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
var StyledButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "CopyButton__StyledButton",
  componentId: "sc-1bp1m18-0"
})(["border-radius:", ";", ""], function (props) {
  return props.theme.global.control.border.radius;
}, function (props) {
  return !props.theme.button["default"] ? (0, _styles.edgeStyle)('padding', props.pad, false, undefined, props.theme) : '';
});
var CopyButton = exports.CopyButton = function CopyButton(_ref) {
  var _theme$global$input$p, _theme$global$input$p2, _theme$global$input$p3;
  var onClickCopy = _ref.onClickCopy,
    onBlurCopy = _ref.onBlurCopy,
    readOnlyCopyPrompt = _ref.readOnlyCopyPrompt,
    tip = _ref.tip,
    value = _ref.value;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: tip
  }, /*#__PURE__*/_react["default"].createElement(StyledButton, {
    onClick: onClickCopy,
    icon: /*#__PURE__*/_react["default"].createElement(_Copy.Copy, null)
    // only apply horizontal padding since button will
    // fill height of input
    ,
    pad: {
      horizontal: (_theme$global$input$p = theme.global.input.padding) == null ? void 0 : _theme$global$input$p.horizontal,
      left: (_theme$global$input$p2 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p2.left,
      right: (_theme$global$input$p3 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p3.right
    },
    onBlur: onBlurCopy,
    onMouseOut: onBlurCopy,
    "aria-label": readOnlyCopyPrompt + " " + value
  }));
};