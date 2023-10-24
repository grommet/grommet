function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { setFocusWithoutScroll } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { SelectionSummary } from './SelectionSummary';
import { StyledContainer, OptionsContainer, SelectOption } from '../Select/StyledSelect';
import { applyKey, getOptionLabel, getOptionValue, useDisabled, getOptionIndex, arrayIncludes } from '../Select/utils';
import { EmptySearchOption } from '../Select/EmptySearchOption';
var SelectMultipleContainer = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _optionsRef$current;
  var allOptions = _ref.allOptions,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    disabledProp = _ref.disabled,
    disabledKey = _ref.disabledKey,
    dropHeight = _ref.dropHeight,
    _ref$emptySearchMessa = _ref.emptySearchMessage,
    emptySearchMessage = _ref$emptySearchMessa === void 0 ? 'No matches found' : _ref$emptySearchMessa,
    help = _ref.help,
    icon = _ref.icon,
    id = _ref.id,
    labelKey = _ref.labelKey,
    limit = _ref.limit,
    onChange = _ref.onChange,
    onClose = _ref.onClose,
    onKeyDown = _ref.onKeyDown,
    onMore = _ref.onMore,
    onSearch = _ref.onSearch,
    optionIndexesInValue = _ref.optionIndexesInValue,
    options = _ref.options,
    _ref$replace = _ref.replace,
    replace = _ref$replace === void 0 ? true : _ref$replace,
    searchPlaceholder = _ref.searchPlaceholder,
    search = _ref.search,
    setSearch = _ref.setSearch,
    usingKeyboard = _ref.usingKeyboard,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    valueKey = _ref.valueKey,
    showSelectedInline = _ref.showSelectedInline;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useState = useState(-1),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var _useState2 = useState(usingKeyboard),
    keyboardNavigation = _useState2[0],
    setKeyboardNavigation = _useState2[1];
  var searchRef = useRef();
  var optionsRef = useRef();
  var _useState3 = useState(disabledProp),
    disabled = _useState3[0],
    setDisabled = _useState3[1];
  var activeRef = useRef();
  var _useState4 = useState(),
    showA11yLimit = _useState4[0],
    setShowA11yLimit = _useState4[1];
  var clearRef = useRef();
  var isDisabled = useDisabled(disabled, disabledKey, options, valueKey || labelKey);

  // for keyboard/screenreader, keep the active option in focus
  useEffect(function () {
    var _activeRef$current;
    if (activeIndex) (_activeRef$current = activeRef.current) == null || _activeRef$current.focus();
  }, [activeIndex]);

  // set initial focus
  useEffect(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var clearButton = clearRef.current;
      if (clearButton && clearButton.focus) {
        setFocusWithoutScroll(clearButton);
      } else if (searchRef && searchRef.current) {
        var searchInput = searchRef.current;
        if (searchInput && searchInput.focus) {
          setFocusWithoutScroll(searchInput);
        }
      } else if (activeRef.current) {
        setFocusWithoutScroll(activeRef.current);
      } else if (optionsRef.current) {
        setActiveIndex(0);
      }
    }, 100); // Drop should be open after 100ms
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  useEffect(function () {
    var optionsNode = optionsRef.current;
    if (optionsNode != null && optionsNode.children) {
      var optionNode = optionsNode.children[activeIndex];
      if (optionNode) optionNode.focus();
    }
  }, [activeIndex]);
  var isSelected = useCallback(function (index) {
    var result;
    var optionVal = getOptionValue(index, options, valueKey || labelKey);
    if (value) {
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
    }
    return result;
  }, [value, valueKey, options, labelKey]);
  var selectOption = useCallback(function (index) {
    return function (event) {
      if (onChange) {
        var nextOptionIndexesInValue = optionIndexesInValue.slice(0);
        var allOptionsIndex = getOptionIndex(allOptions, options[index], valueKey || labelKey);
        var valueIndex = optionIndexesInValue.indexOf(allOptionsIndex);
        if (valueIndex === -1 && (!limit || (value == null ? void 0 : value.length) < limit)) {
          nextOptionIndexesInValue.push(allOptionsIndex);
        } else {
          nextOptionIndexesInValue.splice(valueIndex, 1);
        }
        var nextValue = nextOptionIndexesInValue.map(function (i) {
          return valueKey && valueKey.reduce ? applyKey(allOptions[i], valueKey) : allOptions[i];
        });
        var nextSelected = nextOptionIndexesInValue;
        onChange(event, {
          option: options[index],
          value: nextValue,
          selected: nextSelected
        });
      }
    };
  }, [labelKey, limit, onChange, optionIndexesInValue, options, allOptions, valueKey, value]);
  var onNextOption = useCallback(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex + 1;
    if (nextActiveIndex !== (options == null ? void 0 : options.length)) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex, options]);
  var onPreviousOption = useCallback(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex - 1;
    if (nextActiveIndex === -1) {
      var searchInput = searchRef.current;
      if (searchInput && searchInput.focus) {
        setActiveIndex(nextActiveIndex);
        setFocusWithoutScroll(searchInput);
      }
    }
    if (nextActiveIndex >= 0) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex]);
  var onKeyDownOption = useCallback(function (event) {
    if (!onSearch) {
      var nextActiveIndex = options.findIndex(function (e) {
        var label;
        if (typeof e === 'object') {
          label = e.label || applyKey(e, labelKey);
        } else {
          label = e;
        }
        return typeof label === 'string' && label.charAt(0).toLowerCase() === event.key.toLowerCase();
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
  }, [onKeyDown, options, onSearch, labelKey]);
  var onActiveOption = useCallback(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = useCallback(function (event) {
    if (!isDisabled(activeIndex) && activeIndex >= 0 && activeIndex < (options == null ? void 0 : options.length)) {
      event.preventDefault(); // prevent submitting forms
      selectOption(activeIndex)(event);
    }
  }, [activeIndex, selectOption, options, isDisabled]);
  var customSearchInput = theme.select.searchInput;
  var SelectTextInput = customSearchInput || TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};

  // handle when limit is reached
  useEffect(function () {
    var originallyDisabled = function originallyDisabled(index) {
      var option = allOptions[index];
      var result;
      if (disabledKey) {
        result = applyKey(option, disabledKey);
      } else if (Array.isArray(disabledProp)) {
        if (typeof disabledProp[0] === 'number') {
          result = disabledProp.indexOf(index) !== -1;
        } else {
          result = getOptionIndex(disabledProp, getOptionValue(index, options, valueKey || labelKey), valueKey || labelKey) !== -1;
        }
      }
      return result;
    };
    if (value && limit) {
      if (value.length === limit) {
        var newDisabled = [].concat(disabledProp);
        // disable everything that is not selected
        for (var i = 0; i < (options == null ? void 0 : options.length); i += 1) {
          if (!isSelected(i) && !originallyDisabled(i)) {
            newDisabled.push(options[i]);
          }
        }
        if (usingKeyboard) setShowA11yLimit('Selected. Maximum selection limit reached.');
        setDisabled(newDisabled);
      } else {
        if (usingKeyboard) setShowA11yLimit(undefined);
        setDisabled(disabledProp);
      }
    }
  }, [isSelected, value, limit, disabledProp, allOptions, disabledKey, labelKey, options, usingKeyboard, valueKey]);

  // reset showA11yLimit after announcement is read
  useEffect(function () {
    if (showA11yLimit !== undefined) {
      setTimeout(function () {
        setShowA11yLimit(undefined);
      }, 2000); // value chosen based on length of a11yLimit message
    }
  }, [showA11yLimit]);
  var summaryContent = /*#__PURE__*/React.createElement(SelectionSummary, {
    allOptions: allOptions,
    clearRef: clearRef,
    disabled: disabled,
    disabledKey: disabledKey,
    isSelected: isSelected,
    labelKey: labelKey,
    limit: limit,
    onChange: onChange,
    onMore: onMore,
    options: options,
    search: search,
    setActiveIndex: setActiveIndex,
    showSelectedInline: showSelectedInline,
    value: value,
    valueKey: valueKey
  });
  var helpContent;
  if (help) {
    if (typeof help === 'string') helpContent = /*#__PURE__*/React.createElement(Box, {
      flex: false,
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, help));else helpContent = /*#__PURE__*/React.createElement(Box, {
      flex: false
    }, help);
  }
  if (showSelectedInline) summaryContent = /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "between",
    flex: false
  }, summaryContent, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Button, {
    fill: "vertical",
    onClick: onClose,
    a11yTitle: "Close Select"
  }, icon)));
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onSelectOption,
    onSpace: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDownOption,
    onEsc: onClose
  }, /*#__PURE__*/React.createElement(StyledContainer, {
    ref: ref,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight,
    a11yTitle: "Select dropdown"
  }, summaryContent, onSearch && /*#__PURE__*/React.createElement(Box, {
    pad: !customSearchInput ? 'xsmall' : undefined,
    flex: false
  }, /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: function onEnter(event) {
      onNextOption(event);
    }
  }, /*#__PURE__*/React.createElement(SelectTextInput, {
    a11yTitle: "Search to filter options.",
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
  }))), helpContent, (options == null ? void 0 : options.length) > 0 ? /*#__PURE__*/React.createElement(OptionsContainer, {
    role: "listbox",
    tabIndex: "0",
    ref: optionsRef,
    "aria-multiselectable": true,
    onMouseMove: function onMouseMove() {
      return setKeyboardNavigation(false);
    },
    "aria-activedescendant": optionsRef == null || (_optionsRef$current = optionsRef.current) == null ? void 0 : _optionsRef$current.children[activeIndex]
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: options,
    step: theme.select.step,
    onMore: onMore,
    replace: replace,
    show: activeIndex !== -1 ? activeIndex : undefined
  }, function (option, index, optionRef) {
    var optionDisabled = isDisabled(index);
    var optionSelected = value ? arrayIncludes(value, valueKey && valueKey.reduce ? applyKey(option, valueKey) : option, valueKey || labelKey) : false;
    var optionActive = activeIndex === index;
    var optionLabel = getOptionLabel(index, options, labelKey || valueKey);

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
    } else {
      child = /*#__PURE__*/React.createElement(CheckBox, {
        label: /*#__PURE__*/React.createElement(Box, {
          alignSelf: "center",
          width: "100%",
          align: "start"
        }, optionLabel),
        pad: "xsmall",
        tabIndex: "-1",
        checked: optionSelected,
        disabled: optionDisabled
      });
    }
    if (!children && search) {
      var searchText = search.toLowerCase();
      if (typeof optionLabel === 'string' && optionLabel.toLowerCase().indexOf(searchText) >= 0) {
        // code to bold search term in matching options
        var boldIndex = optionLabel.toLowerCase().indexOf(searchText);
        var childBeginning = optionLabel.substring(0, boldIndex);
        var childBold = optionLabel.substring(boldIndex, boldIndex + searchText.length);
        childBold = /*#__PURE__*/React.createElement("b", null, childBold);
        var childEnd = optionLabel.substring(boldIndex + searchText.length);
        child = /*#__PURE__*/React.createElement(CheckBox, {
          label: /*#__PURE__*/React.createElement(Box, {
            alignSelf: "center",
            width: "100%",
            align: "start",
            direction: "row"
          }, /*#__PURE__*/React.createElement(Text, null, childBeginning, childBold, childEnd)),
          pad: "xsmall",
          tabIndex: "-1",
          checked: optionSelected,
          disabled: optionDisabled
        });
      }
    }

    // if we have a child, turn on plain, and hoverIndicator
    return /*#__PURE__*/React.createElement(SelectOption, {
      a11yTitle: optionSelected ? optionLabel + " selected" : optionLabel + " not selected"
      // eslint-disable-next-line react/no-array-index-key
      ,
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
      id: "option" + index,
      "aria-setsize": options.length,
      "aria-posinset": index + 1,
      "aria-selected": optionSelected,
      focusIndicator: false,
      "aria-disabled": optionDisabled || undefined,
      plain: !child ? undefined : true,
      align: "start",
      kind: !child ? 'option' : undefined,
      active: optionActive,
      selected: optionSelected,
      onMouseOver: !optionDisabled ? onActiveOption(index) : undefined,
      onClick: !optionDisabled ? selectOption(index) : undefined,
      onFocus: function onFocus() {
        return setActiveIndex(index);
      },
      textComponent: textComponent
    }, child);
  })) : /*#__PURE__*/React.createElement(EmptySearchOption, {
    emptySearchMessage: emptySearchMessage,
    selectOptionsStyle: selectOptionsStyle,
    theme: theme
  }), usingKeyboard && showA11yLimit && /*#__PURE__*/React.createElement(Box, {
    height: "0px",
    width: "0px",
    overflow: "hidden"
    // announce when we reach the limit of items
    // that can be selected
    ,
    "aria-live": "assertive",
    role: "alert"
  }, showA11yLimit)));
});
export { SelectMultipleContainer };