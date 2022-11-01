import { useEffect, useState } from 'react';
export var useKeyboard = function useKeyboard() {
  var _useState = useState(),
    usingKeyboard = _useState[0],
    setUsingKeyboard = _useState[1];
  useEffect(function () {
    var onMouseDown = function onMouseDown() {
      return setUsingKeyboard(false);
    };
    var onKeyDown = function onKeyDown() {
      return setUsingKeyboard(true);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return function () {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return usingKeyboard;
};
export default useKeyboard;