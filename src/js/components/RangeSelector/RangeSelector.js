import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withForwardRef } from '../hocs';

import { EdgeControl } from './EdgeControl';

class RangeSelector extends Component {
  static defaultProps = {
    direction: 'horizontal',
    max: 100,
    messages: { lower: 'Lower Bounds', upper: 'Upper Bounds' },
    min: 0,
    opacity: 'medium',
    size: 'medium',
    step: 1,
    values: [],
  };

  state = {};

  containerRef = React.createRef();

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseMove);
  }

  valueForMouseCoord = event => {
    const { direction, max, min, step } = this.props;
    const rect = this.containerRef.current.getBoundingClientRect();
    let value;
    if (direction === 'vertical') {
      const y = event.clientY - (rect.y || 0); // unit test resilience
      const scaleY = rect.height / (max - min + 1) || 1; // unit test resilience
      value = Math.floor(y / scaleY) + min;
    } else {
      const x = event.clientX - (rect.x || 0); // unit test resilience
      const scaleX = rect.width / (max - min + 1) || 1; // unit test resilience
      value = Math.floor(x / scaleX) + min;
    }
    // align with closest step within [min, max]
    const result = value + (value % step);
    if (result < min) {
      return min;
    }
    if (result > max) {
      return max;
    }
    return result;
  };

  onClick = event => {
    const { onChange, values } = this.props;
    const { lastChange } = this.state;
    const value = this.valueForMouseCoord(event);
    if (value <= values[0] || (value < values[1] && lastChange === 'lower')) {
      this.setState({ lastChange: 'lower' }, () =>
        onChange([value, values[1]]),
      );
    } else if (
      value >= values[1] ||
      (value > values[0] && lastChange === 'upper')
    ) {
      this.setState({ lastChange: 'upper' }, () =>
        onChange([values[0], value]),
      );
    }
  };

  lowerMouseDown = () => {
    this.setState({ changing: 'lower' });
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  upperMouseDown = () => {
    this.setState({ changing: 'upper' });
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  selectionMouseDown = event => {
    const moveValue = this.valueForMouseCoord(event);
    this.setState({ changing: 'selection', moveValue });
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };

  mouseMove = event => {
    const { max, min, onChange, values } = this.props;
    const { changing, moveValue } = this.state;
    const value = this.valueForMouseCoord(event);
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
      this.setState({ lastChange: changing, moveValue: value }, () => {
        onChange(nextValues);
      });
    }
  };

  mouseUp = () => {
    this.setState({ changing: undefined });
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseMove);
  };

  render() {
    const {
      color,
      direction,
      forwardRef,
      invert,
      max,
      messages,
      min,
      onChange,
      opacity,
      round,
      size,
      step,
      values,
      ...rest
    } = this.props;
    const { nextLower, nextUpper } = this.state;

    const lower = nextLower !== undefined ? nextLower : values[0];
    const upper = nextUpper !== undefined ? nextUpper : values[1];
    // It needs to be true when vertical, due to how browsers manage height
    const fill = direction === 'vertical' ? true : 'vertical';

    return (
      <Box
        ref={this.containerRef}
        direction={direction === 'vertical' ? 'column' : 'row'}
        fill={fill}
        {...rest}
        onClick={onChange ? this.onClick : undefined}
      >
        <Box
          style={{ flex: `${lower - min} 0 0` }}
          background={
            invert ? { color: color || 'light-4', opacity } : undefined
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
          onMouseDown={onChange ? this.lowerMouseDown : undefined}
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
            invert ? undefined : { color: color || 'control', opacity }
          }
          fill={fill}
          round={round}
          onMouseDown={onChange ? this.selectionMouseDown : undefined}
        />
        <EdgeControl
          a11yTitle={messages.upper}
          tabIndex={0}
          color={color}
          direction={direction}
          edge="upper"
          onMouseDown={onChange ? this.upperMouseDown : undefined}
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
            invert ? { color: color || 'light-4', opacity } : undefined
          }
          fill={fill}
          round={round}
        />
      </Box>
    );
  }
}

let RangeSelectorDoc;
if (process.env.NODE_ENV !== 'production') {
  RangeSelectorDoc = require('./doc').doc(RangeSelector); // eslint-disable-line global-require
}
const RangeSelectorWrapper = compose(withForwardRef)(
  RangeSelectorDoc || RangeSelector,
);

export { RangeSelectorWrapper as RangeSelector };
