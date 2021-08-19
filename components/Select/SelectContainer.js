"use strict";

exports.__esModule = true;
exports.SelectContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _InfiniteScroll = require("../InfiniteScroll");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _TextInput = require("../TextInput");

var _StyledSelect = require("./StyledSelect");

var _utils2 = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// position relative is so scroll can be managed correctly
var OptionsBox = _styledComponents["default"].div.withConfig({
  displayName: "SelectContainer__OptionsBox",
  componentId: "sc-1wi0ul8-0"
})(["position:relative;scroll-behavior:smooth;overflow:auto;outline:none;"]);

var SelectOption = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "SelectContainer__SelectOption",
  componentId: "sc-1wi0ul8-1"
})(["", " display:block;width:100%;"], function (props) {
  return props.selected && props.textComponent && _utils.selectedStyle;
});

var ClearButton = function ClearButton(_ref) {
  var clear = _ref.clear,
      onClear = _ref.onClear,
      name = _ref.name,
      theme = _ref.theme,
      setFocus = _ref.setFocus;
  var label = clear.label,
      position = clear.position;
  var align = position !== 'bottom' ? 'start' : 'center';
  var buttonLabel = label || "Clear " + (name || 'selection');
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    onClick: onClear,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, theme.select.clear.container, {
    align: align
  }), /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.clear.text, buttonLabel)));
};

var SelectContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
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
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? '' : _ref2$value,
      valueKey = _ref2.valueKey,
      _ref2$replace = _ref2.replace,
      replace = _ref2$replace === void 0 ? true : _ref2$replace;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(-1),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  var _useState2 = (0, _react.useState)(),
      keyboardNavigation = _useState2[0],
      setKeyboardNavigation = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      focus = _useState3[0],
      setFocus = _useState3[1];

  var searchRef = (0, _react.useRef)();
  var optionsRef = (0, _react.useRef)(); // adjust activeIndex when options change

  (0, _react.useEffect)(function () {
    if (activeIndex === -1 && search && optionIndexesInValue.length) {
      setActiveIndex(optionIndexesInValue[0]);
    }
  }, [activeIndex, optionIndexesInValue, search]); // set initial focus

  (0, _react.useEffect)(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var optionsNode = optionsRef.current;

      if (onSearch) {
        var searchInput = searchRef.current;

        if (searchInput && searchInput.focus) {
          (0, _utils.setFocusWithoutScroll)(searchInput);
        }
      } else if (optionsNode) {
        (0, _utils.setFocusWithoutScroll)(optionsNode);
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [onSearch]); // clear keyboardNavigation after a while

  (0, _react.useEffect)(function () {
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
  var optionLabel = (0, _react.useCallback)(function (index) {
    return (0, _utils2.applyKey)(options[index], labelKey);
  }, [labelKey, options]);
  var optionValue = (0, _react.useCallback)(function (index) {
    return (0, _utils2.applyKey)(options[index], valueKey);
  }, [options, valueKey]);
  var isDisabled = (0, _react.useCallback)(function (index) {
    var option = options[index];
    var result;

    if (disabledKey) {
      result = (0, _utils2.applyKey)(option, disabledKey);
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
  var isSelected = (0, _react.useCallback)(function (index) {
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
  var selectOption = (0, _react.useCallback)(function (index) {
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
            return valueKey && valueKey.reduce ? (0, _utils2.applyKey)(allOptions[i], valueKey) : allOptions[i];
          });
          nextSelected = nextOptionIndexesInValue;
        } else {
          nextValue = valueKey && valueKey.reduce ? (0, _utils2.applyKey)(options[index], valueKey) : options[index];
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
  var onClear = (0, _react.useCallback)(function (event) {
    onChange(event, {
      option: undefined,
      value: '',
      selected: ''
    });
  }, [onChange]);
  var onNextOption = (0, _react.useCallback)(function (event) {
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
  var onPreviousOption = (0, _react.useCallback)(function (event) {
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
  var onKeyDownOption = (0, _react.useCallback)(function (event) {
    if (!onSearch) {
      var nextActiveIndex = options.findIndex(function (e, index) {
        var label;

        if (typeof e === 'object') {
          label = e.label || (0, _utils2.applyKey)(e, labelKey);
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
  }, [onKeyDown, options, isDisabled, onSearch, labelKey]);
  var onActiveOption = (0, _react.useCallback)(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = (0, _react.useCallback)(function (event) {
    if (activeIndex >= 0 && !focus) {
      event.preventDefault(); // prevent submitting forms

      selectOption(activeIndex)(event);
    }
  }, [activeIndex, selectOption, focus]);
  var customSearchInput = theme.select.searchInput;
  var SelectTextInput = customSearchInput || _TextInput.TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDownOption
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.StyledContainer, {
    ref: ref,
    as: _Box.Box,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight
  }, onSearch && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: !customSearchInput ? 'xsmall' : undefined,
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(SelectTextInput, {
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
  })), clear && clear.position !== 'bottom' && value && /*#__PURE__*/_react["default"].createElement(ClearButton, {
    clear: clear,
    name: name,
    onClear: onClear,
    theme: theme,
    setFocus: setFocus
  }), /*#__PURE__*/_react["default"].createElement(OptionsBox, {
    role: "menubar",
    tabIndex: "-1",
    ref: optionsRef
  }, options.length > 0 ? /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
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
    var textComponent = false;

    if (children) {
      child = children(option, index, options, {
        active: optionActive,
        disabled: optionDisabled,
        selected: optionSelected
      });
      if (typeof child === 'string' || child.props && child.props.children && typeof child.props.children === 'string') textComponent = true;
    } else if (theme.select.options) {
      child = /*#__PURE__*/_react["default"].createElement(_Box.Box, selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.options.text, optionLabel(index)));
      textComponent = true;
    } // if we have a child, turn on plain, and hoverIndicator


    return /*#__PURE__*/_react["default"].createElement(SelectOption // eslint-disable-next-line react/no-array-index-key
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
      onClick: !optionDisabled ? selectOption(index) : undefined,
      textComponent: textComponent
    }, child);
  }) : /*#__PURE__*/_react["default"].createElement(SelectOption, {
    key: "search_empty",
    tabIndex: "-1",
    role: "menuitem",
    hoverIndicator: "background",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.container.text, emptySearchMessage)))), clear && clear.position === 'bottom' && value && /*#__PURE__*/_react["default"].createElement(ClearButton, {
    clear: clear,
    name: name,
    onClear: onClear,
    theme: theme,
    setFocus: setFocus
  })));
});
exports.SelectContainer = SelectContainer;