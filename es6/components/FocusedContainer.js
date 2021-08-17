var _excluded = ["hidden", "restrictScroll", "children", "trapFocus"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { RootsContext } from '../contexts/RootsContext';
export var FocusedContainer = function FocusedContainer(_ref) {
  var _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? false : _ref$hidden,
      _ref$restrictScroll = _ref.restrictScroll,
      restrictScroll = _ref$restrictScroll === void 0 ? false : _ref$restrictScroll,
      children = _ref.children,
      trapFocus = _ref.trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = useState(''),
      bodyOverflowStyle = _useState[0],
      setBodyOverflowStyle = _useState[1];

  var ref = useRef(null);
  var roots = useContext(RootsContext);

  var _useState2 = useState(roots),
      nextRoots = _useState2[0],
      setNextRoots = _useState2[1];

  useEffect(function () {
    // make sure value of null is not added to array
    if (ref.current) setNextRoots([].concat(roots, [ref.current]));
  }, [roots]);
  useEffect(function () {
    if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
      setBodyOverflowStyle(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
    }

    return function () {
      if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };
  }, [bodyOverflowStyle, hidden, trapFocus, restrictScroll]);
  useEffect(function () {
    var timer = setTimeout(function () {
      if (!hidden && trapFocus && roots && roots[0]) {
        roots.forEach(makeNodeUnfocusable);
      }
    }, 0);
    return function () {
      // remove trap and restore ability to focus on the last root only
      if (roots && roots[0]) makeNodeFocusable(roots[roots.length - 1]);
      clearTimeout(timer);
    };
  }, [hidden, roots, trapFocus]);
  return /*#__PURE__*/React.createElement(RootsContext.Provider, {
    value: nextRoots
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children));
};