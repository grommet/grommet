"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _calcs3 = require("../calcs");

var _data = require("./data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// compress data for outer control chart
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

      var _calcs = (0, _calcs3.calcs)(outerValues, {
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

    var _calcs2 = (0, _calcs3.calcs)(innerValues, {
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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between"
    }, innerAxis[0].reverse().map(function (t) {
      return _react.default.createElement(_grommet.Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    })), _react.default.createElement(_grommet.Stack, {
      guidingChild: "first",
      interactiveChild: "first"
    }, _react.default.createElement(_grommet.Box, {
      pad: {
        horizontal: thickness
      }
    }, _react.default.createElement(_grommet.Chart, {
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
    })), _react.default.createElement(_grommet.Box, {
      fill: true,
      justify: "between"
    }, _react.default.createElement(_grommet.Box, {
      border: {
        side: 'top'
      },
      align: "start"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, innerAxis[1][0]))), _react.default.createElement(_grommet.Box, {
      border: {
        side: 'bottom',
        color: 'accent-2',
        size: 'medium'
      },
      align: "start"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, innerAxis[1][1])))), hover && _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Box, {
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
    }, _react.default.createElement(_grommet.Text, {
      size: "large",
      weight: "bold"
    }, hover.value[1]), _react.default.createElement(_grommet.Text, null, new Date(hover.value[0]).toLocaleDateString())))), _react.default.createElement(_grommet.Stack, null, _react.default.createElement(_grommet.Chart, {
      type: "line",
      bounds: outerBounds,
      values: outerValues,
      size: {
        width: 'full',
        height: 'xxsmall'
      },
      thickness: "xxsmall"
    }), _react.default.createElement(_grommet.RangeSelector, {
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
}(_react.Component);

(0, _react2.storiesOf)('Chart', module).add('Window', function () {
  return _react.default.createElement(WindowChart, {
    data: (0, _data.generateData)(1000, 100),
    max: 100
  });
});