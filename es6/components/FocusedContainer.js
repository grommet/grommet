var _excluded = ["hidden", "restrictScroll", "children", "trapFocus"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
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