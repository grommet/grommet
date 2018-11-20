function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import { withFocus, withTheme } from '../hocs';

var FormField =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormField, _Component);

  function FormField() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FormField.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.children,
        error = _this$props.error,
        focus = _this$props.focus,
        help = _this$props.help,
        htmlFor = _this$props.htmlFor,
        label = _this$props.label,
        style = _this$props.style,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "error", "focus", "help", "htmlFor", "label", "style", "theme"]);

    var formField = theme.formField;
    var border = formField.border;
    var contents = children;
    var borderColor;

    if (focus) {
      borderColor = 'focus';
    } else if (error) {
      borderColor = border && border.error.color || 'status-critical';
    } else {
      borderColor = border && border.color || 'border';
    }

    var abut;
    var outerStyle = style;

    if (border) {
      var normalizedChildren = Children.map(children, function (child) {
        if (child) {
          return cloneElement(child, {
            plain: true,
            focusIndicator: false
          });
        }

        return child;
      });
      contents = React.createElement(Box, {
        ref: function ref(_ref) {
          _this.childContainerRef = _ref;
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

    return React.createElement(Box, _extends({
      border: border && border.position === 'outer' ? _extends({}, border, {
        color: borderColor
      }) : undefined,
      margin: abut ? undefined : {
        bottom: 'small'
      },
      style: outerStyle
    }, rest), label || help ? React.createElement(Box, {
      margin: {
        vertical: 'xsmall',
        horizontal: 'small'
      },
      gap: "xsmall"
    }, label ? React.createElement(Text, _extends({
      tag: "label",
      htmlFor: htmlFor
    }, formField.label), label) : undefined, help ? React.createElement(Text, _extends({}, formField.help, {
      color: formField.help.color[theme.dark ? 'dark' : 'light']
    }), help) : undefined) : undefined, contents, error ? React.createElement(Box, {
      margin: {
        vertical: 'xsmall',
        horizontal: 'small'
      }
    }, React.createElement(Text, _extends({}, formField.error, {
      color: formField.error.color[theme.dark ? 'dark' : 'light']
    }), error)) : undefined);
  };

  return FormField;
}(Component);

var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  FormFieldDoc = require('./doc').doc(FormField); // eslint-disable-line global-require
}

var FormFieldWrapper = compose(withFocus, withTheme)(FormFieldDoc || FormField);
export { FormFieldWrapper as FormField };