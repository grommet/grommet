var _excluded = ["searching"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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