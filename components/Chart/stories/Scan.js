"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _calcs2 = require("../calcs");

var _data = require("./data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var _calcs = (0, _calcs2.calcs)(values, {
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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Keyboard, {
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
    }, _react.default.createElement(_grommet.Box, {
      tabIndex: "0",
      direction: "row",
      margin: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "xxsmall"
    }, _react.default.createElement(_grommet.Box, {
      flex: true,
      justify: "between"
    }, _react.default.createElement(_grommet.Box, {
      border: "top",
      align: "end"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, axis[1][0]))), _react.default.createElement(_grommet.Box, {
      border: "bottom",
      align: "end"
    }, _react.default.createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, null, axis[1][1])))), _react.default.createElement(_grommet.Box, {
      height: "xxsmall",
      flex: false
    })), _react.default.createElement(_grommet.Box, {
      width: "large"
    }, _react.default.createElement(_grommet.Stack, {
      guidingChild: "first"
    }, _react.default.createElement(_grommet.Box, {
      pad: {
        horizontal: pad
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
      direction: "row",
      justify: "between"
    }, values.map(function (v, i) {
      return _react.default.createElement(_grommet.Box, {
        flex: false,
        key: v[0]
      }, _react.default.createElement(_grommet.Stack, {
        fill: true,
        anchor: "center",
        interactiveChild: "first"
      }, _react.default.createElement(_grommet.Box, {
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
      }), active === i && _react.default.createElement(_grommet.Box, {
        animation: {
          type: 'fadeIn',
          duration: 100
        },
        width: "xsmall",
        pad: "small",
        round: "small",
        background: "dark-3"
      }, _react.default.createElement(_grommet.Text, {
        size: "large"
      }, data[active].value), _react.default.createElement(_grommet.Text, {
        size: "small"
      }, new Date(data[active].time).toLocaleDateString()))));
    }))), _react.default.createElement(_grommet.Box, {
      height: "xxsmall",
      direction: "row",
      justify: "between",
      align: "center"
    }, axis[0].map(function (t) {
      return _react.default.createElement(_grommet.Text, {
        key: t
      }, new Date(t).toLocaleDateString());
    }))))));
  };

  return ScanChart;
}(_react.Component);

(0, _react2.storiesOf)('Chart', module).add('Scan', function () {
  return _react.default.createElement(ScanChart, {
    data: (0, _data.generateData)(30, 100),
    max: 100
  });
});