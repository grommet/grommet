function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { NotificationType } from './propTypes';

var Notification = function Notification(_ref) {
  var message = _ref.message,
      onClose = _ref.onClose,
      status = _ref.status,
      title = _ref.title,
      toast = _ref.toast;
  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(true),
      visible = _useState[0],
      setVisible = _useState[1];

  var close = useCallback(function () {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);
  useEffect(function () {
    var timer = setTimeout(close, theme.notification.time);
    return function () {
      return clearTimeout(timer);
    };
  }, [close, theme.notification.time]);
  var CloseIcon = theme.notification.close.icon;
  var _theme$notification$s = theme.notification[status],
      StatusIcon = _theme$notification$s.icon,
      color = _theme$notification$s.color;
  var closeIconColor = theme.notification.close.color;
  var content = /*#__PURE__*/React.createElement(Box, _extends({}, theme.notification.container, toast ? _extends({}, theme.notification.toast.container) : {}, {
    direction: "row"
  }), /*#__PURE__*/React.createElement(Box, theme.notification.iconContainer, /*#__PURE__*/React.createElement(StatusIcon, {
    color: color
  })), /*#__PURE__*/React.createElement(Box, _extends({}, theme.notification.textContainer, {
    align: "start",
    direction: "row",
    justify: "between",
    flex: true
  }), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, theme.notification.title, title), message && /*#__PURE__*/React.createElement(Paragraph, theme.notification.message, message)), onClose && /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(CloseIcon, {
      color: closeIconColor
    }),
    onClick: close,
    plain: true
  })));

  if (toast) {
    content = visible && /*#__PURE__*/React.createElement(Layer, _extends({}, theme.notification.toast.layer, {
      role: "log",
      modal: false,
      onEsc: onClose,
      responsive: true,
      plain: true
    }), content);
  }

  return content;
};

Notification.defaultProps = {
  status: 'unknown',
  toast: false
};
Object.setPrototypeOf(Notification.defaultProps, defaultProps);
Notification.displayName = 'Notification';
Notification.propTypes = NotificationType;
export { Notification };