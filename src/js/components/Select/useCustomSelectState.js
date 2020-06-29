import { useState } from 'react';

export default function useCustomSelectState(optionList) {
  const [selectState, setStateValues] = useState({
    displayOptions: optionList,
    value: [],
    previousValue: [],
    open: false,
  });

  const { displayOptions, value, previousValue, open } = selectState;

  const setSelectState = (params, ...rest) =>
    setStateValues({ ...selectState, ...params }, ...rest);

  return { displayOptions, value, previousValue, open, setSelectState };
}
