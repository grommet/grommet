function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef } from 'react';
import { TextInput } from '../../..';
import { SearchBorderBox } from './SearchBorderBox';
import { SearchInputContext } from './SearchInputContext';
export var SearchInput = function SearchInput(props) {
  var textInputRef = useRef();
  useEffect(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, []);
  return /*#__PURE__*/React.createElement(SearchInputContext.Consumer, null, function (_ref) {
    var searching = _ref.searching;
    return /*#__PURE__*/React.createElement(SearchBorderBox, {
      searching: searching
    }, /*#__PURE__*/React.createElement(TextInput, _extends({}, props, {
      plain: true,
      ref: textInputRef
    })));
  });
};