import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withForwardRef, withTheme } from '../hocs';

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
    /* eslint-disable-next-line react/no-find-dom-node */
    const rect = findDOMNode(this.containerRef.current).getBoundingClientRect();
    if (direction === 'vertical') {
      const y = event.clientY - (rect.y || 0); // unit test resilience
      const scaleY = rect.height / (max - min + step) || 1; // unit test resilience
      return Math.floor(y / scaleY);
    }
    const x = event.clientX - (rect.x || 0); // unit test resilience
    const scaleX = rect.width / (max - min + step) || 1; // unit test resilience
    return Math.floor(x / scaleX);
  };

  onClick = event => {
    const { onChange, values } = this.props;
    const { lastChange } = this.state;
    const value = this.valueForMouseCoord(event);
    if (value <= values[0] || (value < values[1] && lastChange === 'lower')) {
      this.setState({ lastChange: 'lower' }, () =>
        onChange([value, values[1]])
      );
    } else if (
      value >= values[1] ||
      (value > values[0] && lastChange === 'upper')
    ) {
      this.setState({ lastChange: 'upper' }, () =>
        onChange([values[0], value])
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
      theme,
      values,
      ...rest
    } = this.props;
    const { nextLower, nextUpper } = this.state;

    const scale = (max - min) / (max - min + step);
    const lower = nextLower !== undefined ? nextLower : values[0];
    const upper = nextUpper !== undefined ? nextUpper : values[1];
    const fill = direction === 'vertical' ? 'horizontal' : 'vertical';

    return (
      <Box
        ref={this.containerRef}
        direction={direction === 'vertical' ? 'column' : 'row'}
        fill={fill}
        {...rest}
        onClick={onChange ? this.onClick : undefined}
      >
        <Box
          style={{ flex: `${(lower - min) * scale} 0 0` }}
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
          theme={theme}
          onMouseDown={onChange ? this.lowerMouseDown : undefined}
          onDecrease={
            onChange && lower > min
              ? () => onChange([lower - step, upper])
              : undefined
          }
          onIncrease={
            onChange && lower < upper
              ? () => onChange([lower + step, upper])
              : undefined
          }
        />
        <Box
          style={{
            flex: `${(upper - lower + step) * scale} 0 0`,
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
          theme={theme}
          onMouseDown={onChange ? this.upperMouseDown : undefined}
          onDecrease={
            onChange && upper > lower
              ? () => onChange([lower, upper - step])
              : undefined
          }
          onIncrease={
            onChange && upper < max
              ? () => onChange([lower, upper + step])
              : undefined
          }
        />
        <Box
          style={{ flex: `${(max - upper) * scale} 0 0` }}
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
const RangeSelectorWrapper = compose(
  withTheme,
  withForwardRef
)(RangeSelectorDoc || RangeSelector);

export { RangeSelectorWrapper as RangeSelector };
