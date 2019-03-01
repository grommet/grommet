function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { RadioButton } from '../RadioButton';
import { withForwardRef } from '../hocs';

var RadioButtonGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RadioButtonGroup, _Component);

  function RadioButtonGroup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "optionRefs", []);

    _defineProperty(_assertThisInitialized(_this), "valueIndex", function () {
      var _this$state = _this.state,
          options = _this$state.options,
          value = _this$state.value;
      var result;
      options.some(function (option, index) {
        if (option.value === value) {
          result = index;
          return true;
        }

        return false;
      });
      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onNext", function () {
      var onChange = _this.props.onChange;
      var options = _this.state.options;

      var valueIndex = _this.valueIndex();

      if (valueIndex !== undefined && valueIndex < options.length - 1) {
        var nextIndex = valueIndex + 1;
        var nextValue = options[nextIndex].value;

        _this.setState({
          value: nextValue
        }, function () {
          _this.optionRefs[nextIndex].focus();
        });

        if (onChange) {
          onChange({
            target: {
              value: nextValue
            }
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPrevious", function () {
      var onChange = _this.props.onChange;
      var options = _this.state.options;

      var valueIndex = _this.valueIndex();

      if (valueIndex > 0) {
        var nextIndex = valueIndex - 1;
        var nextValue = options[nextIndex].value;

        _this.setState({
          value: nextValue
        }, function () {
          _this.optionRefs[nextIndex].focus();
        });

        if (onChange) {
          onChange({
            target: {
              value: nextValue
            }
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      // Delay just a wee bit so Chrome doesn't missing turning the button on.
      // Chrome behaves differently in that focus is given to radio buttons
      // when the user selects one, unlike Safari and Firefox.
      setTimeout(function () {
        var focus = _this.state.focus;

        if (!focus) {
          _this.setState({
            focus: true
          });
        }
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var focus = _this.state.focus;

      if (focus) {
        _this.setState({
          focus: false
        });
      }
    });

    return _this;
  }

  RadioButtonGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    var options = nextProps.options,
        value = nextProps.value;
    return {
      options: options.map(function (o) {
        return typeof o === 'string' ? {
          id: o,
          label: o,
          value: o
        } : o;
      }),
      value: value
    };
  };

  var _proto = RadioButtonGroup.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        forwardRef = _this$props.forwardRef,
        name = _this$props.name,
        onChange = _this$props.onChange,
        rest = _objectWithoutPropertiesLoose(_this$props, ["forwardRef", "name", "onChange"]);

    var _this$state2 = this.state,
        focus = _this$state2.focus,
        options = _this$state2.options,
        selectedValue = _this$state2.value;
    return React.createElement(Keyboard, {
      target: "document",
      onUp: focus ? this.onPrevious : undefined,
      onDown: focus ? this.onNext : undefined,
      onLeft: focus ? this.onPrevious : undefined,
      onRight: focus ? this.onNext : undefined
    }, React.createElement(Box, _extends({
      ref: forwardRef,
      gap: "small"
    }, rest), options.map(function (_ref, index) {
      var disabled = _ref.disabled,
          id = _ref.id,
          label = _ref.label,
          value = _ref.value;
      return React.createElement(RadioButton, {
        ref: function ref(_ref2) {
          _this2.optionRefs[index] = _ref2;
        },
        key: value,
        name: name,
        label: label,
        disabled: disabled,
        checked: value === selectedValue,
        focus: focus && (value === selectedValue || selectedValue === undefined && !index),
        id: id,
        value: value,
        onChange: onChange,
        onFocus: _this2.onFocus,
        onBlur: _this2.onBlur
      });
    })));
  };

  return RadioButtonGroup;
}(Component);

RadioButtonGroup.defaultProps = {};
Object.setPrototypeOf(RadioButtonGroup.defaultProps, defaultProps);
var RadioButtonGroupDoc;

if (process.env.NODE_ENV !== 'production') {
  RadioButtonGroupDoc = require('./doc').doc(RadioButtonGroup); // eslint-disable-line global-require
}

var RadioButtonGroupWrapper = compose(withForwardRef)(RadioButtonGroupDoc || RadioButtonGroup);
export { RadioButtonGroupWrapper as RadioButtonGroup };