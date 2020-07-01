import { useState } from 'react';

export default function useCustomSelectState(value) {
  const [selectState, setStateValues] = useState({
    previousValue: value,
    open: false,
  });

  const { displayOptions, previousValue, open } = selectState;

  const setSelectState = (params, ...rest) =>
    setStateValues({ ...selectState, ...params }, ...rest);

  return { displayOptions, previousValue, open, setSelectState };
}
