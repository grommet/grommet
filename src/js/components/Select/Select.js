import React, { Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { controlBorderStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';
import { withForwardRef } from '../hocs';

import { SelectContainer } from './SelectContainer';

const SelectTextInput = styled(TextInput)`
  cursor: pointer;
`;
const StyledSelectBox = styled(Box)`
  ${props => !props.plain && controlBorderStyle};
  ${props =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
`;

StyledSelectBox.defaultProps = {};
Object.setPrototypeOf(StyledSelectBox.defaultProps, defaultProps);

class Select extends Component {
  static defaultProps = {
    closeOnChange: true,
    dropAlign: { top: 'bottom', left: 'left' },
    messages: { multiple: 'multiple' },
  };

  state = { open: false };

  onOpen = () => {
    const { onOpen } = this.props;
    this.setState({ open: true }, () => {
      if (onOpen) {
        onOpen();
      }
    });
  };

  onClose = () => {
    const { onClose } = this.props;
    this.setState({ open: false }, () => {
      if (onClose) {
        onClose();
      }
    });
  };

  render() {
    const {
      a11yTitle,
      alignSelf,
      children,
      closeOnChange,
      disabled,
      dropAlign,
      dropTarget,
      forwardRef,
      gridArea,
      height,
      id,
      labelKey,
      margin,
      messages,
      onChange,
      onClose,
      options,
      placeholder,
      plain,
      selected,
      size,
      theme,
      value,
      valueLabel,
      ...rest
    } = this.props;
    const { open } = this.state;

    delete rest.onSearch;

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
    let inputValue = '';
    if (valueLabel) {
      selectValue = valueLabel;
    } else if (Array.isArray(value)) {
      if (value.length > 1) {
        if (React.isValidElement(value[0])) {
          selectValue = value;
        } else {
          inputValue = messages.multiple;
        }
      } else if (value.length === 1) {
        if (React.isValidElement(value[0])) {
          [selectValue] = value;
        } else if (labelKey && typeof value[0] === 'object') {
          if (typeof labelKey === 'function') {
            inputValue = labelKey(value[0]);
          } else {
            inputValue = value[0][labelKey];
          }
        } else {
          [inputValue] = value;
        }
      } else {
        inputValue = '';
      }
    } else if (labelKey && typeof value === 'object') {
      if (typeof labelKey === 'function') {
        inputValue = labelKey(value);
      } else {
        inputValue = value[labelKey];
      }
    } else if (React.isValidElement(value)) {
      selectValue = value; // deprecated in favor of valueLabel
    } else if (selected !== undefined) {
      if (Array.isArray(selected)) {
        if (selected.length > 1) {
          inputValue = messages.multiple;
        } else if (selected.length === 1) {
          inputValue = options[selected[0]];
        }
      } else {
        inputValue = options[selected];
      }
    } else {
      inputValue = value;
    }

    // const dark = theme.select.background ? colorIsDark(theme.select.background) : theme.dark;
    const iconColor = normalizeColor(
      theme.select.icons.color || 'control',
      theme,
    );

    return (
      <Keyboard onDown={this.onOpen} onUp={this.onOpen}>
        <DropButton
          ref={forwardRef}
          id={id}
          disabled={disabled === true || undefined}
          dropAlign={dropAlign}
          dropTarget={dropTarget}
          open={open}
          alignSelf={alignSelf}
          gridArea={gridArea}
          margin={margin}
          onOpen={this.onOpen}
          onClose={this.onClose}
          dropContent={
            <SelectContainer {...this.props} onChange={onSelectChange} />
          }
        >
          <StyledSelectBox
            align="center"
            direction="row"
            justify="between"
            background={theme.select.background}
            plain={plain}
          >
            <Box direction="row" flex basis="auto">
              {selectValue || (
                <SelectTextInput
                  a11yTitle={
                    a11yTitle &&
                    `${a11yTitle}${
                      typeof value === 'string' ? `, ${value}` : ''
                    }`
                  }
                  id={id ? `${id}__input` : undefined}
                  {...rest}
                  tabIndex="-1"
                  type="text"
                  placeholder={placeholder}
                  plain
                  readOnly
                  value={inputValue}
                  size={size}
                  onClick={disabled === true ? undefined : this.onOpen}
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

Object.setPrototypeOf(Select.defaultProps, defaultProps);

let SelectDoc;
if (process.env.NODE_ENV !== 'production') {
  SelectDoc = require('./doc').doc(Select); // eslint-disable-line global-require
}
const SelectWrapper = compose(
  withTheme,
  withForwardRef,
)(SelectDoc || Select);

export { SelectWrapper as Select };
