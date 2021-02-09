"use strict";

exports.__esModule = true;
exports["default"] = exports.All = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

var _base = require("grommet/themes/base");

var _utils = require("grommet/utils");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _grommetThemeAruba = require("grommet-theme-aruba");

var _grommetThemeHp = require("grommet-theme-hp");

var _grommetThemeDxc = require("grommet-theme-dxc");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "light-4"
  }, rest));
};

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      color = _ref2.color,
      rest = _objectWithoutPropertiesLoose(_ref2, ["color"]);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    color: color || 'graph-0',
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};

var themes = {
  grommet: _themes.grommet,
  hpe: _grommetThemeHpe.hpe,
  aruba: _grommetThemeAruba.aruba,
  hp: _grommetThemeHp.hp,
  dxc: _grommetThemeDxc.dxc
};

var Components = function Components() {
  var _useState = (0, _react.useState)(24),
      baseSize = _useState[0],
      setBaseSize = _useState[1];

  var _useState2 = (0, _react.useState)(true),
      checkBox = _useState2[0],
      setCheckBox = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      textInput = _useState3[0],
      setTextInput = _useState3[1];

  var _useState4 = (0, _react.useState)(''),
      maskedInput = _useState4[0],
      setMaskedInput = _useState4[1];

  var _useState5 = (0, _react.useState)('RadioButton 1'),
      radioButton = _useState5[0],
      setRadioButton = _useState5[1];

  var _useState6 = (0, _react.useState)([1, 2]),
      rangeSelector = _useState6[0],
      setRangeSelector = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      themeMode = _useState7[0],
      setThemeMode = _useState7[1];

  var _useState8 = (0, _react.useState)('grommet'),
      themeName = _useState8[0],
      setThemeName = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      background = _useState9[0],
      setBackground = _useState9[1];

  var _useState10 = (0, _react.useState)(0),
      tabIndex = _useState10[0],
      setTabIndex = _useState10[1];

  var theme = (0, _react.useMemo)(function () {
    return (0, _utils.deepMerge)((0, _base.generate)(baseSize), themes[themeName]);
  }, [baseSize, themeName]);
  var themeCanMode = (0, _react.useMemo)(function () {
    return theme && theme.global.colors.background && theme.global.colors.background.dark;
  }, [theme]);
  var content = [/*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "type",
    align: "start",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    margin: {
      top: 'none'
    }
  }, "Heading"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text"), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: ""
  }, "Anchor"), /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {},
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNext, null),
      reverse: true
    }, {
      label: 'Two'
    }, {
      label: 'Thirty Three and 1/3'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "plain button"))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "input",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Select",
    options: ['One', 'Two'],
    onChange: function onChange() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "check",
    checked: checkBox,
    label: "CheckBox",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    name: "toggle",
    toggle: true,
    checked: checkBox,
    label: "CheckBox toggle",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "radio",
    options: ['RadioButton 1', 'RadioButton 2'],
    value: radioButton,
    onChange: function onChange(event) {
      return setRadioButton(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput",
    suggestions: ['a', 'b', 'c'],
    value: textInput,
    onChange: function onChange(event) {
      return setTextInput(event.target.value);
    },
    onSelect: function onSelect(_ref3) {
      var suggestion = _ref3.suggestion;
      return setTextInput(suggestion);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    mask: [{
      length: [1, 4],
      options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
      regexp: /^\d{1,4}$/,
      placeholder: 'nnn'
    }, {
      fixed: ' '
    }, {
      length: 2,
      options: ['MB', 'GB', 'TB'],
      regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
      placeholder: 'gb'
    }],
    value: maskedInput,
    onChange: function onChange(event) {
      return setMaskedInput(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    placeholder: "TextArea"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    value: 24,
    onChange: function onChange() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3].map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, {
    direction: "horizontal",
    invert: false,
    min: 0,
    max: 3,
    size: "full",
    round: "small",
    values: rangeSelector,
    onChange: function onChange(values) {
      return setRangeSelector(values);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "FormField"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "time",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    type: "digital",
    className: "chromatic-ignore"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
    className: "chromatic-ignore"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "measure",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "bar",
    round: true,
    size: "small",
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "bar",
    round: true,
    size: "small",
    background: "light-3",
    values: [{
      value: 30
    }]
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "visualize",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Distribution, {
    basis: "small",
    values: [{
      value: 50,
      color: 'light-3'
    }, {
      value: 30,
      color: 'graph-0'
    }, {
      value: 20,
      color: 'light-4'
    }, {
      value: 10,
      color: 'light-3'
    }, {
      value: 5,
      color: 'light-4'
    }]
  }, function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, value.value));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [1, 2].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id
    });
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [3, 4].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id
    });
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Diagram, {
    connections: [connection('1', '4')]
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "dataTable",
    alignSelf: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: [{
      property: 'name',
      header: 'Name'
    }, {
      property: 'color',
      header: 'Color'
    }],
    data: [{
      name: 'Alan',
      color: 'blue'
    }, {
      name: 'Chris',
      color: 'purple'
    }, {
      name: 'Eric',
      color: 'orange'
    }],
    sortable: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "accordion"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, null, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Accordion panel 1 content"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Accordion panel 2 content"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "tabs"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
    activeIndex: tabIndex,
    onActive: function onActive(index) {
      return setTabIndex(index);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Tab 1 content"))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Tab 2 content"))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    key: "video",
    alignSelf: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Video, null, /*#__PURE__*/_react["default"].createElement("source", {
    src: "small.mp4",
    type: "video/mp4"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), /*#__PURE__*/_react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })))];
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "medium",
    justify: "end",
    align: "center",
    margin: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    plain: true,
    size: "small",
    options: Object.keys(themes),
    value: themeName,
    onChange: function onChange(event) {
      return setThemeName(event.option);
    }
  })), themeCanMode && /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    label: "dark",
    checked: themeMode === 'dark',
    onChange: function onChange() {
      return setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    }
  }), !themeCanMode && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    plain: true,
    placeholder: "background",
    size: "small",
    options: ['default', 'dark-1', 'light-1'],
    value: background,
    onChange: function onChange(event) {
      return setBackground(event.option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    min: 16,
    max: 36,
    step: 2,
    value: baseSize,
    onChange: function onChange(event) {
      return setBaseSize(parseInt(event.target.value, 10));
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, baseSize + "px base spacing"))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    themeMode: themeMode,
    style: {
      flex: '1 1'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "medium",
    background: background || theme.global.colors.background,
    overflow: "auto"
  }, _grommet.Grid.available ? /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "small",
    gap: "medium"
  }, content) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    wrap: true,
    align: "start",
    gap: "large"
  }, content))));
};

var All = function All() {
  return /*#__PURE__*/_react["default"].createElement(Components, null);
};

exports.All = All;
var _default = {
  title: 'All'
};
exports["default"] = _default;