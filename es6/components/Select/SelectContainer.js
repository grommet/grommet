function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { selectedStyle, setFocusWithoutScroll } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { StyledContainer } from './StyledSelect';
import { applyKey } from './utils'; // position relative is so scroll can be managed correctly

var OptionsBox = styled.div.withConfig({
  displayName: "SelectContainer__OptionsBox",
  componentId: "sc-1wi0ul8-0"
})(["position:relative;scroll-behavior:smooth;overflow:auto;outline:none;"]);
var OptionBox = styled(Box).withConfig({
  displayName: "SelectContainer__OptionBox",
  componentId: "sc-1wi0ul8-1"
})(["", ""], function (props) {
  return props.selected && selectedStyle;
});
var SelectOption = styled(Button).withConfig({
  displayName: "SelectContainer__SelectOption",
  componentId: "sc-1wi0ul8-2"
})(["display:block;width:100%;"]);
var SelectContainer = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children,
      disabled = _ref.disabled,
      disabledKey = _ref.disabledKey,
      dropHeight = _ref.dropHeight,
      _ref$emptySearchMessa = _ref.emptySearchMessage,
      emptySearchMessage = _ref$emptySearchMessa === void 0 ? 'No matches found' : _ref$emptySearchMessa,
      id = _ref.id,
      labelKey = _ref.labelKey,
      multiple = _ref.multiple,
      onChange = _ref.onChange,
      onKeyDown = _ref.onKeyDown,
      onMore = _ref.onMore,
      onSearch = _ref.onSearch,
      optionIndexesInValue = _ref.optionIndexesInValue,
      options = _ref.options,
      searchPlaceholder = _ref.searchPlaceholder,
      selected = _ref.selected,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      valueKey = _ref.valueKey,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? true : _ref$replace;
  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      search = _useState[0],
      setSearch = _useState[1];

  var _useState2 = useState(-1),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  var _useState3 = useState(),
      keyboardNavigation = _useState3[0],
      setKeyboardNavigation = _useState3[1];

  var searchRef = useRef();
  var optionsRef = useRef(); // adjust activeIndex when options change

  useEffect(function () {
    if (activeIndex === -1 && search && optionIndexesInValue.length) {
      setActiveIndex(optionIndexesInValue[0]);
    }
  }, [activeIndex, optionIndexesInValue, search]); // set initial focus

  useEffect(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var optionsNode = optionsRef.current;

      if (onSearch) {
        var searchInput = searchRef.current;

        if (searchInput && searchInput.focus) {
          setFocusWithoutScroll(searchInput);
        }
      } else if (optionsNode) {
        setFocusWithoutScroll(optionsNode);
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [onSearch]); // clear keyboardNavigation after a while

  useEffect(function () {
    if (keyboardNavigation) {
      // 100ms was empirically determined
      var timer = setTimeout(function () {
        return setKeyboardNavigation(false);
      }, 100);
      return function () {
        return clearTimeout(timer);
      };
    }

    return undefined;
  }, [keyboardNavigation]);
  var optionLabel = useCallback(function (index) {
    return applyKey(options[index], labelKey);
  }, [labelKey, options]);
  var optionValue = useCallback(function (index) {
    return applyKey(options[index], valueKey);
  }, [options, valueKey]);
  var isDisabled = useCallback(function (index) {
    var option = options[index];
    var result;

    if (disabledKey) {
      result = applyKey(option, disabledKey);
    } else if (Array.isArray(disabled)) {
      if (typeof disabled[0] === 'number') {
        result = disabled.indexOf(index) !== -1;
      } else {
        var optionVal = optionValue(index);
        result = disabled.indexOf(optionVal) !== -1;
      }
    }

    return result;
  }, [disabled, disabledKey, options, optionValue]);
  var isSelected = useCallback(function (index) {
    var result;

    if (selected) {
      // deprecated in favor of value
      result = selected.indexOf(index) !== -1;
    } else {
      var optionVal = optionValue(index);

      if (Array.isArray(value)) {
        if (value.length === 0) {
          result = false;
        } else if (typeof value[0] !== 'object') {
          result = value.indexOf(optionVal) !== -1;
        } else if (valueKey) {
          result = value.some(function (valueItem) {
            var valueValue = typeof valueKey === 'function' ? valueKey(valueItem) : valueItem[valueKey];
            return valueValue === optionVal;
          });
        }
      } else if (valueKey && typeof value === 'object') {
        var valueValue = typeof valueKey === 'function' ? valueKey(value) : value[valueKey];
        result = valueValue === optionVal;
      } else {
        result = value === optionVal;
      }
    }

    return result;
  }, [optionValue, selected, value, valueKey]);
  var selectOption = useCallback(function (index) {
    return function (event) {
      if (onChange) {
        var nextValue;
        var nextSelected;

        if (multiple) {
          var nextOptionIndexesInValue = optionIndexesInValue.slice(0);
          var valueIndex = optionIndexesInValue.indexOf(index);

          if (valueIndex === -1) {
            nextOptionIndexesInValue.push(index);
          } else {
            nextOptionIndexesInValue.splice(valueIndex, 1);
          }

          nextValue = nextOptionIndexesInValue.map(function (i) {
            return valueKey && valueKey.reduce ? applyKey(options[i], valueKey) : options[i];
          });
          nextSelected = nextOptionIndexesInValue;
        } else {
          nextValue = valueKey && valueKey.reduce ? applyKey(options[index], valueKey) : options[index];
          nextSelected = index;
        }

        onChange(event, {
          option: options[index],
          value: nextValue,
          selected: nextSelected
        });
      }
    };
  }, [multiple, onChange, optionIndexesInValue, options, valueKey]);
  var onNextOption = useCallback(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex + 1;

    while (nextActiveIndex < options.length && isDisabled(nextActiveIndex)) {
      nextActiveIndex += 1;
    }

    if (nextActiveIndex !== options.length) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex, isDisabled, options]);
  var onPreviousOption = useCallback(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex - 1;

    while (nextActiveIndex >= 0 && isDisabled(nextActiveIndex)) {
      nextActiveIndex -= 1;
    }

    if (nextActiveIndex >= 0) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex, isDisabled]);
  var onActiveOption = useCallback(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = useCallback(function (event) {
    if (activeIndex >= 0) {
      event.preventDefault(); // prevent submitting forms

      selectOption(activeIndex)(event);
    }
  }, [activeIndex, selectOption]);
  var customSearchInput = theme.select.searchInput;
  var SelectTextInput = customSearchInput || TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(StyledContainer, {
    ref: ref,
    as: Box,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight
  }, onSearch && /*#__PURE__*/React.createElement(Box, {
    pad: !customSearchInput ? 'xsmall' : undefined,
    flex: false
  }, /*#__PURE__*/React.createElement(SelectTextInput, {
    focusIndicator: !customSearchInput,
    size: "small",
    ref: searchRef,
    type: "search",
    value: search || '',
    placeholder: searchPlaceholder,
    onChange: function onChange(event) {
      var nextSearch = event.target.value;
      setSearch(nextSearch);
      setActiveIndex(-1);
      onSearch(nextSearch);
    }
  })), /*#__PURE__*/React.createElement(OptionsBox, {
    role: "menubar",
    tabIndex: "-1",
    ref: optionsRef
  }, options.length > 0 ? /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: options,
    step: theme.select.step,
    onMore: onMore,
    replace: replace,
    show: activeIndex !== -1 ? activeIndex : undefined
  }, function (option, index, optionRef) {
    var optionDisabled = isDisabled(index);
    var optionSelected = isSelected(index);
    var optionActive = activeIndex === index; // Determine whether the label is done as a child or
    // as an option Button kind property.

    var child;
    if (children) child = children(option, index, options, {
      active: optionActive,
      disabled: optionDisabled,
      selected: optionSelected
    });else if (theme.select.options) child = /*#__PURE__*/React.createElement(OptionBox, _extends({}, selectOptionsStyle, {
      selected: optionSelected
    }), /*#__PURE__*/React.createElement(Text, theme.select.options.text, optionLabel(index))); // if we have a child, turn on plain, and hoverIndicator

    return /*#__PURE__*/React.createElement(SelectOption // eslint-disable-next-line react/no-array-index-key
    , {
      key: index,
      ref: optionRef,
      tabIndex: "-1",
      role: "menuitem",
      plain: !child ? undefined : true,
      align: "start",
      kind: !child ? 'option' : undefined,
      hoverIndicator: !child ? undefined : 'background',
      label: !child ? optionLabel(index) : undefined,
      disabled: optionDisabled || undefined,
      active: optionActive,
      selected: optionSelected,
      option: option,
      onMouseOver: !optionDisabled ? onActiveOption(index) : undefined,
      onClick: !optionDisabled ? selectOption(index) : undefined
    }, child);
  }) : /*#__PURE__*/React.createElement(SelectOption, {
    key: "search_empty",
    tabIndex: "-1",
    role: "menuitem",
    hoverIndicator: "background",
    disabled: true,
    option: emptySearchMessage
  }, /*#__PURE__*/React.createElement(OptionBox, selectOptionsStyle, /*#__PURE__*/React.createElement(Text, theme.select.container.text, emptySearchMessage))))));
});
export { SelectContainer };