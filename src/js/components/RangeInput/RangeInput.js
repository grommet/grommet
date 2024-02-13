import React, {
  forwardRef,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';
import { RangeInputPropTypes } from './propTypes';
import { useForwardedRef } from '../../utils';

const RangeInput = forwardRef(
  (
    {
      a11yTitle,
      color,
      focus: focusProp,
      // When in a FormField, focusIndicator = false,
      // so that the FormField has focus style. If RangeInput
      // is not in a FormField, it will have focus.
      focusIndicator = true,
      name,
      onChange,
      onFocus,
      onBlur,
      value: valueProp,
      step = 1,
      min = 0,
      max = 100,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const formContext = useContext(FormContext);
    const [focus, setFocus] = useState(focusProp);

    const scrollEnabled = theme?.rangeInput?.wheel !== false;

    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
    });

    const [scroll, setScroll] = useState({
      x: null,
      y: null,
    });
    const rangeInputRef = useForwardedRef(ref);

    useEffect(() => {
      const { x, y } = scroll;
      const handleScrollTo = () => window.scrollTo(x, y);
      if (x !== null && y !== null && scrollEnabled) {
        window.addEventListener('scroll', handleScrollTo);
      }
      // there is no need to remove this event listener if scroll is disabled
      // but we need to remove it if scroll is enabled and user switches to
      // a theme with scroll disabled
      return () => {
        window.removeEventListener('scroll', handleScrollTo);
      };
    }, [scroll, scrollEnabled]);

    const setRangeInputValue = useCallback(
      (nextValue) => {
        if (nextValue > max || nextValue < min) return;
        // Calling set value function directly on input because React library
        // overrides setter `event.target.value =` and loses original event
        // target fidelity.
        // https://stackoverflow.com/a/46012210
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        ).set;
        nativeInputValueSetter.call(rangeInputRef.current, nextValue);
        const event = new Event('input', { bubbles: true });
        rangeInputRef.current.dispatchEvent(event);
      },
      [rangeInputRef, min, max],
    );

    const handleOnWheel = (event) => {
      const newValue = parseFloat(value);
      if (event.deltaY < 0) {
        setRangeInputValue(newValue + step);
      } else {
        setRangeInputValue(newValue - step);
      }
    };
    // This is to make sure scrollbar doesn't move
    // when user changes RangeInput value.
    const handleMouseOver = () =>
      setScroll({ x: window.scrollX, y: window.scrollY });
    const handleMouseOut = () => setScroll({ x: null, y: null });

    return (
      <StyledRangeInput
        aria-label={a11yTitle}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        ref={rangeInputRef}
        name={name}
        focus={focus}
        focusIndicator={focusIndicator}
        value={value}
        {...rest}
        color={color}
        onFocus={(event) => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
        onChange={(event) => {
          setValue(event.target.value);
          if (onChange) onChange(event);
        }}
        onMouseOver={scrollEnabled ? handleMouseOver : undefined}
        onMouseOut={scrollEnabled ? handleMouseOut : undefined}
        onWheel={scrollEnabled ? handleOnWheel : undefined}
        step={step}
        type="range"
        min={min}
        max={max}
      />
    );
  },
);

RangeInput.displayName = 'RangeInput';
RangeInput.propTypes = RangeInputPropTypes;

export { RangeInput };
