var _excluded = ["context", "expanded", "onToggle", "pad"],
    _excluded2 = ["background", "border", "context"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Blank } from 'grommet-icons/icons/Blank';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils'; // ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.

var ExpanderControl = function ExpanderControl(_ref) {
  var context = _ref.context,
      expanded = _ref.expanded,
      onToggle = _ref.onToggle,
      pad = _ref.pad,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
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
ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);
export { ExpanderCell };