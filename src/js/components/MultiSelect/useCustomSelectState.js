import { useState } from 'react';

export default function useCustomSelectState() {
  const [selectState, setStateValues] = useState({
    previousValue: [],
    open: false,
  });

  const { displayOptions, previousValue, open } = selectState;

  const setSelectState = (params, ...rest) =>
    setStateValues({ ...selectState, ...params }, ...rest);

  return { displayOptions, previousValue, open, setSelectState };
}
