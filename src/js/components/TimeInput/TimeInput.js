import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import dayjs from 'dayjs';
import { Clock as ClockIcon } from 'grommet-icons/icons/Clock';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Clock } from '../Clock';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef } from '../../utils';
import { formatToSchema, valueToText, textToValue } from './utils';
import { Stack } from '../Stack';

const TimeInput = forwardRef(
  (
    {
      buttonProps, // when no format and not inline
      clockProps,
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

    // TODO get timeInput added to theme
    const iconSize =
      (theme.timeInput?.icon && theme.timeInput?.icon.size) || 'medium';
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
        if (char === 'h' || char === 'm') {
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

    // when format and not inline, whether to show the Clock in a Drop
    const [open, setOpen] = useState();

    const [isHours, setIsHours] = useState(true);

    const number = (transFormStyle, clockNumber) => (
      <Box
        style={{
          transform: transFormStyle,
          left: 'calc((100% - 32px) / 2)',
          top: 'calc((100% - 32px) / 2)',
          width: 32,
          height: 32,
          display: 'inline-flex',
          position: 'absolute',
          alignItems: 'center',
          userSelect: 'none',
          borderRadius: '50%',
          justifyDontent: 'center',
        }}
      >
        {clockNumber}
      </Box>
    );

    const calculateAngle = (x, y) => {
      // the clock div is 260 x 290 so the center of
      // the clock is at x: 130, y: 145
      // this is calculating the length of the opposite
      // side of the right triangle
      const opposite = y - 130;
      // this is calculating the length of the adjacent
      // side of the right triangle
      const adjacent = x - 130;
      const radians = Math.atan(Math.abs(opposite) / Math.abs(adjacent));
      const degrees = (radians * 180) / Math.PI;

      // we need to take the degrees of the right triangle
      // and adjust it to the quadrant we are working in
      if (opposite <= 0 && adjacent <= 0) {
        // top left quadrant
        return 270 + degrees;
      }
      if (opposite <= 0 && adjacent >= 0) {
        // top right quadrant
        return 90 - degrees;
      }
      if (opposite >= 0 && adjacent >= 0) {
        // bottom right quadrant
        return 90 + degrees;
      }
      // bottom left quadrant
      return 180 + (90 - degrees);
    };

    const [time, setTime] = useState(dayjs(value).format('THH:mm:00'));
    const [isDragging, setIsDragging] = useState(false);
    const onMouseMove = (offsetX, offsetY) => {
      const deg = calculateAngle(offsetX, offsetY);

      if (isHours) {
        const h = Math.round(deg / 30);
        if (h <= 12) {
          setTime(
            dayjs(value)
              .set('h', h)
              .format('YYYY-MM-DDTHH:mm:00'),
          );
        }
      } else {
        const m = Math.round(deg / 6);
        if (m <= 60) {
          setTime(
            dayjs(value)
              .set('m', m)
              .format('YYYY-MM-DDTHH:mm:00'),
          );
        }
      }
    };

    const onDragEnd = () => {
      console.log('dragging stopped');
      setIsDragging(false);
      setIsHours(!isHours);
      onChange(time);
      setTextValue(schema ? valueToText(time, schema) : undefined);
    };

    const clock = (
      <Stack anchor="center" fill style={{ marginTop: 10, marginBottom: 10 }}>
        <Box fill style={{ height: 260, width: 260 }}>
          {number('translate(0px, -114px)', isHours ? 12 : '00')}
          {number('translate(57px, -98.7px)', isHours ? 1 : '05')}
          {number('translate(98.7px, -57px)', isHours ? 2 : 10)}
          {number('translate(114px, 0px)', isHours ? 3 : 15)}
          {number('translate(98.7px, 57px)', isHours ? 4 : 20)}
          {number('translate(57px, 98.7px)', isHours ? 5 : 25)}
          {number('translate(0px, 114px)', isHours ? 6 : 30)}
          {number('translate(-57px, 98.7px)', isHours ? 7 : 35)}
          {number('translate(-98.7px, 57px)', isHours ? 8 : 40)}
          {number('translate(-114px, 0px)', isHours ? 9 : 45)}
          {number('translate(-98.7px, -57px)', isHours ? 10 : 50)}
          {number('translate(-57px, -98.7px)', isHours ? 11 : 55)}
        </Box>
        <Clock
          ref={inline ? ref : undefined}
          id={!format ? id : undefined}
          {...clockProps}
          size="xlarge"
          precision="minutes"
          time={time}
          run={false}
        />
        <Box
          style={{ height: 260, width: 260 }}
          onMouseDown={() => {
            console.log('dragging started');
            setIsDragging(true);
          }}
          onMouseUp={onDragEnd}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={e => {
            if (isDragging) {
              onMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            }
          }}
        />
      </Stack>
    );

    if (!format) {
      // When no format is specified, we don't give the user a way to type
      if (inline) return clock;

      return (
        <DropButton
          ref={ref}
          id={id}
          dropProps={{ align: { top: 'bottom', left: 'left' }, ...dropProps }}
          dropContent={clock}
          icon={<ClockIcon size={iconSize} />}
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
            icon={<ClockIcon size={iconSize} />}
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
              // update value even when undefined
              setValue(nextValue);
              if (onChange) {
                event.persist(); // extract from React synthetic event pool
                const adjustedEvent = event;
                adjustedEvent.value = nextValue;
                onChange(adjustedEvent);
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
          {clock}
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
          {clock}
        </Drop>,
      ];
    }

    return input;
  },
);

TimeInput.displayName = 'TimeInput';

let TimeInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TimeInputDoc = require('./doc').doc(TimeInput);
}
const TimeInputWrapper = TimeInputDoc || TimeInput;

export { TimeInputWrapper as TimeInput };
