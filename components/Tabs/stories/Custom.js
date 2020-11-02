"use strict";

exports.__esModule = true;
exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _Rich = require("./Rich");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    edgeSize: {
      small: '10px'
    },
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)'
      }
    }
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1'
    },
    background: 'dark-3',
    border: undefined,
    color: 'white',
    hover: {
      background: 'dark-1'
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: 'small'
    },
    extend: function extend(_ref) {
      var theme = _ref.theme;
      return (0, _styledComponents.css)(["border-radius:4px;box-shadow:0px 1px 5px rgba(0,0,0,0.5);"]);
    }
  },
  tabs: {
    background: 'dark-3',
    gap: 'medium',
    header: {
      background: 'dark-2',
      extend: function extend(_ref2) {
        var theme = _ref2.theme;
        return (0, _styledComponents.css)(["padding:10px;box-shadow:0px 3px 8px rgba(0,0,0,0.50);"]);
      }
    },
    panel: {
      extend: function extend(_ref3) {
        var theme = _ref3.theme;
        return (0, _styledComponents.css)(["padding:48px;box-shadow:0px 3px 8px rgba(0,0,0,0.50);"]);
      }
    }
  }
});

var CustomTabs = function CustomTabs() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, null, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: /*#__PURE__*/_react["default"].createElement(_Rich.RichTabTitle, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.CircleInformation, {
        color: "accent-1"
      }),
      label: "Personal Data"
    })
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Name"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "Enter your name..."
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: /*#__PURE__*/_react["default"].createElement(_Rich.RichTabTitle, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Currency, {
        color: "light-3"
      }),
      label: "Payment"
    })
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Card Number"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "Enter your card number..."
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Simple Tab"
  }, "This Tab has a different styling than the RichTabTitle (e.g tab.active.color)")));
};

var Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(CustomTabs, null);
};

exports.Custom = Custom;