var _excluded = ["id"],
  _excluded2 = ["color"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useState } from 'react';
import { Accordion, AccordionPanel, Anchor, Box, Button, Calendar, Chart, CheckBox, Clock, DataTable, Diagram, Distribution, FormField, Grid, Heading, MaskedInput, Menu, Meter, Paragraph, RadioButtonGroup, RangeInput, RangeSelector, Select, Stack, Tab, Tabs, Text, TextArea, TextInput, Video } from 'grommet';
import { FormNext } from "grommet-icons/es6/icons/FormNext";
var Node = function Node(_ref) {
  var id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
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
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    color: color || 'graph-0',
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};
var Components = function Components() {
  var _useState = useState(true),
    checkBox = _useState[0],
    setCheckBox = _useState[1];
  var _useState2 = useState(''),
    textInput = _useState2[0],
    setTextInput = _useState2[1];
  var _useState3 = useState(''),
    maskedInput = _useState3[0],
    setMaskedInput = _useState3[1];
  var _useState4 = useState('RadioButton 1'),
    radioButton = _useState4[0],
    setRadioButton = _useState4[1];
  var _useState5 = useState([1, 2]),
    rangeSelector = _useState5[0],
    setRangeSelector = _useState5[1];
  var _useState6 = useState(0),
    tabIndex = _useState6[0],
    setTabIndex = _useState6[1];
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
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "medium",
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "small",
    gap: "medium"
  }, content));
};
export var All = function All() {
  return /*#__PURE__*/React.createElement(Components, null);
};
export default {
  title: 'All'
};