function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleRangeSelector =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRangeSelector, _Component);

  function SimpleRangeSelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      values: [12, 16]
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (values) {
      return _this.setState({
        values: values
      });
    });

    return _this;
  }

  var _proto = SimpleRangeSelector.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        direction = _this$props.direction,
        rest = _objectWithoutPropertiesLoose(_this$props, ["direction"]);

    var values = this.state.values;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Stack, null, React.createElement(Box, {
      direction: direction === 'vertical' ? 'column' : 'row',
      justify: "between"
    }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
      return React.createElement(Box, {
        key: value,
        width: "xxsmall",
        height: "xxsmall",
        align: "center",
        pad: "small",
        border: false
      }, React.createElement(Text, {
        style: {
          fontFamily: 'monospace'
        }
      }, value));
    })), React.createElement(RangeSelector, _extends({
      direction: direction,
      min: 10,
      max: 20,
      size: "full",
      values: values,
      onChange: this.onChange
    }, rest)))));
  };

  return SimpleRangeSelector;
}(Component);

_defineProperty(SimpleRangeSelector, "defaultProps", {
  direction: 'horizontal'
});

storiesOf('RangeSelector', module).add('Simple', function () {
  return React.createElement(SimpleRangeSelector, null);
}).add('Step', function () {
  return React.createElement(SimpleRangeSelector, {
    step: 2
  });
}).add('Vertical', function () {
  return React.createElement(SimpleRangeSelector, {
    direction: "vertical"
  });
});