"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _excluded = ["animate", "multiple"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var customAccordionTheme = {
  global: {
    font: {
      family: "-apple-system,\n       BlinkMacSystemFont, \n       \"Segoe UI\", \n       Roboto"
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
      }
    },
    icons: {
      collapse: _grommetIcons.SubtractCircle,
      expand: _grommetIcons.AddCircle,
      color: 'hotpink'
    },
    border: undefined,
    panel: {// border: {
      //   side: 'horizontal',
      //   size: 'medium',
      //   color: '#DADADA',
      //   style: 'dotted',
      // },
    }
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

var Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(CustomAccordion, null);
};

exports.Custom = Custom;
var _default = {
  title: 'Controls/Accordion/Custom'
};
exports["default"] = _default;