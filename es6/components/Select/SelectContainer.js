var _excluded = ["clear", "onClear", "name", "theme"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { setFocusWithoutScroll, getHoverIndicatorStyle, containsFocus } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { StyledContainer, OptionsContainer, SelectOption } from './StyledSelect';
import { applyKey, useDisabled, getOptionLabel, getOptionValue } from './utils';
import { EmptySearchOption } from './EmptySearchOption';

// ensure ClearButton receives visual indication of keyboard
var StyledButton = styled(Button).withConfig({
  displayName: "SelectContainer__StyledButton",
  componentId: "sc-1wi0ul8-0"
})(["&:focus{", "}"], function (props) {
  return getHoverIndicatorStyle('background', props.theme);
});
var ClearButton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var clear = _ref.clear,
    onClear = _ref.onClear,
    name = _ref.name,
    theme = _ref.theme,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var label = clear.label,
    position = clear.position;
  var align = position !== 'bottom' ? 'start' : 'center';
  var buttonLabel = label || "Clear " + (name || 'selection');
  return /*#__PURE__*/React.createElement(StyledButton, _extends({
    a11yTitle: buttonLabel + ". Or, press " + (position === 'bottom' ? 'shift tab' : 'down arrow') + " to move to select options",
    fill: "horizontal",
    ref: ref,
    onClick: onClear,
    focusIndicator: false
  }, rest), /*#__PURE__*/React.createElement(Box, _extends({}, theme.select.clear.container, {
    align: align
  }), /*#__PURE__*/React.createElement(Text, theme.select.clear.text, buttonLabel)));
});
var SelectContainer = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var clear = _ref2.clear,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? null : _ref2$children,
    disabled = _ref2.disabled,
    disabledKey = _ref2.disabledKey,
    dropHeight = _ref2.dropHeight,
    _ref2$emptySearchMess = _ref2.emptySearchMessage,
    emptySearchMessage = _ref2$emptySearchMess === void 0 ? 'No matches found' : _ref2$emptySearchMess,
    id = _ref2.id,
    labelKey = _ref2.labelKey,
    multiple = _ref2.multiple,
    name = _ref2.name,
    onChange = _ref2.onChange,
    onKeyDown = _ref2.onKeyDown,
    onMore = _ref2.onMore,
    onSearch = _ref2.onSearch,
    optionIndexesInValue = _ref2.optionIndexesInValue,
    options = _ref2.options,
    allOptions = _ref2.allOptions,
    searchPlaceholder = _ref2.searchPlaceholder,
    search = _ref2.search,
    setSearch = _ref2.setSearch,
    selected = _ref2.selected,
    usingKeyboard = _ref2.usingKeyboard,
    _ref2$value = _ref2.value,
    value = _ref2$value === void 0 ? '' : _ref2$value,
    valueKey = _ref2.valueKey,
    _ref2$replace = _ref2.replace,
    replace = _ref2$replace === void 0 ? true : _ref2$replace;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var shouldShowClearButton = useCallback(function (position) {
    var hasValue = Boolean(multiple && value ? value.length : value);
    var showAtPosition = position === 'bottom' ? (clear == null ? void 0 : clear.position) === 'bottom' : (clear == null ? void 0 : clear.position) !== 'bottom';
    return clear && hasValue && showAtPosition;
  }, [clear, multiple, value]);
  var isDisabled = useDisabled(disabled, disabledKey, options, valueKey || labelKey);
  var _useState = useState(usingKeyboard && !shouldShowClearButton('top') ? 0 : -1),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var _useState2 = useState(usingKeyboard),
    keyboardNavigation = _useState2[0],
    setKeyboardNavigation = _useState2[1];
  var searchRef = useRef();
  var optionsRef = useRef();
  var clearRef = useRef();
  var activeRef = useRef();

  // for keyboard/screenreader, keep the active option in focus
  useEffect(function () {
    var _activeRef$current;
    if (activeIndex >= 0) (_activeRef$current = activeRef.current) == null || _activeRef$current.focus();
  }, [activeIndex]);

  // set initial focus
  useEffect(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var optionsNode = optionsRef.current;
      var clearButton = clearRef.current;
      if (onSearch) {
        var searchInput = searchRef.current;
        if (searchInput && searchInput.focus) {
          setFocusWithoutScroll(searchInput);
        }
      } else if (clear && clearButton && clearButton.focus && clear.position !== 'bottom') {
        setFocusWithoutScroll(clearButton);
      } else if (usingKeyboard && activeRef.current) {
        setFocusWithoutScroll(activeRef.current);
      } else if (optionsNode) {
        setFocusWithoutScroll(optionsNode);
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [onSearch, usingKeyboard, clear]);
  var isSelected = useCallback(function (index) {
    var result;
    if (selected) {
      // deprecated in favor of value
      result = selected.indexOf(index) !== -1;
    } else {
      var optionVal = getOptionValue(index, options, valueKey);
      if (Array.isArray(value)) {
        if (value.length === 0) {
          result = false;
        } else if (typeof value[0] !== 'object') {
          result = value.indexOf(optionVal) !== -1;
        } else if (valueKey) {
          result = value.some(function (valueItem) {
            var valueValue = typeof valueKey === 'function' ? valueKey(valueItem) : valueItem[valueKey] || valueItem[valueKey.key];
            return valueValue === optionVal;
          });
        }
      } else if (valueKey && value !== null && typeof value === 'object') {
        var valueValue = typeof valueKey === 'function' ? valueKey(value) : value[valueKey];
        result = valueValue === optionVal;
      } else {
        result = value === optionVal;
      }
    }
    return result;
  }, [selected, value, valueKey, options]);
  var selectOption = useCallback(function (index) {
    return function (event) {
      if (onChange) {
        var nextValue;
        var nextSelected;
        if (multiple) {
          var nextOptionIndexesInValue = optionIndexesInValue.slice(0);
          var allOptionsIndex = allOptions.indexOf(options[index]);
          var valueIndex = optionIndexesInValue.indexOf(allOptionsIndex);
          if (valueIndex === -1) {
            nextOptionIndexesInValue.push(allOptionsIndex);
          } else {
            nextOptionIndexesInValue.splice(valueIndex, 1);
          }
          nextValue = nextOptionIndexesInValue.map(function (i) {
            return valueKey && valueKey.reduce ? applyKey(allOptions[i], valueKey) : allOptions[i];
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
  }, [multiple, onChange, optionIndexesInValue, options, allOptions, valueKey]);
  var onClear = useCallback(function (event) {
    onChange(event, {
      option: undefined,
      value: '',
      selected: ''
    });
  }, [onChange]);
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
  }, [activeIndex, options, isDisabled]);
  var onPreviousOption = useCallback(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex - 1;
    if (nextActiveIndex === -1) {
      var searchInput = searchRef.current;
      var clearButton = clearRef.current;
      if (clearButton && clearButton.focus && shouldShowClearButton('top')) {
        setActiveIndex(nextActiveIndex);
        setFocusWithoutScroll(clearButton);
      } else if (searchInput && searchInput.focus) {
        setActiveIndex(nextActiveIndex);
        setFocusWithoutScroll(searchInput);
      }
    }
    while (nextActiveIndex >= 0 && isDisabled(nextActiveIndex)) {
      nextActiveIndex -= 1;
    }
    if (nextActiveIndex >= 0) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex, isDisabled, shouldShowClearButton]);
  var onKeyDownOption = useCallback(function (event) {
    if (!onSearch) {
      var nextActiveIndex = options.findIndex(function (e, index) {
        var label;
        if (typeof e === 'object') {
          label = e.label || applyKey(e, labelKey);
        } else {
          label = e;
        }
        return typeof label === 'string' && label.charAt(0).toLowerCase() === event.key.toLowerCase() && !isDisabled(index);
      });
      if (nextActiveIndex >= 0) {
        event.preventDefault();
        setActiveIndex(nextActiveIndex);
        setKeyboardNavigation(true);
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }, [isDisabled, labelKey, onKeyDown, options, onSearch]);
  var onActiveOption = useCallback(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = useCallback(function (event) {
    if ((shouldShowClearButton('bottom') || shouldShowClearButton('top')) && containsFocus(clearRef.current)) {
      onChange(event, {
        option: undefined,
        value: '',
        selected: ''
      });
    } else if (activeIndex >= 0 && activeIndex < options.length) {
      event.preventDefault(); // prevent submitting forms
      selectOption(activeIndex)(event);
    }
  }, [activeIndex, selectOption, options, onChange, shouldShowClearButton]);
  var customSearchInput = theme.select.searchInput;
  var SelectTextInput = customSearchInput || TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onSelectOption,
    onSpace: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDownOption
  }, /*#__PURE__*/React.createElement(StyledContainer, {
    ref: ref,
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
  })), shouldShowClearButton('top') && /*#__PURE__*/React.createElement(ClearButton, {
    ref: clearRef,
    clear: clear,
    name: name,
    onClear: onClear,
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    onMouseOver: function onMouseOver() {
      return setActiveIndex(-1);
    },
    theme: theme
  }), options.length > 0 ? /*#__PURE__*/React.createElement(OptionsContainer, {
    role: "listbox",
    tabIndex: "-1",
    ref: optionsRef,
    "aria-multiselectable": multiple,
    onMouseMove: function onMouseMove() {
      return setKeyboardNavigation(false);
    }
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: options,
    step: theme.select.step,
    onMore: onMore,
    replace: replace,
    show: activeIndex !== -1 ? activeIndex : undefined
  }, function (option, index, optionRef) {
    var optionDisabled = isDisabled(index);
    var optionSelected = isSelected(index);
    var optionActive = activeIndex === index;
    // Determine whether the label is done as a child or
    // as an option Button kind property.
    var child;
    var textComponent = false;
    if (children) {
      child = children(option, index, options, {
        active: optionActive,
        disabled: optionDisabled,
        selected: optionSelected
      });
      if (typeof child === 'string' || child.props && child.props.children && typeof child.props.children === 'string') textComponent = true;
    } else if (theme.select.options) {
      child = /*#__PURE__*/React.createElement(Box, selectOptionsStyle, /*#__PURE__*/React.createElement(Text, theme.select.options.text, getOptionLabel(index, options, labelKey)));
      textComponent = true;
    }

    // if we have a child, turn on plain, and hoverIndicator
    return /*#__PURE__*/React.createElement(SelectOption
    // eslint-disable-next-line react/no-array-index-key
    , {
      key: index
      // merge optionRef and activeRef
      ,
      ref: function ref(node) {
        // eslint-disable-next-line no-param-reassign
        if (optionRef) optionRef.current = node;
        if (optionActive) activeRef.current = node;
      },
      tabIndex: optionSelected ? '0' : '-1',
      role: "option",
      "aria-setsize": options.length,
      "aria-posinset": index + 1,
      "aria-selected": optionSelected,
      focusIndicator: false,
      "aria-disabled": optionDisabled || undefined,
      plain: !child ? undefined : true,
      align: "start",
      kind: !child ? 'option' : undefined,
      label: !child ? getOptionLabel(index, options, labelKey || valueKey) : undefined,
      disabled: optionDisabled || undefined,
      active: optionActive,
      selected: optionSelected
      // allow keyboard navigation to start from
      // selected option after tabbing to it
      ,
      onFocus: function onFocus() {
        return setActiveIndex(index);
      },
      onMouseOver: !optionDisabled ? onActiveOption(index) : undefined,
      onClick: !optionDisabled ? selectOption(index) : undefined,
      textComponent: textComponent
    }, child);
  })) : /*#__PURE__*/React.createElement(EmptySearchOption, {
    emptySearchMessage: emptySearchMessage,
    selectOptionsStyle: selectOptionsStyle,
    theme: theme
  }), shouldShowClearButton('bottom') && /*#__PURE__*/React.createElement(ClearButton, {
    ref: clearRef,
    clear: clear,
    name: name,
    onClear: onClear,
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    onMouseOver: function onMouseOver() {
      return setActiveIndex(-1);
    },
    theme: theme
  })));
});
export { SelectContainer };