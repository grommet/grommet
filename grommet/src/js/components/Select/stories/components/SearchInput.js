import React, { createRef, Component } from 'react';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';
import { SearchInputContext } from './SearchInputContext';

export class SearchInput extends Component {
  textInputRef = createRef();

  componentDidMount() {
    this.focusTimeout = setTimeout(() => {
      this.textInputRef.current.focus();
    }, 300);
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  render() {
    return (
      <SearchInputContext.Consumer>
        {({ searching }) => (
          <SearchBorderBox searching={searching}>
            <TextInput {...this.props} plain ref={this.textInputRef} />
          </SearchBorderBox>
        )}
      </SearchInputContext.Consumer>
    );
  }
}
