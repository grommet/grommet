function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
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
      var value = event.target.value; // The line below escapes regular expression special characters:  [ \ ^ $ . | ? * + ( )

      var escapedText = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'); // Create the regular expression with modified value which handles escaping special characters
      // Without escaping special characters, errors will appear in the console

      var exp = new RegExp(escapedText, 'i');
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
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(FormField, _extends({
      label: "Label",
      htmlFor: "text-input"
    }, this.props), React.createElement(TextInput, {
      id: "text-input",
      placeholder: "placeholder",
      value: value,
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: suggestions
    }))));
  };

  return FormFieldTextInput;
}(Component);

storiesOf('FormField', module).add('TextInput', function () {
  return React.createElement(FormFieldTextInput, null);
});