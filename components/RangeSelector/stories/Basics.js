"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleRangeSelector =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRangeSelector, _Component);

  function SimpleRangeSelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      values: [12, 16]
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (values) {
      return _this.setState({
        values: values
      });
    });

    return _this;
  }

  var _proto = SimpleRangeSelector.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        direction = _this$props.direction,
        rest = _objectWithoutPropertiesLoose(_this$props, ["direction"]);

    var values = this.state.values;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Stack, null, _react.default.createElement(_grommet.Box, {
      direction: direction === 'vertical' ? 'column' : 'row',
      justify: "between"
    }, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(function (value) {
      return _react.default.createElement(_grommet.Box, {
        key: value,
        width: "xxsmall",
        height: "xxsmall",
        align: "center",
        pad: "small",
        border: false
      }, _react.default.createElement(_grommet.Text, {
        style: {
          fontFamily: 'monospace'
        }
      }, value));
    })), _react.default.createElement(_grommet.RangeSelector, _extends({
      direction: direction,
      min: 10,
      max: 20,
      size: "full",
      values: values,
      onChange: this.onChange
    }, rest)))));
  };

  return SimpleRangeSelector;
}(_react.Component);

_defineProperty(SimpleRangeSelector, "defaultProps", {
  direction: 'horizontal'
});

(0, _react2.storiesOf)('RangeSelector', module).add('Simple', function () {
  return _react.default.createElement(SimpleRangeSelector, null);
}).add('Step', function () {
  return _react.default.createElement(SimpleRangeSelector, {
    step: 2
  });
}).add('Vertical', function () {
  return _react.default.createElement(SimpleRangeSelector, {
    direction: "vertical"
  });
});