function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useRef, useState } from 'react';
import { getBodyChildElements, makeNodeFocusable, makeNodeUnfocusable } from '../utils';

var isNotAncestorOf = function isNotAncestorOf(child) {
  return function (parent) {
    return !parent.contains(child);
  };
};

export var FocusedContainer = function FocusedContainer(_ref) {
  var _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? false : _ref$hidden,
      _ref$restrictScroll = _ref.restrictScroll,
      restrictScroll = _ref$restrictScroll === void 0 ? false : _ref$restrictScroll,
      children = _ref.children,
      trapFocus = _ref.trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["hidden", "restrictScroll", "children", "trapFocus"]);

  var _useState = useState(''),
      bodyOverflowStyle = _useState[0],
      setBodyOverflowStyle = _useState[1];

  var ref = useRef(null);
  useEffect(function () {
    var removeTrap = function removeTrap() {
      var child = ref.current;
      getBodyChildElements().filter(isNotAncestorOf(child)).forEach(makeNodeFocusable);

      if (restrictScroll) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };

    var handleTrapFocus = function handleTrapFocus() {
      var child = ref.current;
      getBodyChildElements().filter(isNotAncestorOf(child)).forEach(makeNodeUnfocusable);

      if (restrictScroll && bodyOverflowStyle !== 'hidden') {
        setBodyOverflowStyle(document.body.style.overflow);
        document.body.style.overflow = 'hidden';
      }
    };

    var timer = setTimeout(function () {
      if (!hidden && trapFocus) {
        handleTrapFocus();
      }
    }, 0);
    return function () {
      removeTrap();
      clearTimeout(timer);
    };
  }, [hidden, bodyOverflowStyle, restrictScroll, trapFocus]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children);
};