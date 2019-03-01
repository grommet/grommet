function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var SimpleRadioButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRadioButton, _Component);

  function SimpleRadioButton(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        selected: event.target.value
      });
    });

    _this.state = {
      selected: props.selected
    };
    return _this;
  }

  var _proto = SimpleRadioButton.prototype;

  _proto.render = function render() {
    var selected = this.state.selected;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large",
      gap: "small"
    }, React.createElement(RadioButton, _extends({
      label: "Choice 1",
      name: "radio",
      value: "c1",
      checked: selected === 'c1',
      onChange: this.onChange
    }, this.props)), React.createElement(RadioButton, _extends({
      label: "Choice 2",
      name: "radio",
      value: "c2",
      checked: selected === 'c2',
      onChange: this.onChange
    }, this.props))));
  };

  return SimpleRadioButton;
}(Component);

var customTheme = deepMerge(grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-3'
      }
    },
    check: {
      color: {
        light: 'neutral-1'
      }
    },
    icon: {
      size: '10px'
    }
  }
});

var CustomRadioButton =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(CustomRadioButton, _Component2);

  function CustomRadioButton() {
    var _this2;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      selected: undefined
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
      return _this2.setState({
        selected: event.target.value
      });
    });

    return _this2;
  }

  var _proto2 = CustomRadioButton.prototype;

  _proto2.render = function render() {
    var selected = this.state.selected;
    return React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Box, {
      align: "center",
      pad: "large",
      gap: "small"
    }, React.createElement(RadioButton, {
      label: "Choice 1",
      name: "radio",
      value: "c1",
      checked: selected === 'c1',
      onChange: this.onChange
    }), React.createElement(RadioButton, {
      label: "Choice 2",
      name: "radio",
      value: "c2",
      checked: selected === 'c2',
      onChange: this.onChange
    })));
  };

  return CustomRadioButton;
}(Component);

var CheckBoxInsideButton =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(CheckBoxInsideButton, _Component3);

  function CheckBoxInsideButton() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      selected: undefined
    });

    return _this3;
  }

  var _proto3 = CheckBoxInsideButton.prototype;

  _proto3.render = function render() {
    var _this4 = this;

    var selected = this.state.selected;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        if (selected) {
          _this4.setState({
            selected: undefined
          });
        } else {
          _this4.setState({
            selected: 'c1'
          });
        }
      }
    }, React.createElement(RadioButton, _extends({
      label: "Choice 1",
      name: "radio",
      value: "c1",
      checked: selected === 'c1'
    }, this.props)))));
  };

  return CheckBoxInsideButton;
}(Component);

storiesOf('RadioButton', module).add('Simple RadioButton', function () {
  return React.createElement(SimpleRadioButton, null);
}).add('Disabled RadioButton', function () {
  return React.createElement(SimpleRadioButton, {
    disabled: true,
    selected: "c2"
  });
}).add('Custom Theme', function () {
  return React.createElement(CustomRadioButton, null);
}).add('Inside a Button Theme', function () {
  return React.createElement(CheckBoxInsideButton, null);
});