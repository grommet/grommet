import React, { forwardRef, useEffect } from 'react';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';

/* Need ForwardRef since this functional component
   is being passed into a custom theme for SearchInput
*/
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
