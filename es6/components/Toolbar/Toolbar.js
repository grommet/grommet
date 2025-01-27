var _excluded = ["children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ToolbarPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';
var defaultLayoutProps = {
  direction: 'row',
  align: 'start',
  gap: 'small'
};
var smallLayoutProps = {
  direction: 'row',
  wrap: true,
  align: 'start',
  gap: 'small'
};
export var Toolbar = function Toolbar(_ref) {
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = useContext(ResponsiveContext);
  var layoutProps = isSmall(size) ? smallLayoutProps : defaultLayoutProps;
  return /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    cssGap: true
  }, layoutProps, rest), children);
};
Toolbar.propTypes = ToolbarPropTypes;