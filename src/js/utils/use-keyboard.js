import { useEffect, useState } from 'react';

export const useKeyboard = () => {
  const [usingKeyboard, setUsingKeyboard] = useState();

  useEffect(() => {
    const onMouseDown = () => setUsingKeyboard(false);
    const onKeyDown = () => setUsingKeyboard(true);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return usingKeyboard;
};

export default useKeyboard;
