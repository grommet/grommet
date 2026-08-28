"use strict";

exports.__esModule = true;
exports.FormField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _useDebounce = require("../../utils/use-debounce");
var _styles = require("../../utils/styles");
var _mixins = require("../../utils/mixins");
var _refs = require("../../utils/refs");
var _Box = require("../Box");
var _CheckBox = require("../CheckBox");
var _CheckBoxGroup = require("../CheckBoxGroup");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _Text = require("../Text");
var _TextInput = require("../TextInput");
var _FormContext = require("../Form/FormContext");
var _propTypes = require("./propTypes");
var _useThemeValue3 = require("../../utils/useThemeValue");
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _excluded = ["message", "id"],
  _excluded2 = ["error", "info", "message", "type"],
  _excluded3 = ["id"],
  _excluded4 = ["component", "disabled", "invalid", "name", "onChange"],
  _excluded5 = ["children", "className", "component", "contentProps", "disabled", "error", "help", "htmlFor", "info", "label", "margin", "name", "onBlur", "onChange", "onFocus", "pad", "required", "style", "validate", "validateOn"],
  _excluded6 = ["aria-describedby"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var grommetInputFocusNames = ['CheckBox', 'CheckBoxGroup', 'RadioButton', 'RadioButtonGroup', 'RangeInput', 'RangeSelector', 'StarRating', 'ThumbsRating'];
var grommetInputNames = ['CheckBox', 'CheckBoxGroup', 'TextInput', 'Select', 'MaskedInput', 'SelectMultiple', 'TextArea', 'DateInput', 'DateTimeInput', 'TimeInput', 'FileInput', 'RadioButton', 'RadioButtonGroup', 'RangeInput', 'RangeSelector', 'StarRating', 'ThumbsRating'];
var grommetInputPadNames = ['CheckBox', 'CheckBoxGroup', 'RadioButton', 'RadioButtonGroup', 'RangeInput', 'RangeSelector'];
var isGrommetInput = function isGrommetInput(comp) {
  return comp && (grommetInputNames.indexOf(comp.displayName) !== -1 || grommetInputPadNames.indexOf(comp.displayName) !== -1);
};
var getFocusStyle = function getFocusStyle(props) {
  var _props$theme$formFiel;
  if (props.focus && props.containerFocus === false && ((_props$theme$formFiel = props.theme.formField) == null || (_props$theme$formFiel = _props$theme$formFiel.focus) == null ? void 0 : _props$theme$formFiel.containerFocus) === false) {
    return null;
  }
  return props.focus ? (0, _styles.focusStyle)({
    justBorder: true
  }) : undefined;
};

// The border color has to be painted by whichever element owns the border,
// but the background belongs on the content element so it doesn't bleed
// behind the label and messages when the border is positioned 'outer'.
// FormField sets allowHover only when no higher priority state (disabled,
// readOnly, error, focus) applies.
var getHoverStyle = function getHoverStyle(role) {
  return function (props) {
    var _props$theme$formFiel2, _props$theme$formFiel3, _hover$border;
    var hover = (_props$theme$formFiel2 = props.theme.formField) == null ? void 0 : _props$theme$formFiel2.hover;
    if (!props.allowHover || !hover) return undefined;
    var position = (_props$theme$formFiel3 = props.theme.formField) == null || (_props$theme$formFiel3 = _props$theme$formFiel3.border) == null ? void 0 : _props$theme$formFiel3.position;
    var ownsBorder = role === 'outer' ? position === 'outer' : position === 'inner';
    var borderColor = ownsBorder ? (_hover$border = hover.border) == null ? void 0 : _hover$border.color : undefined;
    var background = role === 'content' ? hover.background : undefined;
    if (!borderColor && background === undefined) return undefined;
    return (0, _styledComponents.css)(["&:hover{", " ", "}"], borderColor && "border-color: " + (0, _utils.normalizeColor)(borderColor, props.theme) + ";", (0, _utils.backgroundStyle)(background, props.theme, false));
  };
};
var FormFieldBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "FormField__FormFieldBox",
  componentId: "sc-m9hood-0"
})(["", " ", " ", ""], function (props) {
  return getFocusStyle(props);
}, getHoverStyle('outer'), function (props) {
  var _props$theme$formFiel4;
  return (_props$theme$formFiel4 = props.theme.formField) == null ? void 0 : _props$theme$formFiel4.extend;
});
var FormFieldContentBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "FormField__FormFieldContentBox",
  componentId: "sc-m9hood-1"
})(["", " ", " ", ""], function (props) {
  return getFocusStyle(props);
}, getHoverStyle('content'), function (props) {
  var _props$theme$formFiel5;
  return props.theme.formField && ((_props$theme$formFiel5 = props.theme.formField[props == null ? void 0 : props.componentName]) == null || (_props$theme$formFiel5 = _props$theme$formFiel5.container) == null ? void 0 : _props$theme$formFiel5.extend);
});
var StyledContentsBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "FormField__StyledContentsBox",
  componentId: "sc-m9hood-2"
})(["", " ", ""], getHoverStyle('content'), function (props) {
  var _props$theme$formFiel6;
  return props.theme.formField && ((_props$theme$formFiel6 = props.theme.formField[props == null ? void 0 : props.componentName]) == null || (_props$theme$formFiel6 = _props$theme$formFiel6.container) == null ? void 0 : _props$theme$formFiel6.extend);
});
var StyledMessageContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "FormField__StyledMessageContainer",
  componentId: "sc-m9hood-3"
})(["", ""], function (props) {
  return props.messageType && props.theme.formField[props.messageType].container && props.theme.formField[props.messageType].container.extend;
});
var RequiredText = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "FormField__RequiredText",
  componentId: "sc-m9hood-4"
})(["color:inherit;font-weight:inherit;line-height:inherit;"]);
var ScreenReaderOnly = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "FormField__ScreenReaderOnly",
  componentId: "sc-m9hood-5"
})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;"]);
var MessageContent = function MessageContent(_ref) {
  var message = _ref.message,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return typeof message === 'string' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    id: id
  }, rest), message) : /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    id: id
  }, rest), message);
};
var Message = function Message(_ref2) {
  var error = _ref2.error,
    info = _ref2.info,
    message = _ref2.message,
    type = _ref2.type,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useThemeValue = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  if (message) {
    var icon;
    var containerProps;
    if (type) {
      icon = theme.formField[type] && theme.formField[type].icon;
      containerProps = theme.formField[type] && theme.formField[type].container;
    }

    // id is in rest; extract it so we can place it on the outermost element
    var id = rest.id,
      contentRest = _objectWithoutPropertiesLoose(rest, _excluded3);
    if (icon || containerProps) {
      return /*#__PURE__*/_react["default"].createElement(StyledMessageContainer, _extends({
        direction: "row",
        messageType: type
      }, containerProps, passThemeFlag, {
        id: id
      }), icon && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        flex: false
      }, icon), /*#__PURE__*/_react["default"].createElement(MessageContent, _extends({
        message: message
      }, contentRest)));
    }
    return /*#__PURE__*/_react["default"].createElement(MessageContent, _extends({
      message: message,
      id: id
    }, contentRest));
  }
  return null;
};
var Input = function Input(_ref3) {
  var component = _ref3.component,
    disabled = _ref3.disabled,
    invalid = _ref3.invalid,
    name = _ref3.name,
    _onChange = _ref3.onChange,
    rest = _objectWithoutPropertiesLoose(_ref3, _excluded4);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: rest.value
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var InputComponent = component || _TextInput.TextInput;
  // Grommet input components already check for FormContext
  // and, using their `name`, end up calling the useFormInput.setValue()
  // already. For custom components, we expect they will call
  // this onChange() and we'll call setValue() here, primarily
  // for backwards compatibility.
  var extraProps = isGrommetInput(InputComponent) ? {
    focusIndicator: false,
    onChange: _onChange,
    plain: true
  } : {
    value: value,
    onChange: function onChange(event) {
      setValue(event.value !== undefined ? event.value : event.target.value);
      if (_onChange) _onChange(event);
    }
  };
  return /*#__PURE__*/_react["default"].createElement(InputComponent, _extends({
    name: name,
    disabled: disabled,
    "aria-invalid": invalid || undefined
  }, rest, extraProps));
};

// Adds aria-describedby (linking to the error Message) and aria-invalid to
// a Grommet input child when the field has an error. Merges with any
// aria-describedby the consumer already put on the child instead of
// overwriting it.
var getChildErrorProps = function getChildErrorProps(child, errorId, error) {
  if (!errorId && !error) return {};
  var props = {};
  if (errorId) {
    var existingDescribedBy = child.props['aria-describedby'];
    props['aria-describedby'] = existingDescribedBy ? existingDescribedBy + " " + errorId : errorId;
  }
  if (error) props['aria-invalid'] = true;
  return props;
};

// Backwards compatibility: defaults plain/focusIndicator/pad on a Grommet
// input child, unless the consumer already set plain or focusIndicator.
// This is the same logic FormField has always had; only pulled out into
// its own function so it can be reasoned about independent of the newer
// error-linking logic above.
var getChildFocusProps = function getChildFocusProps(child, themeBorder, containerFocus, formFieldTheme) {
  var _formFieldTheme$check;
  return !themeBorder || child.props.plain !== undefined || child.props.focusIndicator !== undefined ? {} : {
    plain: true,
    focusIndicator: !containerFocus,
    pad: child.type.displayName === 'CheckBox' ? formFieldTheme == null || (_formFieldTheme$check = formFieldTheme.checkBox) == null ? void 0 : _formFieldTheme$check.pad : undefined
  };
};
var FormField = exports.FormField = /*#__PURE__*/(0, _react.forwardRef)(function (_ref4, ref) {
  var _theme$formField2, _theme$global$input, _formFieldTheme$disab, _formFieldTheme$disab2;
  var children = _ref4.children,
    className = _ref4.className,
    component = _ref4.component,
    contentProps = _ref4.contentProps,
    disabled = _ref4.disabled,
    errorProp = _ref4.error,
    help = _ref4.help,
    htmlFor = _ref4.htmlFor,
    infoProp = _ref4.info,
    label = _ref4.label,
    margin = _ref4.margin,
    name = _ref4.name,
    _onBlur = _ref4.onBlur,
    onChange = _ref4.onChange,
    _onFocus = _ref4.onFocus,
    pad = _ref4.pad,
    required = _ref4.required,
    style = _ref4.style,
    validate = _ref4.validate,
    validateOn = _ref4.validateOn,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded5);
  var _useThemeValue2 = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue2.theme,
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _formContext$useFormF = formContext.useFormField({
      disabled: disabled,
      error: errorProp,
      info: infoProp,
      name: name,
      required: required,
      validate: validate,
      validateOn: validateOn
    }),
    error = _formContext$useFormF.error,
    info = _formContext$useFormF.info,
    inForm = _formContext$useFormF.inForm,
    contextOnBlur = _formContext$useFormF.onBlur,
    contextOnChange = _formContext$useFormF.onChange;
  var formKind = formContext.kind;
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  var formFieldRef = (0, _refs.useForwardedRef)(ref);
  var formFieldTheme = theme.formField;
  var themeBorder = formFieldTheme.border;
  var debounce = (0, _useDebounce.useDebounce)();
  var portalContext = (0, _react.useContext)(_utils.PortalContext);
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  (0, _react.useEffect)(function () {
    if (error && validate != null && validate.max) {
      announce(error, 'polite', 5000);
    }
  }, [error, announce, validate == null ? void 0 : validate.max]);
  var readOnlyField = (0, _react.useMemo)(function () {
    var readOnly = false;
    if (children) {
      _react.Children.map(children, function (child) {
        var _child$props, _child$props2;
        if (((child == null || (_child$props = child.props) == null ? void 0 : _child$props.readOnly) === true || (child == null || (_child$props2 = child.props) == null ? void 0 : _child$props2.readOnlyCopy) === true) && child.type && (child.type.displayName === 'TextInput' || child.type.displayName === 'DateInput')) {
          readOnly = true;
        }
      });
    }
    return readOnly;
  }, [children]);
  var containerFocus = (0, _react.useMemo)(function () {
    var focusIndicatorFlag = true;
    _react.Children.forEach(children, function (child) {
      var _theme$formField;
      if (child && child.type && grommetInputFocusNames.includes(child.type.displayName) && ((_theme$formField = theme.formField) == null || (_theme$formField = _theme$formField.focus) == null ? void 0 : _theme$formField.containerFocus) !== true) {
        focusIndicatorFlag = false;
      }
    });
    return focusIndicatorFlag;
  }, [children, (_theme$formField2 = theme.formField) == null || (_theme$formField2 = _theme$formField2.focus) == null ? void 0 : _theme$formField2.containerFocus]);

  // Check if child is Select or SelectMultiple and modify htmlFor if needed
  var adjustedHtmlFor = htmlFor;
  if (htmlFor) {
    var isSelectComponent = false;

    // Check if children contain Select or SelectMultiple
    if (children) {
      _react.Children.forEach(children, function (child) {
        if (child && child.type && (child.type.displayName === 'Select' || child.type.displayName === 'SelectMultiple') && child.props.id === htmlFor) {
          isSelectComponent = true;
        }
      });
    }

    // If it's a Select component and htmlFor doesn't end with __input, add it
    if (isSelectComponent && !htmlFor.endsWith('__input')) {
      adjustedHtmlFor = htmlFor + "__input";
    }
  }

  // This is here for backwards compatibility. In case the child is a grommet
  // input component, set plain and focusIndicator props, if they aren't
  // already set.
  var wantContentPad = component && (component === _CheckBox.CheckBox || component === _CheckBoxGroup.CheckBoxGroup || component === _RadioButtonGroup.RadioButtonGroup);

  // id of the error Message, used to link it to its input via
  // aria-describedby. Always computed when there's an error + htmlFor,
  // regardless of theme border config.
  var errorId = error && htmlFor ? "grommet-" + adjustedHtmlFor + "__error" : undefined;

  // Single Children.map pass applying both the error-linking props
  // (getChildErrorProps) and the plain/focusIndicator/pad backwards-compat
  // defaults (getChildFocusProps) to each Grommet input child. Must run
  // the same way regardless of `error`, or a child's reconciliation key
  // changes between renders - remounting it and losing state (e.g. a
  // typed value) right when the error appears.
  var contents;
  if (children) {
    contents = _react.Children.map(children, function (child) {
      if (!child || !child.type || !isGrommetInput(child.type)) return child;
      if (themeBorder && grommetInputPadNames.indexOf(child.type.displayName) !== -1) {
        wantContentPad = true;
      }
      var newProps = _extends({}, getChildErrorProps(child, errorId, error), getChildFocusProps(child, themeBorder, containerFocus, formFieldTheme));
      return Object.keys(newProps).length ? /*#__PURE__*/(0, _react.cloneElement)(child, newProps) : child;
    });
  } else {
    contents = children;
  }

  // put rest on container, unless we use internal Input
  var containerRest = rest;
  if (inForm) {
    if (!contents) containerRest = {};
    // Merge aria-describedby with the error id rather than
    // letting either one silently win.
    var ariaDescribedBy = rest['aria-describedby'],
      restWithoutAria = _objectWithoutPropertiesLoose(rest, _excluded6);
    var combinedAriaDescribedBy = errorId ? [ariaDescribedBy, errorId].filter(Boolean).join(' ') : ariaDescribedBy;
    contents = contents || /*#__PURE__*/_react["default"].createElement(Input, _extends({
      component: component,
      disabled: disabled,
      invalid: !!error,
      name: name,
      label: component === _CheckBox.CheckBox ? label : undefined
    }, restWithoutAria, {
      "aria-describedby": combinedAriaDescribedBy || undefined
    }));
  }
  var themeContentProps = _extends({}, formFieldTheme.content);
  if (!pad && !wantContentPad) {
    themeContentProps.pad = undefined;
  }
  if (themeBorder && themeBorder.position === 'inner') {
    if (readOnlyField) {
      var _theme$global$input$r;
      themeContentProps.background = (_theme$global$input$r = theme.global.input.readOnly) == null ? void 0 : _theme$global$input$r.background;
    } else if (error && formFieldTheme.error) {
      themeContentProps.background = formFieldTheme.error.background;
    } else if (disabled && formFieldTheme.disabled) {
      themeContentProps.background = formFieldTheme.disabled.background;
    }
  }

  // fileinput handle
  // use fileinput plain use formfield to drive the border
  var isFileInputComponent;
  if (children) {
    _react.Children.forEach(children, function (child) {
      if (child && child.type && child.type.displayName === 'FileInput') isFileInputComponent = true;
    });
  }
  if (component && component.displayName === 'FileInput' && !isFileInputComponent) {
    isFileInputComponent = true;
  }
  var childName;
  _react.Children.forEach(children, function (child) {
    if (child && child.type) {
      var _childName;
      childName = child.type.displayName;
      // camelCase component name to match theme object key
      if (((_childName = childName) == null ? void 0 : _childName.length) > 0) childName = childName.charAt(0).toLowerCase() + childName.slice(1);
    }
  });
  var allowHover = !disabled && !readOnlyField && !error && !focus;
  if (!themeBorder) {
    contents = /*#__PURE__*/_react["default"].createElement(StyledContentsBox, _extends({
      disabledProp: disabled,
      error: error,
      componentName: childName
    }, themeContentProps, contentProps, {
      allowHover: allowHover // internal prop
    }), contents);
  }
  var borderColor;
  if (disabled && formFieldTheme.disabled.border && formFieldTheme.disabled.border.color) {
    borderColor = formFieldTheme.disabled.border.color;
  } else if (readOnlyField && (_theme$global$input = theme.global.input) != null && (_theme$global$input = _theme$global$input.readOnly) != null && (_theme$global$input = _theme$global$input.border) != null && _theme$global$input.color) {
    var _theme$global$input2;
    borderColor = (_theme$global$input2 = theme.global.input) == null || (_theme$global$input2 = _theme$global$input2.readOnly) == null || (_theme$global$input2 = _theme$global$input2.border) == null ? void 0 : _theme$global$input2.color;
  } else if (
  // backward compatibility check
  error && themeBorder && themeBorder.error.color || error && formFieldTheme.error && formFieldTheme.error.border) {
    if (themeBorder.error.color && formFieldTheme.error.border === undefined) {
      borderColor = themeBorder.error.color || 'status-critical';
    } else if (formFieldTheme.error.border && formFieldTheme.error.border.color) {
      borderColor = formFieldTheme.error.border.color || 'status-critical';
    }
  } else if (focus && formFieldTheme.focus && formFieldTheme.focus.border && formFieldTheme.focus.border.color) {
    borderColor = formFieldTheme.focus.border.color;
  } else {
    borderColor = themeBorder && themeBorder.color || 'border';
  }
  var labelStyle = _extends({}, formKind ? formFieldTheme[formKind].label : formFieldTheme.label);
  if (disabled) {
    labelStyle.color = formFieldTheme.disabled && formFieldTheme.disabled.label ? formFieldTheme.disabled.label.color : labelStyle.color;
  }
  var themeHelpProps = _extends({}, formFieldTheme.help, disabled && {
    color: formFieldTheme == null || (_formFieldTheme$disab = formFieldTheme.disabled) == null || (_formFieldTheme$disab = _formFieldTheme$disab.help) == null ? void 0 : _formFieldTheme$disab.color
  });
  var themeInfoProps = _extends({}, formFieldTheme.info, disabled && {
    color: formFieldTheme == null || (_formFieldTheme$disab2 = formFieldTheme.disabled) == null || (_formFieldTheme$disab2 = _formFieldTheme$disab2.info) == null ? void 0 : _formFieldTheme$disab2.color
  });
  var abut;
  var abutMargin;
  var outerStyle = style;

  // If fileinput is wrapped in a formfield we want to use
  // the border style from the fileInput.theme. We also do not
  // want the foocus around the formfield since the the focus
  // is on the anchor/button inside fileinput

  if (themeBorder) {
    var innerProps = themeBorder.position === 'inner' ? {
      border: _extends({}, themeBorder, {
        size: isFileInputComponent ? theme.fileInput.border.size : undefined,
        style: isFileInputComponent ? theme.fileInput.border.style : undefined,
        side: isFileInputComponent ? theme.fileInput.border.side : themeBorder.side || 'bottom',
        color: borderColor
      }),
      round: formFieldTheme.round,
      focus: isFileInputComponent ? undefined : focus
    } : {};
    contents = /*#__PURE__*/_react["default"].createElement(FormFieldContentBox, _extends({
      disabledProp: disabled,
      error: error,
      componentName: childName
    }, themeContentProps, innerProps, contentProps, {
      containerFocus: containerFocus // internal prop
      ,
      allowHover: allowHover // internal prop
    }, passThemeFlag), contents);
    var mergedMargin = margin || formFieldTheme.margin;
    abut = themeBorder.position === 'outer' && (themeBorder.side === 'all' || themeBorder.side === 'horizontal' || !themeBorder.side) && !(mergedMargin && (typeof mergedMargin === 'string' && mergedMargin !== 'none' || mergedMargin.bottom && mergedMargin.bottom !== 'none' || mergedMargin.horizontal && mergedMargin.horizontal !== 'none'));
    if (abut) {
      // marginBottom is set to overlap adjacent fields
      abutMargin = {
        bottom: '-1px'
      };
      if (margin) {
        abutMargin = margin;
      } else if (themeBorder.size) {
        // if the user defines a margin,
        // then the default margin below will be overridden
        abutMargin = {
          bottom: "-" + (0, _mixins.parseMetricToNum)(theme.global.borderSize[themeBorder.size] || themeBorder.size) + "px"
        };
      }
      outerStyle = _extends({
        position: focus ? 'relative' : undefined,
        zIndex: focus ? 10 : undefined
      }, style);
    }
  }
  var outerBackground;
  if (themeBorder && themeBorder.position === 'outer') {
    if (error && formFieldTheme.error && formFieldTheme.error.background) {
      outerBackground = formFieldTheme.error.background;
    } else if (focus && formFieldTheme.focus && formFieldTheme.focus.background && formFieldTheme.focus.background.color) {
      outerBackground = formFieldTheme.focus.background.color;
    } else if (disabled && formFieldTheme.disabled && formFieldTheme.disabled.background) {
      outerBackground = formFieldTheme.disabled.background;
    }
  }
  var outerProps = themeBorder && themeBorder.position === 'outer' ? {
    border: _extends({}, themeBorder, {
      color: borderColor
    }),
    round: formFieldTheme.round,
    focus: focus
  } : {};
  var requiredIndicator = theme.formField.label.requiredIndicator;
  if (requiredIndicator === true)
    // accessibility resource: https://www.deque.com/blog/anatomy-of-accessible-forms-required-form-fields/
    // this approach allows the required indicator to be hidden visually,
    // but present for assistive tech.
    // using aria-hidden so screen does not read out "star" and
    // just reads out "required"
    requiredIndicator = /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(RequiredText, {
      "aria-hidden": "true"
    }, "*"), /*#__PURE__*/_react["default"].createElement(ScreenReaderOnly, null, "required"));
  var showRequiredIndicator = required && requiredIndicator;
  if (typeof required === 'object' && required.indicator === false) showRequiredIndicator = false;
  return /*#__PURE__*/_react["default"].createElement(FormFieldBox, _extends({
    ref: formFieldRef,
    className: className,
    background: outerBackground,
    margin: abut ? abutMargin : margin || _extends({}, formFieldTheme.margin)
  }, outerProps, {
    style: outerStyle,
    containerFocus: containerFocus // internal prop
    ,
    allowHover: allowHover // internal prop
    ,
    onFocus: function onFocus(event) {
      var _formFieldRef$current;
      var root = (_formFieldRef$current = formFieldRef.current) == null ? void 0 : _formFieldRef$current.getRootNode();
      if (root) {
        setFocus((0, _utils.containsFocus)(formFieldRef.current) && (0, _utils.shouldKeepFocus)(root));
      }
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);

      // if input has a drop and focus is within drop
      // prevent onBlur validation from running until
      // focus is no longer within the drop or input
      if (contextOnBlur && !formFieldRef.current.contains(event.relatedTarget) && !(0, _utils.withinDropPortal)(event.relatedTarget, portalContext)) {
        contextOnBlur(event);
      }
      if (_onBlur) _onBlur(event);
    },
    onChange: contextOnChange || onChange ? function (event) {
      event.persist();
      if (onChange) onChange(event);
      if (contextOnChange) debounce(function () {
        return function () {
          return contextOnChange(event);
        };
      });
    } : undefined
  }, containerRest, passThemeFlag), label && component !== _CheckBox.CheckBox || help ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, label && component !== _CheckBox.CheckBox && /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    as: "label",
    id: htmlFor ? "grommet-" + adjustedHtmlFor + "__label" : undefined,
    htmlFor: adjustedHtmlFor
  }, labelStyle), label, showRequiredIndicator ? requiredIndicator : undefined), /*#__PURE__*/_react["default"].createElement(Message, _extends({
    message: help
  }, themeHelpProps))) : undefined, contents, /*#__PURE__*/_react["default"].createElement(Message, _extends({
    type: "error",
    message: error
  }, formFieldTheme.error, {
    id: errorId
  })), /*#__PURE__*/_react["default"].createElement(Message, _extends({
    type: "info",
    message: info
  }, themeInfoProps)));
});
FormField.displayName = 'FormField';
FormField.propTypes = _propTypes.FormFieldPropTypes;