import React from 'react';
import Inspect from './Inspect';

export default (props) => {
  console.warn(
    'QuickView has been renamed to Inspect.' +
    ' Plese update your import statement.'
  );
  return <Inspect {...props} />;
};
