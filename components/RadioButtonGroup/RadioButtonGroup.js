"use strict";

exports.__esModule = true;
exports.RadioButtonGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormContext = require("../Form/FormContext");
var _Keyboard = require("../Keyboard");
var _Box = require("../Box");
var _RadioButton = require("../RadioButton");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["aria-label", "aria-labelledby", "children", "defaultValue", "disabled", "focusIndicator", "id", "name", "onChange", "options", "value", "gap"],
  _excluded2 = ["disabled", "id", "label", "value"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RadioButtonGroup = exports.RadioButtonGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _formContext$useFormF, _theme$radioButtonGro;
  var ariaLabelProp = _ref['aria-label'],
    ariaLabelledByProp = _ref['aria-labelledby'],
    children = _ref.children,
    defaultValue = _ref.defaultValue,
    disabled = _ref.disabled,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    id = _ref.id,
    name = _ref.name,
    onChange = _ref.onChange,
    optionsProp = _ref.options,
    valueProp = _ref.value,
    gap = _ref.gap,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;

  // normalize options to always use an object
  var options = optionsProp.map(function (o) {
    return typeof o !== 'object' ? {
      disabled: disabled,
      id: id ? id + "-" + o : "" + o,
      // force string
      label: typeof o !== 'string' ? JSON.stringify(o) : o,
      value: o
    } : _extends({
      disabled: disabled
    }, o);
  });
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: defaultValue != null ? defaultValue : ''
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];

  // track if focus is on one of the radio buttons
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  var optionRefs = (0, _react.useRef)([]);
  var valueIndex = _react["default"].useMemo(function () {
    var result;
    options.some(function (option, index) {
      if (option.value === value) {
        result = index;
        return true;
      }
      return false;
    });
    return result;
  }, [options, value]);
  var onNext = function onNext() {
    if (valueIndex !== undefined && valueIndex < options.length - 1) {
      var nextIndex = valueIndex + 1;
      // ensure change event occurs
      optionRefs.current[nextIndex].click();
    }
  };
  var onPrevious = function onPrevious() {
    if (valueIndex > 0) {
      var nextIndex = valueIndex - 1;
      // ensure change event occurs
      optionRefs.current[nextIndex].click();
    }
  };
  var onFocus = function onFocus() {
    // Delay just a wee bit so Chrome doesn't missing turning the button on.
    // Chrome behaves differently in that focus is given to radio buttons
    // when the user selects one, unlike Safari and Firefox.
    setTimeout(function () {
      setFocus(true);
    }, 1);
  };
  var onRadioButtonChange = function onRadioButtonChange(event, optionValue) {
    setValue(optionValue);
    if (onChange) {
      event.persist(); // extract from React synthetic event pool
      // event.target.value gives value as a string which needs to be
      // manually typecasted according to the type of original option value.
      // return the original option value attached with the event.
      var adjustedEvent = event;
      adjustedEvent.value = optionValue;
      onChange(adjustedEvent);
    }
  };
  var onBlur = function onBlur() {
    return setFocus(false);
  };
  var ariaLabelledBy;
  if (formContext != null && (_formContext$useFormF = formContext.useFormField({})) != null && _formContext$useFormF.inForm && id && !ariaLabelProp) {
    ariaLabelledBy = "grommet-" + id + "__label";
  }
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    target: "document",
    onUp: focus ? onPrevious : undefined,
    onDown: focus ? onNext : undefined,
    onLeft: focus ? onPrevious : undefined,
    onRight: focus ? onNext : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledByProp || ariaLabelledBy,
    id: id,
    ref: ref,
    role: "radiogroup"
  }, theme.radioButtonGroup.container, {
    gap: gap || ((_theme$radioButtonGro = theme.radioButtonGroup.container) == null ? void 0 : _theme$radioButtonGro.gap)
  }, rest), options.map(function (_ref2, index) {
    var optionDisabled = _ref2.disabled,
      optionId = _ref2.id,
      label = _ref2.label,
      optionValue = _ref2.value,
      optionRest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
    // if focus is within the RadioButtonGroup, determine
    // which radio button should be the active one
    var focusable = optionValue === value || value === undefined && !index ||
    // when nothing has been selected, show focus
    // on the first radiobutton
    value === '' && index === 0;
    if (optionRest.checked) {
      console.warn(// eslint-disable-next-line max-len
      "'checked' prop of an individual RadioButton shouldn't be used in a RadioButtonGroup component. Use the RadioButtonGroup 'value' prop instead.");
    }
    return /*#__PURE__*/_react["default"].createElement(_RadioButton.RadioButton, _extends({
      ref: function ref(aRef) {
        optionRefs.current[index] = aRef;
      },
      key: optionValue,
      name: name,
      label: !children ? label : undefined,
      disabled: optionDisabled,
      checked: optionValue === value,
      focus: focus && focusable
      // when contained in a FormField, focusIndicator = false,
      // so that the FormField has focus style. However, we still
      // need to visually indicate when a RadioButton is active.
      // In RadioButton, if focus = true but focusIndicator = false,
      // we will apply the hover treament.
      ,
      focusIndicator: focusIndicator,
      id: optionId,
      value: optionValue,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: function onChange(event) {
        return onRadioButtonChange(event, optionValue);
      },
      tabIndex: focusable ? '0' : '-1' // necessary for Firefox
    }, optionRest), children ? function (state) {
      return children(optionsProp[index], state);
    } : null);
  })));
});
RadioButtonGroup.displayName = 'RadioButtonGroup';
RadioButtonGroup.propTypes = _propTypes.RadioButtonGroupPropTypes;