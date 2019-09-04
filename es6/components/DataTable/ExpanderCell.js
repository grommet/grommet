function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { normalizeColor } from '../../utils';

var ExpanderCell = function ExpanderCell(_ref) {
  var context = _ref.context,
      expanded = _ref.expanded,
      onToggle = _ref.onToggle,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["context", "expanded", "onToggle", "theme"]);

  var content;

  if (onToggle) {
    var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = React.createElement(ExpandIcon, {
      color: normalizeColor('border', theme)
    });
  }

  var normalizedThemeProps = _extends({}, theme.table[context], {}, theme.dataTable[context]);

  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = React.createElement(Box, _extends({}, normalizedThemeProps, rest, {
    align: "center",
    pad: "xsmall"
  }), content);

  if (onToggle) {
    content = React.createElement(Button, {
      fill: true,
      a11yTitle: expanded ? 'collapse' : 'expand',
      hoverIndicator: true,
      disabled: !onToggle,
      onClick: onToggle
    }, content);
  }

  return React.createElement(TableCell, {
    size: "xxsmall",
    plain: true,
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top',
    pad: "none"
  }, content);
};

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, defaultProps);
var ExpanderCellWrapper = compose(withTheme)(ExpanderCell);
export { ExpanderCellWrapper as ExpanderCell };