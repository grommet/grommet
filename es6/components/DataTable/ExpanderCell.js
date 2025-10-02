var _excluded = ["context", "expanded", "onToggle", "messages", "pad", "expandLabel"],
  _excluded2 = ["background", "border", "context", "expandLabel"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import { Blank } from 'grommet-icons/icons/Blank';
import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { MessageContext } from '../../contexts/MessageContext';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

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
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var content;
  if (onToggle) {
    var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = /*#__PURE__*/React.createElement(ExpandIcon, {
      color: normalizeColor('border', theme)
    });
  } else {
    content = /*#__PURE__*/React.createElement(Blank, null);
  }
  var normalizedThemeProps = _extends({}, theme.table[context], theme.dataTable[context]);
  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = /*#__PURE__*/React.createElement(Box, _extends({}, normalizedThemeProps, rest, {
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
    content = /*#__PURE__*/React.createElement(Button, {
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
var ExpanderCell = function ExpanderCell(_ref2) {
  var _theme$dataTable$expa;
  var background = _ref2.background,
    border = _ref2.border,
    context = _ref2.context,
    expandLabel = _ref2.expandLabel,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useThemeValue2 = useThemeValue(),
    theme = _useThemeValue2.theme;
  return /*#__PURE__*/React.createElement(TableCell, {
    background: background,
    border: border,
    size: (_theme$dataTable$expa = theme.dataTable.expand) == null ? void 0 : _theme$dataTable$expa.size,
    plain: "noPad",
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top'
  }, /*#__PURE__*/React.createElement(ExpanderControl, _extends({
    context: context,
    expandLabel: expandLabel
  }, rest)));
};
ExpanderCell.displayName = 'ExpanderCell';
export { ExpanderCell };