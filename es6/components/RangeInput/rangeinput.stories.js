function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { Volume } from "grommet-icons/es6/icons/Volume";

var SimpleRangeInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRangeInput, _Component);

  function SimpleRangeInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: 5
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = SimpleRangeInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(RangeInput, {
      value: value,
      onChange: this.onChange
    })));
  };

  return SimpleRangeInput;
}(Component);

var customThemeRangeInput = deepMerge(grommet, {
  global: {
    spacing: '12px'
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: function extend() {
        return "border-radius: 10px";
      }
    },
    thumb: {
      color: 'neutral-2'
    }
  }
});

var CustomRangeInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(CustomRangeInput, _Component2);

  function CustomRangeInput() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: 0.4
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
      return _this2.setState({
        value: event.target.value
      });
    });

    return _this2;
  }

  var _proto2 = CustomRangeInput.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      theme: customThemeRangeInput
    }, React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: "large",
      gap: "small"
    }, React.createElement(Volume, {
      color: "neutral-2"
    }), React.createElement(Box, {
      align: "center",
      width: "small"
    }, React.createElement(RangeInput, {
      min: 0,
      max: 1,
      step: 0.1,
      value: value,
      onChange: this.onChange
    }))));
  };

  return CustomRangeInput;
}(Component);

storiesOf('RangeInput', module).add('Simple', function () {
  return React.createElement(SimpleRangeInput, null);
}).add('Custom', function () {
  return React.createElement(CustomRangeInput, null);
});