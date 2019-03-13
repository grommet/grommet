function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Accordion, AccordionPanel, Anchor, Box, Button, Calendar, Chart, CheckBox, Clock, DataTable, Diagram, Distribution, FormField, Grid, Heading, Menu, Meter, Paragraph, RadioButtonGroup, RangeInput, RangeSelector, Select, Stack, Tab, Tabs, Text, TextArea, TextInput, Video } from 'grommet';
import { grommet, dark } from 'grommet/themes';
import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
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

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      color = _ref2.color,
      rest = _objectWithoutPropertiesLoose(_ref2, ["color"]);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    color: color || 'accent-1',
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};

var themes = {
  dark: dark,
  grommet: grommet,
  hpe: hpe,
  aruba: aruba,
  hp: hp,
  dxc: dxc,
  v1: v1
};

var Components =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Components, _Component);

  function Components() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      baseSize: 24,
      checkBox: true,
      radioButton: 'RadioButton 1',
      rangeSelector: [1, 2],
      themeName: 'grommet'
    });

    return _this;
  }

  var _proto = Components.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        background = _this$state.background,
        baseSize = _this$state.baseSize,
        checkBox = _this$state.checkBox,
        radioButton = _this$state.radioButton,
        rangeSelector = _this$state.rangeSelector,
        tabIndex = _this$state.tabIndex,
        themeName = _this$state.themeName;
    var theme = deepMerge(generate(baseSize), themes[themeName]);
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
        return _this2.setState({
          checkBox: event.target.checked
        });
      }
    }), React.createElement(CheckBox, {
      name: "toggle",
      toggle: true,
      checked: checkBox,
      label: "CheckBox toggle",
      onChange: function onChange(event) {
        return _this2.setState({
          checkBox: event.target.checked
        });
      }
    }), React.createElement(RadioButtonGroup, {
      name: "radio",
      options: ['RadioButton 1', 'RadioButton 2'],
      value: radioButton,
      onChange: function onChange(event) {
        return _this2.setState({
          radioButton: event.target.value
        });
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
        return _this2.setState({
          rangeSelector: values
        });
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
      type: "digital"
    }), React.createElement(Clock, null)), React.createElement(Box, {
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
        color: 'accent-1'
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
        return _this2.setState({
          tabIndex: index
        });
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
      options: ['grommet', 'dark', 'hpe', 'aruba', 'hp', 'dxc', 'v1'],
      value: themeName,
      onChange: function onChange(event) {
        return _this2.setState({
          themeName: event.option
        });
      }
    })), React.createElement(Box, {
      basis: "small"
    }, React.createElement(Select, {
      plain: true,
      placeholder: "background",
      size: "small",
      options: ['default', 'dark-1', 'light-1'],
      value: background,
      onChange: function onChange(event) {
        return _this2.setState({
          background: event.option
        });
      }
    })), React.createElement(Box, {
      basis: "small"
    }, React.createElement(RangeInput, {
      min: 16,
      max: 36,
      step: 2,
      value: baseSize,
      onChange: function onChange(event) {
        return _this2.setState({
          baseSize: parseInt(event.target.value, 10)
        });
      }
    })), React.createElement(Text, {
      size: "small"
    }, baseSize + "px base spacing"))), React.createElement(Grommet, {
      theme: theme,
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

  return Components;
}(Component);

storiesOf('Components', module).add('All', function () {
  return React.createElement(Components, null);
});