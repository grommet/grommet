"use strict";

exports.__esModule = true;
exports["default"] = exports.States = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var States = exports.States = function States() {
  return /*#__PURE__*/_react["default"].createElement(TabStates, null);
};
var _default = exports["default"] = {
  title: 'Controls/Tabs/Custom Themed/States'
};