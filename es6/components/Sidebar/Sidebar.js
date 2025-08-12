var _excluded = ["children", "footer", "header"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Box } from '../Box';
import { SidebarPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
export var Sidebar = function Sidebar(_ref) {
  var children = _ref.children,
    footer = _ref.footer,
    header = _ref.header,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    height: {
      min: '100%'
    },
    gap: theme.sidebar.gap,
    pad: theme.sidebar.pad
  }, rest), header, /*#__PURE__*/React.createElement(Box, {
    flex: true
  }, children), footer);
};
Sidebar.propTypes = SidebarPropTypes;