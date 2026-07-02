/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  defaultSections,
  hasAnyValue,
  pad,
  sectionKey,
  sectionMax,
  sectionMin,
  SECTION_HOUR,
  SECTION_MINUTE,
  SECTION_PERIOD,
  SECTION_SECOND,
} from './utils';

const separatorBeforeSection = (section) =>
  section === SECTION_PERIOD ? ' ' : ':';

const sectionToken = (section) => {
  if (section === SECTION_HOUR) return 'hh';
  if (section === SECTION_MINUTE) return 'mm';
  if (section === SECTION_SECOND) return 'ss';
  return 'aa';
};

const sectionPattern = (section) => {
  if (section === SECTION_PERIOD) return '(AM|PM)';
  return '(\\d{1,2})';
};

const isNumericSection = (section) => section !== SECTION_PERIOD;

const isStepMisaligned = ({ section, value, minuteStep }) =>
  section === SECTION_MINUTE &&
  minuteStep > 1 &&
  value !== undefined &&
  value % minuteStep !== 0;

const parseSectionsValue = (value, format, sectionOrder) => {
  if (!value || typeof value !== 'string') return undefined;

  const normalized = value.trim().toUpperCase();
  if (!normalized || !sectionOrder.length) return undefined;

  const pattern = sectionOrder
    .map((section, index) => {
      const sectionRegex = sectionPattern(section);
      if (index === 0) return sectionRegex;
      return `${separatorBeforeSection(section)}\\s*${sectionRegex}`;
    })
    .join('');

  const regex = new RegExp(`^${pattern}$`);
  const match = normalized.match(regex);
  if (!match) return undefined;

  const parsed = defaultSections(format);

  sectionOrder.forEach((section, index) => {
    const key = sectionKey(section);
    const captured = match[index + 1];

    if (section === SECTION_PERIOD) {
      parsed[key] = captured;
    } else {
      const next = Number(captured);
      if (!Number.isNaN(next)) parsed[key] = next;
    }
  });

  for (let i = 0; i < sectionOrder.length; i += 1) {
    const section = sectionOrder[i];
    if (isNumericSection(section)) {
      const key = sectionKey(section);
      const next = parsed[key];
      if (
        next === undefined ||
        next < sectionMin(section, format) ||
        next > sectionMax(section, format)
      ) {
        return undefined;
      }
    }
  }

  return parsed;
};

const formatSectionsValue = ({
  sections,
  sectionOrder,
  includeTokens = false,
}) =>
  sectionOrder
    .map((section, index) => {
      const key = sectionKey(section);
      const rawValue = sections[key];
      const rendered =
        rawValue === undefined
          ? includeTokens
            ? sectionToken(section)
            : ''
          : section === SECTION_PERIOD
          ? rawValue
          : pad(rawValue);

      if (index === 0) return rendered;
      return `${separatorBeforeSection(section)}${rendered}`;
    })
    .join('');

export const useSectionedTimeField = ({
  format,
  sectionOrder,
  minuteStep = 1,
  secondStep = 1,
  value,
  onCommit,
  onInvalid,
}) => {
  const editStateRef = useRef({
    section: SECTION_HOUR,
    digits: 0,
    previousValue: undefined,
  });
  const preserveIncompleteSectionsRef = useRef(false);
  const parsedValue = useMemo(
    () => parseSectionsValue(value, format, sectionOrder),
    [format, sectionOrder, value],
  );

  const [sections, setSections] = useState(
    parsedValue || defaultSections(format),
  );
  const [activeSection, setActiveSection] = useState(
    sectionOrder[0] || SECTION_HOUR,
  );

  useEffect(() => {
    if (!sectionOrder.includes(activeSection)) {
      setActiveSection(sectionOrder[0] || SECTION_HOUR);
    }
  }, [activeSection, sectionOrder]);

  useEffect(() => {
    if (!parsedValue && preserveIncompleteSectionsRef.current) {
      preserveIncompleteSectionsRef.current = false;
      return;
    }

    setSections(parsedValue || defaultSections(format));
  }, [parsedValue, format]);

  const displayValue = useMemo(() => {
    if (!hasAnyValue(sections)) return '';

    return formatSectionsValue({
      sections,
      sectionOrder,
      includeTokens: true,
    });
  }, [sectionOrder, sections]);

  const commitSections = useCallback(
    (nextSections, shouldAccept = false) => {
      setSections(nextSections);

      const complete = sectionOrder.every(
        (section) => nextSections[sectionKey(section)] !== undefined,
      );

      const nextValue =
        complete && sectionOrder.length
          ? formatSectionsValue({
              sections: nextSections,
              sectionOrder,
              includeTokens: false,
            })
          : undefined;

      preserveIncompleteSectionsRef.current =
        !complete && hasAnyValue(nextSections);
      onCommit(nextSections, nextValue, shouldAccept);
    },
    [onCommit, sectionOrder],
  );

  const setSectionValue = useCallback(
    (section, rawValue, shouldAccept = false) => {
      const key = sectionKey(section);
      const next = { ...sections, [key]: rawValue };
      commitSections(next, shouldAccept);
    },
    [commitSections, sections],
  );

  const moveSection = useCallback(
    (direction) => {
      if (!sectionOrder.length) return activeSection;

      const activeIndex = Math.max(0, sectionOrder.indexOf(activeSection));
      const count = sectionOrder.length;
      const nextIndex = (activeIndex + direction + count) % count;
      const nextSection = sectionOrder[nextIndex];
      setActiveSection(nextSection);
      return nextSection;
    },
    [activeSection, sectionOrder],
  );

  const incrementSection = useCallback(
    (section, delta) => {
      if (section === SECTION_PERIOD) {
        setSectionValue(section, sections.period === 'AM' ? 'PM' : 'AM');
        return;
      }

      const minValue = sectionMin(section, format);
      const maxValue = sectionMax(section, format);
      const key = sectionKey(section);
      const current = sections[key];

      const step =
        section === SECTION_MINUTE
          ? minuteStep
          : section === SECTION_SECOND
          ? secondStep
          : 1;

      let next;
      if (
        step > 1 &&
        (section === SECTION_MINUTE || section === SECTION_SECOND)
      ) {
        const options = Array.from(
          { length: Math.ceil((maxValue - minValue + 1) / step) },
          (_, index) => minValue + index * step,
        ).filter((valueAtIndex) => valueAtIndex <= maxValue);

        const currentIndex = options.indexOf(current);

        if (currentIndex !== -1) {
          const wrappedIndex =
            (((currentIndex + delta) % options.length) + options.length) %
            options.length;
          next = options[wrappedIndex];
        } else if (delta > 0) {
          next =
            options.find((option) => option > (current ?? minValue - 1)) ??
            options[0];
        } else {
          const descending = [...options].reverse();
          next =
            descending.find((option) => option < (current ?? maxValue + 1)) ??
            options[options.length - 1];
        }
      } else {
        const base = current === undefined ? minValue : current;
        next = base + delta;
        if (next > maxValue) next = minValue;
        if (next < minValue) next = maxValue;
      }

      setSectionValue(section, next);
    },
    [format, minuteStep, secondStep, sections, setSectionValue],
  );

  const applyDigit = useCallback(
    (digit) => {
      if (activeSection === SECTION_PERIOD) return undefined;

      const minValue = sectionMin(activeSection, format);
      const maxValue = sectionMax(activeSection, format);
      const key = sectionKey(activeSection);
      const isSameSection = editStateRef.current.section === activeSection;
      const isSecondDigit = isSameSection && editStateRef.current.digits === 1;
      const currentRaw = sections[key] === undefined ? 0 : sections[key];

      let nextValue;
      if (isSecondDigit) {
        nextValue = (currentRaw % 10) * 10 + digit;
        editStateRef.current = {
          section: activeSection,
          digits: 0,
          previousValue: editStateRef.current.previousValue,
        };
      } else {
        nextValue = digit;
        editStateRef.current = {
          section: activeSection,
          digits: 1,
          previousValue: sections[key],
        };
      }

      if (nextValue < minValue || nextValue > maxValue) {
        onInvalid?.();
        return undefined;
      }

      // For minute section, enforce minuteStep once two digits are entered.
      // If invalid, rollback to the last committed minute value.
      if (
        isSecondDigit &&
        isStepMisaligned({
          section: activeSection,
          value: nextValue,
          minuteStep,
        })
      ) {
        const rollbackValue = editStateRef.current.previousValue;
        if (rollbackValue !== undefined) {
          setSectionValue(activeSection, rollbackValue);
        }
        onInvalid?.();
        return activeSection;
      }

      setSectionValue(activeSection, nextValue);
      if (isSecondDigit) return moveSection(1);
      return activeSection;
    },
    [
      activeSection,
      format,
      minuteStep,
      moveSection,
      onInvalid,
      sections,
      setSectionValue,
    ],
  );

  const clearActiveSection = useCallback(() => {
    setSectionValue(activeSection, undefined);
  }, [activeSection, setSectionValue]);

  const parsePasted = useCallback(
    (pasted) => {
      const parsed = parseSectionsValue(pasted, format, sectionOrder);
      if (parsed) {
        if (
          isStepMisaligned({
            section: SECTION_MINUTE,
            value: parsed.minute,
            minuteStep,
          })
        ) {
          return undefined;
        }
        return parsed;
      }

      const digits = pasted.replace(/\D/g, '');
      const numericSections = sectionOrder.filter(
        (section) => section !== SECTION_PERIOD,
      );

      if (
        digits.length >= numericSections.length * 2 &&
        numericSections.length
      ) {
        const next = { ...sections };

        for (let i = 0; i < numericSections.length; i += 1) {
          const section = numericSections[i];
          const parsedNumber = Number(digits.slice(i * 2, i * 2 + 2));

          if (
            Number.isNaN(parsedNumber) ||
            parsedNumber < sectionMin(section, format) ||
            parsedNumber > sectionMax(section, format)
          ) {
            return undefined;
          }

          next[sectionKey(section)] = parsedNumber;

          if (
            isStepMisaligned({
              section,
              value: parsedNumber,
              minuteStep,
            })
          ) {
            return undefined;
          }
        }

        if (sectionOrder.includes(SECTION_PERIOD)) {
          next.period = /PM/i.test(pasted) ? 'PM' : 'AM';
        }

        return next;
      }

      return undefined;
    },
    [format, minuteStep, sectionOrder, sections],
  );

  return {
    activeSection,
    clearActiveSection,
    displayValue,
    incrementSection,
    moveSection,
    parsePasted,
    sections,
    setActiveSection,
    setSectionValue,
    applyDigit,
    commitSections,
  };
};
