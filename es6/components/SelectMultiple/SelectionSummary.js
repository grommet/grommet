import React, { useCallback } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { applyKey, getOptionValue, useDisabled, arrayIncludes } from '../Select/utils';
var SelectionSummary = function SelectionSummary(_ref) {
  var allOptions = _ref.allOptions,
    clearRef = _ref.clearRef,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    isSelected = _ref.isSelected,
    labelKey = _ref.labelKey,
    limit = _ref.limit,
    onChange = _ref.onChange,
    onMore = _ref.onMore,
    options = _ref.options,
    search = _ref.search,
    setActiveIndex = _ref.setActiveIndex,
    showSelectedInline = _ref.showSelectedInline,
    value = _ref.value,
    valueKey = _ref.valueKey;
  var isDisabled = useDisabled(disabled, disabledKey, options, valueKey || labelKey);
  var selectedValuesDisabled = useCallback(function () {
    var disabledSelected = 0;
    if (value) {
      for (var i = 0; i < allOptions.length; i += 1) {
        if (arrayIncludes(value, getOptionValue(i, options, valueKey || labelKey), valueKey || labelKey) && isDisabled(i)) disabledSelected += 1;
      }
      if (value.length === disabledSelected) return true;
    }
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);
  var selectedInSearch = useCallback(function () {
    return options == null ? void 0 : options.filter(function (option) {
      return arrayIncludes(value, option, valueKey || labelKey);
    });
  }, [options, value, valueKey, labelKey]);
  var showSelectAll = !!((value == null ? void 0 : value.length) === 0 || selectedValuesDisabled() || !value || selectedInSearch().length === 0);
  var summaryText = (value == null ? void 0 : value.length) === 0 || onMore || !value || search !== '' && search !== undefined ? ((value == null ? void 0 : value.length) || 0) + " selected" : ((value == null ? void 0 : value.length) || 0) + " selected of " + options.length;
  var summaryButtonClick = function summaryButtonClick(event) {
    if (onChange) {
      var nextSelected = options.filter(function (i, index) {
        return showSelectAll ? !isDisabled(index) || isSelected(index) : isDisabled(index) && isSelected(index);
      });
      if (search !== '' && search !== undefined && value) {
        if (showSelectAll) {
          nextSelected = nextSelected.concat(value);
        } else {
          value.forEach(function (item) {
            if (!arrayIncludes(options, item, valueKey || labelKey)) {
              nextSelected.push(item);
            }
          });
        }
      }
      var nextValue = nextSelected.map(function (i) {
        return valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
      });
      onChange(event, {
        option: options,
        value: nextValue,
        selected: nextSelected
      });
    }
    if (limit && !showSelectAll) setActiveIndex(0);
  };
  return /*#__PURE__*/React.createElement(Box, {
    pad: showSelectedInline ? {
      left: 'xsmall',
      vertical: 'xsmall'
    } : 'xsmall',
    direction: "row",
    justify: "between",
    gap: "small",
    fill: "horizontal",
    flex: showSelectedInline,
    align: "center",
    height: {
      min: 'xxsmall'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, summaryText), (options.length && (!limit || !(!value || (value == null ? void 0 : value.length) === 0 && selectedValuesDisabled()))) > 0 && (!onMore || onMore && (value == null ? void 0 : value.length) !== 0) && /*#__PURE__*/React.createElement(Button, {
    a11yTitle: showSelectAll ? "Select all " + options.length + " options" : (value == null ? void 0 : value.length) + " options selected. Clear all?",
    label: showSelectAll ? 'Select All' : 'Clear All',
    onClick: function onClick(event) {
      return summaryButtonClick(event);
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    ref: clearRef
  }));
};
export { SelectionSummary };