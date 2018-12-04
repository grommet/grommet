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

class SyntaxInput extends Component {
  state = {};

  inputRef = React.createRef();

  componentDidUpdate() {
    const { forwardRef, schema, value } = this.props;
    const { activeSchemaIndex } = this.state;
    const ref = forwardRef || this.inputRef;
    if (ref.current) {
      // determine which schema element the caret is at
      let valueIndex = 0;
      let schemaIndex = 0;
      const caretIndex = ref.current.selectionStart;
      while (valueIndex < value.length && valueIndex <= caretIndex) {
        const item = schema[schemaIndex];
        let found;
        if (item.fixed) {
          valueIndex += item.fixed.length;
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
          if (item.regexp) {
            const part = value.slice(valueIndex, valueIndex + length);
            if (item.regexp.test(part)) {
              valueIndex += length;
              schemaIndex += 1;
              found = true;
            }
          }
        }
      }
      schemaIndex -= 1;
      console.log('!!! did update', schemaIndex);
      if (activeSchemaIndex !== schemaIndex) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ activeSchemaIndex: schemaIndex });
      }
    }
  }

  // This could be due to a paste or as the user is typing.
  onChange = event => {
    const { onChange, schema } = this.props;
    const {
      target: { value },
    } = event;
    // Align with the schema.
    let nextValue = '';
    let valueIndex = 0;
    let schemaIndex = 0;
    let protection = 100; // temporary infinite loop protection
    while (
      valueIndex < value.length &&
      schemaIndex < schema.length &&
      protection
    ) {
      const item = schema[schemaIndex];
      let found;
      if (item.fixed) {
        const { fixed } = item;
        const { length } = fixed;
        const part = value.slice(valueIndex, valueIndex + length);
        nextValue += fixed;
        if (part === fixed) {
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
              nextValue += part;
              valueIndex += length;
              schemaIndex += 1;
              return true;
            }
            return false;
          });
      }
      if (!found) {
        let length = Array.isArray(item.length)
          ? item.length[1]
          : item.length || value.length - valueIndex;
        if (item.regexp) {
          while (length && !found) {
            const part = value.slice(valueIndex, valueIndex + length);
            if (item.regexp.test(part)) {
              nextValue += part;
              valueIndex += length;
              schemaIndex += 1;
              found = true;
            }
            length -= 1;
          }
        } else {
          const part = value.slice(valueIndex, valueIndex + length);
          nextValue += part;
          valueIndex += length;
          schemaIndex += 1;
        }
      }
      protection -= 1;
    }
    if (onChange) {
      onChange({ target: { ...event.target, value: nextValue } });
    }
  };

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
          onEnter={this.onSuggestionSelect}
          onEsc={this.onEsc}
          onTab={this.onTab}
          onUp={this.onPreviousSuggestion}
          onDown={this.onNextSuggestion}
          onKeyDown={onKeyDown}
        >
          <StyledSyntaxInput
            id={id}
            ref={forwardRef || this.inputRef}
            autoComplete="off"
            plain={plain}
            placeholder={placeholder || this.renderPlaceholder()}
            {...rest}
            defaultValue={defaultValue}
            value={value}
            onChange={this.onChange}
          />
        </Keyboard>
        {activeSchemaIndex >= 0 && schema[activeSchemaIndex].options && (
          <Drop
            align={{ top: 'bottom', left: 'left' }}
            target={(forwardRef || this.inputRef).current}
          >
            <Box>
              {schema[activeSchemaIndex].options.map(option => (
                <Box flex={false}>
                  <Button key={option} hoverIndicator onClick={() => {}}>
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
