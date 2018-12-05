import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';

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
  while (valueIndex < value.length) {
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
      const length = Array.isArray(item.length)
        ? item.length[1]
        : item.length || value.length - valueIndex;
      const part = value.slice(valueIndex, valueIndex + length);
      if (item.regexp) {
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
      } else {
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
  static defaultProps = {
    mask: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { mask, value } = nextProps;
    const { priormask, priorValue } = prevState;
    if (priormask !== mask || priorValue !== value) {
      const valueParts = parseValue(mask, value);
      return { priormask: mask, priorValue: value, valueParts };
    }
    return null;
  }

  state = {};

  inputRef = React.createRef();

  dropRef = React.createRef();

  componentDidMount() {
    this.locateCaret();
  }

  componentDidUpdate() {
    this.locateCaret();
  }

  locateCaret = () => {
    // leave time for caret to be placed after receiving focus
    clearTimeout(this.caretTimeout);
    this.caretTimeout = setTimeout(() => {
      const { mask } = this.props;
      const { activemaskIndex, valueParts } = this.state;
      if (
        this.inputRef.current &&
        this.inputRef.current === document.activeElement
      ) {
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
        if (activemaskIndex !== maskIndex) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ activemaskIndex: maskIndex });
        }
      }
    }, 10); // 10ms empirically chosen
  };

  onBlur = () => {
    // delay so we don't remove the drop before Button events can be processed
    clearTimeout(this.blurTimeout);
    this.blurTimeout = setTimeout(() => {
      if (
        !this.dropRef.current ||
        !this.dropRef.current.contains ||
        !this.dropRef.current.contains(document.activeElement)
      ) {
        this.setState({ activemaskIndex: undefined });
      }
    }, 10); // 10ms empirically chosen
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
    if (onChange) {
      onChange({ target: { ...event.target, value: nextValue } });
    }
  };

  onOption = option => () => {
    const { onChange, mask } = this.props;
    const { activemaskIndex, valueParts } = this.state;
    const nextValueParts = [...valueParts];
    nextValueParts[activemaskIndex] = { part: option };
    // add any fixed parts that follow
    let index = activemaskIndex + 1;
    while (index < mask.length && !nextValueParts[index] && mask[index].fixed) {
      nextValueParts[index] = { part: mask[index].fixed };
      index += 1;
    }
    const nextValue = nextValueParts.map(part => part.part).join('');
    // restore focus to input
    this.inputRef.current.focus();
    if (onChange) {
      onChange({ target: { value: nextValue } });
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
      ...rest
    } = this.props;
    const { activemaskIndex } = this.state;

    return (
      <StyledMaskedInputContainer plain={plain}>
        <Keyboard
          onEsc={this.onEsc}
          onTab={this.onTab}
          onLeft={this.locateCaret}
          onRight={this.locateCaret}
          onUp={this.onPreviousSuggestion}
          onDown={this.onNextSuggestion}
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
            onFocus={() => this.locateCaret()}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Keyboard>
        {activemaskIndex >= 0 && mask[activemaskIndex].options && (
          <Drop
            align={{ top: 'bottom', left: 'left' }}
            target={this.inputRef.current}
          >
            <Box ref={this.dropRef}>
              {mask[activemaskIndex].options.map(option => (
                <Box key={option} flex={false}>
                  <Button hoverIndicator onClick={this.onOption(option)}>
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

let MaskedInputDoc;
if (process.env.NODE_ENV !== 'production') {
  MaskedInputDoc = require('./doc').doc(MaskedInput); // eslint-disable-line global-require
}
const MaskedInputWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(MaskedInputDoc || MaskedInput);

export { MaskedInputWrapper as MaskedInput };
