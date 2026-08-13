// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Calendar as GrommetCalendarIcon } from 'grommet-icons/icons/Calendar';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { normalizeStep, pad } from '../../utils/dates';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { TimeInput } from '../TimeInput';
import {
  getSectionKeyFromType,
  getSectionNameFromType,
  getSectionTokenFromType,
} from '../../utils/sectionHelpers';
import {
  StyledDateTimeInput,
  StyledDateTimeInputContainer,
  StyledDateTimeInputDisplay,
  StyledDateTimeInputField,
  StyledDateTimeInputSegment,
  StyledDateTimeInputSeparator,
} from './StyledDateTimeInput';
import { DateTimeInputPropTypes } from './propTypes';

const SECTION_DAY = 0;
const SECTION_MONTH = 1;
const SECTION_YEAR = 2;
const SECTION_HOUR = 3;
const SECTION_MINUTE = 4;
const SECTION_SECOND = 5;
const SECTION_PERIOD = 6;

const pad4 = (value) => String(value).padStart(4, '0');

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const sectionTypeFromSection = (section) => {
  if (section === SECTION_DAY) return 'day';
  if (section === SECTION_MONTH) return 'month';
  if (section === SECTION_YEAR) return 'year';
  if (section === SECTION_HOUR) return 'hours';
  if (section === SECTION_MINUTE) return 'minutes';
  if (section === SECTION_SECOND) return 'seconds';
  return 'meridiem';
};

const defaultSections = (format, showSeconds) => {
  const base = {
    day: undefined,
    month: undefined,
    year: undefined,
    hour: undefined,
    minute: undefined,
    ...(showSeconds ? { second: undefined } : {}),
  };

  if (format === '12') {
    return { ...base, period: undefined };
  }

  return base;
};

const hasAnyValue = (sections) =>
  sections.day !== undefined ||
  sections.month !== undefined ||
  sections.year !== undefined ||
  sections.hour !== undefined ||
  sections.minute !== undefined ||
  sections.second !== undefined ||
  sections.period !== undefined;

const sectionForPart = (partType) => {
  if (partType === 'day') return SECTION_DAY;
  if (partType === 'month') return SECTION_MONTH;
  if (partType === 'year') return SECTION_YEAR;
  if (partType === 'hour') return SECTION_HOUR;
  if (partType === 'minute') return SECTION_MINUTE;
  if (partType === 'second') return SECTION_SECOND;
  if (partType === 'dayPeriod') return SECTION_PERIOD;
  return undefined;
};

const getSectionOrder = (format, showSeconds) => {
  const timeSections = showSeconds
    ? [SECTION_HOUR, SECTION_MINUTE, SECTION_SECOND]
    : [SECTION_HOUR, SECTION_MINUTE];

  if (format === '12') {
    return [
      SECTION_DAY,
      SECTION_MONTH,
      SECTION_YEAR,
      ...timeSections,
      SECTION_PERIOD,
    ];
  }

  return [SECTION_DAY, SECTION_MONTH, SECTION_YEAR, ...timeSections];
};

const separatorBeforeSection = (section) => {
  if (section === SECTION_MONTH || section === SECTION_YEAR) return '/';
  if (section === SECTION_HOUR) return ' ';
  if (section === SECTION_MINUTE || section === SECTION_SECOND) return ':';
  return ' ';
};

const getLocaleSectionLayout = (format, showSeconds, locale) => {
  const fallbackOrder = getSectionOrder(format, showSeconds);
  const fallbackPrefixes = {};
  fallbackOrder.forEach((section, index) => {
    fallbackPrefixes[section] =
      index === 0 ? '' : separatorBeforeSection(section);
  });

  try {
    const formatter = new Intl.DateTimeFormat(locale || undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds ? { second: '2-digit' } : {}),
      hour12: format === '12',
    });

    const parts = formatter.formatToParts(new Date());
    const seen = new Set();
    const sectionOrder = [];
    const separatorMap = {};
    let pendingLiteral = '';

    parts.forEach((part) => {
      if (part.type === 'literal') {
        pendingLiteral += part.value;
        return;
      }

      const section = sectionForPart(part.type);
      if (section === undefined) return;
      if (section === SECTION_PERIOD && format !== '12') return;
      if (section === SECTION_SECOND && !showSeconds) return;

      if (!seen.has(section)) {
        // Normalize the date/time boundary separator: strip commas (e.g. ", "
        // from en-US) so the display matches the design spec (space only).
        const raw = sectionOrder.length === 0 ? '' : pendingLiteral;
        separatorMap[section] =
          section === SECTION_HOUR
            ? raw.replace(/,/g, '').trimStart() || ' '
            : raw;
        sectionOrder.push(section);
        seen.add(section);
      }

      pendingLiteral = '';
    });

    fallbackOrder.forEach((section) => {
      if (!seen.has(section)) {
        separatorMap[section] =
          sectionOrder.length === 0 ? '' : separatorBeforeSection(section);
        sectionOrder.push(section);
      }
    });

    return { sectionOrder, separatorMap };
  } catch {
    return { sectionOrder: fallbackOrder, separatorMap: fallbackPrefixes };
  }
};

const getLocaleTimeFormat = (locale) => {
  try {
    const { hour12 } = new Intl.DateTimeFormat(locale || undefined, {
      hour: 'numeric',
    }).resolvedOptions();
    return hour12 === false ? '24' : '12';
  } catch {
    return '12';
  }
};

const toLocalSections = (value, format) => {
  if (!value || typeof value !== 'string') return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;

  const year = parsed.getFullYear();
  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();
  const hour24 = parsed.getHours();
  const minute = parsed.getMinutes();
  const second = parsed.getSeconds();

  if (format === '12') {
    const period = hour24 < 12 ? 'AM' : 'PM';
    const hour = hour24 % 12 || 12;
    return { day, month, year, hour, minute, second, period };
  }

  return { day, month, year, hour: hour24, minute, second };
};

const toUtcISOString = (sections, format, showSeconds) => {
  const { day, month, year, hour, minute, second, period = 'AM' } = sections;

  if (
    day === undefined ||
    month === undefined ||
    year === undefined ||
    hour === undefined ||
    minute === undefined ||
    (showSeconds && second === undefined)
  ) {
    return undefined;
  }

  let hour24 = hour;
  if (format === '12') {
    hour24 = hour % 12;
    if (period === 'PM') hour24 += 12;
  }

  const daysInMonth = getDaysInMonth(year, month);
  if (day < 1 || day > daysInMonth) return undefined;

  const resolvedSecond = showSeconds ? second : second ?? 0;

  const candidate = new Date(
    year,
    month - 1,
    day,
    hour24,
    minute,
    resolvedSecond,
    0,
  );
  if (
    candidate.getFullYear() !== year ||
    candidate.getMonth() + 1 !== month ||
    candidate.getDate() !== day
  ) {
    return undefined;
  }

  return candidate.toISOString();
};

const getCalendarDate = (sections) => {
  const { day, month, year } = sections;

  if (day === undefined || month === undefined || year === undefined) {
    return undefined;
  }

  const daysInMonth = getDaysInMonth(year, month);
  if (day < 1 || day > daysInMonth) return undefined;

  // Calendar selection should persist even before time sections are complete.
  return `${pad4(year)}-${pad(month)}-${pad(day)}`;
};

const parseCalendarSelection = (nextValue) => {
  if (!nextValue) return undefined;
  const nextDate = Array.isArray(nextValue) ? nextValue[0] : nextValue;
  if (!nextDate || typeof nextDate !== 'string') return undefined;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(nextDate);
  if (match) {
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3]),
    };
  }

  const parsed = new Date(nextDate);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return {
    year: parsed.getFullYear(),
    month: parsed.getMonth() + 1,
    day: parsed.getDate(),
  };
};

const getSeededTimeSections = (sections, format, showSeconds) => {
  const hourMin = format === '12' ? 1 : 0;

  return {
    hour: sections.hour ?? hourMin,
    minute: sections.minute ?? 0,
    ...(showSeconds ? { second: sections.second ?? 0 } : {}),
    ...(format === '12' ? { period: sections.period ?? 'AM' } : {}),
  };
};

const hasCompleteDateSections = (sections) =>
  sections.day !== undefined &&
  sections.month !== undefined &&
  sections.year !== undefined;

const getSeededDateSections = (sections) => {
  if (hasCompleteDateSections(sections)) {
    return {
      day: sections.day,
      month: sections.month,
      year: sections.year,
    };
  }

  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
};

const getSectionName = (section, formatMessage, messages) => {
  const sectionType = sectionTypeFromSection(section);
  return getSectionNameFromType({
    sectionType,
    messagePrefix: 'dateTimeInput',
    formatMessage,
    messages,
  });
};

const getSectionLimits = (section, format, sections) => {
  if (section === SECTION_DAY) {
    const year = sections.year || new Date().getFullYear();
    const month = sections.month || 1;
    return { min: 1, max: getDaysInMonth(year, month) };
  }
  if (section === SECTION_MONTH) return { min: 1, max: 12 };
  if (section === SECTION_YEAR) return { min: 1, max: 9999 };
  if (section === SECTION_HOUR)
    return {
      min: format === '12' ? 1 : 0,
      max: format === '12' ? 12 : 23,
    };
  if (section === SECTION_PERIOD) return { min: 0, max: 1 };
  return { min: 0, max: 59 };
};

const digitsPerSection = (section) => {
  if (section === SECTION_YEAR) return 4;
  if (section === SECTION_PERIOD) return 0;
  return 2;
};

const formatSectionText = (section, value) => {
  if (value === undefined || value === '')
    return getSectionTokenFromType(sectionTypeFromSection(section));
  if (section === SECTION_YEAR) return pad4(value);
  if (section === SECTION_PERIOD) return value;
  return pad(value);
};

const DateTimeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      format,
      id,
      inline = false,
      locale,
      messages,
      minuteStep = 1,
      name,
      onChange,
      plain: plainProp,
      focusIndicator: focusIndicatorProp,
      readOnly = false,
      showSeconds = false,
      value: valueArg,
      ...rest
    },
    refArg,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const announce = useContext(AnnounceContext);
    const { format: formatMessage } = useContext(MessageContext);
    const formContext = useContext(FormContext);
    const { useFormInput } = formContext;
    const resolvedFormat = useMemo(
      () => format || getLocaleTimeFormat(locale),
      [format, locale],
    );
    const separatorPadToken = theme.dateTimeInput?.separator?.pad;
    const dateTimeSeparatorPadding =
      theme.global.edgeSize?.[separatorPadToken] ||
      separatorPadToken ||
      theme.global.edgeSize?.xxsmall;

    const inputRef = useForwardedRef(refArg);
    const containerRef = useRef();
    const triggerRef = useRef();
    const segmentRefs = useRef({});
    const activeSectionRef = useRef(SECTION_DAY);
    const suppressSegmentFocusRef = useRef(false);
    const suppressTimePartialSyncRef = useRef(false);
    const editStateRef = useRef({
      section: SECTION_DAY,
      buffer: '',
    });
    const preserveIncompleteSectionsRef = useRef(false);

    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue || '',
    });

    const parsedValue = useMemo(
      () => toLocalSections(value, resolvedFormat),
      [resolvedFormat, value],
    );
    const { sectionOrder, separatorMap } = useMemo(
      () => getLocaleSectionLayout(resolvedFormat, showSeconds, locale),
      [resolvedFormat, showSeconds, locale],
    );
    const firstSection = sectionOrder[0] || SECTION_DAY;
    const lastSection = sectionOrder[sectionOrder.length - 1] || SECTION_SECOND;

    const [sections, setSections] = useState(
      parsedValue || defaultSections(resolvedFormat, showSeconds),
    );
    const [pendingDigits, setPendingDigits] = useState({});
    const [activeSection, setActiveSection] = useState(firstSection);
    const [segmentFocused, setSegmentFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const normalizedMinuteStep = useMemo(
      () => normalizeStep(minuteStep),
      [minuteStep],
    );

    useEffect(() => {
      activeSectionRef.current = activeSection;
      if (!sectionOrder.includes(activeSection)) {
        setActiveSection(firstSection);
      }
    }, [activeSection, firstSection, sectionOrder]);

    useEffect(() => {
      if (!parsedValue && preserveIncompleteSectionsRef.current) {
        preserveIncompleteSectionsRef.current = false;
        return;
      }

      setSections(parsedValue || defaultSections(resolvedFormat, showSeconds));
    }, [parsedValue, resolvedFormat, showSeconds]);

    const commitSections = useCallback(
      (nextSections) => {
        setSections(nextSections);
        const complete = sectionOrder.every(
          (section) =>
            nextSections[
              getSectionKeyFromType(sectionTypeFromSection(section))
            ] !== undefined,
        );
        const anyValue = hasAnyValue(nextSections);
        const nextValue = complete
          ? toUtcISOString(nextSections, resolvedFormat, showSeconds)
          : undefined;

        preserveIncompleteSectionsRef.current =
          (!nextValue || !complete) && anyValue;

        // Structured input contract: emit only valid committed values.
        // Emit undefined only when user fully clears the component.
        if (nextValue) {
          setValue(nextValue);
          onChange?.({ value: nextValue });
          return;
        }

        if (!anyValue) {
          setValue(undefined);
          onChange?.({ value: undefined });
        }
      },
      [onChange, resolvedFormat, sectionOrder, setValue, showSeconds],
    );

    const setSectionValue = useCallback(
      (section, rawValue) => {
        const key = getSectionKeyFromType(sectionTypeFromSection(section));
        const nextSections = { ...sections, [key]: rawValue };

        if (section === SECTION_MONTH || section === SECTION_YEAR) {
          const dayLimit = getSectionLimits(
            SECTION_DAY,
            resolvedFormat,
            nextSections,
          ).max;
          if (nextSections.day !== undefined && nextSections.day > dayLimit) {
            nextSections.day = dayLimit;
          }
        }

        commitSections(nextSections);
      },
      [commitSections, resolvedFormat, sections],
    );

    const moveSection = useCallback(
      (direction) => {
        const activeIndex = Math.max(0, sectionOrder.indexOf(activeSection));
        const count = sectionOrder.length;
        const nextIndex = (activeIndex + direction + count) % count;
        const nextSection = sectionOrder[nextIndex];
        setActiveSection(nextSection);
        return nextSection;
      },
      [activeSection, sectionOrder],
    );

    const focusSection = useCallback((section) => {
      const target = segmentRefs.current[section];
      if (target) target.focus();
    }, []);

    const incrementSection = useCallback(
      (section, delta) => {
        if (section === SECTION_PERIOD) {
          setSectionValue(section, sections.period === 'AM' ? 'PM' : 'AM');
          return;
        }

        // When year is empty, seed it to the current year first to avoid
        // wrapping to 0001/9999 on the initial arrow interaction.
        if (section === SECTION_YEAR && sections.year === undefined) {
          setSectionValue(SECTION_YEAR, new Date().getFullYear());
          return;
        }

        const { min, max } = getSectionLimits(
          section,
          resolvedFormat,
          sections,
        );
        const key = getSectionKeyFromType(sectionTypeFromSection(section));
        const current = sections[key] === undefined ? min : sections[key];
        const step = section === SECTION_MINUTE ? normalizedMinuteStep : 1;
        let next;

        if (section === SECTION_MINUTE && step > 1) {
          const options = Array.from(
            { length: Math.ceil((max - min + 1) / step) },
            (_, index) => min + index * step,
          ).filter((valueAtIndex) => valueAtIndex <= max);

          const currentIndex = options.indexOf(current);

          if (currentIndex !== -1) {
            const wrappedIndex =
              (((currentIndex + delta) % options.length) + options.length) %
              options.length;
            next = options[wrappedIndex];
          } else if (delta > 0) {
            next = options.find((option) => option > current) ?? options[0];
          } else {
            const descending = [...options].reverse();
            next =
              descending.find((option) => option < current) ??
              options[options.length - 1];
          }
        } else {
          next = current + delta * step;
          if (next > max) next = min;
          if (next < min) next = max;
        }

        setSectionValue(section, next);
      },
      [normalizedMinuteStep, resolvedFormat, sections, setSectionValue],
    );

    const commitPendingBuffer = useCallback(() => {
      const { section, buffer } = editStateRef.current;
      if (!buffer) return;
      const numeric = Number(buffer);
      const { min, max } = getSectionLimits(section, resolvedFormat, sections);
      if (!Number.isNaN(numeric) && numeric >= min && numeric <= max) {
        setSectionValue(section, numeric);
      }
      editStateRef.current = { section, buffer: '' };
      setPendingDigits({});
    }, [resolvedFormat, sections, setSectionValue]);

    const applyDigit = useCallback(
      (digit) => {
        if (activeSection === SECTION_PERIOD) return activeSection;
        const key = getSectionKeyFromType(
          sectionTypeFromSection(activeSection),
        );
        const needed = digitsPerSection(activeSection);
        const sameSection = editStateRef.current.section === activeSection;
        if (!sameSection) commitPendingBuffer();
        const currentBuffer = sameSection ? editStateRef.current.buffer : '';
        const nextBuffer = `${currentBuffer}${digit}`;

        editStateRef.current = {
          section: activeSection,
          buffer: nextBuffer,
        };

        if (nextBuffer.length < needed) {
          const { max } = getSectionLimits(
            activeSection,
            resolvedFormat,
            sections,
          );
          if (Number(nextBuffer) * 10 <= max) {
            setPendingDigits({ [key]: nextBuffer });
            return activeSection;
          }
          // first digit * 10 exceeds max — commit it directly
        }

        const numeric = Number(nextBuffer);
        const { min, max } = getSectionLimits(
          activeSection,
          resolvedFormat,
          sections,
        );
        if (Number.isNaN(numeric) || numeric < min || numeric > max) {
          announce(
            formatMessage({ id: 'dateTimeInput.invalidDateTime', messages }),
            'assertive',
          );
          editStateRef.current = { section: activeSection, buffer: '' };
          setPendingDigits({});
          return activeSection;
        }

        setPendingDigits({});
        editStateRef.current = { section: activeSection, buffer: '' };
        setSectionValue(activeSection, numeric);

        const sectionIndex = sectionOrder.indexOf(activeSection);
        const isLastSection = sectionIndex === sectionOrder.length - 1;
        if (!isLastSection) return moveSection(1);
        return activeSection;
      },
      [
        activeSection,
        announce,
        commitPendingBuffer,
        formatMessage,
        messages,
        moveSection,
        resolvedFormat,
        sectionOrder,
        sections,
        setSectionValue,
      ],
    );

    const clearActiveSection = useCallback(() => {
      setPendingDigits({});
      editStateRef.current = { section: activeSection, buffer: '' };
      setSectionValue(activeSection, undefined);
    }, [activeSection, setSectionValue]);

    const getDisplayText = useCallback(
      (section) => {
        const key = getSectionKeyFromType(sectionTypeFromSection(section));
        const pending = pendingDigits[key];
        if (pending !== undefined) {
          if (section === SECTION_YEAR) return pending.padEnd(4, 'y');
          if (section === SECTION_PERIOD) return pending;
          return pending.padStart(2, '0');
        }
        return formatSectionText(section, sections[key]);
      },
      [pendingDigits, sections],
    );

    const displaySections = useMemo(
      () =>
        sectionOrder.map((section, index) => {
          const key = getSectionKeyFromType(sectionTypeFromSection(section));
          return {
            section,
            prefix:
              index === 0
                ? ''
                : separatorMap[section] ?? separatorBeforeSection(section),
            text: getDisplayText(section),
            filled:
              sections[key] !== undefined || pendingDigits[key] !== undefined,
          };
        }),
      [getDisplayText, pendingDigits, sectionOrder, sections, separatorMap],
    );

    const placeholder = useMemo(
      () =>
        sectionOrder
          .map((section, index) => {
            const token = getSectionTokenFromType(
              sectionTypeFromSection(section),
            );
            if (index === 0) return token;
            const prefix =
              separatorMap[section] ?? separatorBeforeSection(section);
            return `${prefix}${token}`;
          })
          .join(''),
      [sectionOrder, separatorMap],
    );

    const hasDisplayValue =
      hasAnyValue(sections) || Object.keys(pendingDigits).length > 0;
    const inputValue = hasDisplayValue
      ? displaySections.map(({ prefix, text }) => `${prefix}${text}`).join('')
      : placeholder;

    const sectionValueAnnouncement = useCallback(
      (section) => {
        const nameText = getSectionName(section, formatMessage, messages);
        const key = getSectionKeyFromType(sectionTypeFromSection(section));
        const raw = sections[key];

        if (raw === undefined) {
          return formatMessage({
            id: 'dateTimeInput.activeSection',
            messages,
            values: { section: nameText },
          });
        }

        return formatMessage({
          id: 'dateTimeInput.activeSectionValue',
          messages,
          values: { value: raw },
        });
      },
      [formatMessage, messages, sections],
    );

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      if (!segmentFocused) {
        activeSectionRef.current = firstSection;
        setActiveSection(firstSection);
      }
      setOpen(true);
      announce(formatMessage({ id: 'dateTimeInput.openDrop', messages }));
    }, [
      announce,
      disabled,
      firstSection,
      formatMessage,
      messages,
      readOnly,
      segmentFocused,
    ]);

    const closePicker = useCallback(() => {
      setSegmentFocused(false);
      suppressSegmentFocusRef.current = true;
      setOpen(false);

      requestAnimationFrame(() => {
        if (inline) {
          triggerRef.current?.focus();
          return;
        }
        focusSection(activeSectionRef.current);
      });
    }, [focusSection, inline]);

    const onDisplaySectionMouseDown = useCallback(
      (section, event) => {
        if (readOnly || disabled) return;
        if (event.button !== 0 || event.defaultPrevented) return;
        event.preventDefault();
        event.stopPropagation();
        commitPendingBuffer();
        setSegmentFocused(true);
        setActiveSection(section);
        focusSection(section);
      },
      [commitPendingBuffer, disabled, focusSection, readOnly],
    );

    const onDisplayMouseDown = useCallback(
      (event) => {
        if (readOnly || event.button !== 0 || event.defaultPrevented) return;
        const sectionNode = event.target.closest?.('[data-section]');
        if (sectionNode?.dataset?.section !== undefined) {
          const section = Number(sectionNode.dataset.section);
          if (!Number.isNaN(section)) {
            onDisplaySectionMouseDown(section, event);
            return;
          }
        }
        event.preventDefault();
        commitPendingBuffer();
        setSegmentFocused(true);
        setActiveSection(firstSection);
        focusSection(firstSection);
      },
      [
        commitPendingBuffer,
        firstSection,
        focusSection,
        onDisplaySectionMouseDown,
        readOnly,
      ],
    );

    const onSegmentFocus = useCallback(
      (section) => {
        if (suppressSegmentFocusRef.current) {
          suppressSegmentFocusRef.current = false;
        } else {
          setSegmentFocused(true);
        }
        if (readOnly || disabled) return;
        setActiveSection(section);
      },
      [disabled, readOnly],
    );

    const onSegmentBlur = useCallback(() => {
      requestAnimationFrame(() => {
        const { activeElement } = document;
        const isSegmentActive = Object.values(segmentRefs.current).includes(
          activeElement,
        );
        if (
          !isSegmentActive &&
          activeElement === document.body &&
          !readOnly &&
          !disabled
        ) {
          focusSection(activeSection);
          return;
        }
        if (!isSegmentActive) {
          setSegmentFocused(false);
        }
      });
    }, [activeSection, disabled, focusSection, readOnly]);

    const onSegmentKeyDown = useCallback(
      (section, event) => {
        if (readOnly || disabled) return;
        if (!segmentFocused) setSegmentFocused(true);
        const { key } = event;

        if (activeSection !== section) setActiveSection(section);

        if (key === 'ArrowRight') {
          event.preventDefault();
          commitPendingBuffer();
          const next = moveSection(1);
          focusSection(next);
          return;
        }
        if (key === 'ArrowLeft') {
          event.preventDefault();
          commitPendingBuffer();
          const next = moveSection(-1);
          focusSection(next);
          return;
        }
        if (key === 'Home') {
          event.preventDefault();
          commitPendingBuffer();
          setActiveSection(firstSection);
          focusSection(firstSection);
          return;
        }
        if (key === 'End') {
          event.preventDefault();
          commitPendingBuffer();
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

        if (resolvedFormat === '12' && section === SECTION_PERIOD) {
          const lower = key.toLowerCase();
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
          const next = applyDigit(Number(key));
          if (next !== section) {
            focusSection(next);
          } else {
            event.currentTarget.focus();
          }
        }
      },
      [
        activeSection,
        applyDigit,
        clearActiveSection,
        closePicker,
        commitPendingBuffer,
        disabled,
        firstSection,
        focusSection,
        incrementSection,
        lastSection,
        moveSection,
        open,
        openPicker,
        readOnly,
        resolvedFormat,
        segmentFocused,
        setSectionValue,
      ],
    );

    useEffect(() => {
      if (!segmentFocused || readOnly || disabled) return;
      const activeSegment = segmentRefs.current[activeSection];
      if (activeSegment && document.activeElement !== activeSegment) {
        activeSegment.focus();
      }
    }, [activeSection, disabled, readOnly, segmentFocused]);

    const handleCalendarSelect = useCallback(
      (nextDateValue) => {
        const parsed = parseCalendarSelection(nextDateValue);
        if (!parsed) return;
        const seededTimeSections = getSeededTimeSections(
          sections,
          resolvedFormat,
          showSeconds,
        );
        const nextSections = {
          ...sections,
          day: parsed.day,
          month: parsed.month,
          year: parsed.year,
          ...seededTimeSections,
        };

        const isSameSelection =
          nextSections.day === sections.day &&
          nextSections.month === sections.month &&
          nextSections.year === sections.year &&
          nextSections.hour === sections.hour &&
          nextSections.minute === sections.minute &&
          nextSections.second === sections.second &&
          nextSections.period === sections.period;

        if (isSameSelection) return;

        suppressTimePartialSyncRef.current = true;
        setPendingDigits({});
        editStateRef.current = { section: activeSection, buffer: '' };
        activeSectionRef.current = SECTION_HOUR;
        setActiveSection(SECTION_HOUR);
        commitSections(nextSections);
      },
      [activeSection, commitSections, resolvedFormat, sections, showSeconds],
    );

    const handleTimeSelect = useCallback(
      ({ value: nextTime }) => {
        setPendingDigits({});
        editStateRef.current = { section: activeSection, buffer: '' };
        if (!nextTime) {
          // Incomplete picker selection — preserve existing sections.
          return;
        }

        const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(nextTime);
        if (!match) return;
        const hour24 = Number(match[1]);
        const minute = Number(match[2]);
        const second = Number(match[3]);

        let nextHour;
        let nextPeriod;
        if (resolvedFormat === '12') {
          nextPeriod = hour24 < 12 ? 'AM' : 'PM';
          nextHour = hour24 % 12 || 12;
        } else {
          nextHour = hour24;
          nextPeriod = undefined;
        }

        commitSections({
          ...sections,
          ...getSeededDateSections(sections),
          hour: nextHour,
          minute,
          second,
          period: nextPeriod,
        });
      },
      [activeSection, commitSections, resolvedFormat, sections],
    );

    // TimeInput section constants (0–3) → DateTimeInput section constants (3–6)
    const TIME_TO_DT_SECTION = useMemo(
      () => [SECTION_HOUR, SECTION_MINUTE, SECTION_SECOND, SECTION_PERIOD],
      [],
    );

    const handleTimePartialChange = useCallback(
      (timeSections, changedTimeSectionIndex) => {
        if (suppressTimePartialSyncRef.current) {
          suppressTimePartialSyncRef.current = false;
          return;
        }

        // Sync the active spinbutton segment to the column being edited
        const dtSection = TIME_TO_DT_SECTION[changedTimeSectionIndex];
        if (dtSection !== undefined) setActiveSection(dtSection);

        // Update display state with partial time fields immediately so the
        // input shows values as each column is selected, not only on
        // completion.
        setSections((prev) => {
          const mergedTimeSections = {
            ...prev,
            hour: timeSections.hour ?? prev.hour,
            minute: timeSections.minute ?? prev.minute,
            ...(showSeconds
              ? { second: timeSections.second ?? prev.second }
              : {}),
            ...(resolvedFormat === '12'
              ? { period: timeSections.period ?? prev.period }
              : {}),
          };

          return {
            ...prev,
            ...getSeededDateSections(prev),
            ...getSeededTimeSections(
              mergedTimeSections,
              resolvedFormat,
              showSeconds,
            ),
          };
        });
      },
      [resolvedFormat, setActiveSection, showSeconds, TIME_TO_DT_SECTION],
    );

    const timeValue = useMemo(() => {
      if (sections.hour === undefined) {
        return undefined;
      }
      if (showSeconds && sections.second === undefined) return undefined;
      const minute = sections.minute ?? 0;
      const resolvedSecond = sections.second ?? 0;

      if (resolvedFormat === '12') {
        let hour24 = sections.hour % 12;
        if ((sections.period || 'AM') === 'PM') hour24 += 12;
        return `${pad(hour24)}:${pad(minute)}:${pad(resolvedSecond)}`;
      }

      return `${pad(sections.hour)}:${pad(minute)}:${pad(resolvedSecond)}`;
    }, [resolvedFormat, sections, showSeconds]);

    const showActiveSection =
      (segmentFocused || open) && !readOnly && !disabled;
    const { inForm } = formContext.useFormField({});
    const formFieldLabelId = inForm && id ? `grommet-${id}__label` : undefined;
    const groupLabel = formFieldLabelId
      ? undefined
      : formatMessage({ id: 'dateTimeInput.inputLabel', messages });
    const CalendarIcon =
      theme.dateTimeInput?.icon?.calendar || GrommetCalendarIcon;
    const dropTarget = inline ? triggerRef.current : containerRef.current;
    const generatedId = useId();
    const dropId = `${id || generatedId}__drop`;

    return (
      <Keyboard onEsc={open ? closePicker : undefined}>
        <Box>
          {inline ? (
            <Box direction="row" align="center">
              <Button
                ref={triggerRef}
                icon={<CalendarIcon />}
                plain
                disabled={disabled || readOnly}
                aria-label={formatMessage({
                  id: 'dateTimeInput.chooseDateTime',
                  messages,
                })}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={dropId}
                onClick={open ? closePicker : openPicker}
              />
            </Box>
          ) : (
            <StyledDateTimeInputContainer
              ref={containerRef}
              direction="row"
              border={!plainProp}
              fill
              round={theme.dateTimeInput?.container?.round}
              disabled={disabled}
              readOnlyProp={readOnly}
              focusIndicator={focusIndicatorProp ?? true}
              {...passThemeFlag}
            >
              <StyledDateTimeInputField {...passThemeFlag}>
                <StyledDateTimeInputDisplay
                  role="group"
                  aria-label={groupLabel}
                  aria-labelledby={formFieldLabelId}
                  onMouseDown={onDisplayMouseDown}
                  {...passThemeFlag}
                >
                  {displaySections.map(({ section, prefix, text, filled }) => {
                    const sectionLimits = getSectionLimits(
                      section,
                      resolvedFormat,
                      sections,
                    );
                    const key = getSectionKeyFromType(
                      sectionTypeFromSection(section),
                    );
                    let numericValue;
                    if (section === SECTION_PERIOD) {
                      numericValue = sections[key] === 'PM' ? 1 : 0;
                    } else {
                      numericValue = sections[key] ?? sectionLimits.min;
                    }

                    return (
                      <React.Fragment key={section}>
                        {!!prefix && (
                          <StyledDateTimeInputSeparator
                            $filled={hasDisplayValue}
                            $paddingInline={dateTimeSeparatorPadding}
                            {...passThemeFlag}
                          >
                            {prefix}
                          </StyledDateTimeInputSeparator>
                        )}
                        <StyledDateTimeInputSegment
                          ref={(segmentNode) => {
                            segmentRefs.current[section] = segmentNode;
                          }}
                          tabIndex={
                            !readOnly && !disabled && activeSection === section
                              ? 0
                              : -1
                          }
                          $active={
                            showActiveSection && activeSection === section
                          }
                          $filled={filled}
                          onFocus={() => onSegmentFocus(section)}
                          onBlur={onSegmentBlur}
                          onKeyDown={(event) =>
                            onSegmentKeyDown(section, event)
                          }
                          data-section={section}
                          role="spinbutton"
                          aria-label={getSectionName(
                            section,
                            formatMessage,
                            messages,
                          )}
                          aria-disabled={disabled || undefined}
                          aria-readonly={readOnly || undefined}
                          aria-valuenow={numericValue}
                          aria-valuemin={sectionLimits.min}
                          aria-valuemax={sectionLimits.max}
                          aria-valuetext={sectionValueAnnouncement(section)}
                          {...passThemeFlag}
                        >
                          {text}
                        </StyledDateTimeInputSegment>
                      </React.Fragment>
                    );
                  })}
                </StyledDateTimeInputDisplay>
                <StyledDateTimeInput
                  tabIndex={-1}
                  {...rest}
                  id={id}
                  ref={inputRef}
                  value={inputValue}
                  aria-hidden="true"
                  disabled={disabled}
                  readOnly
                  focusIndicator={false}
                  plain
                />
              </StyledDateTimeInputField>
              {!readOnly && (
                <Button
                  ref={triggerRef}
                  icon={<CalendarIcon />}
                  plain
                  disabled={disabled}
                  margin={theme.dateTimeInput?.button?.margin}
                  aria-label={formatMessage({
                    id: 'dateTimeInput.chooseDateTime',
                    messages,
                  })}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  aria-controls={dropId}
                  onClick={open ? closePicker : openPicker}
                />
              )}
            </StyledDateTimeInputContainer>
          )}
          {name && (
            <input
              aria-hidden="true"
              name={name}
              readOnly
              tabIndex={-1}
              type="hidden"
              value={value || ''}
            />
          )}
          {open && (
            <Drop
              id={dropId}
              target={dropTarget}
              align={{ top: 'bottom', left: 'left' }}
              onEsc={closePicker}
              onClickOutside={closePicker}
            >
              <Box
                direction="row"
                pad={theme.dateTimeInput?.drop?.pad}
                gap={theme.dateTimeInput?.drop?.gap}
              >
                <Calendar
                  date={getCalendarDate(sections)}
                  initialFocus="days"
                  onSelect={handleCalendarSelect}
                />
                <Box
                  alignSelf="stretch"
                  flex={false}
                  border={{
                    side: 'start',
                    color: theme.dateTimeInput?.drop?.border?.color,
                    size: theme.dateTimeInput?.drop?.border?.size,
                  }}
                />
                <TimeInput
                  inline
                  format={resolvedFormat}
                  value={timeValue}
                  showSeconds={showSeconds}
                  messages={messages}
                  minuteStep={normalizedMinuteStep}
                  disabled={disabled}
                  readOnly={readOnly}
                  onChange={handleTimeSelect}
                  onPartialChange={handleTimePartialChange}
                />
              </Box>
            </Drop>
          )}
        </Box>
      </Keyboard>
    );
  },
);

DateTimeInput.displayName = 'DateTimeInput';

if (process.env.NODE_ENV !== 'production') {
  DateTimeInput.propTypes = DateTimeInputPropTypes;
}

export { DateTimeInput };
