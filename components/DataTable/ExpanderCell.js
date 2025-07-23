"use strict";

exports.__esModule = true;
exports.ExpanderCell = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Blank = require("grommet-icons/icons/Blank");
var _Box = require("../Box");
var _Button = require("../Button");
var _TableCell = require("../TableCell");
var _MessageContext = require("../../contexts/MessageContext");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["context", "expanded", "onToggle", "messages", "pad", "expandLabel"],
  _excluded2 = ["background", "border", "context", "expandLabel"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
var ExpanderControl = function ExpanderControl(_ref) {
  var context = _ref.context,
    expanded = _ref.expanded,
    onToggle = _ref.onToggle,
    messages = _ref.messages,
    pad = _ref.pad,
    expandLabel = _ref.expandLabel,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var content;
  if (onToggle) {
    var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = /*#__PURE__*/_react["default"].createElement(ExpandIcon, {
      color: (0, _utils.normalizeColor)('border', theme)
    });
  } else {
    content = /*#__PURE__*/_react["default"].createElement(_Blank.Blank, null);
  }
  var normalizedThemeProps = _extends({}, theme.table[context], theme.dataTable[context]);
  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, normalizedThemeProps, rest, {
    align: "center",
    fill: true,
    pad: pad
  }), content);
  if (onToggle) {
    var expandText = format({
      id: 'dataTable.expand',
      messages: messages,
      values: {
        label: expandLabel || ''
      }
    });
    var collapseText = format({
      id: 'dataTable.collapse',
      messages: messages,
      values: {
        label: expandLabel || ''
      }
    });
    var expandAllText = format({
      id: 'dataTable.expandAll',
      messages: messages
    });
    var collapseAllText = format({
      id: 'dataTable.collapseAll',
      messages: messages
    });
    var a11yTitle;
    if (expandLabel) {
      a11yTitle = format({
        id: expanded ? 'dataTable.collapse' : 'dataTable.expand',
        messages: messages,
        values: {
          label: expandLabel
        }
      });
    } else if (context === 'header') {
      a11yTitle = expanded ? collapseAllText : expandAllText;
    } else {
      a11yTitle = expanded ? collapseText : expandText;
    }
    content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      fill: true,
      "aria-expanded": expanded ? 'true' : 'false',
      a11yTitle: a11yTitle,
      hoverIndicator: true
      // ensure focus is visible since overflow: hidden on TableCell sizeStyle
      // would otherwise clip it
      ,
      focusIndicator: "inset",
      onClick: onToggle,
      plain: true
    }, content);
  }
  return content;
};
var ExpanderCell = exports.ExpanderCell = function ExpanderCell(_ref2) {
  var background = _ref2.background,
    border = _ref2.border,
    context = _ref2.context,
    expandLabel = _ref2.expandLabel,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    background: background,
    border: border,
    size: "xxsmall",
    plain: "noPad",
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top'
  }, /*#__PURE__*/_react["default"].createElement(ExpanderControl, _extends({
    context: context,
    expandLabel: expandLabel
  }, rest)));
};
ExpanderCell.displayName = 'ExpanderCell';