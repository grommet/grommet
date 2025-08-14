"use strict";

exports.__esModule = true;
exports.SelectMultipleContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _Button = require("../Button");
var _CheckBox = require("../CheckBox");
var _InfiniteScroll = require("../InfiniteScroll");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _TextInput = require("../TextInput");
var _SelectionSummary = require("./SelectionSummary");
var _StyledSelect = require("../Select/StyledSelect");
var _utils2 = require("../Select/utils");
var _EmptySearchOption = require("../Select/EmptySearchOption");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SelectMultipleContainer = exports.SelectMultipleContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$selectMultiple2;
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
    messages = _ref.messages,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  // the currently active option based on keyboard navigation
  // or mouse hover, -1 means no active option
  var _useState = (0, _react.useState)(-1),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var _useState2 = (0, _react.useState)(usingKeyboard),
    keyboardNavigation = _useState2[0],
    setKeyboardNavigation = _useState2[1];
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var searchRef = (0, _react.useRef)();
  var optionsRef = (0, _react.useRef)();
  var _useState3 = (0, _react.useState)(disabledProp),
    disabled = _useState3[0],
    setDisabled = _useState3[1];
  // the node of the currently active option, as activeIndex changes
  // this is updated too and the useEffect below ensures the
  // active option remains in keyboard focus since we're
  // following roving tab index pattern
  var activeRef = (0, _react.useRef)();
  var _useState4 = (0, _react.useState)(),
    showA11yLimit = _useState4[0],
    setShowA11yLimit = _useState4[1];
  var clearRef = (0, _react.useRef)();
  var isDisabled = (0, _utils2.useDisabled)(disabled, disabledKey, options, valueKey || labelKey);

  // for keyboard/screenreader, keep the active option in focus
  (0, _react.useEffect)(function () {
    var _activeRef$current;
    if (activeIndex) (_activeRef$current = activeRef.current) == null || _activeRef$current.focus();
  }, [activeIndex]);

  // set initial focus
  (0, _react.useEffect)(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      var clearButton = clearRef.current;
      if (clearButton && clearButton.focus) {
        (0, _utils.setFocusWithoutScroll)(clearButton);
      } else if (searchRef && searchRef.current) {
        var searchInput = searchRef.current;
        if (searchInput && searchInput.focus) {
          (0, _utils.setFocusWithoutScroll)(searchInput);
        }
      } else if (activeRef.current) {
        (0, _utils.setFocusWithoutScroll)(activeRef.current);
      } else if (optionsRef.current) {
        setActiveIndex(0);
      }
    }, 100); // Drop should be open after 100ms
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var optionsNode = optionsRef.current;
    if (optionsNode != null && optionsNode.children) {
      var optionNode = optionsNode.children[activeIndex];
      if (optionNode) optionNode.focus();
    }
  }, [activeIndex]);
  var isSelected = (0, _react.useCallback)(function (index) {
    var result;
    var optionVal = (0, _utils2.getOptionValue)(index, options, valueKey || labelKey);
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
  var selectOption = (0, _react.useCallback)(function (index) {
    return function (event) {
      if (onChange) {
        var nextOptionIndexesInValue = optionIndexesInValue.slice(0);
        var allOptionsIndex = (0, _utils2.getOptionIndex)(allOptions, options[index], valueKey || labelKey);
        var valueIndex = optionIndexesInValue.indexOf(allOptionsIndex);
        if (valueIndex === -1 && (!limit || (value == null ? void 0 : value.length) < limit)) {
          nextOptionIndexesInValue.push(allOptionsIndex);
        } else {
          nextOptionIndexesInValue.splice(valueIndex, 1);
        }
        var nextValue = nextOptionIndexesInValue.map(function (i) {
          return valueKey && valueKey.reduce ? (0, _utils2.applyKey)(allOptions[i], valueKey) : allOptions[i];
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
  var onNextOption = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex + 1;
    // checking activeIndex > -1 ensures arrow keys don't
    // move focus when select all/clear all button or search input
    // are focused
    if (nextActiveIndex !== (options == null ? void 0 : options.length) && activeIndex > -1) {
      setActiveIndex(nextActiveIndex);
      setKeyboardNavigation(true);
    }
  }, [activeIndex, options]);
  var onPreviousOption = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    var nextActiveIndex = activeIndex - 1;

    // checking activeIndex > -1 ensures arrow keys don't
    // move focus when select all/clear all button or search input
    // are focused
    if (activeIndex > -1) {
      setActiveIndex(Math.max(nextActiveIndex, 0));
      setKeyboardNavigation(true);
    }
  }, [activeIndex]);
  var onKeyDownOption = (0, _react.useCallback)(function (event) {
    if (!onSearch) {
      var nextActiveIndex = options.findIndex(function (e) {
        var label;
        if (typeof e === 'object') {
          label = e.label || (0, _utils2.applyKey)(e, labelKey);
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
  var onActiveOption = (0, _react.useCallback)(function (index) {
    return function () {
      if (!keyboardNavigation) setActiveIndex(index);
    };
  }, [keyboardNavigation]);
  var onSelectOption = (0, _react.useCallback)(function (event) {
    if (!isDisabled(activeIndex) && activeIndex >= 0 && activeIndex < (options == null ? void 0 : options.length)) {
      event.preventDefault(); // prevent submitting forms
      selectOption(activeIndex)(event);
    }
  }, [activeIndex, selectOption, options, isDisabled]);
  var customSearchInput = theme.select.searchInput;
  var SelectTextInput = customSearchInput || _TextInput.TextInput;
  var selectOptionsStyle = theme.select.options ? _extends({}, theme.select.options.box, theme.select.options.container) : {};

  // handle when limit is reached
  (0, _react.useEffect)(function () {
    var originallyDisabled = function originallyDisabled(index) {
      var option = allOptions[index];
      var result;
      if (disabledKey) {
        result = (0, _utils2.applyKey)(option, disabledKey);
      } else if (Array.isArray(disabledProp)) {
        if (typeof disabledProp[0] === 'number') {
          result = disabledProp.indexOf(index) !== -1;
        } else {
          result = (0, _utils2.getOptionIndex)(disabledProp, (0, _utils2.getOptionValue)(index, options, valueKey || labelKey), valueKey || labelKey) !== -1;
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
  (0, _react.useEffect)(function () {
    if (showA11yLimit !== undefined) {
      setTimeout(function () {
        setShowA11yLimit(undefined);
      }, 2000); // value chosen based on length of a11yLimit message
    }
  }, [showA11yLimit]);
  var summaryContent = /*#__PURE__*/_react["default"].createElement(_SelectionSummary.SelectionSummary, {
    allOptions: allOptions,
    clearRef: clearRef,
    disabled: disabled,
    disabledKey: disabledKey,
    isSelected: isSelected,
    labelKey: labelKey,
    limit: limit,
    messages: messages,
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
    var _theme$selectMultiple;
    if (typeof help === 'string') helpContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: false,
      pad: (_theme$selectMultiple = theme.selectMultiple) == null || (_theme$selectMultiple = _theme$selectMultiple.help) == null || (_theme$selectMultiple = _theme$selectMultiple.container) == null ? void 0 : _theme$selectMultiple.pad
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small"
    }, help));else helpContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: false
    }, help);
  }
  if (showSelectedInline) summaryContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    justify: "between",
    flex: false
  }, summaryContent, /*#__PURE__*/_react["default"].createElement(_Box.Box, null, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    fill: "vertical",
    onClick: onClose,
    a11yTitle: "Close Select"
  }, icon)));
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: onSelectOption,
    onSpace: onSelectOption,
    onUp: onPreviousOption,
    onDown: onNextOption,
    onKeyDown: onKeyDownOption,
    onEsc: onClose
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.StyledContainer, {
    ref: ref,
    id: id ? id + "__select-drop" : undefined,
    dropHeight: dropHeight,
    a11yTitle: format({
      id: 'selectMultiple.selectDrop',
      messages: messages
    })
  }, summaryContent, onSearch && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: !customSearchInput ? (_theme$selectMultiple2 = theme.selectMultiple) == null || (_theme$selectMultiple2 = _theme$selectMultiple2.search) == null ? void 0 : _theme$selectMultiple2.pad : undefined,
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: function onEnter(event) {
      onNextOption(event);
    }
  }, /*#__PURE__*/_react["default"].createElement(SelectTextInput, {
    a11yTitle: format({
      id: 'selectMultiple.search',
      messages: messages
    }),
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
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    }
  }))), helpContent, (options == null ? void 0 : options.length) > 0 ? /*#__PURE__*/_react["default"].createElement(_StyledSelect.OptionsContainer, {
    role: "listbox",
    tabIndex: "-1",
    ref: optionsRef,
    "aria-multiselectable": true,
    onMouseMove: function onMouseMove() {
      return setKeyboardNavigation(false);
    },
    selectMultiple: true // internal prop
  }, /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: options,
    step: theme.select.step,
    onMore: onMore,
    replace: replace,
    show: activeIndex !== -1 ? activeIndex : undefined
  }, function (option, index, optionRef) {
    var optionDisabled = isDisabled(index);
    var optionSelected = value ? (0, _utils2.arrayIncludes)(value, valueKey && valueKey.reduce ? (0, _utils2.applyKey)(option, valueKey) : option, valueKey || labelKey) : false;
    var optionActive = activeIndex === index;
    var optionLabel = (0, _utils2.getOptionLabel)(index, options, labelKey || valueKey);

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
      var _theme$selectMultiple3;
      child = /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
        label: /*#__PURE__*/_react["default"].createElement(_Box.Box, {
          alignSelf: "center",
          width: "100%",
          align: "start"
        }, optionLabel),
        pad: (_theme$selectMultiple3 = theme.selectMultiple) == null || (_theme$selectMultiple3 = _theme$selectMultiple3.option) == null ? void 0 : _theme$selectMultiple3.pad,
        tabIndex: "-1",
        checked: optionSelected,
        disabled: optionDisabled,
        inert: _utils2.inertTrueValue,
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
      });
    }
    if (!children && search) {
      var searchText = search.toLowerCase();
      if (typeof optionLabel === 'string' && optionLabel.toLowerCase().indexOf(searchText) >= 0) {
        var _theme$selectMultiple4;
        // code to bold search term in matching options
        var boldIndex = optionLabel.toLowerCase().indexOf(searchText);
        var childBeginning = optionLabel.substring(0, boldIndex);
        var childBold = optionLabel.substring(boldIndex, boldIndex + searchText.length);
        childBold = /*#__PURE__*/_react["default"].createElement("b", null, childBold);
        var childEnd = optionLabel.substring(boldIndex + searchText.length);
        child = /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
          label: /*#__PURE__*/_react["default"].createElement(_Box.Box, {
            alignSelf: "center",
            width: "100%",
            align: "start",
            direction: "row"
          }, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, childBeginning, childBold, childEnd)),
          pad: (_theme$selectMultiple4 = theme.selectMultiple) == null || (_theme$selectMultiple4 = _theme$selectMultiple4.option) == null ? void 0 : _theme$selectMultiple4.pad,
          tabIndex: "-1",
          checked: optionSelected,
          disabled: optionDisabled,
          inert: _utils2.inertTrueValue,
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
        });
      }
    }

    // if we have a child, turn on plain, and hoverIndicator
    return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectOption, {
      a11yTitle: format({
        id: optionSelected ? 'selectMultiple.optionSelected' : 'selectMultiple.optionNotSelected',
        messages: messages,
        values: {
          optionLabel: optionLabel
        }
      })
      // lint isn't flagging this but we shouldn't use index
      // as a key see no-array-index-key lint rule
      ,
      key: index
      // merge optionRef and activeRef
      ,
      ref: function ref(node) {
        // eslint-disable-next-line no-param-reassign
        if (optionRef) optionRef.current = node;
        if (optionActive) activeRef.current = node;
      },
      tabIndex: optionSelected || activeIndex === index ||
      // when nothing is selected and entering listbox
      // first option should be focused
      value.length === 0 && activeIndex === -1 && index === 0 ? '0' : '-1',
      role: "option",
      id: "option" + index,
      "aria-setsize": options.length,
      "aria-posinset": index + 1,
      "aria-selected": optionSelected,
      focusIndicator: usingKeyboard,
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
  })) : /*#__PURE__*/_react["default"].createElement(_EmptySearchOption.EmptySearchOption, {
    emptySearchMessage: emptySearchMessage,
    selectOptionsStyle: selectOptionsStyle,
    theme: theme
  }), usingKeyboard && showA11yLimit && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
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