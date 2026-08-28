"use strict";

exports.__esModule = true;
exports.useSectionedTimeField = void 0;
var _react = require("react");
var _useSectionedField2 = require("../../utils/useSectionedField");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-nested-ternary */
var separatorBeforeSection = function separatorBeforeSection(section) {
  return section === _utils.SECTION_PERIOD ? ' ' : ':';
};
var sectionToken = function sectionToken(section) {
  if (section === _utils.SECTION_HOUR) return 'hh';
  if (section === _utils.SECTION_MINUTE) return 'mm';
  if (section === _utils.SECTION_SECOND) return 'ss';
  return 'aa';
};
var sectionPattern = function sectionPattern(section) {
  if (section === _utils.SECTION_PERIOD) return '(AM|PM)';
  return '(\\d{1,2})';
};
var isNumericSection = function isNumericSection(section) {
  return section !== _utils.SECTION_PERIOD;
};
var parseSectionsValue = function parseSectionsValue(value, format, sectionOrder) {
  if (!value || typeof value !== 'string') return undefined;
  var normalized = value.trim().toUpperCase();
  if (!normalized || !sectionOrder.length) return undefined;
  var pattern = sectionOrder.map(function (section, index) {
    var sectionRegex = sectionPattern(section);
    if (index === 0) return sectionRegex;
    return separatorBeforeSection(section) + "\\s*" + sectionRegex;
  }).join('');
  var regex = new RegExp("^" + pattern + "$");
  var match = normalized.match(regex);
  if (!match) return undefined;
  var parsed = (0, _utils.defaultSections)(format);
  sectionOrder.forEach(function (section, index) {
    var key = (0, _utils.sectionKey)(section);
    var captured = match[index + 1];
    if (section === _utils.SECTION_PERIOD) {
      parsed[key] = captured;
    } else {
      var next = Number(captured);
      if (!Number.isNaN(next)) parsed[key] = next;
    }
  });
  for (var i = 0; i < sectionOrder.length; i += 1) {
    var section = sectionOrder[i];
    if (isNumericSection(section)) {
      var key = (0, _utils.sectionKey)(section);
      var next = parsed[key];
      if (next === undefined || next < (0, _utils.sectionMin)(section, format) || next > (0, _utils.sectionMax)(section, format)) {
        return undefined;
      }
    }
  }
  return parsed;
};
var formatSectionsValue = function formatSectionsValue(_ref) {
  var sections = _ref.sections,
    sectionOrder = _ref.sectionOrder,
    _ref$includeTokens = _ref.includeTokens,
    includeTokens = _ref$includeTokens === void 0 ? false : _ref$includeTokens;
  return sectionOrder.map(function (section, index) {
    var key = (0, _utils.sectionKey)(section);
    var rawValue = sections[key];
    var rendered = rawValue === undefined ? includeTokens ? sectionToken(section) : '' : section === _utils.SECTION_PERIOD ? rawValue : (0, _utils.pad)(rawValue);
    if (index === 0) return rendered;
    return "" + separatorBeforeSection(section) + rendered;
  }).join('');
};
var useSectionedTimeField = exports.useSectionedTimeField = function useSectionedTimeField(_ref2) {
  var format = _ref2.format,
    sectionOrder = _ref2.sectionOrder,
    _ref2$minuteStep = _ref2.minuteStep,
    minuteStep = _ref2$minuteStep === void 0 ? 1 : _ref2$minuteStep,
    value = _ref2.value,
    onCommit = _ref2.onCommit,
    onInvalid = _ref2.onInvalid;
  var editStateRef = (0, _react.useRef)({
    section: _utils.SECTION_HOUR,
    digits: 0,
    previousValue: undefined,
    firstDigit: undefined
  });
  var parseValue = (0, _react.useCallback)(function (nextValue) {
    return (0, _utils.isoTimeToSections)((0, _utils.normalizeToIsoTime)(nextValue), format);
  }, [format]);
  var getDefaultValue = (0, _react.useCallback)(function () {
    return (0, _utils.defaultSections)(format);
  }, [format]);
  var _useSectionedField = (0, _useSectionedField2.useSectionedField)({
      value: value,
      parseValue: parseValue,
      defaultValue: getDefaultValue,
      sectionOrder: sectionOrder
    }),
    activeSection = _useSectionedField.activeSection,
    pendingDigits = _useSectionedField.pendingDigits,
    preserveIncompleteSectionsRef = _useSectionedField.preserveIncompleteSectionsRef,
    sections = _useSectionedField.sections,
    setActiveSection = _useSectionedField.setActiveSection,
    setPendingDigits = _useSectionedField.setPendingDigits,
    setSections = _useSectionedField.setSections;
  var displayValue = (0, _react.useMemo)(function () {
    if (!(0, _utils.hasAnyValue)(sections)) return '';

    // Create a copy of sections with pending digits overlaid for display
    var displaySections = _extends({}, sections);
    var pendingSection = Object.keys(pendingDigits)[0];
    if (pendingSection && pendingDigits[pendingSection] !== undefined) {
      displaySections[pendingSection] = pendingDigits[pendingSection];
    }
    return formatSectionsValue({
      sections: displaySections,
      sectionOrder: sectionOrder,
      includeTokens: true
    });
  }, [sectionOrder, sections, pendingDigits]);
  var commitSections = (0, _react.useCallback)(function (nextSections, changedSection) {
    var _nextSections$second;
    setSections(nextSections);
    var complete = sectionOrder.every(function (section) {
      return nextSections[(0, _utils.sectionKey)(section)] !== undefined;
    });

    // Check if all numeric sections are valid
    var allValid = sectionOrder.every(function (section) {
      if (!isNumericSection(section)) return true; // skip period
      var key = (0, _utils.sectionKey)(section);
      var sectionValue = nextSections[key];
      var min = (0, _utils.sectionMin)(section, format);
      var max = (0, _utils.sectionMax)(section, format);
      return sectionValue >= min && sectionValue <= max;
    });
    var nextValue = complete && sectionOrder.length && allValid ? (0, _utils.sectionsToIsoTime)(_extends({}, nextSections, {
      second: (_nextSections$second = nextSections.second) != null ? _nextSections$second : 0
    }), format) : undefined;

    // Mark as incomplete if: sections incomplete OR some invalid
    var hasIncompleteSections = !complete || !allValid;
    preserveIncompleteSectionsRef.current = hasIncompleteSections && (0, _utils.hasAnyValue)(nextSections);
    onCommit(nextSections, nextValue, changedSection);
  }, [format, onCommit, preserveIncompleteSectionsRef, sectionOrder, setSections]);
  var setSectionValue = (0, _react.useCallback)(function (section, rawValue) {
    var _extends2;
    var key = (0, _utils.sectionKey)(section);
    var next = _extends({}, sections, (_extends2 = {}, _extends2[key] = rawValue, _extends2));
    commitSections(next, section);
    // Clear any pending first-digit overlay, since it's now stale
    // relative to the section value we just committed.
    setPendingDigits({});
  }, [commitSections, sections, setPendingDigits]);
  var moveSection = (0, _react.useCallback)(function (direction) {
    if (!sectionOrder.length) return activeSection;
    var activeIndex = Math.max(0, sectionOrder.indexOf(activeSection));
    var count = sectionOrder.length;
    var nextIndex = (activeIndex + direction + count) % count;
    var nextSection = sectionOrder[nextIndex];
    setActiveSection(nextSection);
    return nextSection;
  }, [activeSection, sectionOrder, setActiveSection]);
  var incrementSection = (0, _react.useCallback)(function (section, delta) {
    if (section === _utils.SECTION_PERIOD) {
      setSectionValue(section, sections.period === 'AM' ? 'PM' : 'AM');
      return;
    }
    var minValue = (0, _utils.sectionMin)(section, format);
    var maxValue = (0, _utils.sectionMax)(section, format);
    var key = (0, _utils.sectionKey)(section);
    var current = sections[key];
    if (current === undefined) {
      setSectionValue(section, delta > 0 ? minValue : maxValue);
      return;
    }
    var step = section === _utils.SECTION_MINUTE ? minuteStep : section === _utils.SECTION_SECOND ? 1 : 1;
    var next;
    if (step > 1 && (section === _utils.SECTION_MINUTE || section === _utils.SECTION_SECOND)) {
      var options = Array.from({
        length: Math.ceil((maxValue - minValue + 1) / step)
      }, function (_, index) {
        return minValue + index * step;
      }).filter(function (valueAtIndex) {
        return valueAtIndex <= maxValue;
      });
      var currentIndex = options.indexOf(current);
      if (currentIndex !== -1) {
        var wrappedIndex = ((currentIndex + delta) % options.length + options.length) % options.length;
        next = options[wrappedIndex];
      } else if (delta > 0) {
        var _options$find;
        next = (_options$find = options.find(function (option) {
          return option > (current != null ? current : minValue - 1);
        })) != null ? _options$find : options[0];
      } else {
        var _descending$find;
        var descending = [].concat(options).reverse();
        next = (_descending$find = descending.find(function (option) {
          return option < (current != null ? current : maxValue + 1);
        })) != null ? _descending$find : options[options.length - 1];
      }
    } else {
      next = current + delta;
      if (next > maxValue) next = minValue;
      if (next < minValue) next = maxValue;
    }
    setSectionValue(section, next);
  }, [format, minuteStep, sections, setSectionValue]);
  var applyDigit = (0, _react.useCallback)(function (digit) {
    if (activeSection === _utils.SECTION_PERIOD) return undefined;
    var minValue = (0, _utils.sectionMin)(activeSection, format);
    var maxValue = (0, _utils.sectionMax)(activeSection, format);
    var key = (0, _utils.sectionKey)(activeSection);
    var isSameSection = editStateRef.current.section === activeSection;
    var isSecondDigit = isSameSection && editStateRef.current.digits === 1;
    var currentRaw = sections[key] === undefined ? 0 : sections[key];
    var nextValue;
    if (isSecondDigit) {
      var _editStateRef$current;
      // Use the stored first digit from editState
      var firstDigit = (_editStateRef$current = editStateRef.current.firstDigit) != null ? _editStateRef$current : currentRaw % 10;
      nextValue = firstDigit * 10 + digit;
      editStateRef.current = {
        section: activeSection,
        digits: 0,
        previousValue: editStateRef.current.previousValue,
        firstDigit: undefined
      };
      // Clear pending digits since we're committing now
      setPendingDigits({});
    } else {
      var _setPendingDigits;
      // First digit: store in pending for display only
      nextValue = digit;
      editStateRef.current = {
        section: activeSection,
        digits: 1,
        previousValue: sections[key],
        firstDigit: digit
      };
      // Show the first digit in pending state
      setPendingDigits((_setPendingDigits = {}, _setPendingDigits[key] = digit, _setPendingDigits));
    }

    // For 2nd digit: validate combined value, but allow invalid 1st digit
    // (allows "0X" patterns in formats where single "0" is invalid)
    if (isSecondDigit && (nextValue < minValue || nextValue > maxValue)) {
      var _editStateRef$current2;
      // Combined value invalid. Try to use first digit for current section
      // and apply second digit to next section (MUI behavior)
      var _firstDigit = (_editStateRef$current2 = editStateRef.current.firstDigit) != null ? _editStateRef$current2 : currentRaw % 10;
      if (_firstDigit >= minValue && _firstDigit <= maxValue) {
        setSectionValue(activeSection, _firstDigit);

        // Get next section and check if second digit is valid there
        var currentSectionIndex = sectionOrder.indexOf(activeSection);
        var nextSection = sectionOrder[currentSectionIndex + 1];
        if (nextSection && isNumericSection(nextSection)) {
          var nextMinValue = (0, _utils.sectionMin)(nextSection, format);
          var nextMaxValue = (0, _utils.sectionMax)(nextSection, format);

          // If second digit is valid for next section, apply it there
          if (digit >= nextMinValue && digit <= nextMaxValue) {
            setSectionValue(nextSection, digit);
            // Now move to section after that
            return moveSection(2);
          }
        }

        // If second digit not valid for next section, just move to next
        return moveSection(1);
      }

      // If even first digit alone is invalid, reject the entry
      onInvalid == null || onInvalid();
      setPendingDigits({});
      return undefined;
    }

    // MUI Pattern: Determine if we should commit and move to next section
    // shouldGoToNextSection = nextValue * 10 > max || digitCount === 2
    var shouldMoveToNextSection = nextValue * 10 > maxValue || isSecondDigit;
    setSectionValue(activeSection, nextValue);
    if (shouldMoveToNextSection) {
      // Don't move past the last section during digit entry
      // (Tab navigation can still wrap, but digit entry stops at last
      // section)
      var currentIndex = sectionOrder.indexOf(activeSection);
      var isLastSection = currentIndex === sectionOrder.length - 1;
      if (!isLastSection) {
        return moveSection(1);
      }
    }
    return activeSection;
  }, [activeSection, format, moveSection, onInvalid, sections, setSectionValue, setPendingDigits, sectionOrder]);
  var clearActiveSection = (0, _react.useCallback)(function () {
    setSectionValue(activeSection, undefined);
  }, [activeSection, setSectionValue]);
  var parsePasted = (0, _react.useCallback)(function (pasted) {
    var parsed = parseSectionsValue(pasted, format, sectionOrder);
    if (parsed) {
      return parsed;
    }
    var digits = pasted.replace(/\D/g, '');
    var numericSections = sectionOrder.filter(function (section) {
      return section !== _utils.SECTION_PERIOD;
    });
    var hasExplicitPeriod = /\b(AM|PM)\b/i.test(pasted);
    var shouldInferPeriod = format === '12' && sectionOrder.includes(_utils.SECTION_PERIOD) && !hasExplicitPeriod;
    if (digits.length >= numericSections.length * 2 && numericSections.length) {
      var next = _extends({}, sections);
      for (var i = 0; i < numericSections.length; i += 1) {
        var section = numericSections[i];
        var parsedNumber = Number(digits.slice(i * 2, i * 2 + 2));
        var minValue = section === _utils.SECTION_HOUR && shouldInferPeriod ? 0 : (0, _utils.sectionMin)(section, format);
        var maxValue = section === _utils.SECTION_HOUR && shouldInferPeriod ? 23 : (0, _utils.sectionMax)(section, format);
        if (Number.isNaN(parsedNumber) || parsedNumber < minValue || parsedNumber > maxValue) {
          return undefined;
        }
        next[(0, _utils.sectionKey)(section)] = parsedNumber;
      }
      if (sectionOrder.includes(_utils.SECTION_PERIOD)) {
        if (hasExplicitPeriod) {
          next.period = /\bPM\b/i.test(pasted) ? 'PM' : 'AM';
        } else if (shouldInferPeriod) {
          var normalizedHour = next.hour;
          if (normalizedHour === 0) {
            next.hour = 12;
            next.period = 'AM';
          } else if (normalizedHour === 12) {
            next.period = 'PM';
          } else if (normalizedHour > 12) {
            next.hour = normalizedHour - 12;
            next.period = 'PM';
          } else {
            next.period = 'AM';
          }
        }
      }
      return next;
    }
    return undefined;
  }, [format, sectionOrder, sections]);
  return {
    activeSection: activeSection,
    clearActiveSection: clearActiveSection,
    displayValue: displayValue,
    incrementSection: incrementSection,
    moveSection: moveSection,
    parsePasted: parsePasted,
    sections: sections,
    setActiveSection: setActiveSection,
    setSectionValue: setSectionValue,
    applyDigit: applyDigit,
    commitSections: commitSections,
    pendingDigits: pendingDigits
  };
};