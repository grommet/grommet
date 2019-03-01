"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultipleValues =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MultipleValues, _Component);

  function MultipleValues() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      total: 100
    });

    return _this;
  }

  var _proto = MultipleValues.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        active = _this$state.active,
        label = _this$state.label,
        total = _this$state.total;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Stack, {
      anchor: "center"
    }, _react.default.createElement(_grommet.Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: 70,
        onHover: function onHover(over) {
          return _this2.setState({
            active: over ? 70 : 0,
            label: over ? 'in use' : undefined
          });
        }
      }, {
        value: 30,
        onHover: function onHover(over) {
          return _this2.setState({
            active: over ? 30 : 0,
            label: over ? 'available' : undefined
          });
        }
      }],
      max: 100,
      size: "small",
      thickness: "medium"
    }), _react.default.createElement(_grommet.Box, {
      align: "center"
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: {
        bottom: 'xsmall'
      }
    }, _react.default.createElement(_grommet.Text, {
      size: "xxlarge",
      weight: "bold"
    }, active || total), _react.default.createElement(_grommet.Text, null, "GB")), _react.default.createElement(_grommet.Text, null, label || 'total')))));
  };

  return MultipleValues;
}(_react.Component);

(0, _react2.storiesOf)('Meter', module).add('Multiple Values', function () {
  return _react.default.createElement(MultipleValues, null);
});