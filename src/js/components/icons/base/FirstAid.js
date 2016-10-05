import React from 'react';
import Aid from './Aid';

export default (props) => {
  console.warn(
    'FirstAid has been renamed to Aid.' +
    ' Plese update your import statement.'
  );
  return <Aid {...props} />;
};
