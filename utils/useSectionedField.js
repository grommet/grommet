"use strict";

exports.__esModule = true;
exports.useSectionedField = void 0;
var _react = require("react");
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var useSectionedField = exports.useSectionedField = function useSectionedField(_ref) {
  var value = _ref.value,
    parseValue = _ref.parseValue,
    defaultValue = _ref.defaultValue,
    sectionOrder = _ref.sectionOrder;
  var parsedValue = (0, _react.useMemo)(function () {
    return parseValue(value);
  }, [parseValue, value]);
  var _useState = (0, _react.useState)(function () {
      return parsedValue || defaultValue();
    }),
    sections = _useState[0],
    setSections = _useState[1];
  var _useState2 = (0, _react.useState)({}),
    pendingDigits = _useState2[0],
    setPendingDigits = _useState2[1];
  var _useState3 = (0, _react.useState)(sectionOrder[0]),
    activeSection = _useState3[0],
    setActiveSection = _useState3[1];
  var preserveIncompleteSectionsRef = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    if (!sectionOrder.includes(activeSection)) {
      setActiveSection(sectionOrder[0]);
    }
  }, [activeSection, sectionOrder]);
  (0, _react.useEffect)(function () {
    if (!parsedValue && preserveIncompleteSectionsRef.current) {
      preserveIncompleteSectionsRef.current = false;
      return;
    }
    setSections(parsedValue || defaultValue());
  }, [defaultValue, parsedValue]);
  return {
    activeSection: activeSection,
    pendingDigits: pendingDigits,
    preserveIncompleteSectionsRef: preserveIncompleteSectionsRef,
    sections: sections,
    setActiveSection: setActiveSection,
    setPendingDigits: setPendingDigits,
    setSections: setSections
  };
};