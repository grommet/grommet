function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Drop } from '../Drop';
var DropButton = forwardRef(function (_ref, ref) {
  var _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? 'Open Drop' : _ref$a11yTitle,
      disabled = _ref.disabled,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? {
    top: 'top',
    left: 'left'
  } : _ref$dropAlign,
      dropProps = _ref.dropProps,
      dropContent = _ref.dropContent,
      dropTarget = _ref.dropTarget,
      id = _ref.id,
      open = _ref.open,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onOpen = _ref.onOpen,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "disabled", "dropAlign", "dropProps", "dropContent", "dropTarget", "id", "open", "onClick", "onClose", "onOpen"]);

  var _useState = useState(),
      show = _useState[0],
      setShow = _useState[1];

  useEffect(function () {
    if (open !== undefined && open !== show) {
      setShow(open);
    }
  }, [open, show]);
  var buttonRef = useRef();
  var onDropClose = useCallback(function (event) {
    // if the user has clicked on our Button, don't do anything here,
    // handle that in onClickInternal() below.
    var node = event.target;

    while (node !== document && node !== (ref || buttonRef).current) {
      node = node.parentNode;
    }

    if (node !== (ref || buttonRef).current) {
      setShow(false);
      if (onClose) onClose(event);
    }
  }, [onClose, ref]);
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
  return React.createElement(React.Fragment, null, React.createElement(Button, _extends({
    id: id,
    ref: ref || buttonRef,
    a11yTitle: a11yTitle,
    disabled: disabled
  }, rest, {
    onClick: onClickInternal
  })), show && (ref || buttonRef).current && React.createElement(Drop, _extends({
    id: id ? id + "__drop" : undefined,
    restrictFocus: true,
    align: dropAlign,
    target: dropTarget || (ref || buttonRef).current,
    onClickOutside: onDropClose,
    onEsc: onDropClose
  }, dropProps), dropContent));
});
DropButton.displayName = 'DropButton';
var DropButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DropButtonDoc = require('./doc').doc(DropButton);
}

var DropButtonWrapper = DropButtonDoc || DropButton;
export { DropButtonWrapper as DropButton };