var _excluded = ["context", "expanded", "onToggle", "pad"],
  _excluded2 = ["background", "border", "context"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Blank } from 'grommet-icons/icons/Blank';
import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
var ExpanderControl = function ExpanderControl(_ref) {
  var context = _ref.context,
    expanded = _ref.expanded,
    onToggle = _ref.onToggle,
    pad = _ref.pad,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
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
    content = /*#__PURE__*/React.createElement(Button, {
      fill: true,
      a11yTitle: expanded ? 'collapse' : 'expand',
      hoverIndicator: true,
      onClick: onToggle,
      plain: true
    }, content);
  }
  return content;
};
var ExpanderCell = function ExpanderCell(_ref2) {
  var background = _ref2.background,
    border = _ref2.border,
    context = _ref2.context,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(TableCell, {
    background: background,
    border: border,
    size: "xxsmall",
    plain: "noPad",
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top'
  }, /*#__PURE__*/React.createElement(ExpanderControl, _extends({
    context: context
  }, rest)));
};
ExpanderCell.displayName = 'ExpanderCell';
export { ExpanderCell };