/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  defaultSections,
  hasAnyValue,
  isoTimeToSections,
  normalizeToIsoTime,
  pad,
  sectionKey,
  sectionMax,
  sectionMin,
  sectionsToIsoTime,
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
  value,
  onCommit,
  onInvalid,
}) => {
  const editStateRef = useRef({
    section: SECTION_HOUR,
    digits: 0,
    previousValue: undefined,
    firstDigit: undefined,
  });
  const preserveIncompleteSectionsRef = useRef(false);
  // Track pending single digit for display without committing
  const [pendingDigits, setPendingDigits] = useState({});
  const parsedValue = useMemo(
    () => isoTimeToSections(normalizeToIsoTime(value), format),
    [format, value],
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

    // Create a copy of sections with pending digits overlaid for display
    const displaySections = { ...sections };
    const pendingSection = Object.keys(pendingDigits)[0];
    if (pendingSection && pendingDigits[pendingSection] !== undefined) {
      displaySections[pendingSection] = pendingDigits[pendingSection];
    }

    return formatSectionsValue({
      sections: displaySections,
      sectionOrder,
      includeTokens: true,
    });
  }, [sectionOrder, sections, pendingDigits]);

  const commitSections = useCallback(
    (nextSections) => {
      setSections(nextSections);

      const complete = sectionOrder.every(
        (section) => nextSections[sectionKey(section)] !== undefined,
      );

      // Check if all numeric sections are valid
      const allValid = sectionOrder.every((section) => {
        if (!isNumericSection(section)) return true; // skip period
        const key = sectionKey(section);
        const sectionValue = nextSections[key];
        const min = sectionMin(section, format);
        const max = sectionMax(section, format);
        return sectionValue >= min && sectionValue <= max;
      });

      const nextValue =
        complete && sectionOrder.length && allValid
          ? sectionsToIsoTime(
              { ...nextSections, second: nextSections.second ?? 0 },
              format,
            )
          : undefined;

      // Mark as incomplete if: sections incomplete OR some invalid
      const hasIncompleteSections = !complete || !allValid;
      preserveIncompleteSectionsRef.current =
        hasIncompleteSections && hasAnyValue(nextSections);
      onCommit(nextSections, nextValue);
    },
    [onCommit, sectionOrder, format],
  );

  const setSectionValue = useCallback(
    (section, rawValue) => {
      const key = sectionKey(section);
      const next = { ...sections, [key]: rawValue };
      commitSections(next);
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
          ? 1
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
    [format, minuteStep, sections, setSectionValue],
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
        // Use the stored first digit from editState
        const firstDigit = editStateRef.current.firstDigit ?? currentRaw % 10;
        nextValue = firstDigit * 10 + digit;
        editStateRef.current = {
          section: activeSection,
          digits: 0,
          previousValue: editStateRef.current.previousValue,
          firstDigit: undefined,
        };
        // Clear pending digits since we're committing now
        setPendingDigits({});
      } else {
        // First digit: store in pending for display only
        nextValue = digit;
        editStateRef.current = {
          section: activeSection,
          digits: 1,
          previousValue: sections[key],
          firstDigit: digit,
        };
        // Show the first digit in pending state
        setPendingDigits({ [key]: digit });
      }

      // For 2nd digit: validate combined value, but allow invalid 1st digit
      // (allows "0X" patterns in formats where single "0" is invalid)
      if (isSecondDigit && (nextValue < minValue || nextValue > maxValue)) {
        // Combined value invalid. Try to use first digit for current section
        // and apply second digit to next section (MUI behavior)
        const firstDigit = editStateRef.current.firstDigit ?? currentRaw % 10;
        if (firstDigit >= minValue && firstDigit <= maxValue) {
          setSectionValue(activeSection, firstDigit);

          // Get next section and check if second digit is valid there
          const currentSectionIndex = sectionOrder.indexOf(activeSection);
          const nextSection = sectionOrder[currentSectionIndex + 1];

          if (nextSection && isNumericSection(nextSection)) {
            const nextMinValue = sectionMin(nextSection, format);
            const nextMaxValue = sectionMax(nextSection, format);

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
        onInvalid?.();
        setPendingDigits({});
        return undefined;
      }

      // MUI Pattern: Determine if we should commit and move to next section
      // shouldGoToNextSection = nextValue * 10 > max || digitCount === 2
      const shouldMoveToNextSection =
        nextValue * 10 > maxValue || isSecondDigit;

      setSectionValue(activeSection, nextValue);

      if (shouldMoveToNextSection) {
        // Don't move past the last section during digit entry
        // (Tab navigation can still wrap, but digit entry stops at last
        // section)
        const currentIndex = sectionOrder.indexOf(activeSection);
        const isLastSection = currentIndex === sectionOrder.length - 1;

        if (!isLastSection) {
          return moveSection(1);
        }
      }

      return activeSection;
    },
    [
      activeSection,
      format,
      moveSection,
      onInvalid,
      sections,
      setSectionValue,
      setPendingDigits,
      sectionOrder,
    ],
  );

  const clearActiveSection = useCallback(() => {
    setSectionValue(activeSection, undefined);
  }, [activeSection, setSectionValue]);

  const parsePasted = useCallback(
    (pasted) => {
      const parsed = parseSectionsValue(pasted, format, sectionOrder);
      if (parsed) {
        return parsed;
      }

      const digits = pasted.replace(/\D/g, '');
      const numericSections = sectionOrder.filter(
        (section) => section !== SECTION_PERIOD,
      );
      const hasExplicitPeriod = /\b(AM|PM)\b/i.test(pasted);
      const shouldInferPeriod =
        format === '12' &&
        sectionOrder.includes(SECTION_PERIOD) &&
        !hasExplicitPeriod;

      if (
        digits.length >= numericSections.length * 2 &&
        numericSections.length
      ) {
        const next = { ...sections };

        for (let i = 0; i < numericSections.length; i += 1) {
          const section = numericSections[i];
          const parsedNumber = Number(digits.slice(i * 2, i * 2 + 2));
          const minValue =
            section === SECTION_HOUR && shouldInferPeriod
              ? 0
              : sectionMin(section, format);
          const maxValue =
            section === SECTION_HOUR && shouldInferPeriod
              ? 23
              : sectionMax(section, format);

          if (
            Number.isNaN(parsedNumber) ||
            parsedNumber < minValue ||
            parsedNumber > maxValue
          ) {
            return undefined;
          }

          next[sectionKey(section)] = parsedNumber;
        }

        if (sectionOrder.includes(SECTION_PERIOD)) {
          if (hasExplicitPeriod) {
            next.period = /\bPM\b/i.test(pasted) ? 'PM' : 'AM';
          } else if (shouldInferPeriod) {
            const normalizedHour = next.hour;

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
    },
    [format, sectionOrder, sections],
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
    pendingDigits,
  };
};
