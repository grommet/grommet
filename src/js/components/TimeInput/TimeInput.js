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
import { useForwardedRef } from '../../utils';
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

const getSegmentSelectionRange = ({ segment, timeFormat, showSeconds }) => {
  if (segment === 'hour') return { start: 0, end: 2 };
  if (segment === 'minute') return { start: 3, end: 5 };
  if (segment === 'second') return { start: 6, end: 8 };

  if (timeFormat === '12hr') {
    const start = showSeconds ? 9 : 6;
    return { start, end: start + 2 };
  }

  return { start: 0, end: 2 };
};

const getSegmentFromCursorPosition = ({ cursor, timeFormat, showSeconds }) => {
  if (cursor <= 2) return 'hour';
  if (cursor <= 5) return 'minute';
  if (showSeconds && cursor <= 8) return 'second';
  if (timeFormat === '12hr') return 'period';
  return showSeconds ? 'second' : 'minute';
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
            kind="option"
            selected={isSelectedOption}
            focusIndicator="inset"
            role="option"
            aria-selected={isSelectedOption}
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
      openOnFocus = true,
      plain,
      placeholder,
      readOnly,
      reverse: reverseProp = false,
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
    const ref = useForwardedRef(refArg);
    const containerRef = useRef();
    const pendingSelectionRef = useRef();
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
        toTimeInputString({
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
      normalizeTimeText({
        value: committedValue,
        timeFormat: resolvedTimeFormat,
        showSeconds,
      }) ||
        committedValue ||
        '',
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
        setTextValue(normalized);
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
        setTextValue(normalizedValue);
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
        setTextValue(normalizedValue);
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

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      const seedValue = textValue || committedValue || '';
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
        if (ref?.current?.setSelectionRange) {
          ref.current.setSelectionRange(start, end);
          pendingSelectionRef.current = undefined;
          return;
        }
        pendingSelectionRef.current = { start, end };
      },
      [ref],
    );

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
      (direction) => {
        const currentIndex = segmentOrder.indexOf(activeSegment);
        if (currentIndex === -1) return segmentOrder[0];
        const wrappedIndex =
          (currentIndex + direction + segmentOrder.length) %
          segmentOrder.length;
        return segmentOrder[wrappedIndex];
      },
      [activeSegment, segmentOrder],
    );

    const selectInputSegment = useCallback(
      (segment) => {
        setActiveSegment(segment);
        const range = getSegmentSelectionRange({
          segment,
          timeFormat: resolvedTimeFormat,
          showSeconds,
        });
        queueInputSelection(range.start, range.end);
      },
      [queueInputSelection, resolvedTimeFormat, showSeconds],
    );

    const adjustActiveSegmentValue = useCallback(
      (direction) => {
        const options = segmentOptions[activeSegment] || [];
        if (!options.length) return;

        // Sync parts from current text so arrow keys adjust from what
        // the user actually sees, not from a stale default baseline.
        const syncedParts =
          parseToPickerParts({
            value: textValue || committedValue || '',
            timeFormat: resolvedTimeFormat,
            showSeconds,
          }) || pickerParts;

        const currentValue =
          activeSegment === 'period'
            ? syncedParts.period || 'am'
            : syncedParts[activeSegment];
        let currentIndex = options.indexOf(currentValue);
        if (currentIndex === -1) currentIndex = 0;

        const nextIndex =
          (currentIndex + direction + options.length) % options.length;
        const nextValue = options[nextIndex];
        const nextParts =
          activeSegment === 'period'
            ? { ...syncedParts, period: nextValue }
            : { ...syncedParts, [activeSegment]: nextValue };

        setPickerParts(nextParts);
        commitFromPicker(nextParts);
      },
      [
        activeSegment,
        commitFromPicker,
        committedValue,
        pickerParts,
        resolvedTimeFormat,
        segmentOptions,
        showSeconds,
        textValue,
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
    const reverse = reverseProp;
    const pickerOptionWidth = theme.timeInput?.drop?.option?.width || '46px';
    const pickerDropHeight = theme.timeInput?.drop?.height || '256px';
    const pickerOptionPad = theme.timeInput?.drop?.option?.pad || {
      horizontal: 'small',
      vertical: '5px',
    };
    const pickerListGap = theme.timeInput?.drop?.options?.gap || 'none';
    let defaultPlaceholder;
    if (resolvedTimeFormat === '24hr') {
      defaultPlaceholder = showSeconds ? 'hh:mm:ss' : 'hh:mm';
    } else {
      defaultPlaceholder = showSeconds ? 'hh:mm:ss am' : 'hh:mm am';
    }
    const resolvedPlaceholder = placeholder || defaultPlaceholder;

    const toggleButton = (
      <Button
        plain
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
        margin={reverse ? { left: 'small' } : { right: 'small' }}
      />
    );

    const input = (
      <FormContext.Provider value={formContextValue}>
        <Keyboard onEsc={open ? closePicker : undefined}>
          <StyledTimeInputContainer
            ref={containerRef}
            border={!plain}
            round={theme.timeInput?.container?.round || 'xxsmall'}
            direction="row"
            fill
            disabled={disabled}
            readOnlyProp={readOnly}
            {...passThemeFlag}
          >
            {reverse && !readOnly && toggleButton}
            <Box style={{ position: 'relative' }} fill>
              <TextInput
                aria-invalid={fieldError ? true : undefined}
                aria-describedby={
                  fieldError ? `${id || 'timeinput'}-error` : undefined
                }
                focusIndicator={open ? false : 'inset'}
                readOnly={readOnly}
                ref={ref}
                id={id}
                name={name}
                disabled={disabled}
                plain
                reverse={reverse}
                placeholder={resolvedPlaceholder}
                {...restOfInputProps}
                {...rest}
                value={textValue}
                onChange={(event) => {
                  const nextTextValue = event.target.value;
                  const formattedInput = formatTypedTimeInput({
                    value: nextTextValue,
                    timeFormat: resolvedTimeFormat,
                    showSeconds,
                  });

                  setHasDraft(true);
                  setTextValue(formattedInput);

                  if (!formattedInput) {
                    setDraftError(undefined);
                    setHasDraft(false);
                    if (!nextTextValue.trim()) emitChange('');
                    return;
                  }

                  const digitCount = formattedInput.replace(/\D/g, '').length;
                  const nextSegment = getSegmentFromCursorPosition({
                    cursor:
                      event.target.selectionStart || formattedInput.length,
                    timeFormat: resolvedTimeFormat,
                    showSeconds,
                  });

                  if (digitCount >= 2) setActiveSegment(nextSegment);

                  commitFromText(formattedInput, { surfaceErrors: false });
                }}
                onBlur={(event) => {
                  // Do not revert when the toggle button is being pressed —
                  // user clicked the clock icon to open the picker and will
                  // complete the time via am/pm selection.
                  const draftCanRevert =
                    !togglePressingRef.current &&
                    hasDraft &&
                    !commitFromText(textValue);
                  if (draftCanRevert) {
                    setTextValue(
                      normalizeTimeText({
                        value: committedValue,
                        timeFormat: resolvedTimeFormat,
                        showSeconds,
                      }) ||
                        committedValue ||
                        '',
                    );
                    setHasDraft(false);
                    setDraftError(undefined);
                  }
                  togglePressingRef.current = false;
                  if (onBlur) onBlur(event);
                }}
                onFocus={(event) => {
                  if (openOnFocus) openPicker();
                  selectInputSegment('hour');
                  if (onFocus) onFocus(event);
                }}
                onClick={(event) => {
                  if (inputOnClick) inputOnClick(event);
                }}
                onKeyDown={(event) => {
                  if (open && event.key === 'ArrowDown') {
                    event.preventDefault();
                    adjustActiveSegmentValue(1);
                    return;
                  }

                  if (open && event.key === 'ArrowUp') {
                    event.preventDefault();
                    adjustActiveSegmentValue(-1);
                    return;
                  }

                  if (open && event.key === 'ArrowLeft') {
                    event.preventDefault();
                    const nextSegment = getAdjacentSegment(-1);
                    selectInputSegment(nextSegment);
                    return;
                  }

                  if (open && event.key === 'ArrowRight') {
                    event.preventDefault();
                    const nextSegment = getAdjacentSegment(1);
                    selectInputSegment(nextSegment);
                    return;
                  }

                  if (inputOnKeyDown) inputOnKeyDown(event);
                }}
              />
            </Box>
            {!reverse && !readOnly && toggleButton}
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
            gap="xxsmall"
            pad="xsmall"
            background="background-front"
            round="xsmall"
            elevation="small"
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
              onSelect={(nextHour) => {
                const nextParts = { ...pickerParts, hour: nextHour };
                setPickerParts(nextParts);
                commitFromPicker(nextParts);
              }}
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
              onSelect={(nextMinute) => {
                const nextParts = { ...pickerParts, minute: nextMinute };
                setPickerParts(nextParts);
                commitFromPicker(nextParts);
              }}
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
                onSelect={(nextSecond) => {
                  const nextParts = { ...pickerParts, second: nextSecond };
                  setPickerParts(nextParts);
                  commitFromPicker(nextParts);
                }}
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
                onSelect={(nextPeriod) => {
                  const nextParts = { ...pickerParts, period: nextPeriod };
                  setPickerParts(nextParts);
                  commitFromPicker(nextParts);
                }}
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
