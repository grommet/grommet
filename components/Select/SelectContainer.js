"use strict";

exports.__esModule = true;
exports.SelectContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _Button = require("../Button");
var _InfiniteScroll = require("../InfiniteScroll");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _TextInput = require("../TextInput");
var _StyledSelect = require("./StyledSelect");
var _utils2 = require("./utils");
var _EmptySearchOption = require("./EmptySearchOption");
var _useThemeValue3 = require("../../utils/useThemeValue");
var _excluded = ["clear", "onClear", "name", "theme"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// ensure ClearButton receives visual indication of keyboard
var StyledButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "SelectContainer__StyledButton",
  componentId: "sc-1wi0ul8-0"
})(["&:focus{", "}"], function (props) {
  return (0, _utils.getHoverIndicatorStyle)('background', props.theme);
});
var ClearButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var clear = _ref.clear,
    onClear = _ref.onClear,
    name = _ref.name,
    theme = _ref.theme,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var label = clear.label,
    position = clear.position;
  var align = position !== 'bottom' ? 'start' : 'center';
  var buttonLabel = label || "Clear " + (name || 'selection');
  var _useThemeValue = (0, _useThemeValue3.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/_react["default"].createElement(StyledButton, _extends({
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
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, boxProps, hover ? (_theme$select$clear = theme.select.clear) == null || (_theme$select$clear = _theme$select$clear.container) == null ? void 0 : _theme$select$clear.hover : {}, {
      align: align
    }), /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.clear.text, buttonLabel));
  });
});
var SelectContainer = exports.SelectContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
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
  var _useThemeValue2 = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue2.theme,
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var shouldShowClearButton = (0, _react.useCallback)(function (position) {
    var hasValue = Boolean(multiple && value ? value.length : value);
    var showAtPosition = position === 'bottom' ? (clear == null ? void 0 : clear.position) === 'bottom' : (clear == null ? void 0 : clear.position) !== 'bottom';
    return clear && hasValue && showAtPosition;
  }, [clear, multiple, value]);
  var isDisabled = (0, _utils2.useDisabled)(disabled, disabledKey, options, valueKey || labelKey);
  var _useState = (0, _react.useState)(usingKeyboard && !shouldShowClearButton('top') && !onSearch ? 0 : -1),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var _useState2 = (0, _react.useState)(usingKeyboard),
    keyboardNavigation = _useState2[0],
    setKeyboardNavigation = _useState2[1];
  var searchRef = (0, _react.useRef)();
  var optionsRef = (0, _react.useRef)();
  var clearRef = (0, _react.useRef)();
  var activeRef = (0, _react.useRef)();

  // for keyboard/screenreader, keep the active option in focus
  (0, _react.useEffect)(function () {
    var _activeRef$current;
    if (activeIndex >= 0) (_activeRef$current = activeRef.current) == null || _activeRef$current.focus();
  }, [activeIndex]);

  // set initial focus
  (0, _react.useEffect)(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var optionsNode = optionsRef.current;
      var clearButton = clearRef.current;
      if (onSearch) {
        var searchInput = searchRef.current;
        if (searchInput && searchInput.focus && !activeRef.current) {
          (0, _utils.setFocusWithoutScroll)(searchInput);
        }
      } else if (clear && clearButton && clearButton.focus && clear.position !== 'bottom') {
        (0, _utils.setFocusWithoutScroll)(clearButton);
      } else if (usingKeyboard && activeRef.current) {
        (0, _utils.setFocusWithoutScroll)(activeRef.current);
      } else if (optionsNode) {
        (0, _utils.setFocusWithoutScroll)(optionsNode);
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [onSearch, usingKeyboard, clear]);
  var isSelected = (0, _react.useCallback)(function (index) {
    var result;
    if (selected) {
      // deprecated in favor of value
      result = selected.indexOf(index) !== -1;
    } else {
      var optionVal = (0, _utils2.getOptionValue)(index, options, valueKey);
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
  }, [activeIndex, options, isDisabled]);
  var onPreviousOption = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex - 1;
    if (nextActiveIndex === -1) {
      var searchInput = searchRef.current;
      var clearButton = clearRef.current;
      if (clearButton && clearButton.focus && shouldShowClearButton('top')) {
        setActiveIndex(nextActiveIndex);
        (0, _utils.setFocusWithoutScroll)(clearButton);
      } else if (searchInput && searchInput.focus) {
        setActiveIndex(nextActiveIndex);
        (0, _utils.setFocusWithoutScroll)(searchInput);
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
  }, [isDisabled, labelKey, onKeyDown, options, onSearch]);
  var onActiveOption = (0, _react.useCallback)(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = (0, _react.useCallback)(function (event) {
    if ((shouldShowClearButton('bottom') || shouldShowClearButton('top')) && (0, _utils.containsFocus)(clearRef.current)) {
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
  var SelectTextInput = customSearchInput || _TextInput.TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: onSelectOption,
    onSpace: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDownOption
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.StyledContainer, _extends({
    ref: ref,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight
  }, passThemeFlag), onSearch && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
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
  })), shouldShowClearButton('top') && /*#__PURE__*/_react["default"].createElement(ClearButton, {
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
  }), options.length > 0 ? /*#__PURE__*/_react["default"].createElement(_StyledSelect.OptionsContainer, {
    role: "listbox",
    tabIndex: "-1",
    ref: optionsRef,
    "aria-multiselectable": multiple,
    onMouseMove: function onMouseMove() {
      return setKeyboardNavigation(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
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
      child = /*#__PURE__*/_react["default"].createElement(_Box.Box, selectOptionsStyle, /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.select.options.text, (0, _utils2.getOptionLabel)(index, options, labelKey)));
      textComponent = true;
    }

    // if we have a child, turn on plain, and hoverIndicator
    return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectOption
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
      label: !child ? (0, _utils2.getOptionLabel)(index, options, labelKey || valueKey) : undefined,
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
  })) : /*#__PURE__*/_react["default"].createElement(_EmptySearchOption.EmptySearchOption, {
    emptySearchMessage: emptySearchMessage,
    selectOptionsStyle: selectOptionsStyle,
    theme: theme
  }), shouldShowClearButton('bottom') && /*#__PURE__*/_react["default"].createElement(ClearButton, {
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