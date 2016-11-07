import React from 'react';
import Info from './Info';

export default (props) => {
  console.warn(
    'Information has been renamed to Info.' +
    ' Plese update your import statement.'
  );
  return <Info {...props} />;
};
