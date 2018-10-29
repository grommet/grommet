import React, { createRef, Component } from 'react';

import { findDOMNode } from 'react-dom';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';
import { SearchInputContext } from './SearchInputContext';

export class SearchInput extends Component {
  textInputRef = createRef();

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable-next-line react/no-find-dom-node */
      findDOMNode(this.textInputRef.current).focus();
    }, 300);
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
