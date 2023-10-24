var _excluded = ["children", "background"];
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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