"use strict";

exports.__esModule = true;
exports.Notification = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Layer = require("../Layer");

var _Paragraph = require("../Paragraph");

var _Text = require("../Text");

var _propTypes = require("./propTypes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Notification = function Notification(_ref) {
  var message = _ref.message,
      onClose = _ref.onClose,
      status = _ref.status,
      title = _ref.title,
      toast = _ref.toast;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(true),
      visible = _useState[0],
      setVisible = _useState[1];

  var close = (0, _react.useCallback)(function () {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);
  (0, _react.useEffect)(function () {
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

  var content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.notification.container, toast ? _extends({}, theme.notification.toast.container) : {}, {
    direction: "row"
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.notification.iconContainer, /*#__PURE__*/_react["default"].createElement(StatusIcon, {
    color: color
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.notification.textContainer, {
    align: "start",
    direction: "row",
    justify: "between",
    flex: true
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, null, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.notification.title, title), message && /*#__PURE__*/_react["default"].createElement(_Paragraph.Paragraph, theme.notification.message, message)), onClose && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(CloseIcon, {
      color: closeIconColor
    }),
    onClick: close,
    plain: true
  })));

  if (toast) {
    content = visible && /*#__PURE__*/_react["default"].createElement(_Layer.Layer, _extends({}, theme.notification.toast.layer, {
      role: "log",
      modal: false,
      onEsc: onClose,
      responsive: true,
      plain: true
    }), content);
  }

  return content;
};

exports.Notification = Notification;
Notification.defaultProps = {
  status: 'unknown',
  toast: false
};
Object.setPrototypeOf(Notification.defaultProps, _defaultProps.defaultProps);
Notification.displayName = 'Notification';
Notification.propTypes = _propTypes.NotificationType;