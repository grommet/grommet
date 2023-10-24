var _excluded = ["actions", "message", "onClose", "id", "global", "status", "title", "toast", "icon", "time"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback, useContext, useEffect, useState, useMemo, Fragment } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { NotificationType } from './propTypes';
var adaptThemeStyle = function adaptThemeStyle(value, theme) {
  var textStyle = value;
  var closeButtonStyle = value;
  if (typeof value === 'string' && theme.global.edgeSize[value]) {
    textStyle = {
      vertical: value,
      left: value,
      right: undefined
    };
    closeButtonStyle = {
      vertical: value,
      right: value
    };
  } else if (typeof value === 'object') {
    var left = value.left,
      right = value.right,
      top = value.top,
      bottom = value.bottom,
      horizontal = value.horizontal,
      vertical = value.vertical;
    textStyle = {
      top: top || vertical,
      bottom: bottom || vertical,
      left: left || horizontal,
      right: undefined
    };
    closeButtonStyle = {
      top: top || vertical,
      bottom: bottom || vertical,
      right: right || horizontal
    };
  }
  return [textStyle, closeButtonStyle];
};
var NotificationAnchor = styled(Anchor).withConfig({
  displayName: "Notification__NotificationAnchor",
  componentId: "sc-1yq09yz-0"
})(["white-space:nowrap;"]);
var Notification = function Notification(_ref) {
  var _theme$notification, _theme$notification2, _theme$notification3, _theme$notification4, _theme$notification5;
  var actionsProp = _ref.actions,
    messageProp = _ref.message,
    onClose = _ref.onClose,
    id = _ref.id,
    global = _ref.global,
    status = _ref.status,
    title = _ref.title,
    toast = _ref.toast,
    icon = _ref.icon,
    time = _ref.time,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var autoClose = toast && (toast == null ? void 0 : toast.autoClose) === undefined ? true : toast.autoClose;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useState = useState(true),
    visible = _useState[0],
    setVisible = _useState[1];
  var position = useMemo(function () {
    return toast && (toast == null ? void 0 : toast.position) || 'top';
  }, [toast]);
  var close = useCallback(function (event) {
    setVisible(false);
    if (onClose) onClose(event);
  }, [onClose]);
  useEffect(function () {
    if (autoClose) {
      var timer = setTimeout(close, time || theme.notification.toast.time || theme.notification.time);
      return function () {
        return clearTimeout(timer);
      };
    }
    return undefined;
  }, [autoClose, close, theme.notification.toast.time, theme.notification.time, time]);
  var CloseIcon = theme.notification.close.icon;
  var _ref2 = ((_theme$notification = theme.notification) == null ? void 0 : _theme$notification[status]) || theme.notification.unknown,
    StatusIcon = _ref2.icon,
    color = _ref2.color;
  var closeIconColor = theme.notification.close.color;
  var kind = useMemo(function () {
    if (toast) return 'toast';
    if (global) return 'global';
    return undefined;
  }, [global, toast]);
  var direction;
  if (kind && theme.notification[kind].direction) direction = theme.notification[kind].direction;else direction = theme.notification.direction;
  var background;
  if (kind && (_theme$notification2 = theme.notification) != null && (_theme$notification2 = _theme$notification2[status]) != null && (_theme$notification2 = _theme$notification2[kind]) != null && _theme$notification2.background) background = theme.notification[status][kind].background;else if ((_theme$notification3 = theme.notification) != null && (_theme$notification3 = _theme$notification3[status]) != null && _theme$notification3.background) background = theme.notification[status].background;else background = ((_theme$notification4 = theme.notification) == null || (_theme$notification4 = _theme$notification4[kind]) == null || (_theme$notification4 = _theme$notification4.container) == null ? void 0 : _theme$notification4.background) || theme.notification.container.background;
  var TextWrapper = direction === 'row' ? Text : Fragment;

  // notification is built with two child boxes that contain:
  // 1. icon + text (wrapped in button when clickable)
  // 2. close button
  // pad needs to be applied to the child boxes, but we don't want to apply
  // extra padding between the icon + text and the button.
  var pad;
  if (kind && theme.notification[kind].container.pad) pad = theme.notification[kind].container.pad;else pad = theme.notification.container.pad;
  var textPad;
  var closeButtonPad;
  if (onClose) {
    var _adaptThemeStyle = adaptThemeStyle(pad, theme);
    textPad = _adaptThemeStyle[0];
    closeButtonPad = _adaptThemeStyle[1];
  } else textPad = pad;
  var actions;
  var message = messageProp;
  if (actionsProp) actions = actionsProp.map(function (action) {
    return /*#__PURE__*/React.createElement(Fragment, {
      key: action.label
    }, /*#__PURE__*/React.createElement(NotificationAnchor
    // create space between first anchor and
    // text content and next anchor
    , _extends({
      margin: {
        right: 'xsmall'
      }
    }, action, theme.notification.actions)), ' ');
  });
  var Message = direction !== 'row' ? Paragraph : Text;
  if (message || actions) message = typeof message === 'string' ? /*#__PURE__*/React.createElement(Message, theme.notification.message, /*#__PURE__*/React.createElement(Text, {
    margin: {
      right: 'xsmall'
    }
  }, message), actions) : message;
  var iconDimension = ((_theme$notification5 = theme.notification) == null || (_theme$notification5 = _theme$notification5.message) == null ? void 0 : _theme$notification5.size) || 'medium';
  var content = /*#__PURE__*/React.createElement(Box, _extends({}, theme.notification.container, global ? _extends({}, theme.notification.global.container) : {}, toast ? _extends({}, theme.notification.toast.container) : {}, {
    background: background
    // let internal box control pad
    ,
    pad: undefined,
    direction: "row",
    gap: "small",
    id: toast ? undefined : id
  }, rest), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    pad: textPad,
    flex: true
  }, /*#__PURE__*/React.createElement(Box, theme.notification.iconContainer, icon || /*#__PURE__*/React.createElement(StatusIcon, {
    color: color,
    height: iconDimension
  })), /*#__PURE__*/React.createElement(Box, theme.notification.textContainer, /*#__PURE__*/React.createElement(TextWrapper, null, title && /*#__PURE__*/React.createElement(Text, theme.notification.title, title), message && title && direction === 'row' && /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0"), message))), onClose &&
  /*#__PURE__*/
  // theme.notification.container and textContainer may both have pad,
  // account for both
  React.createElement(Box, {
    pad: closeButtonPad
  }, /*#__PURE__*/React.createElement(Box, theme.notification.textContainer, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(CloseIcon, {
      color: closeIconColor,
      height: iconDimension,
      width: iconDimension
    }),
    onClick: close,
    hoverIndicator: true,
    plain: true
  }))));
  if (toast) {
    content = visible && /*#__PURE__*/React.createElement(Layer, _extends({}, theme.notification.toast.layer, {
      role: "log",
      modal: false,
      onEsc: onClose,
      id: id,
      responsive: false,
      plain: true,
      position: position
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