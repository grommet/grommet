function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart, Keyboard, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from '../calcs';
import { generateData } from './data';

var ScanChart =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ScanChart, _Component);

  function ScanChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "valueRefs", []);

    return _this;
  }

  ScanChart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        max = nextProps.max;
    var active = prevState.active; // convert data to chart coordinates

    var values = data.map(function (d) {
      return [d.time, d.value];
    });

    var _calcs = calcs(values, {
      min: 0,
      max: max
    }),
        axis = _calcs.axis,
        bounds = _calcs.bounds,
        pad = _calcs.pad,
        thickness = _calcs.thickness;

    return {
      active: active,
      axis: axis,
      bounds: bounds,
      pad: pad,
      thickness: thickness,
      values: values
    };
  };

  var _proto = ScanChart.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var data = this.props.data;
    var _this$state = this.state,
        active = _this$state.active,
        axis = _this$state.axis,
        bounds = _this$state.bounds,
        pad = _this$state.pad,
        thickness = _this$state.thickness,
        values = _this$state.values;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Keyboard, {
      onLeft: function onLeft() {
        return _this2.setState({
          active: Math.max(0, active - 1)
        });
      },
      onRight: function onRight() {
        return _this2.setState({
          active: Math.min(data.length - 1, active + 1)
        });
      },
      onEsc: function onEsc() {
        return _this2.setState({
          active: undefined
        });
      }
    }, React.createElement(Box, {
      tabIndex: "0",
      direction: "row",
      margin: "large"
    }, React.createElement(Box, {
      width: "xxsmall"
    }, React.createElement(Box, {
      flex: true,
      justify: "between"
    }, React.createElement(Box, {
      border: "top",
      align: "end"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, axis[1][0]))), React.createElement(Box, {
      border: "bottom",
      align: "end"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, axis[1][1])))), React.createElement(Box, {
      height: "xxsmall",
      flex: false
    })), React.createElement(Box, {
      width: "large"
    }, React.createElement(Stack, {
      guidingChild: "first"
    }, React.createElement(Box, {
      pad: {
        horizontal: pad
      }
    }, React.createElement(Chart, {
      type: "bar",
      overflow: true,
      bounds: bounds,
      values: values,
      thickness: thickness,
      size: {
        width: 'full',
        height: 'small'
      }
    })), React.createElement(Box, {
      fill: true,
      direction: "row",
      justify: "between"
    }, values.map(function (v, i) {
      return React.createElement(Box, {
        flex: false,
        key: v[0]
      }, React.createElement(Stack, {
        fill: true,
        anchor: "center",
        interactiveChild: "first"
      }, React.createElement(Box, {
        fill: true,
        pad: pad,
        ref: function ref(_ref) {
          _this2.valueRefs[i] = _ref;
        },
        background: active === i ? {
          color: 'dark-5',
          opacity: 'medium'
        } : undefined,
        onMouseOver: function onMouseOver() {
          return _this2.setState({
            active: i
          });
        },
        onMouseOut: function onMouseOut() {
          return _this2.setState({
            active: undefined
          });
        },
        onFocus: function onFocus() {},
        onBlur: function onBlur() {}
      }), active === i && React.createElement(Box, {
        animation: {
          type: 'fadeIn',
          duration: 100
        },
        width: "xsmall",
        pad: "small",
        round: "small",
        background: "dark-3"
      }, React.createElement(Text, {
        size: "large"
      }, data[active].value), React.createElement(Text, {
        size: "small"
      }, new Date(data[active].time).toLocaleDateString()))));
    }))), React.createElement(Box, {
      height: "xxsmall",
      direction: "row",
      justify: "between",
      align: "center"
    }, axis[0].map(function (t) {
      return React.createElement(Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    }))))));
  };

  return ScanChart;
}(Component);

storiesOf('Chart', module).add('Scan', function () {
  return React.createElement(ScanChart, {
    data: generateData(30, 100),
    max: 100
  });
});