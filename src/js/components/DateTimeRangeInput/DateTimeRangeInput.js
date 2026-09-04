// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Calendar as GrommetCalendarIcon } from 'grommet-icons/icons/Calendar';
import { FormDown } from 'grommet-icons/icons/FormDown';
import { FormNext } from 'grommet-icons/icons/FormNext';
import { FormPrevious } from 'grommet-icons/icons/FormPrevious';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { DateTimeInput } from '../DateTimeInput';
import { Drop } from '../Drop';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { TimeInput } from '../TimeInput';
import { Text } from '../Text';
import {
  StyledDateTimeRangeInputContainer,
  StyledDateTimeRangeInputField,
  StyledDateTimeRangeInputSeparator,
} from './StyledDateTimeRangeInput';
import { DateTimeRangeInputPropTypes } from './propTypes';

const getTimestamp = (value) => {
  if (typeof value !== 'string' || !value) return undefined;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? undefined : timestamp;
};

const isRangeInvalid = (start, end) => {
  if (!start || !end) return false;
  const startTime = getTimestamp(start);
  const endTime = getTimestamp(end);
  if (startTime === undefined || endTime === undefined) return false;
  return endTime <= startTime;
};

const isRangeNavigable = (start, end) => {
  if (!start || !end || isRangeInvalid(start, end)) return false;
  return getTimestamp(start) !== undefined && getTimestamp(end) !== undefined;
};

const isValidRange = (range) =>
  Array.isArray(range) &&
  range.length === 2 &&
  range.every((value) => getTimestamp(value) !== undefined) &&
  !isRangeInvalid(range[0], range[1]);

// merges a calendar date-only selection with the time-of-day already
// present on the reference value, or a fallback start/end-of-day time
const combineDateWithTime = (
  dateOnly,
  referenceValue,
  fallbackHour,
  fallbackMinute,
) => {
  if (!dateOnly) return undefined;
  const datePart = new Date(dateOnly);
  if (Number.isNaN(datePart.getTime())) return undefined;

  const reference = referenceValue ? new Date(referenceValue) : undefined;
  const hasReference = reference && !Number.isNaN(reference.getTime());

  return new Date(
    datePart.getFullYear(),
    datePart.getMonth(),
    datePart.getDate(),
    hasReference ? reference.getHours() : fallbackHour,
    hasReference ? reference.getMinutes() : fallbackMinute,
    hasReference ? reference.getSeconds() : 0,
  ).toISOString();
};

const getIsoTimeFromDateTime = (value) => {
  if (!value || typeof value !== 'string') return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const hour = String(parsed.getHours()).padStart(2, '0');
  const minute = String(parsed.getMinutes()).padStart(2, '0');
  const second = String(parsed.getSeconds()).padStart(2, '0');
  return `${hour}:${minute}:${second}`;
};

const applyIsoTimeToDateTime = (dateTimeValue, isoTime) => {
  const source = dateTimeValue ? new Date(dateTimeValue) : new Date();
  if (Number.isNaN(source.getTime()) || typeof isoTime !== 'string') {
    return undefined;
  }
  const match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(isoTime);
  if (!match) return undefined;
  const updated = new Date(source);
  updated.setHours(Number(match[1]), Number(match[2]), Number(match[3]), 0);
  return updated.toISOString();
};

const CLOSED = 'closed';
const PRESET = 'preset';
const SELECTING_START = 'selecting-start';
const SELECTING_END = 'selecting-end';

const initialPickerState = {
  open: false,
  phase: CLOSED,
  draftStart: undefined,
  draftEnd: undefined,
  selectedPreset: undefined,
};

const pickerReducer = (state, action) => {
  switch (action.type) {
    case 'open': {
      let nextPhase = SELECTING_START;
      if (action.preset) nextPhase = PRESET;
      return {
        ...state,
        open: true,
        phase: nextPhase,
        draftStart: action.start,
        draftEnd: action.end,
      };
    }
    case 'close':
      return {
        ...state,
        open: false,
        phase: CLOSED,
        draftStart: undefined,
        draftEnd: undefined,
      };
    case 'selectPreset':
      return {
        ...state,
        selectedPreset: { id: action.id, value: action.value },
      };
    case 'openCustom':
      return {
        ...state,
        phase: SELECTING_START,
        draftStart: undefined,
        draftEnd: undefined,
      };
    case 'activateStart':
      return state.phase === PRESET || state.phase === CLOSED
        ? state
        : { ...state, phase: SELECTING_START };
    case 'activateEnd':
      return state.draftStart && state.draftEnd
        ? { ...state, phase: SELECTING_END }
        : state;
    case 'selectStart': {
      const nextStartTime = getTimestamp(action.value);
      const currentEndTime = getTimestamp(state.draftEnd);
      const preservesEnd =
        nextStartTime !== undefined &&
        currentEndTime !== undefined &&
        nextStartTime <= currentEndTime;
      return {
        ...state,
        phase: SELECTING_START,
        draftStart: action.value,
        draftEnd: preservesEnd ? state.draftEnd : undefined,
        selectedPreset: undefined,
      };
    }
    case 'selectEnd':
      return { ...state, draftEnd: action.value };
    case 'next':
      return { ...state, phase: SELECTING_END };
    case 'setTime':
      return action.part === 'end'
        ? { ...state, draftEnd: action.value }
        : { ...state, draftStart: action.value };
    case 'clearPreset':
      return { ...state, selectedPreset: undefined };
    default:
      return state;
  }
};

const rangesMatch = (first, second) =>
  first?.[0] === second?.[0] && first?.[1] === second?.[1];

const toDateOnly = (date) =>
  `${String(date.getFullYear()).padStart(4, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const getSelectedStartDate = (nextValue, currentStart, currentEnd) => {
  if (typeof nextValue === 'string') return nextValue;
  const [nextStart, nextEnd] = nextValue?.[0] || [];
  if (!nextStart && nextEnd) return currentStart;
  if (nextStart === currentStart && !nextEnd && currentEnd) return currentEnd;
  return nextStart || nextEnd;
};

const getSelectedEndDate = (nextValue, currentStart) => {
  if (nextValue === undefined) return currentStart;
  const [, nextEnd] = nextValue?.[0] || [];
  return nextEnd;
};

const DateTimeRangeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      format,
      id,
      'aria-label': ariaLabel,
      'aria-invalid': ariaInvalid,
      locale,
      messages,
      minuteStep = 1,
      name,
      onChange,
      plain = false,
      focusIndicator = true,
      ranges,
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
    const { inForm } = formContext.useFormField({});
    const ref = useForwardedRef(refArg);
    const fieldRef = useRef();
    const triggerRef = useRef();
    const generatedId = useId();
    const dropId = `${id || generatedId}__drop`;
    const formFieldLabelId = inForm && id ? `grommet-${id}__label` : undefined;
    const [pickerState, dispatch] = useReducer(
      pickerReducer,
      initialPickerState,
    );
    const { open, phase, draftStart, draftEnd, selectedPreset } = pickerState;

    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue || [undefined, undefined],
    });

    const [start, end] = value || [];
    const selectedRange = rangesMatch(value, selectedPreset?.value)
      ? ranges?.find(({ id: rangeId }) => rangeId === selectedPreset?.id)
      : undefined;
    const editingCustomRange =
      phase === SELECTING_START || phase === SELECTING_END;
    let activeRangePart;
    if (phase === SELECTING_START) activeRangePart = 'start';
    else if (phase === SELECTING_END) activeRangePart = 'end';
    const effectiveStart = open ? draftStart : start;
    const effectiveEnd = open ? draftEnd : end;
    const invalid = isRangeInvalid(effectiveStart, effectiveEnd);
    const navigable = isRangeNavigable(start, end);
    const wasInvalidRef = useRef(false);

    useEffect(() => {
      if (invalid && !wasInvalidRef.current) {
        announce(
          formatMessage({ id: 'dateTimeRangeInput.invalidRange', messages }),
          'assertive',
        );
      }
      wasInvalidRef.current = invalid;
    }, [announce, formatMessage, invalid, messages]);

    // isolate the internal DateTimeInput fields from the outer Form so they
    // don't independently register a field under the same (or no) name
    const formContextValue = useMemo(
      () => ({
        ...formContext,
        useFormInput: ({ value: valueProp }) => [valueProp, () => {}],
        useFormField: () => ({ inForm: false }),
      }),
      [formContext],
    );

    const commit = useCallback(
      (nextStart, nextEnd) => {
        const nextValue = [nextStart, nextEnd];
        setValue(nextValue);
        onChange?.({ value: nextValue });
      },
      [onChange, setValue],
    );

    const shiftRange = useCallback(
      (direction) => {
        if (!isRangeNavigable(start, end)) return;
        const startMs = getTimestamp(start);
        const endMs = getTimestamp(end);
        if (startMs === undefined || endMs === undefined) return;
        const duration = endMs - startMs || 24 * 60 * 60 * 1000;
        const deltaMs = duration * direction;
        commit(
          new Date(startMs + deltaMs).toISOString(),
          new Date(endMs + deltaMs).toISOString(),
        );
        dispatch({ type: 'clearPreset' });
      },
      [commit, end, start],
    );

    const openPicker = useCallback(() => {
      dispatch({
        type: 'open',
        start,
        end,
        preset: !!selectedRange,
      });
    }, [end, selectedRange, start]);

    const closePicker = useCallback(() => {
      dispatch({ type: 'close' });
    }, []);

    const closePickerAndRestoreFocus = useCallback(() => {
      closePicker();
      requestAnimationFrame(() => triggerRef.current?.focus());
    }, [closePicker]);

    const selectPreset = useCallback(
      (preset) => {
        const nextValue = preset.getValue();
        if (!isValidRange(nextValue)) return;
        commit(nextValue[0], nextValue[1]);
        dispatch({ type: 'selectPreset', id: preset.id, value: nextValue });
        closePickerAndRestoreFocus();
      },
      [closePickerAndRestoreFocus, commit],
    );

    const openCustomRange = useCallback(() => {
      dispatch({ type: 'openCustom' });
    }, []);

    const dates = useMemo(
      () =>
        effectiveStart || effectiveEnd
          ? [[effectiveStart, effectiveEnd]]
          : undefined,
      [effectiveEnd, effectiveStart],
    );

    let activeRangeValue;
    if (activeRangePart === 'start') activeRangeValue = effectiveStart;
    else if (activeRangePart === 'end') activeRangeValue = effectiveEnd;
    const activeTimeValue = getIsoTimeFromDateTime(activeRangeValue);
    const selectingSingleStart = phase === SELECTING_START && !draftEnd;
    const startDay = useMemo(() => {
      if (phase !== SELECTING_END || !draftStart) return undefined;
      const parsedStart = new Date(draftStart);
      return Number.isNaN(parsedStart.getTime()) ? undefined : parsedStart;
    }, [draftStart, phase]);
    const disabledEndDates = useMemo(() => {
      if (!startDay) return undefined;
      const dayBeforeStart = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        startDay.getDate() - 1,
      );
      return [['0001-01-01', toDateOnly(dayBeforeStart)]];
    }, [startDay]);

    const CalendarIcon =
      theme.dateTimeRangeInput?.icon?.calendar || GrommetCalendarIcon;

    const selectCalendarDate = (nextValue) => {
      if (phase === SELECTING_START) {
        const selectedDate = getSelectedStartDate(
          nextValue,
          draftStart,
          draftEnd,
        );
        dispatch({
          type: 'selectStart',
          value: selectedDate
            ? combineDateWithTime(selectedDate, draftStart, 0, 0)
            : undefined,
        });
        return;
      }

      if (phase === SELECTING_END) {
        const selectedDate = getSelectedEndDate(nextValue, draftStart);
        dispatch({
          type: 'selectEnd',
          value: selectedDate
            ? combineDateWithTime(selectedDate, draftEnd, 23, 59)
            : undefined,
        });
      }
    };

    const calendar = (
      <Calendar
        key={phase}
        range={selectingSingleStart ? undefined : 'array'}
        activeDate={selectingSingleStart ? undefined : activeRangePart}
        date={selectingSingleStart ? effectiveStart : undefined}
        dates={selectingSingleStart ? undefined : dates}
        disabled={phase === SELECTING_END ? disabledEndDates : undefined}
        initialFocus={open ? 'days' : undefined}
        onSelect={activeRangePart ? selectCalendarDate : undefined}
      />
    );

    const fieldMessages = (labelId) => ({
      ...messages,
      inputLabel: formatMessage({ id: labelId, messages }),
    });

    const presetItemProps = (selected) => ({
      background: selected
        ? theme.dateTimeRangeInput?.presets?.selected?.background
        : undefined,
      border: selected
        ? {
            side: 'start',
            color: theme.dateTimeRangeInput?.presets?.selected?.border?.color,
            size: theme.dateTimeRangeInput?.presets?.selected?.border?.size,
          }
        : undefined,
      pad: theme.dateTimeRangeInput?.presets?.item?.pad,
      round: selected
        ? theme.dateTimeRangeInput?.presets?.selected?.round
        : undefined,
    });

    return (
      <FormContext.Provider value={formContextValue}>
        <Keyboard onEsc={open ? closePickerAndRestoreFocus : undefined}>
          <Box
            ref={ref}
            role="group"
            aria-label={formFieldLabelId ? undefined : ariaLabel}
            aria-labelledby={formFieldLabelId}
            direction="row"
            align="center"
            gap={theme.dateTimeRangeInput?.gap}
            {...rest}
          >
            <Button
              icon={<FormPrevious />}
              plain
              disabled={disabled || readOnly || !navigable}
              aria-label={formatMessage({
                id: 'dateTimeRangeInput.previousRange',
                messages,
              })}
              onClick={() => shiftRange(-1)}
            />
            <StyledDateTimeRangeInputContainer
              ref={fieldRef}
              direction="row"
              align="center"
              gap={theme.dateTimeRangeInput?.fieldGap}
              border={
                !plain
                  ? {
                      color: ariaInvalid ? 'status-critical' : undefined,
                    }
                  : false
              }
              round={theme.dateTimeRangeInput?.container?.round}
              width={theme.dateTimeRangeInput?.container?.width}
              minWidth={theme.dateTimeRangeInput?.container?.minWidth}
              $disabled={disabled}
              $focusIndicator={focusIndicator}
              $readOnly={readOnly}
              {...passThemeFlag}
            >
              {selectedRange && !editingCustomRange ? (
                <Box
                  flex={false}
                  align="center"
                  justify="center"
                  pad={
                    theme.global.input?.padding ||
                    theme.dateTimeRangeInput?.field?.pad
                  }
                >
                  <Text weight="bold">{selectedRange.label}</Text>
                </Box>
              ) : (
                <>
                  <Box
                    flex={false}
                    direction="row"
                    align="center"
                    gap={theme.dateTimeRangeInput?.fieldGap}
                  >
                    <StyledDateTimeRangeInputField
                      $active={
                        editingCustomRange && activeRangePart === 'start'
                      }
                      flex={false}
                      onFocus={() => {
                        if (open) dispatch({ type: 'activateStart' });
                      }}
                      onPointerDown={() => {
                        if (open) dispatch({ type: 'activateStart' });
                      }}
                      width={theme.dateTimeRangeInput?.field?.width}
                    >
                      <DateTimeInput
                        aria-invalid={ariaInvalid}
                        disabled={disabled}
                        focusIndicator={false}
                        format={format}
                        id={id}
                        locale={locale}
                        messages={fieldMessages(
                          'dateTimeRangeInput.startLabel',
                        )}
                        minuteStep={minuteStep}
                        plain
                        readOnly={readOnly}
                        showCalendarButton={false}
                        showSeconds={showSeconds}
                        value={effectiveStart}
                        onChange={({ value: nextStart }) => {
                          dispatch({ type: 'clearPreset' });
                          if (open) {
                            dispatch({ type: 'selectStart', value: nextStart });
                          } else commit(nextStart, end);
                        }}
                      />
                    </StyledDateTimeRangeInputField>
                    <StyledDateTimeRangeInputSeparator
                      color={invalid ? 'status-critical' : undefined}
                    >
                      {formatMessage({
                        id: 'dateTimeRangeInput.separator',
                        messages,
                      })}
                    </StyledDateTimeRangeInputSeparator>
                  </Box>
                  <Box
                    flex={false}
                    direction="row"
                    align="center"
                    gap={theme.dateTimeRangeInput?.fieldGap}
                  >
                    <StyledDateTimeRangeInputField
                      $active={editingCustomRange && activeRangePart === 'end'}
                      flex={false}
                      onFocus={() => {
                        if (open) dispatch({ type: 'activateEnd' });
                      }}
                      onPointerDown={() => {
                        if (open) dispatch({ type: 'activateEnd' });
                      }}
                      width={theme.dateTimeRangeInput?.field?.width}
                    >
                      <DateTimeInput
                        aria-invalid={ariaInvalid}
                        disabled={disabled}
                        focusIndicator={false}
                        format={format}
                        locale={locale}
                        messages={fieldMessages('dateTimeRangeInput.endLabel')}
                        minuteStep={minuteStep}
                        plain
                        readOnly={readOnly}
                        showCalendarButton={false}
                        showSeconds={showSeconds}
                        value={effectiveEnd}
                        onChange={({ value: nextEnd }) => {
                          dispatch({ type: 'clearPreset' });
                          if (open) {
                            dispatch({ type: 'selectEnd', value: nextEnd });
                          } else commit(start, nextEnd);
                        }}
                      />
                    </StyledDateTimeRangeInputField>
                  </Box>
                </>
              )}
              {!readOnly && (
                <Button
                  ref={triggerRef}
                  icon={selectedRange ? <FormDown /> : <CalendarIcon />}
                  plain
                  disabled={disabled}
                  margin={theme.dateTimeRangeInput?.button?.margin}
                  aria-label={formatMessage({
                    id: 'dateTimeRangeInput.chooseDateTimeRange',
                    messages,
                  })}
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  aria-controls={open ? dropId : undefined}
                  onClick={open ? closePicker : openPicker}
                />
              )}
            </StyledDateTimeRangeInputContainer>
            <Button
              icon={<FormNext />}
              plain
              disabled={disabled || readOnly || !navigable}
              aria-label={formatMessage({
                id: 'dateTimeRangeInput.nextRange',
                messages,
              })}
              onClick={() => shiftRange(1)}
            />
          </Box>
        </Keyboard>
        {open && (
          <Drop
            id={dropId}
            role="dialog"
            aria-label={formatMessage({
              id: 'dateTimeRangeInput.chooseDateTimeRange',
              messages,
            })}
            target={fieldRef.current}
            align={{ top: 'bottom', left: 'left' }}
            onEsc={closePickerAndRestoreFocus}
            onClickOutside={closePicker}
          >
            <Box direction="row">
              {ranges?.length > 0 && (
                <Box
                  flex={false}
                  background={theme.dateTimeRangeInput?.presets?.background}
                  width={theme.dateTimeRangeInput?.presets?.width}
                  pad={theme.dateTimeRangeInput?.presets?.pad}
                  gap={theme.dateTimeRangeInput?.presets?.gap}
                  border={{
                    side: 'end',
                    color: theme.dateTimeRangeInput?.presets?.border?.color,
                    size: theme.dateTimeRangeInput?.presets?.border?.size,
                  }}
                >
                  {ranges.map((preset) => {
                    const isSelected =
                      phase === PRESET && selectedRange?.id === preset.id;
                    return (
                      <Box key={preset.id} {...presetItemProps(isSelected)}>
                        <Button
                          aria-pressed={isSelected}
                          label={preset.label}
                          plain
                          onClick={() => selectPreset(preset)}
                        />
                      </Box>
                    );
                  })}
                  <Box {...presetItemProps(editingCustomRange)}>
                    <Button
                      aria-pressed={editingCustomRange}
                      label={formatMessage({
                        id: 'dateTimeRangeInput.customRange',
                        messages,
                      })}
                      plain
                      onClick={openCustomRange}
                    />
                  </Box>
                </Box>
              )}
              <Box direction="column">
                <Box
                  direction="row"
                  pad={theme.dateTimeInput?.drop?.pad}
                  gap={theme.dateTimeInput?.drop?.gap}
                >
                  {calendar}
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
                    focusPopupOnMount={false}
                    format={format}
                    value={activeTimeValue}
                    showSeconds={showSeconds}
                    messages={messages}
                    minuteStep={minuteStep}
                    disabled={
                      disabled || !activeRangeValue || !editingCustomRange
                    }
                    readOnly={readOnly || !editingCustomRange}
                    onChange={({ value: nextTime }) => {
                      if (!nextTime || !activeRangeValue) return;
                      if (activeRangePart === 'end') {
                        dispatch({
                          type: 'setTime',
                          part: 'end',
                          value: applyIsoTimeToDateTime(
                            draftEnd || draftStart,
                            nextTime,
                          ),
                        });
                      } else {
                        dispatch({
                          type: 'setTime',
                          part: 'start',
                          value: applyIsoTimeToDateTime(
                            draftStart || draftEnd,
                            nextTime,
                          ),
                        });
                      }
                    }}
                  />
                </Box>
                {invalid && editingCustomRange && (
                  <Box pad={{ horizontal: 'small', bottom: 'xsmall' }}>
                    <Text color="status-critical" size="small">
                      {formatMessage({
                        id: 'dateTimeRangeInput.invalidRange',
                        messages,
                      })}
                    </Text>
                  </Box>
                )}
                <Box
                  direction="row"
                  justify="end"
                  border={{
                    side: 'top',
                    color: theme.dateTimeRangeInput?.footer?.border?.color,
                    size: theme.dateTimeRangeInput?.footer?.border?.size,
                  }}
                  pad={theme.dateTimeRangeInput?.footer?.pad}
                  gap={theme.dateTimeRangeInput?.footer?.actions?.gap}
                >
                  <Button
                    plain
                    label={formatMessage({
                      id: 'dateTimeRangeInput.cancel',
                      messages,
                    })}
                    onClick={closePickerAndRestoreFocus}
                  />
                  {activeRangePart === 'start' ? (
                    <Button
                      secondary
                      label={formatMessage({
                        id: 'dateTimeRangeInput.next',
                        messages,
                      })}
                      disabled={!draftStart}
                      onClick={() => dispatch({ type: 'next' })}
                    />
                  ) : (
                    <Button
                      primary
                      label={formatMessage({
                        id: 'dateTimeRangeInput.apply',
                        messages,
                      })}
                      disabled={
                        !editingCustomRange ||
                        !draftStart ||
                        !draftEnd ||
                        invalid
                      }
                      onClick={() => {
                        commit(draftStart, draftEnd);
                        dispatch({ type: 'clearPreset' });
                        closePickerAndRestoreFocus();
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Drop>
        )}
      </FormContext.Provider>
    );
  },
);

DateTimeRangeInput.displayName = 'DateTimeRangeInput';
DateTimeRangeInput.defaultProps = {
  focusIndicator: true,
  plain: false,
};
DateTimeRangeInput.propTypes = DateTimeRangeInputPropTypes;

export { DateTimeRangeInput };
