var _excluded = ["sticky"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { findScrollParent, useForwardedRef } from '../../utils';
import { Box } from '../Box';
var Header = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _theme$header2;
  var sticky = _ref.sticky,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext);
  var headerRef = useForwardedRef(ref);
  useEffect(function () {
    var scrollTop = 0;
    var updateScrollDir = function updateScrollDir() {
      // target is its scroll parent
      var target = findScrollParent(headerRef.current);
      var header = headerRef.current;
      if (target && sticky === 'scrollup') {
        var nextScrollTop = target === document ? window.pageYOffset : target.scrollTop;
        if (scrollTop - nextScrollTop <= 0) {
          header.style.top = "-" + header.getBoundingClientRect().height + "px";
          header.style.zIndex = '';
        } else if (scrollTop - nextScrollTop > 0) {
          var _theme$header;
          // ensure that header moves with the target
          header.style.position = 'sticky';
          header.style.top = '0px';
          header.style.zIndex = "" + ((_theme$header = theme.header) == null || (_theme$header = _theme$header.sticky) == null ? void 0 : _theme$header.zIndex);
          header.style.transition = 'top 0.6s';
        }
        scrollTop = nextScrollTop;
      }
    };
    if (sticky === 'scrollup') {
      updateScrollDir();
      window.addEventListener('resize', updateScrollDir);
      window.addEventListener('scroll', updateScrollDir, true);
    }
    return function () {
      if (sticky === 'scrollup') {
        window.removeEventListener('resize', updateScrollDir);
        window.removeEventListener('scroll', updateScrollDir, true);
      }
    };
  }, [headerRef, sticky, (_theme$header2 = theme.header) == null || (_theme$header2 = _theme$header2.sticky) == null ? void 0 : _theme$header2.zIndex]);
  return /*#__PURE__*/React.createElement(Box, _extends({
    align: "center",
    as: "header",
    direction: "row",
    flex: false,
    justify: "between",
    gap: "medium",
    ref: headerRef
  }, rest));
});
Header.displayName = 'Header';
export { Header };