function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Chart, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { calcs } from '../calcs';
import { generateData } from './data'; // compress data for outer control chart

var compressData = function compressData(data, max, count) {
  var result = [];
  var bucketSize = Math.round(data.length / count);
  var bucket = [];
  var bucketMin = max;
  var bucketMax = 0;
  var date = 0;
  data.forEach(function (d) {
    if (bucket.length >= bucketSize) {
      result.push({
        value: [date, bucketMin, bucketMax]
      });
      bucket = [];
      bucketMin = 100;
      bucketMax = 0;
      date = 0;
    }

    date = Math.max(date, d.time);
    bucketMin = Math.min(bucketMin, d.value);
    bucketMax = Math.max(bucketMax, d.value);
    bucket.push(d);
  });

  if (bucket.length) {
    result.push({
      value: [date, bucketMin, bucketMax]
    });
  }

  return result;
};

var WindowChart =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(WindowChart, _Component);

  function WindowChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onChange", function (range) {
      _this.setState({
        range: range
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onHover", function (value) {
      return function (over) {
        _this.setState({
          hover: over ? value : undefined
        });
      };
    });

    return _this;
  }

  WindowChart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        max = nextProps.max;
    var outerValues;
    var outerAxis;
    var outerBounds;

    if (!prevState.outerValues) {
      outerValues = compressData(data, max, 101);

      var _calcs = calcs(outerValues, {
        min: 0,
        max: max
      });

      outerAxis = _calcs.axis;
      outerBounds = _calcs.bounds;
    } else {
      outerAxis = prevState.outerAxis;
      outerBounds = prevState.outerBounds;
      outerValues = prevState.outerValues;
    }

    var range = prevState.range || [data.length / 2, data.length / 2 + data.length * 0.05];
    var innerValues = data.slice(range[0], range[1]).map(function (d) {
      return {
        value: [d.time, d.value]
      };
    });

    var _calcs2 = calcs(innerValues, {
      min: 0,
      max: max
    }),
        innerAxis = _calcs2.axis,
        innerBounds = _calcs2.bounds,
        thickness = _calcs2.thickness;

    return {
      innerAxis: innerAxis,
      innerBounds: innerBounds,
      innerValues: innerValues,
      outerAxis: outerAxis,
      outerBounds: outerBounds,
      outerValues: outerValues,
      range: range,
      thickness: thickness
    };
  };

  var _proto = WindowChart.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var data = this.props.data;
    var _this$state = this.state,
        hover = _this$state.hover,
        innerAxis = _this$state.innerAxis,
        innerBounds = _this$state.innerBounds,
        innerValues = _this$state.innerValues,
        outerBounds = _this$state.outerBounds,
        outerValues = _this$state.outerValues,
        range = _this$state.range,
        thickness = _this$state.thickness;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      pad: "large"
    }, React.createElement(Box, {
      direction: "row",
      justify: "between"
    }, innerAxis[0].reverse().map(function (t) {
      return React.createElement(Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    })), React.createElement(Stack, {
      guidingChild: "first",
      interactiveChild: "first"
    }, React.createElement(Box, {
      pad: {
        horizontal: thickness
      }
    }, React.createElement(Chart, {
      type: "bar",
      color: "accent-2",
      overflow: true,
      bounds: innerBounds,
      values: innerValues.map(function (v) {
        return _extends({}, v, {
          onHover: _this2.onHover(v)
        });
      }),
      thickness: thickness,
      size: {
        width: 'full',
        height: 'small'
      }
    })), React.createElement(Box, {
      fill: true,
      justify: "between"
    }, React.createElement(Box, {
      border: {
        side: 'top'
      },
      align: "start"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, innerAxis[1][0]))), React.createElement(Box, {
      border: {
        side: 'bottom',
        color: 'accent-2',
        size: 'medium'
      },
      align: "start"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, innerAxis[1][1])))), hover && React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Box, {
      animation: {
        type: 'fadeIn',
        duration: 100
      },
      pad: "medium",
      background: {
        color: 'white',
        opacity: 'strong'
      },
      border: {
        color: 'accent-2'
      },
      round: true
    }, React.createElement(Text, {
      size: "large",
      weight: "bold"
    }, hover.value[1]), React.createElement(Text, null, new Date(hover.value[0]).toLocaleDateString())))), React.createElement(Stack, null, React.createElement(Chart, {
      type: "line",
      bounds: outerBounds,
      values: outerValues,
      size: {
        width: 'full',
        height: 'xxsmall'
      },
      thickness: "xxsmall"
    }), React.createElement(RangeSelector, {
      min: 0,
      max: data.length,
      size: "full",
      values: range,
      onChange: this.onChange,
      color: "accent-2",
      style: {
        userSelect: 'none'
      }
    }))));
  };

  return WindowChart;
}(Component);

storiesOf('Chart', module).add('Window', function () {
  return React.createElement(WindowChart, {
    data: generateData(1000, 100),
    max: 100
  });
});