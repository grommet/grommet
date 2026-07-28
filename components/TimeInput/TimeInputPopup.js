"use strict";

exports.__esModule = true;
exports.TimeInputPopup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _Box = require("../Box");
var _Drop = require("../Drop");
var _Text = require("../Text");
var _utils2 = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-len */
var PopupColumnBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "TimeInputPopup__PopupColumnBox",
  componentId: "sc-r2j8uh-0"
})(["scrollbar-gutter:stable;scrollbar-width:thin;"]);
var PopupOption = _styledComponents["default"].div.withConfig({
  displayName: "TimeInputPopup__PopupOption",
  componentId: "sc-r2j8uh-1"
})(["box-sizing:border-box;cursor:pointer;display:flex;padding:", ";border-radius:", ";background:", ";&:hover{background:", ";}&:focus-visible{", "}", ""], function (props) {
  return props.theme.global.edgeSize.xxsmall + " " + props.theme.global.edgeSize.xsmall;
}, function (props) {
  var _props$theme$global$c;
  return (_props$theme$global$c = props.theme.global.control) == null || (_props$theme$global$c = _props$theme$global$c.border) == null ? void 0 : _props$theme$global$c.radius;
}, function (props) {
  var _props$theme$timeInpu3;
  if (props.$selected) {
    var _props$theme$timeInpu;
    return (0, _utils.normalizeColor)((_props$theme$timeInpu = props.theme.timeInput) == null || (_props$theme$timeInpu = _props$theme$timeInpu.drop) == null || (_props$theme$timeInpu = _props$theme$timeInpu.option) == null || (_props$theme$timeInpu = _props$theme$timeInpu.selected) == null ? void 0 : _props$theme$timeInpu.background, props.theme);
  }
  if (props.$active) {
    var _props$theme$timeInpu2;
    return (0, _utils.normalizeColor)((_props$theme$timeInpu2 = props.theme.timeInput) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.drop) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.option) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.hover) == null ? void 0 : _props$theme$timeInpu2.background, props.theme);
  }
  return (0, _utils.normalizeColor)((_props$theme$timeInpu3 = props.theme.timeInput) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.drop) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.option) == null ? void 0 : _props$theme$timeInpu3.background, props.theme);
}, function (props) {
  var _props$theme$timeInpu6;
  if (props.$selected) {
    var _props$theme$timeInpu4, _props$theme$timeInpu5;
    return (0, _utils.normalizeColor)(((_props$theme$timeInpu4 = props.theme.timeInput) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.drop) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.option) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.selected) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.hover) == null ? void 0 : _props$theme$timeInpu4.background) || ((_props$theme$timeInpu5 = props.theme.timeInput) == null || (_props$theme$timeInpu5 = _props$theme$timeInpu5.drop) == null || (_props$theme$timeInpu5 = _props$theme$timeInpu5.option) == null || (_props$theme$timeInpu5 = _props$theme$timeInpu5.selected) == null ? void 0 : _props$theme$timeInpu5.background), props.theme);
  }
  return (0, _utils.normalizeColor)((_props$theme$timeInpu6 = props.theme.timeInput) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.drop) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.option) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.hover) == null ? void 0 : _props$theme$timeInpu6.background, props.theme);
}, (0, _utils.focusStyle)({
  inset: true
}), function (props) {
  var _props$theme$timeInpu7;
  return props.$selected && ((_props$theme$timeInpu7 = props.theme.timeInput) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.drop) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.option) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.selected) == null ? void 0 : _props$theme$timeInpu7.extend);
});
var optionKey = function optionKey(label, option) {
  return label.toLowerCase() + "-" + option;
};
var PopupColumn = function PopupColumn(_ref) {
  var _theme$timeInput;
  var activeSection = _ref.activeSection,
    format = _ref.format,
    formatMessage = _ref.formatMessage,
    label = _ref.label,
    messages = _ref.messages,
    onClickCommitOption = _ref.onClickCommitOption,
    onPointerCommitOption = _ref.onPointerCommitOption,
    onSetSection = _ref.onSetSection,
    options = _ref.options,
    section = _ref.section,
    sections = _ref.sections,
    theme = _ref.theme;
  return /*#__PURE__*/_react["default"].createElement(PopupColumnBox, {
    role: "listbox",
    "aria-label": label,
    gap: "xxsmall",
    height: {
      max: ((_theme$timeInput = theme.timeInput) == null || (_theme$timeInput = _theme$timeInput.drop) == null || (_theme$timeInput = _theme$timeInput.column) == null ? void 0 : _theme$timeInput.maxHeight) || theme.global.size.small
    },
    overflow: "auto",
    flex: {
      grow: 0,
      shrink: 0
    }
  }, options.map(function (option) {
    var _theme$timeInput2;
    var key = optionKey(label, option);
    var selected = section === _utils2.SECTION_HOUR && sections.hour === option || section === _utils2.SECTION_MINUTE && sections.minute === option || section === _utils2.SECTION_SECOND && sections.second === option || section === _utils2.SECTION_PERIOD && sections.period === option;
    var optionColor = selected ? ((_theme$timeInput2 = theme.timeInput) == null || (_theme$timeInput2 = _theme$timeInput2.drop) == null || (_theme$timeInput2 = _theme$timeInput2.option) == null || (_theme$timeInput2 = _theme$timeInput2.selected) == null ? void 0 : _theme$timeInput2.color) || 'text' : 'text';
    var isActive = selected && activeSection === section;
    return /*#__PURE__*/_react["default"].createElement(PopupOption, {
      key: key,
      "data-option-key": key,
      role: "option",
      "aria-selected": selected,
      tabIndex: isActive ? 0 : -1,
      "aria-label": (section === _utils2.SECTION_PERIOD ? option : (0, _utils2.pad)(option)) + " " + (0, _utils2.getSectionName)(section, format, formatMessage, messages),
      $active: isActive,
      $selected: selected,
      onMouseDown: function onMouseDown(event) {
        if (event.button !== 0) return;
        // Commit on pointer press so momentum scroll does not swallow
        // the first click commit on some trackpad/mouse flows.
        event.preventDefault();
        onPointerCommitOption(section, option);
      },
      onClick: function onClick() {
        return onClickCommitOption(section, option);
      },
      onFocus: function onFocus() {
        return onSetSection(section);
      }
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: theme.global.input.font.size || 'small',
      weight: selected ? 'bold' : 'normal',
      color: optionColor
    }, section === _utils2.SECTION_PERIOD ? option : (0, _utils2.pad)(option)));
  }));
};
var TimeInputPopup = exports.TimeInputPopup = function TimeInputPopup(_ref2) {
  var _theme$timeInput3, _theme$timeInput4;
  var activeSection = _ref2.activeSection,
    align = _ref2.align,
    format = _ref2.format,
    formatMessage = _ref2.formatMessage,
    hoursOptions = _ref2.hoursOptions,
    id = _ref2.id,
    incrementSection = _ref2.incrementSection,
    messages = _ref2.messages,
    minuteOptions = _ref2.minuteOptions,
    moveSection = _ref2.moveSection,
    onAccept = _ref2.onAccept,
    onClose = _ref2.onClose,
    onFocusLeave = _ref2.onFocusLeave,
    secondOptions = _ref2.secondOptions,
    sectionOrder = _ref2.sectionOrder,
    sections = _ref2.sections,
    setActiveSection = _ref2.setActiveSection,
    setSectionValue = _ref2.setSectionValue,
    target = _ref2.target,
    dropProps = _ref2.dropProps,
    label = _ref2.label;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var dialogRef = (0, _react.useRef)();
  var pointerDownInsideRef = (0, _react.useRef)(false);
  var pointerSelectionCommittedRef = (0, _react.useRef)(false);
  var suppressNextAutoScrollRef = (0, _react.useRef)(false);
  var wheelInteractionTimeoutRef = (0, _react.useRef)();
  var pointerReleaseTimeoutRef = (0, _react.useRef)();
  var clearPointerReleaseTimeout = (0, _react.useCallback)(function () {
    if (pointerReleaseTimeoutRef.current) {
      window.clearTimeout(pointerReleaseTimeoutRef.current);
      pointerReleaseTimeoutRef.current = undefined;
    }
  }, []);
  var clearInteractionInProgress = (0, _react.useCallback)(function () {
    clearPointerReleaseTimeout();
    pointerDownInsideRef.current = false;
    if (wheelInteractionTimeoutRef.current) {
      window.clearTimeout(wheelInteractionTimeoutRef.current);
      wheelInteractionTimeoutRef.current = undefined;
    }
  }, [clearPointerReleaseTimeout]);
  var releaseInteractionAfterClick = (0, _react.useCallback)(function () {
    clearPointerReleaseTimeout();
    // Keep lock through click handler + resulting render/effect cycle.
    pointerReleaseTimeoutRef.current = window.setTimeout(function () {
      pointerDownInsideRef.current = false;
      pointerReleaseTimeoutRef.current = undefined;
    }, 0);
  }, [clearPointerReleaseTimeout]);
  var markInteractionInProgress = (0, _react.useCallback)(function () {
    pointerDownInsideRef.current = true;
  }, []);
  var suppressNextAutoScroll = (0, _react.useCallback)(function () {
    suppressNextAutoScrollRef.current = true;
  }, []);
  var commitOptionSelection = (0, _react.useCallback)(function (section, option) {
    setActiveSection(section);
    setSectionValue(section, option);
  }, [setActiveSection, setSectionValue]);
  var commitPointerOptionSelection = (0, _react.useCallback)(function (section, option) {
    pointerSelectionCommittedRef.current = true;
    suppressNextAutoScroll();
    commitOptionSelection(section, option);
  }, [commitOptionSelection, suppressNextAutoScroll]);
  var commitClickOptionSelection = (0, _react.useCallback)(function (section, option) {
    if (pointerSelectionCommittedRef.current) {
      pointerSelectionCommittedRef.current = false;
      return;
    }
    commitOptionSelection(section, option);
  }, [commitOptionSelection]);
  var onPopupWheelCapture = (0, _react.useCallback)(function () {
    pointerDownInsideRef.current = true;
    if (wheelInteractionTimeoutRef.current) {
      window.clearTimeout(wheelInteractionTimeoutRef.current);
    }

    // Trackpad and wheel events can continue after the pointer sequence.
    // Keep interaction lock briefly so refocus does not steal first selection.
    wheelInteractionTimeoutRef.current = window.setTimeout(function () {
      pointerDownInsideRef.current = false;
      wheelInteractionTimeoutRef.current = undefined;
    }, 120);
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      clearPointerReleaseTimeout();
      if (wheelInteractionTimeoutRef.current) {
        window.clearTimeout(wheelInteractionTimeoutRef.current);
      }
    };
  }, [clearPointerReleaseTimeout]);
  var popupSections = [{
    section: _utils2.SECTION_HOUR,
    label: 'hour',
    options: hoursOptions
  }, {
    section: _utils2.SECTION_MINUTE,
    label: 'minute',
    options: minuteOptions
  }, {
    section: _utils2.SECTION_SECOND,
    label: 'second',
    options: secondOptions
  }, {
    section: _utils2.SECTION_PERIOD,
    label: 'period',
    options: ['AM', 'PM']
  }];
  var visiblePopupSections = popupSections.filter(function (_ref3) {
    var section = _ref3.section;
    return sectionOrder.includes(section);
  });
  var scrollSelectedOptionsIntoView = (0, _react.useCallback)(function () {
    var _sectionLabel, _sectionValue;
    if (pointerDownInsideRef.current) return;
    if (suppressNextAutoScrollRef.current) {
      suppressNextAutoScrollRef.current = false;
      return;
    }
    var popupNode = dialogRef.current;
    if (!popupNode) return;
    var sectionLabel = (_sectionLabel = {}, _sectionLabel[_utils2.SECTION_HOUR] = 'hour', _sectionLabel[_utils2.SECTION_MINUTE] = 'minute', _sectionLabel[_utils2.SECTION_SECOND] = 'second', _sectionLabel[_utils2.SECTION_PERIOD] = 'period', _sectionLabel);
    var sectionValue = (_sectionValue = {}, _sectionValue[_utils2.SECTION_HOUR] = sections.hour !== undefined ? sections.hour : hoursOptions[0], _sectionValue[_utils2.SECTION_MINUTE] = sections.minute !== undefined ? sections.minute : minuteOptions[0], _sectionValue[_utils2.SECTION_SECOND] = sections.second !== undefined ? sections.second : secondOptions[0], _sectionValue[_utils2.SECTION_PERIOD] = sections.period || 'AM', _sectionValue);
    visiblePopupSections.forEach(function (_ref4) {
      var section = _ref4.section;
      var labelValue = sectionLabel[section];
      if (!labelValue) return;
      var listboxNode = popupNode.querySelector("[role=\"listbox\"][aria-label=\"" + labelValue + "\"]");
      if (!listboxNode) return;
      var selectedNode = popupNode.querySelector("[data-option-key=\"" + optionKey(labelValue, sectionValue[section]) + "\"]") || listboxNode.querySelector('[role="option"][aria-selected="true"]');
      if (selectedNode) {
        if (selectedNode.scrollIntoView) {
          selectedNode.scrollIntoView({
            block: 'nearest'
          });
        }

        // Center selected value in each listbox so all sections (hh/mm/ss)
        // are consistently aligned on open, not just the focused section.
        var selectedOffsetTop = selectedNode.offsetTop;
        var selectedHeight = selectedNode.offsetHeight;
        var targetScrollTop = selectedOffsetTop - (listboxNode.clientHeight / 2 - selectedHeight / 2);
        listboxNode.scrollTop = Math.max(0, targetScrollTop);
      }
    });
  }, [hoursOptions, minuteOptions, secondOptions, sections, visiblePopupSections]);
  var focusCurrentPopupOption = (0, _react.useCallback)(function () {
    var _labelMap, _keyMap, _dialogRef$current, _dialogRef$current2;
    var labelMap = (_labelMap = {}, _labelMap[_utils2.SECTION_HOUR] = 'hour', _labelMap[_utils2.SECTION_MINUTE] = 'minute', _labelMap[_utils2.SECTION_SECOND] = 'second', _labelMap[_utils2.SECTION_PERIOD] = 'period', _labelMap);
    var keyMap = (_keyMap = {}, _keyMap[_utils2.SECTION_HOUR] = optionKey('hour', sections.hour !== undefined ? sections.hour : hoursOptions[0]), _keyMap[_utils2.SECTION_MINUTE] = optionKey('minute', sections.minute !== undefined ? sections.minute : minuteOptions[0]), _keyMap[_utils2.SECTION_SECOND] = optionKey('second', sections.second !== undefined ? sections.second : secondOptions[0]), _keyMap[_utils2.SECTION_PERIOD] = optionKey('period', sections.period || 'AM'), _keyMap);
    var selector = "[data-option-key=\"" + keyMap[activeSection] + "\"]";
    var node = (_dialogRef$current = dialogRef.current) == null ? void 0 : _dialogRef$current.querySelector(selector);
    if (node) {
      node.focus();
      return true;
    }

    // Fallback: if current section value has no matching option
    // (e.g., minute=31 with minuteStep=15), focus first option in section.
    var sectionLabel = labelMap[activeSection];
    if (!sectionLabel) return false;
    var fallbackNode = (_dialogRef$current2 = dialogRef.current) == null ? void 0 : _dialogRef$current2.querySelector("[role=\"listbox\"][aria-label=\"" + sectionLabel + "\"] [role=\"option\"]");
    if (fallbackNode) {
      fallbackNode.focus();
      return true;
    }
    return false;
  }, [activeSection, hoursOptions, minuteOptions, secondOptions, sections]);
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    // Avoid stealing pointer interactions: while the user is actively
    // clicking inside the popup, let that click settle before refocusing.
    if (pointerDownInsideRef.current) return undefined;
    var scrollRaf = requestAnimationFrame(function () {
      scrollSelectedOptionsIntoView();
    });
    var rafB;
    var rafA = requestAnimationFrame(function () {
      scrollSelectedOptionsIntoView();
      var focused = focusCurrentPopupOption();
      // Retry one more frame to handle occasional mount timing races.
      if (!focused) {
        rafB = requestAnimationFrame(function () {
          scrollSelectedOptionsIntoView();
          focusCurrentPopupOption();
        });
      }
    });
    return function () {
      window.cancelAnimationFrame(scrollRaf);
      window.cancelAnimationFrame(rafA);
      if (rafB) window.cancelAnimationFrame(rafB);
    };
  }, [focusCurrentPopupOption, scrollSelectedOptionsIntoView]);
  return /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    id: id ? id + "__drop" : undefined,
    target: target,
    align: align,
    onEsc: onClose,
    onClickOutside: onClose
  }, dropProps), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: dialogRef,
    role: "dialog",
    "aria-label": label,
    direction: "row",
    width: {
      width: (_theme$timeInput3 = theme.timeInput) == null || (_theme$timeInput3 = _theme$timeInput3.drop) == null ? void 0 : _theme$timeInput3.width,
      max: '100%'
    },
    minHeight: (_theme$timeInput4 = theme.timeInput) == null || (_theme$timeInput4 = _theme$timeInput4.drop) == null ? void 0 : _theme$timeInput4.minHeight,
    gap: "xsmall",
    pad: "small",
    onPointerDownCapture: markInteractionInProgress,
    onPointerUpCapture: releaseInteractionAfterClick,
    onPointerCancelCapture: clearInteractionInProgress,
    onWheelCapture: onPopupWheelCapture,
    onKeyDown: function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === ' ' || event.key === 'Spacebar') {
        var _event$target, _document$activeEleme;
        event.preventDefault();
        var focusedOption = ((_event$target = event.target) == null || _event$target.closest == null ? void 0 : _event$target.closest('[role="option"]')) || ((_document$activeEleme = document.activeElement) == null || _document$activeEleme.closest == null ? void 0 : _document$activeEleme.closest('[role="option"]'));
        focusedOption == null || focusedOption.click == null || focusedOption.click();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        setActiveSection(moveSection(event.shiftKey ? -1 : 1));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveSection(moveSection(-1));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveSection(moveSection(1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        incrementSection(activeSection, -1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        incrementSection(activeSection, 1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onAccept == null || onAccept();
        onClose();
      }
    },
    onBlurCapture: function onBlurCapture(event) {
      var nextFocusTarget = event.relatedTarget;
      // Clicking the scrollbar blurs the focused option with
      // relatedTarget = null. Keep the popup open for that interaction.
      if (!nextFocusTarget) return;
      if (!event.currentTarget.contains(nextFocusTarget)) {
        onFocusLeave == null || onFocusLeave();
      }
    }
  }, visiblePopupSections.map(function (_ref5) {
    var section = _ref5.section,
      sectionLabel = _ref5.label,
      options = _ref5.options;
    return /*#__PURE__*/_react["default"].createElement(PopupColumn, {
      key: sectionLabel,
      activeSection: activeSection,
      format: format,
      formatMessage: formatMessage,
      label: sectionLabel,
      messages: messages,
      onClickCommitOption: commitClickOptionSelection,
      onPointerCommitOption: commitPointerOptionSelection,
      onSetSection: setActiveSection,
      options: options,
      section: section,
      sections: sections,
      theme: theme
    });
  })));
};