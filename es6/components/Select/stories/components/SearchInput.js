function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useRef } from 'react';
import { TextInput } from '../../..';
import { SearchBorderBox } from './SearchBorderBox';
export var SearchInput = function SearchInput(_ref) {
  var searching = _ref.searching,
      props = _objectWithoutPropertiesLoose(_ref, ["searching"]);

  var textInputRef = useRef();
  useEffect(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, []);
  return /*#__PURE__*/React.createElement(SearchBorderBox, {
    searching: searching
  }, /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
    plain: true,
    ref: textInputRef
  })));
};