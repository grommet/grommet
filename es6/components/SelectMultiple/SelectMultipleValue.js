import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { SelectOption } from '../Select/StyledSelect';
import { applyKey, getOptionLabel, getOptionValue, useDisabled } from '../Select/utils';

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

  var _useState = useState(false),
      showA11yDiv = _useState[0],
      setShowA11yDiv = _useState[1];

  var isDisabled = useDisabled(disabled, disabledKey, allOptions, valueKey || labelKey);
  var visibleValue = useCallback(function (i) {
    var optionValue = valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
    var indexOptions = allOptions.indexOf(i);
    var optionLabel = getOptionLabel(indexOptions, allOptions, labelKey || valueKey);
    var optionDisabled = isDisabled(indexOptions);

    if (value.indexOf(optionValue) < theme.selectMultiple.maxInline) {
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
        a11yTitle: value.includes(optionValue) ? optionLabel + " selected" : optionLabel + " not selected",
        "aria-setsize": value.length,
        "aria-posinset": value.indexOf(optionValue) + 1,
        "aria-selected": value.includes(optionValue),
        "aria-disabled": optionDisabled,
        plain: true,
        hoverIndicator: !optionDisabled,
        fill: "horizontal",
        tabIndex: "0",
        onClick: function onClick(event) {
          if (!optionDisabled) {
            var intermediate = [].concat(value);
            var index = value.indexOf(optionValue);

            if (intermediate.includes(optionValue)) {
              onSelectChange(event, {
                option: optionValue,
                value: intermediate.filter(function (v) {
                  return v !== optionValue;
                })
              });

              if (index !== intermediate.length - 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[index + 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = allOptions.find(function (obj, j) {
                    return getOptionValue(j, allOptions, valueKey || labelKey) === intermediate[index + 1];
                  });
                  setShowA11yDiv("Unselected " + optionLabel + ". \n                        Focus moved to " + getOptionLabel(allOptions.indexOf(result), allOptions, labelKey || valueKey));
                }, 200); // Timeout needed to allow screen reader
                // time to announce and next item to display on
                // screen. Based on testing, 200ms is enough time
              } else if (intermediate.length !== 1) {
                setTimeout(function () {
                  var nextFocus = document.getElementById("selected-" + intermediate[index - 1]);
                  if (nextFocus) nextFocus.focus();
                  var result = allOptions.find(function (obj, j) {
                    return getOptionValue(j, allOptions, valueKey || labelKey) === intermediate[index - 1];
                  });
                  setShowA11yDiv("Unselected " + optionLabel + ". Focus moved to \n                          " + getOptionLabel(allOptions.indexOf(result), allOptions, labelKey || valueKey));
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
        pad: "xsmall",
        tabIndex: "-1",
        checked: value.includes(optionValue)
      }));
    }

    return undefined;
  }, [valueKey, allOptions, children, dropButtonRef, isDisabled, labelKey, onSelectChange, value, theme.selectMultiple.maxInline]); // After announcing set showA11yDiv to undefined so it won't
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
    a11yTitle: "Selected Options"
  }, value && allOptions.filter(function (i) {
    return value.indexOf(valueKey && valueKey.reduce ? applyKey(i, valueKey) : i) !== -1;
  })
  /* eslint-disable-next-line array-callback-return, 
      consistent-return */
  .map(function (i) {
    return visibleValue(i);
  }), showA11yDiv && /*#__PURE__*/React.createElement(Box, {
    height: "0px",
    width: "0px",
    overflow: "hidden" // announce when an item is removed from selected options
    ,
    "aria-live": "assertive",
    role: "alert"
  }, showA11yDiv)), value && value.length > theme.selectMultiple.maxInline && /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'small',
      bottom: 'small',
      top: 'xsmall'
    },
    alignSelf: "start"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onRequestOpen,
    size: "small",
    label: "+ " + (value.length - theme.selectMultiple.maxInline) + " more"
  })));
};

export { SelectMultipleValue };