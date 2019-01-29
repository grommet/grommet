import React, { Component } from 'react';
import { compose } from 'recompose';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { RadioButton } from '../RadioButton';
import { withForwardRef } from '../hocs';

class RadioButtonGroup extends Component {
  static getDerivedStateFromProps(nextProps) {
    const { options, value } = nextProps;
    return {
      options: options.map(o =>
        typeof o === 'string' ? { id: o, label: o, value: o } : o,
      ),
      value,
    };
  }

  state = {};

  optionRefs = [];

  valueIndex = () => {
    const { options, value } = this.state;
    let result;
    options.some((option, index) => {
      if (option.value === value) {
        result = index;
        return true;
      }
      return false;
    });
    return result;
  };

  onNext = () => {
    const { onChange } = this.props;
    const { options } = this.state;
    const valueIndex = this.valueIndex();
    if (valueIndex !== undefined && valueIndex < options.length - 1) {
      const nextIndex = valueIndex + 1;
      const nextValue = options[nextIndex].value;
      this.setState({ value: nextValue }, () => {
        this.optionRefs[nextIndex].focus();
      });
      if (onChange) {
        onChange({ target: { value: nextValue } });
      }
    }
  };

  onPrevious = () => {
    const { onChange } = this.props;
    const { options } = this.state;
    const valueIndex = this.valueIndex();
    if (valueIndex > 0) {
      const nextIndex = valueIndex - 1;
      const nextValue = options[nextIndex].value;
      this.setState({ value: nextValue }, () => {
        this.optionRefs[nextIndex].focus();
      });
      if (onChange) {
        onChange({ target: { value: nextValue } });
      }
    }
  };

  onFocus = event => {
    const { onFocus } = this.props;
    const { focus } = this.state;
    if (!focus) {
      this.setState({ focus: true }, () => {
        const valueIndex = this.valueIndex() || 0;
        this.optionRefs[valueIndex].focus();
      });
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  onBlur = event => {
    const { onBlur } = this.props;
    const { focus } = this.state;
    if (focus) {
      this.setState({ focus: false });
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const { forwardRef, name, onChange, ...rest } = this.props;
    const { focus, options, value: selectedValue } = this.state;
    return (
      <Keyboard
        target="document"
        onUp={this.onPrevious}
        onDown={this.onNext}
        onLeft={this.onPrevious}
        onRight={this.onNext}
      >
        <Box
          ref={forwardRef}
          gap="small"
          {...rest}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {options.map(({ disabled, id, label, value }, index) => (
            <RadioButton
              ref={ref => {
                this.optionRefs[index] = ref;
              }}
              key={value}
              name={name}
              label={label}
              disabled={disabled}
              checked={value === selectedValue}
              focus={
                focus &&
                (value === selectedValue ||
                  (selectedValue === undefined && !index))
              }
              id={id}
              value={value}
              onChange={onChange}
            />
          ))}
        </Box>
      </Keyboard>
    );
  }
}

RadioButtonGroup.defaultProps = {};
Object.setPrototypeOf(RadioButtonGroup.defaultProps, defaultProps);

let RadioButtonGroupDoc;
if (process.env.NODE_ENV !== 'production') {
  RadioButtonGroupDoc = require('./doc').doc(RadioButtonGroup); // eslint-disable-line global-require
}
const RadioButtonGroupWrapper = compose(withForwardRef)(
  RadioButtonGroupDoc || RadioButtonGroup,
);

export { RadioButtonGroupWrapper as RadioButtonGroup };
