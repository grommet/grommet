var _excluded = ["hidden", "restrictScroll", "children", "trapFocus"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useEffect, useRef, useState } from 'react';
import { makeNodeFocusable, makeNodeUnfocusable } from '../utils';
import { RootsContext, useRoots } from '../contexts/RootsContext';
var isFocusable = function isFocusable(element) {
  if ((element == null ? void 0 : element.tabIndex) < 0 || element != null && element.disabled) {
    return false;
  }
  switch (element == null ? void 0 : element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
      return element.type !== 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    case 'DIV':
      return element.tabIndex >= 0;
    default:
      return false;
  }
};
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
  var preNodeRef = useRef(null);
  var postNodeRef = useRef(null);
  var _useRoots = useRoots(),
    contextValue = _useRoots.contextValue,
    hasRoots = _useRoots.hasRoots;
  var contextRoots = contextValue.roots;
  // When attemptFocus moves focus around to find the focusable element,
  // set this to true so handleTrapFocus doesn't focus the element.
  var ignoreUtilFocusRef = useRef(false);
  var lastFocusRef = useRef(null);
  useEffect(function () {
    var container = ref.current;
    var roots = contextRoots.current;
    var attemptFocus = function attemptFocus(element) {
      // Check if the element is focusable; if not, return false
      if (!isFocusable(element)) {
        return false;
      }
      ignoreUtilFocusRef.current = true;
      try {
        element.focus();
      } catch (_unused) {
        // continue regardless of error
      }
      ignoreUtilFocusRef.current = false;
      // Return true if the element is currently the active element or has focus
      return document.activeElement === element;
    };
    var _focusFirstDescendant = function focusFirstDescendant(element) {
      // Iterate through all child nodes of the provided element
      for (var i = 0; i < element.childNodes.length; i += 1) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || _focusFirstDescendant(child)) return true;
      }
      // If no focusable child or descendant was found, return false
      return false;
    };
    var _focusLastDescendant = function focusLastDescendant(element) {
      for (var i = element.childNodes.length - 1; i >= 0; i -= 1) {
        var child = element.childNodes[i];
        if (attemptFocus(child) || _focusLastDescendant(child)) return true;
      }
      return false;
    };
    var handleTrapFocus = function handleTrapFocus(e) {
      if (!hidden && trapFocus && ignoreUtilFocusRef.current === false && container &&
      // only perform focus if this is the most recently opened drop
      roots[roots.length - 1] === container) {
        if (container.contains(e.target)) {
          lastFocusRef.current = e.target;
        } else {
          _focusFirstDescendant(container);
          if (lastFocusRef.current === document.activeElement) {
            _focusLastDescendant(container);
          }
          lastFocusRef.current = document.activeElement;
        }
      }
    };

    // add container to the global roots
    if (container) roots.push(container);

    // Create and insert focusable nodes to help track when focus
    // has left this container but without letting focus be noticeably
    // placed on anything outside the container
    if (!hidden && trapFocus) {
      var preDiv = document.createElement('div');
      var postDiv = document.createElement('div');
      var commonStyles = {
        position: 'absolute',
        height: '1px',
        left: '0',
        right: '0'
      };
      Object.assign(preDiv.style, _extends({}, commonStyles, {
        top: '0'
      }));
      Object.assign(postDiv.style, _extends({}, commonStyles, {
        bottom: '0'
      }));
      preNodeRef.current = container.parentNode.insertBefore(preDiv, container);
      postNodeRef.current = container.parentNode.insertBefore(postDiv, container.nextSibling);
      preNodeRef.current.tabIndex = 0;
      postNodeRef.current.tabIndex = 0;
    }
    document.addEventListener('focus', handleTrapFocus, true);
    return function () {
      var _preNodeRef$current, _postNodeRef$current;
      // remove from global roots array
      if (roots.includes(container)) roots.splice(roots.indexOf(container), 1);
      document.removeEventListener('focus', handleTrapFocus, true);
      if (roots != null && roots[roots.length - 1]) makeNodeFocusable(roots[roots.length - 1]);
      preNodeRef == null || (_preNodeRef$current = preNodeRef.current) == null || _preNodeRef$current.remove();
      postNodeRef == null || (_postNodeRef$current = postNodeRef.current) == null || _postNodeRef$current.remove();
    };
  }, [hidden, contextRoots, trapFocus]);
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
    var roots = contextRoots.current;
    var timer = setTimeout(function () {
      if (!hidden && trapFocus) {
        // make every root before this one unfocusable
        roots == null || roots.forEach(function (root, index) {
          if (index < roots.length - 1) makeNodeUnfocusable(root);
        });
      }
    }, 0);
    return function () {
      return clearTimeout(timer);
    };
  }, [hidden, contextRoots, trapFocus]);
  var focusedContainer = /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children);
  if (hasRoots) return focusedContainer;
  return (
    /*#__PURE__*/
    // for cases outside of Grommet React tree, manage trapFocus when
    // Drop/Layer opens another Drop/Layer
    React.createElement(RootsContext.Provider, {
      value: contextValue
    }, focusedContainer)
  );
};