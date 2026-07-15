var _excluded = ["a11yTitle", "onAlign", "disabled", "dropAlign", "dropProps", "dropContent", "dropTarget", "id", "open", "onClick", "onClose", "onOpen"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { useForwardedRef } from '../../utils';
import { DropButtonPropTypes } from './propTypes';
var defaultDropAlign = {
  top: 'top',
  left: 'left'
};
var DropButton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$a11yTitle = _ref.a11yTitle,
    a11yTitle = _ref$a11yTitle === void 0 ? 'Open Drop' : _ref$a11yTitle,
    onAlign = _ref.onAlign,
    disabled = _ref.disabled,
    _ref$dropAlign = _ref.dropAlign,
    dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
    dropProps = _ref.dropProps,
    dropContent = _ref.dropContent,
    dropTarget = _ref.dropTarget,
    id = _ref.id,
    open = _ref.open,
    onClick = _ref.onClick,
    onClose = _ref.onClose,
    onOpen = _ref.onOpen,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var buttonRef = useForwardedRef(ref);
  var _useState = useState(),
    show = _useState[0],
    setShow = _useState[1];
  useEffect(function () {
    if (open !== undefined && open !== show) {
      setShow(open);
    }
  }, [open, show]);
  var onDropClose = useCallback(function (event) {
    // if the user has clicked on our Button, don't do anything here,
    // handle that in onClickInternal() below.
    var node = event.composed && event.composedPath()[0] || event.target;
    while (node && node !== document && !(node instanceof ShadowRoot) && node !== buttonRef.current) {
      node = node.parentNode;
    }
    if (node !== buttonRef.current) {
      // don't change internal state if caller is driving
      if (open === undefined) setShow(false);
      if (onClose) onClose(event);
    }
  }, [buttonRef, onClose, open]);
  var onClickInternal = useCallback(function (event) {
    if (!show) {
      setShow(true);
      if (onOpen) onOpen(event);
    } else {
      setShow(false);
      if (onClose) onClose(event);
    }
    if (onClick) onClick(event);
  }, [onClick, onClose, onOpen, show]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, _extends({
    id: id,
    ref: buttonRef,
    a11yTitle: a11yTitle,
    disabled: disabled
  }, rest, {
    onClick: onClickInternal
  })), show && buttonRef.current && /*#__PURE__*/React.createElement(Drop, _extends({
    id: id ? id + "__drop" : undefined,
    onAlign: onAlign,
    restrictFocus: true,
    align: dropAlign,
    target: dropTarget || buttonRef,
    onClickOutside: onDropClose,
    onEsc: onDropClose
  }, dropProps), dropContent));
});
DropButton.displayName = 'DropButton';
DropButton.propTypes = DropButtonPropTypes;
export { DropButton };