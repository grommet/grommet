function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Button, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Next } from "grommet-icons/es6/icons/Next";
import { Previous } from "grommet-icons/es6/icons/Previous";
import { calcs } from '../calcs';
import { generateData } from './data';
var intervalDays = {
  '1 week': 7,
  '30 days': 30,
  '1 year': 365
};

var ZoomChart =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ZoomChart, _Component);

  function ZoomChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      interval: Object.keys(intervalDays)[1]
    });

    return _this;
  }

  ZoomChart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var data = nextProps.data,
        max = nextProps.max;
    var interval = prevState.interval; // pick the values in the date range

    var reference = prevState.reference || new Date(data[data.length - 1].time);
    var startDate = new Date(reference);
    startDate.setDate(reference.getDate() - intervalDays[interval]);
    var values = [];
    data.some(function (d) {
      var date = new Date(d.time);

      if (date > reference) {
        return true;
      }

      if (date >= startDate) {
        values.push({
          value: [d.time, d.value]
        });
      }

      return false;
    });

    var _calcs = calcs(values, {
      min: 0,
      max: max
    }),
        axis = _calcs.axis,
        bounds = _calcs.bounds,
        thickness = _calcs.thickness; // calculate next and previous references


    var days = intervalDays[interval];
    var nextReference = new Date(reference);
    nextReference.setDate(reference.getDate() + days);
    var firstReference = new Date(data[data.length - 1].time);

    if (nextReference > firstReference) {
      nextReference = firstReference;
    }

    var previousReference = new Date(reference);
    previousReference.setDate(reference.getDate() - days);
    var lastReference = new Date(data[0].time);
    lastReference.setDate(lastReference.getDate() + days);

    if (previousReference < lastReference) {
      previousReference = lastReference;
    }

    return {
      axis: axis,
      bounds: bounds,
      nextReference: nextReference,
      previousReference: previousReference,
      reference: reference,
      thickness: thickness,
      values: values
    };
  };

  var _proto = ZoomChart.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        axis = _this$state.axis,
        bounds = _this$state.bounds,
        interval = _this$state.interval,
        nextReference = _this$state.nextReference,
        previousReference = _this$state.previousReference,
        thickness = _this$state.thickness,
        values = _this$state.values;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      pad: "large",
      direction: "row",
      gap: "medium"
    }, React.createElement(Button, {
      hoverIndicator: true,
      icon: React.createElement(Previous, null),
      onClick: function onClick() {
        return _this2.setState({
          reference: previousReference
        });
      }
    }), React.createElement(Box, {
      flex: true
    }, React.createElement(Box, {
      direction: "row",
      justify: "end"
    }, Object.keys(intervalDays).map(function (int) {
      return React.createElement(Button, {
        key: int,
        onClick: function onClick() {
          return _this2.setState({
            interval: int
          });
        }
      }, React.createElement(Box, {
        pad: "small"
      }, React.createElement(Text, {
        color: interval === int ? 'black' : 'brand'
      }, int)));
    })), React.createElement(Stack, {
      guidingChild: "first"
    }, React.createElement(Box, {
      pad: {
        horizontal: thickness
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
      justify: "between"
    }, React.createElement(Box, {
      border: "top",
      align: "start"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, axis[1][0]))), React.createElement(Box, {
      border: "bottom",
      align: "start"
    }, React.createElement(Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, React.createElement(Text, null, axis[1][1]))))), React.createElement(Box, {
      direction: "row",
      justify: "between"
    }, axis[0].map(function (t) {
      return React.createElement(Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    }))), React.createElement(Button, {
      hoverIndicator: true,
      icon: React.createElement(Next, null),
      onClick: function onClick() {
        return _this2.setState({
          reference: nextReference
        });
      }
    })));
  };

  return ZoomChart;
}(Component);

storiesOf('Chart', module).add('Zoom', function () {
  return React.createElement(ZoomChart, {
    data: generateData(1000, 100),
    max: 100
  });
});