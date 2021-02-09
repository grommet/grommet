function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import { Grommet, Accordion, AccordionPanel, Anchor, Box, Button, Calendar, Chart, CheckBox, Clock, DataTable, Diagram, Distribution, FormField, Grid, Heading, MaskedInput, Menu, Meter, Paragraph, RadioButtonGroup, RangeInput, RangeSelector, Select, Stack, Tab, Tabs, Text, TextArea, TextInput, Video } from 'grommet';
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { grommet } from 'grommet/themes';
import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { aruba } from 'grommet-theme-aruba';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return /*#__PURE__*/React.createElement(Box, _extends({
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
  grommet: grommet,
  hpe: hpe,
  aruba: aruba,
  hp: hp,
  dxc: dxc
};

var Components = function Components() {
  var _useState = useState(24),
      baseSize = _useState[0],
      setBaseSize = _useState[1];

  var _useState2 = useState(true),
      checkBox = _useState2[0],
      setCheckBox = _useState2[1];

  var _useState3 = useState(''),
      textInput = _useState3[0],
      setTextInput = _useState3[1];

  var _useState4 = useState(''),
      maskedInput = _useState4[0],
      setMaskedInput = _useState4[1];

  var _useState5 = useState('RadioButton 1'),
      radioButton = _useState5[0],
      setRadioButton = _useState5[1];

  var _useState6 = useState([1, 2]),
      rangeSelector = _useState6[0],
      setRangeSelector = _useState6[1];

  var _useState7 = useState(),
      themeMode = _useState7[0],
      setThemeMode = _useState7[1];

  var _useState8 = useState('grommet'),
      themeName = _useState8[0],
      setThemeName = _useState8[1];

  var _useState9 = useState(undefined),
      background = _useState9[0],
      setBackground = _useState9[1];

  var _useState10 = useState(0),
      tabIndex = _useState10[0],
      setTabIndex = _useState10[1];

  var theme = useMemo(function () {
    return deepMerge(generate(baseSize), themes[themeName]);
  }, [baseSize, themeName]);
  var themeCanMode = useMemo(function () {
    return theme && theme.global.colors.background && theme.global.colors.background.dark;
  }, [theme]);
  var content = [/*#__PURE__*/React.createElement(Box, {
    key: "type",
    align: "start",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Heading, {
    margin: {
      top: 'none'
    }
  }, "Heading"), /*#__PURE__*/React.createElement(Paragraph, null, "Paragraph"), /*#__PURE__*/React.createElement(Text, null, "Text"), /*#__PURE__*/React.createElement(Anchor, {
    href: ""
  }, "Anchor"), /*#__PURE__*/React.createElement(Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {},
      icon: /*#__PURE__*/React.createElement(FormNext, null),
      reverse: true
    }, {
      label: 'Two'
    }, {
      label: 'Thirty Three and 1/3'
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/React.createElement(Text, null, "plain button"))), /*#__PURE__*/React.createElement(Box, {
    key: "input",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Select",
    options: ['One', 'Two'],
    onChange: function onChange() {}
  }), /*#__PURE__*/React.createElement(CheckBox, {
    name: "check",
    checked: checkBox,
    label: "CheckBox",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/React.createElement(CheckBox, {
    name: "toggle",
    toggle: true,
    checked: checkBox,
    label: "CheckBox toggle",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), /*#__PURE__*/React.createElement(RadioButtonGroup, {
    name: "radio",
    options: ['RadioButton 1', 'RadioButton 2'],
    value: radioButton,
    onChange: function onChange(event) {
      return setRadioButton(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(TextInput, {
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
  }), /*#__PURE__*/React.createElement(MaskedInput, {
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
  }), /*#__PURE__*/React.createElement(TextArea, {
    placeholder: "TextArea"
  }), /*#__PURE__*/React.createElement(RangeInput, {
    value: 24,
    onChange: function onChange() {}
  }), /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3].map(function (value) {
    return /*#__PURE__*/React.createElement(Box, {
      key: value,
      pad: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), /*#__PURE__*/React.createElement(RangeSelector, {
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
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "FormField"
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "TextInput"
  }))), /*#__PURE__*/React.createElement(Box, {
    key: "time",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Calendar, {
    size: "small"
  }), /*#__PURE__*/React.createElement(Clock, {
    type: "digital",
    className: "chromatic-ignore"
  }), /*#__PURE__*/React.createElement(Clock, {
    className: "chromatic-ignore"
  })), /*#__PURE__*/React.createElement(Box, {
    key: "measure",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Chart, {
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
  }), /*#__PURE__*/React.createElement(Meter, {
    type: "bar",
    round: true,
    size: "small",
    background: "light-3",
    values: [{
      value: 30
    }]
  })), /*#__PURE__*/React.createElement(Box, {
    key: "visualize",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Distribution, {
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
    return /*#__PURE__*/React.createElement(Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, value.value));
  }), /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, [1, 2].map(function (id) {
    return /*#__PURE__*/React.createElement(Node, {
      key: id,
      id: id
    });
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, [3, 4].map(function (id) {
    return /*#__PURE__*/React.createElement(Node, {
      key: id,
      id: id
    });
  }))), /*#__PURE__*/React.createElement(Diagram, {
    connections: [connection('1', '4')]
  }))), /*#__PURE__*/React.createElement(Box, {
    key: "dataTable",
    alignSelf: "start"
  }, /*#__PURE__*/React.createElement(DataTable, {
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
  })), /*#__PURE__*/React.createElement(Box, {
    key: "accordion"
  }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Accordion Panel 1"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Accordion panel 1 content"))), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Accordion Panel 2"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Accordion panel 2 content"))))), /*#__PURE__*/React.createElement(Box, {
    key: "tabs"
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeIndex: tabIndex,
    onActive: function onActive(index) {
      return setTabIndex(index);
    }
  }, /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Tab 1 content"))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Tab 2 content"))))), /*#__PURE__*/React.createElement(Box, {
    key: "video",
    alignSelf: "start"
  }, /*#__PURE__*/React.createElement(Video, null, /*#__PURE__*/React.createElement("source", {
    src: "small.mp4",
    type: "video/mp4"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })))];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "medium",
    justify: "end",
    align: "center",
    margin: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    basis: "small"
  }, /*#__PURE__*/React.createElement(Select, {
    plain: true,
    size: "small",
    options: Object.keys(themes),
    value: themeName,
    onChange: function onChange(event) {
      return setThemeName(event.option);
    }
  })), themeCanMode && /*#__PURE__*/React.createElement(CheckBox, {
    label: "dark",
    checked: themeMode === 'dark',
    onChange: function onChange() {
      return setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    }
  }), !themeCanMode && /*#__PURE__*/React.createElement(Box, {
    basis: "small"
  }, /*#__PURE__*/React.createElement(Select, {
    plain: true,
    placeholder: "background",
    size: "small",
    options: ['default', 'dark-1', 'light-1'],
    value: background,
    onChange: function onChange(event) {
      return setBackground(event.option);
    }
  })), /*#__PURE__*/React.createElement(Box, {
    basis: "small"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    min: 16,
    max: 36,
    step: 2,
    value: baseSize,
    onChange: function onChange(event) {
      return setBaseSize(parseInt(event.target.value, 10));
    }
  })), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, baseSize + "px base spacing"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: theme,
    themeMode: themeMode,
    style: {
      flex: '1 1'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "medium",
    background: background || theme.global.colors.background,
    overflow: "auto"
  }, Grid.available ? /*#__PURE__*/React.createElement(Grid, {
    columns: "small",
    gap: "medium"
  }, content) : /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    wrap: true,
    align: "start",
    gap: "large"
  }, content))));
};

export var All = function All() {
  return /*#__PURE__*/React.createElement(Components, null);
};
export default {
  title: 'All'
};