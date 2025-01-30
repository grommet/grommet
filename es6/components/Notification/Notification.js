var _excluded = ["fill", "direction"],
  _excluded2 = ["actions", "message", "onClose", "id", "global", "status", "title", "toast", "icon", "time"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react';
import styled from 'styled-components';
import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { Button } from '../Button';
import { Layer } from '../Layer';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { NotificationType } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Message = function Message(_ref) {
  var fill = _ref.fill,
    direction = _ref.direction,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return direction === 'row' ? /*#__PURE__*/React.createElement(Text, rest) : /*#__PURE__*/React.createElement(Paragraph, _extends({}, rest, {
    fill: fill || false
  }));
};
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
var getTextColor = function getTextColor(part, status, kind, theme) {
  var _theme$notification, _theme$notification2, _theme$notification3, _theme$notification4, _theme$notification5;
  var color;
  if ((_theme$notification = theme.notification) != null && (_theme$notification = _theme$notification[status]) != null && (_theme$notification = _theme$notification[kind]) != null && (_theme$notification = _theme$notification[part]) != null && _theme$notification.color) color = (_theme$notification2 = theme.notification) == null || (_theme$notification2 = _theme$notification2[status]) == null || (_theme$notification2 = _theme$notification2[kind]) == null || (_theme$notification2 = _theme$notification2[part]) == null ? void 0 : _theme$notification2.color;else if ((_theme$notification3 = theme.notification) != null && (_theme$notification3 = _theme$notification3[status]) != null && (_theme$notification3 = _theme$notification3[part]) != null && _theme$notification3.color) color = (_theme$notification4 = theme.notification) == null || (_theme$notification4 = _theme$notification4[status]) == null || (_theme$notification4 = _theme$notification4[part]) == null ? void 0 : _theme$notification4.color;else color = (_theme$notification5 = theme.notification) == null || (_theme$notification5 = _theme$notification5[part]) == null ? void 0 : _theme$notification5.color;
  return color;
};
var NotificationAnchor = styled(Anchor).withConfig({
  displayName: "Notification__NotificationAnchor",
  componentId: "sc-1yq09yz-0"
})(["white-space:nowrap;"]);
var Notification = function Notification(_ref2) {
  var _theme$notification6, _theme$notification7, _theme$notification8, _theme$notification9, _theme$notification10;
  var actionsProp = _ref2.actions,
    messageProp = _ref2.message,
    onClose = _ref2.onClose,
    id = _ref2.id,
    global = _ref2.global,
    _ref2$status = _ref2.status,
    status = _ref2$status === void 0 ? 'unknown' : _ref2$status,
    title = _ref2.title,
    _ref2$toast = _ref2.toast,
    toast = _ref2$toast === void 0 ? false : _ref2$toast,
    icon = _ref2.icon,
    time = _ref2.time,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var autoClose = toast && (toast == null ? void 0 : toast.autoClose) === undefined ? true : toast.autoClose;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
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
  var _ref3 = ((_theme$notification6 = theme.notification) == null ? void 0 : _theme$notification6[status]) || theme.notification.unknown,
    StatusIcon = _ref3.icon,
    color = _ref3.color;
  var closeIconColor = theme.notification.close.color;
  var kind = useMemo(function () {
    if (toast) return 'toast';
    if (global) return 'global';
    return undefined;
  }, [global, toast]);
  var direction;
  if (kind && theme.notification[kind].direction) direction = theme.notification[kind].direction;else direction = theme.notification.direction;
  var background;
  if (kind && (_theme$notification7 = theme.notification) != null && (_theme$notification7 = _theme$notification7[status]) != null && (_theme$notification7 = _theme$notification7[kind]) != null && _theme$notification7.background) background = theme.notification[status][kind].background;else if ((_theme$notification8 = theme.notification) != null && (_theme$notification8 = _theme$notification8[status]) != null && _theme$notification8.background) background = theme.notification[status].background;else background = ((_theme$notification9 = theme.notification) == null || (_theme$notification9 = _theme$notification9[kind]) == null || (_theme$notification9 = _theme$notification9.container) == null ? void 0 : _theme$notification9.background) || theme.notification.container.background;
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
  var messageColor = getTextColor('message', status, kind, theme);
  var titleColor = getTextColor('title', status, kind, theme);
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
  if (message || actions) {
    message = typeof message === 'string' ? /*#__PURE__*/React.createElement(Message, _extends({}, theme.notification.message, {
      color: messageColor,
      direction: direction
    }), /*#__PURE__*/React.createElement(Text, {
      margin: {
        right: 'xsmall'
      }
    }, message), actions) : message;
  }
  var iconDimension = ((_theme$notification10 = theme.notification) == null || (_theme$notification10 = _theme$notification10.message) == null ? void 0 : _theme$notification10.size) || 'medium';
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
  })), /*#__PURE__*/React.createElement(Box, theme.notification.textContainer, /*#__PURE__*/React.createElement(TextWrapper, null, title && /*#__PURE__*/React.createElement(Text, _extends({}, theme.notification.title, {
    color: titleColor
  }), title), message && title && direction === 'row' && /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0"), message))), onClose &&
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
Notification.displayName = 'Notification';
Notification.propTypes = NotificationType;
export { Notification };