import React, { Component } from 'react';

import { FormDown } from 'grommet-icons';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';

import SelectContainer from './SelectContainer';
import doc from './doc';

class Select extends Component {
  state = { open: false }

  componentWillReceiveProps(nextProps) {
    const { onClose, value } = nextProps;
    const { open } = this.state;
    if (value !== this.props.value) {
      this.setState({ open: false });
      if (onClose && open) {
        onClose();
      }
    }
  }

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
      a11yTitle, children, onClose, open: propsOpen, placeholder, plain,
      value, ...rest
    } = this.props;
    const { open: stateOpen } = this.state;

    return (
      <Keyboard onDown={this.onOpen} onUp={this.onOpen}>
        <DropButton
          dropAlign={{ top: 'bottom', left: 'left' }}
          {...rest}
          open={stateOpen !== undefined ? stateOpen : propsOpen}
          onOpen={this.onOpen}
          onClose={this.onClose}
          a11yTitle={`${a11yTitle}${typeof value === 'string' ? `, ${value}` : ''}`}
          dropContent={<SelectContainer {...this.props} />}
        >
          <Box
            aria-hidden={true}
            align='center'
            border={!plain ? 'all' : undefined}
            direction='row'
            justify='between'
          >
            {React.isValidElement(value) ? value : (
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
            )}
            <Box
              margin={{ horizontal: 'small' }}
              flex={false}
              style={{ minWidth: 'auto' }}
            >
              <FormDown />
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

export default Select;
