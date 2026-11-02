// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useRef, useState } from 'react';

export const useSectionedField = ({
  value,
  parseValue,
  defaultValue,
  sectionOrder,
}) => {
  const parsedValue = useMemo(() => parseValue(value), [parseValue, value]);
  const [sections, setSections] = useState(() => parsedValue || defaultValue());
  const [pendingDigits, setPendingDigits] = useState({});
  const [activeSection, setActiveSection] = useState(sectionOrder[0]);
  const preserveIncompleteSectionsRef = useRef(false);

  useEffect(() => {
    if (!sectionOrder.includes(activeSection)) {
      setActiveSection(sectionOrder[0]);
    }
  }, [activeSection, sectionOrder]);

  useEffect(() => {
    if (!parsedValue && preserveIncompleteSectionsRef.current) {
      preserveIncompleteSectionsRef.current = false;
      return;
    }

    setSections(parsedValue || defaultValue());
  }, [defaultValue, parsedValue]);

  return {
    activeSection,
    pendingDigits,
    preserveIncompleteSectionsRef,
    sections,
    setActiveSection,
    setPendingDigits,
    setSections,
  };
};
