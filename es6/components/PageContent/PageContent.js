var _excluded = ["children", "background"];
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext } from 'react';
import { Box } from '../Box';
import { PageContext } from '../Page';
import { PageContentPropTypes } from './propTypes';
var PageContent = function PageContent(_ref) {
  var children = _ref.children,
    background = _ref.background,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(PageContext),
    pageContext = _extends({}, (_objectDestructuringEmpty(_useContext), _useContext));
  if (background != null && background.fill) {
    return /*#__PURE__*/React.createElement(Box, {
      background: background
    }, /*#__PURE__*/React.createElement(Box, _extends({
      fill: "horizontal"
    }, pageContext, rest), children));
  }
  return /*#__PURE__*/React.createElement(Box, _extends({
    fill: "horizontal",
    background: background
  }, pageContext, rest), children);
};
PageContent.displayName = 'PageContent';
PageContent.propTypes = PageContentPropTypes;
export { PageContent };