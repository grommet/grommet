import React, { useEffect, useRef } from 'react';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';
import { SearchInputContext } from './SearchInputContext';

export const SearchInput = props => {
  const textInputRef = useRef();

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      textInputRef.current.focus();
    }, 300);

    return () => {
      clearTimeout(focusTimeout);
    };
  }, []);

  return (
    <SearchInputContext.Consumer>
      {({ searching }) => (
        <SearchBorderBox searching={searching}>
          <TextInput {...props} plain ref={textInputRef} />
        </SearchBorderBox>
      )}
    </SearchInputContext.Consumer>
  );
};
