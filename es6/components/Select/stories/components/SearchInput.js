var _excluded = ["searching"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useEffect } from 'react';
import { TextInput } from '../../..';
import { SearchBorderBox } from './SearchBorderBox';

/* Need ForwardRef since this functional component
   is being passed into a custom theme for SearchInput
*/
export var SearchInput = /*#__PURE__*/forwardRef(function (_ref, textInputRef) {
  var searching = _ref.searching,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  useEffect(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, [textInputRef]);
  return /*#__PURE__*/React.createElement(SearchBorderBox, {
    searching: searching
  }, /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
    plain: true,
    ref: textInputRef
  })));
});