function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, CheckBox, FormField, Select, TextArea, TextInput, Form } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
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

var FormFieldTextArea = function FormFieldTextArea(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Form, null, React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "text-area"
  }, props, {
    component: TextArea,
    placeholder: "placeholder"
  })))));
};

var FormFieldCheckBox = function FormFieldCheckBox(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "check-box"
  }, props), React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, React.createElement(CheckBox, {
    id: "check-box",
    label: "CheckBox"
  })))));
};

var FormFieldToggle = function FormFieldToggle(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "check-box"
  }, props), React.createElement(Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, React.createElement(CheckBox, {
    id: "check-box",
    label: "CheckBox",
    toggle: true
  })))));
};

var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});

var FormFieldSelect =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(FormFieldSelect, _Component2);

  function FormFieldSelect() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: '',
      options: allOptions
    });

    return _this2;
  }

  var _proto2 = FormFieldSelect.prototype;

  _proto2.render = function render() {
    var _this3 = this;

    var _this$state2 = this.state,
        value = _this$state2.value,
        options = _this$state2.options;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(FormField, _extends({
      label: "Label",
      htmlFor: "select"
    }, this.props), React.createElement(Select, {
      id: "select",
      placeholder: "placeholder",
      options: options,
      value: value,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this3.setState({
          value: option
        });
      }
    }))));
  };

  return FormFieldSelect;
}(Component);

var FormFieldHelpError = function FormFieldHelpError(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(FormField, _extends({
    label: "Label",
    htmlFor: "text-input"
  }, props, {
    help: "Text to help the user know what is possible",
    error: "Text to call attention to an issue with this field"
  }), React.createElement(TextInput, {
    id: "text-input",
    placeholder: "placeholder",
    value: "Value",
    onChange: function onChange() {}
  }))));
};

var customFormFieldTheme = {
  global: {
    font: {
      size: '13px'
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'xsmall',
      margin: {
        vertical: '0',
        bottom: 'small',
        horizontal: '0'
      },
      weight: 600
    },
    border: false,
    margin: 0
  }
};

var CustomFormField = function CustomFormField() {
  return React.createElement(Grommet, {
    theme: deepMerge(grommet, customFormFieldTheme)
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(FormField, {
    label: "Label",
    htmlFor: "text-area"
  }, React.createElement(TextArea, {
    id: "text-area",
    placeholder: "placeholder"
  }))));
};

storiesOf('FormField', module).add('TextInput', function () {
  return React.createElement(FormFieldTextInput, null);
}).add('TextArea', function () {
  return React.createElement(FormFieldTextArea, null);
}).add('Select', function () {
  return React.createElement(FormFieldSelect, null);
}).add('CheckBox', function () {
  return React.createElement(FormFieldCheckBox, null);
}).add('Toggle', function () {
  return React.createElement(FormFieldToggle, null);
}).add('Help and error', function () {
  return React.createElement(FormFieldHelpError, null);
}).add('Custom Theme', function () {
  return React.createElement(CustomFormField, null);
});