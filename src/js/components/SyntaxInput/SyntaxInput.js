import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';

import {
  StyledSyntaxInput,
  StyledSyntaxInputContainer,
} from './StyledSyntaxInput';

const parseValue = (schema, value) => {
  // break the value up into schema parts
  const valueParts = []; // { part, beginIndex, endIndex }
  let valueIndex = 0;
  let schemaIndex = 0;
  while (valueIndex < value.length) {
    const item = schema[schemaIndex];
    let found;
    if (item.fixed) {
      const { length } = item.fixed;
      valueParts.push({
        part: item.fixed,
        beginIndex: valueIndex,
        endIndex: (valueIndex + length) - 1,
      });
      const part = value.slice(valueIndex, valueIndex + length);
      if (part === item.fixed) {
        valueIndex += length;
      }
      schemaIndex += 1;
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
              endIndex: (valueIndex + length) - 1,
            });
            valueIndex += length;
            schemaIndex += 1;
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
            endIndex: (valueIndex + length) - 1,
          });
          valueIndex += length;
          schemaIndex += 1;
          found = true;
        }
      } else {
        valueParts.push({
          part,
          beginIndex: valueIndex,
          endIndex: (valueIndex + length) - 1,
        });
        valueIndex += length;
        schemaIndex += 1;
      }
    }
  }
  return valueParts;
};

class SyntaxInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { schema, value } = nextProps;
    const { priorSchema, priorValue } = prevState;
    if (priorSchema !== schema || priorValue !== value) {
      const valueParts = parseValue(schema, value);
      return { priorSchema: schema, priorValue: value, valueParts };
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
    setTimeout(() => {
      const { schema } = this.props;
      const { activeSchemaIndex, valueParts } = this.state;
      if (this.inputRef.current && this.inputRef.current === document.activeElement) {
        // determine which schema element the caret is at
        const caretIndex = this.inputRef.current.selectionStart;
        let schemaIndex;
        valueParts.some((part, index) => {
          if (part.beginIndex <= caretIndex && part.endIndex >= caretIndex) {
            schemaIndex = index;
            return true;
          }
          return false;
        });
        if (schemaIndex === undefined && valueParts.length < schema.length) {
          schemaIndex = valueParts.length; // first unused one
        }
        if (schemaIndex && schema[schemaIndex].fixed) {
          schemaIndex -= 1; // fixed schema parts are never "active"
        }
        if (activeSchemaIndex !== schemaIndex) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ activeSchemaIndex: schemaIndex });
        }
      }
    }, 2);
  }

  onBlur = () => {
    // delay so we don't remove the drop before Button events can be processed
    setTimeout(() => {
      if (!this.dropRef.current
        || !this.dropRef.current.contains
        || !this.dropRef.current.contains(document.activeElement)) {
        this.setState({ activeSchemaIndex: undefined });
      }
    }, 10);
  }

  // This could be due to a paste or as the user is typing.
  onChange = event => {
    const { onChange, schema } = this.props;
    const {
      target: { value },
    } = event;
    // Align with the schema.
    const valueParts = parseValue(schema, value);
    const nextValue = valueParts.map(part => part.part).join('');
    if (onChange) {
      onChange({ target: { ...event.target, value: nextValue } });
    }
  };

  onOption = option => () => {
    const { onChange, schema } = this.props;
    const { activeSchemaIndex, valueParts } = this.state;
    const nextValueParts = [...valueParts];
    nextValueParts[activeSchemaIndex] = { part: option };
    // add any fixed parts that follow
    let index = activeSchemaIndex + 1;
    while (index < schema.length && !nextValueParts[index] && schema[index].fixed) {
      nextValueParts[index] = { part: schema[index].fixed };
      index += 1;
    }
    const nextValue = nextValueParts.map(part => part.part).join('');
    // restore focus to input
    this.inputRef.current.focus();
    if (onChange) {
      onChange({ target: { value: nextValue } });
    }
  }

  renderPlaceholder = () => {
    const { schema } = this.props;
    return schema.map(item => item.placeholder || item.fixed).join('');
  };

  render() {
    const {
      defaultValue,
      forwardRef,
      id,
      placeholder,
      plain,
      schema,
      value,
      onChange,
      onKeyDown,
      ...rest
    } = this.props;
    const { activeSchemaIndex } = this.state;

    return (
      <StyledSyntaxInputContainer plain={plain}>
        <Keyboard
          onEsc={this.onEsc}
          onTab={this.onTab}
          onLeft={this.locateCaret}
          onRight={this.locateCaret}
          onUp={this.onPreviousSuggestion}
          onDown={this.onNextSuggestion}
          onKeyDown={onKeyDown}
        >
          <StyledSyntaxInput
            id={id}
            ref={(node) => {
              this.inputRef.current = node;;
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
        {activeSchemaIndex >= 0 && schema[activeSchemaIndex].options && (
          <Drop
            align={{ top: 'bottom', left: 'left' }}
            target={this.inputRef.current}
          >
            <Box ref={this.dropRef}>
              {schema[activeSchemaIndex].options.map(option => (
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
      </StyledSyntaxInputContainer>
    );
  }
}

let SyntaxInputDoc;
if (process.env.NODE_ENV !== 'production') {
  SyntaxInputDoc = require('./doc').doc(SyntaxInput); // eslint-disable-line global-require
}
const SyntaxInputWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(SyntaxInputDoc || SyntaxInput);

export { SyntaxInputWrapper as SyntaxInput };
