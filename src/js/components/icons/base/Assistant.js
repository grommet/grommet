import React from 'react';
import Robot from './Robot';

export default (props) => {
  console.warn(
    'Assistant has been renamed to Robot.' +
    ' Plese update your import statement.'
  );
  return <Robot {...props} />;
};
