import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Clock as GrommetClockIcon } from 'grommet-icons/icons/Clock';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef, useKeyboard } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import {
  StyledTimeInputContainer,
  StyledTimeInputInputWrapper,
  StyledTimeInputToggleButton,
  StyledPickerList,
  StyledPickerOptionBox,
  StyledPickerDropContent,
} from './StyledTimeInput';
import { TimeInputPropTypes } from './propTypes';
import {
  formatTimeText,
  getDefaultTimeFormat,
  isMinuteStepValid,
  isSecondStepValid,
  isWithinBounds,
  normalizeTimeText,
  parseTimeText,
} from './utils';

const defaultDropAlign = { top: 'bottom', left: 'left' };

const toCanonicalDisplayValue = (value = '') =>
  value
    .replace(/\s*:\s*/g, ':')
    .replace(/\s+/g, ' ')
    .trim();

const toSpacedDisplayValue = ({ value = '', timeFormat }) => {
  if (!value) return '';

  const canonical = toCanonicalDisplayValue(value);
  let spaced = canonical.replace(/:/g, ' : ');

  if (timeFormat === '12hr') {
    spaced = spaced.replace(/\s*([aApP][mM])$/, ' $1');
  }

  return spaced;
};

const getDefaultSpacedValue = ({ timeFormat, showSeconds }) => {
  if (timeFormat === '24hr') {
    return showSeconds ? 'hh : mm : ss' : 'hh : mm';
  }
  return showSeconds ? 'hh : mm : ss am' : 'hh : mm am';
};

const getTrimmedBounds = ({ value, start, end }) => {
  let trimmedStart = Math.max(start, 0);
  let trimmedEnd = Math.min(end, value.length);

  while (trimmedStart < trimmedEnd && value[trimmedStart] === ' ') {
    trimmedStart += 1;
  }

  while (trimmedEnd > trimmedStart && value[trimmedEnd - 1] === ' ') {
    trimmedEnd -= 1;
  }

  return { start: trimmedStart, end: trimmedEnd };
};

const addSegmentPadding = ({ value, start, end, left, right }) => {
  let paddedStart = start;
  let paddedEnd = end;

  if (left && paddedStart > 0 && value[paddedStart - 1] === ' ') {
    paddedStart -= 1;
  }

  if (right && paddedEnd < value.length && value[paddedEnd] === ' ') {
    paddedEnd += 1;
  }

  return { start: paddedStart, end: paddedEnd };
};

const getTrailingTokenBounds = (value) => {
  let end = value.length;
  while (end > 0 && value[end - 1] === ' ') end -= 1;

  let start = end;
  while (start > 0 && value[start - 1] !== ' ') start -= 1;

  return { start, end };
};

const getSegmentRanges = ({ value, timeFormat, showSeconds }) => {
  const spacedValue =
    toSpacedDisplayValue({ value, timeFormat }) ||
    getDefaultSpacedValue({ timeFormat, showSeconds });

  const firstColon = spacedValue.indexOf(':');
  const secondColon = showSeconds
    ? spacedValue.indexOf(':', firstColon + 1)
    : -1;

  if (firstColon === -1 || (showSeconds && secondColon === -1)) {
    return {
      hour: { start: 0, end: 3 },
      minute: { start: 4, end: 8 },
      second: { start: 9, end: 13 },
      period: {
        start: showSeconds ? 13 : 8,
        end: showSeconds ? 15 : 10,
      },
    };
  }

  let periodCore;
  if (timeFormat === '12hr') {
    periodCore = getTrailingTokenBounds(spacedValue);
  }

  const hourCore = getTrimmedBounds({
    value: spacedValue,
    start: 0,
    end: firstColon,
  });

  const minuteCore = getTrimmedBounds({
    value: spacedValue,
    start: firstColon + 1,
    end:
      secondColon !== -1
        ? secondColon
        : periodCore?.start ?? spacedValue.length,
  });

  let secondCore;
  if (showSeconds) {
    secondCore = getTrimmedBounds({
      value: spacedValue,
      start: secondColon + 1,
      end: periodCore?.start ?? spacedValue.length,
    });
  }

  return {
    hour: addSegmentPadding({
      value: spacedValue,
      start: hourCore.start,
      end: hourCore.end,
      left: false,
      right: true,
    }),
    minute: addSegmentPadding({
      value: spacedValue,
      start: minuteCore.start,
      end: minuteCore.end,
      left: true,
      right: true,
    }),
    second: secondCore
      ? addSegmentPadding({
          value: spacedValue,
          start: secondCore.start,
          end: secondCore.end,
          left: true,
          right: true,
        })
      : undefined,
    period: periodCore
      ? addSegmentPadding({
          value: spacedValue,
          start: periodCore.start,
          end: periodCore.end,
          left: true,
          right: false,
        })
      : undefined,
  };
};

const toTimeInputString = ({ value, timeFormat, showSeconds }) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return formatTimeText({
      dateTime: {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds(),
      },
      timeFormat,
      showSeconds,
    });
  }

  if (typeof value === 'string') return value;
  return '';
};

const formatTypedTimeInput = ({ value, timeFormat, showSeconds }) => {
  const rawValue = value || '';
  const normalized = rawValue.toLowerCase();
  const maxDigitLength = showSeconds ? 6 : 4;
  const digits = normalized.replace(/\D/g, '').slice(0, maxDigitLength);

  const periodChars =
    timeFormat === '12hr' ? normalized.replace(/[^apm]/g, '') : '';
  let period;
  if (periodChars.includes('p')) period = 'pm';
  else if (periodChars.includes('a')) period = 'am';

  const timeCharsOnly = normalized.replace(/[^0-9:]/g, '');
  if (timeCharsOnly.includes(':')) {
    const maxSegments = showSeconds ? 3 : 2;
    const rawParts = timeCharsOnly.split(':').slice(0, maxSegments);

    let normalizedParts = rawParts;
    if (showSeconds && rawParts.length === 2) {
      const secondSegmentDigits = rawParts[1].replace(/\D/g, '');
      if (secondSegmentDigits.length > 2) {
        normalizedParts = [
          rawParts[0],
          secondSegmentDigits.slice(0, 2),
          secondSegmentDigits.slice(2, 4),
        ];
      }
    }

    const parts = normalizedParts.map((part) =>
      part.replace(/\D/g, '').slice(0, 2),
    );

    let formattedWithSeparators = parts[0] || '';
    if (parts.length > 1) {
      formattedWithSeparators = `${formattedWithSeparators}:${parts[1] || ''}`;
    }
    if (showSeconds && parts.length > 2) {
      formattedWithSeparators = `${formattedWithSeparators}:${parts[2] || ''}`;
    }

    if (timeFormat === '12hr' && period) {
      return `${formattedWithSeparators} ${period}`.trim();
    }

    return formattedWithSeparators;
  }

  let formatted = '';
  const resolvedTwoDigitHour = Number(digits.slice(0, 2));
  const isTwoDigitHourValid =
    timeFormat === '24hr'
      ? resolvedTwoDigitHour >= 0 && resolvedTwoDigitHour <= 23
      : resolvedTwoDigitHour >= 1 && resolvedTwoDigitHour <= 12;

  if (digits.length <= 1) {
    formatted = digits;
  } else if (digits.length <= 2) {
    formatted = isTwoDigitHourValid ? `${digits}:` : digits;
  } else if (!showSeconds && digits.length === 3) {
    formatted = isTwoDigitHourValid
      ? `${digits.slice(0, 2)}:${digits.slice(2, 3)}`
      : `${digits.slice(0, 1)}:${digits.slice(1, 3)}`;
  } else if (!showSeconds && digits.length === 4) {
    formatted = isTwoDigitHourValid
      ? `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
      : `${digits.slice(0, 1)}:${digits.slice(1, 3)}`;
  } else if (showSeconds && digits.length === 3) {
    formatted = `${digits.slice(0, 1)}:${digits.slice(1, 3)}:`;
  } else if (showSeconds && digits.length === 4) {
    formatted = `${digits.slice(0, 2)}:${digits.slice(2, 4)}:`;
  } else if (showSeconds && digits.length === 5) {
    formatted = `${digits.slice(0, 1)}:${digits.slice(1, 3)}:${digits.slice(
      3,
      5,
    )}`;
  } else {
    formatted = `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(
      4,
      6,
    )}`;
  }

  if (timeFormat === '12hr') {
    if (digits.length >= maxDigitLength && period) {
      formatted = `${formatted} ${period}`;
    }
  }

  return formatted;
};

const getSegmentSelectionRange = ({
  segment,
  value,
  timeFormat,
  showSeconds,
}) => {
  const ranges = getSegmentRanges({ value, timeFormat, showSeconds });
  return ranges[segment] || ranges.hour;
};

const getSegmentFromCursorPosition = ({
  cursor,
  value,
  timeFormat,
  showSeconds,
}) => {
  const ranges = getSegmentRanges({ value, timeFormat, showSeconds });

  if (cursor <= ranges.hour.end) return 'hour';
  if (cursor <= ranges.minute.end) return 'minute';
  if (showSeconds && ranges.second && cursor <= ranges.second.end) {
    return 'second';
  }
  if (timeFormat === '12hr') return 'period';
  return showSeconds ? 'second' : 'minute';
};

const getSegmentDetectionCursor = ({
  selectionStart,
  selectionEnd,
  fallbackCursor,
}) => {
  if (
    typeof selectionStart === 'number' &&
    typeof selectionEnd === 'number' &&
    selectionEnd > selectionStart
  ) {
    return Math.max(selectionStart, selectionEnd - 1);
  }

  if (typeof selectionStart === 'number') return selectionStart;
  return fallbackCursor;
};

const getFormattedCursorPosition = ({
  rawValue,
  formattedValue,
  rawCursor,
}) => {
  if (rawValue === formattedValue) return rawCursor;

  const rawBeforeCursor = (rawValue || '').slice(0, rawCursor);
  const digitsBeforeCursor = rawBeforeCursor.replace(/\D/g, '').length;

  if (!digitsBeforeCursor) return rawCursor;

  let seenDigits = 0;
  for (let index = 0; index < (formattedValue || '').length; index += 1) {
    if (/\d/.test(formattedValue[index])) {
      seenDigits += 1;
      if (seenDigits >= digitsBeforeCursor) return index + 1;
    }
  }

  return (formattedValue || '').length;
};

const parseToPickerParts = ({ value, timeFormat, showSeconds }) => {
  const parsed = parseTimeText({ value, timeFormat, showSeconds });
  if (!parsed) {
    // Full parse failed. Try to salvage hours and minutes from a partial
    // typed value (e.g. "09:30" in 12hr mode before the period is typed)
    // so the picker doesn't reset to defaults when the user selects am/pm.
    const partialMatch = /^(\d{1,2})(?::(\d{0,2}))?/.exec((value || '').trim());

    if (timeFormat === '24hr') {
      const hour = partialMatch
        ? Math.min(Number(partialMatch[1] || 0), 23)
        : 0;
      const minute =
        partialMatch?.[2] !== undefined
          ? Math.min(Number(partialMatch[2] || 0), 59)
          : 0;
      return {
        hour: `${hour}`.padStart(2, '0'),
        minute: `${minute}`.padStart(2, '0'),
        second: '00',
      };
    }

    const hour = partialMatch
      ? Math.min(Math.max(Number(partialMatch[1] || 12), 1), 12)
      : 12;
    const minute =
      partialMatch?.[2] !== undefined
        ? Math.min(Number(partialMatch[2] || 0), 59)
        : 0;
    return {
      hour: `${hour}`.padStart(2, '0'),
      minute: `${minute}`.padStart(2, '0'),
      second: '00',
      period: 'am',
    };
  }

  if (timeFormat === '24hr') {
    return {
      hour: `${parsed.hour}`.padStart(2, '0'),
      minute: `${parsed.minute}`.padStart(2, '0'),
      second: `${parsed.second || 0}`.padStart(2, '0'),
    };
  }

  const period = parsed.hour >= 12 ? 'pm' : 'am';
  const hour12 = parsed.hour % 12 || 12;
  return {
    hour: `${hour12}`.padStart(2, '0'),
    minute: `${parsed.minute}`.padStart(2, '0'),
    second: `${parsed.second || 0}`.padStart(2, '0'),
    period,
  };
};

const pickerPartsToParsedTime = ({ parts, timeFormat, showSeconds }) => {
  const minute = Number(parts.minute);
  const second = showSeconds ? Number(parts.second || '00') : 0;

  if (timeFormat === '24hr') {
    return { hour: Number(parts.hour), minute, second };
  }

  const hour12 = Number(parts.hour);
  const period = parts.period || 'am';
  const hour = period === 'pm' ? (hour12 % 12) + 12 : hour12 % 12;
  return { hour, minute, second };
};

const buildMinuteOrSecondOptions = (step) => {
  const isValidStep = Number.isInteger(step) && step > 0 && step <= 30;
  const increment = isValidStep ? step : 1;
  const options = [];
  for (let value = 0; value < 60; value += increment) {
    options.push(`${value}`.padStart(2, '0'));
  }
  return options;
};

const PickerColumn = ({
  title,
  segment,
  options,
  selected,
  onSelect,
  onActivate,
  onOptionKeyDown,
  setOptionRef,
  testId,
  optionWidth,
  optionPad,
  listGap,
  maxHeight = '232px',
}) => (
  <Box width={optionWidth} data-testid={testId}>
    <StyledPickerList
      overflow="auto"
      height={maxHeight}
      pad="none"
      gap={listGap}
      role="listbox"
      aria-label={title}
    >
      {options.map((option) => {
        const isSelectedOption = selected === option;

        return (
          <Button
            key={option}
            ref={(node) => setOptionRef?.(segment, option, node)}
            kind="option"
            selected={isSelectedOption}
            focusIndicator="inset"
            tabIndex={isSelectedOption ? 0 : -1}
            role="option"
            aria-selected={isSelectedOption}
            onFocus={() => {
              onActivate(segment);
            }}
            onKeyDown={(event) => {
              onOptionKeyDown?.(event, { segment, option });
            }}
            onClick={() => {
              onActivate(segment);
              onSelect(option);
            }}
          >
            <StyledPickerOptionBox optionWidth={optionWidth} pad={optionPad}>
              <Text size="medium" textAlign="center">
                {option}
              </Text>
            </StyledPickerOptionBox>
          </Button>
        );
      })}
    </StyledPickerList>
  </Box>
);

const TimeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      id,
      messages,
      max,
      min,
      minuteStep,
      name,
      onBlur,
      onChange,
      onFocus,
      openOnFocus = false,
      plain,
      placeholder,
      readOnly,
      secondStep,
      showSeconds = false,
      step,
      timeFormat,
      value: valueArg,
      ...rest
    },
    refArg,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const announce = useContext(AnnounceContext);
    const { format: formatMessage } = useContext(MessageContext);
    const { useFormInput } = useContext(FormContext);
    const usingKeyboard = useKeyboard();
    const ref = useForwardedRef(refArg);
    const containerRef = useRef();
    const pendingSelectionRef = useRef();
    const inputPointerDownRef = useRef(false);
    const pendingFocusSelectionFrameRef = useRef();
    const pendingPickerFocusFrameRef = useRef();
    const pickerOptionRefs = useRef({});
    // Tracks whether focus entered the drop so we only restore focus
    // when the drop actually owned it, not when the user clicked elsewhere.
    const dropFocusedRef = useRef(false);
    // Tracks whether the user is pressing the toggle button so the input's
    // onBlur knows not to revert a partial draft (e.g. typed 09:30 then
    // clicked the clock icon to select am/pm).
    const togglePressingRef = useRef(false);
    const iconSize =
      (theme.icon?.matchSize && rest.size) || theme.timeInput?.icon?.size;
    const ClockIcon = theme.timeInput?.icon?.clock || GrommetClockIcon;

    const resolvedTimeFormat = useMemo(
      () => timeFormat || getDefaultTimeFormat(),
      [timeFormat],
    );

    const resolvedMinuteStep = minuteStep ?? step;

    const resolvedValueArg = useMemo(
      () =>
        valueArg === undefined
          ? undefined
          : toTimeInputString({
              value: valueArg,
              timeFormat: resolvedTimeFormat,
              showSeconds,
            }),
      [resolvedTimeFormat, showSeconds, valueArg],
    );

    const resolvedDefaultValue = useMemo(
      () =>
        toTimeInputString({
          value: defaultValue,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        }),
      [defaultValue, resolvedTimeFormat, showSeconds],
    );

    const getMessage = useCallback(
      (key, values) =>
        formatMessage({ id: `timeInput.${key}`, messages, values }),
      [formatMessage, messages],
    );

    const validateForForm = useCallback(
      (fieldValue) => {
        const normalizedFieldValue = toTimeInputString({
          value: fieldValue,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });
        if (!normalizedFieldValue) return undefined;
        if (
          !isWithinBounds({
            value: normalizedFieldValue,
            min,
            max,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          })
        ) {
          return getMessage('outOfBounds', {
            start: min || '',
            end: max || '',
          });
        }

        return undefined;
      },
      [getMessage, max, min, resolvedTimeFormat, showSeconds],
    );

    const [committedValue, setCommittedValue] = useFormInput({
      name,
      value: resolvedValueArg,
      initialValue: resolvedDefaultValue,
      validate: validateForForm,
    });

    const [hasDraft, setHasDraft] = useState(false);
    const [draftError, setDraftError] = useState();
    const [open, setOpen] = useState(false);
    const [activeSegment, setActiveSegment] = useState('hour');

    const [pickerParts, setPickerParts] = useState(
      parseToPickerParts({
        value: committedValue || resolvedDefaultValue || '',
        timeFormat: resolvedTimeFormat,
        showSeconds,
      }),
    );

    const [textValue, setTextValue] = useState(
      toSpacedDisplayValue({
        value:
          normalizeTimeText({
            value: committedValue,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }) ||
          committedValue ||
          '',
        timeFormat: resolvedTimeFormat,
      }),
    );

    const formContextValue = useMemo(
      () => ({
        useFormInput: ({ value: valueProp }) => [valueProp, () => {}],
      }),
      [],
    );

    useEffect(() => {
      if (!hasDraft) {
        const normalized =
          normalizeTimeText({
            value: committedValue,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }) ||
          committedValue ||
          '';
        setTextValue(
          toSpacedDisplayValue({
            value: normalized,
            timeFormat: resolvedTimeFormat,
          }),
        );
        setPickerParts(
          parseToPickerParts({
            value: normalized,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }),
        );
      }
    }, [committedValue, hasDraft, resolvedTimeFormat, showSeconds]);

    const hourOptions = useMemo(() => {
      if (resolvedTimeFormat === '24hr') {
        return Array.from({ length: 24 }, (_, index) =>
          `${index}`.padStart(2, '0'),
        );
      }
      return [
        '12',
        ...Array.from({ length: 11 }, (_, index) =>
          `${index + 1}`.padStart(2, '0'),
        ),
      ];
    }, [resolvedTimeFormat]);

    const minuteOptions = useMemo(
      () => buildMinuteOrSecondOptions(resolvedMinuteStep),
      [resolvedMinuteStep],
    );

    const secondOptions = useMemo(
      () => buildMinuteOrSecondOptions(secondStep),
      [secondStep],
    );

    const emitChange = useCallback(
      (nextValue) => {
        setCommittedValue(nextValue);
        if (onChange) onChange({ value: nextValue });
      },
      [onChange, setCommittedValue],
    );

    const validateParsedTime = useCallback(
      (parsed, { surfaceErrors = true } = {}) => {
        if (
          !isMinuteStepValid(parsed, resolvedMinuteStep) ||
          !isSecondStepValid(parsed, secondStep)
        ) {
          if (surfaceErrors) setDraftError('invalidTime');
          return undefined;
        }

        const normalizedValue = formatTimeText({
          dateTime: parsed,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });

        if (
          !isWithinBounds({
            value: normalizedValue,
            min,
            max,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          })
        ) {
          if (surfaceErrors) setDraftError('outOfBounds');
          return undefined;
        }

        return normalizedValue;
      },
      [
        max,
        min,
        resolvedMinuteStep,
        resolvedTimeFormat,
        secondStep,
        showSeconds,
      ],
    );

    const commitFromText = useCallback(
      (nextTextValue, { surfaceErrors = true } = {}) => {
        const parsed = parseTimeText({
          value: nextTextValue,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });

        if (!parsed) {
          if (surfaceErrors) setDraftError('invalidTime');
          return false;
        }

        const normalizedValue = validateParsedTime(parsed, { surfaceErrors });
        if (!normalizedValue) {
          return false;
        }

        setDraftError(undefined);
        setHasDraft(false);
        emitChange(normalizedValue);
        setTextValue(
          toSpacedDisplayValue({
            value: normalizedValue,
            timeFormat: resolvedTimeFormat,
          }),
        );
        setPickerParts(
          parseToPickerParts({
            value: normalizedValue,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }),
        );
        return true;
      },
      [emitChange, resolvedTimeFormat, showSeconds, validateParsedTime],
    );

    const commitFromPicker = useCallback(
      (nextParts) => {
        const parsed = pickerPartsToParsedTime({
          parts: nextParts,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });
        const normalizedValue = validateParsedTime(parsed, {
          surfaceErrors: false,
        });
        if (!normalizedValue) return;

        setDraftError(undefined);
        setHasDraft(false);
        emitChange(normalizedValue);
        setTextValue(
          toSpacedDisplayValue({
            value: normalizedValue,
            timeFormat: resolvedTimeFormat,
          }),
        );
        setPickerParts(
          parseToPickerParts({
            value: normalizedValue,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }),
        );
      },
      [emitChange, resolvedTimeFormat, showSeconds, validateParsedTime],
    );

    const applyPickerParts = useCallback(
      (nextParts, { segment } = {}) => {
        if (segment) setActiveSegment(segment);
        setPickerParts(nextParts);
        commitFromPicker(nextParts);
      },
      [commitFromPicker],
    );

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      const seedValue =
        toCanonicalDisplayValue(textValue) || committedValue || '';
      setPickerParts(
        parseToPickerParts({
          value: seedValue,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        }),
      );
      setActiveSegment('hour');
      // Clear the draft flag so blur doesn't revert the typed partial value
      // while the picker is open for the user to complete the selection.
      setHasDraft(false);
      setOpen(true);
      announce?.(getMessage('openTimePicker'), 'polite');
    }, [
      announce,
      committedValue,
      disabled,
      getMessage,
      readOnly,
      resolvedTimeFormat,
      showSeconds,
      textValue,
    ]);

    const closePicker = useCallback(
      ({ restoreFocus = true } = {}) => {
        setOpen(false);
        announce?.(getMessage('closeTimePicker'), 'polite');
        // Only restore focus to the trigger when explicitly requested and
        // focus actually entered the drop. Outside clicks should preserve
        // the user's target focus.
        if (restoreFocus && dropFocusedRef.current) {
          requestAnimationFrame(() => ref?.current?.focus());
        }
        dropFocusedRef.current = false;
      },
      [announce, getMessage, ref],
    );

    const queueInputSelection = useCallback(
      (start, end = start) => {
        pendingSelectionRef.current = { start, end };
        if (ref?.current?.setSelectionRange) {
          ref.current.setSelectionRange(start, end);
        }
      },
      [ref],
    );

    useEffect(
      () => () => {
        if (pendingFocusSelectionFrameRef.current) {
          window.cancelAnimationFrame(pendingFocusSelectionFrameRef.current);
          pendingFocusSelectionFrameRef.current = undefined;
        }
        if (pendingPickerFocusFrameRef.current) {
          window.cancelAnimationFrame(pendingPickerFocusFrameRef.current);
          pendingPickerFocusFrameRef.current = undefined;
        }
      },
      [],
    );

    const setPickerOptionRef = useCallback((segment, option, node) => {
      if (!pickerOptionRefs.current[segment]) {
        pickerOptionRefs.current[segment] = {};
      }

      if (node) pickerOptionRefs.current[segment][option] = node;
      else delete pickerOptionRefs.current[segment][option];
    }, []);

    const focusPickerOption = useCallback((segment, option) => {
      if (pendingPickerFocusFrameRef.current) {
        window.cancelAnimationFrame(pendingPickerFocusFrameRef.current);
      }

      pendingPickerFocusFrameRef.current = window.requestAnimationFrame(() => {
        pendingPickerFocusFrameRef.current = undefined;
        pickerOptionRefs.current[segment]?.[option]?.focus();
      });
    }, []);

    useEffect(() => {
      const selection = pendingSelectionRef.current;
      if (!selection || !ref?.current?.setSelectionRange) return;
      ref.current.setSelectionRange(selection.start, selection.end);
      pendingSelectionRef.current = undefined;
    }, [ref, textValue]);

    const segmentOrder = useMemo(() => {
      const segments = ['hour', 'minute'];
      if (showSeconds) segments.push('second');
      if (resolvedTimeFormat === '12hr') segments.push('period');
      return segments;
    }, [resolvedTimeFormat, showSeconds]);

    const segmentOptions = useMemo(
      () => ({
        hour: hourOptions,
        minute: minuteOptions,
        second: secondOptions,
        period: ['am', 'pm'],
      }),
      [hourOptions, minuteOptions, secondOptions],
    );

    const getAdjacentSegment = useCallback(
      (direction, fromSegment = activeSegment) => {
        const currentIndex = segmentOrder.indexOf(fromSegment);
        if (currentIndex === -1) return segmentOrder[0];
        const wrappedIndex =
          (currentIndex + direction + segmentOrder.length) %
          segmentOrder.length;
        return segmentOrder[wrappedIndex];
      },
      [activeSegment, segmentOrder],
    );

    const getCurrentKeyboardSegment = useCallback(
      ({ selectionStart, selectionEnd, cursor, value }) => {
        const detectedSegment = getSegmentFromCursorPosition({
          cursor,
          value,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });

        const hasSelectionPoint = typeof selectionStart === 'number';
        const hasSelectionRange =
          typeof selectionStart === 'number' &&
          typeof selectionEnd === 'number' &&
          selectionEnd > selectionStart;

        if (hasSelectionRange || hasSelectionPoint) return detectedSegment;
        if (segmentOrder.includes(activeSegment)) return activeSegment;
        return detectedSegment;
      },
      [activeSegment, resolvedTimeFormat, segmentOrder, showSeconds],
    );

    const getCurrentInputSelection = useCallback(
      (fallbackCursor = textValue.length) => ({
        selectionStart: ref?.current?.selectionStart,
        selectionEnd: ref?.current?.selectionEnd,
        cursor: getSegmentDetectionCursor({
          selectionStart: ref?.current?.selectionStart,
          selectionEnd: ref?.current?.selectionEnd,
          fallbackCursor,
        }),
      }),
      [ref, textValue.length],
    );

    const getCurrentInputSegment = useCallback(() => {
      const { selectionStart, selectionEnd, cursor } = getCurrentInputSelection(
        textValue.length,
      );

      return getCurrentKeyboardSegment({
        selectionStart,
        selectionEnd,
        cursor,
        value: ref?.current?.value || textValue,
      });
    }, [getCurrentInputSelection, getCurrentKeyboardSegment, ref, textValue]);

    const selectInputSegment = useCallback(
      (segment) => {
        setActiveSegment(segment);
        const selectionValue =
          ref?.current?.value ||
          textValue ||
          getDefaultSpacedValue({
            timeFormat: resolvedTimeFormat,
            showSeconds,
          });
        const range = getSegmentSelectionRange({
          segment,
          value: selectionValue,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });
        queueInputSelection(range.start, range.end);
      },
      [queueInputSelection, ref, resolvedTimeFormat, showSeconds, textValue],
    );

    const adjustSegmentValue = useCallback(
      ({ segment, direction }) => {
        const options = segmentOptions[segment] || [];
        if (!options.length) return;

        const displayedInputValue = ref?.current?.value || '';
        const seededValue =
          toCanonicalDisplayValue(displayedInputValue) ||
          toCanonicalDisplayValue(textValue) ||
          committedValue ||
          '';

        // Sync parts from current text so arrow keys adjust from what
        // the user actually sees, not from a stale default baseline.
        const syncedParts =
          parseToPickerParts({
            value: seededValue,
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }) || pickerParts;

        const currentValue =
          segment === 'period'
            ? syncedParts.period || 'am'
            : syncedParts[segment];
        let currentIndex = options.indexOf(currentValue);
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex =
          (currentIndex + direction + options.length) % options.length;
        const nextValue = options[nextIndex];
        const nextParts =
          segment === 'period'
            ? { ...syncedParts, period: nextValue }
            : { ...syncedParts, [segment]: nextValue };

        applyPickerParts(nextParts, { segment });
        selectInputSegment(segment);
      },
      [
        applyPickerParts,
        committedValue,
        pickerParts,
        ref,
        resolvedTimeFormat,
        selectInputSegment,
        segmentOptions,
        showSeconds,
        textValue,
      ],
    );

    const handlePickerOptionKeyDown = useCallback(
      (event, { segment, option }) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const nextSegment = getAdjacentSegment(
            event.key === 'ArrowRight' ? 1 : -1,
            segment,
          );
          const nextSegmentOptions = segmentOptions[nextSegment] || [];
          const nextOption =
            pickerParts[nextSegment] || nextSegmentOptions[0] || option;
          focusPickerOption(nextSegment, nextOption);
          return;
        }

        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

        event.preventDefault();

        const options = segmentOptions[segment] || [];
        if (!options.length) return;

        let currentIndex = options.indexOf(option);
        if (currentIndex === -1) currentIndex = options.indexOf(pickerParts[segment]);
        if (currentIndex === -1) currentIndex = 0;

        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + options.length) % options.length;
        const nextOption = options[nextIndex];
        const nextParts =
          segment === 'period'
            ? { ...pickerParts, period: nextOption }
            : { ...pickerParts, [segment]: nextOption };

        applyPickerParts(nextParts, { segment });
        focusPickerOption(segment, nextOption);
      },
      [
        applyPickerParts,
        focusPickerOption,
        getAdjacentSegment,
        pickerParts,
        segmentOptions,
      ],
    );

    let fieldError;
    if (draftError === 'outOfBounds') {
      fieldError = getMessage('outOfBounds', {
        start: min || '',
        end: max || '',
      });
    } else if (draftError) {
      fieldError = getMessage(draftError);
    }

    const {
      onClick: inputOnClick,
      onKeyDown: inputOnKeyDown,
      ...restOfInputProps
    } = rest;
    const pickerOptionWidth =
      theme.timeInput?.drop?.option?.width ||
      'var(--timeinput-drop-option-width, 46px)';
    const pickerDropHeight =
      theme.timeInput?.drop?.height ||
      'var(--timeinput-drop-height, 256px)';
    const pickerOptionPad = theme.timeInput?.drop?.option?.pad || {
      horizontal: 'small',
      vertical: 'var(--timeinput-drop-option-pad-vertical, 5px)',
    };
    const pickerListGap = theme.timeInput?.drop?.options?.gap || 'none';
    let defaultPlaceholder;
    if (resolvedTimeFormat === '24hr') {
      defaultPlaceholder = showSeconds ? 'hh : mm : ss' : 'hh : mm';
    } else {
      defaultPlaceholder = showSeconds ? 'hh : mm : ss am' : 'hh : mm am';
    }
    const resolvedPlaceholder = placeholder || defaultPlaceholder;

    const toggleButton = (
      <StyledTimeInputToggleButton
        plain={false}
        disabled={disabled}
        focusIndicator="inset"
        icon={<ClockIcon size={iconSize} />}
        onMouseDown={() => {
          togglePressingRef.current = true;
        }}
        onClick={() => {
          if (open) closePicker();
          else openPicker();
        }}
        aria-label={
          open ? getMessage('closeTimePicker') : getMessage('openTimePicker')
        }
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id ? `${id}__drop` : undefined}
      />
    );

    const input = (
      <FormContext.Provider value={formContextValue}>
        <Keyboard onEsc={open ? closePicker : undefined}>
          <StyledTimeInputContainer
            ref={containerRef}
            border={false}
            round={theme.timeInput?.container?.round || 'xsmall'}
            direction="row"
            fill
            disabled={disabled}
            readOnlyProp={readOnly}
            hasError={!!fieldError}
            {...passThemeFlag}
          >
            <StyledTimeInputInputWrapper fill>
              <TextInput
                aria-invalid={fieldError ? true : undefined}
                aria-describedby={
                  fieldError ? `${id || 'timeinput'}-error` : undefined
                }
                focusIndicator={false}
                readOnly={readOnly}
                ref={ref}
                id={id}
                name={name}
                disabled={disabled}
                plain
                placeholder={resolvedPlaceholder}
                {...restOfInputProps}
                value={textValue}
                onChange={(event) => {
                  const nextTextValue = event.target.value;
                  const rawCursorPosition =
                    event.target.selectionStart ?? nextTextValue.length;
                  const canonicalInput = toCanonicalDisplayValue(nextTextValue);
                  const formattedInput = formatTypedTimeInput({
                    value: canonicalInput,
                    timeFormat: resolvedTimeFormat,
                    showSeconds,
                  });
                  const formattedDisplayInput = toSpacedDisplayValue({
                    value: formattedInput,
                    timeFormat: resolvedTimeFormat,
                  });

                  setHasDraft(true);
                  setTextValue(formattedDisplayInput);

                  const nextCursorPosition = getFormattedCursorPosition({
                    rawValue: nextTextValue,
                    formattedValue: formattedDisplayInput,
                    rawCursor: rawCursorPosition,
                  });
                  queueInputSelection(nextCursorPosition, nextCursorPosition);

                  if (!formattedInput) {
                    setDraftError(undefined);
                    setHasDraft(false);
                    if (!nextTextValue.trim()) emitChange('');
                    return;
                  }

                  const digitCount = formattedInput.replace(/\D/g, '').length;
                  const segmentCursor = getSegmentDetectionCursor({
                    selectionStart: event.target.selectionStart,
                    selectionEnd: event.target.selectionEnd,
                    fallbackCursor: formattedDisplayInput.length,
                  });
                  const nextSegment = getSegmentFromCursorPosition({
                    cursor: segmentCursor,
                    value: formattedDisplayInput,
                    timeFormat: resolvedTimeFormat,
                    showSeconds,
                  });

                  if (digitCount >= 2) setActiveSegment(nextSegment);

                  commitFromText(formattedInput, { surfaceErrors: false });
                }}
                onBlur={(event) => {
                  if (pendingFocusSelectionFrameRef.current) {
                    window.cancelAnimationFrame(
                      pendingFocusSelectionFrameRef.current,
                    );
                    pendingFocusSelectionFrameRef.current = undefined;
                  }

                  // Do not revert when the toggle button is being pressed —
                  // user clicked the clock icon to open the picker and will
                  // complete the time via am/pm selection.
                  const draftCanRevert =
                    !togglePressingRef.current &&
                    hasDraft &&
                    !commitFromText(toCanonicalDisplayValue(textValue));
                  if (draftCanRevert) {
                    setTextValue(
                      toSpacedDisplayValue({
                        value:
                          normalizeTimeText({
                            value: committedValue,
                            timeFormat: resolvedTimeFormat,
                            showSeconds,
                          }) ||
                          committedValue ||
                          '',
                        timeFormat: resolvedTimeFormat,
                      }),
                    );
                    setHasDraft(false);
                    setDraftError(undefined);
                  }
                  togglePressingRef.current = false;
                  if (onBlur) onBlur(event);
                }}
                onFocus={(event) => {
                  if (openOnFocus) {
                    openPicker();
                    if (!readOnly && !disabled) selectInputSegment('hour');
                  } else if (
                    usingKeyboard &&
                    !inputPointerDownRef.current &&
                    !readOnly &&
                    !disabled
                  ) {
                    pendingFocusSelectionFrameRef.current =
                      window.requestAnimationFrame(() => {
                        pendingFocusSelectionFrameRef.current = undefined;
                        // If mouse interaction started before this frame runs,
                        // preserve mouse-selected segment instead of resetting.
                        if (inputPointerDownRef.current) return;
                        selectInputSegment('hour');
                      });
                  }

                  inputPointerDownRef.current = false;
                  if (onFocus) onFocus(event);
                }}
                onClick={(event) => {
                  if (readOnly || disabled) {
                    if (inputOnClick) inputOnClick(event);
                    return;
                  }

                  const cursor = getSegmentDetectionCursor({
                    selectionStart: event.target.selectionStart,
                    selectionEnd: event.target.selectionEnd,
                    fallbackCursor: textValue.length,
                  });
                  const segment = getSegmentFromCursorPosition({
                    cursor,
                    value: event.target.value,
                    timeFormat: resolvedTimeFormat,
                    showSeconds,
                  });
                  selectInputSegment(segment);

                  if (inputOnClick) inputOnClick(event);
                }}
                onMouseDown={() => {
                  if (pendingFocusSelectionFrameRef.current) {
                    window.cancelAnimationFrame(
                      pendingFocusSelectionFrameRef.current,
                    );
                    pendingFocusSelectionFrameRef.current = undefined;
                  }
                  inputPointerDownRef.current = true;
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    if (readOnly || disabled) {
                      if (inputOnKeyDown) inputOnKeyDown(event);
                      return;
                    }

                    event.preventDefault();
                    const segment = getCurrentInputSegment();
                    adjustSegmentValue({
                      segment,
                      direction: event.key === 'ArrowUp' ? 1 : -1,
                    });
                    return;
                  }

                  if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    const currentSegment = getCurrentInputSegment();
                    const nextSegment = getAdjacentSegment(-1, currentSegment);
                    selectInputSegment(nextSegment);
                    return;
                  }

                  if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    const currentSegment = getCurrentInputSegment();
                    const nextSegment = getAdjacentSegment(1, currentSegment);
                    selectInputSegment(nextSegment);
                    return;
                  }

                  if (inputOnKeyDown) inputOnKeyDown(event);
                }}
              />
            </StyledTimeInputInputWrapper>
            {!readOnly && toggleButton}
          </StyledTimeInputContainer>
        </Keyboard>
      </FormContext.Provider>
    );

    const pickerDrop =
      open && !disabled && !readOnly ? (
        <Drop
          id={id ? `${id}__drop` : undefined}
          target={containerRef.current}
          align={defaultDropAlign}
          stretch={false}
          onEsc={() => closePicker({ restoreFocus: true })}
          onClickOutside={() => closePicker({ restoreFocus: false })}
        >
          <StyledPickerDropContent
            dropHeight={pickerDropHeight}
            direction="row"
            gap={theme.timeInput?.drop?.gap || '3xsmall'}
            pad="xsmall"
            background={theme.timeInput?.drop?.background || 'background-front'}
            round={theme.timeInput?.drop?.round || 'xsmall'}
            elevation={theme.timeInput?.drop?.elevation || 'none'}
            align="start"
            onFocus={() => {
              dropFocusedRef.current = true;
            }}
          >
            <PickerColumn
              title={getMessage('hoursLabel')}
              segment="hour"
              options={hourOptions}
              selected={pickerParts.hour}
              onActivate={setActiveSegment}
              onOptionKeyDown={handlePickerOptionKeyDown}
              onSelect={(nextHour) => {
                const nextParts = { ...pickerParts, hour: nextHour };
                applyPickerParts(nextParts);
              }}
              setOptionRef={setPickerOptionRef}
              optionWidth={pickerOptionWidth}
              optionPad={pickerOptionPad}
              listGap={pickerListGap}
              testId="timeinput-picker-hours"
            />
            <PickerColumn
              title={getMessage('minutesLabel')}
              segment="minute"
              options={minuteOptions}
              selected={pickerParts.minute}
              onActivate={setActiveSegment}
              onOptionKeyDown={handlePickerOptionKeyDown}
              onSelect={(nextMinute) => {
                const nextParts = { ...pickerParts, minute: nextMinute };
                applyPickerParts(nextParts);
              }}
              setOptionRef={setPickerOptionRef}
              optionWidth={pickerOptionWidth}
              optionPad={pickerOptionPad}
              listGap={pickerListGap}
              testId="timeinput-picker-minutes"
            />
            {showSeconds && (
              <PickerColumn
                title={getMessage('secondsLabel')}
                segment="second"
                options={secondOptions}
                selected={pickerParts.second}
                onActivate={setActiveSegment}
                onOptionKeyDown={handlePickerOptionKeyDown}
                onSelect={(nextSecond) => {
                  const nextParts = { ...pickerParts, second: nextSecond };
                  applyPickerParts(nextParts);
                }}
                setOptionRef={setPickerOptionRef}
                optionWidth={pickerOptionWidth}
                optionPad={pickerOptionPad}
                listGap={pickerListGap}
                testId="timeinput-picker-seconds"
              />
            )}
            {resolvedTimeFormat === '12hr' && (
              <PickerColumn
                title={getMessage('periodLabel')}
                segment="period"
                options={['am', 'pm']}
                selected={pickerParts.period}
                onActivate={setActiveSegment}
                onOptionKeyDown={handlePickerOptionKeyDown}
                onSelect={(nextPeriod) => {
                  const nextParts = { ...pickerParts, period: nextPeriod };
                  applyPickerParts(nextParts);
                }}
                setOptionRef={setPickerOptionRef}
                optionWidth={pickerOptionWidth}
                optionPad={pickerOptionPad}
                listGap={pickerListGap}
                testId="timeinput-picker-period"
              />
            )}
          </StyledPickerDropContent>
        </Drop>
      ) : null;

    return (
      <>
        {input}
        {pickerDrop}
        {fieldError ? (
          <Text
            id={`${id || 'timeinput'}-error`}
            color="status-critical"
            size="small"
            role="alert"
          >
            {fieldError}
          </Text>
        ) : null}
      </>
    );
  },
);

TimeInput.displayName = 'TimeInput';

if (process.env.NODE_ENV !== 'production') {
  TimeInput.propTypes = TimeInputPropTypes;
}

export { TimeInput };
