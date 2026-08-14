// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useRef, useState } from 'react';
export var useSectionedField = function useSectionedField(_ref) {
  var value = _ref.value,
    parseValue = _ref.parseValue,
    defaultValue = _ref.defaultValue,
    sectionOrder = _ref.sectionOrder;
  var parsedValue = useMemo(function () {
    return parseValue(value);
  }, [parseValue, value]);
  var _useState = useState(function () {
      return parsedValue || defaultValue();
    }),
    sections = _useState[0],
    setSections = _useState[1];
  var _useState2 = useState({}),
    pendingDigits = _useState2[0],
    setPendingDigits = _useState2[1];
  var _useState3 = useState(sectionOrder[0]),
    activeSection = _useState3[0],
    setActiveSection = _useState3[1];
  var preserveIncompleteSectionsRef = useRef(false);
  useEffect(function () {
    if (!sectionOrder.includes(activeSection)) {
      setActiveSection(sectionOrder[0]);
    }
  }, [activeSection, sectionOrder]);
  useEffect(function () {
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