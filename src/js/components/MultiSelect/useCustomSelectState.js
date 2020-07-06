import { useState } from 'react';

export default function useCustomSelectState(
  options,
  value,
  withInclusionExclusion,
) {
  const [selectState, setStateValues] = useState({
    filteredOptions: options,
    previousValue: value,
    open: false,
    searchVal: '',
    incExcVal: withInclusionExclusion ? withInclusionExclusion.setIncExc : null,
  });

  const {
    filteredOptions,
    previousValue,
    open,
    searchVal,
    incExcVal,
  } = selectState;

  const setSelectState = (params, ...rest) =>
    setStateValues({ ...selectState, ...params }, ...rest);

  return {
    filteredOptions,
    previousValue,
    open,
    searchVal,
    incExcVal,
    setSelectState,
  };
}
