import { useCallback, useState } from 'react';

// This hook allows to manage components controlled and uncontrolled
export var useControlled = function useControlled(_ref) {
  var prop = _ref.prop,
    defaultProp = _ref.defaultProp,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  // State to manage the uncontrolled property value
  var _useState = useState(defaultProp),
    uncontrolledProp = _useState[0],
    setUncontrolledProp = _useState[1];
  // Check if the component is controlled based on whether 'prop' is defined
  var controlled = prop !== undefined;
  var value = controlled ? prop : uncontrolledProp;
  var handleChange = useCallback(onChange, [onChange]);
  var setValue = useCallback(function (nextValue) {
    // Only update internal value in uncontrolled cases
    if (!controlled) {
      setUncontrolledProp(nextValue);
    }
    handleChange(nextValue);
  }, [controlled, setUncontrolledProp, handleChange]);
  return [value, setValue];
};