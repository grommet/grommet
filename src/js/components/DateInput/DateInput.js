import React, {
  useRef,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Calendar as CalendarIcon } from 'grommet-icons/icons/Calendar';
import { defaultProps } from '../../default-props';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef, setHoursWithOffset } from '../../utils';
import {
  formatToSchema,
  schemaToMask,
  valuesAreEqual,
  valueToText,
  textToValue,
  validateBounds,
} from './utils';
import { DateInputPropTypes } from './propTypes';
import { getOutputFormat } from '../Calendar/Calendar';

const getReference = (value) => {
  let adjustedDate;
  let res;
  if (typeof value === 'string') res = value;
  else if (Array.isArray(value) && Array.isArray(value[0]))
    res = value[0].find((date) => date);
  else if (Array.isArray(value) && value.length) [res] = value;

  if (res) {
    adjustedDate = setHoursWithOffset(res);
  }
  return adjustedDate;
};

const DateInput = forwardRef(
  (
    {
      buttonProps, // when no format and not inline
      calendarProps,
      defaultValue,
      disabled,
      dropProps, // when inline isn't true
      format,
      id,
      icon,
      inline = false,
      inputProps, // for MaskedInput, when format is specified
      name,
      onChange,
      onFocus,
      plain,
      reverse: reverseProp = false,
      value: valueArg,
      messages,
      ...rest
    },
    refArg,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const announce = useContext(AnnounceContext);
    const { format: formatMessage } = useContext(MessageContext);
    const iconSize =
      (theme.icon?.matchSize && rest.size) ||
      theme.dateInput.icon?.size ||
      'medium';
    const { useFormInput } = useContext(FormContext);
    const ref = useForwardedRef(refArg);
    const containerRef = useRef();
    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue,
    });

    const [outputFormat, setOutputFormat] = useState(getOutputFormat(value));
    useEffect(() => {
      setOutputFormat((previousFormat) => {
        const nextFormat = getOutputFormat(value);
        // when user types, date could become something like 07//2020
        // and value becomes undefined. don't lose the format from the
        // previous valid date
        return previousFormat !== nextFormat ? previousFormat : nextFormat;
      });
    }, [value]);

    // keep track of timestamp from original date(s)
    const [reference, setReference] = useState(getReference(value));

    // do we expect multiple dates?
    const range = Array.isArray(value) || (format && format.includes('-'));

    // parse format and build a formal schema we can use elsewhere
    const schema = useMemo(() => formatToSchema(format), [format]);

    // mask is only used when a format is provided
    const mask = useMemo(() => schemaToMask(schema), [schema]);

    // textValue is only used when a format is provided
    const [textValue, setTextValue] = useState(
      schema ? valueToText(value, schema) : undefined,
    );

    // Setting the icon through `inputProps` is deprecated.
    // The `icon` prop should be used instead.
    const { icon: MaskedInputIcon, ...restOfInputProps } = inputProps || {};
    if (MaskedInputIcon) {
      console.warn(
        `Customizing the DateInput icon through inputProps is deprecated.
Use the icon prop instead.`,
      );
    }

    const reverse = reverseProp || restOfInputProps.reverse;

    const calendarDropdownAlign = { top: 'bottom', left: 'left' };

    // We need to distinguish between the caller changing a Form value
    // and the user typing a date that he isn't finished with yet.
    // To handle this, we see if we have a value and the text value
    // associated with it doesn't align to it, then we update the text value.
    // We compare using textToValue to avoid "06/01/2021" not
    // matching "06/1/2021".
    useEffect(() => {
      if (schema && value !== undefined) {
        const nextTextValue = valueToText(value, schema);
        if (
          !valuesAreEqual(
            textToValue(textValue, schema, range, reference),
            textToValue(nextTextValue, schema, range, reference),
          ) ||
          (textValue === '' && nextTextValue !== '')
        ) {
          setTextValue(nextTextValue);
        }
      }
    }, [range, schema, textValue, reference, value]);

    // when format and not inline, whether to show the Calendar in a Drop
    const [open, setOpen] = useState();

    const openCalendar = useCallback(() => {
      setOpen(true);
      announce(formatMessage({ id: 'dateInput.enterCalendar', messages }));
    }, [announce, formatMessage, messages]);

    const closeCalendar = useCallback(() => {
      setOpen(false);
      announce(formatMessage({ id: 'dateInput.exitCalendar', messages }));
    }, [announce, formatMessage, messages]);

    const dates = useMemo(
      () => (range && value?.length ? [value] : undefined),
      [range, value],
    );

    const calendar = (
      <Calendar
        ref={inline ? ref : undefined}
        id={inline && !format ? id : undefined}
        range={range}
        date={range ? undefined : value}
        // when caller initializes with empty array, dates should be undefined
        // allowing the user to select both begin and end of the range
        dates={dates}
        // places focus on days grid when Calendar opens
        initialFocus={open ? 'days' : undefined}
        onSelect={
          disabled
            ? undefined
            : (nextValue) => {
                let normalizedValue;
                if (range && Array.isArray(nextValue))
                  [normalizedValue] = nextValue;
                // clicking an edge date removes it
                else if (range && nextValue)
                  normalizedValue = [nextValue, nextValue];
                else normalizedValue = nextValue;

                if (schema) setTextValue(valueToText(normalizedValue, schema));
                setValue(normalizedValue);
                setReference(getReference(nextValue));
                if (onChange) onChange({ value: normalizedValue });
                if (open && !range) {
                  closeCalendar();
                  setTimeout(() => ref.current?.focus(), 1);
                }
              }
        }
        {...calendarProps}
      />
    );

    const formContextValue = useMemo(
      () => ({
        useFormInput: ({ value: valueProp }) => [valueProp, () => {}],
      }),
      [],
    );

    if (!format) {
      // When no format is specified, we don't give the user a way to type
      if (inline) return calendar;

      return (
        <DropButton
          ref={ref}
          id={id}
          dropProps={{ align: calendarDropdownAlign, ...dropProps }}
          dropContent={calendar}
          icon={icon || MaskedInputIcon || <CalendarIcon size={iconSize} />}
          {...buttonProps}
        />
      );
    }

    const calendarButton = (
      <Button
        onClick={open ? closeCalendar : openCalendar}
        plain
        icon={icon || MaskedInputIcon || <CalendarIcon size={iconSize} />}
        margin={reverse ? { left: 'small' } : { right: 'small' }}
      />
    );

    const input = (
      <FormContext.Provider
        key="input"
        // don't let MaskedInput drive the Form
        value={formContextValue}
      >
        <Keyboard
          onEsc={open ? () => closeCalendar() : undefined}
          onSpace={(event) => {
            event.preventDefault();
            openCalendar();
          }}
        >
          <Box
            ref={containerRef}
            border={!plain}
            round={theme.dateInput.container.round}
            direction="row"
            fill
          >
            {reverse && calendarButton}
            <MaskedInput
              ref={ref}
              id={id}
              name={name}
              reverse
              disabled={disabled}
              mask={mask}
              plain
              {...restOfInputProps}
              {...rest}
              value={textValue}
              onChange={(event) => {
                const nextTextValue = event.target.value;
                setTextValue(nextTextValue);
                const nextValue = textToValue(
                  nextTextValue,
                  schema,
                  range,
                  reference,
                  outputFormat,
                );

                const validatedNextValue = validateBounds(
                  calendarProps?.bounds,
                  nextValue,
                );

                if (!validatedNextValue && nextValue) {
                  setTextValue('');
                }

                if (validatedNextValue !== undefined)
                  setReference(getReference(validatedNextValue));
                // update value even when undefined
                setValue(validatedNextValue);
                if (onChange) {
                  event.persist(); // extract from React synthetic event pool
                  const adjustedEvent = event;
                  adjustedEvent.value = validatedNextValue;
                  onChange(adjustedEvent);
                }
              }}
              onFocus={(event) => {
                announce(
                  formatMessage({ id: 'dateInput.openCalendar', messages }),
                );
                if (onFocus) onFocus(event);
              }}
            />
            {!reverse && calendarButton}
          </Box>
        </Keyboard>
      </FormContext.Provider>
    );

    if (inline) {
      return (
        <Box>
          {input}
          {calendar}
        </Box>
      );
    }

    if (open) {
      return [
        input,
        <Keyboard key="drop" onEsc={() => ref.current.focus()}>
          <Drop
            overflow="visible"
            id={id ? `${id}__drop` : undefined}
            target={containerRef.current}
            align={{ ...calendarDropdownAlign, ...dropProps }}
            onEsc={closeCalendar}
            onClickOutside={({ target }) => {
              if (
                target !== containerRef.current &&
                !containerRef.current.contains(target)
              ) {
                closeCalendar();
              }
            }}
            {...dropProps}
          >
            {calendar}
          </Drop>
        </Keyboard>,
      ];
    }

    return input;
  },
);

DateInput.displayName = 'DateInput';
DateInput.propTypes = DateInputPropTypes;

export { DateInput };
