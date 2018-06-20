import React, { createRef, Component } from 'react';

import { findDOMNode } from 'react-dom';

import TextInput from '../../../TextInput/TextInput';

import FocusBorderBox from './FocusBorderBox';

export default class SearchInput extends Component {
  textInputRef = createRef()

  componentDidMount() {
    setTimeout(() => {
      findDOMNode(this.textInputRef.current).focus();
    }, 300);
  }

  render() {
    return (
      <FocusBorderBox>
        <TextInput
          {...this.props}
          plain={true}
          ref={this.textInputRef}
        />
      </FocusBorderBox>
    );
  }
}
