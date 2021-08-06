import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { Calendar as CalendarIcon } from 'grommet-icons/icons/Calendar';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef } from '../../utils';
import {
  formatToSchema,
  schemaToMask,
  valuesAreEqual,
  valueToText,
  textToValue,
} from './utils';

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
      inline = false,
      inputProps, // for MaskedInput, when format is specified
      name,
      onChange,
      onFocus,
      value: valueArg,
      ...rest
    },
    refArg,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const iconSize =
      (theme.dateInput.icon && theme.dateInput.icon.size) || 'medium';
    const { useFormInput } = useContext(FormContext);
    const ref = useForwardedRef(refArg);
    const [value, setValue] = useFormInput(name, valueArg, defaultValue);

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

    // We need to distinguish between the caller changing a Form value
    // and the user typing a date that he isn't finished with yet.
    // To handle this, we see if we have a value and the text value
    // associated with it doesn't align to it, then we update the text value.
    // We compare using textToValue to avoid "06/01/2021" not
    // matching "06/1/2021".
    useEffect(() => {
      if (
        schema &&
        (value || value?.length === 0) &&
        (
          (Array.isArray(value) && value[0])
          || !Array.isArray(value)
          || value?.length === 0
        )
      ) {
        const nextTextValue = valueToText(value, schema);
        if (
          !valuesAreEqual(
            textToValue(textValue, schema, value, range),
            textToValue(nextTextValue, schema, value, range),
          )
        ) {
          setTextValue(nextTextValue);
        }
      }
    }, [range, schema, textValue, value]);

    // when format and not inline, whether to show the Calendar in a Drop
    const [open, setOpen] = useState();

    const calendar = (
      <Calendar
        ref={inline ? ref : undefined}
        id={inline && !format ? id : undefined}
        range={range}
        date={range ? undefined : value}
        // when caller initializes with empty array, dates should be undefined
        // allowing the user to select both begin and end of the range
        dates={range && value.length ? [value] : undefined}
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
              if (schema) setTextValue(valueToText(normalizedValue, schema));
              setValue(normalizedValue);
              if (onChange) onChange({ value: normalizedValue });
              if (open && !range) setOpen(false);
            }
        }
        {...calendarProps}
      />
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
          icon={<CalendarIcon size={iconSize} />}
          {...buttonProps}
        />
      );
    }

    const input = (
      <FormContext.Provider
        key="input"
        // don't let MaskedInput drive the Form
        value={{ useFormInput: (_, val) => [val, () => { }] }}
      >
        <Keyboard onEsc={open ? () => setOpen(false) : undefined}>
          <MaskedInput
            ref={ref}
            id={id}
            name={name}
            icon={<CalendarIcon size={iconSize} />}
            reverse
            disabled={disabled}
            mask={mask}
            {...inputProps}
            {...rest}
            value={textValue}
            onChange={(event) => {
              const nextTextValue = event.target.value;
              setTextValue(nextTextValue);
              const nextValue = textToValue(
                nextTextValue,
                schema,
                value,
                range,
              );
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
              setOpen(true);
              if (onFocus) onFocus(event);
            }}
          />
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
        <Drop
          overflow="visible"
          key="drop"
          id={id ? `${id}__drop` : undefined}
          target={ref.current}
          align={{ top: 'bottom', left: 'left', ...dropProps }}
          onEsc={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
          {...dropProps}
        >
          {calendar}
        </Drop>,
      ];
    }

    return input;
  },
);

DateInput.displayName = 'DateInput';

let DateInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DateInputDoc = require('./doc').doc(DateInput);
}
const DateInputWrapper = DateInputDoc || DateInput;

export { DateInputWrapper as DateInput };
