"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

var _calcs2 = require("../calcs");

var _data = require("./data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var _calcs = (0, _calcs2.calcs)(values, {
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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      pad: "large",
      direction: "row",
      gap: "medium"
    }, _react.default.createElement(_grommet.Button, {
      hoverIndicator: true,
      icon: _react.default.createElement(_grommetIcons.Previous, null),
      onClick: function onClick() {
        return _this2.setState({
          reference: previousReference
        });
      }
    }), _react.default.createElement(_grommet.Box, {
      flex: true
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "end"
    }, Object.keys(intervalDays).map(function (int) {
      return _react.default.createElement(_grommet.Button, {
        key: int,
        onClick: function onClick() {
          return _this2.setState({
            interval: int
          });
        }
      }, _react.default.createElement(_grommet.Box, {
        pad: "small"
      }, _react.default.createElement(_grommet.Text, {
        color: interval === int ? 'black' : 'brand'
      }, int)));
    })), _react.default.createElement(_grommet.Stack, {
      guidingChild: "first"
    }, _react.default.createElement(_grommet.Box, {
      pad: {
        horizontal: thickness
      }
    }, _react.default.createElement(_grommet.Chart, {
      type: "bar",
      overflow: true,
      bounds: bounds,
      values: values,
      thickness: thickness,
      size: {
        width: 'full',
        height: 'small'
      }
    })), _react.default.createElement(_grommet.Box, {
      fill: true,
      justify: "between"
    }, _react.default.createElement(_grommet.Box, {
      border: "top",
      align: "start"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, axis[1][0]))), _react.default.createElement(_grommet.Box, {
      border: "bottom",
      align: "start"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, axis[1][1]))))), _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between"
    }, axis[0].map(function (t) {
      return _react.default.createElement(_grommet.Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    }))), _react.default.createElement(_grommet.Button, {
      hoverIndicator: true,
      icon: _react.default.createElement(_grommetIcons.Next, null),
      onClick: function onClick() {
        return _this2.setState({
          reference: nextReference
        });
      }
    })));
  };

  return ZoomChart;
}(_react.Component);

(0, _react2.storiesOf)('Chart', module).add('Zoom', function () {
  return _react.default.createElement(ZoomChart, {
    data: (0, _data.generateData)(1000, 100),
    max: 100
  });
});