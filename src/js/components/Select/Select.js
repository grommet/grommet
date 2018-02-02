import React, { Component } from 'react';

import { FormDown } from 'grommet-icons';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';

import SelectContainer from './SelectContainer';
import doc from './doc';

class Select extends Component {
  state = {}

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.closeDrop = true;
    }
  }

  componentDidUpdate() {
    if (this.closeDrop) {
      this.closeDrop = false;
    }
  }

  selectControl = () => {
    const { placeholder, plain, value, ...rest } = this.props;
    delete rest.children;
    const content = React.isValidElement(value) ? value : (
      <TextInput
        style={{ cursor: 'pointer' }}
        ref={(ref) => { this.inputRef = ref; }}
        {...rest}
        tabIndex='-1'
        type='text'
        placeholder={placeholder}
        plain={true}
        readOnly={true}
        value={value}
      />
    );
    return (
      <Box
        aria-hidden={true}
        align='center'
        border={!plain ? 'all' : undefined}
        direction='row'
        justify='between'
      >
        {content}
        <Box
          margin={{ horizontal: 'small' }}
          flex={false}
          style={{ minWidth: 'auto' }}
        >
          <FormDown />
        </Box>
      </Box>
    );
  }

  render() {
    const {
      a11yTitle, background, focusIndicator, onBlur, onClose, onFocus, open,
      plain, tabIndex, value,
    } = this.props;
    return (
      <DropButton
        open={open || this.closeDrop ? false : undefined}
        tabIndex={tabIndex}
        a11yTitle={`${a11yTitle}${typeof value === 'string' ? `, ${value}` : ''}`}
        background={background}
        plain={plain}
        focusIndicator={focusIndicator}
        control={this.selectControl()}
        onClose={onClose}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <SelectContainer {...this.props} />
      </DropButton>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Select);
}

export default Select;
