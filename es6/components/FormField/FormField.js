function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { withFocus } from '../hocs';
import { FormContext } from '../Form/FormContext';

var validateField = function validateField(required, validate, messages) {
  return function (value, data) {
    var error;

    if (required && (value === undefined || value === '')) {
      error = messages.required;
    } else if (validate) {
      if (typeof validate === 'function') {
        error = validate(value, data);
      } else if (validate.regexp) {
        if (!validate.regexp.test(value)) {
          error = validate.message || messages.invalid;
        }
      }
    }

    return error;
  };
};

var FormFieldBox = styled(Box).withConfig({
  displayName: "FormField__FormFieldBox",
  componentId: "m9hood-0"
})(["", ""], function (props) {
  return props.theme.formField.extend;
});

var FormField =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormField, _Component);

  function FormField() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (value, update) {
      var _this$props = _this.props,
          name = _this$props.name,
          component = _this$props.component,
          required = _this$props.required,
          _onChange = _this$props.onChange,
          rest = _objectWithoutPropertiesLoose(_this$props, ["name", "component", "required", "onChange"]);

      delete rest.className;
      var Input = component || TextInput;

      if (Input === CheckBox) {
        return React.createElement(Input, _extends({
          name: name,
          checked: value[name] || false,
          onChange: function onChange(event) {
            update(name, event.target.checked);
            if (_onChange) _onChange(event);
          }
        }, rest));
      }

      return React.createElement(Input, _extends({
        name: name,
        value: value[name] || '',
        onChange: function onChange(event) {
          update(name, event.value || event.target.value);
          if (_onChange) _onChange(event);
        },
        plain: true,
        focusIndicator: false
      }, rest));
    });

    return _this;
  }

  var _proto = FormField.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        className = _this$props2.className,
        component = _this$props2.component,
        error = _this$props2.error,
        focus = _this$props2.focus,
        help = _this$props2.help,
        htmlFor = _this$props2.htmlFor,
        label = _this$props2.label,
        name = _this$props2.name,
        pad = _this$props2.pad,
        required = _this$props2.required,
        style = _this$props2.style,
        theme = _this$props2.theme,
        validate = _this$props2.validate,
        onBlur = _this$props2.onBlur,
        onFocus = _this$props2.onFocus;
    var formField = theme.formField;
    var border = formField.border;
    return React.createElement(FormContext.Consumer, null, function (context) {
      var normalizedError = error;
      var contents = children;

      if (context) {
        var addValidation = context.addValidation,
            errors = context.errors,
            value = context.value,
            update = context.update,
            messages = context.messages;
        addValidation(name, validateField(required, validate, messages));
        normalizedError = error || errors[name];
        contents = children || _this2.renderChildren(value, update);
      }

      if (pad) {
        contents = React.createElement(Box, formField.content, contents);
      }

      var borderColor;

      if (focus && !normalizedError) {
        borderColor = 'focus';
      } else if (normalizedError) {
        borderColor = border && border.error.color || 'status-critical';
      } else {
        borderColor = border && border.color || 'border';
      }

      var abut;
      var outerStyle = style;

      if (border) {
        var normalizedChildren = children ? Children.map(children, function (child) {
          if (child) {
            return cloneElement(child, {
              plain: true,
              focusIndicator: false,
              onBlur: onBlur,
              onFocus: onFocus
            });
          }

          return child;
        }) : contents;
        contents = React.createElement(Box, {
          ref: function ref(_ref) {
            _this2.childContainerRef = _ref;
          },
          border: border.position === 'inner' ? _extends({}, border, {
            side: border.side || 'bottom',
            color: borderColor
          }) : undefined
        }, normalizedChildren);
        abut = border.position === 'outer' && (border.side === 'all' || border.side === 'horizontal' || !border.side);

        if (abut) {
          // marginBottom is set to overlap adjacent fields
          var marginBottom = '-1px';

          if (border.size) {
            marginBottom = "-" + parseMetricToNum(theme.global.borderSize[border.size]) + "px";
          }

          outerStyle = _extends({
            position: focus ? 'relative' : undefined,
            marginBottom: marginBottom,
            zIndex: focus ? 10 : undefined
          }, style);
        }
      }

      return React.createElement(FormFieldBox, {
        className: className,
        border: border && border.position === 'outer' ? _extends({}, border, {
          color: borderColor
        }) : undefined,
        margin: abut ? undefined : _extends({}, formField.margin),
        style: outerStyle
      }, label && component !== CheckBox || help ? React.createElement(React.Fragment, null, label && component !== CheckBox && React.createElement(Text, _extends({
        as: "label",
        htmlFor: htmlFor
      }, formField.label), label), help && React.createElement(Text, _extends({}, formField.help, {
        color: formField.help.color[theme.dark ? 'dark' : 'light']
      }), help)) : undefined, contents, normalizedError && React.createElement(Text, _extends({}, formField.error, {
        color: formField.error.color[theme.dark ? 'dark' : 'light']
      }), normalizedError));
    });
  };

  return FormField;
}(Component);

FormField.defaultProps = {};
Object.setPrototypeOf(FormField.defaultProps, defaultProps);
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  FormFieldDoc = require('./doc').doc(FormField); // eslint-disable-line global-require
}

var FormFieldWrapper = compose(withFocus({
  focusWithMouse: true
}), withTheme)(FormFieldDoc || FormField);
export { FormFieldWrapper as FormField };