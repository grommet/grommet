import React, { Component } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';
import { withForwardRef, withTheme } from '../hocs';
import { controlBorderStyle, colorIsDark, evalStyle } from '../../utils';

import { SelectContainer } from './SelectContainer';
import { doc } from './doc';

const SelectTextInput = styled(TextInput)`cursor: pointer;`;
const StyledSelectBox = styled(Box)`
  ${props => !props.plain && controlBorderStyle};
  ${props => props.theme.select && props.theme.select.control && props.theme.select.control.extend}
`;

class Select extends Component {
  static defaultProps = {
    closeOnChange: true,
    dropAlign: { top: 'bottom', left: 'left' },
    messages: { multiple: 'multiple' },
  }

  state = { open: false }

  onOpen = () => {
    const { onOpen } = this.props;
    this.setState({ open: true }, () => {
      if (onOpen) {
        onOpen();
      }
    });
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({ open: false }, () => {
      if (onClose) {
        onClose();
      }
    });
  }

  render() {
    const {
      a11yTitle,
      children,
      closeOnChange,
      disabled,
      dropAlign,
      dropTarget,
      forwardRef,
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
      if (closeOnChange) {
        this.onClose();
      }
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

    const dark = theme.select.background ? colorIsDark(theme.select.background) : theme.dark;
    const iconColor = evalStyle((theme.select.icons.color ||
      theme.global.control.color)[dark ? 'dark' : 'light'], theme);

    return (
      <Keyboard onDown={this.onOpen} onUp={this.onOpen}>
        <DropButton
          ref={forwardRef}
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
          <StyledSelectBox
            align='center'
            direction='row'
            justify='between'
            background={theme.select.background}
            plain={plain}
            theme={theme}
          >
            <Box direction='row' flex={true} basis='auto'>
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
              <SelectIcon color={iconColor} size={size} />
            </Box>
          </StyledSelectBox>
        </DropButton>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Select);
}

const SelectWrapper = compose(
  withTheme,
  withForwardRef,
)(Select);

export { SelectWrapper as Select };
