"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleTextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleTextInput, _Component);

  function SimpleTextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this), "ref", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = SimpleTextInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "medium"
    }, _react.default.createElement(_grommet.TextInput, {
      ref: this.ref,
      value: value,
      onChange: this.onChange
    }))));
  };

  return SimpleTextInput;
}(_react.Component);

var PasswordInput = function PasswordInput(_ref) {
  var value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["value"]);

  var _useState = (0, _react.useState)(value),
      inputValue = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      reveal = _useState2[0],
      setReveal = _useState2[1];

  return _react.default.createElement(_grommet.Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, _react.default.createElement(_grommet.TextInput, _extends({
    plain: true,
    type: reveal ? 'text' : 'password',
    value: inputValue,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, rest)), _react.default.createElement(_grommet.Button, {
    icon: reveal ? _react.default.createElement(_grommetIcons.FormLock, {
      size: "medium"
    }) : _react.default.createElement(_grommetIcons.View, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var SuggestionsTextInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(SuggestionsTextInput, _Component2);

  function SuggestionsTextInput() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
      return _this2.setState({
        value: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onSelect", function (event) {
      return _this2.setState({
        value: event.suggestion
      });
    });

    return _this2;
  }

  var _proto2 = SuggestionsTextInput.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "medium"
    }, _react.default.createElement(_grommet.TextInput, {
      value: value,
      dropProps: {
        height: 'small'
      },
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: suggestions
    }))));
  };

  return SuggestionsTextInput;
}(_react.Component);

(0, _react2.storiesOf)('TextInput', module).add('Simple TextInput', function () {
  return _react.default.createElement(SimpleTextInput, null);
}).add('Password input', function () {
  return _react.default.createElement(PasswordInput, null);
}).add('Suggestions TextInput', function () {
  return _react.default.createElement(SuggestionsTextInput, null);
});