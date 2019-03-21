"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleRangeInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleRangeInput, _Component);

  function SimpleRangeInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: 5
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = SimpleRangeInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.RangeInput, {
      value: value,
      onChange: this.onChange
    })));
  };

  return SimpleRangeInput;
}(_react.Component);

var customThemeRangeInput = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    spacing: '12px'
  },
  rangeInput: {
    track: {
      color: 'accent-2',
      height: '12px',
      extend: function extend() {
        return "border-radius: 10px";
      }
    },
    thumb: {
      color: 'neutral-2'
    }
  }
});

var CustomRangeInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(CustomRangeInput, _Component2);

  function CustomRangeInput() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: 0.4
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
      return _this2.setState({
        value: event.target.value
      });
    });

    return _this2;
  }

  var _proto2 = CustomRangeInput.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      theme: customThemeRangeInput
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: "large",
      gap: "small"
    }, _react.default.createElement(_grommetIcons.Volume, {
      color: "neutral-2"
    }), _react.default.createElement(_grommet.Box, {
      align: "center",
      width: "small"
    }, _react.default.createElement(_grommet.RangeInput, {
      min: 0,
      max: 1,
      step: 0.1,
      value: value,
      onChange: this.onChange
    }))));
  };

  return CustomRangeInput;
}(_react.Component);

(0, _react2.storiesOf)('RangeInput', module).add('Simple', function () {
  return _react.default.createElement(SimpleRangeInput, null);
}).add('Custom', function () {
  return _react.default.createElement(CustomRangeInput, null);
});