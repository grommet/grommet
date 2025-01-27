var _excluded = ["kind"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, useMemo } from 'react';
import { Box } from '../Box';
import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PagePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Page = function Page(_ref) {
  var _ref$kind = _ref.kind,
    kind = _ref$kind === void 0 ? 'wide' : _ref$kind,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = useContext(ResponsiveContext);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var contentValue = useMemo(function () {
    var _theme$page$kind, _theme$page$kind2;
    return _extends({
      alignSelf: (_theme$page$kind = theme.page[kind]) == null ? void 0 : _theme$page$kind.alignSelf,
      width: (_theme$page$kind2 = theme.page[kind]) == null ? void 0 : _theme$page$kind2.width
    }, theme.page[kind][size]);
  }, [theme, size, kind]);
  return /*#__PURE__*/React.createElement(PageContext.Provider, {
    value: contentValue
  }, /*#__PURE__*/React.createElement(Box, _extends({
    fill: "horizontal"
  }, rest)));
};
Page.displayName = 'Page';
Page.propTypes = PagePropTypes;
export { Page };