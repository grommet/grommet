var _excluded = ["defaultValue", "disabled", "format", "id", "inline", "messages", "minuteStep", "name", "onChange", "onPartialChange", "readOnly", "showSeconds", "value"],
  _excluded2 = ["plain", "focusIndicator"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Clock as GrommetClockIcon } from 'grommet-icons/icons/Clock';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef } from '../../utils';
import { normalizeStep } from '../../utils/dates';
import { useThemeValue } from '../../utils/useThemeValue';
import { getSectionKeyFromType, getSectionTokenFromType } from '../../utils/sectionHelpers';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { StyledTimeInputDisplay, StyledTimeInputField, StyledTimeInputSegment, StyledTimeInputSeparator, StyledTimeInputContainer, StyledTimeInput } from './StyledTimeInput';
import { TimeInputPopup } from './TimeInputPopup';
import { TimeInputPropTypes } from './propTypes';
import { useSectionedTimeField } from './useSectionedTimeField';
import { getSectionAriaMeta, getSectionName, pad, sectionTypeFromSection, SECTION_HOUR, SECTION_MINUTE, SECTION_PERIOD, SECTION_SECOND } from './utils';
var getDisplaySectionKey = function getDisplaySectionKey(section) {
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
};
var getDisplaySectionPrefix = function getDisplaySectionPrefix(section, index) {
  if (index === 0) return '';
  return section === SECTION_PERIOD ? ' ' : ':';
};
var getDisplaySectionText = function getDisplaySectionText(_ref) {
  var key = _ref.key,
    section = _ref.section,
    sections = _ref.sections;
  if (sections[key] === undefined) return getSectionTokenFromType(sectionTypeFromSection(section));
  if (section === SECTION_PERIOD) return sections[key];
  return pad(sections[key]);
};
var getSectionOrder = function getSectionOrder(format, showSeconds) {
  if (showSeconds === void 0) {
    showSeconds = format === '12';
  }
  var numericSections = showSeconds ? [SECTION_HOUR, SECTION_MINUTE, SECTION_SECOND] : [SECTION_HOUR, SECTION_MINUTE];
  if (format === '12') {
    return [].concat(numericSections, [SECTION_PERIOD]);
  }
  return numericSections;
};
var buildPlaceholder = function buildPlaceholder(sectionOrder) {
  return sectionOrder.map(function (section, index) {
    var token = getSectionTokenFromType(sectionTypeFromSection(section));
    if (index === 0) return token;
    return "" + (section === SECTION_PERIOD ? ' ' : ':') + token;
  }).join('');
};

// When `format` isn't explicitly provided, default to the 12/24-hour
// convention the browser's default locale uses, rather than hardcoding one.
var getDefaultFormat = function getDefaultFormat() {
  try {
    var _Intl$DateTimeFormat$ = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric'
      }).resolvedOptions(),
      hour12 = _Intl$DateTimeFormat$.hour12;
    return hour12 ? '12' : '24';
  } catch (_unused) {
    return '24';
  }
};
var DEFAULT_FORMAT = getDefaultFormat();
var TimeInput = /*#__PURE__*/forwardRef(function (_ref2, refArg) {
  var _theme$timeInput, _theme$global, _theme$timeInput2;
  var defaultValue = _ref2.defaultValue,
    disabled = _ref2.disabled,
    _ref2$format = _ref2.format,
    format = _ref2$format === void 0 ? DEFAULT_FORMAT : _ref2$format,
    id = _ref2.id,
    _ref2$inline = _ref2.inline,
    inline = _ref2$inline === void 0 ? false : _ref2$inline,
    messages = _ref2.messages,
    _ref2$minuteStep = _ref2.minuteStep,
    minuteStep = _ref2$minuteStep === void 0 ? 1 : _ref2$minuteStep,
    name = _ref2.name,
    onChange = _ref2.onChange,
    onPartialChange = _ref2.onPartialChange,
    _ref2$readOnly = _ref2.readOnly,
    readOnly = _ref2$readOnly === void 0 ? false : _ref2$readOnly,
    showSeconds = _ref2.showSeconds,
    valueArg = _ref2.value,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    formatMessage = _useContext.format;
  var formContext = useContext(FormContext);
  var useFormInput = formContext.useFormInput;
  var inputRef = useForwardedRef(refArg);
  var containerRef = useRef();
  var _useFormInput = useFormInput({
      name: name,
      value: valueArg,
      initialValue: defaultValue || ''
    }),
    value = _useFormInput[0],
    setValue = _useFormInput[1];
  useEffect(function () {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Warning: TimeInput is currently in beta. The API is subject ' + 'to change in future releases.');
    }
  }, []);
  var _formContext$useFormF = formContext.useFormField({}),
    inForm = _formContext$useFormF.inForm;
  var formFieldLabelId = inForm && id ? "grommet-" + id + "__label" : undefined;
  var groupLabel = formFieldLabelId ? undefined : formatMessage({
    id: 'timeInput.inputLabel',
    messages: messages
  });
  var _useState = useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = useState(false),
    iconFocused = _useState2[0],
    setIconFocused = _useState2[1];
  var _useState3 = useState(false),
    segmentFocused = _useState3[0],
    setSegmentFocused = _useState3[1];
  var segmentRefs = useRef({});
  var plainProp = rest.plain,
    focusIndicatorProp = rest.focusIndicator,
    inputRest = _objectWithoutPropertiesLoose(rest, _excluded2);
  var normalizedMinuteStep = useMemo(function () {
    return normalizeStep(minuteStep);
  }, [minuteStep]);
  var resolvedShowSeconds = showSeconds !== undefined ? showSeconds : format === '12';
  var handleInvalid = useCallback(function () {
    var error = formatMessage({
      id: 'timeInput.invalidTime',
      messages: messages
    });
    announce(error, 'assertive');
  }, [announce, formatMessage, messages]);
  var announceCurrentValue = useCallback(function (nextSections) {
    if (nextSections.hour === undefined || nextSections.minute === undefined || nextSections.second === undefined) return;
    var period = format === '12' ? " " + (nextSections.period || 'AM') : '';
    announce(formatMessage({
      id: 'timeInput.currentValue',
      messages: messages,
      values: {
        hour: nextSections.hour,
        minute: nextSections.minute,
        second: nextSections.second,
        period: period
      }
    }), 'polite');
  }, [announce, format, formatMessage, messages]);
  var sectionOrder = useMemo(function () {
    return getSectionOrder(format, resolvedShowSeconds);
  }, [format, resolvedShowSeconds]);
  var firstSection = sectionOrder[0] || SECTION_HOUR;
  var lastSection = sectionOrder[sectionOrder.length - 1] || SECTION_HOUR;
  var _useSectionedTimeFiel = useSectionedTimeField({
      format: format,
      sectionOrder: sectionOrder,
      minuteStep: normalizedMinuteStep,
      value: value,
      onCommit: function onCommit(_nextSections, nextValue, _changedSection) {
        // Fire partial change on every commit so consumers can update
        // display state even before all sections are filled.
        onPartialChange == null || onPartialChange(_nextSections, _changedSection);
        if (!nextValue) {
          setValue('');
          onChange == null || onChange({
            value: undefined
          });
          return;
        }
        setValue(nextValue);
        onChange == null || onChange({
          value: nextValue
        });
        announceCurrentValue(_nextSections);
      },
      onInvalid: handleInvalid
    }),
    activeSection = _useSectionedTimeFiel.activeSection,
    applyDigit = _useSectionedTimeFiel.applyDigit,
    clearActiveSection = _useSectionedTimeFiel.clearActiveSection,
    commitSections = _useSectionedTimeFiel.commitSections,
    displayValue = _useSectionedTimeFiel.displayValue,
    incrementSection = _useSectionedTimeFiel.incrementSection,
    moveSection = _useSectionedTimeFiel.moveSection,
    parsePasted = _useSectionedTimeFiel.parsePasted,
    sections = _useSectionedTimeFiel.sections,
    setActiveSection = _useSectionedTimeFiel.setActiveSection,
    setSectionValue = _useSectionedTimeFiel.setSectionValue,
    pendingDigits = _useSectionedTimeFiel.pendingDigits;

  // Builds the announcement text for a given section: its current value
  // (e.g. "3 hours") if it has one, or just the section name (e.g. "hours
  // selected") when it doesn't yet. Called explicitly on every navigation
  // and edit interaction so screen readers hear meaningful feedback instead
  // of the raw separator/placeholder characters in the native input value.
  var getSectionValueAnnouncement = useCallback(function (section) {
    var sectionName = getSectionName(section, format, formatMessage, messages);
    if (section === SECTION_PERIOD) {
      if (sections.period === undefined) {
        return formatMessage({
          id: 'timeInput.activeSection',
          messages: messages,
          values: {
            section: sectionName
          }
        });
      }
      return formatMessage({
        id: 'timeInput.activePeriodValue',
        messages: messages,
        values: {
          period: sections.period
        }
      });
    }
    var sectionKey = getSectionKeyFromType(sectionTypeFromSection(section));
    var sectionValue = sections[sectionKey];
    if (sectionValue === undefined) {
      return formatMessage({
        id: 'timeInput.activeSection',
        messages: messages,
        values: {
          section: sectionName
        }
      });
    }
    return formatMessage({
      id: 'timeInput.activeSectionValue',
      messages: messages,
      values: {
        value: sectionValue,
        section: sectionName
      }
    });
  }, [format, formatMessage, messages, sections]);
  var focusSection = useCallback(function (section) {
    var target = segmentRefs.current[section];
    if (target) {
      target.focus();
    }
  }, []);
  var placeholder = useMemo(function () {
    return buildPlaceholder(sectionOrder);
  }, [sectionOrder]);
  var inputValue = displayValue || placeholder;
  var hasDisplayValue = !!displayValue;
  var displaySections = useMemo(function () {
    // Merge sections with pending digits for display
    var displaySectionsData = _extends({}, sections);
    var pendingSection = Object.keys(pendingDigits)[0];
    if (pendingSection && pendingDigits[pendingSection] !== undefined) {
      displaySectionsData[pendingSection] = pendingDigits[pendingSection];
    }
    return sectionOrder.map(function (section, index) {
      var key = getDisplaySectionKey(section);
      return {
        section: section,
        prefix: getDisplaySectionPrefix(section, index),
        text: getDisplaySectionText({
          key: key,
          section: section,
          sections: displaySectionsData
        }),
        filled: displaySectionsData[key] !== undefined
      };
    });
  }, [sectionOrder, sections, pendingDigits]);
  var onDisplaySectionMouseDown = useCallback(function (section, event) {
    if (readOnly) return;
    if (disabled) return;
    if (event.button !== 0) return;
    if (event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();
    setSegmentFocused(true);
    setActiveSection(section);
    focusSection(section);
  }, [disabled, focusSection, readOnly, setSegmentFocused, setActiveSection]);
  var onDisplayMouseDown = useCallback(function (event) {
    var _sectionNode$dataset;
    if (readOnly) return;
    if (event.button !== 0) return;
    if (event.defaultPrevented) return;
    var sectionNode = event.target.closest == null ? void 0 : event.target.closest('[data-section]');
    if ((sectionNode == null || (_sectionNode$dataset = sectionNode.dataset) == null ? void 0 : _sectionNode$dataset.section) !== undefined) {
      var section = Number(sectionNode.dataset.section);
      if (!Number.isNaN(section)) {
        onDisplaySectionMouseDown(section, event);
        return;
      }
    }
    var nodes = Array.from(event.currentTarget.querySelectorAll('[data-section]'));
    if (nodes.length) {
      var _sectionFromBounds$no;
      var x = event.clientX;
      var sectionsWithRects = nodes.map(function (node) {
        return {
          node: node,
          rect: node.getBoundingClientRect()
        };
      }).sort(function (a, b) {
        return a.rect.left - b.rect.left;
      });
      var sectionFromBounds = sectionsWithRects.find(function (_ref3) {
        var rect = _ref3.rect;
        return x >= rect.left && x <= rect.right;
      });
      if ((sectionFromBounds == null || (_sectionFromBounds$no = sectionFromBounds.node) == null || (_sectionFromBounds$no = _sectionFromBounds$no.dataset) == null ? void 0 : _sectionFromBounds$no.section) !== undefined) {
        var _section = Number(sectionFromBounds.node.dataset.section);
        if (!Number.isNaN(_section)) {
          onDisplaySectionMouseDown(_section, event);
          return;
        }
      }
      var zones = sectionsWithRects.map(function (_ref4, index) {
        var rect = _ref4.rect;
        var prev = sectionsWithRects[index - 1];
        var next = sectionsWithRects[index + 1];
        var start = prev !== undefined ? (prev.rect.right + rect.left) / 2 : Number.NEGATIVE_INFINITY;
        var end = next !== undefined ? (rect.right + next.rect.left) / 2 : Number.POSITIVE_INFINITY;
        return {
          index: index,
          start: start,
          end: end
        };
      });
      var zone = zones.find(function (_ref5) {
        var start = _ref5.start,
          end = _ref5.end;
        return x >= start && x <= end;
      }) || zones[0] || null;
      if (zone) {
        var _sectionsWithRects$zo, _matched$dataset;
        var matched = (_sectionsWithRects$zo = sectionsWithRects[zone.index]) == null ? void 0 : _sectionsWithRects$zo.node;
        if ((matched == null || (_matched$dataset = matched.dataset) == null ? void 0 : _matched$dataset.section) !== undefined) {
          var _section2 = Number(matched.dataset.section);
          if (!Number.isNaN(_section2)) {
            onDisplaySectionMouseDown(_section2, event);
            return;
          }
        }
      }
    }
    event.preventDefault();
    setSegmentFocused(true);
    setActiveSection(firstSection);
    focusSection(firstSection);
  }, [firstSection, focusSection, onDisplaySectionMouseDown, readOnly, setSegmentFocused, setActiveSection]);
  var openPicker = useCallback(function () {
    if (disabled || readOnly) return;
    setActiveSection(firstSection);
    setOpen(true);
  }, [disabled, firstSection, readOnly, setActiveSection]);
  var closePicker = useCallback(function () {
    setOpen(false);
    setTimeout(function () {
      focusSection(activeSection);
    }, 0);
  }, [activeSection, focusSection]);
  var onSegmentFocus = useCallback(function (section) {
    if (!segmentFocused && !readOnly && !disabled && !open) {
      announce(formatMessage({
        id: 'timeInput.openDrop',
        messages: messages
      }));
    }
    setSegmentFocused(true);
    if (readOnly || disabled) return;
    setActiveSection(section);
  }, [announce, disabled, formatMessage, messages, open, readOnly, segmentFocused, setActiveSection]);
  var onSegmentBlur = useCallback(function () {
    requestAnimationFrame(function () {
      var _document = document,
        activeElement = _document.activeElement;
      var isSegmentFocused = Object.values(segmentRefs.current).includes(activeElement);
      if (!isSegmentFocused && activeElement === document.body && !readOnly && !disabled) {
        focusSection(activeSection);
        return;
      }
      if (!isSegmentFocused) {
        setSegmentFocused(false);
      }
    });
  }, [activeSection, disabled, focusSection, readOnly]);
  var onSegmentKeyDown = useCallback(function (section, event) {
    if (readOnly || disabled) return;
    var key = event.key;
    if (activeSection !== section) {
      setActiveSection(section);
    }
    if (key === 'ArrowRight') {
      event.preventDefault();
      var next = moveSection(1);
      setActiveSection(next);
      focusSection(next);
      return;
    }
    if (key === 'ArrowLeft') {
      event.preventDefault();
      var _next = moveSection(-1);
      setActiveSection(_next);
      focusSection(_next);
      return;
    }
    if (key === 'Home') {
      event.preventDefault();
      setActiveSection(firstSection);
      focusSection(firstSection);
      return;
    }
    if (key === 'End') {
      event.preventDefault();
      setActiveSection(lastSection);
      focusSection(lastSection);
      return;
    }
    if (key === 'ArrowUp') {
      event.preventDefault();
      incrementSection(section, open ? -1 : 1);
      return;
    }
    if (key === 'ArrowDown') {
      if (event.altKey) {
        event.preventDefault();
        openPicker();
        return;
      }
      event.preventDefault();
      incrementSection(section, open ? 1 : -1);
      return;
    }
    if (key === 'Delete' || key === 'Backspace') {
      event.preventDefault();
      clearActiveSection();
      return;
    }
    if (key === 'Enter') {
      event.preventDefault();
      if (open) closePicker();
      return;
    }
    if (key === 'Escape' && open) {
      event.preventDefault();
      closePicker();
      return;
    }
    if (key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      openPicker();
      return;
    }
    if (format === '12' && section === SECTION_PERIOD) {
      var lower = key.toLowerCase();
      if (lower === 'a') {
        event.preventDefault();
        setSectionValue(SECTION_PERIOD, 'AM');
      } else if (lower === 'p') {
        event.preventDefault();
        setSectionValue(SECTION_PERIOD, 'PM');
      }
      return;
    }
    if (/^\d$/.test(key)) {
      event.preventDefault();
      var _next2 = applyDigit(Number(key));
      var targetSection = _next2 != null ? _next2 : section;
      setActiveSection(targetSection);
      if (targetSection === section) {
        event.currentTarget.focus();
      } else {
        focusSection(targetSection);
      }
    }
  }, [activeSection, applyDigit, clearActiveSection, closePicker, disabled, firstSection, focusSection, format, incrementSection, lastSection, moveSection, open, openPicker, readOnly, setActiveSection, setSectionValue]);
  useEffect(function () {
    if (!segmentFocused) return;
    if (readOnly || disabled) return;
    var activeSegment = segmentRefs.current[activeSection];
    if (activeSegment && document.activeElement !== activeSegment) {
      activeSegment.focus();
    }
  }, [activeSection, disabled, readOnly, segmentFocused]);
  var onSegmentPaste = useCallback(function (event) {
    if (readOnly) {
      event.preventDefault();
      return;
    }
    var pasted = event.clipboardData.getData('text');
    var parsed = parsePasted(pasted);
    if (!parsed) {
      handleInvalid();
      event.preventDefault();
      return;
    }
    commitSections(parsed);
    event.preventDefault();
  }, [commitSections, handleInvalid, parsePasted, readOnly]);
  var hoursOptions = useMemo(function () {
    return format === '12' ? [12].concat(Array.from({
      length: 11
    }, function (_, index) {
      return index + 1;
    })) : Array.from({
      length: 24
    }, function (_, index) {
      return index;
    });
  }, [format]);
  var minuteOptions = useMemo(function () {
    return Array.from({
      length: Math.ceil(60 / normalizedMinuteStep)
    }, function (_, index) {
      return index * normalizedMinuteStep;
    }).filter(function (valueAtIndex) {
      return valueAtIndex < 60;
    });
  }, [normalizedMinuteStep]);
  var secondOptions = useMemo(function () {
    return Array.from({
      length: 60
    }, function (_, index) {
      return index;
    });
  }, []);
  var showActiveSection = (segmentFocused || open) && !readOnly && !disabled;
  if (inline) {
    return /*#__PURE__*/React.createElement(TimeInputPopup, _extends({
      inline: true,
      activeSection: activeSection,
      format: format,
      formatMessage: formatMessage,
      hoursOptions: hoursOptions,
      incrementSection: incrementSection,
      messages: messages,
      minuteOptions: minuteOptions,
      sectionOrder: sectionOrder,
      secondOptions: secondOptions,
      sections: sections,
      setActiveSection: setActiveSection,
      setSectionValue: setSectionValue
    }, inputRest));
  }
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: open ? closePicker : undefined
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(StyledTimeInputContainer, _extends({
    ref: containerRef,
    direction: "row",
    border: !plainProp,
    fill: true,
    round: ((_theme$timeInput = theme.timeInput) == null || (_theme$timeInput = _theme$timeInput.container) == null ? void 0 : _theme$timeInput.round) || ((_theme$global = theme.global) == null || (_theme$global = _theme$global.control) == null || (_theme$global = _theme$global.border) == null ? void 0 : _theme$global.radius),
    disabled: disabled,
    readOnlyProp: readOnly,
    focusIndicator: (focusIndicatorProp != null ? focusIndicatorProp : true) && !iconFocused
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledTimeInputField, passThemeFlag, /*#__PURE__*/React.createElement(StyledTimeInputDisplay, _extends({
    role: "group",
    "aria-label": groupLabel,
    "aria-labelledby": formFieldLabelId,
    onMouseDown: onDisplayMouseDown
  }, passThemeFlag), displaySections.map(function (_ref6) {
    var section = _ref6.section,
      prefix = _ref6.prefix,
      text = _ref6.text,
      filled = _ref6.filled;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: section
    }, !!prefix && /*#__PURE__*/React.createElement(StyledTimeInputSeparator, _extends({
      $filled: hasDisplayValue
    }, passThemeFlag), prefix), /*#__PURE__*/React.createElement(StyledTimeInputSegment, _extends({
      ref: function ref(segmentNode) {
        segmentRefs.current[section] = segmentNode;
      },
      tabIndex: !readOnly && !disabled && activeSection === section ? 0 : -1,
      $active: showActiveSection && activeSection === section,
      $filled: filled,
      onFocus: function onFocus() {
        return onSegmentFocus(section);
      },
      onBlur: onSegmentBlur,
      onKeyDown: function onKeyDown(event) {
        return onSegmentKeyDown(section, event);
      },
      onPaste: onSegmentPaste,
      "data-active": showActiveSection && activeSection === section,
      "data-testid": showActiveSection && activeSection === section ? 'time-input-active-section' : undefined,
      "data-section": section
    }, passThemeFlag, {
      "aria-label": getSectionName(section, format, formatMessage, messages),
      role: "spinbutton",
      "aria-disabled": disabled || undefined,
      "aria-readonly": readOnly || undefined,
      "aria-valuenow": getSectionAriaMeta({
        section: section,
        format: format,
        sections: sections
      }).now,
      "aria-valuemin": getSectionAriaMeta({
        section: section,
        format: format,
        sections: sections
      }).min,
      "aria-valuemax": getSectionAriaMeta({
        section: section,
        format: format,
        sections: sections
      }).max,
      "aria-valuetext": getSectionValueAnnouncement(section)
    }), text));
  })), /*#__PURE__*/React.createElement(StyledTimeInput, _extends({
    tabIndex: -1
  }, inputRest, {
    id: id,
    ref: inputRef,
    value: inputValue,
    "aria-hidden": "true",
    disabled: disabled,
    readOnly: true,
    focusIndicator: false,
    plain: true
  }))), name && /*#__PURE__*/React.createElement("input", {
    "aria-hidden": "true",
    name: name,
    readOnly: true,
    tabIndex: -1,
    type: "hidden",
    value: value || ''
  }), !readOnly && /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(GrommetClockIcon, null),
    plain: true,
    disabled: disabled,
    margin: (_theme$timeInput2 = theme.timeInput) == null || (_theme$timeInput2 = _theme$timeInput2.button) == null ? void 0 : _theme$timeInput2.margin,
    "aria-label": formatMessage({
      id: 'timeInput.chooseTime',
      messages: messages
    }),
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": id ? id + "__drop" : undefined,
    onFocus: function onFocus() {
      setIconFocused(true);
    },
    onBlur: function onBlur() {
      setIconFocused(false);
    },
    onClick: open ? closePicker : openPicker
  })), open && /*#__PURE__*/React.createElement(TimeInputPopup, {
    activeSection: activeSection,
    align: {
      top: 'bottom',
      left: 'left'
    },
    dropProps: {
      stretch: false
    },
    format: format,
    formatMessage: formatMessage,
    hoursOptions: hoursOptions,
    id: id,
    incrementSection: incrementSection,
    label: formatMessage({
      id: 'timeInput.chooseTime',
      messages: messages
    }),
    messages: messages,
    minuteOptions: minuteOptions,
    sectionOrder: sectionOrder,
    onClose: closePicker,
    onFocusLeave: closePicker,
    secondOptions: secondOptions,
    sections: sections,
    setActiveSection: setActiveSection,
    setSectionValue: setSectionValue,
    target: containerRef.current
  })));
});
TimeInput.displayName = 'TimeInput';
TimeInput.propTypes = TimeInputPropTypes;
export { TimeInput };