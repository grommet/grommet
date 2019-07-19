function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, FormField, Select, Grommet } from 'grommet';
var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});

var FormFieldSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormFieldSelect, _Component);

  function FormFieldSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: '',
      options: allOptions
    });

    return _this;
  }

  var _proto = FormFieldSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        value = _this$state.value,
        options = _this$state.options;
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
        return _this2.setState({
          value: option
        });
      }
    }))));
  };

  return FormFieldSelect;
}(Component);

storiesOf('FormField', module).add('Select', function () {
  return React.createElement(FormFieldSelect, null);
});