import { useCallback, useState } from 'react';

// This hook allows to manage components controlled and uncontrolled
export const useControlled = ({ prop, defaultProp, onChange = () => {} }) => {
  // State to manage the uncontrolled property value
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  // Check if the component is controlled based on whether 'prop' is defined
  const controlled = prop !== undefined;
  const value = controlled ? prop : uncontrolledProp;
  const handleChange = useCallback(onChange, [onChange]);

  const setValue = useCallback(
    (nextValue) => {
      // Only update internal value in uncontrolled cases
      if (!controlled) {
        setUncontrolledProp(nextValue);
      }
      handleChange(nextValue);
    },
    [controlled, setUncontrolledProp, handleChange],
  );
  return [value, setValue];
};
