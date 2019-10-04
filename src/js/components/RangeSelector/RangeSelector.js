import React, { useEffect, useContext, useState, useRef } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { ThemeContext } from '../../contexts';

import { Box } from '../Box';
import { withForwardRef } from '../hocs';

import { EdgeControl } from './EdgeControl';

const Container = styled(Box)`
  user-select: none;
`;

const RangeSelector = ({
  direction,
  max,
  messages,
  min,
  opacity,
  step,
  values,
  onChange,
  color,
  forwardRef,
  invert,
  round,
  theme: propsTheme,
  ...rest
}) => {
  const context = useContext(ThemeContext);
  const theme = context || propsTheme;

  const fill = direction === 'vertical' ? true : 'vertical';
  const [lower, upper] = values;
  const containerRef = useRef();

  const [lastState, setLastState] = useState({
    lastChange: '',
    lastValues: values,
  });
  const [changing, setChanging] = useState(undefined);
  const [moveValue, setMoveValue] = useState(undefined);

  const { lastChange } = lastState;

  useEffect(() => {
    if (onChange) {
      onChange(lastState.lastValues);
    }
  }, [lastState]);

  const valueForMouseCoord = event => {
    const rect = containerRef.current.getBoundingClientRect();
    let value;
    if (direction === 'vertical') {
      // there is no x and y in unit testing
      const y = event.clientY - (rect.top || 0); // unit test resilience
      const scaleY = rect.height / (max - min + 1) || 1; // unit test resilience
      value = Math.floor(y / scaleY) + min;
    } else {
      const x = event.clientX - (rect.left || 0); // unit test resilience
      const scaleX = rect.width / (max - min + 1) || 1; // unit test resilience
      value = Math.floor(x / scaleX) + min;
    }
    // align with closest step within [min, max]
    const result = Math.ceil(value / step) * step;
    if (result < min) {
      return min;
    }
    if (result > max) {
      return max;
    }
    return result;
  };

  const onClick = event => {
    const value = valueForMouseCoord(event);
    if (value <= values[0] || (value < values[1] && lastChange === 'lower')) {
      setLastState({
        lastChange: 'lower',
        lastValues: [value, values[1]],
      });
    } else if (
      value >= values[1] ||
      (value > values[0] && lastChange === 'upper')
    ) {
      setLastState({
        lastChange: 'upper',
        lastValues: [values[0], value],
      });
    }
  };

  const lowerMouseDown = () => {
    setChanging('lower');
  };

  const upperMouseDown = () => {
    setChanging('upper');
  };

  const selectionMouseDown = event => {
    setChanging('selection');
    setMoveValue(valueForMouseCoord(event));
  };

  const mouseMove = event => {
    const value = valueForMouseCoord(event);
    let nextValues;
    if (changing === 'lower' && value <= values[1] && value !== moveValue) {
      nextValues = [value, values[1]];
    } else if (
      changing === 'upper' &&
      value >= values[0] &&
      value !== moveValue
    ) {
      nextValues = [values[0], value];
    } else if (changing === 'selection' && value !== moveValue) {
      const delta = value - moveValue;
      if (values[0] + delta >= min && values[1] + delta <= max) {
        nextValues = [values[0] + delta, values[1] + delta];
      }
    }
    if (nextValues) {
      setLastState({
        lastChange: changing,
        lastValues: nextValues,
      });
      setMoveValue(value);
    }
  };

  const mouseUp = () => {
    setChanging(undefined);
  };

  useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [changing]);

  return (
    <Container
      ref={containerRef}
      direction={direction === 'vertical' ? 'column' : 'row'}
      fill={fill}
      {...rest}
      onClick={onChange ? onClick : undefined}
    >
      <Box
        style={{ flex: `${lower - min} 0 0` }}
        background={
          invert
            ? // preserve existing dark, instead of using darknes
              // of this color
              {
                color: color || theme.rangeSelector.background.invert.color,
                opacity,
                dark: theme.dark,
              }
            : undefined
        }
        fill={fill}
        round={round}
      />
      <EdgeControl
        a11yTitle={messages.lower}
        tabIndex={0}
        ref={forwardRef}
        color={color}
        direction={direction}
        edge="lower"
        onMouseDown={onChange ? lowerMouseDown : undefined}
        onDecrease={
          onChange && lower - step >= min
            ? () => onChange([lower - step, upper])
            : undefined
        }
        onIncrease={
          onChange && lower + step <= upper
            ? () => onChange([lower + step, upper])
            : undefined
        }
      />
      <Box
        style={{
          flex: `${upper - lower + 1} 0 0`,
          cursor: direction === 'vertical' ? 'ns-resize' : 'ew-resize',
        }}
        background={
          invert
            ? undefined
            : // preserve existing dark, instead of using darknes of
              // this color
              { color: color || 'control', opacity, dark: theme.dark }
        }
        fill={fill}
        round={round}
        onMouseDown={onChange ? selectionMouseDown : undefined}
      />
      <EdgeControl
        a11yTitle={messages.upper}
        tabIndex={0}
        color={color}
        direction={direction}
        edge="upper"
        onMouseDown={onChange ? upperMouseDown : undefined}
        onDecrease={
          onChange && upper - step >= lower
            ? () => onChange([lower, upper - step])
            : undefined
        }
        onIncrease={
          onChange && upper + step <= max
            ? () => onChange([lower, upper + step])
            : undefined
        }
      />
      <Box
        style={{ flex: `${max - upper} 0 0` }}
        background={
          invert
            ? // preserve existing dark, instead of using darknes of this
              // color
              {
                color: color || theme.rangeSelector.background.invert.color,
                opacity,
                dark: theme.dark,
              }
            : undefined
        }
        fill={fill}
        round={round}
      />
    </Container>
  );
};

RangeSelector.defaultProps = {
  direction: 'horizontal',
  max: 100,
  messages: { lower: 'Lower Bounds', upper: 'Upper Bounds' },
  min: 0,
  opacity: 'medium',
  step: 1,
  values: [],
};

let RangeSelectorDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeSelectorDoc = require('./doc').doc(RangeSelector);
}
const RangeSelectorWrapper = compose(withForwardRef)(
  RangeSelectorDoc || RangeSelector,
);

export { RangeSelectorWrapper as RangeSelector };
