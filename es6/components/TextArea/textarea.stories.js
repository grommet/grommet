function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleTextArea =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleTextArea, _Component);

  function SimpleTextArea() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = SimpleTextArea.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(TextArea, _extends({
      value: value,
      onChange: this.onChange
    }, this.props)));
  };

  return SimpleTextArea;
}(Component);

var FillTextArea =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(FillTextArea, _Component2);

  function FillTextArea() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onChange", function (event) {
      return _this2.setState({
        value: event.target.value
      });
    });

    return _this2;
  }

  var _proto2 = FillTextArea.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      width: "large",
      height: "medium",
      border: {
        color: 'brand',
        size: 'medium'
      }
    }, React.createElement(TextArea, {
      value: value,
      onChange: this.onChange,
      fill: true
    })));
  };

  return FillTextArea;
}(Component);

storiesOf('TextArea', module).add('Simple', function () {
  return React.createElement(SimpleTextArea, null);
}).add('Fill', function () {
  return React.createElement(FillTextArea, null);
});