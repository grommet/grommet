function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Accordion, AccordionPanel, Anchor, Box, Button, Calendar, Chart, CheckBox, Clock, DataTable, Diagram, Distribution, FormField, Grid, Heading, Menu, Meter, Paragraph, RadioButtonGroup, RangeInput, RangeSelector, Select, Stack, Tab, Tabs, Text, TextArea, TextInput, Video } from 'grommet';
import { grommet, dark } from 'grommet/themes';
import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeV0 } from 'grommet-theme-hpe-v0';
import { aruba } from 'grommet-theme-aruba';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';
import { v1 } from 'grommet-theme-v1';

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, ["id"]);

  return React.createElement(Box, _extends({
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
  dark: dark,
  grommet: grommet,
  hpe: hpe,
  hpeV0: hpeV0,
  aruba: aruba,
  hp: hp,
  dxc: dxc,
  v1: v1
};

var Components = function Components() {
  var _useState = useState(24),
      baseSize = _useState[0],
      setBaseSize = _useState[1];

  var _useState2 = useState(true),
      checkBox = _useState2[0],
      setCheckBox = _useState2[1];

  var _useState3 = useState('RadioButton 1'),
      radioButton = _useState3[0],
      setRadioButton = _useState3[1];

  var _useState4 = useState([1, 2]),
      rangeSelector = _useState4[0],
      setRangeSelector = _useState4[1];

  var _useState5 = useState(),
      themeMode = _useState5[0],
      setThemeMode = _useState5[1];

  var _useState6 = useState('grommet'),
      themeName = _useState6[0],
      setThemeName = _useState6[1];

  var _useState7 = useState(undefined),
      background = _useState7[0],
      setBackground = _useState7[1];

  var _useState8 = useState(0),
      tabIndex = _useState8[0],
      setTabIndex = _useState8[1];

  var theme = useMemo(function () {
    return deepMerge(generate(baseSize), themes[themeName]);
  }, [baseSize, themeName]);
  var themeCanMode = useMemo(function () {
    return theme && theme.global.colors.background && theme.global.colors.background.dark;
  }, [theme]);
  var content = [React.createElement(Box, {
    key: "type",
    align: "start"
  }, React.createElement(Heading, {
    margin: {
      top: 'none'
    }
  }, "Heading"), React.createElement(Paragraph, null, "Paragraph"), React.createElement(Text, null, "Text"), React.createElement(Anchor, {
    href: ""
  }, "Anchor"), React.createElement(Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {}
    }, {
      label: 'Two'
    }]
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    key: "input",
    gap: "small"
  }, React.createElement(Select, {
    placeholder: "Select",
    options: ['One', 'Two'],
    onChange: function onChange() {}
  }), React.createElement(CheckBox, {
    name: "check",
    checked: checkBox,
    label: "CheckBox",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), React.createElement(CheckBox, {
    name: "toggle",
    toggle: true,
    checked: checkBox,
    label: "CheckBox toggle",
    onChange: function onChange(event) {
      return setCheckBox(event.target.checked);
    }
  }), React.createElement(RadioButtonGroup, {
    name: "radio",
    options: ['RadioButton 1', 'RadioButton 2'],
    value: radioButton,
    onChange: function onChange(event) {
      return setRadioButton(event.target.value);
    }
  }), React.createElement(TextInput, {
    placeholder: "TextInput"
  }), React.createElement(TextArea, {
    placeholder: "TextArea"
  }), React.createElement(RangeInput, {
    value: 24,
    onChange: function onChange() {}
  }), React.createElement(Stack, null, React.createElement(Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3].map(function (value) {
    return React.createElement(Box, {
      key: value,
      pad: "small"
    }, React.createElement(Text, {
      style: {
        fontFamily: 'monospace'
      }
    }, value));
  })), React.createElement(RangeSelector, {
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
  })), React.createElement(FormField, {
    label: "FormField"
  }, React.createElement(TextInput, {
    placeholder: "TextInput"
  }))), React.createElement(Box, {
    key: "time",
    gap: "medium"
  }, React.createElement(Calendar, {
    size: "small"
  }), React.createElement(Clock, {
    type: "digital",
    className: "chromatic-ignore"
  }), React.createElement(Clock, {
    className: "chromatic-ignore"
  })), React.createElement(Box, {
    key: "measure",
    gap: "medium"
  }, React.createElement(Chart, {
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
  }), React.createElement(Meter, {
    type: "bar",
    round: true,
    size: "small",
    background: "light-3",
    values: [{
      value: 30
    }]
  })), React.createElement(Box, {
    key: "visualize",
    gap: "small"
  }, React.createElement(Distribution, {
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
    return React.createElement(Box, {
      pad: "xsmall",
      background: value.color,
      fill: true
    }, React.createElement(Text, {
      size: "large"
    }, value.value));
  }), React.createElement(Stack, null, React.createElement(Box, null, React.createElement(Box, {
    direction: "row"
  }, [1, 2].map(function (id) {
    return React.createElement(Node, {
      key: id,
      id: id
    });
  })), React.createElement(Box, {
    direction: "row"
  }, [3, 4].map(function (id) {
    return React.createElement(Node, {
      key: id,
      id: id
    });
  }))), React.createElement(Diagram, {
    connections: [connection('1', '4')]
  }))), React.createElement(Box, {
    key: "dataTable",
    alignSelf: "start"
  }, React.createElement(DataTable, {
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
  })), React.createElement(Box, {
    key: "accordion"
  }, React.createElement(Accordion, null, React.createElement(AccordionPanel, {
    label: "Accordion Panel 1"
  }, React.createElement(Box, {
    pad: "small"
  }, React.createElement(Text, null, "Accordion panel 1 content"))), React.createElement(AccordionPanel, {
    label: "Accordion Panel 2"
  }, React.createElement(Box, {
    pad: "small"
  }, React.createElement(Text, null, "Accordion panel 2 content"))))), React.createElement(Box, {
    key: "tabs"
  }, React.createElement(Tabs, {
    activeIndex: tabIndex,
    onActive: function onActive(index) {
      return setTabIndex(index);
    }
  }, React.createElement(Tab, {
    title: "Tab 1"
  }, React.createElement(Box, {
    pad: "small"
  }, React.createElement(Text, null, "Tab 1 content"))), React.createElement(Tab, {
    title: "Tab 2"
  }, React.createElement(Box, {
    pad: "small"
  }, React.createElement(Text, null, "Tab 2 content"))))), React.createElement(Box, {
    key: "video",
    alignSelf: "start"
  }, React.createElement(Video, null, React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.mp4",
    type: "video/mp4"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })))];
  return React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement(Grommet, {
    theme: grommet,
    style: {
      flex: '0 0 auto'
    }
  }, React.createElement(Box, {
    direction: "row-responsive",
    gap: "medium",
    justify: "end",
    align: "center",
    margin: "small"
  }, React.createElement(Box, {
    basis: "small"
  }, React.createElement(Select, {
    plain: true,
    size: "small",
    options: ['grommet', 'dark', 'hpe', 'hpeV0', 'aruba', 'hp', 'dxc', 'v1'],
    value: themeName,
    onChange: function onChange(event) {
      return setThemeName(event.option);
    }
  })), themeCanMode && React.createElement(CheckBox, {
    label: "dark",
    checked: themeMode === 'dark',
    onChange: function onChange() {
      return setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    }
  }), !themeCanMode && React.createElement(Box, {
    basis: "small"
  }, React.createElement(Select, {
    plain: true,
    placeholder: "background",
    size: "small",
    options: ['default', 'dark-1', 'light-1'],
    value: background,
    onChange: function onChange(event) {
      return setBackground(event.option);
    }
  })), React.createElement(Box, {
    basis: "small"
  }, React.createElement(RangeInput, {
    min: 16,
    max: 36,
    step: 2,
    value: baseSize,
    onChange: function onChange(event) {
      return setBaseSize(parseInt(event.target.value, 10));
    }
  })), React.createElement(Text, {
    size: "small"
  }, baseSize + "px base spacing"))), React.createElement(Grommet, {
    theme: theme,
    themeMode: themeMode,
    style: {
      flex: '1 1'
    }
  }, React.createElement(Box, {
    fill: true,
    pad: "medium",
    background: background || theme.global.colors.background,
    overflow: "auto"
  }, Grid.available ? React.createElement(Grid, {
    columns: "small",
    gap: "medium"
  }, content) : React.createElement(Box, {
    direction: "row",
    wrap: true,
    align: "start",
    gap: "large"
  }, content))));
};

storiesOf('All', module).add('All', function () {
  return React.createElement(Components, null);
});