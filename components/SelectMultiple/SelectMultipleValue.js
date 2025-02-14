"use strict";

exports.__esModule = true;
exports.SelectMultipleValue = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _CheckBox = require("../CheckBox");
var _StyledSelect = require("../Select/StyledSelect");
var _utils = require("../Select/utils");
var _MessageContext = require("../../contexts/MessageContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var SelectMultipleValue = exports.SelectMultipleValue = function SelectMultipleValue(_ref) {
  var allOptions = _ref.allOptions,
    children = _ref.children,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    dropButtonRef = _ref.dropButtonRef,
    labelKey = _ref.labelKey,
    messages = _ref.messages,
    onRequestOpen = _ref.onRequestOpen,
    onSelectChange = _ref.onSelectChange,
    theme = _ref.theme,
    value = _ref.value,
    valueKey = _ref.valueKey;
  var _useState = (0, _react.useState)(false),
    showA11yDiv = _useState[0],
    setShowA11yDiv = _useState[1];
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var isDisabled = (0, _utils.useDisabled)(disabled, disabledKey, allOptions, valueKey || labelKey);
  var visibleValue = (0, _react.useCallback)(function (i) {
    var optionValue = valueKey && valueKey.reduce ? (0, _utils.applyKey)(i, valueKey) : i;
    var optionSelected = (0, _utils.arrayIncludes)(value, optionValue, valueKey || labelKey);
    var indexOptions = (0, _utils.getOptionIndex)(allOptions, i, valueKey || labelKey);
    var optionLabel = (0, _utils.getOptionLabel)(indexOptions, allOptions, labelKey || valueKey);
    var optionDisabled = isDisabled(indexOptions);
    var valueIndex = (0, _utils.getOptionIndex)(value, optionValue, valueKey || labelKey);
    if (valueIndex < theme.selectMultiple.maxInline) {
      var child;
      if (children) {
        child = children(i, indexOptions, allOptions, {
          active: false,
          disabled: optionDisabled,
          selected: true
        });
      }
      return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectOption, {
        role: "option",
        a11yTitle: format({
          id: optionSelected ? 'selectMultiple.optionSelected' : 'selectMultiple.optionNotSelected',
          messages: messages,
          values: {
            optionLabel: optionLabel
          }
        }),
        "aria-setsize": value.length,
        "aria-posinset": valueIndex + 1,
        "aria-selected": optionSelected,
        "aria-disabled": optionDisabled,
        plain: true,
        hoverIndicator: !optionDisabled,
        fill: "horizontal",
        tabIndex: "0",
        onClick: function onClick(event) {
          if (!optionDisabled) {
            var intermediate = [].concat(value);
            if ((0, _utils.arrayIncludes)(intermediate, optionValue, valueKey || labelKey)) {
              onSelectChange(event, {
                option: optionValue,
                value: intermediate.filter(function (v) {
                  return typeof v === 'object' ? (0, _utils.applyKey)(v, valueKey || labelKey) !== (0, _utils.applyKey)(optionValue, valueKey || labelKey) : v !== optionValue;
                })
              });
              if (valueIndex !== intermediate.length - 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[valueIndex + 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = intermediate[valueIndex + 1];
                  setShowA11yDiv("Unselected " + optionLabel + ". \n                        Focus moved to " + (0, _utils.getOptionLabel)((0, _utils.getOptionIndex)(allOptions, result, valueKey || labelKey), allOptions, labelKey || valueKey));
                }, 200); // Timeout needed to allow screen reader
                // time to announce and next item to display on
                // screen. Based on testing, 200ms is enough time
              } else if (intermediate.length !== 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[valueIndex - 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = intermediate[valueIndex - 1];
                  setShowA11yDiv("Unselected " + optionLabel + ". Focus moved to \n                          " + (0, _utils.getOptionLabel)((0, _utils.getOptionIndex)(allOptions, result, valueKey || labelKey), allOptions, labelKey || valueKey));
                }, 200); // Timeout needed to allow screen reader
                // time to announce and next item to display on
                // screen. Based on testing, 200ms is enough time
              } else if (dropButtonRef.current) dropButtonRef.current.focus();
            }
          }
        },
        key: optionLabel,
        id: "selected-" + optionValue
      }, child || /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
        disabled: optionDisabled,
        label: /*#__PURE__*/_react["default"].createElement(_Box.Box, {
          alignSelf: "center",
          align: "start"
        }, optionLabel),
        key: optionLabel,
        pad: "xsmall",
        tabIndex: "-1",
        checked: optionSelected,
        inert: "" // revisit for React 19
        ,
        containerProps: {
          // in Firefox when we have inert set, the checkbox
          // click event gets swallowed by the checkbox.
          // We need the click event to go the the button
          // around the checkbox so we use pointerEvents =
          // none. For code clarity we decided an inline
          // style made sense here.
          style: {
            pointerEvents: 'none'
          }
        }
      }));
    }
    return undefined;
  }, [allOptions, children, dropButtonRef, format, isDisabled, labelKey, messages, onSelectChange, theme.selectMultiple.maxInline, value, valueKey]);

  // After announcing set showA11yDiv to undefined so it won't
  // be read out again
  (0, _react.useEffect)(function () {
    if (showA11yDiv !== undefined) {
      setTimeout(function () {
        setShowA11yDiv(undefined);
      }, 1000);
    }
  }, [showA11yDiv]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: "100%",
    role: "listbox",
    "aria-multiselectable": true,
    a11yTitle: format({
      id: 'selectMultiple.selectedOptions',
      messages: messages
    })
  }, value && allOptions.filter(function (i) {
    return (0, _utils.arrayIncludes)(value, valueKey && valueKey.reduce ? (0, _utils.applyKey)(i, valueKey) : i, valueKey || labelKey);
  }).map(function (i) {
    return visibleValue(i);
  }), showA11yDiv && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    height: "0px",
    width: "0px",
    overflow: "hidden"
    // announce when an item is removed from selected options
    ,
    "aria-live": "assertive",
    role: "alert"
  }, showA11yDiv)), value && value.length > theme.selectMultiple.maxInline && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      horizontal: 'small',
      bottom: 'small',
      top: 'xsmall'
    },
    alignSelf: "start"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    onClick: onRequestOpen,
    size: "small",
    label: format({
      id: 'selectMultiple.showMore',
      messages: messages,
      values: {
        remaining: value.length - theme.selectMultiple.maxInline
      }
    })
  })));
};