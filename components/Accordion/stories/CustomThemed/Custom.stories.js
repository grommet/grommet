"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _excluded = ["animate", "multiple"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var customAccordionTheme = {
  global: {
    font: {
      family: "-apple-system,\n       BlinkMacSystemFont,\n       \"Segoe UI\",\n       Roboto"
    }
  },
  accordion: {
    heading: {
      level: 3,
      margin: {
        vertical: '6px',
        horizontal: '24px'
      }
    },
    hover: {
      heading: {
        color: 'accent-2'
      },
      background: 'background-contrast'
    },
    icons: {
      collapse: _grommetIcons.SubtractCircle,
      expand: _grommetIcons.AddCircle,
      color: 'hotpink'
    },
    border: undefined
  }
};
var CustomAccordion = function CustomAccordion(_ref) {
  var animate = _ref.animate,
    multiple = _ref.multiple,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customAccordionTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({}, rest, {
    pad: "large",
    align: "center",
    justify: "center"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    animate: animate,
    multiple: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, "Panel 1 - uses large Text size")
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    height: "small"
  }, "Important Info")), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "xlarge",
      margin: "vertical"
    }, "Panel 2 - uses xlarge Text size")
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    height: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Important Info"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Panel 3 - uses custom theme heading level for sizing"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    height: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Important Info"))))));
};
var Custom = exports.Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(CustomAccordion, null);
};
var _default = exports["default"] = {
  title: 'Controls/Accordion/Custom Themed/Custom'
};