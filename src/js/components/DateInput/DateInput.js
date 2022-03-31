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
import { useForwardedRef } from '../../utils';
import { getTimestamp, normalizeForTimezone } from '../Calendar/utils';
import {
  formatToSchema,
  schemaToMask,
  valuesAreEqual,
  valueToText,
  textToValue,
} from './utils';
import { DateInputPropTypes } from './propTypes';

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
      (theme.dateInput.icon && theme.dateInput.icon.size) || 'medium';
    const { useFormInput } = useContext(FormContext);
    const ref = useForwardedRef(refArg);
    const containerRef = useRef();
    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue,
    });

    const timestamp = useMemo(() => {
      if (Array.isArray(defaultValue) && defaultValue.length)
        return getTimestamp(defaultValue[0]);
      if (typeof defaultValue === 'string') return getTimestamp(defaultValue);
      if (Array.isArray(value) && value.length) return getTimestamp(value[0]);
      // check to see if value is not an empty string
      // empty string should behave like undefined
      if (typeof value === 'string' && value.length) return getTimestamp(value);
      return undefined;
    }, [defaultValue, value]);

    // whether or not we should normalize the date based on the timestamp.
    // will be set to false if the initial timestamp is undefined (meaning
    // a user did not provide a defaultValue or value). in this case, we
    // will just rely on the UTC timestamp and don't need to normalize.
    const [normalize, setNormalize] = useState(true);

    // normalize value based on timestamp vs user's local timezone
    const normalizedDate = normalizeForTimezone(value, timestamp, normalize);
    // do we expect multiple dates?
    const range = Array.isArray(value) || (format && format.includes('-'));

    // parse format and build a formal schema we can use elsewhere
    const schema = useMemo(() => formatToSchema(format), [format]);

    // mask is only used when a format is provided
    const mask = useMemo(() => schemaToMask(schema), [schema]);

    // textValue is only used when a format is provided
    const [textValue, setTextValue] = useState(
      schema ? valueToText(normalizedDate, schema) : undefined,
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

    // We need to distinguish between the caller changing a Form value
    // and the user typing a date that he isn't finished with yet.
    // To handle this, we see if we have a value and the text value
    // associated with it doesn't align to it, then we update the text value.
    // We compare using textToValue to avoid "06/01/2021" not
    // matching "06/1/2021".
    useEffect(() => {
      if (schema && value !== undefined) {
        const nextTextValue = valueToText(normalizedDate, schema);
        if (
          !valuesAreEqual(
            textToValue(textValue, schema, range, timestamp),
            textToValue(nextTextValue, schema, range, timestamp),
          ) ||
          (textValue === '' && nextTextValue !== '')
        ) {
          setTextValue(nextTextValue);
        }
      }
    }, [range, schema, textValue, value, normalizedDate, timestamp]);

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

    const calendar = (
      <Calendar
        ref={inline ? ref : undefined}
        id={inline && !format ? id : undefined}
        range={range}
        date={range ? undefined : normalizedDate}
        // when caller initializes with empty array, dates should be undefined
        // allowing the user to select both begin and end of the range
        dates={range && value.length ? [normalizedDate] : undefined}
        // places focus on days grid when Calendar opens
        initialFocus={open ? 'days' : undefined}
        normalize={normalize}
        onSelect={
          disabled
            ? undefined
            : (nextValue) => {
                let normalizedValue;
                if (range && Array.isArray(nextValue))
                  [normalizedValue] = nextValue;
                // clicking an edge date removes it
                else if (range) normalizedValue = [nextValue, nextValue];
                else normalizedValue = nextValue;
                // timestamp will be undefined if no defaultValue or value have
                // been passed in, indicating that we should stay local if the
                // user first picks a date via the Calendar.
                let nextNormalize = normalize;
                if (timestamp === undefined) {
                  nextNormalize = false;
                  setNormalize(nextNormalize);
                }
                if (schema)
                  setTextValue(
                    valueToText(
                      normalizeForTimezone(
                        normalizedValue,
                        undefined,
                        nextNormalize,
                      ),
                      schema,
                    ),
                  );
                setValue(normalizedValue);
                if (onChange) onChange({ value: normalizedValue });
                if (open && !range) {
                  closeCalendar();
                  setTimeout(() => ref.current.focus(), 1);
                }
              }
        }
        {...{ ...calendarProps, timestamp }}
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
          dropProps={{ align: { top: 'bottom', left: 'left' }, ...dropProps }}
          dropContent={calendar}
          icon={icon || MaskedInputIcon || <CalendarIcon size={iconSize} />}
          {...buttonProps}
        />
      );
    }

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
            round="xxsmall"
            direction="row"
            fill
          >
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

                let localTimestamp;
                // get the UTC timestamp relative to the user's timezone
                // once a date is complete
                if (timestamp === undefined && Date.parse(nextTextValue))
                  [, localTimestamp] = new Date(nextTextValue)
                    .toISOString()
                    .split('T');

                // timestamp will be undefined if no defaultValue or value have
                // been passed in, indicating that we should stay local
                let nextNormalize = normalize;
                if (timestamp === undefined) {
                  nextNormalize = false;
                  setNormalize(nextNormalize);
                }
                const nextValue = textToValue(
                  nextTextValue,
                  schema,
                  range,
                  timestamp || localTimestamp,
                  nextNormalize,
                );

                // reset to original state
                if (nextValue === undefined) setNormalize(true);
                // update value even when undefined
                setValue(nextValue);
                if (onChange) {
                  event.persist(); // extract from React synthetic event pool
                  const adjustedEvent = event;
                  adjustedEvent.value = nextValue;
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
            <Button
              onClick={open ? closeCalendar : openCalendar}
              plain
              icon={icon || MaskedInputIcon || <CalendarIcon size={iconSize} />}
              margin={{ right: 'small' }}
            />
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
            target={ref.current}
            align={{ top: 'bottom', left: 'left', ...dropProps }}
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
