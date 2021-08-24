import React, { forwardRef, useEffect } from 'react';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';

export const SearchInput = forwardRef(
  ({ searching, ...props }, textInputRef) => {
    useEffect(() => {
      const focusTimeout = setTimeout(() => {
        textInputRef.current.focus();
      }, 300);

      return () => {
        clearTimeout(focusTimeout);
      };
    }, [textInputRef]);

    return (
      <SearchBorderBox searching={searching}>
        <TextInput {...props} plain ref={textInputRef} />
      </SearchBorderBox>
    );
  },
);
