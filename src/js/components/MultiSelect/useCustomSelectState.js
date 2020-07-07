import { useState } from 'react';

export default function useCustomSelectState(
  options,
  value,
  includeExclude,
  isExcluded,
) {
  const getincExcVal = () => {
    if (includeExclude)
     return isExcluded ? 'excluded' : 'included';
    return null;
  };

  const [selectState, setStateValues] = useState({
    filteredOptions: options,
    previousValue: value,
    open: false,
    searchVal: '',
    incExcVal: getincExcVal(),
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
