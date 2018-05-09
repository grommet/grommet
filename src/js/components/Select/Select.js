import React, { Component } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';

import { withTheme } from '../hocs';

import SelectContainer from './SelectContainer';
import doc from './doc';

const SelectTextInput = styled(TextInput)`cursor: pointer;`;

class Select extends Component {
  static defaultProps = {
    dropAlign: { top: 'bottom', left: 'left' },
    messages: { multiple: 'multiple' },
  }

  state = { open: false }

  onOpen = () => {
    this.setState({ open: true });
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({ open: false });
    if (onClose) {
      onClose();
    }
  }

  render() {
    const {
      a11yTitle,
      children,
      disabled,
      dropAlign,
      dropTarget,
      messages,
      onChange,
      onClose,
      placeholder,
      plain,
      size,
      theme,
      value,
      ...rest
    } = this.props;
    const { open } = this.state;

    const onSelectChange = (event, ...args) => {
      this.onClose();
      if (onChange) {
        onChange(event, ...args);
      }
    };

    const SelectIcon = theme.select.icons.down;
    let selectValue;
    let textValue;
    if (!React.isValidElement(value)) {
      if (Array.isArray(value)) {
        if (value.length > 1) {
          if (React.isValidElement(value[0])) {
            selectValue = value;
          } else {
            textValue = messages.multiple;
          }
        } else if (value.length === 1) {
          if (React.isValidElement(value[0])) {
            selectValue = value[0];
          } else {
            textValue = value[0];
          }
        } else {
          textValue = '';
        }
      } else {
        textValue = value;
      }
    } else {
      selectValue = value;
    }

    return (
      <Keyboard onDown={this.onOpen} onUp={this.onOpen}>
        <DropButton
          disabled={disabled}
          dropAlign={dropAlign}
          dropTarget={dropTarget}
          {...rest}
          open={open}
          onOpen={this.onOpen}
          onClose={this.onClose}
          a11yTitle={`${a11yTitle}${typeof value === 'string' ? `, ${value}` : ''}`}
          dropContent={<SelectContainer {...this.props} onChange={onSelectChange} />}
        >
          <Box
            align='center'
            border={!plain ? 'all' : undefined}
            direction='row'
            justify='between'
          >
            <Box direction='row' flex={true}>
              {selectValue || (
                <SelectTextInput
                  ref={(ref) => { this.inputRef = ref; }}
                  {...rest}
                  tabIndex='-1'
                  type='text'
                  placeholder={placeholder}
                  plain={true}
                  readOnly={true}
                  value={textValue}
                  size={size}
                />
              )}
            </Box>
            <Box
              margin={{ horizontal: 'small' }}
              flex={false}
              style={{ minWidth: 'auto' }}
            >
              <SelectIcon color='brand' size={size} />
            </Box>
          </Box>
        </DropButton>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Select);
}

export default compose(
  withTheme,
)(Select);
