function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Grommet, Box, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customEdge = deepMerge(grommet, {
  rangeSelector: {
    edge: {
      type: React.createElement(Gremlin, {
        size: "large",
        color: "neutral-2"
      }) // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,

    }
  }
});

var CustomEdgeControl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomEdgeControl, _Component);

  function CustomEdgeControl() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      values: [2, 7]
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (values) {
      return _this.setState({
        values: values
      });
    });

    return _this;
  }

  var _proto = CustomEdgeControl.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        direction = _this$props.direction,
        rest = _objectWithoutPropertiesLoose(_this$props, ["direction"]);

    var values = this.state.values;
    return React.createElement(Grommet, {
      theme: customEdge
    }, React.createElement(Box, {
      align: "center",
      pad: "xlarge",
      gap: "large"
    }, React.createElement(Text, {
      style: {
        fontFamily: 'Comic Sans MS'
      },
      color: "brand"
    }, "Feed the gremlins with grommets...", ' '), React.createElement(Stack, null, React.createElement(Box, {
      direction: "row",
      justify: "between"
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value) {
      return React.createElement(Box, {
        key: value,
        width: "xsmall",
        height: "xsmall",
        justify: "center",
        align: "center",
        pad: "small",
        border: false
      }, React.createElement(GrommetIcon, {
        color: "brand",
        size: "small"
      }));
    })), React.createElement(RangeSelector, _extends({
      direction: direction,
      min: 0,
      max: 9,
      size: "full",
      values: values,
      color: "accent-3",
      onChange: this.onChange
    }, rest)))));
  };

  return CustomEdgeControl;
}(Component);

_defineProperty(CustomEdgeControl, "defaultProps", {
  direction: 'horizontal'
});

storiesOf('RangeSelector', module).add('Custom Edge Controls', function () {
  return React.createElement(CustomEdgeControl, null);
});