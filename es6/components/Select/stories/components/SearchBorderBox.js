var _excluded = ["children", "searching"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { css } from 'styled-components';
import React, { useState } from 'react';
import { Box } from '../../..';
import { ThemeContext } from '../../../../contexts';
import { normalizeColor } from '../../../../utils';
var searchingStyle = css(["position:relative;outline:none;box-shadow:none;&:before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:", ";}&:after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;will-change:left,right;background:", ";animation:progress 1.5s cubic-bezier(0.4,0,0.2,1) infinite;transform:translateX(-50%) scaleX(0);}@keyframes progress{0%{transform:translateX(-50%) scaleX(0);}50%{transform:translateX(12.5%) scaleX(0.75);}100%{transform:translateX(50%) scaleX(0);}}"], function (props) {
  return normalizeColor('light-2', props.theme);
}, function (props) {
  return normalizeColor('brand', props.theme);
});
var defaultStyle = css(["position:relative;outline:none;&:after{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:transparent;transition:width 0.2s ease,background 0.2s ease,left 0.2s ease;}", ";"], function (props) {
  return props.focus && "\n    box-shadow: none;\n    &:after {\n      left: 0;\n      width: 100%;\n      background: " + normalizeColor('brand', props.theme) + ";\n    }\n  ";
});
export var SearchBorderBox = function SearchBorderBox(_ref) {
  var children = _ref.children,
    searching = _ref.searching,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var boxBorderTheme = {
    box: {
      extend: searching ? searchingStyle : defaultStyle
    }
  };
  return /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: boxBorderTheme
  }, /*#__PURE__*/React.createElement(Box, _extends({
    focus: focus,
    searching: searching,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest), children));
};