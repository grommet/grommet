import React from 'react';
import Split from './Split';

export default (props) => {
  console.warn(
    'Divide has been renamed to Split.' +
    ' Plese update your import statement.'
  );
  return <Split {...props} />;
};
