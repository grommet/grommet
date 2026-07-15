var _excluded = ["inline", "restrictFocus", "target", "trapFocus"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useEffect, useState, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getNewContainer, setFocusWithoutScroll } from '../../utils';
import { DropContainer } from './DropContainer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { DropPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Drop = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var inline = _ref.inline,
    restrictFocus = _ref.restrictFocus,
    dropTarget = _ref.target,
    _ref$trapFocus = _ref.trapFocus,
    trapFocus = _ref$trapFocus === void 0 ? true : _ref$trapFocus,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(),
    originalFocusedElement = _useState[0],
    setOriginalFocusedElement = _useState[1];
  useEffect(function () {
    return setOriginalFocusedElement(document.activeElement);
  }, []);
  var _useState2 = useState(),
    dropContainer = _useState2[0],
    setDropContainer = _useState2[1];
  var containerTarget = useContext(ContainerTargetContext);
  var containerChildNodesLength = useRef(null);
  useEffect(function () {
    // we need this condition to prevent getNewContainer to run multiple times
    // in the event that the component gets created, destroyed, and recreated.
    // see https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    if (!(containerChildNodesLength != null && containerChildNodesLength.current)) {
      containerChildNodesLength.current = containerTarget.childNodes.length;
      setDropContainer(!inline ? getNewContainer(containerTarget) : undefined);
    }
  }, [containerTarget, inline]);

  // just a few things to clean up when the Drop is unmounted
  useEffect(function () {
    return function () {
      if (restrictFocus && originalFocusedElement) {
        if (originalFocusedElement.focus) {
          setFocusWithoutScroll(originalFocusedElement);
        } else if (originalFocusedElement.parentNode && originalFocusedElement.parentNode.focus) {
          // required for IE11 and Edge
          setFocusWithoutScroll(originalFocusedElement.parentNode);
        }
      }
      if (dropContainer) {
        containerTarget.removeChild(dropContainer);
      }
    };
  }, [containerTarget, dropContainer, originalFocusedElement, restrictFocus]);
  var content = /*#__PURE__*/React.createElement(DropContainer, _extends({
    ref: ref,
    dir: theme && theme.dir,
    dropTarget: dropTarget,
    restrictFocus: restrictFocus,
    trapFocus: trapFocus
  }, rest));
  if (inline) return content;
  if (dropContainer) return /*#__PURE__*/createPortal(content, dropContainer);
  return null;
});
Drop.displayName = 'Drop';
Drop.propTypes = DropPropTypes;
export { Drop };