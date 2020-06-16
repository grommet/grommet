import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Calendar as CalendarIcon } from 'grommet-icons';
import { Box } from '../Box';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef } from '../../utils';

const formatRegexp = /([mdy]+)([^\w]*)([mdy]+)([^\w]*)([mdy]+)/i;

const valueToText = value => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date)) return '';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

const DateInput = forwardRef(
  (
    {
      buttonProps, // when no format and not inline
      calendarProps,
      defaultValue,
      dropProps, // when inline isn't true
      format,
      id,
      inline,
      inputProps, // for MaskedInput, when format is specified
      name,
      onChange,
      value: valueArg,
      ...rest
    },
    refArg,
  ) => {
    const { useFormInput } = useContext(FormContext);
    const ref = useForwardedRef(refArg);
    const [value, setValue] = useFormInput(name, valueArg, defaultValue);

    // textValue is only used when a format is provided
    const [textValue, setTextValue] = useState(valueToText(value));
    useEffect(() => {
      if (format && value) setTextValue(valueToText(value));
    }, [format, value]);

    // mask is only used when a format is provided
    const mask = useMemo(() => {
      if (!format) return [];
      const match = format.match(formatRegexp);
      const result = match.slice(1).map(part => {
        if (part[0] === 'm' || part[0] === 'd' || part[0] === 'y')
          return { placeholder: part, length: part.length, regexp: /^[0-9]+$/ };
        return { fixed: part };
      });
      return result;
    }, [format]);

    // when format and not inline, wether to show the Calendar in a Drop
    const [open, setOpen] = useState();

    const range = Array.isArray(value);

    const calendar = (
      <Calendar
        ref={inline ? ref : undefined}
        id={inline && !format ? id : undefined}
        range={range}
        date={range ? undefined : value}
        dates={range ? [value] : undefined}
        onSelect={nextValue => {
          let normalizedValue;
          if (range && Array.isArray(nextValue)) [normalizedValue] = nextValue;
          // clicking an edge date removes it
          else if (range) normalizedValue = [nextValue, nextValue];
          else normalizedValue = nextValue;
          setValue(normalizedValue);
          if (onChange) onChange({ target: { value: normalizedValue } });
          if (open) setOpen(false);
        }}
        {...calendarProps}
      />
    );

    if (!format) {
      // When no format is specified, we don't give the user a way to type
      if (inline) return calendar;

      return (
        <DropButton
          ref={ref}
          dropProps={{ align: { top: 'bottom' }, ...dropProps }}
          dropContent={calendar}
          icon={<CalendarIcon />}
          {...buttonProps}
        />
      );
    }

    const input = (
      // TODO: handle date range via MaskedInput
      <MaskedInput
        ref={ref}
        name={name}
        icon={<CalendarIcon />}
        reverse
        mask={mask}
        {...inputProps}
        {...rest}
        value={textValue}
        onChange={event => {
          setTextValue(event.target.value);
          // TODO: parse into ISO date and call onChange
        }}
        onFocus={() => setOpen(true)}
      />
    );

    if (inline) {
      return (
        <Box>
          {input}
          {calendar}
        </Box>
      );
    }

    return (
      <>
        {input}
        {open && (
          <Drop
            target={ref.current}
            align={{ top: 'bottom', ...dropProps }}
            onEsc={() => setOpen(false)}
            onClickOutside={() => setOpen(false)}
          >
            {calendar}
          </Drop>
        )}
      </>
    );
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
