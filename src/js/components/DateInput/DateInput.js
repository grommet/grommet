import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { Calendar as CalendarIcon } from 'grommet-icons/icons/Calendar';
import { Box } from '../Box';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef } from '../../utils';
import { formatToSchema, valueToText, textToValue } from './utils';

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
    const { useFormInput } = useContext(FormContext);
    const ref = useForwardedRef(refArg);
    const [value, setValue] = useFormInput(name, valueArg, defaultValue);

    // parse format and build a formal schema we can use elsewhere
    const schema = useMemo(() => formatToSchema(format), [format]);

    // mask is only used when a format is provided
    const mask = useMemo(() => {
      if (!schema) return undefined;
      return schema.map(part => {
        const char = part[0].toLowerCase();
        if (char === 'm' || char === 'd' || char === 'y') {
          return {
            placeholder: part,
            length: [1, part.length],
            regexp: new RegExp(`^[0-9]{1,${part.length}}$`),
          };
        }
        return { fixed: part };
      });
    }, [schema]);

    // textValue is only used when a format is provided
    const [textValue, setTextValue] = useState(
      schema ? valueToText(value, schema) : undefined,
    );

    // when format and not inline, whether to show the Calendar in a Drop
    const [open, setOpen] = useState();

    const range = Array.isArray(value);

    const calendar = (
      <Calendar
        ref={inline ? ref : undefined}
        id={inline && !format ? id : undefined}
        range={range}
        date={range ? undefined : value}
        dates={range ? [value] : undefined}
        onSelect={
          disabled
            ? undefined
            : nextValue => {
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
          icon={<CalendarIcon />}
          {...buttonProps}
        />
      );
    }

    const input = (
      <FormContext.Provider
        key="input"
        // don't let MaskedInput drive the Form
        value={{ useFormInput: (_, val) => [val, () => {}] }}
      >
        <Keyboard onEsc={open ? () => setOpen(false) : undefined}>
          <MaskedInput
            ref={ref}
            id={id}
            name={name}
            icon={<CalendarIcon />}
            reverse
            disabled={disabled}
            mask={mask}
            {...inputProps}
            {...rest}
            value={textValue}
            onChange={event => {
              const nextTextValue = event.target.value;
              setTextValue(nextTextValue);
              const nextValue = textToValue(nextTextValue, schema);
              if (nextValue) {
                // valid value
                setValue(nextValue);
                if (onChange) {
                  event.persist(); // extract from React synthetic event pool
                  const adjustedEvent = event;
                  adjustedEvent.value = nextValue;
                  onChange(adjustedEvent);
                }
              }
            }}
            onFocus={event => {
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
          key="drop"
          id={id ? `${id}__drop` : undefined}
          target={ref.current}
          align={{ top: 'bottom', left: 'left', ...dropProps }}
          onEsc={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
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
