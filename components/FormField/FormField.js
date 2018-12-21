"use strict";

exports.__esModule = true;
exports.FormField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

var _CheckBox = require("../CheckBox");

var _Text = require("../Text");

var _TextInput = require("../TextInput");

var _hocs = require("../hocs");

var _FormContext = require("../Form/FormContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validateField = function validateField(required, validate, messages) {
  return function (data) {
    var error;

    if (required && (data === undefined || data === '')) {
      error = messages.required;
    } else if (validate) {
      if (typeof validate === 'function') {
        error = validate(data);
      } else if (validate.regexp) {
        if (!validate.regexp.test(data)) {
          error = validate.message || messages.invalid;
        }
      }
    }

    return error;
  };
};

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderChildren", function (value, update) {
      var _this$props = _this.props,
          name = _this$props.name,
          component = _this$props.component,
          required = _this$props.required,
          rest = _objectWithoutPropertiesLoose(_this$props, ["name", "component", "required"]);

      var Input = component || _TextInput.TextInput;

      if (Input === _CheckBox.CheckBox) {
        return _react.default.createElement(Input, _extends({
          name: name,
          checked: value[name] || false,
          onChange: function onChange(event) {
            return update(name, event.target.checked);
          }
        }, rest));
      }

      return _react.default.createElement(Input, _extends({
        name: name,
        value: value[name] || '',
        onChange: function onChange(event) {
          return update(name, event.value || event.target.value);
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
        validate = _this$props2.validate;
    var formField = theme.formField;
    var border = formField.border;
    return _react.default.createElement(_FormContext.FormContext.Consumer, null, function (context) {
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
        contents = _react.default.createElement(_Box.Box, {
          pad: {
            horizontal: 'small',
            bottom: 'small'
          }
        }, contents);
      }

      var borderColor;

      if (focus) {
        borderColor = 'focus';
      } else if (normalizedError) {
        borderColor = border && border.error.color || 'status-critical';
      } else {
        borderColor = border && border.color || 'border';
      }

      var abut;
      var outerStyle = style;

      if (border) {
        var normalizedChildren = children ? _react.Children.map(children, function (child) {
          if (child) {
            return (0, _react.cloneElement)(child, {
              plain: true,
              focusIndicator: false
            });
          }

          return child;
        }) : contents;
        contents = _react.default.createElement(_Box.Box, {
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
            marginBottom = "-" + (0, _utils.parseMetricToNum)(theme.global.borderSize[border.size]) + "px";
          }

          outerStyle = _extends({
            position: focus ? 'relative' : undefined,
            marginBottom: marginBottom,
            zIndex: focus ? 10 : undefined
          }, style);
        }
      }

      return _react.default.createElement(_Box.Box, {
        border: border && border.position === 'outer' ? _extends({}, border, {
          color: borderColor
        }) : undefined,
        margin: abut ? undefined : {
          bottom: 'small'
        },
        style: outerStyle
      }, label && component !== _CheckBox.CheckBox || help ? _react.default.createElement(_Box.Box, {
        margin: {
          vertical: 'xsmall',
          horizontal: 'small'
        },
        gap: "xsmall"
      }, label && component !== _CheckBox.CheckBox ? _react.default.createElement(_Text.Text, _extends({
        as: "label",
        htmlFor: htmlFor
      }, formField.label), label) : undefined, help ? _react.default.createElement(_Text.Text, _extends({}, formField.help, {
        color: formField.help.color[theme.dark ? 'dark' : 'light']
      }), help) : undefined) : undefined, contents, normalizedError ? _react.default.createElement(_Box.Box, {
        margin: {
          vertical: 'xsmall',
          horizontal: 'small'
        }
      }, _react.default.createElement(_Text.Text, _extends({}, formField.error, {
        color: formField.error.color[theme.dark ? 'dark' : 'light']
      }), normalizedError)) : undefined);
    });
  };

  return FormField;
}(_react.Component);

FormField.defaultProps = {};
Object.setPrototypeOf(FormField.defaultProps, _defaultProps.defaultProps);
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  FormFieldDoc = require('./doc').doc(FormField); // eslint-disable-line global-require
}

var FormFieldWrapper = (0, _recompose.compose)(_hocs.withFocus, _styledComponents.withTheme)(FormFieldDoc || FormField);
exports.FormField = FormFieldWrapper;