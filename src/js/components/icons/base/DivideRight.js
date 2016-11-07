import React from 'react';
import Sidebar from './Sidebar';

export default (props) => {
  console.warn(
    'DivideRight has been renamed to Sidebar.' +
    ' Plese update your import statement.'
  );
  return <Sidebar {...props} />;
};
