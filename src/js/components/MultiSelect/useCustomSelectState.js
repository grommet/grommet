import { useState } from 'react';

export default function useCustomSelectState(options,value) {
  const [selectState, setStateValues] = useState({
    filteredOptions: options,
    previousValue: value,
    open: false,
    searchVal: '',
    valueInternalChange: false,
  });

  const {
    filteredOptions,
    previousValue,
    open,
    searchVal,
    valueInternalChange,
  } = selectState;

  const setSelectState = (params, ...rest) =>
    setStateValues({ ...selectState, ...params }, ...rest);

  return {
    filteredOptions,
    previousValue,
    open,
    searchVal,
    valueInternalChange,
    setSelectState,
  };
}
