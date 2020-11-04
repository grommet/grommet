"use strict";

exports.__esModule = true;
exports["default"] = exports.Assertive = exports.Polite = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Announcer = function Announcer(_ref) {
  var announce = _ref.announce,
      message = _ref.message,
      mode = _ref.mode,
      role = _ref.role;

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
Announcer.defaultProps = {
  message: 'Here is a simple announcement. This will soon disappear',
  mode: 'polite',
  role: 'log'
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

var Polite = function Polite() {
  return /*#__PURE__*/_react["default"].createElement(AnnounceContextComponent, null);
};

exports.Polite = Polite;

var Assertive = function Assertive() {
  return /*#__PURE__*/_react["default"].createElement(AnnounceContextComponent, {
    message: "Turn on Accessibility feature to listen to this announcement. This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
};

exports.Assertive = Assertive;
var _default = {
  title: 'Utilities/AnnounceContext'
};
exports["default"] = _default;