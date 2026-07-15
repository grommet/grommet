function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import { grommet } from 'grommet/themes';
import { AnnounceContext, Box, Grommet, Heading, Text } from 'grommet';
var Announcer = function Announcer(_ref) {
  var announce = _ref.announce,
    _ref$message = _ref.message,
    message = _ref$message === void 0 ? 'Here is a simple announcement. This will soon disappear' : _ref$message,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'polite' : _ref$mode,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? 'log' : _ref$role;
  React.useEffect(function () {
    var timeout = 3000;
    announce(message, mode, timeout);
  }, [announce, message, mode]);
  return /*#__PURE__*/React.createElement(Text, {
    align: "center",
    role: role,
    "aria-live": mode
  }, message);
};
Announcer.propTypes = {
  announce: PropTypes.func.isRequired,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string
};
var AnnounceContextComponent = function AnnounceContextComponent(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, /*#__PURE__*/React.createElement(Heading, null, "Welcome to announcement section"), /*#__PURE__*/React.createElement(AnnounceContext.Consumer, null, function (announce) {
    return /*#__PURE__*/React.createElement(Announcer, _extends({
      announce: announce
    }, props));
  })));
};
export var Assertive = function Assertive() {
  return /*#__PURE__*/React.createElement(AnnounceContextComponent, {
    message: "Turn on Accessibility feature to listen to this announcement. This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
};
export default {
  title: 'Utilities/AnnounceContext/Assertive'
};