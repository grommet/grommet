import React from 'react';
import Bug from './Bug';

export default (props) => {
  console.warn(
    'Defect has been renamed to Bug.' +
    ' Plese update your import statement.'
  );
  return <Bug {...props} />;
};
