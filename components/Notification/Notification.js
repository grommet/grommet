"use strict";

exports.__esModule = true;
exports.Notification = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Anchor = require("../Anchor");
var _Box = require("../Box");
var _Button = require("../Button");
var _Layer = require("../Layer");
var _Paragraph = require("../Paragraph");
var _Text = require("../Text");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["actions", "message", "onClose", "id", "global", "status", "title", "toast", "icon", "time"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
var NotificationAnchor = (0, _styledComponents["default"])(_Anchor.Anchor).withConfig({
  displayName: "Notification__NotificationAnchor",
  componentId: "sc-1yq09yz-0"
})(["white-space:nowrap;"]);
var Notification = exports.Notification = function Notification(_ref) {
  var _theme$notification, _theme$notification2, _theme$notification3, _theme$notification4, _theme$notification5;
  var actionsProp = _ref.actions,
    messageProp = _ref.message,
    onClose = _ref.onClose,
    id = _ref.id,
    global = _ref.global,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? 'unknown' : _ref$status,
    title = _ref.title,
    _ref$toast = _ref.toast,
    toast = _ref$toast === void 0 ? false : _ref$toast,
    icon = _ref.icon,
    time = _ref.time,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var autoClose = toast && (toast == null ? void 0 : toast.autoClose) === undefined ? true : toast.autoClose;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(true),
    visible = _useState[0],
    setVisible = _useState[1];
  var position = (0, _react.useMemo)(function () {
    return toast && (toast == null ? void 0 : toast.position) || 'top';
  }, [toast]);
  var close = (0, _react.useCallback)(function (event) {
    setVisible(false);
    if (onClose) onClose(event);
  }, [onClose]);
  (0, _react.useEffect)(function () {
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
  var kind = (0, _react.useMemo)(function () {
    if (toast) return 'toast';
    if (global) return 'global';
    return undefined;
  }, [global, toast]);
  var direction;
  if (kind && theme.notification[kind].direction) direction = theme.notification[kind].direction;else direction = theme.notification.direction;
  var background;
  if (kind && (_theme$notification2 = theme.notification) != null && (_theme$notification2 = _theme$notification2[status]) != null && (_theme$notification2 = _theme$notification2[kind]) != null && _theme$notification2.background) background = theme.notification[status][kind].background;else if ((_theme$notification3 = theme.notification) != null && (_theme$notification3 = _theme$notification3[status]) != null && _theme$notification3.background) background = theme.notification[status].background;else background = ((_theme$notification4 = theme.notification) == null || (_theme$notification4 = _theme$notification4[kind]) == null || (_theme$notification4 = _theme$notification4.container) == null ? void 0 : _theme$notification4.background) || theme.notification.container.background;
  var TextWrapper = direction === 'row' ? _Text.Text : _react.Fragment;

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
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: action.label
    }, /*#__PURE__*/_react["default"].createElement(NotificationAnchor
    // create space between first anchor and
    // text content and next anchor
    , _extends({
      margin: {
        right: 'xsmall'
      }
    }, action, theme.notification.actions)), ' ');
  });
  var Message = direction !== 'row' ? _Paragraph.Paragraph : _Text.Text;
  if (message || actions) message = typeof message === 'string' ? /*#__PURE__*/_react["default"].createElement(Message, theme.notification.message, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    margin: {
      right: 'xsmall'
    }
  }, message), actions) : message;
  var iconDimension = ((_theme$notification5 = theme.notification) == null || (_theme$notification5 = _theme$notification5.message) == null ? void 0 : _theme$notification5.size) || 'medium';
  var content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.notification.container, global ? _extends({}, theme.notification.global.container) : {}, toast ? _extends({}, theme.notification.toast.container) : {}, {
    background: background
    // let internal box control pad
    ,
    pad: undefined,
    direction: "row",
    gap: "small",
    id: toast ? undefined : id
  }, rest), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    pad: textPad,
    flex: true
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.notification.iconContainer, icon || /*#__PURE__*/_react["default"].createElement(StatusIcon, {
    color: color,
    height: iconDimension
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.notification.textContainer, /*#__PURE__*/_react["default"].createElement(TextWrapper, null, title && /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.notification.title, title), message && title && direction === 'row' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\xA0"), message))), onClose &&
  /*#__PURE__*/
  // theme.notification.container and textContainer may both have pad,
  // account for both
  _react["default"].createElement(_Box.Box, {
    pad: closeButtonPad
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.notification.textContainer, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(CloseIcon, {
      color: closeIconColor,
      height: iconDimension,
      width: iconDimension
    }),
    onClick: close,
    hoverIndicator: true,
    plain: true
  }))));
  if (toast) {
    content = visible && /*#__PURE__*/_react["default"].createElement(_Layer.Layer, _extends({}, theme.notification.toast.layer, {
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
Notification.propTypes = _propTypes.NotificationType;