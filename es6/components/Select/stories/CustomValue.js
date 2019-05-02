function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { CaretDown } from "grommet-icons/es6/icons/CaretDown";
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

var CustomSelectValue =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomSelectValue, _Component);

  function CustomSelectValue() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: ['one', 'two'],
      value: undefined
    });

    return _this;
  }

  var _proto = CustomSelectValue.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Select, _extends({
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      },
      plain: true,
      valueLabel: React.createElement(Box, {
        background: "brand",
        width: "small",
        round: "small",
        overflow: "hidden",
        align: "center"
      }, value || 'Select...'),
      icon: false
    }, this.props))));
  };

  return CustomSelectValue;
}(Component);

storiesOf('Select', module).add('Custom Value', function () {
  return React.createElement(CustomSelectValue, null);
}).add('Custom Icon', function () {
  return React.createElement(CustomSelectValue, {
    icon: React.createElement(Box, null, React.createElement(CaretDown, {
      color: "black"
    }))
  });
});