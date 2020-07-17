import React, { useEffect, useRef } from 'react';

import { TextInput } from '../../..';

import { SearchBorderBox } from './SearchBorderBox';

export const SearchInput = ({ searching, ...props }) => {
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
    <SearchBorderBox searching={searching}>
      <TextInput {...props} plain ref={textInputRef} />
    </SearchBorderBox>
  );
};
