function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from './calcs';

var BarChart = function BarChart() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Chart, {
    type: "bar",
    values: [[10, 20], [20, 30], [30, 15]]
  }));
};

var LineChart = function LineChart() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Chart, {
    type: "line",
    values: [20, 30, 15]
  }));
};

var AreaChart = function AreaChart() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Chart, {
    type: "area",
    values: [{
      value: [10, 20]
    }, {
      value: [20, 30]
    }, {
      value: [30, 15]
    }]
  }));
};

var RichChart =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RichChart, _Component);

  function RichChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      values: [],
      yAxis: [],
      xAxis: []
    });

    return _this;
  }

  var _proto = RichChart.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // generate data as a server might
    var date = new Date(2018, 5, 9);
    var value = 12345.678;
    var averages = [];

    while (averages.length < 21) {
      averages.unshift({
        date: date.toISOString(),
        value: value
      });
      date.setTime(date.getTime() - 1000 * 3600 * 24);
      var factor = date.getDate() % 3;
      value = factor === 0 ? value + 12.34 : value - 123.45 * factor;
    } // convert for displaying


    var values = [];
    averages.forEach(function (avg) {
      values.push({
        value: [new Date(avg.date).getTime(), avg.value]
      });
    });

    var _calcs = calcs(values, {
      coarseness: 5,
      steps: [3, 3]
    }),
        axis = _calcs.axis,
        bounds = _calcs.bounds;

    var xAxis = axis[0].map(function (x) {
      return new Date(x).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    });
    var yAxis = axis[1];
    this.setState({
      bounds: bounds,
      values: values,
      yAxis: yAxis,
      xAxis: xAxis
    }); // eslint-disable-line
  };

  _proto.render = function render() {
    var _this$state = this.state,
        bounds = _this$state.bounds,
        values = _this$state.values,
        yAxis = _this$state.yAxis,
        xAxis = _this$state.xAxis;
    var chartProps = {
      size: {
        width: 'medium',
        height: 'small'
      },
      bounds: bounds,
      values: values,
      overflow: true
    };
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center"
    }, React.createElement(Box, {
      direction: "row",
      justify: "between",
      width: "medium",
      margin: {
        vertical: 'small'
      }
    }, xAxis.map(function (x) {
      return React.createElement(Text, {
        key: x
      }, x);
    })), React.createElement(Stack, {
      guidingChild: "last"
    }, React.createElement(Box, {
      fill: true,
      justify: "between"
    }, yAxis.map(function (y, index) {
      var first = index === 0;
      var last = index === yAxis.length - 1 && !first;
      var align;

      if (first) {
        align = 'start';
      } else if (last) {
        align = 'end';
      } else {
        align = 'center';
      }

      return React.createElement(Box, {
        key: y,
        direction: "row",
        align: align
      }, React.createElement(Box, {
        pad: {
          horizontal: 'small'
        }
      }, React.createElement(Text, null, y)), React.createElement(Box, {
        border: "top",
        flex: true
      }));
    })), React.createElement(Chart, _extends({}, chartProps, {
      type: "area",
      color: {
        color: 'accent-1',
        opacity: 'medium'
      },
      thickness: "hair"
    })), React.createElement(Chart, _extends({}, chartProps, {
      type: "line",
      round: true,
      color: {
        color: 'accent-3',
        opacity: 'strong'
      },
      thickness: "small"
    })))));
  };

  return RichChart;
}(Component);

storiesOf('Chart', module).add('Bar Chart', function () {
  return React.createElement(BarChart, null);
}).add('Line Chart', function () {
  return React.createElement(LineChart, null);
}).add('Area Chart', function () {
  return React.createElement(AreaChart, null);
}).add('Rich Chart', function () {
  return React.createElement(RichChart, null);
});