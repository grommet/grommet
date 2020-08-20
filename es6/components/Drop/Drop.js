function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useEffect, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { getNewContainer, setFocusWithoutScroll } from '../../utils';
import { DropContainer } from './DropContainer';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
var Drop = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var restrictFocus = _ref.restrictFocus,
      dropTarget = _ref.target,
      _ref$trapFocus = _ref.trapFocus,
      trapFocus = _ref$trapFocus === void 0 ? true : _ref$trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["restrictFocus", "target", "trapFocus"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

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
  useEffect(function () {
    return setDropContainer(getNewContainer(containerTarget));
  }, [containerTarget]); // just a few things to clean up when the Drop is unmounted

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
  return dropContainer ? /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(DropContainer, _extends({
    ref: ref,
    dir: theme && theme.dir,
    dropTarget: dropTarget,
    restrictFocus: restrictFocus,
    trapFocus: trapFocus
  }, rest)), dropContainer) : null;
});
Drop.displayName = 'Drop';
var DropDoc;

if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}

var DropWrapper = DropDoc || Drop;
export { DropWrapper as Drop };