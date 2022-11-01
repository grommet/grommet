"use strict";

exports.__esModule = true;
exports.SelectMultipleValue = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _CheckBox = require("../CheckBox");
var _StyledSelect = require("../Select/StyledSelect");
var _utils = require("../Select/utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var SelectMultipleValue = function SelectMultipleValue(_ref) {
  var allOptions = _ref.allOptions,
    children = _ref.children,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    dropButtonRef = _ref.dropButtonRef,
    labelKey = _ref.labelKey,
    onRequestOpen = _ref.onRequestOpen,
    onSelectChange = _ref.onSelectChange,
    theme = _ref.theme,
    value = _ref.value,
    valueKey = _ref.valueKey;
  var _useState = (0, _react.useState)(false),
    showA11yDiv = _useState[0],
    setShowA11yDiv = _useState[1];
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
        a11yTitle: optionSelected ? optionLabel + " selected" : optionLabel + " not selected",
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
                  return typeof v === 'object' ? (0, _utils.applyKey)(v, valueKey || labelKey) === (0, _utils.applyKey)(optionValue, valueKey || labelKey) : v !== optionValue;
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
        checked: optionSelected
      }));
    }
    return undefined;
  }, [valueKey, allOptions, children, dropButtonRef, isDisabled, labelKey, onSelectChange, value, theme.selectMultiple.maxInline]);

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
    a11yTitle: "Selected Options"
  }, value && allOptions.filter(function (i) {
    return (0, _utils.arrayIncludes)(value, valueKey && valueKey.reduce ? (0, _utils.applyKey)(i, valueKey) : i, valueKey || labelKey);
  })
  /* eslint-disable-next-line array-callback-return, 
      consistent-return */.map(function (i) {
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
    label: "+ " + (value.length - theme.selectMultiple.maxInline) + " more"
  })));
};
exports.SelectMultipleValue = SelectMultipleValue;