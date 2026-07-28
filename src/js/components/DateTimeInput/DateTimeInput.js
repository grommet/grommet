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
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { TimeInputPopup } from '../TimeInput/TimeInputPopup';
import {
  StyledTimeInput,
  StyledTimeInputContainer,
  StyledTimeInputDisplay,
  StyledTimeInputField,
  StyledTimeInputSegment,
  StyledTimeInputSeparator,
} from '../TimeInput/StyledTimeInput';
import {
  SECTION_HOUR as TIME_SECTION_HOUR,
  SECTION_MINUTE as TIME_SECTION_MINUTE,
  SECTION_SECOND as TIME_SECTION_SECOND,
  SECTION_PERIOD as TIME_SECTION_PERIOD,
} from '../TimeInput/utils';
import { DateTimeInputPropTypes } from './propTypes';

const SECTION_DAY = 0;
const SECTION_MONTH = 1;
const SECTION_YEAR = 2;
const SECTION_HOUR = 3;
const SECTION_MINUTE = 4;
const SECTION_SECOND = 5;
const SECTION_PERIOD = 6;

const pad2 = (value) => String(value).padStart(2, '0');
const pad4 = (value) => String(value).padStart(4, '0');

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const sectionKey = (section) => {
  if (section === SECTION_DAY) return 'day';
  if (section === SECTION_MONTH) return 'month';
  if (section === SECTION_YEAR) return 'year';
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
};

const tokenForSection = (section) => {
  if (section === SECTION_DAY) return 'dd';
  if (section === SECTION_MONTH) return 'mm';
  if (section === SECTION_YEAR) return 'yyyy';
  if (section === SECTION_HOUR) return 'hh';
  if (section === SECTION_MINUTE) return 'mm';
  if (section === SECTION_SECOND) return 'ss';
  return 'aa';
};

const defaultSections = (format) =>
  format === '12'
    ? {
        day: undefined,
        month: undefined,
        year: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined,
        period: undefined,
      }
    : {
        day: undefined,
        month: undefined,
        year: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined,
      };

const hasAnyValue = (sections) =>
  sections.day !== undefined ||
  sections.month !== undefined ||
  sections.year !== undefined ||
  sections.hour !== undefined ||
  sections.minute !== undefined ||
  sections.second !== undefined ||
  sections.period !== undefined;

const getSectionOrder = (format) =>
  format === '12'
    ? [
        SECTION_DAY,
        SECTION_MONTH,
        SECTION_YEAR,
        SECTION_HOUR,
        SECTION_MINUTE,
        SECTION_SECOND,
        SECTION_PERIOD,
      ]
    : [
        SECTION_DAY,
        SECTION_MONTH,
        SECTION_YEAR,
        SECTION_HOUR,
        SECTION_MINUTE,
        SECTION_SECOND,
      ];

const separatorBeforeSection = (section) => {
  if (section === SECTION_MONTH || section === SECTION_YEAR) return '/';
  if (section === SECTION_HOUR) return ' ';
  if (section === SECTION_MINUTE || section === SECTION_SECOND) return ':';
  return ' ';
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

const toUtcISOString = (sections, format) => {
  const { day, month, year, hour, minute, second, period = 'AM' } = sections;

  if (
    day === undefined ||
    month === undefined ||
    year === undefined ||
    hour === undefined ||
    minute === undefined ||
    second === undefined
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

  const candidate = new Date(year, month - 1, day, hour24, minute, second, 0);
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
  return `${pad4(year)}-${pad2(month)}-${pad2(day)}`;
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

const getSectionName = (section, formatMessage, messages) => {
  if (section === SECTION_DAY) {
    return formatMessage({ id: 'dateTimeInput.sectionDay', messages });
  }
  if (section === SECTION_MONTH) {
    return formatMessage({ id: 'dateTimeInput.sectionMonth', messages });
  }
  if (section === SECTION_YEAR) {
    return formatMessage({ id: 'dateTimeInput.sectionYear', messages });
  }
  if (section === SECTION_HOUR) {
    return formatMessage({ id: 'dateTimeInput.sectionHours', messages });
  }
  if (section === SECTION_MINUTE) {
    return formatMessage({ id: 'dateTimeInput.sectionMinutes', messages });
  }
  if (section === SECTION_SECOND) {
    return formatMessage({ id: 'dateTimeInput.sectionSeconds', messages });
  }
  return formatMessage({ id: 'dateTimeInput.sectionMeridiem', messages });
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

const normalizeStep = (step) => {
  const parsed = Number(step);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.floor(parsed));
};

const formatSectionText = (section, value) => {
  if (value === undefined || value === '') return tokenForSection(section);
  if (section === SECTION_YEAR) return pad4(value);
  if (section === SECTION_PERIOD) return value;
  return pad2(value);
};

const DateTimeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      format = '12',
      id,
      inline = false,
      messages,
      minuteStep = 1,
      name,
      onChange,
      readOnly = false,
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

    const inputRef = useForwardedRef(refArg);
    const containerRef = useRef();
    const triggerRef = useRef();
    const dropContentRef = useRef();
    const segmentRefs = useRef({});
    const activeSectionRef = useRef(SECTION_DAY);
    const suppressSegmentFocusRef = useRef(false);
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
      () => toLocalSections(value, format),
      [value, format],
    );
    const sectionOrder = useMemo(() => getSectionOrder(format), [format]);
    const firstSection = sectionOrder[0] || SECTION_DAY;
    const lastSection = sectionOrder[sectionOrder.length - 1] || SECTION_SECOND;

    const [sections, setSections] = useState(
      parsedValue || defaultSections(format),
    );
    const [pendingDigits, setPendingDigits] = useState({});
    const [activeSection, setActiveSection] = useState(firstSection);
    const [segmentFocused, setSegmentFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [iconFocused, setIconFocused] = useState(false);
    const [activeTimeSection, setActiveTimeSection] =
      useState(TIME_SECTION_HOUR);
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

      setSections(parsedValue || defaultSections(format));
    }, [parsedValue, format]);

    const commitSections = useCallback(
      (nextSections) => {
        setSections(nextSections);
        const complete = sectionOrder.every(
          (section) => nextSections[sectionKey(section)] !== undefined,
        );
        const anyValue = hasAnyValue(nextSections);
        const nextValue = complete
          ? toUtcISOString(nextSections, format)
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
      [format, onChange, sectionOrder, setValue],
    );

    const setSectionValue = useCallback(
      (section, rawValue) => {
        const key = sectionKey(section);
        const nextSections = { ...sections, [key]: rawValue };

        if (section === SECTION_MONTH || section === SECTION_YEAR) {
          const dayLimit = getSectionLimits(
            SECTION_DAY,
            format,
            nextSections,
          ).max;
          if (nextSections.day !== undefined && nextSections.day > dayLimit) {
            nextSections.day = dayLimit;
          }
        }

        commitSections(nextSections);
      },
      [commitSections, format, sections],
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

        const { min, max } = getSectionLimits(section, format, sections);
        const key = sectionKey(section);
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
      [format, normalizedMinuteStep, sections, setSectionValue],
    );

    const applyDigit = useCallback(
      (digit) => {
        if (activeSection === SECTION_PERIOD) return activeSection;
        const key = sectionKey(activeSection);
        const needed = digitsPerSection(activeSection);
        const sameSection = editStateRef.current.section === activeSection;
        const currentBuffer = sameSection ? editStateRef.current.buffer : '';
        const nextBuffer = `${currentBuffer}${digit}`;

        editStateRef.current = {
          section: activeSection,
          buffer: nextBuffer,
        };

        if (nextBuffer.length < needed) {
          setPendingDigits({ [key]: nextBuffer });
          return activeSection;
        }

        const numeric = Number(nextBuffer);
        const { min, max } = getSectionLimits(activeSection, format, sections);
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
        format,
        formatMessage,
        messages,
        moveSection,
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
        const key = sectionKey(section);
        const pending = pendingDigits[key];
        if (pending !== undefined) {
          if (section === SECTION_YEAR) return pending.padEnd(4, 'y');
          if (section === SECTION_PERIOD) return pending;
          return pending.padEnd(2, tokenForSection(section)[1]);
        }
        return formatSectionText(section, sections[key]);
      },
      [pendingDigits, sections],
    );

    const displaySections = useMemo(
      () =>
        sectionOrder.map((section, index) => {
          const key = sectionKey(section);
          return {
            section,
            prefix: index === 0 ? '' : separatorBeforeSection(section),
            text: getDisplayText(section),
            filled:
              sections[key] !== undefined || pendingDigits[key] !== undefined,
          };
        }),
      [getDisplayText, pendingDigits, sectionOrder, sections],
    );

    const placeholder = useMemo(
      () =>
        sectionOrder
          .map((section, index) => {
            const token = tokenForSection(section);
            if (index === 0) return token;
            return `${separatorBeforeSection(section)}${token}`;
          })
          .join(''),
      [sectionOrder],
    );

    const hasDisplayValue =
      hasAnyValue(sections) || Object.keys(pendingDigits).length > 0;
    const inputValue = hasDisplayValue
      ? displaySections.map(({ prefix, text }) => `${prefix}${text}`).join('')
      : placeholder;

    const sectionValueAnnouncement = useCallback(
      (section) => {
        const nameText = getSectionName(section, formatMessage, messages);
        const key = sectionKey(section);
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
          values: { value: raw, section: nameText },
        });
      },
      [formatMessage, messages, sections],
    );

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      if (!segmentFocused) {
        activeSectionRef.current = SECTION_DAY;
        setActiveSection(SECTION_DAY);
      }
      setActiveTimeSection(TIME_SECTION_HOUR);
      setOpen(true);
      announce(formatMessage({ id: 'dateTimeInput.openDrop', messages }));
    }, [announce, disabled, formatMessage, messages, readOnly, segmentFocused]);

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
        setSegmentFocused(true);
        setActiveSection(section);
        focusSection(section);
      },
      [disabled, focusSection, readOnly],
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
        setSegmentFocused(true);
        setActiveSection(firstSection);
        focusSection(firstSection);
      },
      [firstSection, focusSection, onDisplaySectionMouseDown, readOnly],
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
        if (!isSegmentActive) setSegmentFocused(false);
      });
    }, []);

    const onSegmentKeyDown = useCallback(
      (section, event) => {
        if (readOnly || disabled) return;
        if (!segmentFocused) setSegmentFocused(true);
        const { key } = event;

        if (activeSection !== section) setActiveSection(section);

        if (key === 'ArrowRight') {
          event.preventDefault();
          const next = moveSection(1);
          focusSection(next);
          return;
        }
        if (key === 'ArrowLeft') {
          event.preventDefault();
          const next = moveSection(-1);
          focusSection(next);
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
          if (next !== section) focusSection(next);
        }
      },
      [
        activeSection,
        applyDigit,
        clearActiveSection,
        closePicker,
        disabled,
        firstSection,
        focusSection,
        format,
        incrementSection,
        lastSection,
        moveSection,
        open,
        openPicker,
        readOnly,
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
        activeSectionRef.current = SECTION_DAY;
        setActiveSection(SECTION_DAY);
        const nextSections = {
          ...sections,
          day: parsed.day,
          month: parsed.month,
          year: parsed.year,
        };
        commitSections(nextSections);
      },
      [commitSections, sections],
    );

    const handleTimeSelect = useCallback(
      ({ value: nextTime }) => {
        if (!nextTime) {
          commitSections({
            ...sections,
            hour: undefined,
            minute: undefined,
            second: undefined,
            period: format === '12' ? undefined : sections.period,
          });
          return;
        }

        const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(nextTime);
        if (!match) return;
        const hour24 = Number(match[1]);
        const minute = Number(match[2]);
        const second = Number(match[3]);

        let nextHour;
        let nextPeriod;
        if (format === '12') {
          nextPeriod = hour24 < 12 ? 'AM' : 'PM';
          nextHour = hour24 % 12 || 12;
        } else {
          nextHour = hour24;
          nextPeriod = undefined;
        }

        commitSections({
          ...sections,
          hour: nextHour,
          minute,
          second,
          period: nextPeriod,
        });
      },
      [commitSections, format, sections],
    );

    const timeSectionOrder = useMemo(() => {
      if (format === '12') {
        return [
          TIME_SECTION_HOUR,
          TIME_SECTION_MINUTE,
          TIME_SECTION_SECOND,
          TIME_SECTION_PERIOD,
        ];
      }

      return [TIME_SECTION_HOUR, TIME_SECTION_MINUTE, TIME_SECTION_SECOND];
    }, [format]);

    const hoursOptions = useMemo(
      () =>
        Array.from({ length: format === '12' ? 12 : 24 }, (_, index) =>
          format === '12' ? index + 1 : index,
        ),
      [format],
    );

    const minuteOptions = useMemo(
      () =>
        Array.from(
          { length: Math.ceil(60 / normalizedMinuteStep) },
          (_, index) => index * normalizedMinuteStep,
        ).filter((valueAtIndex) => valueAtIndex < 60),
      [normalizedMinuteStep],
    );

    const secondOptions = useMemo(
      () => Array.from({ length: 60 }, (_, index) => index),
      [],
    );

    const timeSections = useMemo(
      () => ({
        hour: sections.hour,
        minute: sections.minute,
        second: sections.second,
        period: sections.period,
      }),
      [sections.hour, sections.minute, sections.period, sections.second],
    );

    const toDateTimeSection = useCallback((timeSection) => {
      if (timeSection === TIME_SECTION_HOUR) return SECTION_HOUR;
      if (timeSection === TIME_SECTION_MINUTE) return SECTION_MINUTE;
      if (timeSection === TIME_SECTION_SECOND) return SECTION_SECOND;
      return SECTION_PERIOD;
    }, []);

    const setActiveTimeSectionAndField = useCallback(
      (timeSection) => {
        const nextFieldSection = toDateTimeSection(timeSection);
        activeSectionRef.current = nextFieldSection;
        setActiveTimeSection(timeSection);
        setActiveSection(nextFieldSection);
      },
      [toDateTimeSection],
    );

    const moveTimeSection = useCallback(
      (direction) => {
        const index = Math.max(0, timeSectionOrder.indexOf(activeTimeSection));
        const count = timeSectionOrder.length;
        const nextIndex = (index + direction + count) % count;
        const nextSection = timeSectionOrder[nextIndex];
        setActiveTimeSectionAndField(nextSection);
        return nextSection;
      },
      [activeTimeSection, setActiveTimeSectionAndField, timeSectionOrder],
    );

    const setTimeSectionValue = useCallback(
      (timeSection, nextValue) => {
        setSectionValue(toDateTimeSection(timeSection), nextValue);
      },
      [setSectionValue, toDateTimeSection],
    );

    const incrementTimeSection = useCallback(
      (timeSection, delta) => {
        incrementSection(toDateTimeSection(timeSection), delta);
      },
      [incrementSection, toDateTimeSection],
    );

    const timeValue = useMemo(() => {
      if (
        sections.hour === undefined ||
        sections.minute === undefined ||
        sections.second === undefined
      ) {
        return undefined;
      }

      if (format === '12') {
        let hour24 = sections.hour % 12;
        if ((sections.period || 'AM') === 'PM') hour24 += 12;
        return `${pad2(hour24)}:${pad2(sections.minute)}:${pad2(
          sections.second,
        )}`;
      }

      return `${pad2(sections.hour)}:${pad2(sections.minute)}:${pad2(
        sections.second,
      )}`;
    }, [format, sections]);

    const showActiveSection =
      (segmentFocused || open) && !readOnly && !disabled;
    const { inForm } = formContext.useFormField({});
    const formFieldLabelId = inForm && id ? `grommet-${id}__label` : undefined;
    const groupLabel = formFieldLabelId
      ? undefined
      : formatMessage({ id: 'dateTimeInput.inputLabel', messages });
    const iconSize =
      (theme.icon?.matchSize && rest.size) || theme.dateTimeInput?.icon?.size;
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
                icon={<CalendarIcon size={iconSize} />}
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
            <StyledTimeInputContainer
              ref={containerRef}
              direction="row"
              border
              fill
              round={theme.dateTimeInput.container.round}
              disabled={disabled}
              readOnlyProp={readOnly}
              focusIndicator={!iconFocused}
              {...passThemeFlag}
            >
              <StyledTimeInputField {...passThemeFlag}>
                <StyledTimeInputDisplay
                  role="group"
                  aria-label={groupLabel}
                  aria-labelledby={formFieldLabelId}
                  onMouseDown={onDisplayMouseDown}
                  {...passThemeFlag}
                >
                  {displaySections.map(({ section, prefix, text, filled }) => {
                    const sectionLimits = getSectionLimits(
                      section,
                      format,
                      sections,
                    );
                    const key = sectionKey(section);
                    let numericValue;
                    if (section === SECTION_PERIOD) {
                      numericValue = sections[key] === 'PM' ? 1 : 0;
                    } else {
                      numericValue = sections[key] ?? sectionLimits.min;
                    }

                    return (
                      <React.Fragment key={section}>
                        {!!prefix && (
                          <StyledTimeInputSeparator
                            $filled={hasDisplayValue}
                            {...passThemeFlag}
                          >
                            {prefix}
                          </StyledTimeInputSeparator>
                        )}
                        <StyledTimeInputSegment
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
                        </StyledTimeInputSegment>
                      </React.Fragment>
                    );
                  })}
                </StyledTimeInputDisplay>
                <StyledTimeInput
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
              </StyledTimeInputField>
              {!readOnly && (
                <Button
                  ref={triggerRef}
                  icon={<CalendarIcon size={iconSize} />}
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
                  onFocus={() => setIconFocused(true)}
                  onBlur={() => setIconFocused(false)}
                  onClick={open ? closePicker : openPicker}
                />
              )}
            </StyledTimeInputContainer>
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
              onClickOutside={({ target }) => {
                const anchor = dropTarget;
                if (anchor && target !== anchor && !anchor.contains(target)) {
                  closePicker();
                }
              }}
            >
              <Box
                ref={dropContentRef}
                direction="row"
                pad={theme.dateTimeInput?.drop?.pad}
                gap={theme.dateTimeInput?.drop?.gap}
              >
                <Calendar
                  date={getCalendarDate(sections)}
                  initialFocus={open ? 'days' : undefined}
                  onSelect={handleCalendarSelect}
                />
                <TimeInputPopup
                  inline
                  activeSection={activeTimeSection}
                  autoFocus={segmentFocused && activeSection >= SECTION_HOUR}
                  format={format}
                  formatMessage={formatMessage}
                  hoursOptions={hoursOptions}
                  incrementSection={incrementTimeSection}
                  label={formatMessage({
                    id: 'dateTimeInput.chooseDateTime',
                    messages,
                  })}
                  messages={messages}
                  minuteOptions={minuteOptions}
                  moveSection={moveTimeSection}
                  onAccept={() => {
                    if (timeValue) {
                      handleTimeSelect({ value: timeValue });
                    }
                  }}
                  onClose={closePicker}
                  secondOptions={secondOptions}
                  sectionOrder={timeSectionOrder}
                  sections={timeSections}
                  setActiveSection={setActiveTimeSectionAndField}
                  setSectionValue={setTimeSectionValue}
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
