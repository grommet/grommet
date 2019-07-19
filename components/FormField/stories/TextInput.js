"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allSuggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var FormFieldTextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormFieldTextInput, _Component);

  function FormFieldTextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: '',
      suggestions: allSuggestions
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var value = event.target.value;
      var exp = new RegExp(value, 'i');
      var suggestions = allSuggestions.filter(function (s) {
        return exp.test(s);
      });

      _this.setState({
        value: value,
        suggestions: suggestions
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (event) {
      return _this.setState({
        value: event.suggestion
      });
    });

    return _this;
  }

  var _proto = FormFieldTextInput.prototype;

  _proto.render = function render() {
    var _this$state = this.state,
        value = _this$state.value,
        suggestions = _this$state.suggestions;
    return _react["default"].createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react["default"].createElement(_grommet.FormField, _extends({
      label: "Label",
      htmlFor: "text-input"
    }, this.props), _react["default"].createElement(_grommet.TextInput, {
      id: "text-input",
      placeholder: "placeholder",
      value: value,
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: suggestions
    }))));
  };

  return FormFieldTextInput;
}(_react.Component);

(0, _react2.storiesOf)('FormField', module).add('TextInput', function () {
  return _react["default"].createElement(FormFieldTextInput, null);
});