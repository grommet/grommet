"use strict";

exports.__esModule = true;
exports.RadioButtonGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _FormContext = require("../Form/FormContext");
var _defaultProps = require("../../default-props");
var _Keyboard = require("../Keyboard");
var _Box = require("../Box");
var _RadioButton = require("../RadioButton");
var _propTypes = require("./propTypes");
var _excluded = ["children", "defaultValue", "disabled", "focusIndicator", "name", "onChange", "options", "value", "gap"],
  _excluded2 = ["disabled", "id", "label", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var RadioButtonGroup = exports.RadioButtonGroup = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    defaultValue = _ref.defaultValue,
    disabled = _ref.disabled,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    name = _ref.name,
    onChange = _ref.onChange,
    optionsProp = _ref.options,
    valueProp = _ref.value,
    gap = _ref.gap,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  // normalize options to always use an object
  var options = optionsProp.map(function (o) {
    return typeof o !== 'object' ? {
      disabled: disabled,
      id: rest.id ? rest.id + "-" + o : "" + o,
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
  (0, _react.useEffect)(function () {
    // if tab comes back to RadioButtonGroup when there still is no selection,
    // we want focus to be on the first RadioButton
    if (focus && !valueIndex) {
      optionRefs.current[0].focus();
    }
  }, [focus, valueIndex]);
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
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    target: "document",
    onUp: focus ? onPrevious : undefined,
    onDown: focus ? onNext : undefined,
    onLeft: focus ? onPrevious : undefined,
    onRight: focus ? onNext : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    role: "radiogroup"
  }, theme.radioButtonGroup.container, {
    gap: gap || (theme.radioButtonGroup.container && theme.radioButtonGroup.container.gap ? theme.radioButtonGroup.container.gap : 'small')
  }, rest), options.map(function (_ref2, index) {
    var optionDisabled = _ref2.disabled,
      id = _ref2.id,
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
      console.warn( // eslint-disable-next-line max-len
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
      id: id,
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