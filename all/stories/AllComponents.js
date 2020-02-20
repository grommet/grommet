"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _base = require("grommet/themes/base");

var _utils = require("grommet/utils");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _grommetThemeHpeV = require("grommet-theme-hpe-v0");

var _grommetThemeAruba = require("grommet-theme-aruba");

var _grommetThemeHp = require("grommet-theme-hp");

var _grommetThemeDxc = require("grommet-theme-dxc");

var _grommetThemeV = require("grommet-theme-v1");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return _react["default"].createElement(_grommet.Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "light-4"
  }, rest));
};

var connection = function connection(fromTarget, toTarget, _ref2) {
  if (_ref2 === void 0) {
    _ref2 = {};
  }

  var _ref3 = _ref2,
      color = _ref3.color,
      rest = _objectWithoutPropertiesLoose(_ref3, ["color"]);

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
  dark: _themes.dark,
  grommet: _themes.grommet,
  hpe: _grommetThemeHpe.hpe,
  hpeV0: _grommetThemeHpeV.hpe,
  aruba: _grommetThemeAruba.aruba,
  hp: _grommetThemeHp.hp,
  dxc: _grommetThemeDxc.dxc,
  v1: _grommetThemeV.v1
};

var Components = function Components() {
  var _useState = (0, _react.useState)(24),
      baseSize = _useState[0],
      setBaseSize = _useState[1];

  var _useState2 = (0, _react.useState)(true),
      checkBox = _useState2[0],
      setCheckBox = _useState2[1];

  var _useState3 = (0, _react.useState)('RadioButton 1'),
      radioButton = _useState3[0],
      setRadioButton = _useState3[1];

  var _useState4 = (0, _react.useState)([1, 2]),
      rangeSelector = _useState4[0],
      setRangeSelector = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      themeMode = _useState5[0],
      setThemeMode = _useState5[1];

  var _useState6 = (0, _react.useState)('grommet'),
      themeName = _useState6[0],
      setThemeName = _useState6[1];

  var _useState7 = (0, _react.useState)(undefined),
      background = _useState7[0],
      setBackground = _useState7[1];

  var _useState8 = (0, _react.useState)(0),
      tabIndex = _useState8[0],
      setTabIndex = _useState8[1];

  var theme = (0, _react.useMemo)(function () {
    return (0, _utils.deepMerge)((0, _base.generate)(baseSize), themes[themeName]);
  }, [baseSize, themeName]);
  var themeCanMode = (0, _react.useMemo)(function () {
    return theme && theme.global.colors.background && theme.global.colors.background.dark;
  }, [theme]);
  var content = [_react["default"].createElement(_grommet.Box, {
    key: "type",
    align: "start"
  }, _react["default"].createElement(_grommet.Heading, {
    margin: {
      top: 'none'
    }
  }, "Heading"), _react["default"].createElement(_grommet.Paragraph, null, "Paragraph"), _react["default"].createElement(_grommet.Text, null, "Text"), _react["default"].createElement(_grommet.Anchor, {
    href: ""
  }, "Anchor"), _react["default"].createElement(_grommet.Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {}
    }, {
      label: 'Two'
    }]
  }), _react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  })), _react["default"].createElement(_grommet.Box, {
    key: "input",
    gap: "small"
  }, _react["default"].createElement(_grommet.Select, {
    placeholder: "Select",
    options: ['One', 'Two'],
    onChange: function onChange() {}
  }), _react["default"].createElement(_grommet.CheckBox, {
    name: "check",
    checked: checkBox,
    label: "CheckBox",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), _react["default"].createElement(_grommet.CheckBox, {
    name: "toggle",
    toggle: true,
    checked: checkBox,
    label: "CheckBox toggle",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), _react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "radio",
    options: ['RadioButton 1', 'RadioButton 2'],
    value: radioButton,
    onChange: function onChange(event) {
      return setRadioButton(event.target.value);
    }
  }), _react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput"
  }), _react["default"].createElement(_grommet.TextArea, {
    placeholder: "TextArea"
  }), _react["default"].createElement(_grommet.RangeInput, {
    value: 24,
    onChange: function onChange() {}
  }), _react["default"].createElement(_grommet.Stack, null, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3].map(function (value) {
    return _react["default"].createElement(_grommet.Box, {
      key: value,
      pad: "small"
    }, _react["default"].createElement(_grommet.Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), _react["default"].createElement(_grommet.RangeSelector, {
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
  })), _react["default"].createElement(_grommet.FormField, {
    label: "FormField"
  }, _react["default"].createElement(_grommet.TextInput, {
    placeholder: "TextInput"
  }))), _react["default"].createElement(_grommet.Box, {
    key: "time",
    gap: "medium"
  }, _react["default"].createElement(_grommet.Calendar, {
    size: "small"
  }), _react["default"].createElement(_grommet.Clock, {
    type: "digital",
    className: "chromatic-ignore"
  }), _react["default"].createElement(_grommet.Clock, {
    className: "chromatic-ignore"
  })), _react["default"].createElement(_grommet.Box, {
    key: "measure",
    gap: "medium"
  }, _react["default"].createElement(_grommet.Chart, {
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
  }), _react["default"].createElement(_grommet.Meter, {
    type: "bar",
    round: true,
    size: "small",
    background: "light-3",
    values: [{
      value: 30
    }]
  })), _react["default"].createElement(_grommet.Box, {
    key: "visualize",
    gap: "small"
  }, _react["default"].createElement(_grommet.Distribution, {
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
    return _react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, _react["default"].createElement(_grommet.Text, {
      size: "large"
    }, value.value));
  }), _react["default"].createElement(_grommet.Stack, null, _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [1, 2].map(function (id) {
    return _react["default"].createElement(Node, {
      key: id,
      id: id
    });
  })), _react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [3, 4].map(function (id) {
    return _react["default"].createElement(Node, {
      key: id,
      id: id
    });
  }))), _react["default"].createElement(_grommet.Diagram, {
    connections: [connection('1', '4')]
  }))), _react["default"].createElement(_grommet.Box, {
    key: "dataTable",
    alignSelf: "start"
  }, _react["default"].createElement(_grommet.DataTable, {
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
  })), _react["default"].createElement(_grommet.Box, {
    key: "accordion"
  }, _react["default"].createElement(_grommet.Accordion, null, _react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 1"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Text, null, "Accordion panel 1 content"))), _react["default"].createElement(_grommet.AccordionPanel, {
    label: "Accordion Panel 2"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Text, null, "Accordion panel 2 content"))))), _react["default"].createElement(_grommet.Box, {
    key: "tabs"
  }, _react["default"].createElement(_grommet.Tabs, {
    activeIndex: tabIndex,
    onActive: function onActive(index) {
      return setTabIndex(index);
    }
  }, _react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Text, null, "Tab 1 content"))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, _react["default"].createElement(_grommet.Text, null, "Tab 2 content"))))), _react["default"].createElement(_grommet.Box, {
    key: "video",
    alignSelf: "start"
  }, _react["default"].createElement(_grommet.Video, null, _react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), _react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), _react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.mp4",
    type: "video/mp4"
  }), _react["default"].createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })))];
  return _react["default"].createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    style: {
      flex: '0 0 auto'
    }
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "medium",
    justify: "end",
    align: "center",
    margin: "small"
  }, _react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, _react["default"].createElement(_grommet.Select, {
    plain: true,
    size: "small",
    options: ['grommet', 'dark', 'hpe', 'hpeV0', 'aruba', 'hp', 'dxc', 'v1'],
    value: themeName,
    onChange: function onChange(event) {
      return setThemeName(event.option);
    }
  })), themeCanMode && _react["default"].createElement(_grommet.CheckBox, {
    label: "dark",
    checked: themeMode === 'dark',
    onChange: function onChange() {
      return setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    }
  }), !themeCanMode && _react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, _react["default"].createElement(_grommet.Select, {
    plain: true,
    placeholder: "background",
    size: "small",
    options: ['default', 'dark-1', 'light-1'],
    value: background,
    onChange: function onChange(event) {
      return setBackground(event.option);
    }
  })), _react["default"].createElement(_grommet.Box, {
    basis: "small"
  }, _react["default"].createElement(_grommet.RangeInput, {
    min: 16,
    max: 36,
    step: 2,
    value: baseSize,
    onChange: function onChange(event) {
      return setBaseSize(parseInt(event.target.value, 10));
    }
  })), _react["default"].createElement(_grommet.Text, {
    size: "small"
  }, baseSize + "px base spacing"))), _react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    themeMode: themeMode,
    style: {
      flex: '1 1'
    }
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "medium",
    background: background || theme.global.colors.background,
    overflow: "auto"
  }, _grommet.Grid.available ? _react["default"].createElement(_grommet.Grid, {
    columns: "small",
    gap: "medium"
  }, content) : _react["default"].createElement(_grommet.Box, {
    direction: "row",
    wrap: true,
    align: "start",
    gap: "large"
  }, content))));
};

(0, _react2.storiesOf)('All', module).add('All', function () {
  return _react["default"].createElement(Components, null);
});