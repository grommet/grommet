"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _calcs2 = require("../calcs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_this), "state", {
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

    var _calcs = (0, _calcs2.calcs)(values, {
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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      width: "medium",
      margin: {
        vertical: 'small'
      }
    }, xAxis.map(function (x) {
      return _react.default.createElement(_grommet.Text, {
        key: x
      }, x);
    })), _react.default.createElement(_grommet.Stack, {
      guidingChild: "last"
    }, _react.default.createElement(_grommet.Box, {
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

      return _react.default.createElement(_grommet.Box, {
        key: y,
        direction: "row",
        align: align
      }, _react.default.createElement(_grommet.Box, {
        pad: {
          horizontal: 'small'
        }
      }, _react.default.createElement(_grommet.Text, null, y)), _react.default.createElement(_grommet.Box, {
        border: "top",
        flex: true
      }));
    })), _react.default.createElement(_grommet.Chart, _extends({}, chartProps, {
      type: "area",
      color: {
        color: 'accent-1',
        opacity: 'medium'
      },
      thickness: "hair"
    })), _react.default.createElement(_grommet.Chart, _extends({}, chartProps, {
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
}(_react.Component);

(0, _react2.storiesOf)('Chart', module).add('Rich', function () {
  return _react.default.createElement(RichChart, null);
});