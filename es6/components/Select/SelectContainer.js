var _excluded = ["clear", "onClear", "name", "theme"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { setFocusWithoutScroll, getHoverIndicatorStyle, containsFocus } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { StyledContainer, OptionsContainer, SelectOption } from './StyledSelect';
import { applyKey, useDisabled, getOptionLabel, getOptionValue } from './utils';
import { EmptySearchOption } from './EmptySearchOption';
import { useThemeValue } from '../../utils/useThemeValue';

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
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/React.createElement(StyledButton, _extends({
    a11yTitle: buttonLabel + ". Or, press " + (position === 'bottom' ? 'shift tab' : 'down arrow') + " to move to select options",
    fill: "horizontal",
    ref: ref,
    onClick: onClear,
    focusIndicator: false,
    plain: true
  }, passThemeFlag, rest), function (_ref2) {
    var _theme$select$clear;
    var hover = _ref2.hover;
    var boxProps = _extends({}, theme.select.clear.container);
    delete boxProps.hover; // avoid passing hover object to Box
    return /*#__PURE__*/React.createElement(Box, _extends({}, boxProps, hover ? (_theme$select$clear = theme.select.clear) == null || (_theme$select$clear = _theme$select$clear.container) == null ? void 0 : _theme$select$clear.hover : {}, {
      align: align
    }), /*#__PURE__*/React.createElement(Text, theme.select.clear.text, buttonLabel));
  });
});
var SelectContainer = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var clear = _ref3.clear,
    _ref3$children = _ref3.children,
    children = _ref3$children === void 0 ? null : _ref3$children,
    disabled = _ref3.disabled,
    disabledKey = _ref3.disabledKey,
    dropHeight = _ref3.dropHeight,
    _ref3$emptySearchMess = _ref3.emptySearchMessage,
    emptySearchMessage = _ref3$emptySearchMess === void 0 ? 'No matches found' : _ref3$emptySearchMess,
    id = _ref3.id,
    labelKey = _ref3.labelKey,
    multiple = _ref3.multiple,
    name = _ref3.name,
    onChange = _ref3.onChange,
    onKeyDown = _ref3.onKeyDown,
    onMore = _ref3.onMore,
    onSearch = _ref3.onSearch,
    optionIndexesInValue = _ref3.optionIndexesInValue,
    options = _ref3.options,
    allOptions = _ref3.allOptions,
    searchPlaceholder = _ref3.searchPlaceholder,
    search = _ref3.search,
    setSearch = _ref3.setSearch,
    selected = _ref3.selected,
    usingKeyboard = _ref3.usingKeyboard,
    _ref3$value = _ref3.value,
    value = _ref3$value === void 0 ? '' : _ref3$value,
    valueKey = _ref3.valueKey,
    _ref3$replace = _ref3.replace,
    replace = _ref3$replace === void 0 ? true : _ref3$replace;
  var _useThemeValue2 = useThemeValue(),
    theme = _useThemeValue2.theme,
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var shouldShowClearButton = useCallback(function (position) {
    var hasValue = Boolean(multiple && value ? value.length : value);
    var showAtPosition = position === 'bottom' ? (clear == null ? void 0 : clear.position) === 'bottom' : (clear == null ? void 0 : clear.position) !== 'bottom';
    return clear && hasValue && showAtPosition;
  }, [clear, multiple, value]);
  var isDisabled = useDisabled(disabled, disabledKey, options, valueKey || labelKey);
  var _useState = useState(usingKeyboard && !shouldShowClearButton('top') && !onSearch ? 0 : -1),
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
        if (searchInput && searchInput.focus && !activeRef.current) {
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
  }, /*#__PURE__*/React.createElement(StyledContainer, _extends({
    ref: ref,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight
  }, passThemeFlag), onSearch && /*#__PURE__*/React.createElement(Box, {
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
    // lint isn't flagging this but we shouldn't use index
    // as a key see no-array-index-key lint rule
    , _extends({
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
      onMouseOut: !optionDisabled ? onActiveOption(-1) : undefined,
      onClick: !optionDisabled ? selectOption(index) : undefined,
      textComponent: textComponent
    }, passThemeFlag), child);
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