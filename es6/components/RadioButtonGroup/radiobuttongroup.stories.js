function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RadioButtonGroup } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleRadioButtonGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRadioButtonGroup, _Component);

  function SimpleRadioButtonGroup(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    _this.state = {
      value: props.value
    };
    return _this;
  }

  var _proto = SimpleRadioButtonGroup.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(RadioButtonGroup, _extends({
      name: "radio",
      options: [{
        label: 'Choice 1',
        value: 'c1'
      }, {
        label: 'Choice 2',
        value: 'c2'
      }, {
        label: 'Choice 3',
        value: 'c3'
      }],
      value: value,
      onChange: this.onChange
    }, this.props))));
  };

  return SimpleRadioButtonGroup;
}(Component);

storiesOf('RadioButtonGroup', module).add('Simple', function () {
  return React.createElement(SimpleRadioButtonGroup, null);
});