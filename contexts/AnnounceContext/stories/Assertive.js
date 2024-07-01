"use strict";

exports.__esModule = true;
exports["default"] = exports.Assertive = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _themes = require("grommet/themes");
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Announcer = function Announcer(_ref) {
  var announce = _ref.announce,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? 'Here is a simple announcement. This will soon disappear' : _ref$message,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'polite' : _ref$mode,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? 'log' : _ref$role;
  _react["default"].useEffect(function () {
    var timeout = 3000;
    announce(message, mode, timeout);
  }, [announce, message, mode]);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    align: "center",
    role: role,
    "aria-live": mode
  }, message);
};
Announcer.propTypes = {
  announce: _propTypes["default"].func.isRequired,
  message: _propTypes["default"].string,
  mode: _propTypes["default"].string,
  role: _propTypes["default"].string
};
var AnnounceContextComponent = function AnnounceContextComponent(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "Welcome to announcement section"), /*#__PURE__*/_react["default"].createElement(_grommet.AnnounceContext.Consumer, null, function (announce) {
    return /*#__PURE__*/_react["default"].createElement(Announcer, _extends({
      announce: announce
    }, props));
  })));
};
var Assertive = exports.Assertive = function Assertive() {
  return /*#__PURE__*/_react["default"].createElement(AnnounceContextComponent, {
    message: "Turn on Accessibility feature to listen to this announcement. This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
};
var _default = exports["default"] = {
  title: 'Utilities/AnnounceContext/Assertive'
};