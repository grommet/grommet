import React, { Component } from 'react';
import { compose } from 'recompose';

import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';

import {
  StyledMaskedInput,
  StyledMaskedInputContainer,
} from './StyledMaskedInput';

const parseValue = (mask, value) => {
  // break the value up into mask parts
  const valueParts = []; // { part, beginIndex, endIndex }
  let valueIndex = 0;
  let maskIndex = 0;
  while (
    value !== undefined &&
    valueIndex < value.length &&
    maskIndex < mask.length
  ) {
    const item = mask[maskIndex];
    let found;
    if (item.fixed) {
      const { length } = item.fixed;
      valueParts.push({
        part: item.fixed,
        beginIndex: valueIndex,
        endIndex: valueIndex + length - 1,
      });
      const part = value.slice(valueIndex, valueIndex + length);
      if (part === item.fixed) {
        valueIndex += length;
      }
      maskIndex += 1;
      found = true;
    } else if (item.options) {
      // reverse assuming larger is later
      found = item.options
        .slice(0)
        .reverse()
        // eslint-disable-next-line no-loop-func
        .some(option => {
          const { length } = option;
          const part = value.slice(valueIndex, valueIndex + length);
          if (part === option) {
            valueParts.push({
              part,
              beginIndex: valueIndex,
              endIndex: valueIndex + length - 1,
            });
            valueIndex += length;
            maskIndex += 1;
            return true;
          }
          return false;
        });
    }
    if (!found) {
      if (item.regexp) {
        const minLength =
          (Array.isArray(item.length) && item.length[0]) || item.length || 1;
        const maxLength =
          (Array.isArray(item.length) && item.length[1]) ||
          item.length ||
          value.length - valueIndex;
        let length = maxLength;
        while (!found && length >= minLength) {
          const part = value.slice(valueIndex, valueIndex + length);
          if (item.regexp.test(part)) {
            valueParts.push({
              part,
              beginIndex: valueIndex,
              endIndex: valueIndex + length - 1,
            });
            valueIndex += length;
            maskIndex += 1;
            found = true;
          }
          length -= 1;
        }
        if (!found) {
          valueIndex = value.length;
        }
      } else {
        const length = Array.isArray(item.length)
          ? item.length[1]
          : item.length || value.length - valueIndex;
        const part = value.slice(valueIndex, valueIndex + length);
        valueParts.push({
          part,
          beginIndex: valueIndex,
          endIndex: valueIndex + length - 1,
        });
        valueIndex += length;
        maskIndex += 1;
      }
    }
  }
  return valueParts;
};

class MaskedInput extends Component {
  static contextType = ThemeContext;

  static defaultProps = {
    mask: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { mask, value } = nextProps;
    const { priorMask, priorValue } = prevState;
    if (priorMask !== mask || priorValue !== value) {
      const valueParts = parseValue(mask, value);
      return { priorMask: mask, priorValue: value, valueParts };
    }
    return null;
  }

  state = {};

  inputRef = React.createRef();

  dropRef = React.createRef();

  componentDidUpdate() {
    const { focus } = this.props;
    if (focus) {
      this.locateCaret();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.caretTimeout);
    clearTimeout(this.blurTimeout);
  }

  locateCaret = () => {
    // leave time for caret to be placed after receiving focus
    clearTimeout(this.caretTimeout);
    this.caretTimeout = setTimeout(() => {
      const { mask } = this.props;
      const { activeMaskIndex, valueParts } = this.state;
      if (this.inputRef.current) {
        // determine which mask element the caret is at
        const caretIndex = this.inputRef.current.selectionStart;
        let maskIndex;
        valueParts.some((part, index) => {
          if (part.beginIndex <= caretIndex && part.endIndex >= caretIndex) {
            maskIndex = index;
            return true;
          }
          return false;
        });
        if (maskIndex === undefined && valueParts.length < mask.length) {
          maskIndex = valueParts.length; // first unused one
        }
        if (maskIndex && mask[maskIndex].fixed) {
          maskIndex -= 1; // fixed mask parts are never "active"
        }
        if (maskIndex !== activeMaskIndex) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            activeMaskIndex: maskIndex,
            activeOptionIndex: -1,
            showDrop: maskIndex >= 0 && mask[maskIndex].options && true,
          });
        }
      }
    }, 10); // 10ms empirically chosen
  };

  onFocus = event => {
    const { onFocus } = this.props;
    this.locateCaret();
    if (onFocus) {
      onFocus(event);
    }
  };

  onBlur = event => {
    // delay so we don't remove the drop before Button events can be processed
    const { onBlur } = this.props;
    clearTimeout(this.blurTimeout);
    this.blurTimeout = setTimeout(() => {
      const { showDrop } = this.state;
      if (
        showDrop &&
        this.dropRef.current &&
        document.activeElement !== this.inputRef.current &&
        !this.dropRef.current.parentNode.contains(document.activeElement)
      ) {
        this.setState({ activeMaskIndex: undefined, showDrop: false });
      }
    }, 10); // 10ms empirically chosen
    if (onBlur) {
      onBlur(event);
    }
  };

  setValue = nextValue => {
    // Calling set value function directly on input because React library
    // overrides setter `event.target.value =` and loses original event
    // target fidelity.
    // https://stackoverflow.com/a/46012210 &&
    // https://github.com/grommet/grommet/pull/3171#discussion_r296415239
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    ).set;
    nativeInputValueSetter.call(this.inputRef.current, nextValue);
    const event = new Event('input', { bubbles: true });
    this.inputRef.current.dispatchEvent(event);
  };

  // This could be due to a paste or as the user is typing.
  onChange = event => {
    const { onChange, mask } = this.props;
    const {
      target: { value },
    } = event;
    // Align with the mask.
    const valueParts = parseValue(mask, value);
    const nextValue = valueParts.map(part => part.part).join('');
    if (value === nextValue) {
      if (onChange) {
        onChange(event);
      }
    } else {
      this.setValue(nextValue);
    }
  };

  onOption = option => () => {
    const { mask } = this.props;
    const { activeMaskIndex, valueParts } = this.state;
    const nextValueParts = [...valueParts];
    nextValueParts[activeMaskIndex] = { part: option };
    // add any fixed parts that follow
    let index = activeMaskIndex + 1;
    while (index < mask.length && !nextValueParts[index] && mask[index].fixed) {
      nextValueParts[index] = { part: mask[index].fixed };
      index += 1;
    }
    const nextValue = nextValueParts.map(part => part.part).join('');
    this.setValue(nextValue);
    // restore focus to input
    this.inputRef.current.focus();
  };

  onNextOption = event => {
    const { mask } = this.props;
    const { activeMaskIndex, activeOptionIndex } = this.state;
    const item = mask[activeMaskIndex];
    if (item && item.options) {
      event.preventDefault();
      const index = Math.min(activeOptionIndex + 1, item.options.length - 1);
      this.setState({ activeOptionIndex: index });
    }
  };

  onPreviousOption = event => {
    const { mask } = this.props;
    const { activeMaskIndex, activeOptionIndex } = this.state;
    if (activeMaskIndex >= 0 && mask[activeMaskIndex].options) {
      event.preventDefault();
      const index = Math.max(activeOptionIndex - 1, 0);
      this.setState({ activeOptionIndex: index });
    }
  };

  onSelectOption = event => {
    const { mask } = this.props;
    const { activeMaskIndex, activeOptionIndex } = this.state;
    if (activeMaskIndex >= 0 && activeOptionIndex >= 0) {
      event.preventDefault();
      const option = mask[activeMaskIndex].options[activeOptionIndex];
      this.onOption(option)();
    }
  };

  onEsc = event => {
    const { showDrop } = this.state;
    if (showDrop) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      this.setState({ showDrop: false });
    }
  };

  renderPlaceholder = () => {
    const { mask } = this.props;
    return mask.map(item => item.placeholder || item.fixed).join('');
  };

  render() {
    const {
      defaultValue,
      forwardRef,
      id,
      placeholder,
      plain,
      mask,
      value,
      onChange,
      onKeyDown,
      theme: propsTheme,
      ...rest
    } = this.props;
    const theme = this.context || propsTheme;
    const { activeMaskIndex, activeOptionIndex, showDrop } = this.state;

    return (
      <StyledMaskedInputContainer plain={plain}>
        <Keyboard
          onEsc={this.onEsc}
          onTab={this.onTab}
          onLeft={this.locateCaret}
          onRight={this.locateCaret}
          onUp={this.onPreviousOption}
          onDown={this.onNextOption}
          onEnter={this.onSelectOption}
          onKeyDown={onKeyDown}
        >
          <StyledMaskedInput
            id={id}
            ref={node => {
              this.inputRef.current = node;
              if (forwardRef) {
                if (typeof forwardRef === 'object') {
                  forwardRef.current = node;
                } else {
                  forwardRef(node);
                }
              }
            }}
            autoComplete="off"
            plain={plain}
            placeholder={placeholder || this.renderPlaceholder()}
            {...rest}
            defaultValue={defaultValue}
            value={value}
            theme={theme}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Keyboard>
        {showDrop && (
          <Drop
            id={id ? `masked-input-drop__${id}` : undefined}
            align={{ top: 'bottom', left: 'left' }}
            responsive={false}
            target={this.inputRef.current}
          >
            <Box ref={this.dropRef}>
              {mask[activeMaskIndex].options.map((option, index) => (
                <Box key={option} flex={false}>
                  <Button
                    tabIndex="-1"
                    onClick={this.onOption(option)}
                    onMouseOver={() =>
                      this.setState({ activeOptionIndex: index })
                    }
                    onFocus={() => {}}
                    active={index === activeOptionIndex}
                    hoverIndicator="background"
                  >
                    <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
                      {option}
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          </Drop>
        )}
      </StyledMaskedInputContainer>
    );
  }
}

Object.setPrototypeOf(MaskedInput.defaultProps, defaultProps);

let MaskedInputDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MaskedInputDoc = require('./doc').doc(MaskedInput);
}
const MaskedInputWrapper = compose(
  withFocus({ focusWithMouse: true }),
  withForwardRef,
)(MaskedInputDoc || MaskedInput);

export { MaskedInputWrapper as MaskedInput };
