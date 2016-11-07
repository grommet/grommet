import React from 'react';
import Deploy from './Deploy';

export default (props) => {
  console.warn(
    'Deployment has been renamed to Deploy.' +
    ' Plese update your import statement.'
  );
  return <Deploy {...props} />;
};
