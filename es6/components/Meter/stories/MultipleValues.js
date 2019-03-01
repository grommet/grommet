function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var MultipleValues =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MultipleValues, _Component);

  function MultipleValues() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      total: 100
    });

    return _this;
  }

  var _proto = MultipleValues.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        active = _this$state.active,
        label = _this$state.label,
        total = _this$state.total;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Stack, {
      anchor: "center"
    }, React.createElement(Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: 70,
        onHover: function onHover(over) {
          return _this2.setState({
            active: over ? 70 : 0,
            label: over ? 'in use' : undefined
          });
        }
      }, {
        value: 30,
        onHover: function onHover(over) {
          return _this2.setState({
            active: over ? 30 : 0,
            label: over ? 'available' : undefined
          });
        }
      }],
      max: 100,
      size: "small",
      thickness: "medium"
    }), React.createElement(Box, {
      align: "center"
    }, React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: {
        bottom: 'xsmall'
      }
    }, React.createElement(Text, {
      size: "xxlarge",
      weight: "bold"
    }, active || total), React.createElement(Text, null, "GB")), React.createElement(Text, null, label || 'total')))));
  };

  return MultipleValues;
}(Component);

storiesOf('Meter', module).add('Multiple Values', function () {
  return React.createElement(MultipleValues, null);
});