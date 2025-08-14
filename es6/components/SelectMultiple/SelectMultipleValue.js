import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { SelectOption } from '../Select/StyledSelect';
import { applyKey, getOptionLabel, useDisabled, arrayIncludes, getOptionIndex, inertTrueValue } from '../Select/utils';
import { MessageContext } from '../../contexts/MessageContext';
var SelectMultipleValue = function SelectMultipleValue(_ref) {
  var _theme$selectMultiple2, _theme$selectMultiple3;
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
  var _useState = useState(false),
    showA11yDiv = _useState[0],
    setShowA11yDiv = _useState[1];
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var isDisabled = useDisabled(disabled, disabledKey, allOptions, valueKey || labelKey);
  var visibleValue = useCallback(function (i) {
    var optionValue = valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
    var optionSelected = arrayIncludes(value, optionValue, valueKey || labelKey);
    var indexOptions = getOptionIndex(allOptions, i, valueKey || labelKey);
    var optionLabel = getOptionLabel(indexOptions, allOptions, labelKey || valueKey);
    var optionDisabled = isDisabled(indexOptions);
    var valueIndex = getOptionIndex(value, optionValue, valueKey || labelKey);
    if (valueIndex < theme.selectMultiple.maxInline) {
      var _theme$selectMultiple;
      var child;
      if (children) {
        child = children(i, indexOptions, allOptions, {
          active: false,
          disabled: optionDisabled,
          selected: true
        });
      }
      return /*#__PURE__*/React.createElement(SelectOption, {
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
            if (arrayIncludes(intermediate, optionValue, valueKey || labelKey)) {
              onSelectChange(event, {
                option: optionValue,
                value: intermediate.filter(function (v) {
                  return typeof v === 'object' ? applyKey(v, valueKey || labelKey) !== applyKey(optionValue, valueKey || labelKey) : v !== optionValue;
                })
              });
              if (valueIndex !== intermediate.length - 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[valueIndex + 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = intermediate[valueIndex + 1];
                  setShowA11yDiv("Unselected " + optionLabel + ". \n                        Focus moved to " + getOptionLabel(getOptionIndex(allOptions, result, valueKey || labelKey), allOptions, labelKey || valueKey));
                }, 200); // Timeout needed to allow screen reader
                // time to announce and next item to display on
                // screen. Based on testing, 200ms is enough time
              } else if (intermediate.length !== 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[valueIndex - 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = intermediate[valueIndex - 1];
                  setShowA11yDiv("Unselected " + optionLabel + ". Focus moved to \n                          " + getOptionLabel(getOptionIndex(allOptions, result, valueKey || labelKey), allOptions, labelKey || valueKey));
                }, 200); // Timeout needed to allow screen reader
                // time to announce and next item to display on
                // screen. Based on testing, 200ms is enough time
              } else if (dropButtonRef.current) dropButtonRef.current.focus();
            }
          }
        },
        key: optionLabel,
        id: "selected-" + optionValue
      }, child || /*#__PURE__*/React.createElement(CheckBox, {
        disabled: optionDisabled,
        label: /*#__PURE__*/React.createElement(Box, {
          alignSelf: "center",
          align: "start"
        }, optionLabel),
        key: optionLabel,
        pad: (_theme$selectMultiple = theme.selectMultiple) == null || (_theme$selectMultiple = _theme$selectMultiple.option) == null ? void 0 : _theme$selectMultiple.pad,
        tabIndex: "-1",
        checked: optionSelected,
        inert: inertTrueValue,
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
  }, [allOptions, children, dropButtonRef, format, isDisabled, labelKey, messages, onSelectChange, theme.selectMultiple.maxInline, (_theme$selectMultiple2 = theme.selectMultiple) == null || (_theme$selectMultiple2 = _theme$selectMultiple2.option) == null ? void 0 : _theme$selectMultiple2.pad, value, valueKey]);

  // After announcing set showA11yDiv to undefined so it won't
  // be read out again
  useEffect(function () {
    if (showA11yDiv !== undefined) {
      setTimeout(function () {
        setShowA11yDiv(undefined);
      }, 1000);
    }
  }, [showA11yDiv]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    role: "listbox",
    "aria-multiselectable": true,
    a11yTitle: format({
      id: 'selectMultiple.selectedOptions',
      messages: messages
    })
  }, value && allOptions.filter(function (i) {
    return arrayIncludes(value, valueKey && valueKey.reduce ? applyKey(i, valueKey) : i, valueKey || labelKey);
  }).map(function (i) {
    return visibleValue(i);
  }), showA11yDiv && /*#__PURE__*/React.createElement(Box, {
    height: "0px",
    width: "0px",
    overflow: "hidden"
    // announce when an item is removed from selected options
    ,
    "aria-live": "assertive",
    role: "alert"
  }, showA11yDiv)), value && value.length > theme.selectMultiple.maxInline && /*#__PURE__*/React.createElement(Box, {
    pad: (_theme$selectMultiple3 = theme.selectMultiple) == null || (_theme$selectMultiple3 = _theme$selectMultiple3.showMore) == null ? void 0 : _theme$selectMultiple3.pad,
    alignSelf: "start"
  }, /*#__PURE__*/React.createElement(Button, {
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
export { SelectMultipleValue };