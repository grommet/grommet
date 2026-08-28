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
var _excluded = ["activeSection", "align", "format", "formatMessage", "hoursOptions", "id", "incrementSection", "messages", "minuteOptions", "onClose", "onFocusLeave", "secondOptions", "sectionOrder", "sections", "setActiveSection", "setSectionValue", "target", "dropProps", "label", "inline", "onKeyDown"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable max-len */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var PopupColumnBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "TimeInputPopup__PopupColumnBox",
  componentId: "sc-r2j8uh-0"
})(["scrollbar-gutter:stable;scrollbar-width:thin;"]);
var PopupOption = _styledComponents["default"].div.withConfig({
  displayName: "TimeInputPopup__PopupOption",
  componentId: "sc-r2j8uh-1"
})(["box-sizing:border-box;cursor:pointer;display:flex;", " ", " background:", ";&:hover{background:", ";}&:focus-visible{", "}"], function (props) {
  var _props$theme$timeInpu;
  var optionPad = (_props$theme$timeInpu = props.theme.timeInput) == null || (_props$theme$timeInpu = _props$theme$timeInpu.drop) == null || (_props$theme$timeInpu = _props$theme$timeInpu.option) == null ? void 0 : _props$theme$timeInpu.pad;
  return optionPad && (0, _utils.edgeStyle)('padding', optionPad, false, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  var _props$theme$timeInpu2, _props$theme$global$c;
  var round = ((_props$theme$timeInpu2 = props.theme.timeInput) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.drop) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.option) == null ? void 0 : _props$theme$timeInpu2.round) || ((_props$theme$global$c = props.theme.global.control) == null || (_props$theme$global$c = _props$theme$global$c.border) == null ? void 0 : _props$theme$global$c.radius);
  return round && (0, _utils.roundStyle)(round, false, props.theme);
}, function (props) {
  var _props$theme$timeInpu5;
  if (props.$selected) {
    var _props$theme$timeInpu3;
    return (0, _utils.normalizeColor)((_props$theme$timeInpu3 = props.theme.timeInput) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.drop) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.option) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.selected) == null ? void 0 : _props$theme$timeInpu3.background, props.theme);
  }
  if (props.$active) {
    var _props$theme$timeInpu4;
    return (0, _utils.normalizeColor)((_props$theme$timeInpu4 = props.theme.timeInput) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.drop) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.option) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.hover) == null ? void 0 : _props$theme$timeInpu4.background, props.theme);
  }
  return (0, _utils.normalizeColor)((_props$theme$timeInpu5 = props.theme.timeInput) == null || (_props$theme$timeInpu5 = _props$theme$timeInpu5.drop) == null || (_props$theme$timeInpu5 = _props$theme$timeInpu5.option) == null ? void 0 : _props$theme$timeInpu5.background, props.theme);
}, function (props) {
  var _props$theme$timeInpu8;
  if (props.$selected) {
    var _props$theme$timeInpu6, _props$theme$timeInpu7;
    return (0, _utils.normalizeColor)(((_props$theme$timeInpu6 = props.theme.timeInput) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.drop) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.option) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.selected) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.hover) == null ? void 0 : _props$theme$timeInpu6.background) || ((_props$theme$timeInpu7 = props.theme.timeInput) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.drop) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.option) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.selected) == null ? void 0 : _props$theme$timeInpu7.background), props.theme);
  }
  return (0, _utils.normalizeColor)((_props$theme$timeInpu8 = props.theme.timeInput) == null || (_props$theme$timeInpu8 = _props$theme$timeInpu8.drop) == null || (_props$theme$timeInpu8 = _props$theme$timeInpu8.option) == null || (_props$theme$timeInpu8 = _props$theme$timeInpu8.hover) == null ? void 0 : _props$theme$timeInpu8.background, props.theme);
}, (0, _utils.focusStyle)({
  inset: true
}));
var optionKey = function optionKey(label, option) {
  return label.toLowerCase() + "-" + option;
};
var getDefaultPopupOption = function getDefaultPopupOption(_ref) {
  var section = _ref.section,
    format = _ref.format,
    options = _ref.options;
  if (section === _utils2.SECTION_HOUR) {
    var defaultHour = (0, _utils2.defaultHourForFormat)(format);
    return options.includes(defaultHour) ? defaultHour : options[0];
  }
  if (section === _utils2.SECTION_PERIOD) return 'AM';
  return options[0];
};
var PopupColumn = function PopupColumn(_ref2) {
  var _theme$global$size, _theme$timeInput, _theme$timeInput2;
  var activeSection = _ref2.activeSection,
    format = _ref2.format,
    formatMessage = _ref2.formatMessage,
    inline = _ref2.inline,
    label = _ref2.label,
    messages = _ref2.messages,
    onClickCommitOption = _ref2.onClickCommitOption,
    onPointerCommitOption = _ref2.onPointerCommitOption,
    onSetSection = _ref2.onSetSection,
    options = _ref2.options,
    section = _ref2.section,
    sections = _ref2.sections,
    theme = _ref2.theme;
  // When inline (in DateTimeInput), use 'medium' to match Calendar height.
  // Otherwise use timeInput drop maxHeight with fallback to 'small'.
  var maxHeightToken = inline ? 'medium' : null;
  var maxHeight = maxHeightToken && ((_theme$global$size = theme.global.size) == null ? void 0 : _theme$global$size[maxHeightToken]) || ((_theme$timeInput = theme.timeInput) == null || (_theme$timeInput = _theme$timeInput.drop) == null || (_theme$timeInput = _theme$timeInput.column) == null ? void 0 : _theme$timeInput.maxHeight) || theme.global.size.small;
  return /*#__PURE__*/_react["default"].createElement(PopupColumnBox, {
    role: "listbox",
    "aria-label": label,
    gap: ((_theme$timeInput2 = theme.timeInput) == null || (_theme$timeInput2 = _theme$timeInput2.drop) == null || (_theme$timeInput2 = _theme$timeInput2.option) == null ? void 0 : _theme$timeInput2.gap) || 'xxsmall',
    height: {
      max: maxHeight
    },
    overflow: "auto",
    flex: {
      grow: 0,
      shrink: 0
    }
  }, options.map(function (option) {
    var _theme$timeInput3, _theme$timeInput4;
    var key = optionKey(label, option);
    var sectionHasValue = section === _utils2.SECTION_HOUR && sections.hour !== undefined || section === _utils2.SECTION_MINUTE && sections.minute !== undefined || section === _utils2.SECTION_SECOND && sections.second !== undefined || section === _utils2.SECTION_PERIOD && sections.period !== undefined;

    // In empty state, keep focus defaults but avoid visually selecting
    // options until the user makes an explicit choice.
    var selected = section === _utils2.SECTION_HOUR && sections.hour === option || section === _utils2.SECTION_MINUTE && sections.minute === option || section === _utils2.SECTION_SECOND && sections.second === option || section === _utils2.SECTION_PERIOD && sections.period === option;
    var optionColor = selected ? ((_theme$timeInput3 = theme.timeInput) == null || (_theme$timeInput3 = _theme$timeInput3.drop) == null || (_theme$timeInput3 = _theme$timeInput3.option) == null || (_theme$timeInput3 = _theme$timeInput3.selected) == null ? void 0 : _theme$timeInput3.color) || 'text' : 'text';
    var isActive = selected && activeSection === section;
    var optionTabIndex = -1;
    if (inline) {
      // In inline mode each column needs exactly one tabbable option so Tab
      // key lands on the option (with Grommet focus style) instead of the
      // listbox container (which has no theme focus style). Use the selected
      // value when set, otherwise fall back to the column's first option.
      var defaultOption = getDefaultPopupOption({
        section: section,
        format: format,
        options: options
      });
      optionTabIndex = selected || !sectionHasValue && option === defaultOption ? 0 : -1;
    } else if (isActive) {
      optionTabIndex = 0;
    }
    return /*#__PURE__*/_react["default"].createElement(PopupOption, {
      key: key,
      "data-option-key": key,
      role: "option",
      "aria-selected": selected,
      tabIndex: optionTabIndex,
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
      size: ((_theme$timeInput4 = theme.timeInput) == null || (_theme$timeInput4 = _theme$timeInput4.drop) == null || (_theme$timeInput4 = _theme$timeInput4.option) == null ? void 0 : _theme$timeInput4.size) || theme.global.input.font.size || 'small',
      color: optionColor
    }, section === _utils2.SECTION_PERIOD ? option : (0, _utils2.pad)(option)));
  }));
};
var TimeInputPopup = exports.TimeInputPopup = function TimeInputPopup(_ref3) {
  var _theme$timeInput5, _theme$timeInput6, _theme$timeInput7, _theme$timeInput8;
  var activeSection = _ref3.activeSection,
    align = _ref3.align,
    format = _ref3.format,
    formatMessage = _ref3.formatMessage,
    hoursOptions = _ref3.hoursOptions,
    id = _ref3.id,
    incrementSection = _ref3.incrementSection,
    messages = _ref3.messages,
    minuteOptions = _ref3.minuteOptions,
    onClose = _ref3.onClose,
    onFocusLeave = _ref3.onFocusLeave,
    secondOptions = _ref3.secondOptions,
    sectionOrder = _ref3.sectionOrder,
    sections = _ref3.sections,
    setActiveSection = _ref3.setActiveSection,
    setSectionValue = _ref3.setSectionValue,
    target = _ref3.target,
    dropProps = _ref3.dropProps,
    label = _ref3.label,
    _ref3$inline = _ref3.inline,
    inline = _ref3$inline === void 0 ? false : _ref3$inline,
    onKeyDownProp = _ref3.onKeyDown,
    rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
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
  var visiblePopupSections = popupSections.filter(function (_ref4) {
    var section = _ref4.section;
    return sectionOrder.includes(section);
  });
  var getSectionFromLabel = (0, _react.useCallback)(function (listboxLabel) {
    if (listboxLabel === 'hour') return _utils2.SECTION_HOUR;
    if (listboxLabel === 'minute') return _utils2.SECTION_MINUTE;
    if (listboxLabel === 'second') return _utils2.SECTION_SECOND;
    if (listboxLabel === 'period') return _utils2.SECTION_PERIOD;
    return undefined;
  }, []);
  var getSectionFromEventTarget = (0, _react.useCallback)(function (eventTarget) {
    var listboxNode = eventTarget == null || eventTarget.closest == null ? void 0 : eventTarget.closest('[role="listbox"]');
    var ariaLabel = listboxNode == null || listboxNode.getAttribute == null ? void 0 : listboxNode.getAttribute('aria-label');
    return getSectionFromLabel(ariaLabel);
  }, [getSectionFromLabel]);
  var getAdjacentSection = (0, _react.useCallback)(function (section, delta) {
    var _sectionOrder$, _sectionOrder$nextInd;
    var currentIndex = sectionOrder.indexOf(section);
    if (currentIndex === -1) return (_sectionOrder$ = sectionOrder[0]) != null ? _sectionOrder$ : section;
    var nextIndex = (currentIndex + delta + sectionOrder.length) % sectionOrder.length;
    return (_sectionOrder$nextInd = sectionOrder[nextIndex]) != null ? _sectionOrder$nextInd : section;
  }, [sectionOrder]);
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
    var sectionValue = (_sectionValue = {}, _sectionValue[_utils2.SECTION_HOUR] = sections.hour !== undefined ? sections.hour : getDefaultPopupOption({
      section: _utils2.SECTION_HOUR,
      format: format,
      options: hoursOptions
    }), _sectionValue[_utils2.SECTION_MINUTE] = sections.minute !== undefined ? sections.minute : getDefaultPopupOption({
      section: _utils2.SECTION_MINUTE,
      format: format,
      options: minuteOptions
    }), _sectionValue[_utils2.SECTION_SECOND] = sections.second !== undefined ? sections.second : getDefaultPopupOption({
      section: _utils2.SECTION_SECOND,
      format: format,
      options: secondOptions
    }), _sectionValue[_utils2.SECTION_PERIOD] = sections.period || 'AM', _sectionValue);
    visiblePopupSections.forEach(function (_ref5) {
      var section = _ref5.section;
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
  }, [format, hoursOptions, minuteOptions, secondOptions, sections, visiblePopupSections]);
  var focusCurrentPopupOption = (0, _react.useCallback)(function () {
    var _labelMap, _keyMap, _dialogRef$current, _dialogRef$current2;
    var labelMap = (_labelMap = {}, _labelMap[_utils2.SECTION_HOUR] = 'hour', _labelMap[_utils2.SECTION_MINUTE] = 'minute', _labelMap[_utils2.SECTION_SECOND] = 'second', _labelMap[_utils2.SECTION_PERIOD] = 'period', _labelMap);
    var keyMap = (_keyMap = {}, _keyMap[_utils2.SECTION_HOUR] = optionKey('hour', sections.hour !== undefined ? sections.hour : getDefaultPopupOption({
      section: _utils2.SECTION_HOUR,
      format: format,
      options: hoursOptions
    })), _keyMap[_utils2.SECTION_MINUTE] = optionKey('minute', sections.minute !== undefined ? sections.minute : getDefaultPopupOption({
      section: _utils2.SECTION_MINUTE,
      format: format,
      options: minuteOptions
    })), _keyMap[_utils2.SECTION_SECOND] = optionKey('second', sections.second !== undefined ? sections.second : getDefaultPopupOption({
      section: _utils2.SECTION_SECOND,
      format: format,
      options: secondOptions
    })), _keyMap[_utils2.SECTION_PERIOD] = optionKey('period', sections.period || 'AM'), _keyMap);
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
  }, [activeSection, format, hoursOptions, minuteOptions, secondOptions, sections]);
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
  var popupContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: dialogRef,
    role: inline ? undefined : 'dialog',
    "aria-label": inline ? undefined : label,
    direction: "row",
    width: {
      width: (_theme$timeInput5 = theme.timeInput) == null || (_theme$timeInput5 = _theme$timeInput5.drop) == null ? void 0 : _theme$timeInput5.width,
      max: '100%'
    },
    minHeight: (_theme$timeInput6 = theme.timeInput) == null || (_theme$timeInput6 = _theme$timeInput6.drop) == null ? void 0 : _theme$timeInput6.minHeight,
    gap: ((_theme$timeInput7 = theme.timeInput) == null || (_theme$timeInput7 = _theme$timeInput7.drop) == null ? void 0 : _theme$timeInput7.gap) || 'xsmall',
    pad: inline ? 'none' : ((_theme$timeInput8 = theme.timeInput) == null || (_theme$timeInput8 = _theme$timeInput8.drop) == null ? void 0 : _theme$timeInput8.pad) || 'small',
    onPointerDownCapture: markInteractionInProgress,
    onPointerUpCapture: releaseInteractionAfterClick,
    onPointerCancelCapture: clearInteractionInProgress,
    onWheelCapture: onPopupWheelCapture,
    onKeyDown: function onKeyDown(event) {
      var _ref6;
      var eventSectionFromTarget = getSectionFromEventTarget(event.target);
      var eventSectionFromActiveElement = getSectionFromEventTarget(document.activeElement);
      var eventSection = (_ref6 = eventSectionFromTarget != null ? eventSectionFromTarget : eventSectionFromActiveElement) != null ? _ref6 : activeSection;
      if (event.key === 'Escape') {
        if (onClose) {
          event.preventDefault();
          onClose();
        }
      } else if (event.key === 'Enter') {
        var _event$target, _document$activeEleme;
        event.preventDefault();
        var focusedOption = ((_event$target = event.target) == null || _event$target.closest == null ? void 0 : _event$target.closest('[role="option"]')) || ((_document$activeEleme = document.activeElement) == null || _document$activeEleme.closest == null ? void 0 : _document$activeEleme.closest('[role="option"]'));
        focusedOption == null || focusedOption.click == null || focusedOption.click();
      } else if (event.key === ' ' || event.key === 'Spacebar') {
        var _event$target2, _document$activeEleme2;
        event.preventDefault();
        var _focusedOption = ((_event$target2 = event.target) == null || _event$target2.closest == null ? void 0 : _event$target2.closest('[role="option"]')) || ((_document$activeEleme2 = document.activeElement) == null || _document$activeEleme2.closest == null ? void 0 : _document$activeEleme2.closest('[role="option"]'));
        _focusedOption == null || _focusedOption.click == null || _focusedOption.click();
      } else if (event.key === 'Tab') {
        if (!inline) {
          event.preventDefault();
          setActiveSection(getAdjacentSection(eventSection, event.shiftKey ? -1 : 1));
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveSection(getAdjacentSection(eventSection, -1));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveSection(getAdjacentSection(eventSection, 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        incrementSection(eventSection, 1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        incrementSection(eventSection, -1);
      }
      onKeyDownProp == null || onKeyDownProp(event);
    },
    onBlurCapture: function onBlurCapture(event) {
      var nextFocusTarget = event.relatedTarget;
      // Clicking the scrollbar blurs the focused option with
      // relatedTarget = null. Keep the popup open for that interaction.
      if (!nextFocusTarget) return;
      // If the user is currently interacting with the popup (pointer
      // down inside), don't close on blur. This prevents the popup
      // from closing when clicking on a non-focusable area within
      // the popup (e.g., the gap between columns or padding), which
      // would otherwise move focus to the document body and trigger
      // a false onFocusLeave.
      if (pointerDownInsideRef.current) return;
      if (!event.currentTarget.contains(nextFocusTarget)) {
        onFocusLeave == null || onFocusLeave();
      }
    }
  }, rest), visiblePopupSections.map(function (_ref7) {
    var section = _ref7.section,
      sectionLabel = _ref7.label,
      options = _ref7.options;
    return /*#__PURE__*/_react["default"].createElement(PopupColumn, {
      key: sectionLabel,
      activeSection: activeSection,
      format: format,
      formatMessage: formatMessage,
      inline: inline,
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
  }));
  if (inline) return popupContent;
  return /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    id: id ? id + "__drop" : undefined,
    target: target,
    align: align,
    onEsc: onClose,
    onClickOutside: onClose
  }, dropProps), popupContent);
};