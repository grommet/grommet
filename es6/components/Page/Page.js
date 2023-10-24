var _excluded = ["kind"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PagePropTypes } from './propTypes';
var Page = function Page(_ref) {
  var kind = _ref.kind,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = useContext(ResponsiveContext);
  var theme = useContext(ThemeContext);
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
Page.defaultProps = {
  kind: 'wide'
};
export { Page };