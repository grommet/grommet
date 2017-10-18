import React, { Component } from 'react';

import { FormDown } from 'grommet-icons';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';

import doc from './doc';
import SelectContainer from './SelectContainer';

class Select extends Component {
  selectControl = () => {
    const { placeholder, plain, value, ...rest } = this.props;
    delete rest.children;
    const content = React.isValidElement(value) ? value : (
      <TextInput
        margin='none'
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
        <Box margin={{ horizontal: 'small' }} flex={false}>
          <FormDown />
        </Box>
      </Box>
    );
  }

  render() {
    const { a11yTitle, background, onClose, open, tabIndex, value } = this.props;
    return (
      <DropButton
        open={open}
        tabIndex={tabIndex}
        a11yTitle={`${a11yTitle}${typeof value === 'string' ? `, ${value}` : ''}`}
        background={background}
        control={this.selectControl()}
        onClose={onClose}
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
