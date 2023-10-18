"use strict";

exports.__esModule = true;
exports["default"] = exports.Global = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _Box = require("../../Box");
var _Text = require("../../Text");
var _data = require("../../NameValueList/stories/data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Global = exports.Global = function Global() {
  var _useState = (0, _react.useState)(true),
    showGlobalNotification = _useState[0],
    setShowGlobalNotification = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
    border: "bottom",
    pad: {
      horizontal: 'large',
      vertical: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
    size: "large",
    color: "plain"
  }), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    weight: "bold"
  }, "Company Name")), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.AppsRounded, null)
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
    gap: "medium"
  }, showGlobalNotification && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "warning",
    message: "Your supscription will expire in 7 days. Renew your\n            subscription to ensure you don't lose access.",
    onClose: function onClose() {
      return setShowGlobalNotification(false);
    },
    actions: [{
      href: '#',
      label: 'Renew Subscription'
    }],
    global: true
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: "large",
    margin: "auto",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    margin: "none"
  }, "Page Heading"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    alignSelf: "start",
    label: "Page-level Action",
    primary: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: "none"
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet vitae velit non cursus. Aliquam fringilla dapibus elit, non fermentum neque tempor non."), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    margin: "none",
    level: 2
  }, "Details"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, null, Object.entries(_data.data).map(function (_ref) {
    var name = _ref[0],
      value = _ref[1];
    return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
      key: name,
      name: name
    }, value);
  })))));
};
var _default = exports["default"] = {
  title: 'Visualizations/Notification/Global'
};