"use strict";

exports.__esModule = true;
exports["default"] = exports.States = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var colors = {
  'background-contrast': '#0000000A',
  text: '#444444',
  'text-strong': '#000000',
  'text-weak': '#BBBBBB',
  border: '#999999',
  'border-strong': '#666666',
  'border-weak': '#BBBBBB',
  'active-background': 'background-contrast',
  'active-text': 'text'
};
var customTheme = {
  global: {
    colors: colors
  },
  tab: {
    border: {
      disabled: {
        color: 'border-weak'
      }
    },
    disabled: {
      color: 'text-weak'
    }
  }
};
var customThemeWithButtonDefault = {
  global: {
    colors: colors
  },
  button: {
    /* When theme.button.default is defined, Button relies on
     * <StyledButtonKind /> for implementation. It is being included
     * in this story to demonstrate and test Tab states which utilize
     * <StyledButtonKind /> in its implementation.
     */
    "default": {}
  },
  tab: {
    color: 'text-strong',
    active: {
      background: 'background-contrast'
    },
    border: {
      side: 'bottom',
      color: 'border',
      active: {
        color: 'border-strong'
      },
      disabled: {
        color: 'border-weak'
      },
      hover: {
        color: 'border'
      }
    },
    disabled: {
      color: 'text-weak'
    },
    hover: {
      background: 'background-contrast',
      color: 'text'
    },
    pad: 'small',
    margin: {
      horizontal: 'none'
    }
  }
};

var TabsExample = function TabsExample(_ref) {
  var label = _ref.label;

  var _useState = (0, _react.useState)(0),
      index = _useState[0],
      setIndex = _useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, label), /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
    activeIndex: index,
    onActive: onActive
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: index === 0 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, "The first tab is active.")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: index === 1 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, "The second tab is active.")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: index === 2 ? 'Active' : 'Enabled'
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, "The third tab is active.")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Disabled",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, "This tab is disabled."))));
};

var TabStates = function TabStates() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "large",
    width: {
      max: 'large'
    }
  }, /*#__PURE__*/_react["default"].createElement(TabsExample, {
    label: "Grommet Default"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: customTheme
  }, /*#__PURE__*/_react["default"].createElement(TabsExample, {
    label: "Customized Disabled State"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: customThemeWithButtonDefault
  }, /*#__PURE__*/_react["default"].createElement(TabsExample, {
    label: "Customized Disabled State with 'theme.button.default' Defined"
  }))));
};

var States = function States() {
  return /*#__PURE__*/_react["default"].createElement(TabStates, null);
};

exports.States = States;
var _default = {
  title: 'Controls/Tabs/States'
};
exports["default"] = _default;